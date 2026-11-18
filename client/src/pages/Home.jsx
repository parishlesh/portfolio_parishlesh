import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { FiArrowUpRight, FiDownload, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import CipherText from "../components/CipherText";
import PacketStream from "../components/PacketStream";
import { API } from "../../constants";
import { profile, experience, projects, skills } from "../data/portfolio";

const ICONS = { GitHub: FaGithub, LinkedIn: FaLinkedin, X: FaXTwitter, Instagram: FaInstagram };

const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const tilt = (e) => {
  spot(e);
  if (reduceMotion()) return;
  const r = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  e.currentTarget.style.setProperty("--ry", `${x * 6}deg`);
  e.currentTarget.style.setProperty("--rx", `${-y * 6}deg`);
};
const untilt = (e) => {
  e.currentTarget.style.setProperty("--ry", "0deg");
  e.currentTarget.style.setProperty("--rx", "0deg");
};

function useInView(ref) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { rootMargin: "0px 0px -15% 0px" });
    ref.current && io.observe(ref.current);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

function DecryptHeading({ text, className }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  return (
    <h2 ref={ref} className={className}>
      <CipherText text={text} duration={900} start={seen} />
    </h2>
  );
}

function SectionHead({ title, note }) {
  return (
    <div className="mb-10 md:mb-14 max-w-2xl">
      <DecryptHeading text={title} className="font-display font-semibold text-3xl md:text-5xl tracking-tight" />
      {note && <p className="mt-4 text-dim text-lg leading-relaxed">{note}</p>}
    </div>
  );
}

/* ---------- Hero ---------- */
const NetworkGlobe = lazy(() => import("../components/NetworkGlobe"));

