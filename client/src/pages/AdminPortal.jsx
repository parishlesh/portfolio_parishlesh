import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FiLogOut, FiMail, FiTrash2, FiRefreshCw, FiSearch } from "react-icons/fi";
import { API } from "../../constants";

const TOKEN_KEY = "token";

const getToken = () => {
  try { return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || ""; }
  catch { return ""; }
};
const clearToken = () => {
  try { localStorage.removeItem(TOKEN_KEY); sessionStorage.removeItem(TOKEN_KEY); } catch { /* storage unavailable */ }
};

// MongoDB ObjectIds start with a 4-byte creation timestamp.
const idDate = (id) => new Date(parseInt(String(id).slice(0, 8), 16) * 1000);
const fmtDate = (d) =>
  d.toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });

async function api(path, token, opts = {}) {
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...(opts.headers || {}) },
  });
  let data = null;
  try { data = await res.json(); } catch { /* empty body */ }
  return { ok: res.ok, status: res.status, data };
}

/* ---------- Login ---------- */
function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.token) {
        setError(data.extraDetails || data.message || "Login failed. Check your email and password.");
        return;
      }
      try { (form.remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, data.token); } catch { /* ignore */ }
      onLogin(data.token);
    } catch {
      setError("Couldn't reach the server. It may be waking up on Render; try again in 30 seconds.");
    } finally {
      setBusy(false);
    }
  };

  const field = "w-full rounded-xl border border-line bg-deep px-4 py-3 text-fog placeholder:text-dim focus:border-packet focus:outline-none";

  return (
    <main className="grid min-h-[100svh] place-items-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4">
        <h1 className="font-display font-semibold text-3xl tracking-tight">Admin</h1>
        <p className="text-dim">Log in to read messages from the contact form.</p>
        <label className="block">
          <span className="mb-2 block text-sm text-dim">Email</span>
          <input type="email" required autoComplete="email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-dim">Password</span>
          <input type="password" required autoComplete="current-password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} className={field} />
        </label>
        <label className="flex items-center gap-2 text-sm text-dim">
          <input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} />
          Keep me logged in on this device
        </label>
        {error && <p role="alert" className="rounded-xl border border-packet/40 bg-packet/10 px-4 py-3 text-sm text-packet">{error}</p>}
        <button type="submit" disabled={busy}
          className="w-full rounded-full bg-fog px-6 py-3 font-medium text-night hover:bg-packet hover:text-white transition-colors disabled:opacity-60">
          {busy ? "Logging in…" : "Log in"}
        </button>
        <Link to="/" className="block text-center text-sm text-dim hover:text-fog">Back to the site</Link>
      </form>
    </main>
  );
}

