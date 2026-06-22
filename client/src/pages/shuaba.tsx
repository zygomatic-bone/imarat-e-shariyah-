import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Scale, BookOpen, GraduationCap, Megaphone, MessageSquare, Globe,
  MapPin, Phone, ChevronRight, Search,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";

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

const departments = [
  { icon: Scale,       titleUrdu: "دارالقضاء",    title: "Darul Qaza",        desc: "Islamic judicial court resolving family, property, and community disputes according to Sharia." },
  { icon: BookOpen,    titleUrdu: "دارالافتاء",   title: "Darul Ifta",        desc: "Authoritative fatwa council issuing religious rulings on practice and modern issues." },
  { icon: MessageSquare,titleUrdu:"مشاورت",       title: "Mushawarat",        desc: "Community counsel and mediation for family and social matters." },
  { icon: Megaphone,   titleUrdu: "تبلیغ و ارشاد", title: "Tabligh wa Irshad", desc: "Islamic outreach, education, and guidance across Karnataka." },
  { icon: GraduationCap,titleUrdu:"ادارہ تعلیمی", title: "Idara e Taleemi",   desc: "Oversight of madrassas and Islamic educational institutions in Karnataka." },
  { icon: Globe,       titleUrdu: "میڈیا و اشاعت", title: "Media & Publications", desc: "Official communications, monthly journals, and digital outreach." },
];

const judges = [
  { name: "Maulana Mufti Dr. Mohammed Maqsood Imran Rashadi", nameUrdu: "مولانا مفتی ڈاکٹر محمد مقصود عمران رشادی", role: "Chief Qazi", since: "Present" },
  { name: "Qazi Mufti Abdur Rahman Qasmi", nameUrdu: "قاضی مفتی عبد الرحمن قاسمی", role: "Senior Qazi", since: "Present" },
  { name: "Qazi Mohammed Irfan Nadwi", nameUrdu: "قاضی محمد عرفان ندوی", role: "Associate Qazi", since: "Present" },
  { name: "Qazi Sirajul Huda Ashrafi", nameUrdu: "قاضی سراج الہدیٰ اشرفی", role: "Associate Qazi", since: "Present" },
];

const branches = [
  {
    city: "Bengaluru (Markazi)",
    cityUrdu: "بنگلور — مرکزی",
    cityKn: "ಬೆಂಗಳೂರು (ಮರ್ಕಝಿ)",
    address: "Markazi Darul Qaza, Shivajinagar, Bengaluru – 560001",
    phone: "+91 80 2559 0000",
    desc: "Main headquarters — serving the Muslim community of Greater Bengaluru.",
  },
  {
    city: "Mysuru",
    cityUrdu: "میسور",
    cityKn: "ಮೈಸೂರು",
    address: "Nazarbad, Mysuru – 570010",
    phone: "+91 821 244 0000",
    desc: "Regional centre serving Mysuru, Mandya, and Kodagu districts.",
  },
  {
    city: "Hubli-Dharwad",
    cityUrdu: "ہبلی – دھارواڑ",
    cityKn: "ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ",
    address: "Durgad Bail, Hubli – 580001",
    phone: "+91 836 235 0000",
    desc: "North Karnataka centre serving Hubli, Dharwad, and surrounding areas.",
  },
  {
    city: "Kalaburagi (Gulbarga)",
    cityUrdu: "گلبرگہ",
    cityKn: "ಕಲಬುರಗಿ",
    address: "Gulbarga – 585101",
    phone: "+91 847 244 0000",
    desc: "Hyderabad-Karnataka region — serving Kalaburagi, Bidar, and Raichur districts.",
  },
  {
    city: "Mangaluru",
    cityUrdu: "منگلور",
    cityKn: "ಮಂಗಳೂರು",
    address: "Bunder, Mangaluru – 575001",
    phone: "+91 824 222 0000",
    desc: "Coastal Karnataka centre — newly inaugurated in 2025.",
  },
  {
    city: "Tumakuru",
    cityUrdu: "تمکور",
    cityKn: "ತುಮಕೂರು",
    address: "Tumakuru – 572101",
    phone: "+91 816 222 0000",
    desc: "Central Karnataka region serving Tumakuru and Chitradurga districts.",
  },
];

const terms = [
  "All case filings must be submitted through the official Darul Qaza office or a recognised branch.",
  "Both parties to a dispute must voluntarily consent to Sharia adjudication.",
  "Proceedings are conducted in accordance with Hanafi jurisprudence.",
  "Fatwas issued by Darul Ifta are authoritative religious guidance, not civil legal orders.",
  "Community members may request mediation through the Mushawarat division.",
  "All branches operate under the central authority of Imarat-e-Shariah Karnataka, Bengaluru.",
  "Hearings are conducted in Urdu, Kannada, or English as required.",
];

