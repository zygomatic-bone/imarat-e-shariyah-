import "dotenv/config";
import { db } from "../src/db";
import {
  newsArticlesTable, noticesTable,
  leadershipMembersTable, branchesTable, darulQazaJudgesTable,
} from "../src/db";

async function seed() {
  console.log("Seeding Imarat-e-Shariah Karnataka database…");

  /* ── Leadership ── */
  await db.insert(leadershipMembersTable).values([
    { name: "Maulana Mufti Mohammed Shuaibullah Khan Miftahi", nameUrdu: "مولانا مفتی محمد شعیب اللہ خان مفتاحی", role: "Amir / President", roleUrdu: "امیر", section: "majlis", sortOrder: 1, bio: "The Amir of Imarat-e-Shariah Karnataka, guiding the institution with deep scholarship and decades of community service.", bioUrdu: "امارت شریعہ کرناٹک کے امیر — گہری علمی مہارت اور طویل خدمت کے ساتھ ادارے کی قیادت کرتے ہیں۔" },
    { name: "Hazrat Maulana Mufti Iftikhar Ahmed Qasmi", nameUrdu: "حضرت مولانا مفتی افتخار احمد قاسمی", role: "General Secretary", roleUrdu: "جنرل سکریٹری", section: "majlis", sortOrder: 2, bio: "General Secretary responsible for the administrative and organisational operations of Imarat-e-Shariah Karnataka.", bioUrdu: "امارت شریعہ کرناٹک کے جنرل سکریٹری — انتظامی و تنظیمی امور کے ذمہ دار۔" },
    { name: "Maulana Mufti Dr. Mohammed Maqsood Imran Rashadi", nameUrdu: "مولانا مفتی ڈاکٹر محمد مقصود عمران رشادی", role: "Chief Qazi", roleUrdu: "قاضی القضاة", section: "majlis", sortOrder: 3, bio: "Chief Qazi of Karnataka presiding over Darul Qaza proceedings and ensuring Sharia-compliant judicial outcomes.", bioUrdu: "کرناٹک کے قاضی القضاة — دارالقضاء کی سرپرستی اور شرعی عدالتی کارروائیوں کے صدر نشین۔" },
    { name: "Former Amir — First Tenure", nameUrdu: "سابق امیر — پہلا دور", role: "Former Amir", roleUrdu: "سابق امیر", section: "sabiq", sortOrder: 1 },
    { name: "Former Amir — Second Tenure", nameUrdu: "سابق امیر — دوسرا دور", role: "Former Amir", roleUrdu: "سابق امیر", section: "sabiq", sortOrder: 2 },
    { name: "Shura Member — Bengaluru", nameUrdu: "رکن شوریٰ — بنگلور", role: "Shura Member", roleUrdu: "رکن شوریٰ", section: "arkan", sortOrder: 1 },
    { name: "Shura Member — Mysuru", nameUrdu: "رکن شوریٰ — میسور", role: "Shura Member", roleUrdu: "رکن شوریٰ", section: "arkan", sortOrder: 2 },
    { name: "Shura Member — Hubli", nameUrdu: "رکن شوریٰ — ہبلی", role: "Shura Member", roleUrdu: "رکن شوریٰ", section: "arkan", sortOrder: 3 },
    { name: "Shura Member — Kalaburagi", nameUrdu: "رکن شوریٰ — گلبرگہ", role: "Shura Member", roleUrdu: "رکن شوریٰ", section: "arkan", sortOrder: 4 },
    { name: "Assembly Member — North Karnataka", nameUrdu: "رکن مجلس — شمالی کرناٹک", role: "Assembly Member", roleUrdu: "رکن مجلس", section: "umumi", sortOrder: 1 },
    { name: "Assembly Member — South Karnataka", nameUrdu: "رکن مجلس — جنوبی کرناٹک", role: "Assembly Member", roleUrdu: "رکن مجلس", section: "umumi", sortOrder: 2 },
    { name: "Assembly Member — Coastal Karnataka", nameUrdu: "رکن مجلس — ساحلی کرناٹک", role: "Assembly Member", roleUrdu: "رکن مجلس", section: "umumi", sortOrder: 3 },
  ]).onConflictDoNothing();

  /* ── Branches ── */
  await db.insert(branchesTable).values([
    { city: "Bengaluru (Markazi)", cityUrdu: "بنگلور — مرکزی", cityKn: "ಬೆಂಗಳೂರು (ಮರ್ಕಝಿ)", address: "Markazi Darul Qaza, Shivajinagar, Bengaluru – 560001", phone: "+91 80 2559 0000", description: "Main headquarters serving Greater Bengaluru and surrounding districts.", sortOrder: 1 },
    { city: "Mysuru", cityUrdu: "میسور", cityKn: "ಮೈಸೂರು", address: "Nazarbad, Mysuru – 570010", phone: "+91 821 244 0000", description: "Regional centre serving Mysuru, Mandya, and Kodagu districts.", sortOrder: 2 },
    { city: "Hubli-Dharwad", cityUrdu: "ہبلی – دھارواڑ", cityKn: "ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ", address: "Durgad Bail, Hubli – 580001", phone: "+91 836 235 0000", description: "North Karnataka centre serving Hubli, Dharwad, and surrounding areas.", sortOrder: 3 },
    { city: "Kalaburagi", cityUrdu: "گلبرگہ", cityKn: "ಕಲಬುರಗಿ", address: "Gulbarga – 585101", phone: "+91 847 244 0000", description: "Hyderabad-Karnataka region covering Kalaburagi, Bidar, and Raichur.", sortOrder: 4 },
    { city: "Mangaluru", cityUrdu: "منگلور", cityKn: "ಮಂಗಳೂರು", address: "Bunder, Mangaluru – 575001", phone: "+91 824 222 0000", description: "Coastal Karnataka centre — inaugurated in 2025.", sortOrder: 5 },
    { city: "Tumakuru", cityUrdu: "تمکور", cityKn: "ತುಮಕೂರು", address: "Tumakuru – 572101", phone: "+91 816 222 0000", description: "Central Karnataka region covering Tumakuru and Chitradurga.", sortOrder: 6 },
  ]).onConflictDoNothing();

  /* ── Darul Qaza Judges ── */
  await db.insert(darulQazaJudgesTable).values([
    { name: "Maulana Mufti Dr. Mohammed Maqsood Imran Rashadi", nameUrdu: "مولانا مفتی ڈاکٹر محمد مقصود عمران رشادی", role: "Chief Qazi", roleUrdu: "قاضی القضاة", since: "Present", sortOrder: 1 },
    { name: "Qazi Mufti Abdur Rahman Qasmi", nameUrdu: "قاضی مفتی عبد الرحمن قاسمی", role: "Senior Qazi", roleUrdu: "سینئر قاضی", since: "Present", sortOrder: 2 },
    { name: "Qazi Mohammed Irfan Nadwi", nameUrdu: "قاضی محمد عرفان ندوی", role: "Associate Qazi", roleUrdu: "قاضی معاون", since: "Present", sortOrder: 3 },
    { name: "Qazi Sirajul Huda Ashrafi", nameUrdu: "قاضی سراج الہدیٰ اشرفی", role: "Associate Qazi", roleUrdu: "قاضی معاون", since: "Present", sortOrder: 4 },
  ]).onConflictDoNothing();

  /* ── News Articles ── */
  await db.insert(newsArticlesTable).values([
    {
      title: "Annual Shura Conference 2025 — Registration Now Open",
      titleUrdu: "سالانہ اجلاس شوریٰ ۲۰۲۵ — رجسٹریشن جاری ہے",
      titleKn: "ವಾರ್ಷಿಕ ಶೂರಾ ಸಮ್ಮೇಳನ ೨೦೨೫",
      excerpt: "The 2025 annual Shura conference will be held at the Markazi Darul Qaza, Bengaluru. All members and observers are invited to register.",
      excerptUrdu: "سالانہ اجلاس شوریٰ ۲۰۲۵ مرکزی دارالقضاء بنگلور میں منعقد ہوگا۔ تمام ارکان و مہمانان رجسٹریشن کروائیں۔",
      content: "Imarat-e-Shariah Karnataka announces that the Annual Shura Conference for 2025 will be held at the Markazi Darul Qaza premises in Shivajinagar, Bengaluru.\n\nThe conference will cover:\n• Review of judicial proceedings for 2024–25\n• New fatwa guidelines on digital finance and modern contracts\n• Expansion of Darul Qaza services to new districts\n• Election of new Arkan e Shura members\n\nAll registered members, associate members, and invited guests are requested to complete their registration by November 30, 2025. For registration, contact the General Secretariat at info@imarateshariah.in or call +91 80 2559 0000.",
      tag: "Announcement",
      publishedAt: new Date("2025-12-01"),
    },
    {
      title: "New Fatwa Guidelines on Digital Finance Published",
      titleUrdu: "ڈیجیٹل فنانس پر نئی فتوی رہنمائی جاری",
      excerpt: "Darul Ifta has released comprehensive guidelines on Islamic finance in the digital age, covering cryptocurrency, digital banking, and online transactions.",
      content: "The Darul Ifta of Imarat-e-Shariah Karnataka has published a comprehensive fatwa document addressing Islamic financial rulings in the modern digital economy.\n\nKey rulings covered:\n• Cryptocurrency trading and investment — conditions for permissibility\n• Digital banking and online savings accounts\n• Buy Now Pay Later (BNPL) schemes\n• Digital insurance (Takaful alternatives)\n• Mobile payment platforms and interest implications\n\nThe full document is available at the Markazi office and will be distributed to all registered Darul Qaza branches across Karnataka. Community members may request copies from the Darul Ifta office.",
      tag: "Fatwa",
      publishedAt: new Date("2025-11-15"),
    },
    {
      title: "Darul Qaza Q4 2025 Hearing Schedule Released",
      titleUrdu: "دارالقضاء: چوتھی سہ ماہی ۲۰۲۵ کا جدول",
      excerpt: "Case hearings for October–December 2025 are now scheduled across all Karnataka Darul Qaza branch locations.",
      content: "The Markazi Darul Qaza announces the hearing schedule for Q4 2025 (October – December).\n\nBengaluru (Markazi): Every Monday and Wednesday, 10 AM – 4 PM\nMysuru: Second and fourth Saturday of each month\nHubli-Dharwad: First Friday of each month\nKalaburagi: Third Friday of each month\nMangaluru: By appointment — contact the branch\nTumakuru: Second Saturday of each month\n\nParties wishing to file new cases must submit their applications at least 14 days before the scheduled hearing date. All required documents must be submitted in original along with two attested copies.",
      tag: "Judiciary",
      publishedAt: new Date("2025-10-01"),
    },
    {
      title: "New Mangaluru Branch Inaugurated",
      titleUrdu: "منگلور میں نئی شاخ کا افتتاح",
      excerpt: "Imarat-e-Shariah Karnataka expands its reach with a new Darul Qaza branch in Mangaluru, serving the coastal Karnataka Muslim community.",
      content: "Imarat-e-Shariah Karnataka is pleased to announce the inauguration of its new branch in Mangaluru, serving the Muslim community of coastal Karnataka.\n\nThe inauguration ceremony was presided over by the Amir, Maulana Mufti Mohammed Shuaibullah Khan Miftahi, and attended by scholars, community leaders, and representatives from Dakshina Kannada and Udupi districts.\n\nThe Mangaluru branch will provide:\n• Darul Qaza (judicial services)\n• Darul Ifta (fatwa and religious guidance)\n• Nikah registration and documentation\n• Community mediation services\n\nThe branch office is located at Bunder, Mangaluru. For appointments, call +91 824 222 0000.",
      tag: "Expansion",
      publishedAt: new Date("2025-09-10"),
    },
    {
      title: "Imarat-e-Shariah Karnataka Marks Milestone Year of Service",
      titleUrdu: "امارت شریعہ کرناٹک کا اہم خدمتی سنگ میل",
      excerpt: "The institution commemorates decades of dedicated service to the Muslim community of Karnataka through Islamic jurisprudence and community guidance.",
      content: "Imarat-e-Shariah Karnataka celebrates a significant milestone in its service to the Muslim community of the state. Since its establishment, the institution has:\n\n• Resolved thousands of family, property, and commercial disputes through Sharia-based arbitration\n• Issued hundreds of fatwas on contemporary issues\n• Established 6 regional branches across Karnataka\n• Trained and certified Islamic judges (Quzat) for the state\n• Published regular Islamic guidance materials in Urdu, Kannada, and English\n\nThe Amir, Maulana Mufti Mohammed Shuaibullah Khan Miftahi, expressed gratitude to all scholars, staff, and community members who have supported the institution's mission.",
      tag: "Milestone",
      publishedAt: new Date("2025-08-01"),
    },
  ]).onConflictDoNothing();

  /* ── Notices ── */
  await db.insert(noticesTable).values([
    {
      title: "Notice: Case Filing Deadline — Q4 2025",
      titleUrdu: "اطلاع: مقدمہ داخل کرنے کی آخری تاریخ — چوتھی سہ ماہی ۲۰۲۵",
      content: "All parties wishing to file cases for the Q4 2025 hearing schedule must submit their applications by October 15, 2025.\n\nRequired documents:\n1. Application form (available at Markazi office or all branches)\n2. Statement of dispute (in Urdu, Kannada, or English)\n3. Identity proof of both parties\n4. Supporting documents (property records, nikah certificates, etc.) — 2 attested copies\n5. Consent declaration signed by both parties\n\nIncomplete applications will not be accepted. For assistance, contact the Markazi Darul Qaza, Shivajinagar, Bengaluru.",
      tag: "Circular",
      publishedAt: new Date("2025-09-25"),
    },
    {
      title: "Circular: Revised Nikah Registration Procedure",
      titleUrdu: "سرکلر: نکاح رجسٹریشن کا نظر ثانی شدہ طریقہ کار",
      content: "Imarat-e-Shariah Karnataka hereby announces revised procedures for Nikah registration effective from October 1, 2025.\n\nNew requirements:\n• Both parties must be present in person at the time of registration\n• Two witnesses must carry valid government-issued photo identity\n• Marriage certificate will be issued within 7 working days\n• A nominal registration fee applies (waived for BPL families)\n\nFor queries, contact any branch or the Markazi office.",
      tag: "Circular",
      publishedAt: new Date("2025-09-15"),
    },
    {
      title: "Notice: Office Closed — Eid al-Adha 2025",
      titleUrdu: "اطلاع: عید الاضحیٰ ۲۰۲۵ — دفتر بند",
      content: "All offices of Imarat-e-Shariah Karnataka, including the Markazi Darul Qaza and all branches, will remain closed on June 6–8, 2025 on account of Eid al-Adha.\n\nEmergency contact for urgent matters: +91 80 2559 0000 (available limited hours).\n\nRegular office hours resume from June 9, 2025.",
      tag: "Holiday Notice",
      publishedAt: new Date("2025-06-01"),
    },
    {
      title: "Notice: Annual Zakaat Collection Drive 2025",
      titleUrdu: "اطلاع: سالانہ زکوٰة جمع مہم ۲۰۲۵",
      content: "Imarat-e-Shariah Karnataka is conducting its annual Zakaat collection and distribution drive for Ramadan 2025.\n\nZakaat may be deposited at:\n• Markazi Darul Qaza, Bengaluru\n• Any regional branch\n• Via bank transfer (account details available on request)\n\nAll collected Zakaat will be distributed to eligible recipients (Mustahiq) identified and verified by the Mushawarat division. Receipts will be provided for all donations.\n\nFor further information, contact info@imarateshariah.in.",
      tag: "Community",
      publishedAt: new Date("2025-03-01"),
    },
    {
      title: "Circular: New Darul Ifta Email for Fatwa Queries",
      titleUrdu: "سرکلر: فتویٰ سوالات کے لیے نیا ای میل",
      content: "Members of the public may now submit fatwa queries to Darul Ifta via email at darulilta@imarateshariah.in.\n\nGuidelines for submitting queries:\n• State the question clearly and concisely\n• Provide relevant context or background\n• Include your name and contact details\n• One question per email submission\n\nResponses will be provided within 10 working days for standard queries. Complex matters may take longer. Personal visits to the Darul Ifta office continue to be available by appointment.",
      tag: "Circular",
      publishedAt: new Date("2025-02-10"),
    },
  ]).onConflictDoNothing();

  console.log("✅ Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
