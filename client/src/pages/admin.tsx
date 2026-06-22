import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Edit2, Trash2, Save, X, Eye, EyeOff,
  Newspaper, Bell, Users, MapPin, Scale, LogOut, Check, Mail, MailOpen,
} from "lucide-react";

/* ── Types ── */
type Tab = "news" | "notices" | "leadership" | "branches" | "judges" | "messages";

interface NewsArticle    { id: number; title: string; titleUrdu: string; excerpt: string; content: string; tag: string; isPublished: boolean; publishedAt: string; }
interface Notice         { id: number; title: string; titleUrdu: string; content: string; tag: string; isPublished: boolean; publishedAt: string; }
interface LeaderMember   { id: number; name: string; nameUrdu: string; role: string; roleUrdu: string; section: string; bio: string; sortOrder: number; isActive: boolean; }
interface Branch         { id: number; city: string; cityUrdu: string; cityKn: string; address: string; phone: string; description: string; isActive: boolean; sortOrder: number; }
interface Judge          { id: number; name: string; nameUrdu: string; role: string; roleUrdu: string; since: string; isActive: boolean; sortOrder: number; }
interface ContactMessage { id: number; name: string; email: string; message: string; isRead: boolean; createdAt: string; }

/* ── API helper ── */
function useAdminApi(token: string) {
  const headers = { "Content-Type": "application/json", "x-admin-token": token };
  const base = "/api/admin";

  const get  = (path: string) => fetch(`${base}${path}`, { headers }).then((r) => r.json());
  const post = (path: string, body: object) => fetch(`${base}${path}`, { method: "POST", headers, body: JSON.stringify(body) }).then((r) => r.json());
  const put  = (path: string, body: object) => fetch(`${base}${path}`, { method: "PUT",  headers, body: JSON.stringify(body) }).then((r) => r.json());
  const del  = (path: string) => fetch(`${base}${path}`, { method: "DELETE", headers }).then((r) => r.json());

  return { get, post, put, del };
}

/* ── Toast ── */
function useToast() {
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const show = useCallback((text: string, ok = true) => {
    setMsg({ text, ok });
    setTimeout(() => setMsg(null), 3000);
  }, []);
  return { msg, show };
}

/* ── Field ── */
function Field({ label, value, onChange, textarea = false, small = false }: {
  label: string; value: string | boolean | number; onChange: (v: string | boolean) => void;
  textarea?: boolean; small?: boolean;
}) {
  const style: React.CSSProperties = {
    width: "100%", padding: "8px 12px", borderRadius: 10, fontSize: 13,
    background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.10)",
    color: "#111", outline: "none", fontFamily: "inherit",
  };

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
        <div
          className="w-9 h-5 rounded-full relative transition-colors"
          style={{ background: value ? "#D4AF37" : "#DDD" }}
          onClick={() => onChange(!value)}
        >
          <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all" style={{ left: value ? "20px" : "2px" }} />
        </div>
        <span style={{ color: "#555" }}>{label}</span>
      </label>
    );
  }

  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{label}</label>
      {textarea ? (
        <textarea
          rows={small ? 3 : 5}
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...style, resize: "vertical" }}
        />
      ) : (
        <input
          type={typeof value === "number" ? "number" : "text"}
          value={String(value)}
          onChange={(e) => onChange(typeof value === "number" ? e.target.value : e.target.value)}
          style={style}
        />
      )}
    </div>
  );
}

/* ── Modal ── */
function Modal({ title, onClose, onSave, children }: { title: string; onClose: () => void; onSave: () => void; children: React.ReactNode }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }} />
      <motion.div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-7 shadow-2xl"
        initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.97 }}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold" style={{ color: "#111" }}>{title}</h3>
          <div className="flex gap-2">
            <button onClick={onSave} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#D4AF37,#B8960C)" }}>
              <Save size={14} /> Save
            </button>
            <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,0,0,0.06)" }}>
              <X size={15} />
            </button>
          </div>
        </div>
        <div className="space-y-4">{children}</div>
      </motion.div>
    </motion.div>
  );
}

