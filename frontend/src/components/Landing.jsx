import React, { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const Motion = motion;
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Send,
  Star,
  Users,
  GraduationCap,
  Zap,
  Linkedin,
  X,
} from "lucide-react";

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

const HERO_VISUAL_MODE = "formation"; // "formation" | "core" | "grid"

/**
 * Paper grain (no extra assets):
 * Uses SVG feTurbulence for a natural paper-like grain.
 * Safe to keep inline, and you can tune opacity in the background layers.
 */
const PAPER_GRAIN_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E";

const IMAGES = {
  solution1: "/landing-students-graduates.png",
  solution2: "/landing-students-ai.png",
  solution3:
    "/landing-mentorship.png",
  solution4: "/life.jpg",
  solution5:
    "/landing-universities-companies.png",
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
    img: "/adas.jpg",
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
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=85",
  },
  {
    name: "Michael Chen",
    role: "Engineering Lead",
    org: "Cloud Platforms",
    focus: "System Design, Leadership",
    experience: "8+ years engineering",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1600&q=85",
  },
  {
    name: "Prof. Emma Williams",
    role: "Academic Director",
    org: "Global University",
    focus: "Curriculum, Industry Alignment",
    experience: "12+ years education",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1600&q=85",
  },
  {
    name: "Ahmed Al-Rashid",
    role: "Business Strategy",
    org: "GCC Ventures",
    focus: "Market Expansion, Partnerships",
    experience: "12+ years consulting",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=85",
  },
  {
    name: "Sofia Martinez",
    role: "Data Science Lead",
    org: "AI Labs Europe",
    focus: "Machine Learning, MLOps",
    experience: "9+ years in data and AI",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1600&q=85",
  },
  {
    name: "Daniel Foster",
    role: "Cybersecurity Architect",
    org: "SecureNet Group",
    focus: "Cloud Security, Risk",
    experience: "11+ years in security",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=85",
  },
  {
    name: "Noura Haddad",
    role: "UX Research Director",
    org: "DesignWorks",
    focus: "Product Research, UX Strategy",
    experience: "10+ years in product design",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=85",
  },
  {
    name: "Lucas Moretti",
    role: "Cloud Infrastructure Manager",
    org: "Nimbus Systems",
    focus: "DevOps, Platform Engineering",
    experience: "8+ years in cloud operations",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=1600&q=85",
  },
  {
    name: "Priya Raman",
    role: "Digital Transformation Consultant",
    org: "FutureScale Advisory",
    focus: "Innovation Programs, Change",
    experience: "13+ years in transformation",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1600&q=85",
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

const UNIVERSITY_LOGOS = [
  { key: "uni1", alt: "University 1", src: "/logos/uni1.png", sizeClass: "h-10 sm:h-12", boxClass: "w-[220px]", scale: 1 },
  { key: "uni2", alt: "University 2", src: "/logos/uni2.png", sizeClass: "h-10 sm:h-12", boxClass: "w-[220px]", scale: 1 },
  { key: "uni3", alt: "University 3", src: "/logos/uni3.png", sizeClass: "h-10 sm:h-12", boxClass: "w-[220px]", scale: 1 },
  { key: "uni4", alt: "University 4", src: "/logos/uni4.png", sizeClass: "h-10 sm:h-12", boxClass: "w-[220px]", scale: 1 },
  { key: "uni5", alt: "University 5", src: "/logos/uni5.png", sizeClass: "h-10 sm:h-12", boxClass: "w-[220px]", scale: 1 },
  { key: "uni7", alt: "University 7", src: "/logos/uni7.jpg", sizeClass: "h-10 sm:h-12", boxClass: "w-[220px]", scale: 1 },
  { key: "uni8", alt: "University 8", src: "/logos/uni8.png", sizeClass: "h-10 sm:h-12", boxClass: "w-[220px]", scale: 1 },
  { key: "uni9", alt: "University 9", src: "/logos/uni9.png", sizeClass: "h-10 sm:h-12", boxClass: "w-[220px]", scale: 1 },
  { key: "uni10", alt: "University 10", src: "/logos/uni10.png", sizeClass: "h-10 sm:h-12", boxClass: "w-[220px]", scale: 1 },
  { key: "uni11", alt: "University 11", src: "/logos/uni11.png", sizeClass: "h-10 sm:h-12", boxClass: "w-[220px]", scale: 1 },
  { key: "uni12", alt: "University 12", src: "/logos/uni12.png", sizeClass: "h-10 sm:h-12", boxClass: "w-[220px]", scale: 1 },
  { key: "uni13", alt: "University 13", src: "/logos/uni13.webp", sizeClass: "h-10 sm:h-12", boxClass: "w-[220px]", scale: 1 },
  { key: "uni14", alt: "University 14", src: "/logos/uni14.jpg", sizeClass: "h-10 sm:h-12", boxClass: "w-[220px]", scale: 1 },
  { key: "uni15", alt: "University 15", src: "/logos/uni15.png", sizeClass: "h-10 sm:h-12", boxClass: "w-[220px]", scale: 1 },
];

/* -----------------------------------------------------------
   HELPERS
----------------------------------------------------------- */

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
    <div className="group/stories mt-10 overflow-hidden" dir="ltr">
      <style>{`
        @keyframes stories_strip_move {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .stories-strip-track {
          animation: stories_strip_move 34s linear infinite;
          will-change: transform;
        }
        .group\\/stories:hover .stories-strip-track {
          animation-play-state: paused;
        }
      `}</style>
      <div
        className={[
          "flex w-max gap-5 pr-5",
          reduce ? "" : "stories-strip-track",
        ].join(" ")}
      >
        {railItems.map((story, idx) => renderCard(story, idx))}
      </div>
    </div>
  );
}

