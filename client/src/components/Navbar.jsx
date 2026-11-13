import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../storage/auth";
import { FiBriefcase, FiClock, FiUser, FiSend, FiLogIn, FiLogOut } from "react-icons/fi";

const LINKS = [
  { id: "work", label: "Work", Icon: FiBriefcase },
  { id: "experience", label: "Experience", Icon: FiClock },
  { id: "about", label: "About", Icon: FiUser },
  { id: "contact", label: "Contact", Icon: FiSend },
];

export default function Navbar() {
  const { isLoggedIn, logoutUser } = useAuth();
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

  const authLink = isLoggedIn
    ? { to: "/logout", label: "Log out", Icon: FiLogOut, onClick: logoutUser }
    : { to: "/login", label: "Log in", Icon: FiLogIn };

  return (
    <>
      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-4">
        <div className={`flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border border-rule shadow-lift" : "border border-transparent"}`}>
          <Link to="/" className="font-islandMoment text-4xl leading-none text-ink" aria-label="Parishlesh, home">
            Parishlesh
          </Link>
          <nav className="hidden md:block" aria-label="Main">
            <ul className="flex items-center gap-1">
              {LINKS.map(({ id, label }) => (
                <li key={id}>
                  <Link
                    to={{ pathname: "/", hash: `#${id}` }}
                    className={`rounded-full px-4 py-2 text-[15px] transition-colors ${current === id ? "bg-ink text-white" : "text-ink/75 hover:text-ink"}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="ml-2">
                <NavLink to={authLink.to} onClick={authLink.onClick} className="rounded-full border border-ink/20 px-4 py-2 text-[15px] hover:border-ink transition-colors">
                  {authLink.label}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* mobile dock */}
      <nav className="md:hidden fixed inset-x-0 bottom-4 z-30 flex justify-center px-4" aria-label="Main">
        <ul className="flex gap-1 rounded-full bg-ink/95 backdrop-blur px-2 py-2 shadow-lift">
          {LINKS.map(({ id, label, Icon }) => (
            <li key={id}>
              <Link to={{ pathname: "/", hash: `#${id}` }} aria-label={label}
                className={`grid h-11 w-11 place-items-center rounded-full text-lg transition-colors ${current === id ? "bg-white text-ink" : "text-white/75"}`}>
                <Icon />
              </Link>
            </li>
          ))}
          <li>
            <NavLink to={authLink.to} onClick={authLink.onClick} aria-label={authLink.label}
              className="grid h-11 w-11 place-items-center rounded-full text-lg text-white/75">
              <authLink.Icon />
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