/* ── Row actions ── */
function RowActions({ onEdit, onDelete, isPublished, onToggle }: { onEdit: () => void; onDelete: () => void; isPublished?: boolean; onToggle?: () => void; }) {
  return (
    <div className="flex items-center gap-1.5">
      {onToggle !== undefined && (
        <button onClick={onToggle} title={isPublished ? "Unpublish" : "Publish"}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
          style={{ background: isPublished ? "rgba(212,175,55,0.12)" : "rgba(0,0,0,0.05)", color: isPublished ? "#D4AF37" : "#AAA" }}>
          {isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
        </button>
      )}
      <button onClick={onEdit} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,0,0,0.05)" }}>
        <Edit2 size={12} style={{ color: "#555" }} />
      </button>
      <button onClick={onDelete} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(220,50,50,0.08)" }}>
        <Trash2 size={12} style={{ color: "#E55" }} />
      </button>
    </div>
  );
}

/* ══════════════════ MAIN ADMIN PAGE ══════════════════ */
export default function Admin() {
  const [token, setToken]     = useState<string | null>(() => sessionStorage.getItem("ies-admin-token"));
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [tab, setTab]         = useState<Tab>("news");
  const [loading, setLoading] = useState(false);
  const { msg, show }         = useToast();

  /* Data */
  const [news,       setNews]       = useState<NewsArticle[]>([]);
  const [notices,    setNotices]    = useState<Notice[]>([]);
  const [leadership, setLeadership] = useState<LeaderMember[]>([]);
  const [branches,   setBranches]   = useState<Branch[]>([]);
  const [judges,     setJudges]     = useState<Judge[]>([]);
  const [messages,   setMessages]   = useState<ContactMessage[]>([]);

  /* Modals */
  const [editNews,       setEditNews]       = useState<Partial<NewsArticle> | null>(null);
  const [editNotice,     setEditNotice]     = useState<Partial<Notice> | null>(null);
  const [editLeader,     setEditLeader]     = useState<Partial<LeaderMember> | null>(null);
  const [editBranch,     setEditBranch]     = useState<Partial<Branch> | null>(null);
  const [editJudge,      setEditJudge]      = useState<Partial<Judge> | null>(null);

  const api = useAdminApi(token ?? "");

  /* ── Load ── */
  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [n, no, l, b, j, m] = await Promise.all([
        api.get("/news"),
        api.get("/notices"),
        api.get("/leadership"),
        api.get("/branches"),
        api.get("/judges"),
        api.get("/messages"),
      ]);
      setNews(n.items ?? []);
      setNotices(no.items ?? []);
      setLeadership(l.items ?? []);
      setBranches(b.items ?? []);
      setJudges(j.items ?? []);
      setMessages(m.items ?? []);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  /* ── Login ── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: password }),
    }).then((r) => r.json());
    if (res.ok) {
      sessionStorage.setItem("ies-admin-token", password);
      setToken(password);
    } else {
      setLoginErr("Incorrect password.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("ies-admin-token");
    setToken(null);
  };

  /* ─── Login screen ─── */
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAFAFA" }}>
        <motion.div className="bg-white rounded-2xl p-10 w-full max-w-sm shadow-xl"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white text-xl font-bold mx-auto"
            style={{ background: "linear-gradient(135deg,#D4AF37,#B8960C)" }}>ع</div>
          <h1 className="text-2xl font-black text-center mb-1" style={{ color: "#111" }}>Admin Panel</h1>
          <p className="text-sm text-center mb-8" style={{ color: "#999" }}>Imarat-e-Shariah Karnataka</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.10)", color: "#111" }}
                placeholder="Enter password"
                autoFocus
              />
            </div>
            {loginErr && <p className="text-xs text-red-500">{loginErr}</p>}
            <button type="submit"
              className="w-full py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#D4AF37,#B8960C)" }}>
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  /* ─── Dashboard ─── */
  const unread = messages.filter((m) => !m.isRead).length;
  const TABS = [
    { id: "news"       as Tab, label: "News Articles",  icon: Newspaper, count: news.length },
    { id: "notices"    as Tab, label: "Notices",        icon: Bell,      count: notices.length },
    { id: "leadership" as Tab, label: "Leadership",     icon: Users,     count: leadership.length },
    { id: "branches"   as Tab, label: "Branches",       icon: MapPin,    count: branches.length },
    { id: "judges"     as Tab, label: "Judges",         icon: Scale,     count: judges.length },
    { id: "messages"   as Tab, label: "Inbox",          icon: Mail,      count: messages.length, badge: unread },
  ];

  const headerStyle: React.CSSProperties = { background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "0 24px" };
  const th: React.CSSProperties = { padding: "10px 14px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#AAA", textAlign: "left" as const, borderBottom: "1px solid rgba(0,0,0,0.06)" };
  const td: React.CSSProperties = { padding: "12px 14px", fontSize: 13, color: "#333", borderBottom: "1px solid rgba(0,0,0,0.04)", verticalAlign: "middle" };

  /* ─── Save helpers ─── */
  const saveNews = async () => {
    if (!editNews) return;
    if (editNews.id) { await api.put(`/news/${editNews.id}`, editNews); show("Article saved"); }
    else             { await api.post("/news", editNews); show("Article created"); }
    setEditNews(null); load();
  };

  const saveNotice = async () => {
    if (!editNotice) return;
    if (editNotice.id) { await api.put(`/notices/${editNotice.id}`, editNotice); show("Notice saved"); }
    else               { await api.post("/notices", editNotice); show("Notice created"); }
    setEditNotice(null); load();
  };

  const saveLeader = async () => {
    if (!editLeader) return;
    if (editLeader.id) { await api.put(`/leadership/${editLeader.id}`, editLeader); show("Member saved"); }
    else               { await api.post("/leadership", editLeader); show("Member created"); }
    setEditLeader(null); load();
  };

  const saveBranch = async () => {
    if (!editBranch) return;
    if (editBranch.id) { await api.put(`/branches/${editBranch.id}`, editBranch); show("Branch saved"); }
    else               { await api.post("/branches", editBranch); show("Branch created"); }
    setEditBranch(null); load();
  };

  const saveJudge = async () => {
    if (!editJudge) return;
    if (editJudge.id) { await api.put(`/judges/${editJudge.id}`, editJudge); show("Judge saved"); }
    else              { await api.post("/judges", editJudge); show("Judge created"); }
    setEditJudge(null); load();
  };

  /* ─── Delete helpers ─── */
  const del = async (path: string, reload: () => void) => {
    if (!confirm("Delete this item?")) return;
    await api.del(path); show("Deleted", false); reload();
  };

  const newNewsDefault: Partial<NewsArticle> = { title: "", titleUrdu: "", excerpt: "", content: "", tag: "General", isPublished: true, publishedAt: new Date().toISOString() };
  const newNoticeDefault: Partial<Notice> = { title: "", titleUrdu: "", content: "", tag: "Notice", isPublished: true, publishedAt: new Date().toISOString() };
  const newLeaderDefault: Partial<LeaderMember> = { name: "", nameUrdu: "", role: "", roleUrdu: "", section: "majlis", bio: "", sortOrder: 0, isActive: true };
  const newBranchDefault: Partial<Branch> = { city: "", cityUrdu: "", cityKn: "", address: "", phone: "", description: "", isActive: true, sortOrder: 0 };
  const newJudgeDefault: Partial<Judge> = { name: "", nameUrdu: "", role: "", roleUrdu: "", since: "", isActive: true, sortOrder: 0 };

  return (
    <div className="min-h-screen" style={{ background: "#F7F7F7" }}>

      {/* Toast */}
      <AnimatePresence>
        {msg && (
          <motion.div
            className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-white shadow-xl"
            style={{ background: msg.ok ? "linear-gradient(135deg,#D4AF37,#B8960C)" : "#333" }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {msg.ok ? <Check size={14} /> : <X size={14} />} {msg.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={headerStyle} className="flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: "linear-gradient(135deg,#D4AF37,#B8960C)" }}>ع</div>
          <div>
            <p className="text-sm font-bold" style={{ color: "#111" }}>Admin Panel</p>
            <p className="text-[10px]" style={{ color: "#AAA" }}>Imarat-e-Shariah Karnataka</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="text-xs" style={{ color: "#AAA" }}>← View Site</a>
          <button onClick={logout} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl" style={{ background: "rgba(0,0,0,0.05)", color: "#777" }}>
            <LogOut size={12} /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {TABS.map((t) => (
            <motion.button key={t.id} onClick={() => setTab(t.id)}
              className="bg-white rounded-2xl p-4 text-left transition-all relative overflow-hidden"
              style={{ border: tab === t.id ? "2px solid #D4AF37" : "2px solid transparent", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
              whileHover={{ y: -2 }}>
              <t.icon size={16} style={{ color: "#D4AF37", marginBottom: 6 }} />
              <p className="text-xl font-black" style={{ color: "#111" }}>{t.count}</p>
              <p className="text-[11px]" style={{ color: "#999" }}>{t.label}</p>
              {"badge" in t && (t as { badge?: number }).badge! > 0 && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: "#D4AF37" }}>
                  {(t as { badge?: number }).badge}
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
            <h2 className="font-bold text-base" style={{ color: "#111" }}>
              {TABS.find((t) => t.id === tab)?.label}
              {tab === "messages" && unread > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full text-[11px] font-bold text-white" style={{ background: "#D4AF37" }}>
                  {unread} unread
                </span>
              )}
            </h2>
            {tab !== "messages" && (
              <button
                onClick={() => {
                  if (tab === "news")       setEditNews(newNewsDefault);
                  if (tab === "notices")    setEditNotice(newNoticeDefault);
                  if (tab === "leadership") setEditLeader(newLeaderDefault);
                  if (tab === "branches")  setEditBranch(newBranchDefault);
                  if (tab === "judges")    setEditJudge(newJudgeDefault);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg,#D4AF37,#B8960C)" }}>
                <Plus size={13} /> Add New
              </button>
            )}
          </div>

          {loading ? (
            <div className="p-10 text-center text-sm" style={{ color: "#AAA" }}>Loading…</div>
          ) : (
            <div className="overflow-x-auto">

              {/* ── NEWS ── */}
              {tab === "news" && (
                <table className="w-full">
                  <thead>
                    <tr>
                      {["Title", "Urdu Title", "Tag", "Published", "Date", "Actions"].map((h) => <th key={h} style={th}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {news.map((a) => (
                      <tr key={a.id} className="hover:bg-amber-50/30 transition-colors">
                        <td style={td}><span className="font-medium" style={{ color: "#111" }}>{a.title}</span></td>
                        <td style={{ ...td, fontFamily: "'Noto Nastaliq Urdu',serif", direction: "rtl" }}>{a.titleUrdu || "—"}</td>
                        <td style={td}><span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(212,175,55,0.12)", color: "#B8960C" }}>{a.tag}</span></td>
                        <td style={td}>{a.isPublished ? <span style={{ color: "#22A06B" }}>●</span> : <span style={{ color: "#CCC" }}>●</span>}</td>
                        <td style={td}>{new Date(a.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                        <td style={td}>
                          <RowActions
                            onEdit={() => setEditNews(a)}
                            onDelete={() => del(`/news/${a.id}`, load)}
                            isPublished={a.isPublished}
                            onToggle={async () => { await api.put(`/news/${a.id}`, { ...a, isPublished: !a.isPublished }); load(); }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* ── NOTICES ── */}
              {tab === "notices" && (
                <table className="w-full">
                  <thead>
                    <tr>{["Title", "Urdu Title", "Tag", "Published", "Date", "Actions"].map((h) => <th key={h} style={th}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {notices.map((n) => (
                      <tr key={n.id} className="hover:bg-amber-50/30 transition-colors">
                        <td style={td}><span className="font-medium" style={{ color: "#111" }}>{n.title}</span></td>
                        <td style={{ ...td, fontFamily: "'Noto Nastaliq Urdu',serif", direction: "rtl" }}>{n.titleUrdu || "—"}</td>
                        <td style={td}><span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(212,175,55,0.12)", color: "#B8960C" }}>{n.tag}</span></td>
                        <td style={td}>{n.isPublished ? <span style={{ color: "#22A06B" }}>●</span> : <span style={{ color: "#CCC" }}>●</span>}</td>
                        <td style={td}>{new Date(n.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                        <td style={td}>
                          <RowActions
                            onEdit={() => setEditNotice(n)}
                            onDelete={() => del(`/notices/${n.id}`, load)}
                            isPublished={n.isPublished}
                            onToggle={async () => { await api.put(`/notices/${n.id}`, { ...n, isPublished: !n.isPublished }); load(); }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* ── LEADERSHIP ── */}
              {tab === "leadership" && (
                <table className="w-full">
                  <thead>
                    <tr>{["Name", "Urdu Name", "Role", "Section", "Active", "Actions"].map((h) => <th key={h} style={th}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {leadership.map((m) => (
                      <tr key={m.id} className="hover:bg-amber-50/30 transition-colors">
                        <td style={td}><span className="font-medium" style={{ color: "#111" }}>{m.name}</span></td>
                        <td style={{ ...td, fontFamily: "'Noto Nastaliq Urdu',serif", direction: "rtl" }}>{m.nameUrdu || "—"}</td>
                        <td style={td}>{m.role}</td>
                        <td style={td}><span className="capitalize px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(212,175,55,0.12)", color: "#B8960C" }}>{m.section}</span></td>
                        <td style={td}>{m.isActive ? <span style={{ color: "#22A06B" }}>●</span> : <span style={{ color: "#CCC" }}>●</span>}</td>
                        <td style={td}><RowActions onEdit={() => setEditLeader(m)} onDelete={() => del(`/leadership/${m.id}`, load)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* ── BRANCHES ── */}
              {tab === "branches" && (
                <table className="w-full">
                  <thead>
                    <tr>{["City", "Address", "Phone", "Active", "Actions"].map((h) => <th key={h} style={th}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {branches.map((b) => (
                      <tr key={b.id} className="hover:bg-amber-50/30 transition-colors">
                        <td style={td}><span className="font-medium" style={{ color: "#111" }}>{b.city}</span></td>
                        <td style={{ ...td, maxWidth: 260 }}>{b.address}</td>
                        <td style={td}>{b.phone}</td>
                        <td style={td}>{b.isActive ? <span style={{ color: "#22A06B" }}>●</span> : <span style={{ color: "#CCC" }}>●</span>}</td>
                        <td style={td}><RowActions onEdit={() => setEditBranch(b)} onDelete={() => del(`/branches/${b.id}`, load)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* ── JUDGES ── */}
              {tab === "judges" && (
                <table className="w-full">
                  <thead>
                    <tr>{["Name", "Urdu Name", "Role", "Since", "Active", "Actions"].map((h) => <th key={h} style={th}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {judges.map((j) => (
                      <tr key={j.id} className="hover:bg-amber-50/30 transition-colors">
                        <td style={td}><span className="font-medium" style={{ color: "#111" }}>{j.name}</span></td>
                        <td style={{ ...td, fontFamily: "'Noto Nastaliq Urdu',serif", direction: "rtl" }}>{j.nameUrdu || "—"}</td>
                        <td style={td}>{j.role}</td>
                        <td style={td}>{j.since || "—"}</td>
                        <td style={td}>{j.isActive ? <span style={{ color: "#22A06B" }}>●</span> : <span style={{ color: "#CCC" }}>●</span>}</td>
                        <td style={td}><RowActions onEdit={() => setEditJudge(j)} onDelete={() => del(`/judges/${j.id}`, load)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* ── MESSAGES ── */}
              {tab === "messages" && (
                messages.length === 0 ? (
                  <div className="p-12 text-center" style={{ color: "#CCC" }}>
                    <Mail size={32} style={{ margin: "0 auto 10px", opacity: 0.3 }} />
                    <p className="text-sm">No enquiries yet</p>
                  </div>
                ) : (
                  <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
                    {messages.map((m) => (
                      <div key={m.id}
                        className="p-5 hover:bg-amber-50/20 transition-colors"
                        style={{ background: m.isRead ? "transparent" : "rgba(212,175,55,0.04)" }}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: m.isRead ? "rgba(0,0,0,0.05)" : "rgba(212,175,55,0.12)" }}>
                              {m.isRead
                                ? <MailOpen size={14} style={{ color: "#AAA" }} />
                                : <Mail size={14} style={{ color: "#D4AF37" }} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm" style={{ color: "#111" }}>{m.name}</span>
                                {!m.isRead && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ background: "#D4AF37", color: "#fff" }}>NEW</span>
                                )}
                                <span className="text-[11px]" style={{ color: "#AAA" }}>
                                  {new Date(m.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                                </span>
                              </div>
                              <a href={`mailto:${m.email}`} className="text-xs mb-2 block" style={{ color: "#D4AF37" }}>{m.email}</a>
                              <p className="text-sm leading-relaxed" style={{ color: "#555", whiteSpace: "pre-wrap" }}>{m.message}</p>
                            </div>
                          </div>
                          <div className="flex gap-1.5 shrink-0">
                            {!m.isRead && (
                              <button onClick={async () => { await api.put(`/messages/${m.id}/read`, {}); load(); }}
                                title="Mark as read"
                                className="w-7 h-7 rounded-lg flex items-center justify-center"
                                style={{ background: "rgba(212,175,55,0.10)" }}>
                                <Check size={12} style={{ color: "#D4AF37" }} />
                              </button>
                            )}
                            <button onClick={() => del(`/messages/${m.id}`, load)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center"
                              style={{ background: "rgba(220,50,50,0.08)" }}>
                              <Trash2 size={12} style={{ color: "#E55" }} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

            </div>
          )}
        </div>
      </div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {editNews && (
          <Modal title={editNews.id ? "Edit Article" : "New Article"} onClose={() => setEditNews(null)} onSave={saveNews}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><Field label="Title (English)" value={editNews.title ?? ""} onChange={(v) => setEditNews({ ...editNews, title: v as string })} /></div>
              <div className="sm:col-span-2"><Field label="Title (اردو)" value={editNews.titleUrdu ?? ""} onChange={(v) => setEditNews({ ...editNews, titleUrdu: v as string })} /></div>
              <Field label="Tag" value={editNews.tag ?? "General"} onChange={(v) => setEditNews({ ...editNews, tag: v as string })} />
              <Field label="Published At" value={(editNews.publishedAt ?? "").substring(0, 10)} onChange={(v) => setEditNews({ ...editNews, publishedAt: v as string })} />
            </div>
            <Field label="Excerpt" value={editNews.excerpt ?? ""} onChange={(v) => setEditNews({ ...editNews, excerpt: v as string })} textarea small />
            <Field label="Full Content" value={editNews.content ?? ""} onChange={(v) => setEditNews({ ...editNews, content: v as string })} textarea />
            <Field label="Published" value={editNews.isPublished ?? true} onChange={(v) => setEditNews({ ...editNews, isPublished: v as boolean })} />
          </Modal>
        )}
        {editNotice && (
          <Modal title={editNotice.id ? "Edit Notice" : "New Notice"} onClose={() => setEditNotice(null)} onSave={saveNotice}>
            <Field label="Title (English)" value={editNotice.title ?? ""} onChange={(v) => setEditNotice({ ...editNotice, title: v as string })} />
            <Field label="Title (اردو)" value={editNotice.titleUrdu ?? ""} onChange={(v) => setEditNotice({ ...editNotice, titleUrdu: v as string })} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Tag" value={editNotice.tag ?? "Notice"} onChange={(v) => setEditNotice({ ...editNotice, tag: v as string })} />
              <Field label="Published At" value={(editNotice.publishedAt ?? "").substring(0, 10)} onChange={(v) => setEditNotice({ ...editNotice, publishedAt: v as string })} />
            </div>
            <Field label="Content" value={editNotice.content ?? ""} onChange={(v) => setEditNotice({ ...editNotice, content: v as string })} textarea />
            <Field label="Published" value={editNotice.isPublished ?? true} onChange={(v) => setEditNotice({ ...editNotice, isPublished: v as boolean })} />
          </Modal>
        )}
        {editLeader && (
          <Modal title={editLeader.id ? "Edit Member" : "New Member"} onClose={() => setEditLeader(null)} onSave={saveLeader}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name (English)" value={editLeader.name ?? ""} onChange={(v) => setEditLeader({ ...editLeader, name: v as string })} />
              <Field label="Full Name (اردو)" value={editLeader.nameUrdu ?? ""} onChange={(v) => setEditLeader({ ...editLeader, nameUrdu: v as string })} />
              <Field label="Role (English)" value={editLeader.role ?? ""} onChange={(v) => setEditLeader({ ...editLeader, role: v as string })} />
              <Field label="Role (اردو)" value={editLeader.roleUrdu ?? ""} onChange={(v) => setEditLeader({ ...editLeader, roleUrdu: v as string })} />
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Section</label>
                <select value={editLeader.section ?? "majlis"} onChange={(e) => setEditLeader({ ...editLeader, section: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 10, fontSize: 13, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.10)", color: "#111" }}>
                  <option value="majlis">Majlis e Emarat</option>
                  <option value="sabiq">Sabiq Umara</option>
                  <option value="arkan">Arkan e Shura</option>
                  <option value="umumi">Majlis e Umumi</option>
                </select>
              </div>
              <Field label="Sort Order" value={editLeader.sortOrder ?? 0} onChange={(v) => setEditLeader({ ...editLeader, sortOrder: Number(v) })} />
            </div>
            <Field label="Bio (English)" value={editLeader.bio ?? ""} onChange={(v) => setEditLeader({ ...editLeader, bio: v as string })} textarea small />
            <Field label="Active" value={editLeader.isActive ?? true} onChange={(v) => setEditLeader({ ...editLeader, isActive: v as boolean })} />
          </Modal>
        )}
        {editBranch && (
          <Modal title={editBranch.id ? "Edit Branch" : "New Branch"} onClose={() => setEditBranch(null)} onSave={saveBranch}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="City (English)" value={editBranch.city ?? ""} onChange={(v) => setEditBranch({ ...editBranch, city: v as string })} />
              <Field label="City (اردو)" value={editBranch.cityUrdu ?? ""} onChange={(v) => setEditBranch({ ...editBranch, cityUrdu: v as string })} />
              <Field label="City (ಕನ್ನಡ)" value={editBranch.cityKn ?? ""} onChange={(v) => setEditBranch({ ...editBranch, cityKn: v as string })} />
              <Field label="Phone" value={editBranch.phone ?? ""} onChange={(v) => setEditBranch({ ...editBranch, phone: v as string })} />
              <Field label="Sort Order" value={editBranch.sortOrder ?? 0} onChange={(v) => setEditBranch({ ...editBranch, sortOrder: Number(v) })} />
            </div>
            <Field label="Address" value={editBranch.address ?? ""} onChange={(v) => setEditBranch({ ...editBranch, address: v as string })} />
            <Field label="Description" value={editBranch.description ?? ""} onChange={(v) => setEditBranch({ ...editBranch, description: v as string })} textarea small />
            <Field label="Active" value={editBranch.isActive ?? true} onChange={(v) => setEditBranch({ ...editBranch, isActive: v as boolean })} />
          </Modal>
        )}
        {editJudge && (
          <Modal title={editJudge.id ? "Edit Judge" : "New Judge"} onClose={() => setEditJudge(null)} onSave={saveJudge}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name (English)" value={editJudge.name ?? ""} onChange={(v) => setEditJudge({ ...editJudge, name: v as string })} />
              <Field label="Full Name (اردو)" value={editJudge.nameUrdu ?? ""} onChange={(v) => setEditJudge({ ...editJudge, nameUrdu: v as string })} />
              <Field label="Role (English)" value={editJudge.role ?? ""} onChange={(v) => setEditJudge({ ...editJudge, role: v as string })} />
              <Field label="Role (اردو)" value={editJudge.roleUrdu ?? ""} onChange={(v) => setEditJudge({ ...editJudge, roleUrdu: v as string })} />
              <Field label="Since" value={editJudge.since ?? ""} onChange={(v) => setEditJudge({ ...editJudge, since: v as string })} />
              <Field label="Sort Order" value={editJudge.sortOrder ?? 0} onChange={(v) => setEditJudge({ ...editJudge, sortOrder: Number(v) })} />
            </div>
            <Field label="Active" value={editJudge.isActive ?? true} onChange={(v) => setEditJudge({ ...editJudge, isActive: v as boolean })} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
