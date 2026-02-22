import React, { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

const Motion = motion;
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Send,
  CheckCircle2,
  Star,
  Users,
  GraduationCap,
  Zap,
  Linkedin,
} from "lucide-react";
import { useLocalTheme } from "../hooks/use-local-theme";

/* -----------------------------------------------------------
   CONFIG
----------------------------------------------------------- */

const COLORS = {
  accent: "#C51F5D",
  navy: "#0B1220",
  slate: "#243447",
  // ? light-mode paper background from your screenshot
  paper: "#E2E2D2",
};

/**
 * Paper grain (no extra assets):
 * Uses SVG feTurbulence for a natural paper-like grain.
 * Safe to keep inline, and you can tune opacity in the background layers.
 */
const PAPER_GRAIN_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E";

const IMAGES = {
  solution1: "/students.jpg",
  solution2: "/adas.jpg",
  solution3:
    "/mentor.jpg",
  solution4: "/life.jpg",
  solution5:
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  about:
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
};

const SOLUTIONS = [
  {
    title: "Students & Graduates",
    desc: "Career-focused pathways designed for students and fresh graduates entering the job market.",
    img: IMAGES.solution1,
    tag1: "Career start",
    tag2: "Industry-ready",
    href: "/students-graduates",
  },
  {
    title: "AI for Real-World Careers",
    desc: "Practical AI learning applied to real business, engineering, and cross-functional use cases.",
    img: IMAGES.solution2,
    tag1: "Applied AI",
    tag2: "Real use-cases",
    href: "/for-individuals/ai-for-real-world-careers",
  },
  {
    title: "1-to-1 Career Mentorship",
    desc: "1-to-1 and group mentoring aligned with real career paths.",
    img: IMAGES.solution3,
    tag1: "1:1 feedback",
    tag2: "Portfolio polish",
    href: "/for-individuals/mentorship",
  },
];

const BENEFITS = [
  {
    icon: Users,
    title: "Universities & Companies",
    desc: "Co-designed learning and talent pipelines connecting universities with industry partners.",
    img: IMAGES.solution5,
    tag1: "Co-designed",
    tag2: "Talent pipeline",
    href: "/for-organizations/universities-companies",
  },
  {
    icon: GraduationCap,
    title: "Schools & Early Talent Programs",
    desc: "Early exposure programs that build future-ready skills for students and young talent.",
    img: "/schoold.webp",
    tag1: "Early talent",
    tag2: "Future-ready",
    href: "/for-organizations/schools-early-talent-programs",
  },
  {
    icon: Zap,
    title: "AI for Organizations",
    desc: "Applied AI initiatives that improve operations, learning systems, and decision workflows.",
    img: "/ai-for-or.webp",
    tag1: "Applied AI",
    tag2: "Operational impact",
    href: "/for-organizations/ai",
  },
];

const EXPERTS = [
  {
    name: "Dr. Sarah Johnson",
    role: "Senior Product Manager",
    org: "Product Studio",
    focus: "Product Strategy, Growth",
    experience: "10+ years experience",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Michael Chen",
    role: "Engineering Lead",
    org: "Cloud Platforms",
    focus: "System Design, Leadership",
    experience: "8+ years engineering",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Prof. Emma Williams",
    role: "Academic Director",
    org: "Global University",
    focus: "Curriculum, Industry Alignment",
    experience: "12+ years education",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Ahmed Al-Rashid",
    role: "Business Strategy",
    org: "GCC Ventures",
    focus: "Market Expansion, Partnerships",
    experience: "12+ years consulting",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Sofia Martinez",
    role: "Data Science Lead",
    org: "AI Labs Europe",
    focus: "Machine Learning, MLOps",
    experience: "9+ years in data and AI",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Daniel Foster",
    role: "Cybersecurity Architect",
    org: "SecureNet Group",
    focus: "Cloud Security, Risk",
    experience: "11+ years in security",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Noura Haddad",
    role: "UX Research Director",
    org: "DesignWorks",
    focus: "Product Research, UX Strategy",
    experience: "10+ years in product design",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Lucas Moretti",
    role: "Cloud Infrastructure Manager",
    org: "Nimbus Systems",
    focus: "DevOps, Platform Engineering",
    experience: "8+ years in cloud operations",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Priya Raman",
    role: "Digital Transformation Consultant",
    org: "FutureScale Advisory",
    focus: "Innovation Programs, Change",
    experience: "13+ years in transformation",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
];

const ABOUT_COPY = {
  title: "About Praktix",
  p1: "Praktix is a global platform connecting ambitious students and graduates with industry-leading companies across Europe and the GCC region.",
  p2: "Our mission is to bridge the gap between academic learning and professional practice, providing real-world experience that transforms careers.",
  p3: "Through partnerships with universities and corporations, we create meaningful opportunities for the next generation of professionals to excel in their chosen fields.",
};

const HOW_IT_WORKS = [
  {
    icon: "",
    title: "Apply & Get Matched",
    desc: "Submit your application and we will match you with opportunities aligned with your goals.",
  },
  {
    icon: "",
    title: "Start Your Project",
    desc: "Work on real-world projects with expert guidance and mentoring.",
  },
  {
    icon: "",
    title: "Build Your Portfolio",
    desc: "Create portfolio-ready outputs that hiring teams can validate.",
  },
  {
    icon: "",
    title: "Launch Your Career",
    desc: "Use proof of work + network to land roles or accelerate your path.",
  },
];

const LOGOS = [
  { key: "intel", alt: "Intel", src: "/logos/intel.png", sizeClass: "h-6 sm:h-7", boxClass: "w-[120px]", scale: 1 },
  { key: "ibm", alt: "IBM", src: "/logos/ibm.png", sizeClass: "h-6 sm:h-7", boxClass: "w-[120px]", scale: 1 },
  { key: "oracle", alt: "Oracle", src: "/logos/oracle.png", sizeClass: "h-5 sm:h-6", boxClass: "w-[120px]", scale: 1.08 },
  { key: "adobe", alt: "Adobe", src: "/logos/adobe.png", sizeClass: "h-6 sm:h-7", boxClass: "w-[120px]", scale: 1 },
  { key: "pwc", alt: "PwC", src: "/logos/pwc.png", sizeClass: "h-8 sm:h-9", boxClass: "w-[110px]", scale: 1.35 },
  { key: "cisco", alt: "Cisco", src: "/logos/cisco.png", sizeClass: "h-5 sm:h-6", boxClass: "w-[120px]", scale: 1.05 },
  { key: "deloitte", alt: "Deloitte", src: "/logos/deloitte.png", sizeClass: "h-5 sm:h-6", boxClass: "w-[120px]", scale: 1 },
  { key: "ey", alt: "EY", src: "/logos/ey.png", sizeClass: "h-8 sm:h-9", boxClass: "w-[100px]", scale: 1.25 },
  { key: "sap", alt: "SAP", src: "/logos/sap.png", sizeClass: "h-6 sm:h-7", boxClass: "w-[100px]", scale: 1.9 },
];

/* -----------------------------------------------------------
   HELPERS
----------------------------------------------------------- */

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// -----------------------------------------------------------
// MOTION SYSTEM (shared across the page)
// -----------------------------------------------------------
const EASE_OUT = [0.16, 1, 0.3, 1];

const SPRING = {
  type: "spring",
  stiffness: 220,
  damping: 24,
  mass: 0.7,
};

const VARIANTS = {
  section: {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.09, delayChildren: 0.06 },
    },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE_OUT } },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.96, filter: "blur(6px)" },
    show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE_OUT } },
  },
};

function MotionSection({ className = "", children, amount = 0.22, once = true }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : VARIANTS.section}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

function MotionItem({ className = "", children, variant = "fadeUp" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? undefined : VARIANTS[variant]}>
      {children}
    </motion.div>
  );
}

/* -----------------------------------------------------------
   PRIMITIVES (theme-aware)
----------------------------------------------------------- */

