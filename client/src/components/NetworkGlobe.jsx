import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A sphere of nodes wired to their nearest neighbours. Packets hop node to node
 * along the edges, like messages moving through a real-time network.
 * Mouse tilts it, scroll spins it and pushes it back.
 * `onDeliver` fires each time a packet reaches a node.
 */
export default function NetworkGlobe({ onDeliver }) {
  const mount = useRef(null);
  const deliverRef = useRef(onDeliver);
  deliverRef.current = onDeliver;

  useEffect(() => {
    const el = mount.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const world = new THREE.Group();
    scene.add(world);

    // round glowing sprite used for nodes and packets
    const dot = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d");
      const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grd.addColorStop(0, "rgba(255,255,255,1)");
      grd.addColorStop(0.25, "rgba(255,255,255,.85)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grd;
      g.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    })();

    // ---- nodes on a fibonacci sphere ----
    const N = small ? 110 : 190;
    const R = 2.4;
    const nodes = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      const jitter = 1 + (Math.random() - 0.5) * 0.08;
      nodes.push(new THREE.Vector3(Math.cos(t) * r * R * jitter, y * R * jitter, Math.sin(t) * r * R * jitter));
    }
    const nodeGeo = new THREE.BufferGeometry().setFromPoints(nodes);
    const nodeMat = new THREE.PointsMaterial({
      size: 0.09, map: dot, color: 0xb8c4ff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    world.add(new THREE.Points(nodeGeo, nodeMat));

    // ---- edges: each node to its 3 nearest ----
    const adj = nodes.map(() => new Set());
    nodes.forEach((a, i) => {
      nodes
        .map((b, j) => [j, a.distanceToSquared(b)])
        .filter(([j]) => j !== i)
        .sort((p, q) => p[1] - q[1])
        .slice(0, 3)
        .forEach(([j]) => { adj[i].add(j); adj[j].add(i); });
    });
    const edgePts = [];
    adj.forEach((set, i) => set.forEach((j) => { if (i < j) edgePts.push(nodes[i], nodes[j]); }));
    const edgeGeo = new THREE.BufferGeometry().setFromPoints(edgePts);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x4c6bff, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false });
    world.add(new THREE.LineSegments(edgeGeo, edgeMat));

    // ---- packets ----
    const P = small ? 22 : 40;
    const colors = [new THREE.Color(0xff6a4d), new THREE.Color(0x6f8bff), new THREE.Color(0xffffff)];
    const packets = Array.from({ length: P }, () => {
      const from = Math.floor(Math.random() * N);
      const nbrs = [...adj[from]];
      return { from, to: nbrs[Math.floor(Math.random() * nbrs.length)], t: Math.random(), speed: 0.6 + Math.random() * 0.9 };
    });
    const pPos = new Float32Array(P * 3);
    const pCol = new Float32Array(P * 3);
    packets.forEach((_, i) => colors[i % 3].toArray(pCol, i * 3));
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.2, map: dot, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    world.add(new THREE.Points(pGeo, pMat));

    // faint outer halo ring
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(R * 1.32, R * 1.335, 128),
      new THREE.MeshBasicMaterial({ color: 0x4c6bff, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
    );
    ring.rotation.x = Math.PI / 2.3;
    world.add(ring);

    // ---- sizing ----
    let baseZ = 7.5;
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // shift globe right on wide screens so the headline has room
      const narrow = camera.aspect < 1;
      baseZ = narrow ? 12.5 : 7.5;
      world.position.x = w > 1024 ? 1.9 : 0;
      world.position.y = w > 1024 ? 0 : narrow ? 2.6 : 1.2;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // ---- input ----
    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);

    // ---- loop ----
    const clock = new THREE.Clock();
    let spin = 0, raf;
    const tmp = new THREE.Vector3();

    const step = () => {
      raf = requestAnimationFrame(step);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const scroll = Math.min(1, window.scrollY / window.innerHeight);

      spin += dt * (0.08 + scroll * 0.9);
      world.rotation.y = spin + mouse.x * 0.35;
      world.rotation.x += ((mouse.y * 0.25 + scroll * 0.6) - world.rotation.x) * 0.05;
      camera.position.z = baseZ + scroll * 4;
      renderer.domElement.style.opacity = String(1 - scroll * 0.85);

      packets.forEach((p, i) => {
        p.t += dt * p.speed;
        if (p.t >= 1) {
          p.t = 0;
          p.from = p.to;
          const nbrs = [...adj[p.from]];
          p.to = nbrs[Math.floor(Math.random() * nbrs.length)];
          deliverRef.current?.();
        }
        tmp.lerpVectors(nodes[p.from], nodes[p.to], p.t).toArray(pPos, i * 3);
      });
      pGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    if (reduced) {
      packets.forEach((p, i) => tmp.lerpVectors(nodes[p.from], nodes[p.to], p.t).toArray(pPos, i * 3));
      pGeo.attributes.position.needsUpdate = true;
      world.rotation.set(0.3, 0.6, 0);
      camera.position.z = baseZ;
      renderer.render(scene, camera);
    } else {
      step();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      [nodeGeo, edgeGeo, pGeo, ring.geometry].forEach((g) => g.dispose());
      [nodeMat, edgeMat, pMat, ring.material].forEach((m) => m.dispose());
      dot.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} className="absolute inset-0 [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full" aria-hidden="true" />;
}