export default function Shuaba() {
  const { theme, lang } = useApp();
  const isDark = theme === "dark";
  const [search, setSearch] = useState("");

  const filteredBranches = branches.filter((b) =>
    b.city.toLowerCase().includes(search.toLowerCase()) ||
    b.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 px-6 text-center" style={{ background: "var(--page-bg)" }}>
        <Reveal>
          <div className="section-label justify-center">Structure</div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-3" style={{ color: "var(--text-primary)" }}>
            Shuabaat
          </h1>
          <p className="text-2xl mb-4" style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }} dir="rtl">
            شعبہ جات
          </p>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Six specialised departments delivering judicial, educational, and outreach services across Karnataka.
          </p>
        </Reveal>
      </section>

      <div className="gold-divider mx-6" />

      {/* Departments */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="section-label">Departments</div>
            <h2 className="text-3xl font-black mb-10" style={{ color: "var(--text-primary)" }}>All Departments</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.07}>
                <motion.div
                  className={isDark ? "glass-card-dark" : "glass-card"}
                  style={{ padding: "28px", height: "100%", display: "flex", flexDirection: "column" }}
                  whileHover={{ scale: 1.015, boxShadow: isDark ? "0 20px 50px rgba(0,0,0,0.5)" : "0 16px 48px rgba(0,0,0,0.09)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: isDark ? "rgba(212,175,55,0.12)" : "rgba(212,175,55,0.10)" }}
                  >
                    <d.icon size={20} style={{ color: "#D4AF37" }} />
                  </div>
                  <p className="text-sm mb-1" dir="rtl" style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                    {d.titleUrdu}
                  </p>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>{d.title}</h3>
                  <p className="text-[13px] leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>{d.desc}</p>
                  <motion.button
                    className="mt-5 flex items-center gap-1 text-xs font-semibold"
                    style={{ color: "#D4AF37" }}
                    whileHover={{ x: 3 }}
                  >
                    Learn More <ChevronRight size={12} />
                  </motion.button>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Darul Qaza — Dark */}
      <section id="darul-kaza" className="section-dark islamic-pattern-dark py-20 px-6 relative overflow-hidden" style={{ background: "#0A0A0A" }}>
        <div className="relative z-10 max-w-7xl mx-auto">
          <Reveal>
            <div className="section-label" style={{ color: "#D4AF37" }}>Judiciary</div>
            <h2 className="text-3xl font-black text-white mb-2">Darul Qaza</h2>
            <p className="text-base mb-12" style={{ color: "#888" }}>Present Quzat of the Islamic Judicial Court — Karnataka</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {judges.map((j, i) => (
              <Reveal key={j.name} delay={i * 0.08}>
                <motion.div
                  className="glass-card-dark p-6 text-center"
                  style={{ border: "1px solid rgba(212,175,55,0.12)" }}
                  whileHover={{ scale: 1.02, boxShadow: "0 24px 60px rgba(0,0,0,0.6)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-xl"
                    style={{ background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.18)" }}
                  >
                    ع
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide mb-2" style={{ color: "#D4AF37" }}>{j.role}</p>
                  <h3 className="text-[13px] font-bold text-white mb-2 leading-snug">{j.name}</h3>
                  <p className="text-[11px]" dir="rtl" style={{ color: "rgba(212,175,55,0.60)", fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                    {j.nameUrdu}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Karnataka Branches */}
      <section id="branches" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="section-label">Regional</div>
            <h2 className="text-3xl font-black mb-2" style={{ color: "var(--text-primary)" }}>Karnataka Branches</h2>
            <p className="text-base mb-6" style={{ color: "var(--text-secondary)" }}>
              {filteredBranches.length} regional centres across Karnataka
            </p>
          </Reveal>

          {/* Search */}
          <Reveal delay={0.05}>
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-8 max-w-sm"
              style={{
                background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Search size={14} style={{ color: "#AAA" }} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search branches..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text-primary)" }}
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBranches.map((b, i) => (
              <Reveal key={b.city} delay={i * 0.06}>
                <motion.div
                  className={isDark ? "glass-card-dark" : "glass-card"}
                  style={{ padding: "28px" }}
                  whileHover={{ scale: 1.015, boxShadow: isDark ? "0 20px 50px rgba(0,0,0,0.5)" : "0 16px 48px rgba(0,0,0,0.09)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: isDark ? "rgba(212,175,55,0.12)" : "rgba(212,175,55,0.10)" }}
                    >
                      <MapPin size={15} style={{ color: "#D4AF37" }} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold leading-snug" style={{ color: "var(--text-primary)" }}>{b.city}</h3>
                      <p className="text-[11px]" dir="rtl" style={{ color: "#D4AF37", fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                        {lang === "kn" ? b.cityKn : b.cityUrdu}
                      </p>
                    </div>
                  </div>
                  <p className="text-[13px] mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{b.desc}</p>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <MapPin size={11} className="mt-0.5 shrink-0" style={{ color: "#CCC" }} />
                      <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>{b.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={11} className="shrink-0" style={{ color: "#CCC" }} />
                      <a href={`tel:${b.phone}`} className="text-[12px] hover:text-amber-500 transition-colors" style={{ color: "var(--text-muted)" }}>
                        {b.phone}
                      </a>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section
        className="py-20 px-6"
        style={{ background: isDark ? "#080808" : "#F4F4F4" }}
      >
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="section-label">Guidelines</div>
            <h2 className="text-3xl font-black mb-8" style={{ color: "var(--text-primary)" }}>Terms & Conditions</h2>
          </Reveal>
          <div className="space-y-3">
            {terms.map((term, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div
                  className="flex items-start gap-4 p-5 rounded-2xl"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.03)" : "#fff",
                    border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5"
                    style={{ background: "rgba(212,175,55,0.12)", color: "#B8960C" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{term}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