function GlassCard({ className = "", style = {}, children }) {
  return (
    <div
      className={[
        "rounded-[34px] border border-[color:var(--border)] bg-[color:var(--card)] backdrop-blur-xl",
        className,
      ].join(" ")}
      style={{ boxShadow: "var(--shadow-lg)", ...style }}
    >
      {children}
    </div>
  );
}

function Pill({ children, className = "" }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold",
        "border border-[color:var(--border)] bg-[color:var(--chipBg)] text-[color:var(--chipText)]",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function Chip({ variant = "green", children }) {
  const map = {
    green:
      "bg-[rgba(46,204,113,0.12)] border-[rgba(46,204,113,0.24)] text-[color:var(--text)]",
    blue:
      "bg-[rgba(59,130,246,0.12)] border-[rgba(59,130,246,0.24)] text-[color:var(--text)]",
    pink:
      "bg-[rgba(197,31,93,0.12)] border-[rgba(197,31,93,0.24)] text-[color:var(--text)]",
  };
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]",
        map[variant],
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function PrimaryBtn({ children, className = "", ...props }) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={SPRING}
      className={[
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold sm:px-7 sm:py-3.5",
        "text-white shadow-[0_18px_45px_rgba(197,31,93,0.28)] hover:brightness-110",
        "bg-[linear-gradient(135deg,rgba(197,31,93,1),rgba(165,22,78,1))]",
        className,
      ].join(" ")}
      {...props}
    >
      <span className="inline-flex items-center gap-2">
        {children}
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={reduce ? undefined : { x: 0 }}
          whileHover={reduce ? undefined : { x: 4 }}
          transition={{ duration: 0.18, ease: EASE_OUT }}
        />
      </span>
    </motion.a>
  );
}

function GhostBtn({ children, className = "", ...props }) {
  return (
    <a
      className={[
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold sm:px-7 sm:py-3.5",
        "border border-[color:var(--border)] bg-[color:var(--chipBg)] text-[color:var(--text)] backdrop-blur",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]",
        "hover:bg-[color:var(--card)]",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </a>
  );
}

function SectionTitle({ kicker, title, accentWord, subtitle }) {
  return (
    <div className="text-center">
      {kicker ? (
        <div className="mb-4 flex justify-center">
          <Pill>{kicker}</Pill>
        </div>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--text)] sm:text-4xl md:text-5xl">
        {title} <span className="text-[color:var(--accent)]">{accentWord}</span>
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-base font-medium text-[color:var(--muted)] md:text-lg">
        {subtitle}
      </p>
    </div>
  );
}

function Header({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center">
      {eyebrow ? (
        <div className="mb-4 flex justify-center">
          <Pill>{eyebrow}</Pill>
        </div>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--text)] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-base font-medium text-[color:var(--muted)] md:text-lg">
        {subtitle}
      </p>
    </div>
  );
}

function SuccessStories({ items }) {
  const reduce = useReducedMotion();
  const railItems = [...items, ...items];
  const storyPhotos = [
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/men/75.jpg",
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/22.jpg",
    "https://randomuser.me/api/portraits/women/12.jpg",
    "https://randomuser.me/api/portraits/men/47.jpg",
    "https://randomuser.me/api/portraits/women/29.jpg",
    "https://randomuser.me/api/portraits/men/64.jpg",
    "https://randomuser.me/api/portraits/women/53.jpg",
  ];

  const initials = (name = "") =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((x) => x[0]?.toUpperCase())
      .join("");

  const renderCard = (story, idx, widthClass = "w-[340px] sm:w-[400px]") => {
    const photoSrc = story.photo || storyPhotos[idx % storyPhotos.length];
    return (
      <article
        key={`${story.name}-${idx}`}
        className={`group relative shrink-0 overflow-hidden rounded-[24px] border border-[color:var(--border)] bg-[color:var(--card)] shadow-[var(--shadow-md)] backdrop-blur transition-all duration-200 hover:border-[#C51F5D] hover:ring-2 hover:ring-[#C51F5D]/75 ${widthClass}`}
      >
        <div className="absolute left-0 top-0 h-full w-1.5 bg-[color:var(--accent)]" />

        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={photoSrc}
            alt={`${story.name} story cover`}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_55%,rgba(0,0,0,0.22)_100%)]" />
        </div>

        <div className="p-6">
          <div className="ml-2 text-base font-bold leading-relaxed text-[color:var(--text)]">
            {story.quote}
          </div>

          <div className="ml-2 mt-6 flex items-center gap-3">
            {story.avatar ? (
              <img
                src={story.avatar}
                alt={story.name}
                className="h-12 w-12 rounded-full border border-[#C51F5D]/25 object-cover"
              />
            ) : (
              <div className="grid h-12 w-12 place-items-center rounded-full border border-[#C51F5D]/25 bg-[#C51F5D]/10 text-xs font-extrabold text-[#C51F5D]">
                {initials(story.name)}
              </div>
            )}

            <div>
              <div className="text-sm font-extrabold text-[color:var(--text)]">{story.name}</div>
              <div className="text-xs font-semibold text-[color:var(--muted)]">{story.role}</div>
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="mt-10 overflow-hidden" dir="ltr">
      <motion.div
        className="flex w-max gap-5 pr-5"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={reduce ? undefined : { duration: 34, repeat: Infinity, ease: "linear" }}
      >
        {railItems.map((story, idx) => renderCard(story, idx))}
      </motion.div>
    </div>
  );
}

