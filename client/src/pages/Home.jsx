import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { FiArrowUpRight, FiDownload, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import CipherText from "../components/CipherText";
import PacketStream from "../components/PacketStream";
import { useAuth } from "../storage/auth";
import { profile, experience, projects, skills } from "../data/portfolio";

const ICONS = { GitHub: FaGithub, LinkedIn: FaLinkedin, X: FaXTwitter, Instagram: FaInstagram };

function SectionHead({ title, note }) {
  return (
    <div className="mb-10 md:mb-14 max-w-2xl">
      <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-tight">{title}</h2>
      {note && <p className="mt-4 text-muted text-lg leading-relaxed">{note}</p>}
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative net-grid">
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-20 md:pt-40 md:pb-28 grid gap-14 lg:grid-cols-[1.25fr_1fr] items-center">
        <div>
          <p className="flex items-center gap-2 text-muted mb-6">
            <span className="live-dot h-2 w-2 rounded-full bg-signal" />
            {profile.role} in {profile.location}
          </p>
          <CipherText
            as="h1"
            text={profile.name}
            duration={1400}
            delay={200}
            className="block font-display font-extrabold tracking-tight leading-[0.95] text-[clamp(2.8rem,9vw,6.5rem)] break-words"
          />
          <p className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-ink/80">{profile.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-medium text-white hover:bg-ink transition-colors">
              See my work
            </a>
            <a href={profile.resume} download="Parishlesh-resume.pdf" className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-6 py-3 font-medium hover:border-ink transition-colors">
              <FiDownload aria-hidden="true" /> Download résumé
            </a>
          </div>
          <ul className="mt-10 flex gap-5">
            {profile.socials.map(({ label, href }) => {
              const Icon = ICONS[label];
              return (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-2xl text-muted hover:text-signal transition-colors">
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-center lg:justify-end">
          <PacketStream />
        </div>
      </div>
    </section>
  );
}

/* ---------- Work: skills filter + projects ---------- */
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
      <SectionHead title="Selected work" note="Point at a skill to see where I've used it. Click to keep it selected." />
      <div className="grid gap-12 lg:grid-cols-[15rem_1fr]">
        {/* skills */}
        <aside className="lg:sticky lg:top-28 self-start" onMouseLeave={() => hover(null)}>
          {skills.map(({ group, items }) => (
            <div key={group} className="mb-7">
              <h3 className="text-sm text-muted mb-3">{group}</h3>
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
                          on ? "bg-ink text-white border-ink" : "bg-white border-rule hover:border-ink"
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
          <p className="min-h-[3rem] text-sm text-muted" aria-live="polite">
            {active && atWork && `${active}: used in production at ${experience[0].company.split(" ")[0]}.`}
            {active && !atWork && !anyProject && `${active}: part of my everyday toolkit.`}
          </p>
          {pinned && (
            <button type="button" onClick={() => { setPinned(false); setActive(null); }} className="text-sm text-signal underline underline-offset-4">
              Clear selection
            </button>
          )}
        </aside>

        {/* projects */}
        <div>
          {featured && (
            <article
              className={`relative rounded-[28px] bg-ink text-white p-8 md:p-12 overflow-hidden transition-opacity duration-300 ${matches(featured) ? "opacity-100" : "opacity-25"}`}
            >
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-signal/40 blur-3xl" aria-hidden="true" />
              <p className="relative text-white/60 mb-4">Featured project</p>
              <h3 className="relative font-display font-semibold text-4xl md:text-6xl tracking-tight">{featured.name}</h3>
              <p className="relative mt-3 text-xl text-white/80">{featured.tagline}</p>
              <p className="relative mt-6 max-w-2xl leading-relaxed text-white/75">{featured.description}</p>
              <ul className="relative mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {featured.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-white/90">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-packet" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="relative mt-10 flex flex-wrap items-center justify-between gap-6">
                <ul className="flex flex-wrap gap-2">
                  {featured.stack.map((s) => (
                    <li key={s} className={`rounded-full px-3 py-1 text-sm ${active === s ? "bg-packet text-white" : "bg-white/10"}`}>{s}</li>
                  ))}
                </ul>
                <a href={featured.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium hover:text-packet transition-colors">
                  View code <FiArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </article>
          )}

          <ul className="mt-6 border-t border-rule">
            {rest.map((p) => (
              <li key={p.name} className={`group border-b border-rule transition-opacity duration-300 ${matches(p) ? "opacity-100" : "opacity-25"}`}>
                <a href={p.repo} target="_blank" rel="noreferrer" className="block py-7 md:py-8 focus-visible:outline-offset-0">
                  <div className="flex items-baseline justify-between gap-6">
                    <div>
                      <h3 className="font-display font-semibold text-2xl md:text-3xl tracking-tight group-hover:text-signal transition-colors">{p.name}</h3>
                      <p className="mt-1 text-muted">{p.tagline}</p>
                    </div>
                    <FiArrowUpRight className="shrink-0 text-2xl text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" aria-hidden="true" />
                  </div>
                  <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
                    <div className="overflow-hidden">
                      <p className="pt-4 max-w-2xl leading-relaxed text-ink/80">{p.description}</p>
                    </div>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <li key={s} className={`rounded-full border px-2.5 py-0.5 text-xs ${active === s ? "bg-signal text-white border-signal" : "border-rule text-muted"}`}>{s}</li>
                    ))}
                  </ul>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience timeline ---------- */
function Experience() {
  return (
    <section id="experience" className="bg-white border-y border-rule">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHead title="Experience" />
        <ol className="relative border-l-2 border-rule ml-2">
          {experience.map((e, i) => (
            <li key={e.company} className="relative pl-8 md:pl-12 pb-14 last:pb-0">
              <span className={`absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 border-white ${i === 0 ? "bg-signal live-dot" : "bg-rule"}`} aria-hidden="true" />
              <div className="grid md:grid-cols-[12rem_1fr] gap-2 md:gap-10">
                <p className="text-muted pt-1">{e.period}</p>
                <div>
                  <h3 className="font-display font-semibold text-xl md:text-2xl tracking-tight">{e.title}</h3>
                  <p className="mt-1 text-ink/70">{e.company}, {e.place}</p>
                  <ul className="mt-5 space-y-2 max-w-2xl">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-3 leading-relaxed text-ink/80">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-packet" aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
      <div className="space-y-5 text-lg leading-relaxed text-ink/80 max-w-xl">
        <p>
          Messages that arrive the instant they’re sent. Video calls that connect without a fuss.
          Data that’s private by design, not by promise. That’s the work I enjoy most, and it’s
          why most of what I build leans on Socket.IO, WebRTC and careful backend design.
        </p>
        <p>
          I work across the whole stack, so I can take a feature from schema to screen without
          waiting on hand-offs.
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
  const { user, API } = useAuth();
  const [form, setForm] = useState({ username: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, username: f.username || user.username, email: f.email || user.email }));
  }, [user]);

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
    <section id="contact" className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 grid gap-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-tight leading-[1.05]">Let’s build something live.</h2>
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
          <button type="submit" disabled={sending} className="w-full rounded-full bg-packet px-6 py-3.5 font-medium text-white hover:bg-white hover:text-ink transition-colors disabled:opacity-60">
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
export default function Home({ setProgress, section }) {
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
      <Work />
      <Experience />
      <About />
      <Contact />
    </main>
  );
}
