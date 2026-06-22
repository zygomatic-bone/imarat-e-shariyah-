import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Bell, BookOpen, ChevronRight, Search, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import {
  useListNewsArticles,
  useListNotices,
  type NewsArticle,
  type Notice,
} from "@/lib/api";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function ArticleModal({ article, onClose }: { article: NewsArticle; onClose: () => void }) {
  const { theme } = useApp();
  const isDark = theme === "dark";
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(12px)" }} />
      <motion.div className="relative w-full max-w-2xl max-h-[82vh] overflow-y-auto rounded-3xl p-8"
        style={{ background: isDark ? "#0F0F0F" : "#fff", border: isDark ? "1px solid rgba(212,175,55,0.15)" : "1px solid rgba(0,0,0,0.08)", boxShadow: "0 40px 100px rgba(0,0,0,0.5)" }}
        initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 10 }}
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)" }}>
          <X size={14} style={{ color: "var(--text-secondary)" }} />
        </button>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "rgba(212,175,55,0.12)", color: "#D4AF37" }}>
          {article.tag}
        </span>
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
          {new Date(article.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <h2 className="text-2xl font-black mb-2 leading-snug" style={{ color: "var(--text-primary)" }}>{article.title}</h2>
        {article.titleUrdu && (
          <p className="text-base mb-5" dir="rtl" style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }}>{article.titleUrdu}</p>
        )}
        <div className="gold-divider mb-5" />
        <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text-secondary)" }}>
          {article.content || article.excerpt}
        </p>
      </motion.div>
    </motion.div>
  );
}

function NoticeModal({ notice, onClose }: { notice: Notice; onClose: () => void }) {
  const { theme } = useApp();
  const isDark = theme === "dark";
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(12px)" }} />
      <motion.div className="relative w-full max-w-2xl max-h-[82vh] overflow-y-auto rounded-3xl p-8"
        style={{ background: isDark ? "#0F0F0F" : "#fff", border: isDark ? "1px solid rgba(212,175,55,0.15)" : "1px solid rgba(0,0,0,0.08)", boxShadow: "0 40px 100px rgba(0,0,0,0.5)" }}
        initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 10 }}
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)" }}>
          <X size={14} style={{ color: "var(--text-secondary)" }} />
        </button>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "rgba(212,175,55,0.12)", color: "#D4AF37" }}>
          {notice.tag}
        </span>
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
          {new Date(notice.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <h2 className="text-2xl font-black mb-2 leading-snug" style={{ color: "var(--text-primary)" }}>{notice.title}</h2>
        {notice.titleUrdu && (
          <p className="text-base mb-5" dir="rtl" style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }}>{notice.titleUrdu}</p>
        )}
        <div className="gold-divider mb-5" />
        <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text-secondary)" }}>{notice.content}</p>
      </motion.div>
    </motion.div>
  );
}

type Tab = "news" | "notices";