function LearningHeroLikeRef({
  reduce,
  rotatingWords,
  rotatingWordIndex,
  pulseKey,
  heroVisualY,
  heroVisualScale,
  heroVisualOpacity,
}) {
  const primarySolution = SOLUTIONS[0] || {};

  return (
    <div className="relative overflow-hidden rounded-[34px]" style={{ boxShadow: "var(--shadow-lg)" }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 18% 25%, rgba(255,46,147,0.14), transparent 62%)," +
            "radial-gradient(1100px 800px at 78% 30%, rgba(0,230,167,0.14), transparent 58%)," +
            "linear-gradient(135deg, #0b0f1f 0%, #111827 100%)",
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

        <div className="relative mx-auto w-full max-w-[560px]">
          <HeroEcosystem
            mode={HERO_VISUAL_MODE}
            y={heroVisualY}
            scale={heroVisualScale}
            opacity={heroVisualOpacity}
            pulseKey={pulseKey}
            reduce={reduce}
          />
        </div>
      </div>
    </div>
  );
}

function ReviewForm() {
  const reduce = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);

  const onSubmit = (e) => {
    e.preventDefault();
    setName("");
    setRole("");
    setQuote("");
    setRating(5);
    setIsOpen(false);
  };

  return (
    <div className="mt-10 flex flex-col items-center">
      <motion.button
        type="button"
        whileHover={reduce ? undefined : { y: -2 }}
        whileTap={reduce ? undefined : { scale: 0.98 }}
        transition={SPRING}
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-base font-extrabold text-white"
        style={{
          background: "linear-gradient(135deg, rgba(197,31,93,1), rgba(165,22,78,1))",
          boxShadow: "0 18px 45px rgba(197,31,93,0.28)",
        }}
      >
        Submit a Review <Send size={16} />
      </motion.button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="mt-6 w-full max-w-5xl"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div
              className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[28px] bg-[#F3F4F6] ring-1 ring-[#0B1220]/10"
              style={{ boxShadow: "0 22px 80px rgba(0,0,0,0.18)" }}
            >
              <div className="flex items-center justify-between border-b border-[#0B1220]/10 px-5 py-4 sm:px-8">
                <div>
                  <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
                    REVIEW FLOW
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-[#0B1220]">Submit a Review</div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-[#0B1220]/10 transition hover:bg-[#E5E7EB]"
                  aria-label="Close review form"
                >
                  <X size={26} className="text-[#0B1220]" />
                </button>
              </div>

              <div className="p-5 sm:p-8">
                <div className="rounded-[22px] bg-white p-5 ring-1 ring-[#0B1220]/10 sm:p-6">
                  <form onSubmit={onSubmit} className="grid gap-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="grid gap-2">
                        <span className="text-xs font-extrabold tracking-wide text-[#0B1220]/65">Your name</span>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-2xl bg-white/60 px-4 py-3 text-sm text-[#0B1220] outline-none ring-1 ring-[#0B1220]/10 transition hover:ring-[#0B1220]/20 focus:ring-2 focus:ring-[rgba(197,31,93,0.28)]"
                          placeholder="Name"
                        />
                      </label>

                      <label className="grid gap-2">
                        <span className="text-xs font-extrabold tracking-wide text-[#0B1220]/65">Role / relationship</span>
                        <input
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full rounded-2xl bg-white/60 px-4 py-3 text-sm text-[#0B1220] outline-none ring-1 ring-[#0B1220]/10 transition hover:ring-[#0B1220]/20 focus:ring-2 focus:ring-[rgba(197,31,93,0.28)]"
                          placeholder="e.g., Program Participant"
                        />
                      </label>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/60 px-4 py-3 ring-1 ring-[#0B1220]/10">
                      <div className="text-xs font-extrabold text-[#0B1220]/65">Rating</div>
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
                      <span className="text-xs font-extrabold tracking-wide text-[#0B1220]/65">Your feedback</span>
                      <textarea
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        rows={4}
                        className="w-full resize-none rounded-2xl bg-white/60 px-4 py-3 text-sm text-[#0B1220] outline-none ring-1 ring-[#0B1220]/10 transition hover:ring-[#0B1220]/20 focus:ring-2 focus:ring-[rgba(197,31,93,0.28)]"
                        placeholder="Write your review..."
                      />
                    </label>

                    <div className="flex justify-end">
                      <motion.button
                        type="submit"
                        whileHover={reduce ? undefined : { y: -2 }}
                        whileTap={reduce ? undefined : { scale: 0.98 }}
                        transition={SPRING}
                        className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3 text-base font-extrabold text-white"
                        style={{
                          background: "linear-gradient(135deg, rgba(197,31,93,1), rgba(165,22,78,1))",
                          boxShadow: "0 18px 45px rgba(197,31,93,0.28)",
                        }}
                      >
                        Submit <Send size={16} />
                      </motion.button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
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
        "rgba(255,46,147,0.92)",
        "rgba(0,230,167,0.90)",
        "rgba(59,130,246,0.58)",
        "rgba(255,255,255,0.85)",
      ];
      const cols = mobile ? 4 : 6;
      const rows = Math.max(3, Math.ceil(count / cols));
      const xStep = w / (cols + 1);
      const yStep = h / (rows + 1);
      nodesRef.current = Array.from({ length: count }, (_, idx) => ({
        rx: Math.random() * w,
        ry: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.11,
        vy: (Math.random() - 0.5) * 0.11,
        tx:
          ((idx % cols) + 1) * xStep + (Math.random() - 0.5) * (mobile ? 16 : 22),
        ty:
          (Math.floor(idx / cols) + 1) * yStep + (Math.random() - 0.5) * (mobile ? 14 : 20),
        r: 1.2 + Math.random() * 2.4,
        color: palette[idx % palette.length],
        pulseOffset: Math.random() * Math.PI * 2,
        core: idx % Math.max(6, Math.floor(count / 4)) === 0,
        depth: Math.random(),
        pulseUntil: 0,
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
      const mobile = window.innerWidth < 768;
      const maxDist = mobile ? 92 : 128;
      const cycle = 15000;
      const t = ts % cycle;
      const formation = t <= 9000 ? t / 9000 : Math.max(0, 1 - (t - 9000) / 6000);
      const phase = ((ts % cycle) / cycle) * Math.PI * 2;
      const driftX = Math.sin(ts * 0.0002) * 6;
      const driftY = Math.cos(ts * 0.00017) * 4;

      ctx.save();
      ctx.translate(driftX, driftY);

      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];
        n.rx += n.vx;
        n.ry += n.vy;

        if (n.rx < -20 || n.rx > w + 20) n.vx *= -1;
        if (n.ry < -20 || n.ry > h + 20) n.vy *= -1;
        n.rx = Math.max(-20, Math.min(w + 20, n.rx));
        n.ry = Math.max(-20, Math.min(h + 20, n.ry));
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const ax = a.rx + (a.tx - a.rx) * formation;
          const ay = a.ry + (a.ty - a.ry) * formation;
          const bx = b.rx + (b.tx - b.rx) * formation;
          const by = b.ry + (b.ty - b.ry) * formation;
          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.hypot(dx, dy);
          if (dist > maxDist) continue;
          const alpha = (1 - dist / maxDist) * (0.12 + 0.48 * formation);
          const lineMix = Math.sin((i + j + phase) * 0.3) > 0 ? "255,46,147" : "0,230,167";
          ctx.strokeStyle = `rgba(${lineMix}, ${alpha})`;
          ctx.lineWidth = formation > 0.6 ? 1 : 0.8;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];
        const pulse = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(phase + n.pulseOffset));
        const boost = n.pulseUntil > ts ? (n.pulseUntil - ts) / 500 : 0;
        const px = n.rx + (n.tx - n.rx) * formation;
        const py = n.ry + (n.ty - n.ry) * formation;
        const radius = n.r + pulse * 0.8 + boost * 2.0;
        const blur =
          mobile
            ? 0
            : n.depth < 0.33
              ? 5
              : n.depth < 0.66
                ? 1
                : 0;
        const alphaBase = n.depth > 0.66 ? 0.62 : 0.9;
        const glow = n.core ? 14 : 8;
        ctx.globalAlpha = alphaBase;
        ctx.shadowBlur = glow + blur + boost * 20;
        ctx.shadowColor = n.color;
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
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
    const nodes = nodesRef.current.filter((n) => n.core);
    const flashes = Math.min(3, nodes.length);
    for (let i = 0; i < flashes; i += 1) {
      const idx = Math.floor(Math.random() * nodes.length);
      nodes[idx].pulseUntil = performance.now() + 500;
    }
  }, [pulseKey, reduce, staticMode]);

  if (staticMode || reduce) {
    return (
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(11,15,31,0.72), rgba(17,24,39,0.72)), url('/adas.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    );
  }

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full rounded-full" aria-hidden="true" />;
}

function DigitalCoreCanvas({ pulseKey, reduce }) {
  const canvasRef = React.useRef(null);
  const frameRef = React.useRef(0);
  const dustRef = React.useRef([]);
  const sizeRef = React.useRef({ w: 0, h: 0 });
  const pulseUntilRef = React.useRef(0);

  React.useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fit = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w: rect.width, h: rect.height };
      const dustCount = window.innerWidth < 768 ? 22 : 42;
      dustRef.current = Array.from({ length: dustCount }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        a: 0.08 + Math.random() * 0.16,
        r: 0.6 + Math.random() * 1.4,
      }));
    };

    const drawRing = (cx, cy, r, rot, color, width, alpha) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.strokeStyle = `rgba(${color}, ${alpha})`;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };

    const draw = (ts) => {
      const { w, h } = sizeRef.current;
      const mobile = window.innerWidth < 768;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const base = Math.min(w, h) * 0.28;
      const pulseBoost = pulseUntilRef.current > ts ? (pulseUntilRef.current - ts) / 500 : 0;
      const glowPulse = 0.16 + 0.08 * Math.sin((ts / 6000) * Math.PI * 2) + pulseBoost * 0.08;
      const breath = 1 + 0.01 * Math.sin((ts / 9000) * Math.PI * 2);
      const rotOuter = mobile ? 0 : (ts / 20000) * Math.PI * 2;
      const rotInner = mobile ? 0 : -(ts / 28000) * Math.PI * 2;

      ctx.clearRect(0, 0, w, h);

      dustRef.current.forEach((d) => {
        ctx.globalAlpha = d.a;
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      drawRing(cx, cy, base * 1.34 * breath, rotOuter, "255,46,147", 1.6, 0.35 + glowPulse * 0.25);
      drawRing(cx, cy, base * 1.05 * breath, rotInner, "0,230,167", 1.2, 0.28 + glowPulse * 0.3);

      ctx.save();
      ctx.translate(cx, cy);
      if (!mobile) ctx.rotate(rotInner * 0.55);
      ctx.strokeStyle = "rgba(42,47,69,0.72)";
      ctx.lineWidth = 1;
      const mesh = Math.max(4, Math.floor(base / 16));
      for (let i = -mesh; i <= mesh; i += 1) {
        const p = (i / mesh) * base * 0.86;
        ctx.beginPath();
        ctx.moveTo(-base * 0.86, p);
        ctx.lineTo(base * 0.86, p);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p, -base * 0.86);
        ctx.lineTo(p, base * 0.86);
        ctx.stroke();
      }
      ctx.restore();

      const orbitCount = mobile ? 4 : 7;
      for (let i = 0; i < orbitCount; i += 1) {
        const a = (i / orbitCount) * Math.PI * 2 + (mobile ? 0 : ts * 0.00025);
        const rr = base * (0.9 + (i % 3) * 0.18);
        const x = cx + Math.cos(a) * rr;
        const y = cy + Math.sin(a) * rr * 0.66;
        const color = i % 2 === 0 ? "rgba(255,46,147,0.85)" : "rgba(0,230,167,0.85)";
        ctx.shadowBlur = 10 + pulseBoost * 10;
        ctx.shadowColor = color;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, mobile ? 2.1 : 2.6, 0, Math.PI * 2);
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
  }, [reduce]);

  React.useEffect(() => {
    pulseUntilRef.current = performance.now() + 500;
  }, [pulseKey]);

  if (reduce) {
    return (
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(11,15,31,0.72), rgba(17,24,39,0.72)), url('/adas.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    );
  }

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full rounded-full" aria-hidden="true" />;
}