function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(88,115,255,.18),transparent_60%)]" aria-hidden="true" />
      <Suspense fallback={null}>
        <NetworkGlobe />
      </Suspense>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night via-night/70 to-transparent" aria-hidden="true" />

      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-20 md:pb-16 [&_a]:pointer-events-auto [&_p]:pointer-events-auto [&_h1]:pointer-events-auto">
        <p className="flex items-center gap-2 text-dim mb-5">
          <span className="live-dot h-2 w-2 rounded-full bg-packet" />
          {profile.role} in {profile.location}
        </p>
        <CipherText
          as="h1"
          text={profile.name}
          duration={1600}
          delay={300}
          className="block font-display font-extrabold tracking-tight leading-[0.9] text-[clamp(3rem,11vw,8.5rem)] break-words"
        />
        <div className="mt-8">
          <div>
            <p className="max-w-xl text-lg md:text-xl leading-relaxed text-fog/80">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#experience" className="rounded-full bg-fog px-6 py-3 font-medium text-night hover:bg-packet hover:text-white transition-colors">
                See my work
              </a>
              <a href={profile.resume} download="Parishlesh_Resume.pdf" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium hover:border-white transition-colors">
                <FiDownload aria-hidden="true" /> Download résumé
              </a>
              <ul className="ml-2 flex gap-4">
                {profile.socials.map(({ label, href }) => {
                  const Icon = ICONS[label];
                  return (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-xl text-dim hover:text-fog transition-colors">
                        <Icon />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Work: skills filter + projects ---------- */
function ProjectLinks({ p, big }) {
  const base = `inline-flex items-center gap-1.5 rounded-full font-medium transition-colors ${big ? "px-5 py-2.5" : "px-4 py-2 text-sm"}`;
  return (
    <div className="flex flex-wrap gap-2">
      {p.live && (
        <a href={p.live} target="_blank" rel="noreferrer" className={`${base} bg-fog text-night hover:bg-packet hover:text-white`}>
          Live site <FiArrowUpRight aria-hidden="true" />
        </a>
      )}
      {p.repo && (
        <a href={p.repo} target="_blank" rel="noreferrer" className={`${base} border border-white/20 hover:border-white`}>
          <FaGithub aria-hidden="true" /> Code
        </a>
      )}
    </div>
  );
}

function Work() {
  const [active, setActive] = useState(null); // hovered/pinned skill
  const [pinned, setPinned] = useState(false);
  const anyProject = active && projects.some((p) => p.stack.includes(active));
  const atWork = active && experience[0]?.stack?.includes(active);
  const matches = (p) => !anyProject || p.stack.includes(active);

  const hover = (s) => !pinned && setActive(s);
  const toggle = (s) => {
    if (pinned && active === s) { setPinned(false); setActive(null); }
    else { setPinned(true); setActive(s); }
  };

  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHead title="Side projects" note="Point at a skill to see where I've used it. Click to keep it selected." />
      <div className="grid gap-12 lg:grid-cols-[15rem_1fr]">
        {/* skills */}
        <aside className="lg:sticky lg:top-28 self-start" onMouseLeave={() => hover(null)}>
          {skills.map(({ group, items }) => (
            <div key={group} className="mb-7">
              <h3 className="text-sm text-dim mb-3">{group}</h3>
              <ul className="flex flex-wrap gap-2">
                {items.map((s) => {
                  const on = active === s;
                  return (
                    <li key={s}>
                      <button
                        type="button"
                        onMouseEnter={() => hover(s)}
                        onFocus={() => hover(s)}
                        onClick={() => toggle(s)}
                        aria-pressed={pinned && on}
                        className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                          on ? "bg-packet text-white border-packet" : "bg-deep border-line hover:border-dim"
                        }`}
                      >
                        {s}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <p className="min-h-[3rem] text-sm text-dim" aria-live="polite">
            {active && atWork && `${active}: used in production at ${experience[0].company.split(" ")[0]}.`}
            {active && !atWork && !anyProject && `${active}: part of my toolkit.`}
          </p>
          {pinned && (
            <button type="button" onClick={() => { setPinned(false); setActive(null); }} className="text-sm text-packet underline underline-offset-4">
              Clear selection
            </button>
          )}
        </aside>

        {/* projects */}
        <div>
          {featured && (
            <article
              onMouseMove={tilt}
              onMouseLeave={untilt}
              style={{ transform: "perspective(1400px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))" }}
              className={`spot relative transition-transform duration-200 ease-out will-change-transform rounded-[28px] border border-line bg-gradient-to-br from-deep to-night p-7 md:p-10 overflow-hidden shadow-lift transition-opacity duration-300 ${matches(featured) ? "opacity-100" : "opacity-25"}`}
            >
              <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-signal/30 blur-3xl" aria-hidden="true" />
              <div className="relative grid gap-10 xl:grid-cols-[1fr_20rem] items-start">
                <div>
                  <p className="text-dim mb-4">Featured project</p>
                  <h3 className="font-display font-semibold text-4xl md:text-6xl tracking-tight">{featured.name}</h3>
                  <p className="mt-3 text-xl text-fog/85">{featured.tagline}</p>
                  <p className="mt-6 max-w-xl leading-relaxed text-fog/70">{featured.description}</p>
                  <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    {featured.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-fog/90">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-packet" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <PacketStream />
              </div>
              <div className="relative mt-10 flex flex-wrap items-center justify-between gap-6">
                <ul className="flex flex-wrap gap-2">
                  {featured.stack.map((s) => (
                    <li key={s} className={`rounded-full px-3 py-1 text-sm ${active === s ? "bg-packet text-white" : "bg-white/10"}`}>{s}</li>
                  ))}
                </ul>
                <ProjectLinks p={featured} big />
              </div>
            </article>
          )}

          <ul className="mt-6 border-t border-line">
            {rest.map((p) => (
              <li key={p.name} onMouseMove={spot} className={`spot group rounded-2xl border-b border-line transition-[opacity,background-color] duration-300 hover:bg-deep ${matches(p) ? "opacity-100" : "opacity-25"}`}>
                <div className="px-4 md:px-6 py-7 md:py-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display font-semibold text-2xl md:text-3xl tracking-tight group-hover:text-packet transition-colors">{p.name}</h3>
                      <p className="mt-1 text-dim">{p.tagline}</p>
                    </div>
                    <ProjectLinks p={p} />
                  </div>
                  <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-within:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
                    <div className="overflow-hidden">
                      <p className="pt-4 max-w-2xl leading-relaxed text-fog/75">{p.description}</p>
                    </div>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <li key={s} className={`rounded-full border px-2.5 py-0.5 text-xs ${active === s ? "bg-packet text-white border-packet" : "border-line text-dim"}`}>{s}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience ---------- */
function WorkCard({ w }) {
  return (
    <article onMouseMove={spot} className="spot rounded-3xl border border-line bg-night/60 p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h4 className="font-display font-semibold text-xl md:text-2xl tracking-tight">{w.name}</h4>
          <p className="mt-1 text-dim">{w.what}</p>
        </div>
        {w.live && (
          <a href={w.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-fog px-4 py-2 text-sm font-medium text-night hover:bg-packet hover:text-white transition-colors">
            Live site <FiArrowUpRight aria-hidden="true" />
          </a>
        )}
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        {w.metrics.map((m) => (
          <li key={m} className="rounded-full border border-packet/40 bg-packet/10 px-3 py-1 text-sm text-packet">{m}</li>
        ))}
      </ul>
      <ul className="mt-5 space-y-2.5">
        {w.points.map((pt) => (
          <li key={pt} className="flex gap-3 leading-relaxed text-fog/75">
            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-fog/50" aria-hidden="true" />
            {pt}
          </li>
        ))}
      </ul>
    </article>
  );
}

function Experience() {
  return (
    <section id="experience" className="bg-deep/60 border-y border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHead title="Experience" note="What I’ve shipped in production, and what it changed." />
        <ol className="relative border-l-2 border-line ml-2">
          {experience.map((e, i) => (
            <li key={e.company} className="relative pl-8 md:pl-12 pb-16 last:pb-0">
              <span className={`absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 border-night ${i === 0 ? "bg-packet live-dot" : "bg-line"}`} aria-hidden="true" />
              <p className="text-dim">{e.period}</p>
              <h3 className="mt-1 font-display font-semibold text-2xl md:text-3xl tracking-tight">{e.title}</h3>
              <p className="mt-1 text-fog/65">{e.company}, {e.place}</p>
              {e.work && (
                <div className="mt-8 grid gap-5 lg:grid-cols-2">
                  {e.work.map((w) => <WorkCard key={w.name} w={w} />)}
                </div>
              )}
              {e.points && (
                <ul className="mt-5 space-y-2 max-w-2xl">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-3 leading-relaxed text-fog/75">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-packet" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-32 grid gap-12 lg:grid-cols-[1fr_1.2fr] items-start">
      <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-tight leading-tight">
        I like the parts of an app that have to happen right now.
      </h2>
      <div className="space-y-5 text-lg leading-relaxed text-fog/75 max-w-xl">
        <p>
          Messages that arrive the instant they’re sent. Video calls that connect without a fuss.
          Data that’s private by design, not by promise. That’s the work I enjoy most, and it’s
          why most of what I build leans on Socket.IO, WebRTC and careful backend design.
        </p>
        <p>
          I work across the whole stack, so I can take a feature from schema to screen without
          waiting on hand-offs. I use AI tools like GitHub Copilot, Claude and Lovable to move
          faster without cutting corners on quality.
        </p>
        <p>
          Away from the keyboard I travel, sketch, listen to a lot of music and spend time with my pets.
        </p>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [form, setForm] = useState({ username: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`${API}/api/form/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Message sent. I'll get back to you soon.");
        setForm({ username: "", email: "", message: "" });
      } else {
        toast.error("Message not sent. Check your details and try again, or email me directly.");
      }
    } catch {
      toast.error("Couldn't reach the server. Email me directly instead.");
    } finally {
      setSending(false);
    }
  };

  const field = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-packet focus:outline-none transition-colors";

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line bg-[radial-gradient(ellipse_at_20%_0%,rgba(88,115,255,.22),transparent_55%)]">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 grid gap-14 lg:grid-cols-2">
        <div>
          <DecryptHeading text="Let’s build something live." className="font-display font-semibold text-4xl md:text-6xl tracking-tight leading-[1.05]" />
          <p className="mt-6 text-lg text-white/70 max-w-md">Have a role, a project or a question? Send a message and I’ll get back to you.</p>
          <ul className="mt-10 space-y-4 text-white/85">
            <li><a href={`mailto:${profile.email}`} className="inline-flex items-center gap-3 hover:text-packet transition-colors"><FiMail aria-hidden="true" /> {profile.email}</a></li>
            <li><a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-3 hover:text-packet transition-colors"><FiPhone aria-hidden="true" /> {profile.phone}</a></li>
            <li className="inline-flex items-center gap-3"><FiMapPin aria-hidden="true" /> {profile.location}</li>
          </ul>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="block mb-2 text-sm text-white/60">Name</span>
            <input name="username" required autoComplete="name" value={form.username} onChange={onChange} className={field} />
          </label>
          <label className="block">
            <span className="block mb-2 text-sm text-white/60">Email</span>
            <input type="email" name="email" required autoComplete="email" value={form.email} onChange={onChange} className={field} />
          </label>
          <label className="block">
            <span className="block mb-2 text-sm text-white/60">Message</span>
            <textarea name="message" required rows={5} value={form.message} onChange={onChange} className={`${field} resize-none`} />
          </label>
          <button type="submit" disabled={sending} className="w-full rounded-full bg-packet px-6 py-3.5 font-medium text-white hover:bg-fog hover:text-night transition-colors disabled:opacity-60">
            {sending ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
      <footer className="mx-auto max-w-6xl px-6 pb-24 md:pb-10 flex flex-wrap justify-between gap-4 text-sm text-white/50">
        <span className="font-islandMoment text-3xl text-white/80">Parishlesh</span>
        <span>Built with React, Node.js and MongoDB. © {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}

/* ---------- Page ---------- */
function Home({ setProgress, section }) {
  const { hash } = useLocation();

  useEffect(() => {
    setProgress?.(100);
    const id = section || hash.replace("#", "");
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, section]);

  return (
    <main>
      <Hero />
      <Experience />
      <Work />
      <About />
      <Contact />
    </main>
  );
}

const projectShape = PropTypes.shape({
  live: PropTypes.string,
  repo: PropTypes.string,
});

const workShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  what: PropTypes.string.isRequired,
  live: PropTypes.string,
  metrics: PropTypes.arrayOf(PropTypes.string).isRequired,
  points: PropTypes.arrayOf(PropTypes.string).isRequired,
});

DecryptHeading.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

SectionHead.propTypes = {
  title: PropTypes.string.isRequired,
  note: PropTypes.string,
};

ProjectLinks.propTypes = {
  p: projectShape.isRequired,
  big: PropTypes.bool,
};

WorkCard.propTypes = {
  w: workShape.isRequired,
};

Home.propTypes = {
  setProgress: PropTypes.func,
  section: PropTypes.string,
};

export default Home;