function LearningHeroLikeRef({ theme, reduce, rotatingWords, rotatingWordIndex }) {
  const isDark = theme === "dark";
  const primarySolution = SOLUTIONS[0] || {};
  const mentorSolution = SOLUTIONS.find((s) => s.title?.toLowerCase().includes("mentorship")) || SOLUTIONS[SOLUTIONS.length - 1] || {};

  return (
    <div className="relative overflow-hidden rounded-[34px]" style={{ boxShadow: "var(--shadow-lg)" }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 18% 25%, rgba(197,31,93,0.18), transparent 62%)," +
            "radial-gradient(1100px 800px at 78% 30%, rgba(36,52,71,0.35), transparent 58%)," +
            "linear-gradient(135deg, rgba(6,12,22,0.98), rgba(11,24,41,0.96) 55%, rgba(9,18,33,0.98))",
        }}
      />

      <div
        className="absolute inset-y-0 right-0 hidden w-[48%] md:block"
        style={{
          background: "linear-gradient(135deg, rgba(197,31,93,0.92), rgba(36,52,71,0.92))",
          clipPath: "polygon(26% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 0.92,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay"
        style={{ backgroundImage: `url("${PAPER_GRAIN_DATA_URI}")`, backgroundSize: "340px 340px" }}
      />

      <div className="relative grid gap-10 p-6 sm:p-10 md:grid-cols-[1.05fr_.95fr] md:items-center md:p-12">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center rounded-full px-4 py-2 text-xs font-extrabold text-white"
              style={{
                background: "linear-gradient(135deg, rgba(197,31,93,1), rgba(165,22,78,1))",
                boxShadow: "0 14px 34px rgba(197,31,93,0.28)",
              }}
            >
              {primarySolution.tag1 || "Career start"}
            </span>

            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-extrabold text-white/80">
              {primarySolution.tag2 || "Industry-ready"}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-extrabold text-white/80">
              <Sparkles size={14} />
              Proof of work
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Real{" "}
            <span className="text-[color:var(--accent)]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingWords[rotatingWordIndex]}
                  className="inline-flex"
                  initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }}
                >
                  {rotatingWords[rotatingWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            .
          </h1>

          <p className="mt-5 max-w-[60ch] text-base font-medium leading-relaxed text-white/78 sm:text-lg">
            Structured industry-driven programs connecting education, AI, and global expertise.
          </p>
          <p className="max-w-[60ch] text-base font-medium leading-relaxed text-white/78 sm:text-lg">
            Built to turn potential into measurable performance.
          </p>

          <div className="mt-8">
           
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="relative mx-auto aspect-square w-full max-w-[480px]">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 200deg, rgba(197,31,93,1), rgba(197,31,93,1) 24%, rgba(255,255,255,0.14) 24%, rgba(255,255,255,0.14) 64%, rgba(197,31,93,1) 64%, rgba(197,31,93,1))",
                padding: 10,
                boxShadow: "0 40px 120px rgba(0,0,0,0.45)",
              }}
            >
              <div
                className="h-full w-full rounded-full"
                style={{
                  background: "conic-gradient(from 80deg, rgba(255,255,255,0.18), rgba(255,255,255,0.10), rgba(255,255,255,0.18))",
                  padding: 10,
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <img
                    src={primarySolution.img || IMAGES.solution1}
                    alt="Students"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_55%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_35%,rgba(0,0,0,0.45)_100%)]" />
                </div>
              </div>
            </div>

            <motion.div
              className="absolute right-0 top-[18%] rounded-2xl border bg-white px-4 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.25)]"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{ borderColor: "rgba(15,23,42,0.10)" }}
            >
              <div className="text-xs font-extrabold text-[#243447]/70">Your goal</div>
              <div className="mt-1 text-sm font-extrabold text-[#0B1220]">Portfolio-ready outputs</div>
            </motion.div>

            <motion.div
              className="absolute left-2 bottom-[18%] rounded-2xl border bg-white px-4 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.25)]"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
              style={{ borderColor: "rgba(15,23,42,0.10)" }}
            >
              <div className="text-xs font-extrabold text-[#243447]/70">{mentorSolution.title || "Career Mentorship"}</div>
              <div className="mt-1 text-sm font-extrabold text-[#0B1220]">Weekly feedback loops</div>
              <div className="mt-2 flex items-center gap-1 text-[color:var(--accent)]">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
            </motion.div>
          </div>

          {!isDark ? null : (
            <div className="mt-4 text-center text-xs font-semibold text-white/50 md:hidden">
              Tip: choose a pathway and start building proof of work.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewForm({ theme }) {
  const isDark = theme === "dark";
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setName("");
    setRole("");
    setQuote("");
    setRating(5);
    window.setTimeout(() => setSent(false), 2600);
  };

  return (
    <div className="mt-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex justify-center">
          <Pill className="gap-2">
            <Send size={14} />
            Submit a Review
          </Pill>
        </div>

        <div
          className="relative overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-[color:var(--card)] p-5 sm:p-7"
          style={{ boxShadow: "var(--shadow-lg)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background: isDark
                ? "radial-gradient(700px 260px at 20% 10%, rgba(197,31,93,0.18), transparent 60%), radial-gradient(700px 260px at 80% 10%, rgba(36,52,71,0.22), transparent 60%)"
                : "radial-gradient(700px 260px at 20% 10%, rgba(197,31,93,0.10), transparent 60%), radial-gradient(700px 260px at 80% 10%, rgba(36,52,71,0.08), transparent 60%)",
            }}
          />

          {!isDark ? (
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
              style={{ backgroundImage: `url("${PAPER_GRAIN_DATA_URI}")`, backgroundSize: "320px 320px" }}
            />
          ) : null}

          <form onSubmit={onSubmit} className="relative grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs font-extrabold tracking-wide text-[color:var(--muted)]">Your name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={[
                    "w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none",
                    isDark
                      ? "border-white/10 bg-white/10 text-white placeholder:text-white/45"
                      : "border-black/10 bg-[rgba(255,255,255,0.55)] text-[color:var(--text)] placeholder:text-black/35",
                  ].join(" ")}
                  placeholder="Name"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-extrabold tracking-wide text-[color:var(--muted)]">Role / relationship</span>
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={[
                    "w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none",
                    isDark
                      ? "border-white/10 bg-white/10 text-white placeholder:text-white/45"
                      : "border-black/10 bg-[rgba(255,255,255,0.55)] text-[color:var(--text)] placeholder:text-black/35",
                  ].join(" ")}
                  placeholder="e.g., Program Participant"
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[color:var(--border)] bg-[rgba(255,255,255,0.10)] px-4 py-3">
              <div className="text-xs font-extrabold text-[color:var(--muted)]">Rating</div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  const v = i + 1;
                  const active = v <= rating;
                  return (
                    <button
                      type="button"
                      key={v}
                      onClick={() => setRating(v)}
                      className="grid h-9 w-9 place-items-center rounded-xl border"
                      style={{
                        borderColor: active ? "rgba(197,31,93,0.35)" : "rgba(15,23,42,0.10)",
                        background: active ? "rgba(197,31,93,0.12)" : "rgba(255,255,255,0.12)",
                      }}
                      aria-label={`Set rating ${v}`}
                    >
                      <Star size={16} className={active ? "text-[color:var(--accent)]" : "text-[color:var(--muted)]"} fill={active ? "currentColor" : "none"} />
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="grid gap-2">
              <span className="text-xs font-extrabold tracking-wide text-[color:var(--muted)]">Your feedback</span>
              <textarea
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                rows={4}
                className={[
                  "w-full resize-none rounded-2xl border px-4 py-3 text-sm font-semibold outline-none",
                  isDark
                    ? "border-white/10 bg-white/10 text-white placeholder:text-white/45"
                    : "border-black/10 bg-[rgba(255,255,255,0.55)] text-[color:var(--text)] placeholder:text-black/35",
                ].join(" ")}
                placeholder="Write your review..."
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs font-semibold text-[color:var(--muted)]">
              </div>

              <motion.button
                type="submit"
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                transition={SPRING}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-extrabold text-white"
                style={{
                  background: "linear-gradient(135deg, rgba(197,31,93,1), rgba(165,22,78,1))",
                  boxShadow: "0 18px 45px rgba(197,31,93,0.28)",
                }}
              >
                Submit <Send size={16} />
              </motion.button>
            </div>

            <AnimatePresence>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  className="mt-2 flex items-center justify-center gap-2 rounded-2xl border border-[rgba(197,31,93,0.25)] bg-[rgba(197,31,93,0.12)] px-4 py-3 text-sm font-extrabold text-[color:var(--text)]"
                >
                  <CheckCircle2 size={18} />
                  Thanks - your review was received!
                </motion.div>
              ) : null}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   HERO
----------------------------------------------------------- */

function EcosystemCanvas({ pulseKey, reduce }) {
  const canvasRef = React.useRef(null);
  const nodesRef = React.useRef([]);
  const frameRef = React.useRef(0);
  const sizeRef = React.useRef({ w: 0, h: 0 });
  const [staticMode, setStaticMode] = useState(false);

  React.useEffect(() => {
    const lowCore = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
    setStaticMode(Boolean(lowCore || lowMemory));
  }, []);

  React.useEffect(() => {
    if (reduce || staticMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const makeNodes = (w, h) => {
      const mobile = window.innerWidth < 768;
      const count = mobile ? 20 : 34;
      const palette = [
        "rgba(197,31,93,0.95)",
        "rgba(82,214,149,0.95)",
        "rgba(147,230,184,0.90)",
        "rgba(255,255,255,0.85)",
      ];

      nodesRef.current = Array.from({ length: count }, (_, idx) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.07,
        vy: (Math.random() - 0.5) * 0.07,
        r: 1.2 + Math.random() * 2.4,
        color: palette[idx % palette.length],
        pulseOffset: Math.random() * Math.PI * 2,
        core: idx % 8 === 0,
        boost: 0,
      }));
    };

    const fit = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w: rect.width, h: rect.height };
      makeNodes(rect.width, rect.height);
    };

    const draw = (ts) => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const maxDist = 110;
      const cycle = 13000;
      const phase = ((ts % cycle) / cycle) * Math.PI * 2;

      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));
        n.boost *= 0.95;
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > maxDist) continue;
          const alpha = (1 - dist / maxDist) * 0.34;
          ctx.strokeStyle = `rgba(173, 227, 205, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];
        const pulse = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(phase + n.pulseOffset));
        const radius = n.r + pulse * 0.8 + n.boost * 1.8;
        const glow = n.core ? 14 : 8;
        ctx.shadowBlur = glow + n.boost * 18;
        ctx.shadowColor = n.color;
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      frameRef.current = window.requestAnimationFrame(draw);
    };

    fit();
    frameRef.current = window.requestAnimationFrame(draw);
    window.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [reduce, staticMode]);

  React.useEffect(() => {
    if (reduce || staticMode || nodesRef.current.length === 0) return;
    const nodes = nodesRef.current;
    const flashes = Math.min(3, nodes.length);
    for (let i = 0; i < flashes; i += 1) {
      const idx = Math.floor(Math.random() * nodes.length);
      nodes[idx].boost = 1.1;
    }
  }, [pulseKey, reduce, staticMode]);

  if (staticMode || reduce) {
    return (
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(58% 58% at 32% 30%, rgba(197,31,93,0.26), transparent 70%)," +
            "radial-gradient(56% 56% at 72% 68%, rgba(82,214,149,0.28), transparent 72%)," +
            "linear-gradient(135deg, rgba(11,18,32,0.94), rgba(20,35,58,0.95))",
        }}
      />
    );
  }

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full rounded-full" aria-hidden="true" />;
}

function HeroEcosystem({ y, pulseKey, reduce }) {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.div style={{ y }} className="relative mx-auto w-full max-w-[460px] sm:max-w-[560px]">
      <motion.div
        className="group relative mx-auto aspect-square w-full max-w-[420px] sm:max-w-[500px]"
        whileHover={
          reduce || isMobile
            ? undefined
            : {
                scale: 1.03,
                filter: "drop-shadow(0 0 26px rgba(197,31,93,0.28))",
              }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="absolute rounded-full border border-[rgba(197,31,93,0.38)]"
          animate={
            reduce || isMobile
              ? undefined
              : {
                  rotate: 360,
                }
          }
          transition={
            reduce || isMobile
              ? undefined
              : {
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
          style={{
            inset: isMobile ? 10 : 16,
            boxShadow: "0 0 0 1px rgba(82,214,149,0.34), 0 0 46px rgba(82,214,149,0.20)",
          }}
        />
        <motion.div
          className="absolute rounded-full border border-[rgba(255,255,255,0.14)]"
          animate={{ opacity: [0.38, 0.62, 0.38] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            inset: isMobile ? 24 : 36,
            boxShadow: "inset 0 0 34px rgba(197,31,93,0.22)",
          }}
        />

        <div
          className="absolute overflow-hidden rounded-full border border-white/12 bg-[linear-gradient(145deg,rgba(9,17,30,0.98),rgba(17,30,51,0.98))]"
          style={{ inset: isMobile ? 40 : 58 }}
        >
          <EcosystemCanvas pulseKey={pulseKey} reduce={reduce} />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 26% 30%, rgba(197,31,93,0.18), transparent 54%)," +
                "radial-gradient(circle at 74% 64%, rgba(82,214,149,0.20), transparent 58%)",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -----------------------------------------------------------
   STATS TILES
----------------------------------------------------------- */

function StatTile({ variant, value, label }) {
  const common =
    "relative overflow-hidden rounded-[26px] px-6 py-7 sm:px-10 sm:py-9 md:px-12 md:py-10";

  if (variant === "pink") {
    return (
      <div
        className={[
          common,
          "text-white",
          "border border-white/10",
          "bg-[linear-gradient(135deg,#8E1748,#B51D5C)]",
          "shadow-[0_24px_90px_rgba(0,0,0,0.16)]",
        ].join(" ")}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-12 -top-10 h-[240px] w-[320px] opacity-[0.22]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55), transparent 60%)," +
              "conic-gradient(from 200deg at 60% 55%, rgba(255,255,255,0.55), transparent 35%, rgba(255,255,255,0.32), transparent 78%)",
            transform: "rotate(10deg)",
          }}
        />
        <div className="relative text-4xl font-semibold leading-none sm:text-6xl">
          {value}
        </div>
        <div className="relative mt-3 text-sm font-semibold text-white/80">
          {label}
        </div>
      </div>
    );
  }

  if (variant === "navy") {
    return (
      <div
        className={[
          common,
          "text-white",
          "border border-white/10",
          "bg-[linear-gradient(135deg,#0E2A44,#071726)]",
          "shadow-[0_24px_90px_rgba(0,0,0,0.16)]",
        ].join(" ")}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "radial-gradient(240px 240px at 92% 18%, rgba(255,255,255,0.14), transparent 60%)," +
              "radial-gradient(200px 200px at 92% 18%, transparent 56%, rgba(255,255,255,0.10) 57%, transparent 63%)," +
              "radial-gradient(150px 150px at 92% 18%, transparent 56%, rgba(255,255,255,0.08) 57%, transparent 64%)",
          }}
        />
        <div className="relative text-4xl font-semibold leading-none sm:text-6xl">
          {value}
        </div>
        <div className="relative mt-3 text-sm font-semibold text-white/70">
          {label}
        </div>
      </div>
    );
  }

  // ? ivory tile tuned to your screenshot: less green, more paper/white
  return (
    <div
      className={[
        common,
        "border border-black/10",
        "shadow-[0_24px_90px_rgba(0,0,0,0.08)]",
      ].join(" ")}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.70), rgba(245,245,236,0.92))",
      }}
    >
      <div className="text-4xl font-semibold leading-none text-[#1F2A37] sm:text-6xl">
        {String(value).replace("+", "")}
        <span className="text-[color:var(--accent)]">+</span>
      </div>
      <div className="mt-3 text-sm font-semibold text-black/55">{label}</div>
    </div>
  );
}

/* -----------------------------------------------------------
   LOGO MARQUEE
----------------------------------------------------------- */

function LogoStrip({ theme }) {
  const isDark = theme === "dark";
  const rows = [
    [LOGOS[0], LOGOS[1], LOGOS[2], LOGOS[3], LOGOS[4], LOGOS[5], LOGOS[6], LOGOS[7], LOGOS[8]],
    [LOGOS[8], LOGOS[7], LOGOS[6], LOGOS[5], LOGOS[4], LOGOS[3], LOGOS[2], LOGOS[1], LOGOS[0]],
  ];

  return (
    <div className="mt-7">
      <style>{`
        @keyframes logo_strip_move {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logo-strip-track {
          width: max-content;
          display: inline-flex;
          align-items: center;
          animation: logo_strip_move 20s linear infinite;
          will-change: transform;
        }
        .logo-strip-track.reverse {
          animation-direction: reverse;
          animation-duration: 24s;
        }
      `}</style>

      {/* Optional: a soft band behind logos (helps match screenshot) */}
      <div
        className="mx-auto w-full max-w-4xl rounded-2xl px-6 py-5"
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.14)",
          border: `1px solid ${
            isDark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.06)"
          }`,
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="relative w-full overflow-hidden"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                maskImage:
                  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              }}
            >
              <div
                className={[
                  "logo-strip-track",
                  rowIndex === 1 ? "reverse" : "",
                  rowIndex === 0 ? "gap-x-10 gap-y-3" : "gap-x-9 gap-y-3",
                ].join(" ")}
              >
                {[...row, ...row].map((logo, i) => (
                  <div
                    key={`${rowIndex}-${logo.key}-${i}`}
                    className={`flex h-12 ${logo.boxClass || "w-[120px]"} items-center justify-center overflow-hidden px-1 py-1`}
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className={`${logo.sizeClass} w-auto object-contain`}
                      style={{
                        filter: isDark
                          ? "brightness(1.14) contrast(1.08) drop-shadow(0 1px 2px rgba(0,0,0,0.45))"
                          : "none",
                        opacity: 1,
                        transform: `scale(${logo.scale || 1})`,
                        transformOrigin: "center",
                      }}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   CARDS
----------------------------------------------------------- */

function PillarCard({ theme, item }) {
  const isDark = theme === "dark";
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={[
        "group relative overflow-hidden rounded-[22px] border border-[color:var(--border)] bg-[color:var(--card)] transition-all duration-200 hover:border-[#C51F5D] hover:ring-2 hover:ring-[#C51F5D]/75",
        item.href ? "cursor-pointer" : "",
        "shadow-[0_18px_70px_rgba(0,0,0,0.12)]",
      ].join(" ")}
      whileHover={reduce ? undefined : { y: -8, scale: 1.01 }}
      whileTap={reduce ? undefined : { scale: 0.99 }}
      transition={SPRING}
    >
      {item.href ? (
        <a href={item.href} className="absolute inset-0 z-10" aria-label={item.title} />
      ) : null}
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={item.img}
          alt={item.title}
          className="h-full w-full object-cover"
          whileHover={reduce ? undefined : { scale: 1.06 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        />
        {isDark ? (
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,18,32,0.72)] via-[rgba(11,18,32,0.12)] to-transparent" />
        ) : null}
      </div>

      <div className="flex h-[280px] flex-col p-6">
        <div className="text-lg font-semibold text-[color:var(--text)]">
          {item.title}
        </div>
        <div className="mt-3 flex-1 text-sm font-medium leading-relaxed text-[color:var(--muted)]">
          {item.desc}
        </div>

        <div className="mt-5 flex gap-2">
          <span
            className="rounded-full px-4 py-2 text-xs font-semibold text-white"
            style={{
              background:
                "linear-gradient(135deg, rgba(197,31,93,1), rgba(165,22,78,1))",
            }}
          >
            {item.tag1}
          </span>
          <span
            className="rounded-full px-4 py-2 text-xs font-semibold"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.10)"
                : "rgba(36,52,71,0.12)",
              color: isDark
                ? "rgba(255,255,255,0.85)"
                : "rgba(36,52,71,0.70)",
              border: `1px solid ${
                isDark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.10)"
              }`,
            }}
          >
            {item.tag2}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function PlacementBanner({ theme }) {
  const isDark = theme === "dark";
  return (
    <div
      className={[
        "mt-9 overflow-hidden rounded-[22px] border",
        isDark ? "border-white/10" : "border-black/10",
      ].join(" ")}
      style={{
        // ? closer to your banner screenshot: magenta -> deep navy
        background: "linear-gradient(135deg, #B51D5C 0%, #0E2A44 100%)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div className="relative px-6 py-8 text-center">
        {/* subtle grain on banner */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light"
          style={{
            backgroundImage: `url("${PAPER_GRAIN_DATA_URI}")`,
            backgroundSize: "260px 260px",
          }}
        />

        <div className="relative text-xs font-semibold text-white/75">
          Balanced structure  strong visuals  portfolio-ready proof
        </div>
        <div className="relative mt-3 text-3xl font-semibold text-white md:text-4xl">
          <span className="text-white">2000+</span> successful placements powered
          by portfolio-ready
        </div>
        <div className="relative mx-auto mt-3 max-w-3xl text-sm font-medium text-white/75">
          Real projects + mentor feedback + measurable outcomes  designed to
          match hiring expectations.
        </div>
      </div>
    </div>
  );
}

function ExpertCard({ person }) {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();

  const toggle = () => setFlipped((v) => !v);

  const ORANGE = "#FF6A00";
  const BACK_TOP = "#0B3C46";   // teal-ish like screenshot
  const BACK_BOTTOM = "#071F26";

  return (
    <div className="w-full" style={{ perspective: 1400 }}>
      <motion.div
        className="relative h-[420px] w-full cursor-pointer select-none rounded-[30px]"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        whileHover={reduce ? undefined : { y: -8, rotateX: 1.5, rotateY: flipped ? 180 : -2 }}
        whileTap={reduce ? undefined : { scale: 0.99 }}
        onClick={toggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[30px] border border-[color:var(--border)]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(0.1px)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <img
            src={person.img}
            alt={person.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />

          {/* bottom fade */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.80)_100%)]" />

          <div className="absolute bottom-0 left-0 right-0 p-7">
            <div className="text-[22px] font-semibold text-white">
              {person.name}
            </div>
            <div className="mt-2 text-sm font-semibold" style={{ color: "var(--accent)" }}>
              {person.role}
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-[30px] border border-white/10 p-6 sm:p-7"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: `linear-gradient(180deg, ${BACK_TOP}, ${BACK_BOTTOM})`,
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div className="flex h-full flex-col items-center text-center">
            {/* portrait circle with orange ring */}
            <div
              className="relative h-24 w-24 shrink-0 rounded-full p-[4px] sm:h-28 sm:w-28"
              style={{
                backgroundColor: ORANGE,
                boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
              }}
            >
              <div className="h-full w-full overflow-hidden rounded-full">
                <img
                  src={person.img}
                  alt={person.name}
                  className="h-full w-full rounded-full object-cover"
                  style={{ objectPosition: "50% 28%" }}
                  loading="lazy"
                />
              </div>
            </div>

            <div className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl">
              {person.name}
            </div>

            <div
              className="mt-2 text-sm font-semibold sm:text-base"
              style={{ color: ORANGE }}
            >
              {person.role}
            </div>

            {person.org ? (
              <div className="mt-4 text-sm font-semibold text-white/80">
                {person.org}
              </div>
            ) : null}

            {person.focus ? (
              <div className="mt-2 text-sm font-medium leading-snug text-white/70">
                Focus: {person.focus}
              </div>
            ) : null}

            {person.experience ? (
              <div className="mt-2 text-sm font-medium text-white/70">
                {person.experience}
              </div>
            ) : null}

            {/* LinkedIn */}
            {person.linkedin ? (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold"
                style={{
                  border: `1px solid rgba(255,106,0,0.45)`,
                  color: ORANGE,
                  background: "rgba(255,106,0,0.08)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                LinkedIn <Linkedin size={16} />
              </a>
            ) : null}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* -----------------------------------------------------------
   PAGE
----------------------------------------------------------- */

export default function LandingPage() {
  const reduce = useReducedMotion();
  const { theme } = useLocalTheme();
  const rotatingWords = ["outcomes", "projects", "experience"];
  const [rotatingWordIndex, setRotatingWordIndex] = useState(0);
  const [expertIndex, setExpertIndex] = useState(0);
  const [expertVisible, setExpertVisible] = useState(4);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 22,
    mass: 0.7,
  });

  React.useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setRotatingWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2300);
    return () => window.clearInterval(id);
  }, [reduce, rotatingWords.length]);

  React.useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 720) {
        setExpertVisible(1);
      } else if (w < 1100) {
        setExpertVisible(2);
      } else {
        setExpertVisible(4);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const expertMaxStart = Math.max(0, EXPERTS.length - expertVisible);
  React.useEffect(() => {
    setExpertIndex((prev) => Math.min(prev, expertMaxStart));
  }, [expertMaxStart]);

  const goExpertLeft = () => {
    setExpertIndex((prev) => (prev <= 0 ? expertMaxStart : prev - 1));
  };
  const goExpertRight = () => {
    setExpertIndex((prev) => (prev >= expertMaxStart ? 0 : prev + 1));
  };

  const isDark = theme === "dark";
  const SUCCESS_STORIES = useMemo(
    () => [
      {
        quote:
          "The projects felt real, the feedback was sharp, and the outcomes were measurable.",
        name: "Alex Morgan",
        role: "Program Participant  Technology Track",
        avatar: "",
      },
      {
        quote:
          "This ecosystem makes hiring simpler because candidates come with proven work.",
        name: "Leila Hassan",
        role: "Talent Partner Industry Partner",
        avatar: "",
      },
      {
        quote: "Mentor reviews helped me improve faster and present stronger work in interviews.",
        name: "Omar Nasser",
        role: "Software Engineering Intern",
        avatar: "",
      },
      {
        quote: "The structure made it easy to track progress from learning to portfolio output.",
        name: "Maya Collins",
        role: "Program Coordinator",
        avatar: "",
      },
      {
        quote: "We hired candidates directly from project cohorts because proof of work was clear.",
        name: "Jonas Becker",
        role: "Hiring Manager",
        avatar: "",
      },
      {
        quote: "The program connected academic concepts to practical team delivery in weeks.",
        name: "Sara El-Khatib",
        role: "Data Analyst Trainee",
        avatar: "",
      },
      {
        quote: "Our institution saw better engagement once real projects became the center of learning.",
        name: "Henry Walsh",
        role: "University Partner Lead",
        avatar: "",
      },
      {
        quote: "I moved from theory-only learning to a portfolio that actually opened job interviews.",
        name: "Lina Petrova",
        role: "Graduate Participant",
        avatar: "",
      },
      {
        quote: "The mentorship quality and weekly feedback loops were the strongest part for our teams.",
        name: "Khaled Rahman",
        role: "Program Supervisor",
        avatar: "",
      },
      {
        quote: "The outcomes were measurable, repeatable, and aligned with what employers ask for.",
        name: "Noah Smith",
        role: "Talent Development Manager",
        avatar: "",
      },
    ],
    []
  );

  return (
    <div
      data-theme={theme}
      className="min-h-screen overflow-x-hidden"
      style={{
        ["--accent"]: COLORS.accent,
      }}
    >
      {/* TOKENS */}
      <style>{`
        [data-theme="light"]{
          /* ? Paper background like your screenshot */
          --bg: ${COLORS.paper};

          /* Text on paper (slightly deeper than before) */
          --text: rgba(20,30,44,0.92);
          --muted: rgba(20,30,44,0.58);

          /* Cards: still glassy but less white */
          --card: rgba(255,255,255,0.58);
          --border: rgba(15,23,42,0.10);

          /* Chips / pills */
          --chipBg: rgba(255,255,255,0.50);
          --chipText: rgba(36,52,71,0.62);

          --shadow-lg: 0 30px 120px rgba(15,23,42,0.14);
          --shadow-md: 0 18px 70px rgba(15,23,42,0.10);

          --journeyBg: rgba(255,255,255,0.56);
          --journeyBorder: rgba(15,23,42,0.08);
          --journeyShadow: 0 18px 70px rgba(15,23,42,0.10);
          --journeyGlow: radial-gradient(900px 260px at 20% 20%, rgba(36,52,71,0.08), transparent 60%);
          --journeyBadgeBg: rgba(255,255,255,0.62);
          --journeyBadgeBorder: rgba(36,52,71,0.18);
          --journeyBadgeText: rgba(36,52,71,0.70);
          --journeyImgBorder: rgba(15,23,42,0.08);
          --journeyImgShadow: 0 18px 60px rgba(15,23,42,0.10);

          --contactBg: rgba(255,255,255,0.58);
          --contactBorder: rgba(15,23,42,0.08);
          --contactShadow: 0 20px 90px rgba(15,23,42,0.14);
          --contactGlow: radial-gradient(900px 260px at 20% 20%, rgba(36,52,71,0.08), transparent 60%);

          --emailPillBg: rgba(255,255,255,0.58);
          --emailPillBorder: rgba(15,23,42,0.08);
          --emailPillText: rgba(36,52,71,0.72);
        }

        [data-theme="dark"]{
          --bg: ${COLORS.navy};
          --text: rgba(255,255,255,0.92);
          --muted: rgba(255,255,255,0.64);
          --card: rgba(255,255,255,0.06);
          --border: rgba(255,255,255,0.10);
          --chipBg: rgba(255,255,255,0.08);
          --chipText: rgba(255,255,255,0.70);
          --shadow-lg: 0 28px 110px rgba(0,0,0,0.42);
          --shadow-md: 0 18px 70px rgba(0,0,0,0.28);

          --journeyBg: rgba(255,255,255,0.06);
          --journeyBorder: rgba(255,255,255,0.10);
          --journeyShadow: 0 18px 70px rgba(0,0,0,0.30);
          --journeyGlow: radial-gradient(900px 260px at 20% 20%, rgba(60,200,255,0.10), transparent 60%);
          --journeyBadgeBg: rgba(255,255,255,0.08);
          --journeyBadgeBorder: rgba(255,255,255,0.10);
          --journeyBadgeText: rgba(255,255,255,0.78);
          --journeyImgBorder: rgba(255,255,255,0.10);
          --journeyImgShadow: 0 18px 60px rgba(0,0,0,0.35);

          --contactBg: rgba(255,255,255,0.06);
          --contactBorder: rgba(255,255,255,0.10);
          --contactShadow: 0 22px 90px rgba(0,0,0,0.40);
          --contactGlow: radial-gradient(900px 260px at 20% 20%, rgba(60,200,255,0.10), transparent 60%);

          --emailPillBg: rgba(255,255,255,0.08);
          --emailPillBorder: rgba(255,255,255,0.10);
          --emailPillText: rgba(255,255,255,0.78);
        }
      `}</style>

      {/* BACKGROUND (light mode is now paper + grain, not bright) */}
      <div className="fixed inset-0 -z-10" style={{ background: "var(--bg)" }} />

      {!isDark ? (
        <>
          {/* soft highlights/shadows to mimic paper depth */}
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(1200px_700px_at_18%_10%,rgba(255,255,255,0.30),transparent_70%)]" />
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(900px_600px_at_80%_8%,rgba(0,0,0,0.05),transparent_70%)]" />
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(900px_600px_at_55%_85%,rgba(0,0,0,0.05),transparent_72%)]" />

          {/* brand glow like screenshot, but subtle (no white wash) */}
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(950px_circle_at_18%_18%,rgba(36,52,71,0.08),transparent_65%)]" />
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(1100px_circle_at_82%_12%,rgba(36,52,71,0.08),transparent_65%)]" />

          {/* ? paper grain */}
          <div
            className="fixed inset-0 -z-10 opacity-[0.20] mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage: `url("${PAPER_GRAIN_DATA_URI}")`,
              backgroundSize: "280px 280px",
            }}
          />
        </>
      ) : (
        <>
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(900px_circle_at_16%_10%,rgba(60,200,255,0.16),transparent_62%)]" />
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(1000px_circle_at_86%_18%,rgba(99,102,241,0.12),transparent_60%)]" />
          <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,18,32,0.78),rgba(11,18,32,1))]" />
          <div
            className="fixed inset-0 -z-10 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08), transparent 55%)," +
                "radial-gradient(circle at 70% 10%, rgba(255,255,255,0.06), transparent 55%)",
            }}
          />
        </>
      )}

      {/* TOP PROGRESS */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[80] h-[3px] w-full origin-left"
        style={{ scaleX: progress, background: "var(--accent)" }}
      />

      <main className="overflow-x-clip pb-16">
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pt-2">
          <LearningHeroLikeRef
            theme={theme}
            reduce={reduce}
            rotatingWords={rotatingWords}
            rotatingWordIndex={rotatingWordIndex}
          />
        </section>

        {/* METHOD / STATS */}
        <section className="mx-auto max-w-6xl px-4 pt-14" id="method">
          <MotionSection>
          <MotionItem>
          <SectionTitle
           title="A system built for"
            accentWord="real outcomes"
            subtitle="Three pillars that turn learning into proof of work."
          />
          </MotionItem>

          <MotionItem variant="scaleIn">
          {isDark ? (
            <div
              className="mt-10 overflow-hidden rounded-[44px] border border-white/10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,18,32,0.92), rgba(36,52,71,0.92))",
                boxShadow: "0 30px 120px rgba(0,0,0,0.35)",
              }}
            >
              <div className="p-6 sm:p-8 md:p-10">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  <StatTile variant="pink" value="500+" label="Active Projects" />
                  <StatTile variant="navy" value="50+" label="Partner Companies" />
                  <StatTile
                    variant="ivory"
                    value="2000+"
                    label="Successful Placements"
                  />
                </div>
                <LogoStrip theme={theme} />
              </div>
            </div>
          ) : (
            <div className="mt-10">
              <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
                <StatTile variant="pink" value="500+" label="Active Projects" />
                <StatTile variant="navy" value="50+" label="Partner Companies" />
                <StatTile
                  variant="ivory"
                  value="2000+"
                  label="Successful Placements"
                />
              </div>
              <LogoStrip theme={theme} />
            </div>
          )}
          </MotionItem>

          <MotionItem>
          <div className="mt-5 flex flex-wrap justify-center gap-5">
            {SOLUTIONS.map((s) => (
              <div key={s.title} className="w-full max-w-[420px] md:w-[48%] lg:w-[31%]">
                <PillarCard theme={theme} item={s} />
              </div>
            ))}
          </div>
          </MotionItem>

          <MotionItem variant="scaleIn">
          <PlacementBanner theme={theme} />
          </MotionItem>
          </MotionSection>
        </section>

        {/* TOOLS */}
        <section className="mx-auto max-w-6xl px-4 pt-16" id="tools">
          <MotionSection>
          <MotionItem>
          <motion.div
            className="mb-6 flex justify-center"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
          >
            <div
              className="relative inline-flex items-center justify-center overflow-hidden rounded-full border px-7 py-3"
              style={{
                borderColor: isDark ? "rgba(255,255,255,0.18)" : "rgba(36,52,71,0.16)",
                background: isDark
                  ? "linear-gradient(135deg, rgba(20,29,38,0.86), rgba(36,52,71,0.82))"
                  : "linear-gradient(135deg, rgba(255,255,255,0.70), rgba(226,226,210,0.85))",
                boxShadow: isDark
                  ? "0 16px 46px rgba(0,0,0,0.30)"
                  : "0 16px 46px rgba(15,23,42,0.12)",
              }}
            >
              <motion.span
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 0%, rgba(197,31,93,0.10) 35%, rgba(197,31,93,0.20) 50%, rgba(36,52,71,0.10) 68%, transparent 100%)",
                }}
                animate={reduce ? undefined : { x: ["-55%", "55%"] }}
                transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative text-base font-extrabold tracking-[0.08em] uppercase text-[color:var(--accent)] sm:text-lg">
                For Organizations
              </span>
            </div>
          </motion.div>
          </MotionItem>

          <MotionItem>
          <SectionTitle
            title="Everything needed to build confidence"
            accentWord="and credibility"
            subtitle="Balanced structure + strong visuals, without changing your data."
          />
          </MotionItem>

          <MotionItem variant="scaleIn">
          <div className="relative mt-10">
            <div className="px-2 sm:px-4">
              <div className="flex flex-wrap justify-center gap-4">
                {BENEFITS.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} className="w-full max-w-[420px] md:w-[48%] lg:w-[31%]">
                      <motion.div
                        className="group relative h-full overflow-hidden rounded-[22px] border border-[color:var(--border)] bg-[color:var(--card)] transition-all duration-200 hover:border-[#C51F5D] hover:ring-2 hover:ring-[#C51F5D]/75"
                        style={{ boxShadow: "var(--shadow-md)" }}
                        whileHover={reduce ? undefined : { y: -8, scale: 1.01 }}
                        whileTap={reduce ? undefined : { scale: 0.99 }}
                        transition={SPRING}
                      >
                        {b.href ? <a href={b.href} className="absolute inset-0 z-10" aria-label={b.title} /> : null}
                        <div className="relative h-56 overflow-hidden">
                          <motion.img
                            src={b.img}
                            alt={b.title}
                            className="h-full w-full object-cover"
                            whileHover={reduce ? undefined : { scale: 1.06 }}
                            transition={{ duration: 0.7, ease: EASE_OUT }}
                          />
                          {isDark ? (
                            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,18,32,0.70)] via-[rgba(11,18,32,0.10)] to-transparent" />
                          ) : null}
                        </div>

                        <div className="flex h-[280px] flex-col p-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--chipBg)]">
                              <Icon size={18} className="text-[color:var(--text)]" />
                            </div>
                            <div className="text-base font-semibold text-[color:var(--text)]">
                              {b.title}
                            </div>
                          </div>

                          <div className="mt-3 flex-1 text-sm font-medium leading-relaxed text-[color:var(--muted)]">
                            {b.desc}
                          </div>

                          <div className="mt-5 flex gap-2">
                            <span
                              className="rounded-full px-4 py-2 text-xs font-semibold text-white"
                              style={{
                                background:
                                  "linear-gradient(135deg, rgba(197,31,93,1), rgba(165,22,78,1))",
                              }}
                            >
                              {b.tag1}
                            </span>
                            <span
                              className="rounded-full px-4 py-2 text-xs font-semibold"
                              style={{
                                background: isDark
                                  ? "rgba(255,255,255,0.10)"
                                  : "rgba(36,52,71,0.12)",
                                color: isDark
                                  ? "rgba(255,255,255,0.85)"
                                  : "rgba(36,52,71,0.70)",
                                border: `1px solid ${
                                  isDark
                                    ? "rgba(255,255,255,0.10)"
                                    : "rgba(15,23,42,0.10)"
                                }`,
                              }}
                            >
                              {b.tag2}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          </MotionItem>
          </MotionSection>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6" id="stories">
          <MotionSection>
          <MotionItem>
          <motion.div
            className="mb-6 flex justify-center"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
          >
            <div
              className="relative inline-flex items-center justify-center overflow-hidden rounded-full border px-7 py-3"
              style={{
                borderColor: isDark ? "rgba(255,255,255,0.18)" : "rgba(36,52,71,0.16)",
                background: isDark
                  ? "linear-gradient(135deg, rgba(20,29,38,0.86), rgba(36,52,71,0.82))"
                  : "linear-gradient(135deg, rgba(255,255,255,0.70), rgba(226,226,210,0.85))",
                boxShadow: isDark
                  ? "0 16px 46px rgba(0,0,0,0.30)"
                  : "0 16px 46px rgba(15,23,42,0.12)",
              }}
            >
              <motion.span
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 0%, rgba(197,31,93,0.10) 35%, rgba(197,31,93,0.20) 50%, rgba(36,52,71,0.10) 68%, transparent 100%)",
                }}
                animate={reduce ? undefined : { x: ["-55%", "55%"] }}
                transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative text-base font-extrabold tracking-[0.08em] uppercase text-[color:var(--accent)] sm:text-lg">
                Success Stories
              </span>
            </div>
          </motion.div>
          </MotionItem>

          <MotionItem>
          <Header
            title="Real stories from our interns and partners"
            subtitle="Outcomes that hiring teams can validate."
          />
          </MotionItem>
          <MotionItem variant="scaleIn">
          <SuccessStories items={SUCCESS_STORIES} />
          <ReviewForm theme={theme} />
          </MotionItem>
          </MotionSection>
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-16" id="experts">
          <MotionSection>
          <MotionItem>
          <motion.div
            className="mb-6 flex justify-center"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
          >
            <div
              className="relative inline-flex items-center justify-center overflow-hidden rounded-full border px-7 py-3"
              style={{
                borderColor: isDark ? "rgba(255,255,255,0.18)" : "rgba(36,52,71,0.16)",
                background: isDark
                  ? "linear-gradient(135deg, rgba(20,29,38,0.86), rgba(36,52,71,0.82))"
                  : "linear-gradient(135deg, rgba(255,255,255,0.70), rgba(226,226,210,0.85))",
                boxShadow: isDark
                  ? "0 16px 46px rgba(0,0,0,0.30)"
                  : "0 16px 46px rgba(15,23,42,0.12)",
              }}
            >
              <motion.span
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 0%, rgba(197,31,93,0.10) 35%, rgba(197,31,93,0.20) 50%, rgba(36,52,71,0.10) 68%, transparent 100%)",
                }}
                animate={reduce ? undefined : { x: ["-55%", "55%"] }}
                transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative text-base font-extrabold tracking-[0.08em] uppercase text-[color:var(--accent)] sm:text-lg">
                Our Experts
              </span>
            </div>
          </motion.div>
          </MotionItem>

          <MotionItem variant="scaleIn">
          <div className="relative mt-10">
            <button
              type="button"
              onClick={goExpertLeft}
              className="absolute left-1 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-2xl border border-[rgba(197,31,93,0.35)] bg-[linear-gradient(135deg,rgba(197,31,93,1),rgba(165,22,78,1))] shadow-[0_12px_26px_rgba(197,31,93,0.30)] transition-transform duration-150 sm:-left-5 sm:h-14 sm:w-14 sm:rounded-3xl sm:shadow-[0_16px_40px_rgba(197,31,93,0.34)] sm:hover:-translate-y-[52%] sm:hover:brightness-105 lg:-left-20"
              aria-label="Scroll experts left"
            >
              <ChevronLeft className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            </button>

            <button
              type="button"
              onClick={goExpertRight}
              className="absolute right-1 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-2xl border border-[rgba(197,31,93,0.35)] bg-[linear-gradient(135deg,rgba(197,31,93,1),rgba(165,22,78,1))] shadow-[0_12px_26px_rgba(197,31,93,0.30)] transition-transform duration-150 sm:-right-5 sm:h-14 sm:w-14 sm:rounded-3xl sm:shadow-[0_16px_40px_rgba(197,31,93,0.34)] sm:hover:-translate-y-[52%] sm:hover:brightness-105 lg:-right-20"
              aria-label="Scroll experts right"
            >
              <ChevronRight className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            </button>

            <div className="overflow-hidden px-2 sm:px-10">
              <motion.div
                className="flex"
                animate={{ x: `-${(expertIndex * 100) / expertVisible}%` }}
                transition={SPRING}
              >
                {EXPERTS.map((p) => (
                  <div key={p.name} className="shrink-0 px-2" style={{ flex: `0 0 ${100 / expertVisible}%` }}>
                    <ExpertCard person={p} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
          </MotionItem>
          </MotionSection>
        </section>

        {/* JOURNEY */}
        <section className="mx-auto max-w-6xl px-4 pt-16" id="journey">
          <MotionSection>
          <MotionItem>
          <SectionTitle
            title="A clear path from application"
            accentWord="to outcomes"
            subtitle="Simple steps. Strong guidance. Real artifacts."
          />
          </MotionItem>

          <MotionItem>
          <div className="mt-10 grid gap-6">
            {HOW_IT_WORKS.map((s, idx) => (
              <div
                key={s.title}
                className="relative overflow-hidden rounded-[26px] border border-[color:var(--journeyBorder)] bg-[color:var(--journeyBg)]"
                style={{ boxShadow: "var(--journeyShadow)" }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "var(--journeyGlow)" }}
                />

                <div className="relative grid items-center gap-6 p-6 md:p-7 md:grid-cols-[1fr_340px]">
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
                        style={{
                          background: "var(--journeyBadgeBg)",
                          color: "var(--journeyBadgeText)",
                          border: "1px solid var(--journeyBadgeBorder)",
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <div className="text-base font-semibold text-[color:var(--text)]">
                        {s.title}
                      </div>
                    </div>

                    <p className="mt-3 max-w-[55ch] text-sm font-medium leading-relaxed text-[color:var(--muted)]">
                      {s.desc}
                    </p>

                  </div>

                  <div
                    className="overflow-hidden rounded-[18px]"
                    style={{
                      border: "1px solid var(--journeyImgBorder)",
                      boxShadow: "var(--journeyImgShadow)",
                    }}
                  >
                    <img
                      src={[
                        "/apply.webp",
                        "/projects.png",
                        "/kkk.png",
                        "/lunch.png",
                      ][idx]}
                      alt={s.title}
                      className={[
                        "h-[170px] w-full md:h-[190px]",
                        idx === 2 ? "object-contain bg-white" : "object-cover",
                      ].join(" ")}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          </MotionItem>

          <MotionItem variant="scaleIn">
          <div className="mt-8 flex justify-center">
            <PrimaryBtn
              href="#contact"
              onClick={(e) => (e.preventDefault(), smoothScrollTo("contact"))}
              className="px-10 py-4 text-base"
            >
              Get started <ArrowRight size={18} />
            </PrimaryBtn>
          </div>
          </MotionItem>
          </MotionSection>
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-16" id="about">
          <MotionSection>
          <MotionItem variant="scaleIn">
          <GlassCard className="overflow-hidden p-8 md:p-10">
            <div className="grid gap-10 md:grid-cols-[1.1fr_.9fr] md:items-center">
              <div>
                <h2 className="text-3xl font-semibold text-[color:var(--text)] sm:text-4xl">
                  {ABOUT_COPY.title}
                </h2>

                <p className="mt-6 text-base font-medium leading-relaxed text-[color:var(--muted)]">
                  {ABOUT_COPY.p1}
                </p>
                <p className="mt-5 text-base font-medium leading-relaxed text-[color:var(--muted)]">
                  {ABOUT_COPY.p2}
                </p>
                <p className="mt-5 text-base font-medium leading-relaxed text-[color:var(--muted)]">
                  {ABOUT_COPY.p3}
                </p>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
                  <div>
                    <div
                      className="text-4xl font-semibold"
                      style={{ color: "var(--accent)" }}
                    >
                      500+
                    </div>
                    <div className="mt-2 text-sm font-semibold text-[color:var(--muted)]">
                      Active Projects
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-4xl font-semibold"
                      style={{ color: "var(--accent)" }}
                    >
                      50+
                    </div>
                    <div className="mt-2 text-sm font-semibold text-[color:var(--muted)]">
                      Partner Companies
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-4xl font-semibold"
                      style={{ color: "var(--accent)" }}
                    >
                      2000+
                    </div>
                    <div className="mt-2 text-sm font-semibold text-[color:var(--muted)]">
                      Successful Placements
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="overflow-hidden rounded-[26px] border border-[color:var(--border)]"
                style={{ boxShadow: "var(--shadow-md)" }}
              >
                <img
                  src={IMAGES.about}
                  alt="About Praktix"
                  className="h-[260px] w-full object-cover sm:h-[420px]"
                />
              </div>
            </div>
          </GlassCard>
          </MotionItem>
          </MotionSection>
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-16" id="contact">
          <MotionSection>
          <MotionItem variant="scaleIn">
          <div
            className="relative overflow-hidden rounded-[30px] border p-6 sm:p-10"
            style={{
              background: "var(--contactBg)",
              borderColor: "var(--contactBorder)",
              boxShadow: "var(--contactShadow)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "var(--contactGlow)" }}
            />

            {/* subtle grain inside contact */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
              style={{
                backgroundImage: `url("${PAPER_GRAIN_DATA_URI}")`,
                backgroundSize: "320px 320px",
              }}
            />

            <div className="relative max-w-3xl">
              <h2 className="text-3xl font-semibold text-[color:var(--text)] sm:text-4xl">
                Ready to Get Started
              </h2>

              <p className="mt-3 text-base font-medium leading-relaxed text-[color:var(--muted)]">
                Let's talk partnerships, programs, and how we can help
                your students or hiring pipeline.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(197,31,93,0.28)] hover:brightness-110"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
          </MotionItem>
          </MotionSection>
        </section>
      </main>
    </div>
  );
}