/* ---------- Dashboard ---------- */
function Dashboard({ token, user, onLogout }) {
  const [tab, setTab] = useState("messages");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const [m, u] = await Promise.all([api("/api/admin/contacts", token), api("/api/admin/users", token)]);
    if (m.status === 401 || u.status === 401) { onLogout(); return; }
    // the API answers 404 when a list is empty
    setMessages(m.ok && Array.isArray(m.data) ? [...m.data].sort((a, b) => (a._id < b._id ? 1 : -1)) : []);
    setUsers(u.ok && Array.isArray(u.data) ? u.data : []);
    if (!m.ok && m.status !== 404) toast.error("Couldn't load messages. Try refreshing.");
    setLoading(false);
  }, [token, onLogout]);

  useEffect(() => { load(); }, [load]);

  const remove = async (kind, id, label) => {
    if (!window.confirm(`Delete ${label}? This can't be undone.`)) return;
    const path = kind === "message" ? `/api/admin/contacts/delete/${id}` : `/api/admin/users/delete/${id}`;
    const res = await api(path, token, { method: "DELETE" });
    if (res.ok) {
      toast.success(kind === "message" ? "Message deleted" : "User deleted");
      kind === "message" ? setMessages((l) => l.filter((x) => x._id !== id)) : setUsers((l) => l.filter((x) => x._id !== id));
    } else {
      toast.error("Delete failed. Try again.");
    }
  };

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = tab === "messages" ? messages : users;
    if (!q) return list;
    return list.filter((x) => Object.values(x).some((v) => typeof v === "string" && v.toLowerCase().includes(q)));
  }, [tab, messages, users, query]);

  const tabBtn = (id, label, count) => (
    <button type="button" onClick={() => setTab(id)} aria-pressed={tab === id}
      className={`rounded-full px-4 py-2 text-sm transition-colors ${tab === id ? "bg-fog text-night" : "text-fog/70 hover:text-fog"}`}>
      {label} <span className="ml-1 opacity-60">{count}</span>
    </button>
  );

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to="/" className="font-islandMoment text-4xl leading-none">Parishlesh</Link>
          <p className="mt-1 text-sm text-dim">Admin · signed in as {user.email}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={load} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-dim">
            <FiRefreshCw aria-hidden="true" className={loading ? "animate-spin" : ""} /> Refresh
          </button>
          <button type="button" onClick={onLogout} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-dim">
            <FiLogOut aria-hidden="true" /> Log out
          </button>
        </div>
      </header>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1 rounded-full border border-line p-1">
          {tabBtn("messages", "Messages", messages.length)}
          {tabBtn("users", "Users", users.length)}
        </div>
        <label className="relative w-full sm:w-72">
          <span className="sr-only">Search</span>
          <FiSearch aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${tab}`}
            className="w-full rounded-full border border-line bg-deep py-2.5 pl-10 pr-4 text-sm placeholder:text-dim focus:border-packet focus:outline-none" />
        </label>
      </div>

      <section className="mt-6">
        {loading ? (
          <p className="py-16 text-center text-dim">Loading…</p>
        ) : shown.length === 0 ? (
          <p className="py-16 text-center text-dim">
            {query ? "Nothing matches your search." : tab === "messages" ? "No messages yet. New ones from the contact form will show up here." : "No users."}
          </p>
        ) : tab === "messages" ? (
          <ul className="space-y-4">
            {shown.map((m) => (
              <li key={m._id} className="rounded-2xl border border-line bg-deep/60 p-5 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{m.username}</p>
                    <a href={`mailto:${m.email}`} className="text-sm text-dim hover:text-packet">{m.email}</a>
                  </div>
                  <time dateTime={idDate(m._id).toISOString()} className="text-sm text-dim">{fmtDate(idDate(m._id))}</time>
                </div>
                <p className="mt-4 whitespace-pre-wrap leading-relaxed text-fog/85">{m.message}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={`mailto:${m.email}?subject=${encodeURIComponent("Re: your message on my portfolio")}`}
                    className="inline-flex items-center gap-2 rounded-full bg-fog px-4 py-2 text-sm font-medium text-night hover:bg-packet hover:text-white transition-colors">
                    <FiMail aria-hidden="true" /> Reply by email
                  </a>
                  <button type="button" onClick={() => remove("message", m._id, `the message from ${m.username}`)}
                    className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-packet hover:text-packet transition-colors">
                    <FiTrash2 aria-hidden="true" /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-deep text-dim">
                <tr><th className="px-5 py-3 font-medium">Name</th><th className="px-5 py-3 font-medium">Email</th><th className="px-5 py-3 font-medium">Phone</th><th className="px-5 py-3 font-medium">Role</th><th className="px-5 py-3"><span className="sr-only">Actions</span></th></tr>
              </thead>
              <tbody>
                {shown.map((u) => (
                  <tr key={u._id} className="border-t border-line">
                    <td className="px-5 py-3">{u.username}</td>
                    <td className="px-5 py-3 text-fog/80">{u.email}</td>
                    <td className="px-5 py-3 text-fog/80">{u.phone || "—"}</td>
                    <td className="px-5 py-3">{u.isAdmin ? <span className="text-packet">Admin</span> : <span className="text-dim">User</span>}</td>
                    <td className="px-5 py-3 text-right">
                      {u._id !== user._id && (
                        <button type="button" onClick={() => remove("user", u._id, u.email)} className="text-dim hover:text-packet" aria-label={`Delete ${u.email}`}>
                          <FiTrash2 />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

/* ---------- Gate ---------- */
export default function AdminPortal() {
  const [token, setToken] = useState(getToken);
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(!!getToken());

  const logout = useCallback(() => { clearToken(); setToken(""); setUser(null); }, []);

  useEffect(() => {
    if (!token) { setChecking(false); return; }
    let live = true;
    setChecking(true);
    api("/api/auth/user", token).then((res) => {
      if (!live) return;
      if (res.ok && res.data?.userData) setUser(res.data.userData);
      else logout();
      setChecking(false);
    }).catch(() => { if (live) { setChecking(false); toast.error("Couldn't reach the server. Try again shortly."); } });
    return () => { live = false; };
  }, [token, logout]);

  useEffect(() => { document.title = "Admin — Parishlesh"; return () => { document.title = "Parishlesh — Full Stack Developer"; }; }, []);

  if (checking) return <main className="grid min-h-[100svh] place-items-center text-dim">Checking your session…</main>;
  if (!token || !user) return <Login onLogin={setToken} />;
  if (!user.isAdmin) {
    return (
      <main className="grid min-h-[100svh] place-items-center px-6 text-center">
        <div>
          <p className="text-lg">This account isn’t an admin.</p>
          <button type="button" onClick={logout} className="mt-6 rounded-full border border-line px-5 py-2.5 hover:border-dim">Log in with another account</button>
        </div>
      </main>
    );
  }
  return <Dashboard token={token} user={user} onLogout={logout} />;
}

Login.propTypes = { onLogin: PropTypes.func.isRequired };
Dashboard.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.shape({ _id: PropTypes.string, email: PropTypes.string }).isRequired,
  onLogout: PropTypes.func.isRequired,
};
