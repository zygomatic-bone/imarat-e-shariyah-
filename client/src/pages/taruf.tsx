import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Download, ExternalLink, BookOpen, Award, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const documents = [
  {
    id: 1,
    titleUrdu: "تعارف نامہ",
    title: "Taruf Nama",
    subtitle: "Official Introduction Document",
    desc: "The foundational document introducing Emarat e Shariya — its history, purpose, jurisdiction, and vision for the Muslim community of Bihar.",
    icon: FileText,
    pages: "48 pages",
    year: "2024 Edition",
    tag: "Introduction",
  },
  {
    id: 2,
    titleUrdu: "دستور امارت",
    title: "Dastur e Emarat",
    subtitle: "Constitutional Charter",
    desc: "The constitutional framework governing Emarat e Shariya — its organizational structure, judicial procedures, and guiding Sharia principles.",
    icon: Award,
    pages: "96 pages",
    year: "Revised 2023",
    tag: "Constitution",
  },
  {
    id: 3,
    titleUrdu: "سالانہ رپورٹ",
    title: "Annual Report",
    subtitle: "Yearly Activity Report",
    desc: "Comprehensive yearly report covering all judicial decisions, community programs, educational initiatives, and institutional milestones.",
    icon: BookOpen,
    pages: "120 pages",
    year: "2024–2025",
    tag: "Report",
  },
  {
    id: 4,
    titleUrdu: "بین الاقوامی تعلقات",
    title: "International Relations",
    subtitle: "Global Islamic Partnerships",
    desc: "Overview of Emarat e Shariya's affiliations and collaborations with international Islamic institutions and scholarly bodies.",
    icon: Globe,
    pages: "32 pages",
    year: "2025",
    tag: "International",
  },
];

const MILESTONES = [
  { year: "1921", event: "Founded by Hazrat Maulana Abu'l Mahasin Muhammad Sajjad", eventUrdu: "قیام — حضرت مولانا ابوالمحاسن محمد سجاد" },
  { year: "1950", event: "Expanded jurisdiction across all of Bihar", eventUrdu: "پورے بہار میں توسیع" },
  { year: "1985", event: "Darul Kaza formally institutionalised", eventUrdu: "دارالقضاء کا رسمی قیام" },
  { year: "2002", event: "Darul Ifta modernised and expanded", eventUrdu: "دارالافتاء کی جدید کاری" },
  { year: "2010", event: "Karnataka operations established", eventUrdu: "کرناٹک میں کام کا آغاز" },
  { year: "2021", event: "Centenary Celebration — 100 years of service", eventUrdu: "صد سالہ جشن" },
];

export default function Taruf() {
  return (
    <div className="min-h-screen" style={{ background: "#FAFAFA" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 px-6" style={{ background: "#FAFAFA" }}>
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="section-label justify-center">About</div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-3" style={{ color: "#111" }}>
              Taruf Nama
            </h1>
            <p
              className="text-3xl mb-5"
              style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }}
              dir="rtl"
            >
              تعارف نامہ
            </p>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "#666" }}>
              Emarat e Shariya was founded in 1921 at Phulwari Sharif, Patna — a supreme Islamic judicial and religious authority guiding the Muslim community of Bihar, Jharkhand, and Odisha for over a century.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="gold-divider mx-6" />

      {/* Documents */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="section-label">Documents</div>
            <h2 className="text-3xl font-black mb-10" style={{ color: "#111" }}>Official Documents</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {documents.map((doc, i) => (
              <Reveal key={doc.id} delay={i * 0.08}>
                <motion.div
                  className="glass-card p-7 h-full flex flex-col"
                  whileHover={{ scale: 1.01, boxShadow: "0 16px 48px rgba(0,0,0,0.09)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(212,175,55,0.10)" }}
                    >
                      <doc.icon size={20} style={{ color: "#D4AF37" }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                          style={{ background: "rgba(212,175,55,0.10)", color: "#B8960C" }}
                        >
                          {doc.tag}
                        </span>
                        <span className="text-[11px]" style={{ color: "#BBB" }}>{doc.year}</span>
                        <span className="text-[11px]" style={{ color: "#BBB" }}>{doc.pages}</span>
                      </div>
                    </div>
                  </div>

                  <p
                    className="text-base mb-1"
                    dir="rtl"
                    style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }}
                  >
                    {doc.titleUrdu}
                  </p>
                  <h3 className="text-xl font-bold mb-1" style={{ color: "#111" }}>{doc.title}</h3>
                  <p className="text-sm mb-1 font-medium" style={{ color: "#888" }}>{doc.subtitle}</p>
                  <p className="text-[13px] leading-relaxed mb-6 flex-1" style={{ color: "#777" }}>{doc.desc}</p>

                  <div className="flex gap-3">
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white"
                      style={{ background: "linear-gradient(135deg, #D4AF37, #B8960C)" }}
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ExternalLink size={12} />
                      Open File
                    </motion.button>
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold"
                      style={{
                        background: "rgba(0,0,0,0.04)",
                        border: "1px solid rgba(0,0,0,0.08)",
                        color: "#555",
                      }}
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Download size={12} />
                      Download
                    </motion.button>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline — Dark */}
      <section className="section-dark islamic-pattern-dark py-20 px-6" style={{ background: "#0A0A0A" }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="section-label" style={{ color: "#D4AF37" }}>History</div>
            <h2 className="text-3xl font-black text-white mb-12">A Century of Service</h2>
          </Reveal>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.4), transparent)" }}
            />

            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.08}>
                  <div className="flex items-start gap-6">
                    {/* Node */}
                    <div
                      className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                      style={{
                        background: "#0A0A0A",
                        border: "2px solid rgba(212,175,55,0.50)",
                        color: "#D4AF37",
                      }}
                    >
                      {m.year.slice(2)}
                    </div>
                    <div className="glass-card-dark p-5 flex-1">
                      <p className="text-xs font-bold mb-1" style={{ color: "#D4AF37" }}>{m.year}</p>
                      <p className="text-sm font-semibold text-white mb-1">{m.event}</p>
                      <p
                        className="text-xs"
                        dir="rtl"
                        style={{ color: "rgba(212,175,55,0.65)", fontFamily: "'Noto Nastaliq Urdu', serif" }}
                      >
                        {m.eventUrdu}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
