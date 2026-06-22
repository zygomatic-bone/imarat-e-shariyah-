import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function AdminAccessButton() {
  const { theme } = useApp();
  const [location] = useLocation();
  const isDark = theme === "dark";

  // Don't show the shortcut while already on the admin page
  if (location === "/admin") return null;

  return (
    <motion.div
      className="fixed right-0 top-1/2 z-40 -translate-y-1/2"
      initial={{ x: 48, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href="/admin" aria-label="Admin login">
        <motion.div
          className="flex items-center gap-2 pl-3 pr-2.5 py-2.5 rounded-l-xl cursor-pointer select-none"
          style={{
            background: isDark ? "rgba(20,20,20,0.92)" : "rgba(255,255,255,0.94)",
            border: isDark
              ? "1px solid rgba(212,175,55,0.25)"
              : "1px solid rgba(212,175,55,0.30)",
            borderRight: "none",
            boxShadow: isDark
              ? "-8px 0 24px rgba(0,0,0,0.45)"
              : "-8px 0 24px rgba(0,0,0,0.10)",
            backdropFilter: "blur(16px)",
          }}
          whileHover={{ x: -6 }}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
        >
          <ShieldCheck size={15} style={{ color: "#D4AF37" }} />
          <span
            className="text-[11px] font-semibold tracking-wide"
            style={{ color: isDark ? "#D4AF37" : "#B8960C" }}
          >
            Admin
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