export default function News() {
  const { theme, t } = useApp();
  const isDark = theme === "dark";
  const [tab, setTab] = useState<Tab>("news");
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const { data: newsData, isLoading: newsLoading } = useListNewsArticles({ limit: 50, offset: 0 });
  const { data: noticesData, isLoading: noticesLoading } = useListNotices({ limit: 50, offset: 0 });

  const articles = newsData?.items ?? [];
  const notices = noticesData?.items ?? [];

  const filteredArticles = articles.filter(
    (a) => a.title.toLowerCase().includes(search.toLowerCase()) || (a.excerpt ?? "").toLowerCase().includes(search.toLowerCase()),
  );
  const filteredNotices = notices.filter(
    (n) => n.title.toLowerCase().includes(search.toLowerCase()) || (n.content ?? "").toLowerCase().includes(search.toLowerCase()),
  );

  const tags = [...new Set(articles.map((a) => a.tag))].filter(Boolean);

  return (
    <div className="min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />

      {/* Hero — dark */}
      <section className="section-dark islamic-pattern-dark pt-36 pb-20 px-6 text-center relative overflow-hidden" style={{ background: "#0A0A0A" }}>
        <div className="relative z-10">
          <Reveal>
            <div className="section-label justify-center" style={{ color: "#D4AF37" }}>Media Centre</div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-3">{t("news")}</h1>
            <p className="text-2xl mb-4" style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }} dir="rtl">اخبار و اطلاعات</p>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#888" }}>
              Official announcements, judicial notices, and updates from Imarat-e-Shariah Karnataka.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Sticky controls */}
      <div className="sticky top-16 z-40 py-4 px-6" style={{ background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--surface-border)" }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex rounded-xl overflow-hidden shrink-0" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)" }}>
            {(["news", "notices"] as Tab[]).map((tb) => (
              <button key={tb} onClick={() => setTab(tb)}
                className="flex items-center gap-2 px-4 py-2.5 text-[12.5px] font-semibold transition-all"
                style={{ background: tab === tb ? "linear-gradient(135deg,#D4AF37,#B8960C)" : "transparent", color: tab === tb ? "#fff" : isDark ? "#888" : "#777" }}>
                {tb === "news" ? <BookOpen size={13} /> : <Bell size={13} />}
                {tb === "news" ? "News Articles" : "Notices & Circulars"}
                <span className="ml-1 rounded-full px-1.5 py-0.5 text-[10px]"
                  style={{ background: tab === tb ? "rgba(255,255,255,0.2)" : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", color: tab === tb ? "#fff" : isDark ? "#AAA" : "#888" }}>
                  {tb === "news" ? articles.length : notices.length}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl flex-1 max-w-sm"
            style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)" }}>
            <Search size={13} style={{ color: "#AAA" }} />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${tab}…`} className="flex-1 bg-transparent text-sm outline-none" style={{ color: "var(--text-primary)" }} />
            {search && <button onClick={() => setSearch("")}><X size={12} style={{ color: "#AAA" }} /></button>}
          </div>
        </div>
      </div>

      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {tab === "news" ? (
              <motion.div key="news" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {tags.map((tag) => (
                      <button key={tag} onClick={() => setSearch(search === tag ? "" : tag)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                        style={{ background: search === tag ? "linear-gradient(135deg,#D4AF37,#B8960C)" : isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)", color: search === tag ? "#fff" : isDark ? "#AAA" : "#777" }}>
                        {tag}
                      </button>
                    ))}
                  </div>
                )}

                {newsLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-56 rounded-2xl animate-pulse" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }} />
                    ))}
                  </div>
                ) : filteredArticles.length === 0 ? (
                  <div className="text-center py-20"><p style={{ color: "var(--text-muted)" }}>No articles found.</p></div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredArticles.map((article, i) => (
                      <Reveal key={article.id} delay={i * 0.05}>
                        <motion.button onClick={() => setSelectedArticle(article)}
                          className={`w-full text-left ${isDark ? "glass-card-dark" : "glass-card"} p-6`}
                          style={{ display: "flex", flexDirection: "column", height: "100%", cursor: "pointer" }}
                          whileHover={{ scale: 1.015, boxShadow: isDark ? "0 20px 50px rgba(0,0,0,0.5)" : "0 16px 48px rgba(0,0,0,0.09)" }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}>
                          <div className="flex items-center justify-between mb-4">
                            <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: "rgba(212,175,55,0.10)", color: "#D4AF37" }}>{article.tag}</span>
                            <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                              {new Date(article.publishedAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                            </span>
                          </div>
                          <h3 className="text-[15px] font-bold mb-2 leading-snug flex-1" style={{ color: "var(--text-primary)" }}>{article.title}</h3>
                          {article.titleUrdu && (
                            <p className="text-xs mb-3" dir="rtl" style={{ color: "rgba(212,175,55,0.65)", fontFamily: "'Noto Nastaliq Urdu', serif" }}>{article.titleUrdu}</p>
                          )}
                          <p className="text-[12.5px] leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{article.excerpt}</p>
                          <div className="flex items-center gap-1 text-xs font-semibold mt-auto" style={{ color: "#D4AF37" }}>
                            Read more <ChevronRight size={12} />
                          </div>
                        </motion.button>
                      </Reveal>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div key="notices" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>
                {noticesLoading ? (
                  <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-20 rounded-2xl animate-pulse" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }} />)}</div>
                ) : filteredNotices.length === 0 ? (
                  <div className="text-center py-20"><p style={{ color: "var(--text-muted)" }}>No notices found.</p></div>
                ) : (
                  <div className="space-y-3 max-w-3xl">
                    {filteredNotices.map((notice, i) => (
                      <Reveal key={notice.id} delay={i * 0.04}>
                        <motion.button onClick={() => setSelectedNotice(notice)}
                          className={`w-full text-left ${isDark ? "glass-card-dark" : "glass-card"} p-5`}
                          style={{ cursor: "pointer" }}
                          whileHover={{ scale: 1.008, x: 4 }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1 min-w-0">
                              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(212,175,55,0.10)" }}>
                                <Bell size={14} style={{ color: "#D4AF37" }} />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(212,175,55,0.10)", color: "#B8960C" }}>{notice.tag}</span>
                                  <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                                    {new Date(notice.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                  </span>
                                </div>
                                <p className="text-[13.5px] font-semibold truncate" style={{ color: "var(--text-primary)" }}>{notice.title}</p>
                                {notice.titleUrdu && (
                                  <p className="text-xs mt-0.5" dir="rtl" style={{ color: "rgba(212,175,55,0.60)", fontFamily: "'Noto Nastaliq Urdu', serif" }}>{notice.titleUrdu}</p>
                                )}
                              </div>
                            </div>
                            <ArrowRight size={14} className="shrink-0 mt-1" style={{ color: "#D4AF37" }} />
                          </div>
                        </motion.button>
                      </Reveal>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
        {selectedNotice && <NoticeModal notice={selectedNotice} onClose={() => setSelectedNotice(null)} />}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
