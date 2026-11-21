import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiBriefcase, FiCode, FiUser, FiSend } from "react-icons/fi";

const LINKS = [
  { id: "experience", label: "Experience", Icon: FiBriefcase },
  { id: "work", label: "Projects", Icon: FiCode },
  { id: "about", label: "About", Icon: FiUser },
  { id: "contact", label: "Contact", Icon: FiSend },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    const t = setTimeout(() => LINKS.forEach(({ id }) => { const el = document.getElementById(id); el && io.observe(el); }), 300);
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); clearTimeout(t); setCurrent(""); };
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-4">
        <div className={`flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${scrolled ? "bg-night/70 backdrop-blur-md border border-line" : "border border-transparent"}`}>
          <Link to="/" className="font-islandMoment text-4xl leading-none text-fog" aria-label="Parishlesh, home">
            Parishlesh
          </Link>
          <nav className="hidden md:block" aria-label="Main">
            <ul className="flex items-center gap-1">
              {LINKS.map(({ id, label }) => (
                <li key={id}>
                  <Link
                    to={{ pathname: "/", hash: `#${id}` }}
                    className={`rounded-full px-4 py-2 text-[15px] transition-colors ${current === id ? "bg-fog text-night" : "text-fog/70 hover:text-fog"}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* mobile dock */}
      <nav className="md:hidden fixed inset-x-0 bottom-4 z-30 flex justify-center px-4" aria-label="Main">
        <ul className="flex gap-1 rounded-full bg-deep/90 border border-line backdrop-blur px-2 py-2 shadow-lift">
          {LINKS.map(({ id, label, Icon }) => (
            <li key={id}>
              <Link to={{ pathname: "/", hash: `#${id}` }} aria-label={label}
                className={`grid h-11 w-11 place-items-center rounded-full text-lg transition-colors ${current === id ? "bg-fog text-night" : "text-fog/70"}`}>
                <Icon />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
