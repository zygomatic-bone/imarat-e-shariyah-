import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react";
import { useApp, type Lang } from "@/context/AppContext";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ur", label: "اردو" },
  { code: "kn", label: "ಕನ್ನಡ" },
];

export default function Navbar() {
  const { theme, lang, toggleTheme, setLang, t } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [location] = useLocation();
  const isDark = theme === "dark";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const NAV_ITEMS = [
    { key: "home",   href: "/" },
    { key: "taruf",  href: "/taruf" },
    {
      key: "emarat", href: "/emarat",
      children: [
        { key: "sabiq",  href: "/emarat#sabiq" },
        { key: "majlis", href: "/emarat#majlis" },
        { key: "arkan",  href: "/emarat#arkan" },
        { key: "umumi",  href: "/emarat#umumi" },
      ],
    },
    {
      key: "shuaba", href: "/shuaba",
      children: [
        { key: "allDepts",  href: "/shuaba" },
        { key: "darulKaza", href: "/shuaba#darul-kaza" },
        { key: "branches",  href: "/shuaba#branches" },
      ],
    },
    { key: "news", href: "/news" },
  ];

  const navBg = scrolled
    ? isDark
      ? "rgba(10,10,10,0.94)"
      : "rgba(255,255,255,0.93)"
    : "rgba(0,0,0,0)";

  const navBorder = scrolled
    ? isDark
      ? "1px solid rgba(255,255,255,0.07)"
      : "1px solid rgba(0,0,0,0.07)"
    : "1px solid transparent";

  const textColor = isDark ? "#E5E5E5" : "#333";
  const activeColor = "#D4AF37";

  const dropdownBg = isDark
    ? "rgba(14,14,14,0.97)"
    : "rgba(255,255,255,0.97)";

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="transition-all duration-500"
        style={{
          background: navBg,
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: navBorder,
          boxShadow: scrolled ? (isDark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.05)") : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Left — Logo + Language Switcher */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2.5 group select-none">
                <motion.div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow"
                  style={{ background: "linear-gradient(135deg, #D4AF37 0%, #F3D28B 100%)" }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                >
                  ع
                </motion.div>
                <div className="leading-none hidden sm:block">
                  <p className="font-semibold text-[13px] tracking-tight" style={{ color: isDark ? "#F0F0F0" : "#111" }}>
                    Imarat-e-Shariah
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                    امارت شریعہ
                  </p>
                </div>
              </Link>

              {/* Language Switcher */}
              <div
                className="hidden sm:flex items-center rounded-xl overflow-hidden"
                style={{
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                  border: isDark ? "1px solid rgba(255,255,255,0.09)" : "1px solid rgba(0,0,0,0.08)",
                }}
              >
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className="px-2.5 py-1.5 text-[11px] font-semibold transition-all duration-200"
                    style={{
                      background: lang === l.code
                        ? "linear-gradient(135deg, #D4AF37, #B8960C)"
                        : "transparent",
                      color: lang === l.code
                        ? "#fff"
                        : isDark ? "#888" : "#777",
                      fontFamily: l.code === "ur" ? "'Noto Nastaliq Urdu', serif" : l.code === "kn" ? "'Noto Sans Kannada', sans-serif" : "inherit",
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Center — Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200"
                    style={{
                      color: location === item.href ? activeColor : textColor,
                      background: location === item.href
                        ? "rgba(212,175,55,0.10)"
                        : "transparent",
                    }}
                  >
                    {t(item.key)}
                    {item.children && (
                      <ChevronDown
                        size={11}
                        style={{
                          color: "#AAA",
                          transform: activeDropdown === item.key ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s",
                        }}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.children && activeDropdown === item.key && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.97 }}
                        transition={{ duration: 0.17, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-0 mt-2 w-48 rounded-2xl overflow-hidden"
                        style={{
                          background: dropdownBg,
                          backdropFilter: "blur(24px)",
                          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
                          boxShadow: isDark ? "0 20px 60px rgba(0,0,0,0.5)" : "0 20px 60px rgba(0,0,0,0.10)",
                        }}
                      >
                        <div className="p-1.5">
                          {item.children.map((child, i) => (
                            <motion.div
                              key={child.key}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04 }}
                            >
                              <Link
                                href={child.href}
                                className="block px-3.5 py-2.5 text-[12.5px] rounded-xl transition-colors duration-150"
                                style={{
                                  color: isDark ? "#CCC" : "#444",
                                  background: "transparent",
                                }}
                                onMouseEnter={(e) => {
                                  (e.currentTarget as HTMLElement).style.background = isDark
                                    ? "rgba(212,175,55,0.08)"
                                    : "rgba(212,175,55,0.06)";
                                }}
                                onMouseLeave={(e) => {
                                  (e.currentTarget as HTMLElement).style.background = "transparent";
                                }}
                              >
                                {t(child.key)}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right — Theme toggle + CTA + Mobile toggle */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                style={{
                  background: isDark ? "rgba(212,175,55,0.12)" : "rgba(0,0,0,0.05)",
                  border: isDark ? "1px solid rgba(212,175,55,0.20)" : "1px solid rgba(0,0,0,0.07)",
                  color: isDark ? "#D4AF37" : "#777",
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                title={isDark ? "Switch to Light" : "Switch to Dark"}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? <Sun size={14} /> : <Moon size={14} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* CTA — desktop */}
              <motion.a
                href="#contact"
                className="hidden lg:flex items-center px-4 py-2 rounded-xl text-[12.5px] font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #D4AF37, #B8960C)" }}
                whileHover={{ scale: 1.03, y: -1, boxShadow: "0 8px 24px rgba(212,175,55,0.30)" }}
                whileTap={{ scale: 0.97 }}
              >
                {t("contact")}
              </motion.a>

              {/* Mobile toggle */}
              <button
                className="lg:hidden p-2 rounded-xl"
                style={{ color: textColor }}
                onClick={() => setOpen(!open)}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden lg:hidden"
              style={{
                background: isDark ? "rgba(10,10,10,0.97)" : "rgba(255,255,255,0.97)",
                backdropFilter: "blur(24px)",
                borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div className="px-5 py-4 flex flex-col gap-0.5">
                {/* Lang switcher mobile */}
                <div className="flex gap-2 mb-3">
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      className="px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all"
                      style={{
                        background: lang === l.code ? "linear-gradient(135deg,#D4AF37,#B8960C)" : isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                        color: lang === l.code ? "#fff" : isDark ? "#888" : "#777",
                        fontFamily: l.code === "ur" ? "'Noto Nastaliq Urdu', serif" : "inherit",
                      }}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>

                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-3 py-2.5 rounded-xl text-[13px] font-medium"
                      style={{ color: location === item.href ? activeColor : textColor }}
                    >
                      {t(item.key)}
                    </Link>
                    {item.children?.map((child) => (
                      <Link
                        key={child.key}
                        href={child.href}
                        className="block pl-7 py-1.5 text-[12px]"
                        style={{ color: isDark ? "#666" : "#999" }}
                      >
                        {t(child.key)}
                      </Link>
                    ))}
                  </motion.div>
                ))}

                <div className="mt-3 pt-3" style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}>
                  <a
                    href="#contact"
                    className="block text-center px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#D4AF37,#B8960C)" }}
                  >
                    {t("contact")}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
