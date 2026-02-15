import React, { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,


  Sparkles,
  Users,
  GraduationCap,
  Zap,
  Handshake,
  LineChart,
  Trophy,
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
  heroBg:
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2400&q=80",
  heroPortrait:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80",
  solution1:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  solution2:
    "/skill.webp",
  solution3:
    "/mentor.jpg",
  solution4:
   "career.png",
  solution5:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
  about:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80",
};

const SOLUTIONS = [
  {
    title: "Real-World Projects",
    desc: "Work on industry-driven challenges guided by professionals.",
    img: IMAGES.solution1,
    tag1: "Outcome-based",
    tag2: "Hiring-ready",
  },
  {
    title: "Expert-Led Training",
    desc: "Learn directly from industry experts and academic leaders.",
    img: IMAGES.solution2,
    tag1: "Hands-on",
    tag2: "Current stack",
  },
  {
    title: "Career Mentorship",
    desc: "1-to-1 and group mentoring aligned with real career paths.",
    img: IMAGES.solution3,
    tag1: "1:1 feedback",
    tag2: "Portfolio polish",
  },
];

const BENEFITS = [
  {
    icon: Users,
    title: "Professional Network",
    desc: "Connect with industry leaders, mentors, and fellow professionals across Europe and GCC.",
    img: IMAGES.solution5,
    tag1: "Connections",
    tag2: "Hiring teams",
  },
  {
    icon: GraduationCap,
    title: "Skill Development",
    desc: "Gain hands-on experience with cutting-edge tools and methodologies used by top companies.",
    img: IMAGES.solution2,
    tag1: "Hands-on",
    tag2: "Real standards",
  },
  {
    icon: Zap,
    title: "Career Acceleration",
    desc: "Fast-track your career with verified credentials and real project experience.",
    img: IMAGES.solution4,
    tag1: "Fast-track",
    tag2: "Verified proof",
  },
  {
    icon: Handshake,
    title: "Mentorship Support",
    desc: "Get personalized guidance from experienced professionals in your field.",
    img: IMAGES.solution3,
    tag1: "Mentorship",
    tag2: "Personalized",
  },
  {
    icon: LineChart,
    title: "Growth Opportunities",
    desc: "Access exclusive job opportunities and career advancement pathways.",
    img: "/growth.avif",
    tag1: "Opportunities",
    tag2: "Career growth",
  },
  {
    icon: Trophy,
    title: "Recognition",
    desc: "Earn certifications and recognition from leading universities and companies.",
    img: "/recognition.png",
    tag1: "Certificates",
    tag2: "Recognition",
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
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Michael Chen",
    role: "Engineering Lead",
    org: "Cloud Platforms",
    focus: "System Design, Leadership",
    experience: "8+ years engineering",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Prof. Emma Williams",
    role: "Academic Director",
    org: "Global University",
    focus: "Curriculum, Industry Alignment",
    experience: "12+ years education",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Ahmed Al-Rashid",
    role: "Business Strategy",
    org: "GCC Ventures",
    focus: "Market Expansion, Partnerships",
    experience: "12+ years consulting",
    linkedin: "https://www.linkedin.com/",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
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
  { name: "intel", light: "#C51F5D" },
  { name: "IBM", light: "#1F2A37" },
  { name: "Oracle", light: "#C51F5D" },
  { name: "SAP", light: "#1F2A37" },
  { name: "Salesforce", light: "#243447" },
  { name: "Adobe", light: "#C51F5D" },
  { name: "PwC", light: "#243447" },
  { name: "Cisco", light: "#C51F5D" },
  { name: "Accenture", light: "#C51F5D" },
  { name: "Deloitte", light: "#1F2A37" },
  { name: "EY", light: "#1F2A37" },
  { name: "SIEMENS", light: "#2AA6B8" },
];

/* -----------------------------------------------------------
   HELPERS
----------------------------------------------------------- */

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
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
  return (
    <a
      className={[
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold sm:px-7 sm:py-3.5",
        "text-white shadow-[0_18px_45px_rgba(197,31,93,0.28)] hover:brightness-110",
        "bg-[linear-gradient(135deg,rgba(197,31,93,1),rgba(165,22,78,1))]",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </a>
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
  const [i, setI] = useState(0);
  const active = items[i];

  const prev = () => setI((v) => (v - 1 + items.length) % items.length);
  const next = () => setI((v) => (v + 1) % items.length);

  const initials = (name = "") =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((x) => x[0]?.toUpperCase())
      .join("");

  return (
    <div className="mt-10">
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={prev}
          className="grid h-12 w-12 place-items-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] backdrop-blur"
          aria-label="Previous story"
        >
          <ChevronLeft className="h-5 w-5 text-[color:var(--text)]" />
        </button>
        <button
          type="button"
          onClick={next}
          className="grid h-12 w-12 place-items-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] backdrop-blur"
          aria-label="Next story"
        >
          <ChevronRight className="h-5 w-5 text-[color:var(--text)]" />
        </button>
      </div>

      <div className="mt-8">
        <div className="relative overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-[color:var(--card)] shadow-[var(--shadow-md)] backdrop-blur">
          <div className="absolute left-0 top-0 h-full w-2 bg-[color:var(--accent)]" />

          <div className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-2xl border border-[#C51F5D]/20 bg-[#C51F5D]/10">
            <Sparkles className="h-5 w-5 text-[#C51F5D]" />
          </div>

          <div className="p-8 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="text-balance text-2xl font-extrabold leading-snug text-[color:var(--text)] sm:text-3xl">
                  {active.quote}
                </div>

                <div className="mt-8 flex items-center gap-4">
                  {active.avatar ? (
                    <img
                      src={active.avatar}
                      alt={active.name}
                      className="h-14 w-14 rounded-full border border-[#C51F5D]/25 object-cover"
                    />
                  ) : (
                    <div className="grid h-14 w-14 place-items-center rounded-full border border-[#C51F5D]/25 bg-[#C51F5D]/10 text-sm font-extrabold text-[#C51F5D]">
                      {initials(active.name)}
                    </div>
                  )}

                  <div>
                    <div className="text-lg font-extrabold text-[color:var(--text)]">
                      {active.name}
                    </div>
                    <div className="text-sm font-semibold text-[color:var(--muted)]">
                      {active.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-black/10">
              <motion.div
                className="h-full rounded-full bg-[#C51F5D]"
                initial={{ width: 0 }}
                animate={{ width: `${((i + 1) / items.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 140, damping: 18 }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          {items.map((_, idx) => {
            const on = idx === i;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                className={[
                  "h-3 rounded-full transition",
                  on ? "w-10 bg-[#C51F5D]" : "w-3 bg-black/25",
                ].join(" ")}
                aria-label={`Go to story ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   HERO
----------------------------------------------------------- */

function CircuitOverlay({ opacity = 0.24 }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage:
          "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.40), transparent 55%)," +
          "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.30), transparent 60%)," +
          "linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)," +
          "linear-gradient(0deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
        backgroundSize: "auto, auto, 42px 42px, 42px 42px",
        mixBlendMode: "soft-light",
      }}
    />
  );
}

function HeroPortrait({ theme, y }) {
  return (
    <motion.div style={{ y }} className="relative mx-auto w-full max-w-[520px]">
      <div className="relative aspect-square w-full">
        <div className="absolute inset-6 rounded-full border border-[rgba(36,52,71,0.22)] bg-white/5" />

        <div
          className="absolute inset-10 rounded-full"
          style={{
            background:
              "conic-gradient(from 210deg, rgba(36,52,71,0.82), rgba(60,200,255,0.55), rgba(11,18,32,0.86))",
          }}
        />
        <div
          className="absolute inset-[52px] rounded-full"
          style={{
            // ? match light background paper, not bright cream
            background: theme === "light" ? COLORS.paper : COLORS.navy,
          }}
        />

        <div className="absolute inset-16 overflow-hidden rounded-full border-[12px] border-white/80 shadow-[0_28px_100px_rgba(0,0,0,0.20)]">
          <img
            src={IMAGES.heroPortrait}
            alt="Student"
            className="h-full w-full object-cover"
          />
        </div>

      </div>
    </motion.div>
  );
}

/* -----------------------------------------------------------
   STATS TILES
----------------------------------------------------------- */

function StatTile({ variant, value, label }) {
  const common =
    "relative overflow-hidden rounded-[26px] px-10 py-9 md:px-12 md:py-10";

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
        <div className="relative text-6xl font-semibold leading-none">
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
        <div className="relative text-6xl font-semibold leading-none">
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
      <div className="text-6xl font-semibold leading-none text-[#1F2A37]">
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

  // match the screenshot layout: 2 rows (top longer, bottom shorter)
  const rows = [
    ["intel", "IBM", "Oracle", "SAP", "Adobe", "pwc", "Cisco"],
    ["Accenture", "pwc", "Deloitte", "EY", "Cisco"],
  ];

  // muted brand-ish colors like the screenshot
  const lightColor = (name) => {
    const n = name.toLowerCase();
    if (["intel", "oracle", "adobe", "cisco", "accenture"].includes(n))
      return "rgba(197,31,93,0.78)"; // pink accent
    if (n === "sap") return "rgba(36,52,71,0.70)";
    if (n === "ibm") return "rgba(31,42,55,0.78)";
    if (n === "pwc") return "rgba(36,52,71,0.72)";
    if (n === "deloitte") return "rgba(31,42,55,0.70)";
    if (n === "ey") return "rgba(31,42,55,0.60)";
    return "rgba(36,52,71,0.62)";
  };

  const darkColor = () => "rgba(255,255,255,0.88)";

  const styleFor = (name, rowIndex) => {
    const n = name.toLowerCase();

    return {
      color: isDark ? darkColor() : lightColor(name),
      opacity: isDark ? 0.92 : 0.92,
      letterSpacing: "0.2px",
      fontWeight: 700,
      // slightly smaller on 2nd row like the screenshot
      fontSize: rowIndex === 0 ? "15px" : "14px",
      lineHeight: 1,
      // printed effect on paper
      textShadow: isDark
        ? "0 1px 0 rgba(0,0,0,0.35)"
        : "0 1px 0 rgba(255,255,255,0.55)",
      // Accenture in screenshot feels lighter/italic
      fontStyle: n === "accenture" ? "italic" : "normal",
    };
  };

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
                {[...row, ...row].map((name, i) => (
                  <span key={`${rowIndex}-${name}-${i}`} style={styleFor(name, rowIndex)}>
                    {name}
                  </span>
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
  return (
    <div
      className={[
        "overflow-hidden rounded-[22px] border border-[color:var(--border)] bg-[color:var(--card)]",
        "shadow-[0_18px_70px_rgba(0,0,0,0.12)]",
      ].join(" ")}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={item.img}
          alt={item.title}
          className="h-full w-full object-cover"
        />
        {isDark ? (
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,18,32,0.72)] via-[rgba(11,18,32,0.12)] to-transparent" />
        ) : null}
      </div>

      <div className="p-6">
        <div className="text-lg font-semibold text-[color:var(--text)]">
          {item.title}
        </div>
        <div className="mt-3 text-sm font-medium leading-relaxed text-[color:var(--muted)]">
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
    </div>
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
        onHoverStart={() => setFlipped(true)}
        onHoverEnd={() => setFlipped(false)}
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
          className="absolute inset-0 rounded-[30px] border border-white/10 p-9"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            background: `linear-gradient(180deg, ${BACK_TOP}, ${BACK_BOTTOM})`,
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div className="flex h-full flex-col items-center justify-center text-center">
            {/* portrait circle with orange ring */}
            <div
              className="h-[108px] w-[108px] overflow-hidden rounded-full"
              style={{
                border: `5px solid ${ORANGE}`,
                boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
              }}
            >
              <img
                src={person.img}
                alt={person.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="mt-6 text-3xl font-semibold text-white">
              {person.name}
            </div>

            <div
              className="mt-2 text-base font-semibold"
              style={{ color: ORANGE }}
            >
              {person.role}
            </div>

            {person.org ? (
              <div className="mt-6 text-sm font-semibold text-white/80">
                {person.org}
              </div>
            ) : null}

            {person.focus ? (
              <div className="mt-3 text-sm font-medium text-white/70">
                Focus: {person.focus}
              </div>
            ) : null}

            {person.experience ? (
              <div className="mt-3 text-sm font-medium text-white/70">
                {person.experience}
              </div>
            ) : null}

            {/* LinkedIn */}
            {person.linkedin ? (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold"
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

  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 22,
    mass: 0.7,
  });

  const heroBgY = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 18]);
  const heroArtY = useTransform(scrollY, [0, 900], [0, reduce ? 0 : -10]);

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
    ],
    []
  );

  return (
    <div
      data-theme={theme}
      className="min-h-screen"
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

            {/* HEADER */}
      <header className="mx-auto max-w-6xl px-4 pt-6">
        <div className="flex flex-wrap items-center justify-end gap-3">
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => (e.preventDefault(), smoothScrollTo("contact"))}
              className="text-sm font-medium text-[color:var(--muted)] hover:text-[color:var(--text)]"
            >
              Contact
            </a>
            <a
              href="#method"
              onClick={(e) => (e.preventDefault(), smoothScrollTo("method"))}
              className="text-sm font-medium text-[color:var(--muted)] hover:text-[color:var(--text)]"
            >
              Method
            </a>
          </div>
        </div>
      </header>

      <main className="pb-16">
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pt-4 sm:pt-6">
          <GlassCard className="relative overflow-hidden p-4 sm:p-6 md:p-10">
            <motion.div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                y: heroBgY,
                backgroundImage: `url(${IMAGES.heroBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "scale(1.06)",
              }}
            />

            {/* ? less white overlay in light mode (so it stays paper, not bright) */}
            <div
              className="absolute inset-0"
              style={{
                background: !isDark
                  ? "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(226,226,210,0.88))"
                  : "linear-gradient(180deg, rgba(11,18,32,0.84), rgba(11,18,32,0.94))",
              }}
            />

            <div
              className="absolute inset-0"
              style={{
                background: !isDark
                  ? "radial-gradient(700px 380px at 22% 24%, rgba(36,52,71,0.10), transparent 68%)"
                  : "radial-gradient(700px 380px at 22% 24%, rgba(60,200,255,0.16), transparent 65%)",
              }}
            />

            {!isDark ? (
              <CircuitOverlay opacity={0.18} />
            ) : (
              <CircuitOverlay opacity={0.10} />
            )}

            <div className="pointer-events-none absolute right-[16%] top-[-40%] hidden h-[200%] w-[14px] rotate-[18deg] rounded-full bg-[linear-gradient(180deg,rgba(36,52,71,0.70),rgba(60,200,255,0.14))] opacity-60 sm:block" />

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
              <div>
                <span className="inline-flex rounded-full bg-[linear-gradient(135deg,rgba(36,52,71,0.92),rgba(11,18,32,0.75))] px-4 py-2 text-xs font-semibold text-white shadow-sm">
                  Up to 25% off!
                </span>

                <h1 className="mt-6 text-4xl font-light tracking-tight text-[color:var(--text)] sm:text-5xl md:text-6xl">
                  Build proof<span className="text-[color:var(--accent)]">.</span>
                  <br />
                  <span className="font-semibold text-[color:var(--accent)]">
                    Launch a real career
                  </span>
                  .
                </h1>

                <p className="mt-4 max-w-[58ch] text-sm font-medium leading-relaxed text-[color:var(--muted)] sm:text-base">
                  Real projects, mentor feedback, and portfolio-ready outcomes 
                  built for students who want results.
                </p>

                <div className="mt-6">
                  <div className="mb-3 text-sm font-semibold text-[color:var(--muted)]">
                    Select your track
                  </div>

                  <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                    <div
                      className="flex items-center gap-3 rounded-full px-5 py-4"
                      style={{
                        border: "1px solid var(--border)",
                        background: "var(--chipBg)",
                        boxShadow: "0 14px 45px rgba(15,23,42,0.10)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <span className="text-base">Track</span>
                      <select
                        defaultValue="software"
                        className="w-full appearance-none bg-transparent text-base font-semibold text-[color:var(--text)] outline-none"
                      >
                        <option value="software">Software Engineering</option>
                        <option value="data">Data & AI</option>
                        <option value="cyber">Cybersecurity</option>
                        <option value="product">Product</option>
                      </select>
                      <span className="text-sm font-semibold text-[color:var(--muted)]">
                        ?
                      </span>
                    </div>

                    <PrimaryBtn
                      href="#method"
                      onClick={(e) => (e.preventDefault(), smoothScrollTo("method"))}
                      className="w-full md:w-auto md:px-8 md:py-4 md:text-base"
                    >
                      Get started
                    </PrimaryBtn>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Chip variant="green">Verified outcomes</Chip>
                    <Chip variant="blue">Real projects</Chip>
                    <Chip variant="pink">Mentor feedback</Chip>
                  </div>

                  <div className="mt-6">
                    <GhostBtn
                      href="#contact"
                      onClick={(e) => (e.preventDefault(), smoothScrollTo("contact"))}
                      className="w-full gap-2 md:w-auto md:text-base md:px-8 md:py-4"
                    >
                      Become a Partner <ArrowRight size={16} />
                    </GhostBtn>
                  </div>
                </div>
              </div>

              <HeroPortrait theme={theme} y={heroArtY} />
            </div>
          </GlassCard>
        </section>

        {/* METHOD / STATS */}
        <section className="mx-auto max-w-6xl px-4 pt-14" id="method">
          <SectionTitle
           title="A system built for"
            accentWord="real outcomes"
            subtitle="Three pillars that turn learning into proof of work."
          />

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

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {SOLUTIONS.map((s) => (
              <PillarCard key={s.title} theme={theme} item={s} />
            ))}
          </div>

          <PlacementBanner theme={theme} />
        </section>

        {/* TOOLS */}
        <section className="mx-auto max-w-6xl px-4 pt-16" id="tools">
          <SectionTitle
            title="Everything needed to build confidence"
            accentWord="and credibility"
            subtitle="Balanced structure + strong visuals, without changing your data."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="overflow-hidden rounded-[22px] border border-[color:var(--border)] bg-[color:var(--card)]"
                  style={{ boxShadow: "var(--shadow-md)" }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={b.img}
                      alt={b.title}
                      className="h-full w-full object-cover"
                    />
                    {isDark ? (
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,18,32,0.70)] via-[rgba(11,18,32,0.10)] to-transparent" />
                    ) : null}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--chipBg)]">
                        <Icon size={18} className="text-[color:var(--text)]" />
                      </div>
                      <div className="text-base font-semibold text-[color:var(--text)]">
                        {b.title}
                      </div>
                    </div>

                    <div className="mt-3 text-sm font-medium leading-relaxed text-[color:var(--muted)]">
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
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <Header
            eyebrow="SUCCESS STORIES"
            title="Real stories from our interns and partners"
            subtitle="Outcomes that hiring teams can validate."
          />
          <SuccessStories items={SUCCESS_STORIES} />
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-16" id="experts">
          <SectionTitle
            kicker="Our Experts"
            title="Our"
            accentWord="Experts"
            subtitle="Meet the industry leaders guiding your journey"
          />

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {EXPERTS.map((p) => (
              <ExpertCard key={p.name} person={p} />
            ))}
          </div>
        </section>

        {/* JOURNEY */}
        <section className="mx-auto max-w-6xl px-4 pt-16" id="journey">
          <SectionTitle
            title="A clear path from application"
            accentWord="to outcomes"
            subtitle="Simple steps. Strong guidance. Real artifacts."
          />

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

                    <a
                      href="#contact"
                      onClick={(e) => (e.preventDefault(), smoothScrollTo("contact"))}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent)]"
                    >
                      Talk to us <ArrowRight size={16} />
                    </a>
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
                        IMAGES.solution1,
                        IMAGES.solution2,
                        IMAGES.solution3,
                        IMAGES.solution4,
                      ][idx]}
                      alt={s.title}
                      className="h-[170px] w-full object-cover md:h-[190px]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <PrimaryBtn
              href="#contact"
              onClick={(e) => (e.preventDefault(), smoothScrollTo("contact"))}
              className="px-10 py-4 text-base"
            >
              Get started <ArrowRight size={18} />
            </PrimaryBtn>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-16" id="about">
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
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-16" id="contact">
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

                <a
                  href="mailto:info@praktix.eu"
                  className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold"
                  style={{
                    background: "var(--emailPillBg)",
                    border: `1px solid var(--emailPillBorder)`,
                    color: "var(--emailPillText)",
                    boxShadow:
                      theme === "dark"
                        ? "inset 0 1px 0 rgba(255,255,255,0.06)"
                        : "inset 0 1px 0 rgba(255,255,255,0.38)",
                  }}
                >
                  info@praktix.eu
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 pb-10 text-center text-sm font-medium text-[color:var(--muted)]">
             {new Date().getFullYear()}
          </div>
        </section>
      </main>
    </div>
  );
}










