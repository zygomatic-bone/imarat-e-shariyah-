import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";
export type Lang = "en" | "ur" | "kn";

interface AppCtx {
  theme: Theme;
  lang: Lang;
  toggleTheme: () => void;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  en: {
    home: "Home",
    taruf: "Taruf Nama",
    emarat: "Emarat e Shariya",
    shuaba: "Shuabaat",
    news: "News & Updates",
    contact: "Contact Us",
    sabiq: "Sabiq Umara",
    majlis: "Majlis e Emarat",
    arkan: "Arkan e Shura",
    umumi: "Majlis e Umumi",
    allDepts: "All Departments",
    darulKaza: "Darul Kaza",
    branches: "Branches",
    heroTitle: "Imarat-e-Shariah",
    heroSub: "A Supreme Islamic Judicial Authority",
    heroUrdu: "اعلیٰ دینی عدالتی ادارہ — بنگلور، کرناٹک",
    badge: "MARKAZI DARUL QAZA • BENGALURU",
    explore: "Explore Institution",
    latest: "Latest Updates",
    scroll: "Scroll",
  },
  ur: {
    home: "ہوم",
    taruf: "تعارف نامہ",
    emarat: "امارت شریعہ",
    shuaba: "شعبہ جات",
    news: "اخبار و اطلاعات",
    contact: "رابطہ کریں",
    sabiq: "سابق امراء",
    majlis: "مجلس امارت",
    arkan: "ارکان شوریٰ",
    umumi: "مجلس عمومی",
    allDepts: "تمام شعبے",
    darulKaza: "دارالقضاء",
    branches: "شاخیں",
    heroTitle: "امارت شریعہ",
    heroSub: "اعلیٰ دینی عدالتی ادارہ",
    heroUrdu: "بنگلور، کرناٹک — ہند",
    badge: "مرکزی دارالقضاء • بنگلور",
    explore: "ادارہ دیکھیں",
    latest: "تازہ خبریں",
    scroll: "اسکرول",
  },
  kn: {
    home: "ಮುಖಪುಟ",
    taruf: "ಪರಿಚಯ",
    emarat: "ಇಮಾರತ್-ಇ-ಶರೀಯಾ",
    shuaba: "ವಿಭಾಗಗಳು",
    news: "ಸುದ್ದಿ & ನವೀಕರಣಗಳು",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    sabiq: "ಮಾಜಿ ಅಮೀರ್",
    majlis: "ಮಜ್ಲಿಸ್ ಇಮಾರತ್",
    arkan: "ಅರ್ಕಾನ್ ಶೂರಾ",
    umumi: "ಮಜ್ಲಿಸ್ ಉಮೂಮಿ",
    allDepts: "ಎಲ್ಲಾ ವಿಭಾಗಗಳು",
    darulKaza: "ದಾರುಲ್ ಖಜಾ",
    branches: "ಶಾಖೆಗಳು",
    heroTitle: "ಇಮಾರತ್-ಇ-ಶರೀಯಾ",
    heroSub: "ಸರ್ವೋಚ್ಚ ಇಸ್ಲಾಮಿಕ್ ನ್ಯಾಯಾಂಗ ಪ್ರಾಧಿಕಾರ",
    heroUrdu: "ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ — ಭಾರತ",
    badge: "ಮರ್ಕಝಿ ದಾರುಲ್ ಖಜಾ • ಬೆಂಗಳೂರು",
    explore: "ಸಂಸ್ಥೆ ಅನ್ವೇಷಿಸಿ",
    latest: "ಇತ್ತೀಚಿನ ಅಪ್‌ಡೇಟ್‌ಗಳು",
    scroll: "ಸ್ಕ್ರೋಲ್",
  },
};

const AppContext = createContext<AppCtx>({
  theme: "light",
  lang: "en",
  toggleTheme: () => {},
  setLang: () => {},
  t: (k) => k,
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("ies-theme") as Theme) || "light";
  });

  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("ies-lang") as Lang) || "en";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("ies-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("ies-lang", lang);
    document.documentElement.setAttribute("lang", lang === "ur" ? "ur" : lang === "kn" ? "kn" : "en");
    document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
  }, [lang]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  const setLang = (l: Lang) => setLangState(l);
  const t = (key: string) => TRANSLATIONS[lang][key] ?? TRANSLATIONS.en[key] ?? key;

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, setLang, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