function StructuredGridCanvas({ pulseKey, reduce }) {
  const canvasRef = React.useRef(null);
  const frameRef = React.useRef(0);
  const waveRef = React.useRef(0);
  const sizeRef = React.useRef({ w: 0, h: 0 });

  React.useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fit = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w: rect.width, h: rect.height };
    };

    const draw = (ts) => {
      const { w, h } = sizeRef.current;
      const mobile = window.innerWidth < 768;
      ctx.clearRect(0, 0, w, h);

      const rows = mobile ? 12 : 18;
      const cols = mobile ? 14 : 24;
      const horizon = h * 0.28;
      const waveT = ((ts - waveRef.current) % 10000) / 10000;
      const activeBand = waveT * (rows + 6) - 3;

      for (let r = 0; r <= rows; r += 1) {
        const t = r / rows;
        const y = horizon + (t * t) * (h - horizon);
        const lineAlpha = 0.16 * (1 - t * 0.55);
        ctx.strokeStyle = `rgba(46,58,89,${lineAlpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      for (let c = 0; c <= cols; c += 1) {
        const tc = c / cols;
        const topX = w * (0.2 + tc * 0.6);
        const bottomX = tc * w;
        ctx.strokeStyle = "rgba(46,58,89,0.14)";
        ctx.beginPath();
        ctx.moveTo(topX, horizon);
        ctx.lineTo(bottomX, h);
        ctx.stroke();
      }

      for (let r = 2; r < rows; r += 1) {
        const t = r / rows;
        const y = horizon + (t * t) * (h - horizon);
        const xSpread = w * (0.1 + t * 0.45);
        const center = w * 0.56;
        const active =
          Math.abs(r - (rows * 0.52 + Math.sin(ts * 0.00035) * 0.8)) < 1.2 ||
          (!mobile && Math.abs(r - activeBand) < 0.85);
        const glowColor = active
          ? (r % 2 === 0 ? "rgba(255,46,147,0.55)" : "rgba(0,230,167,0.55)")
          : "rgba(255,255,255,0.10)";
        for (let c = -4; c <= 4; c += 1) {
          const x = center + (c / 4) * xSpread;
          ctx.fillStyle = glowColor;
          ctx.beginPath();
          ctx.arc(x, y, active ? 1.8 : 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      frameRef.current = window.requestAnimationFrame(draw);
    };

    fit();
    waveRef.current = performance.now();
    frameRef.current = window.requestAnimationFrame(draw);
    window.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [reduce]);

  React.useEffect(() => {
    waveRef.current = performance.now();
  }, [pulseKey]);

  if (reduce) {
    return (
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(11,15,31,0.72), rgba(17,24,39,0.72)), url('/adas.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    );
  }

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full rounded-full" aria-hidden="true" />;
}

function HeroEcosystem({ mode, y, scale, opacity, pulseKey, reduce }) {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.div style={{ y, scale, opacity }} className="relative mx-auto w-full max-w-[460px] sm:max-w-[560px]">
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
          {mode === "core" ? (
            <DigitalCoreCanvas pulseKey={pulseKey} reduce={reduce} />
          ) : mode === "grid" ? (
            <StructuredGridCanvas pulseKey={pulseKey} reduce={reduce} />
          ) : (
            <EcosystemCanvas pulseKey={pulseKey} reduce={reduce} />
          )}
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

function LogoStrip() {
  const companyRow = [LOGOS[0], LOGOS[1], LOGOS[2], LOGOS[3], LOGOS[4], LOGOS[5], LOGOS[6], LOGOS[7], LOGOS[8]];
  const universityRow = UNIVERSITY_LOGOS.length ? UNIVERSITY_LOGOS : companyRow;

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
          animation-duration: 36s;
        }
      `}</style>

      {/* Optional: a soft band behind logos (helps match screenshot) */}
      <div
        className="mx-auto w-full max-w-4xl rounded-2xl px-6 py-5"
        style={{
          background: "rgba(255,255,255,0.14)",
          border: "1px solid rgba(15,23,42,0.06)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="space-y-3">
          <div
            className="relative w-full overflow-hidden"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="logo-strip-track gap-x-10 gap-y-3">
              {[...companyRow, ...companyRow].map((logo, i) => (
                <div
                  key={`${logo.key}-company-${i}`}
                  className={`flex h-12 ${logo.boxClass || "w-[120px]"} items-center justify-center overflow-hidden px-1 py-1`}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`${logo.sizeClass} w-auto object-contain`}
                    style={{
                      filter: "none",
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

          <div
            className="relative w-full overflow-hidden"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="logo-strip-track reverse gap-x-10 gap-y-3">
              {[...universityRow, ...universityRow, ...universityRow].map((logo, i) => (
                <div
                  key={`${logo.key}-uni-${i}`}
                  className={`flex h-12 ${logo.boxClass || "w-[140px]"} items-center justify-center overflow-hidden px-1 py-1`}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`${logo.sizeClass || "h-8 sm:h-9"} w-auto object-contain`}
                    style={{
                      filter: "none",
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
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   CARDS
----------------------------------------------------------- */

function PillarCard({ item }) {
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
              background: "var(--chipBg)",
              color: "var(--chipText)",
              border: "1px solid var(--border)",
            }}
          >
            {item.tag2}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function PlacementBanner() {
  return (
    <div
      className="mt-9 overflow-hidden rounded-[22px] border border-black/10"
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
  const rotatingWords = ["outcomes", "projects", "experience"];
  const [rotatingWordIndex, setRotatingWordIndex] = useState(0);
  const [pulseKey, setPulseKey] = useState(0);
  const [expertIndex, setExpertIndex] = useState(0);
  const [expertVisible, setExpertVisible] = useState(4);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 22,
    mass: 0.7,
  });
  const heroVisualY = useTransform(scrollYProgress, [0, 0.24], [0, 8]);
  const heroVisualScale = useTransform(scrollYProgress, [0, 0.24], [1, 0.96]);
  const heroVisualOpacity = useTransform(scrollYProgress, [0, 0.24], [1, 0.9]);

  React.useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setRotatingWordIndex((prev) => (prev + 1) % rotatingWords.length);
      setPulseKey((prev) => prev + 1);
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

  const SUCCESS_STORIES = useMemo(
    () => [
      {
        quote:
          "The projects felt real, the feedback was sharp, and the outcomes were measurable.",
        name: "Alex Morgan",
        role: "Program Participant  Technology Track",
        avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=85",
        photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=1400&q=85",
      },
      {
        quote:
          "Mentor reviews helped me improve faster and present stronger work in interviews.",
        name: "Omar Nasser",
        role: "Software Engineering Intern",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
      },
      {
        quote:
          "The structure made it easy to track progress from learning to portfolio output.",
        name: "Maya Collins",
        role: "Program Coordinator",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=85",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=85",
      },
      {
        quote:
          "We hired candidates directly from project cohorts because proof of work was clear.",
        name: "Jonas Becker",
        role: "Hiring Manager",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=85",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=85",
      },
      {
        quote:
          "The program connected academic concepts to practical team delivery in weeks.",
        name: "Sara El-Khatib",
        role: "Data Analyst Trainee",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=85",
        photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=85",
      },
      {
        quote:
          "Our institution saw better engagement once real projects became the center of learning.",
        name: "Henry Walsh",
        role: "University Partner Lead",
        avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=900&q=85",
        photo: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=900&q=85",
      },
      {
        quote:
          "I moved from theory-only learning to a portfolio that actually opened job interviews.",
        name: "Lina Petrova",
        role: "Graduate Participant",
        avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=85",
        photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=85",
      },
      {
        quote:
          "The mentorship quality and weekly feedback loops were the strongest part for our teams.",
        name: "Khaled Rahman",
        role: "Program Supervisor",
        avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=900&q=85",
        photo: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=900&q=85",
      },
      {
        quote:
          "The outcomes were measurable, repeatable, and aligned with what employers ask for.",
        name: "Noah Smith",
        role: "Talent Development Manager",
        avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=85",
        photo: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=85",
      },
    ],
    []
  );

  const sandSectionVars = {
    ["--text"]: "rgba(20,30,44,0.92)",
    ["--muted"]: "rgba(20,30,44,0.58)",
    ["--card"]: "rgba(255,255,255,0.58)",
    ["--border"]: "rgba(15,23,42,0.10)",
    ["--chipBg"]: "rgba(255,255,255,0.50)",
    ["--chipText"]: "rgba(36,52,71,0.62)",
    ["--shadow-lg"]: "0 30px 120px rgba(15,23,42,0.14)",
    ["--shadow-md"]: "0 18px 70px rgba(15,23,42,0.10)",
    ["--journeyBg"]: "rgba(255,255,255,0.56)",
    ["--journeyBorder"]: "rgba(15,23,42,0.08)",
    ["--journeyShadow"]: "0 18px 70px rgba(15,23,42,0.10)",
    ["--journeyGlow"]: "radial-gradient(900px 260px at 20% 20%, rgba(36,52,71,0.08), transparent 60%)",
    ["--journeyBadgeBg"]: "rgba(255,255,255,0.62)",
    ["--journeyBadgeBorder"]: "rgba(36,52,71,0.18)",
    ["--journeyBadgeText"]: "rgba(36,52,71,0.70)",
    ["--journeyImgBorder"]: "rgba(15,23,42,0.08)",
    ["--journeyImgShadow"]: "0 18px 60px rgba(15,23,42,0.10)",
    ["--contactBg"]: "rgba(255,255,255,0.58)",
    ["--contactBorder"]: "rgba(15,23,42,0.08)",
    ["--contactShadow"]: "0 20px 90px rgba(15,23,42,0.14)",
    ["--contactGlow"]: "radial-gradient(900px 260px at 20% 20%, rgba(36,52,71,0.08), transparent 60%)",
  };

  const darkSectionVars = {
    ["--text"]: "rgba(255,255,255,0.92)",
    ["--muted"]: "rgba(255,255,255,0.68)",
    ["--card"]: "rgba(255,255,255,0.08)",
    ["--border"]: "rgba(255,255,255,0.12)",
    ["--chipBg"]: "rgba(255,255,255,0.10)",
    ["--chipText"]: "rgba(255,255,255,0.78)",
    ["--shadow-lg"]: "0 28px 110px rgba(0,0,0,0.42)",
    ["--shadow-md"]: "0 18px 70px rgba(0,0,0,0.28)",
    ["--journeyBg"]: "rgba(255,255,255,0.08)",
    ["--journeyBorder"]: "rgba(255,255,255,0.12)",
    ["--journeyShadow"]: "0 18px 70px rgba(0,0,0,0.30)",
    ["--journeyGlow"]: "radial-gradient(900px 260px at 20% 20%, rgba(197,31,93,0.10), transparent 60%)",
    ["--journeyBadgeBg"]: "rgba(255,255,255,0.10)",
    ["--journeyBadgeBorder"]: "rgba(255,255,255,0.14)",
    ["--journeyBadgeText"]: "rgba(255,255,255,0.82)",
    ["--journeyImgBorder"]: "rgba(255,255,255,0.14)",
    ["--journeyImgShadow"]: "0 18px 60px rgba(0,0,0,0.35)",
    ["--contactBg"]: "rgba(255,255,255,0.08)",
    ["--contactBorder"]: "rgba(255,255,255,0.12)",
    ["--contactShadow"]: "0 22px 90px rgba(0,0,0,0.40)",
    ["--contactGlow"]: "radial-gradient(900px 260px at 20% 20%, rgba(197,31,93,0.12), transparent 60%)",
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        ["--accent"]: COLORS.accent,
      }}
    >
      {/* TOKENS */}
      <style>{`
        :root{
          --bg: ${COLORS.paper};
          --text: rgba(20,30,44,0.92);
          --muted: rgba(20,30,44,0.58);
          --card: rgba(255,255,255,0.58);
          --border: rgba(15,23,42,0.10);
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
      `}</style>

      {/* BACKGROUND (students style: sand content area) */}
      <div className="fixed inset-0 -z-20" style={{ background: "var(--bg)" }} />
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(1200px_800px_at_18%_10%,rgba(197,31,93,0.05),transparent_62%)]" />
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(1000px_700px_at_82%_16%,rgba(36,52,71,0.05),transparent_62%)]" />
      <div
        className="fixed inset-0 -z-10 opacity-[0.18] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("${PAPER_GRAIN_DATA_URI}")`,
          backgroundSize: "280px 280px",
        }}
      />

      {/* TOP PROGRESS */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[80] h-[3px] w-full origin-left"
        style={{ scaleX: progress, background: "var(--accent)" }}
      />

      <main className="overflow-x-clip pb-16">
        {/* HERO */}
        <section className="relative pt-2 pb-10">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,11,31,0.98),rgba(7,26,62,0.96)_55%,rgba(11,18,32,1))]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_800px_at_18%_10%,rgba(197,31,93,0.18),transparent_62%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(1000px_700px_at_82%_16%,rgba(36,52,71,0.22),transparent_62%)]" />
          <div className="mx-auto max-w-6xl px-4">
            <LearningHeroLikeRef
              reduce={reduce}
              rotatingWords={rotatingWords}
              rotatingWordIndex={rotatingWordIndex}
              pulseKey={pulseKey}
              heroVisualY={heroVisualY}
              heroVisualScale={heroVisualScale}
              heroVisualOpacity={heroVisualOpacity}
            />
          </div>
        </section>

        {/* METHOD / STATS */}
        <section className="relative pt-14 pb-14" id="method" style={sandSectionVars}>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(233,231,223,1),rgba(233,231,223,0.96))]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_600px_at_20%_20%,rgba(197,31,93,0.06),transparent_60%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(1000px_700px_at_84%_20%,rgba(36,52,71,0.08),transparent_65%)]" />
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] mix-blend-multiply"
            style={{ backgroundImage: `url("${PAPER_GRAIN_DATA_URI}")`, backgroundSize: "280px 280px" }}
          />
          <div className="mx-auto max-w-6xl px-4">
            <MotionSection>
          <MotionItem>
          <SectionTitle
           title="A system built for"
            accentWord="real outcomes"
            subtitle="Three pillars that turn learning into proof of work."
          />
          </MotionItem>

          <MotionItem variant="scaleIn">
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
              <StatTile variant="pink" value="280+" label="Active Projects" />
              <StatTile variant="navy" value="28+" label="Partner Companies" />
              <StatTile
                variant="ivory"
                value="2000+"
                label="Successful Placements"
              />
            </div>
            <LogoStrip />
          </div>
          </MotionItem>

          <MotionItem>
          <motion.div
            className="mb-6 mt-8 flex justify-center"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
          >
            <div
              className="relative inline-flex items-center justify-center overflow-hidden rounded-full border px-7 py-3"
              style={{
                borderColor: "rgba(36,52,71,0.16)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.70), rgba(226,226,210,0.85))",
                boxShadow: "0 16px 46px rgba(15,23,42,0.12)",
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
                For Individuals
              </span>
            </div>
          </motion.div>

          <div className="mt-5 flex flex-wrap justify-center gap-5">
            {SOLUTIONS.map((s) => (
              <div key={s.title} className="w-full max-w-[420px] md:w-[48%] lg:w-[31%]">
                <PillarCard item={s} />
              </div>
            ))}
          </div>
          </MotionItem>

          <MotionItem variant="scaleIn">
          <PlacementBanner />
          </MotionItem>
          </MotionSection>
          </div>
        </section>

        {/* TOOLS */}
        <section className="relative pt-20 pb-16 sm:pb-20" id="tools" style={darkSectionVars}>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,11,31,1),rgba(7,26,62,0.98)_60%,rgba(11,18,32,1))]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_600px_at_18%_20%,rgba(197,31,93,0.14),transparent_60%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(1000px_700px_at_85%_25%,rgba(36,52,71,0.18),transparent_65%)]" />
          <div className="mx-auto max-w-6xl px-4">
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
                borderColor: "rgba(36,52,71,0.16)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.70), rgba(226,226,210,0.85))",
                boxShadow: "0 16px 46px rgba(15,23,42,0.12)",
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
                                background: "var(--chipBg)",
                                color: "var(--chipText)",
                                border: "1px solid var(--border)",
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
          </div>
        </section>

        <section className="relative py-12" id="stories" style={sandSectionVars}>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(233,231,223,1),rgba(233,231,223,0.96))]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
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
                borderColor: "rgba(36,52,71,0.16)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.70), rgba(226,226,210,0.85))",
                boxShadow: "0 16px 46px rgba(15,23,42,0.12)",
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
          <ReviewForm />
          </MotionItem>
          </MotionSection>
          </div>
        </section>

        <section className="relative pt-16 pb-16 sm:pb-20" id="experts" style={darkSectionVars}>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,11,31,1),rgba(7,26,62,0.98)_60%,rgba(11,18,32,1))]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_600px_at_18%_20%,rgba(197,31,93,0.14),transparent_60%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(1000px_700px_at_85%_25%,rgba(36,52,71,0.18),transparent_65%)]" />
          <div className="mx-auto max-w-6xl px-4">
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
                borderColor: "rgba(36,52,71,0.16)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.70), rgba(226,226,210,0.85))",
                boxShadow: "0 16px 46px rgba(15,23,42,0.12)",
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
          </div>
        </section>

        {/* JOURNEY */}
        <section className="relative pt-20 pb-16 sm:pb-20" id="journey" style={sandSectionVars}>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(233,231,223,1),rgba(233,231,223,0.96))]" />
          <div className="mx-auto max-w-6xl px-4">
          <MotionSection>
          <MotionItem>
          <SectionTitle
            title="A clear path from application"
            accentWord="to outcomes"
            subtitle="Simple steps. Strong guidance. Real artifacts."
          />
          </MotionItem>

          <MotionItem>
          <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-2">
            {HOW_IT_WORKS.map((s, idx) => (
              <div
                key={s.title}
                className="relative h-full overflow-hidden rounded-[26px] border border-[color:var(--journeyBorder)] bg-[color:var(--journeyBg)]"
                style={{ boxShadow: "var(--journeyShadow)" }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "var(--journeyGlow)" }}
                />

                <div className="relative grid items-center gap-6 p-6 md:p-7 lg:grid-cols-[1fr_240px]">
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
                        "h-[170px] w-full md:h-[180px]",
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
          </MotionSection>
          </div>
        </section>

        <section className="relative pt-16 pb-16 sm:pb-20" id="about" style={darkSectionVars}>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,11,31,1),rgba(7,26,62,0.98)_60%,rgba(11,18,32,1))]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_600px_at_18%_20%,rgba(197,31,93,0.14),transparent_60%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(1000px_700px_at_85%_25%,rgba(36,52,71,0.18),transparent_65%)]" />
          <div className="mx-auto max-w-6xl px-4">
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
          </div>
        </section>

        <section className="relative pt-16" id="contact" style={sandSectionVars}>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(233,231,223,1),rgba(233,231,223,0.96))]" />
          <div className="mx-auto max-w-6xl px-4">
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

            <div className="relative mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-semibold text-[color:var(--text)] sm:text-4xl">
                Ready to Get Started
              </h2>

              <p className="mt-3 text-base font-medium leading-relaxed text-[color:var(--muted)] sm:text-lg">
                Let's talk partnerships, programs, and how we can help
                your students or hiring pipeline.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="mailto:info@praktix.hopn.eu?subject=Contact%20Us"
                  className="inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(197,31,93,0.28)] hover:brightness-110"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
          </MotionItem>
          </MotionSection>
          </div>
        </section>
      </main>
    </div>
  );
}













