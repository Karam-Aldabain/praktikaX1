import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Compass,
  FileCheck2,
  Flame,
  Globe2,
  GraduationCap,
  LineChart,
  MapPin,
  Shield,
  Sparkles,
  Star,
  Target,
  Zap,
  Laptop,
  PenTool,
  Megaphone,
  Handshake,
  ListChecks,
  Rocket,
  Wallet,
  Boxes,
  HeartPulse,
} from "lucide-react";


const THEME = {
  // Core background
  deep: "#0B1220",
  slate: "#1E2A3A",
  sand: "#E9E7DF",

  // Accent system (NOT pink-dominant)
  accent: "#22D3EE", // cyan highlight
  accent2: "#A78BFA", // violet
  accent3: "#34D399", // green
  accent4: "#F59E0B", // amber

  // Keep pink ONLY where you explicitly want it (scroll arrows)
  pink: "#C91D67",

  // Stars / rating
  star: "#F5D66B",
};

const DARK_SECTION_BG = "linear-gradient(90deg, #050B1F 0%, #071A3E 100%)";
const ACCENT_RGB = "201,29,103";
const accent = (a) => `rgba(${ACCENT_RGB}, ${a})`;
const POWER_ICON_SHELL = {
  background: "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
  border: "1px solid rgba(255,255,255,0.22)",
  boxShadow: "0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.20)",
};

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

const formWrapV = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.06 },
  },
};

const fieldV = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function useInViewOnce(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function AnimatedNumber({ value, suffix, durationMs = 900 }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const from = 0;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(from + (value - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, durationMs, reduce]);

  return (
    <span>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

const iconStrongProps = {
  strokeWidth: 2.4,
};

function IconBadge({ color, children }) {
  return (
    <span
      className="inline-flex h-9 w-9 items-center justify-center rounded-2xl ring-1"
      style={{
        ...POWER_ICON_SHELL,
      }}
    >
      <span style={{ color }}>{children}</span>
    </span>
  );
}

function SectionTitle({ eyebrow, title, accent, subtitle, dark }) {
  return (
    <div className={cx("mx-auto max-w-5xl", dark ? "text-white" : "text-[#0B1220]")}>
      {eyebrow ? (
        <div
          className={cx(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-widest",
            dark ? "bg-white/10 text-white/80 ring-1 ring-white/10" : "bg-[#0B1220]/5 text-[#0B1220]/70 ring-1 ring-[#0B1220]/10"
          )}
        >
          <Sparkles className="h-4 w-4" style={{ color: THEME.accent }} {...iconStrongProps} />
          <span>{eyebrow}</span>
        </div>
      ) : null}

      <h2 className={cx("mt-5 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl", dark ? "text-white" : "text-[#0B1220]")}>
        {title}{" "}
        {accent ? (
          <span
            style={{
              color: THEME.pink,
            }}
          >
            {accent}
          </span>
        ) : null}
      </h2>

      {subtitle ? (
        <p className={cx("mt-3 max-w-4xl text-balance text-base sm:text-lg", dark ? "text-white/70" : "text-[#0B1220]/70")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function Pill({ label }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
      style={{
        background: "rgba(255,255,255,0.08)",
        color: "rgba(255,255,255,0.84)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {label}
    </span>
  );
}

function GradientButton({ children, onClick, href, variant = "primary" }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const primary =
    "text-white shadow-[0_12px_30px_rgba(34,211,238,0.18)] hover:translate-y-[-1px] active:translate-y-[0px]";

  const secondary = "bg-transparent text-white ring-1 ring-white/20 hover:bg-white/5";

  const stylePrimary = {
    background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.82)} 55%, ${accent(0.60)} 120%)`,
  };

  const Comp = href ? "a" : "button";
  const props = href ? { href } : { type: "button" };

  return (
    <Comp
      {...props}
      onClick={onClick}
      className={cx(base, variant === "primary" ? primary : secondary)}
      style={variant === "primary" ? stylePrimary : undefined}
    >
      {children}
      <ArrowRight className="h-4 w-4" {...iconStrongProps} />
    </Comp>
  );
}

function StarRow({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;

  const stars = Array.from({ length: 5 }).map((_, i) => {
    const filled = i < full;
    const isHalf = i === full && half;

    return (
      <span key={i} className={cx("inline-flex", filled || isHalf ? "opacity-100" : "opacity-25")}>
        <Star
          className="h-4 w-4"
          style={{
            color: THEME.star,
            fill: filled ? THEME.star : "transparent",
          }}
          strokeWidth={2.2}
        />
      </span>
    );
  });

  return <div className="flex items-center gap-1">{stars}</div>;
}

function Anchor({ href, label }) {
  return (
    <a href={href} className="rounded-full px-3 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/5 hover:text-white">
      {label}
    </a>
  );
}

function clampStyle(lines) {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
    overflow: "hidden",
  };
}

/** ---- DATA (icons now have per-item color accents) ---- */
const categories = [
  {
    key: "eng",
    label: "Engineering & Technology",
    kicker: "Production-ready technical execution",
    programs: [
      {
        name: "Software Engineering (FE/BE/Full Stack)",
        description: "System architecture, API development, database integration, and production-grade workflows.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Industry Mentor Rating",
        rating: 4.9,
        includes: ["Real Client Project", "Portfolio Deployment", "Expert Evaluation"],
        deliverable: "Deployed app + codebase review report",
        careers: ["Software Engineer", "Backend Engineer", "Full Stack Developer"],
        icon: Zap,
        accent: THEME.accent,
        accentSoft: "rgba(34,211,238,0.18)",
      },
      {
        name: "Cloud & DevOps Engineering",
        description: "Cloud infrastructure, CI/CD pipelines, containerization, Kubernetes, monitoring, and scalable deployment.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Industry Mentor Rating",
        rating: 4.8,
        includes: ["Deployed Cloud System", "DevOps Workflow Portfolio"],
        deliverable: "Live CI/CD + infra diagram + runbook",
        careers: ["DevOps Engineer", "Cloud Engineer", "SRE"],
        icon: LineChart,
        accent: THEME.accent3,
        accentSoft: "rgba(52,211,153,0.16)",
      },
      {
        name: "Data Analysis & Business Intelligence",
        description: "Data cleaning, SQL modeling, dashboard development, predictive analysis, and executive reporting.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Mentor Evaluation Score",
        rating: 4.9,
        includes: ["Interactive Dashboard", "Insight Report"],
        deliverable: "Decision-ready dashboard + insights pack",
        careers: ["Data Analyst", "BI Analyst", "Reporting Specialist"],
        icon: Target,
        accent: THEME.accent4,
        accentSoft: "rgba(245,158,11,0.16)",
      },
      {
        name: "Cybersecurity",
        description: "Vulnerability assessment, authentication, encryption layers, penetration basics, and security reporting.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Industry Mentor Rating",
        rating: 4.9,
        includes: ["Security Audit", "Hardened System Framework"],
        deliverable: "Audit report + remediation plan",
        careers: ["Security Analyst", "SOC Analyst", "AppSec Associate"],
        icon: Shield,
        accent: THEME.accent2,
        accentSoft: "rgba(167,139,250,0.18)",
      },
      {
        name: "Mobile App Development",
        description: "Cross-platform development, API integration, performance optimization, deployment pipelines, and push notifications.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Mentor Rating",
        rating: 4.8,
        includes: ["Functional Mobile Application", "Deployment Demo"],
        deliverable: "Shippable app + store-ready build",
        careers: ["Mobile Developer", "React Native Developer", "Flutter Developer"],
        icon: Laptop,
        accent: THEME.accent,
        accentSoft: "rgba(34,211,238,0.18)",
      },
      {
        name: "AI & Machine Learning",
        description: "Modeling, optimization, deployment as APIs, explainable AI, and automation systems.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "AI Expert Rating",
        rating: 4.9,
        includes: ["AI-Powered Application", "Model Performance Report"],
        deliverable: "API-deployed model + eval report",
        careers: ["ML Engineer", "AI Engineer", "Data Scientist"],
        icon: Flame,
        accent: THEME.accent4,
        accentSoft: "rgba(245,158,11,0.16)",
      },
    ],
  },
  {
    key: "digital",
    label: "Digital & Innovation",
    kicker: "Design, transformation, and growth systems",
    programs: [
      {
        name: "UI/UX Product Design",
        description: "User research, wireframing, prototyping, usability testing, and design systems.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Expert Rating",
        rating: 4.8,
        includes: ["High-Fidelity Prototype", "Design Case Study"],
        deliverable: "Case study + hi-fi prototype",
        careers: ["UI/UX Designer", "Product Designer", "UX Research Associate"],
        icon: PenTool,
        accent: THEME.accent2,
        accentSoft: "rgba(167,139,250,0.18)",
      },
      {
        name: "Digital Transformation",
        description: "Workflow analysis, automation strategy, tool selection, efficiency mapping, and roadmapping.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Mentor Evaluation Score",
        rating: 4.8,
        includes: ["Transformation Roadmap", "Executive Presentation"],
        deliverable: "Transformation roadmap + exec deck",
        careers: ["Transformation Analyst", "Ops Analyst", "Business Analyst"],
        icon: Building2,
        accent: THEME.accent3,
        accentSoft: "rgba(52,211,153,0.16)",
      },
      {
        name: "Digital Marketing",
        description: "Campaign optimization, funnel design, A/B testing, performance analytics, and conversion strategy.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Mentor Rating",
        rating: 4.8,
        includes: ["Performance Campaign Report"],
        deliverable: "Campaign analysis + optimization plan",
        careers: ["Performance Marketer", "Growth Analyst", "Marketing Specialist"],
        icon: Megaphone,
        accent: THEME.accent,
        accentSoft: "rgba(34,211,238,0.18)",
      },
      {
        name: "Content Writing",
        description: "Professional copywriting, SEO structuring, content optimization, and editorial workflows.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Editorial Rating",
        rating: 4.7,
        includes: ["Published Portfolio Collection"],
        deliverable: "Published portfolio + SEO playbook",
        careers: ["Content Writer", "SEO Copywriter", "Content Strategist"],
        icon: FileCheck2,
        accent: THEME.accent4,
        accentSoft: "rgba(245,158,11,0.16)",
      },
    ],
  },
  {
    key: "biz",
    label: "Business & Strategy",
    kicker: "Execution frameworks hiring teams recognize",
    programs: [
      {
        name: "Business Development",
        description: "Market research, partnership mapping, revenue modeling, and strategic expansion frameworks.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Industry Rating",
        rating: 4.8,
        includes: ["Expansion Strategy Report"],
        deliverable: "Expansion strategy + partner map",
        careers: ["BD Associate", "Partnerships Associate", "Growth Associate"],
        icon: Handshake,
        accent: THEME.accent3,
        accentSoft: "rgba(52,211,153,0.16)",
      },
      {
        name: "Project Management",
        description: "Milestone planning, stakeholder communication, risk management, and project documentation systems.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Professional Rating",
        rating: 4.8,
        includes: ["Execution Plan", "Project Documentation"],
        deliverable: "Delivery plan + governance docs",
        careers: ["Project Coordinator", "Junior PM", "Delivery Associate"],
        icon: ListChecks,
        accent: THEME.accent,
        accentSoft: "rgba(34,211,238,0.18)",
      },
      {
        name: "Entrepreneurship & Startup Building",
        description: "MVP development, business validation, revenue strategy, and investor pitch structuring.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Innovation Mentor Rating",
        rating: 4.9,
        includes: ["Startup Prototype", "Investor Pitch Deck"],
        deliverable: "MVP prototype + pitch deck",
        careers: ["Founder", "Product Associate", "Startup Ops"],
        icon: Rocket,
        accent: THEME.accent2,
        accentSoft: "rgba(167,139,250,0.18)",
      },
      {
        name: "Sales & Marketing",
        description: "CRM processes, lead prospecting, pitch design, and structured revenue strategies.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Industry Rating",
        rating: 4.7,
        includes: ["Sales Strategy Model"],
        deliverable: "Pipeline model + pitch assets",
        careers: ["Sales Associate", "SDR", "Revenue Operations"],
        icon: Zap,
        accent: THEME.accent4,
        accentSoft: "rgba(245,158,11,0.16)",
      },
      {
        name: "Business Consulting",
        description: "Financial diagnostics, strategic analysis, executive reporting, and performance benchmarking.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Consulting Rating",
        rating: 4.8,
        includes: ["Consulting Report", "Executive Presentation"],
        deliverable: "Consulting report + exec presentation",
        careers: ["Consulting Analyst", "Strategy Analyst", "Business Analyst"],
        icon: Target,
        accent: THEME.accent,
        accentSoft: "rgba(34,211,238,0.18)",
      },
    ],
  },
  {
    key: "fin",
    label: "Finance & Economics",
    kicker: "Decision-grade models & industry reports",
    programs: [
      {
        name: "Finance & Financial Modeling",
        description: "Financial forecasting, risk modeling, investment analysis, and budgeting frameworks.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Financial Expert Rating",
        rating: 4.8,
        includes: ["Financial Model", "Analytical Report"],
        deliverable: "Model + investment memo",
        careers: ["Financial Analyst", "FP&A Associate", "Investment Analyst"],
        icon: Wallet,
        accent: THEME.accent4,
        accentSoft: "rgba(245,158,11,0.16)",
      },
      {
        name: "FinTech Engineering",
        description: "Financial modeling, dashboards, risk simulation, payment logic systems, and fintech architecture basics.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Financial Tech Rating",
        rating: 4.8,
        includes: ["FinTech Prototype", "Financial Dashboard"],
        deliverable: "Prototype + dashboard",
        careers: ["FinTech Analyst", "Product Analyst", "Data Analyst"],
        icon: Sparkles,
        accent: THEME.accent2,
        accentSoft: "rgba(167,139,250,0.18)",
      },
      {
        name: "Supply Chain Management",
        description: "Demand forecasting, bottleneck analysis, inventory optimization, and operational modeling.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Industry Rating",
        rating: 4.7,
        includes: ["Operational Efficiency Report"],
        deliverable: "Ops efficiency report",
        careers: ["Supply Chain Analyst", "Ops Analyst", "Planning Associate"],
        icon: Boxes,
        accent: THEME.accent3,
        accentSoft: "rgba(52,211,153,0.16)",
      },
      {
        name: "Digital Economics",
        description: "Platform economy analysis, ecosystem modeling, digital market forecasting, and economic reporting.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Research Rating",
        rating: 4.7,
        includes: ["Market Research Study"],
        deliverable: "Research study + executive summary",
        careers: ["Research Analyst", "Economic Analyst", "Market Analyst"],
        icon: Globe2,
        accent: THEME.accent,
        accentSoft: "rgba(34,211,238,0.18)",
      },
      {
        name: "Digital Health Management",
        description: "Healthcare KPI analysis, patient data dashboards, workflow optimization, and digital service mapping.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Expert Rating",
        rating: 4.8,
        includes: ["Health Management Dashboard"],
        deliverable: "Health KPI dashboard",
        careers: ["Health Ops Analyst", "Program Analyst", "Business Analyst"],
        icon: HeartPulse,
        accent: THEME.accent3,
        accentSoft: "rgba(52,211,153,0.16)",
      },
    ],
  },
];

function LevelPill({ level, color }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold ring-1"
      style={{
        background: "rgba(255,255,255,0.08)",
        borderColor: "rgba(255,255,255,0.12)",
      }}
    >
      <span className="inline-block h-2 w-2 rounded-full" style={{ background: color }} />
      <span className="text-white/85">{level}</span>
    </div>
  );
}

function ProgramCard({ program, index = 0 }) {
  const Icon = program.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: Math.min(index * 0.03, 0.15) }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={cx(
        "group relative w-[380px] md:w-[420px] shrink-0 overflow-hidden rounded-3xl ring-1",
        "bg-white/5 backdrop-blur"
      )}
      style={{
        borderColor: "rgba(255,255,255,0.10)",
        boxShadow: "0 18px 70px rgba(0,0,0,0.35)",
      }}
    >
      {/* Subtle top accent */}
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${program.accent} 0%, rgba(255,255,255,0.0) 80%)`,
          opacity: 0.9,
        }}
      />

      {/* Hover shine */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="shine" />
      </div>

      {/* Content */}
      <div className="relative flex h-[560px] flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <IconBadge color={program.accent}>
              <Icon className="h-4.5 w-4.5" {...iconStrongProps} />
            </IconBadge>
            <LevelPill level={program.level} color={program.accent} />
          </div>

          <div className="text-right">
            <div className="text-xs font-semibold text-white/55">{program.ratingLabel}</div>
            <div className="mt-1 flex items-center justify-end gap-2">
              <StarRow rating={program.rating} />
              <span className="text-sm font-semibold text-white">{program.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-lg font-semibold text-white" style={clampStyle(2)}>
            {program.name}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/70" style={clampStyle(3)}>
            {program.description}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
              <Calendar className="h-4 w-4" style={{ color: program.accent }} {...iconStrongProps} />
              <span>Duration</span>
            </div>
            <div className="mt-1 text-sm font-semibold text-white">{program.duration}</div>
          </div>
          <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
              <GraduationCap className="h-4 w-4" style={{ color: program.accent }} {...iconStrongProps} />
              <span>Intakes</span>
            </div>
            <div className="mt-1 text-sm font-semibold text-white">{program.intakes}</div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl p-3 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="text-xs font-semibold tracking-widest text-white/55">DELIVERABLE</div>
          <div className="mt-1 text-sm font-semibold text-white" style={clampStyle(2)}>
            {program.deliverable}
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs font-semibold tracking-widest text-white/55">CAREER PATHS</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {program.careers.slice(0, 3).map((c) => (
              <span
                key={c}
                className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.82)",
                  borderColor: "rgba(255,255,255,0.10)",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom block pinned to bottom for consistent height */}
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition-all hover:bg-white/5"
              onClick={() => alert("Hook up to a program details route/modal.")}
            >
              View Details <ChevronRight className="h-4 w-4" {...iconStrongProps} />
            </button>
            <div className="text-xs font-semibold text-white/55">Includes:</div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {program.includes.map((i, includeIdx) => (
              <span
                key={i}
                className={cx(
                  "include-pill rounded-full px-3 py-1 text-xs font-semibold ring-1",
                  includeIdx % 2 === 0 ? "include-pill-accent" : "include-pill-muted"
                )}
                style={{
                  ...(includeIdx % 2 === 0
                    ? {
                        background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 100%)`,
                        color: "rgba(255,255,255,0.96)",
                        borderColor: "rgba(255,255,255,0.14)",
                        boxShadow: `0 8px 20px ${accent(0.18)}`,
                      }
                    : {
                        background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
                        color: "rgba(255,255,255,0.85)",
                        borderColor: "rgba(255,255,255,0.16)",
                      }),
                }}
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SplitCard({ title, bullets, icon, tone }) {
  const isPink = tone === "light";
  const isBlue = tone === "dark";
  return (
    <div
      className={cx("relative overflow-hidden rounded-[36px] p-7 ring-1", isPink || isBlue ? "text-white" : "text-[#0B1220]")}
      style={{
        background: isPink ? "linear-gradient(135deg, #C91D67 0%, #B3175A 100%)" : isBlue ? "linear-gradient(135deg, #061A3B 0%, #0A2A4F 100%)" : "rgba(255,255,255,0.55)",
        borderColor: isPink || isBlue ? "rgba(255,255,255,0.12)" : "rgba(11,18,32,0.10)",
      }}
    >
      {isPink ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.20) 0px, rgba(255,255,255,0.20) 14px, transparent 14px, transparent 30px)",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-3 left-6 h-40 w-20 opacity-[0.16]"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.40), transparent 70%)",
              transform: "skewX(-18deg)",
            }}
          />
        </>
      ) : null}
      {isBlue ? (
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-[0.5]"
          style={{
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow:
              "0 0 0 18px rgba(255,255,255,0.05), 0 0 0 36px rgba(255,255,255,0.03)",
          }}
        />
      ) : null}

      <div className="flex items-center gap-3">
        <div
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{
            background: isPink || isBlue ? "rgba(255,255,255,0.12)" : "rgba(11,18,32,0.05)",
            border: isPink || isBlue ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(11,18,32,0.10)",
          }}
        >
          <span style={{ color: isPink || isBlue ? "rgba(255,255,255,0.95)" : THEME.accent }}>{icon}</span>
        </div>
        <div>
          <div className={cx("text-xs font-semibold tracking-widest", isPink || isBlue ? "text-white/70" : "text-[#0B1220]/55")}>
            ENVIRONMENT
          </div>
          <div className={cx("mt-1 text-lg font-semibold", isPink || isBlue ? "text-white" : "text-[#0B1220]")}>{title}</div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {bullets.map((b) => (
          <div key={b} className="flex items-start gap-3">
            <span
              className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full ring-1"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.10)",
              }}
            >
              <span className="h-2 w-2 rounded-full bg-white/90" />
            </span>
            <div className={cx("text-sm", isPink || isBlue ? "text-white/85" : "text-[#0B1220]/75")}>{b}</div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl" style={{ background: isPink ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.10)" }} />
    </div>
  );
}

function Timeline() {
  const steps = [
    { title: "Apply & Assessment", desc: "We evaluate readiness and align you with the right track.", icon: ClipboardCheck, color: THEME.accent },
    { title: "Track Placement", desc: "You join a cohort with the right challenge level.", icon: Compass, color: THEME.accent2 },
    { title: "Real Project Execution", desc: "Weekly sprints with mentor feedback and accountability.", icon: Briefcase, color: THEME.accent3 },
    { title: "Final Evaluation & Portfolio", desc: "Documented performance + portfolio-ready deliverables.", icon: FileCheck2, color: THEME.accent4 },
  ];

  return (
    <div className="relative">
      <div
        className="absolute left-6 top-7 hidden h-[calc(100%-56px)] w-[2px] sm:block"
        style={{ background: `linear-gradient(180deg, ${THEME.accent} 0%, rgba(34,211,238,0.10) 100%)` }}
      />

      <div className="grid grid-cols-1 gap-4">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
              className="relative rounded-[36px] bg-white/55 p-6 ring-1 ring-[#0B1220]/10"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <IconBadge color={s.color}>
                    <Icon className="h-5 w-5" {...iconStrongProps} />
                  </IconBadge>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-lg font-semibold text-[#0B1220]">{s.title}</div>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
                      style={{
                        background: "rgba(11,18,32,0.06)",
                        color: "rgba(11,18,32,0.70)",
                        borderColor: "rgba(11,18,32,0.10)",
                      }}
                    >
                      Step {i + 1}
                    </span>
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-[#0B1220]/70">{s.desc}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ImpactPanel({ inView }) {
  const stats = [
    { label: "Interns trained", value: 1200, suffix: "+", hint: "Structured cohorts with evaluation", icon: GraduationCap, color: THEME.accent },
    { label: "Job-ready portfolios", value: 87, suffix: "%", hint: "Proof-of-work deliverables", icon: FileCheck2, color: THEME.accent4 },
    { label: "Career opportunities", value: 72, suffix: "%", hint: "Within 6 months of completion", icon: Briefcase, color: THEME.accent3 },
    { label: "European mentors", value: 40, suffix: "+", hint: "Experts + professors", icon: BadgeCheck, color: THEME.accent2 },
  ];

  const proofs = [
    { title: "Industry projects", desc: "Real scopes, constraints, and stakeholder expectations.", icon: Building2, color: THEME.accent },
    { title: "Expert evaluation", desc: "Documented performance + improvement loops.", icon: ClipboardCheck, color: THEME.accent3 },
    { title: "Verified outcomes", desc: "Portfolio-ready outputs that hiring teams can validate.", icon: FileCheck2, color: THEME.accent4 },
  ];

  return (
    <div className="mt-10">
      <div
        className="relative overflow-hidden rounded-[36px] ring-1 ring-white/10"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
          boxShadow: "0 26px 90px rgba(0,0,0,0.35)",
        }}
      >
        {/* Soft glow */}
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(34,211,238,0.16)" }}
        />
        <div
          className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(167,139,250,0.14)" }}
        />

        <div className="relative p-6 sm:p-8">
          {/* Stats grid with dividers (NO separate big cards) */}
          <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-3xl ring-1 ring-white/10 sm:grid-cols-2">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              const border =
                idx === 0
                  ? "border-b border-white/10 sm:border-b sm:border-r"
                  : idx === 1
                  ? "border-b border-white/10 sm:border-b"
                  : idx === 2
                  ? "border-white/10 sm:border-r"
                  : "";

              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  className={cx("p-5 sm:p-6", border)}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-semibold tracking-widest text-white/60">
                        <IconBadge color={s.color}>
                          <Icon className="h-4 w-4" {...iconStrongProps} />
                        </IconBadge>
                        <span>{s.label.toUpperCase()}</span>
                      </div>
                      <div className="mt-3 text-4xl font-semibold text-white">
                        {inView ? <AnimatedNumber value={s.value} suffix={s.suffix} /> : <span>0</span>}
                      </div>
                      <div className="mt-1 text-sm text-white/70">{s.hint}</div>
                    </div>

                    {/* tiny accent line */}
                    <div className="hidden sm:block">
                      <div className="h-12 w-1 rounded-full" style={{ background: s.color, opacity: 0.65 }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Proof row (clean, lighter) */}
          <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
            {proofs.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.22 + i * 0.06 }}
                  className="rounded-3xl p-5 ring-1 ring-white/10"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div className="flex items-start gap-3">
                    <IconBadge color={p.color}>
                      <Icon className="h-4 w-4" {...iconStrongProps} />
                    </IconBadge>
                    <div>
                      <div className="text-sm font-semibold text-white">{p.title}</div>
                      <div className="mt-1 text-sm text-white/65">{p.desc}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentsGraduatesLanding() {
  const [activeCat, setActiveCat] = useState(categories[0].key);
  const [persona, setPersona] = useState("Student");
  const [year, setYear] = useState("Final Year");
  const [cv, setCv] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const cat = useMemo(() => categories.find((c) => c.key === activeCat) || categories[0], [activeCat]);

  const impact = useInViewOnce(0.25);
  const sliderRef = useRef(null);

  const scrollSlider = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    const dx = dir === "left" ? -360 : 360;
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: THEME.deep,
        color: "white",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      }}
    >
      {/* Decorative global background */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(1200px circle at 10% 10%, rgba(255,255,255,0.08), transparent 55%), radial-gradient(1200px circle at 80% 20%, rgba(233,231,223,0.06), transparent 55%), radial-gradient(900px circle at 60% 90%, rgba(255,255,255,0.06), transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(233,231,223,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(233,231,223,0.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(900px circle at 30% 20%, rgba(0,0,0,1), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 opacity-55">
          <div className="light-streak" />
        </div>
      </div>

      {/* Sticky top nav */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B1220]/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl ring-1 ring-white/10"
              style={{
                background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.72)} 70%)`,
              }}
            >
              <span className="text-sm font-black tracking-widest">P</span>
            </div>
            <div>
              <div className="text-sm font-semibold">PRAKTIX</div>
              <div className="text-xs text-white/60">AI for Real-World Careers</div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            <Anchor href="#overview" label="Overview" />
            <Anchor href="#impact" label="Impact" />
            <Anchor href="#programs" label="Programs" />
            <Anchor href="#international" label="Germany" />
            <Anchor href="#apply" label="Apply" />
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#apply"
              className="hidden rounded-full px-4 py-2 text-sm font-semibold text-white/70 ring-1 ring-white/15 transition hover:bg-white/5 md:inline-flex"
            >
              Explore Programs
            </a>
            <GradientButton href="#apply">Apply Now</GradientButton>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="overview" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/75 ring-1 ring-white/10">
              <GraduationCap className="h-4 w-4" style={{ color: THEME.sand }} {...iconStrongProps} />
              <span>FOR INDIVIDUALS</span>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              Apply AI Skills.
              <br />
              Launch Real-World Career Outcomes.
            </h1>

            <p className="mt-5 max-w-xl text-balance text-base text-white/70 sm:text-lg">
              Practical AI pathways supervised by industry experts and university professors.
            </p>

            <p className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-white/65">
              We bridge the gap between AI theory and real market execution through structured, project-based programs.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GradientButton href="#apply">Apply Now</GradientButton>
              <GradientButton href="#programs" variant="secondary">
                Explore Programs
              </GradientButton>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill label="Real Projects" />
              <Pill label="Industry Mentorship" />
              <Pill label="Portfolio-Ready Outcomes" />
              <Pill label="3-4 Month Programs" />
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-white/65">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <BadgeCheck className="h-4 w-4" style={{ color: THEME.accent3 }} {...iconStrongProps} />
                <span>Verified outcomes</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <FileCheck2 className="h-4 w-4" style={{ color: THEME.accent4 }} {...iconStrongProps} />
                <span>Professional evaluation</span>
              </div>
            </div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px]">
              <div
                className="absolute inset-0 rounded-[44px] ring-1 ring-white/10"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                }}
              />

              {/* Concept circle */}
              <div className="absolute right-6 top-6 grid place-items-center sm:right-10 sm:top-10">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative grid h-[230px] w-[230px] place-items-center rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.16), transparent 58%), radial-gradient(circle at 70% 70%, rgba(233,231,223,0.10), transparent 55%), rgba(255,255,255,0.06)",
                    boxShadow: "0 25px 70px rgba(0,0,0,0.35)",
                  }}
                >
                  <div className="absolute inset-0 rounded-full" style={{ border: "10px solid rgba(233,231,223,0.75)", opacity: 0.9, transform: "scale(0.92)" }} />
                  <div className="absolute inset-0 rounded-full" style={{ border: `8px solid ${accent(0.55)}`, opacity: 0.9, transform: "scale(1.02)" }} />

                  <div
                    className="relative h-[170px] w-[170px] overflow-hidden rounded-full ring-1 ring-white/15"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, rgba(233,231,223,0.22), rgba(11,18,32,0.82))",
                    }}
                  >
                    <img
                      src="/istockphoto-471247592-612x612.jpg"
                      alt="Hero visual"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Floating chips */}
              <div className="absolute left-6 top-10 hidden space-y-3 sm:left-10 sm:top-12 sm:block">
                <FloatingChip icon={Zap} title="Real client brief" desc="Industry project scope" color={THEME.accent} />
                <FloatingChip icon={ClipboardCheck} title="Weekly reviews" desc="Mentor feedback loop" color={THEME.accent3} />
                <FloatingChip icon={FileCheck2} title="Portfolio output" desc="Deliverable-ready" color={THEME.accent4} />
              </div>

              {/* Bottom caption */}
              <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-white/60">POSITIONING</div>
                    <div className="mt-1 text-sm font-semibold text-white">Premium European supervision, measurable outcomes.</div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/75 ring-1 ring-white/10">
                    <MapPin className="h-4 w-4" style={{ color: THEME.accent2 }} {...iconStrongProps} />
                    <span>Global  Remote-friendly</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            eyebrow="THE PROBLEM WE SOLVE"
            title="The Gap Between Study and Employment"
            subtitle="Universities teach knowledge. The market demands capability. We convert academic learning into measurable professional execution."
          />

          <div className="relative mt-10 overflow-hidden">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <SplitCard
                title="University Environment"
                icon={<GraduationCap className="h-5 w-5" {...iconStrongProps} />}
                bullets={["Theory-heavy learning", "Limited exposure to real delivery", "Few performance signals"]}
                tone="light"
              />
              <SplitCard
                title="Real Company Environment"
                icon={<Briefcase className="h-5 w-5" {...iconStrongProps} />}
                bullets={["Execution under constraints", "Output + iteration", "Clear ownership & accountability"]}
                tone="dark"
              />
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-white/55 p-6 ring-1 ring-[#0B1220]/10 backdrop-blur">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">OUR PROMISE</div>
                <div className="mt-1 text-base font-semibold">Internship programs designed to produce proof-of-work, not just participation.</div>
              </div>
              <a
                href="#programs"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0B1220] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                See Programs <ArrowRight className="h-4 w-4" {...iconStrongProps} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT (FIXED UI) */}
      <section id="impact" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div ref={impact.ref} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            eyebrow="IMPACT & NUMBERS"
            title="Real performance. Real outcomes."
            accent="Verified impact"
            subtitle="Cleaner hierarchy, better spacing, and a single modern panel (no heavy card clutter)."
            dark
          />
          <ImpactPanel inView={impact.inView} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        className="relative"
        style={{
          background: "linear-gradient(180deg, rgba(233,231,223,1) 0%, rgba(233,231,223,0.85) 100%)",
          color: THEME.deep,
        }}
      >
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle eyebrow="HOW OUR INTERNSHIPS WORK" title="A clear 4-step process" accent="that builds proof" subtitle="Designed for momentum: assessment ? placement ? execution ? evaluation." />
          <div className="mt-10">
            <Timeline />
          </div>
        </div>
      </section>

      {/* PROGRAMS (FREE LAYOUT + SAME HEIGHT CARDS + PINK ARROWS) */}
      <section id="programs" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle eyebrow="PROGRAM STRUCTURE" title="Choose your track" accent="and ship outcomes" subtitle="Cleaner layout (no big wrapper card). Swipe/scroll horizontally." dark />

          <div className="mt-10 flex flex-col gap-5">
            {/* Tabs row */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => {
                  const active = c.key === activeCat;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => {
                        setActiveCat(c.key);
                        sliderRef.current?.scrollTo({ left: 0, behavior: "smooth" });
                      }}
                      className={cx(
                        "rounded-full px-4 py-2 text-sm font-semibold ring-1 transition",
                        active ? "text-white" : "text-white/70 hover:bg-white/5",
                        active ? "ring-white/15" : "ring-white/10"
                      )}
                      style={
                        active
                          ? {
                              background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 75%)`,
                            }
                          : undefined
                      }
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Selected category info (free, not boxed) */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-xs font-semibold tracking-widest text-white/60">SELECTED CATEGORY</div>
                <div className="mt-1 text-xl font-semibold text-white">{cat.label}</div>
                <div className="mt-1 text-sm text-white/65">{cat.kicker}</div>
              </div>

              <a
                href="#apply"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/5 sm:mt-0"
              >
                Apply for this track <ArrowRight className="h-4 w-4" {...iconStrongProps} />
              </a>
            </div>

            {/* Slider */}
            <div className="relative overflow-visible">
              <motion.button
                type="button"
                onClick={() => scrollSlider("left")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="absolute -left-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full ring-1 transition lg:inline-flex"
                style={{
                  background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.65)} 90%)`,
                  borderColor: "rgba(255,255,255,0.14)",
                  boxShadow: `0 14px 35px ${accent(0.22)}`,
                }}
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5 text-white" {...iconStrongProps} />
              </motion.button>

              <motion.button
                type="button"
                onClick={() => scrollSlider("right")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="absolute -right-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full ring-1 transition lg:inline-flex"
                style={{
                  background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.65)} 90%)`,
                  borderColor: "rgba(255,255,255,0.14)",
                  boxShadow: `0 14px 35px ${accent(0.22)}`,
                }}
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5 text-white" {...iconStrongProps} />
              </motion.button>

              <div
                ref={sliderRef}
                className="no-scrollbar flex gap-5 overflow-x-auto pb-2"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {cat.programs.map((p, idx) => (
                  <div key={p.name} style={{ scrollSnapAlign: "start" }}>
                    <ProgramCard program={p} index={idx} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GERMANY */}
      <section id="international" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle eyebrow="GERMANY EXCELLENCE INVITATION" title="Outstanding teams get invited" accent="to Germany" subtitle="A premium 4-day professional visit for top-performing teams." />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur">
                <div className="flex items-center gap-3">
                  <IconBadge color={THEME.accent2}>
                    <Globe2 className="h-5 w-5" {...iconStrongProps} />
                  </IconBadge>
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">EXPERIENCE</div>
                    <div className="mt-1 text-lg font-semibold">Exposure. Network. Global positioning.</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <DayCard day="Day 1" title="Final Project Presentation" icon={FileCheck2} color={THEME.accent} />
                  <DayCard day="Day 2" title="Advanced Industry Workshop" icon={Sparkles} color={THEME.accent2} />
                  <DayCard day="Day 3" title="Partner Company Tours" icon={Building2} color={THEME.accent3} />
                  <DayCard day="Day 4" title="Munich Cultural Experience" icon={MapPin} color={THEME.accent4} />
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-[#0B1220]/70">Learn how to qualify and what partners expect from top-performing teams.</div>
                  <a
                    href="#apply"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)`,
                    }}
                  >
                    Learn About International Opportunities <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div
                className="relative h-full overflow-hidden rounded-[36px] p-7 ring-1 ring-[#0B1220]/10"
                style={{
                  background:
                    "radial-gradient(900px circle at 20% 20%, rgba(255,255,255,0.10), transparent 55%), radial-gradient(900px circle at 80% 60%, rgba(255,255,255,0.06), transparent 55%), rgba(255,255,255,0.55)",
                }}
              >
                <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">WHY IT MATTERS</div>
                <div className="mt-2 text-2xl font-semibold leading-tight">Your internship becomes a signal - not a line on a CV.</div>
                <p className="mt-4 text-sm leading-relaxed text-[#0B1220]/70">
                  We design evaluation and deliverables so hiring teams can validate outcomes. Teams that execute exceptionally gain international visibility.
                </p>

                <div className="mt-6 space-y-3">
                  <Bullet icon={BadgeCheck} text="Professional evaluation report" color={THEME.accent3} />
                  <Bullet icon={FileCheck2} text="Portfolio-ready proof" color={THEME.accent4} />
                  <Bullet icon={Building2} text="Partner exposure" color={THEME.accent2} />
                </div>

                <div className="pointer-events-none absolute -bottom-20 -right-24 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(255,255,255,0.10)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="relative" style={{ background: "rgba(233,231,223,1)", color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle eyebrow="APPLICATION" title="Apply for AI for Real-World Careers" subtitle="Start building practical AI experience today." />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <motion.div
                variants={formWrapV}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="relative rounded-[40px] p-[1px]"
                style={{
                  background: "#FFFFFF",
                  backgroundSize: "200% 200%",
                  animation: "gradMove 10s ease-in-out infinite",
                  boxShadow: "0 26px 90px rgba(0,0,0,0.18)",
                }}
              >
                <div className="relative rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur">
                  <AnimatePresence>
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        className="pointer-events-none absolute right-6 top-6 rounded-full px-4 py-2 text-xs font-semibold ring-1"
                        style={{
                          background: "rgba(52,211,153,0.18)",
                          borderColor: "rgba(52,211,153,0.30)",
                          color: "rgba(11,18,32,0.85)",
                        }}
                      >
                        Application received
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitting(true);

                      setTimeout(() => {
                        setSubmitting(false);
                        setSubmitted(true);
                        setTimeout(() => setSubmitted(false), 2800);
                      }, 650);
                    }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Full Name" required>
                        <Input icon={BadgeCheck} iconColor={THEME.accent2} placeholder="Your full name" />
                      </Field>
                      <Field label="Email Address" required>
                        <Input icon={Globe2} iconColor={THEME.accent} placeholder="name@email.com" type="email" />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Phone Number">
                        <Input icon={Briefcase} iconColor={THEME.accent3} placeholder="+20 000 000 000" />
                      </Field>
                      <Field label="Country">
                        <Input icon={MapPin} iconColor={THEME.accent4} placeholder="Country" />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Are you?">
                        <Select icon={GraduationCap} iconColor={THEME.accent3} value={persona} onChange={setPersona} options={["Student", "Graduate"]} />
                      </Field>
                      <Field label="Current Academic Year" hint={persona === "Graduate" ? "(hidden for graduates)" : undefined}>
                        {persona === "Student" ? (
                          <Select icon={Calendar} iconColor={THEME.accent} value={year} onChange={setYear} options={["1st", "2nd", "3rd", "Final Year"]} />
                        ) : (
                          <div className="rounded-2xl bg-white/50 px-4 py-3 text-sm text-[#0B1220]/60 ring-1 ring-[#0B1220]/10">Not applicable</div>
                        )}
                      </Field>
                    </div>

                    <Field label="Field of Study / Specialization">
                      <Input icon={Sparkles} iconColor={THEME.accent2} placeholder="e.g., Computer Science, Business, Finance" />
                    </Field>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Preferred Internship Category">
                        <Select
                          icon={Briefcase}
                          iconColor={THEME.accent4}
                          value={cat.label}
                          onChange={(v) => {
                            const match = categories.find((x) => x.label === v);
                            if (match) setActiveCat(match.key);
                          }}
                          options={categories.map((c) => c.label)}
                        />
                      </Field>
                      <Field label="Preferred Start Timeline">
                        <Select
                          icon={Calendar}
                          iconColor={THEME.accent}
                          value="Within 1 Month"
                          onChange={() => null}
                          options={["Immediately", "Within 1 Month", "Within 2-3 Months"]}
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Preferred Cohort Intake">
                        <Select icon={Compass} iconColor={THEME.accent3} value="Q2" onChange={() => null} options={["Q1", "Q2", "Q3", "Q4"]} />
                      </Field>
                      <Field label="LinkedIn Profile" hint="Optional but recommended">
                        <Input icon={Rocket} iconColor={THEME.accent2} placeholder="https://linkedin.com/in/" />
                      </Field>
                    </div>

                    <Field label="Your Career Goal">
                      <Textarea placeholder="Tell us your target role, industry, and what success looks like." />
                    </Field>

                    <Field label="Upload CV" hint="Optional">
                      <FilePicker onFile={setCv} />
                      {cv ? <p className="mt-2 text-xs text-[#0B1220]/55">Selected: {cv.name}</p> : null}
                    </Field>

                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="relative w-full overflow-hidden rounded-full px-5 py-3 text-sm font-semibold text-white shadow-sm transition"
                        style={{
                          background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)`,
                        }}
                      >
                        <span className="relative z-10">{submitting ? "Submitting..." : "Submit Application"}</span>
                        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 hover:opacity-100">
                          <span className="shine" />
                        </span>
                      </motion.button>
                      <p className="mt-3 text-center text-xs text-[#0B1220]/60">After submission: success message + automatic confirmation email.</p>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <div
                className="rounded-[36px] p-7 ring-1 ring-[#0B1220]/10 lg:sticky lg:top-24"
                style={{
                  background:
                    "radial-gradient(900px circle at 30% 15%, rgba(255,255,255,0.10), transparent 55%), radial-gradient(900px circle at 80% 70%, rgba(255,255,255,0.06), transparent 55%), rgba(255,255,255,0.55)",
                }}
              >
                <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">WHAT YOU GET</div>
                <div className="mt-2 text-2xl font-semibold leading-tight">A portfolio your next employer can validate.</div>

                <div className="mt-5 space-y-3">
                  <Bullet icon={FileCheck2} text="Verified internship certificate" color={THEME.accent4} />
                  <Bullet icon={ClipboardCheck} text="Documented performance report" color={THEME.accent3} />
                  <Bullet icon={Briefcase} text="Real project deliverables" color={THEME.accent} />
                  <Bullet icon={BadgeCheck} text="Expert supervision & feedback" color={THEME.accent2} />
                </div>

                <div className="mt-7 rounded-3xl bg-white/55 p-5 ring-1 ring-[#0B1220]/10">
                  <div className="text-sm font-semibold">Quick track fit</div>
                  <p className="mt-2 text-sm text-[#0B1220]/70">
                    Selected: <span className="font-semibold">{cat.label}</span>
                  </p>
                  <p className="mt-1 text-sm text-[#0B1220]/70">{cat.kicker}</p>

                  <div className="mt-4">
                    <a href="#programs" className="inline-flex items-center gap-2 rounded-full bg-[#0B1220] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
                      Browse programs <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-12">
            <div
              className="relative overflow-hidden rounded-[32px] border border-white/10 px-6 py-8 text-center sm:px-10 sm:py-10"
              style={{
                background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 100%)`,
                boxShadow: "0 24px 90px rgba(0,0,0,0.16)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.16]"
                style={{
                  backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)",
                }}
              />
              <div className="relative mx-auto max-w-6xl text-white">
                <div className="text-xs font-semibold text-white/80 sm:text-sm">Balanced structure - strong visuals - portfolio-ready proof</div>
                <div className="mt-3 text-3xl font-semibold md:text-4xl">
                  <span className="text-white">2000+ </span>
                  successful placements powered by portfolio-ready outcomes
                </div>
                <p className="mx-auto mt-4 max-w-4xl text-sm font-medium text-white/80">
                  Real projects + mentor feedback + measurable outputs designed to match hiring expectations.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <a href="#apply" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] transition hover:opacity-95">
                    Start Your Internship Journey <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </a>
                  <a href="#programs" className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15">
                    Explore Programs <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Apply Button */}
      <a
        href="#apply"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:inline-flex"
        style={{
          background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)`,
        }}
      >
        <Briefcase className="h-4 w-4" {...iconStrongProps} />
        Apply Now
      </a>

      <style>{css}</style>
    </div>
  );
}

function FloatingChip({ icon: Icon, title, desc, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="w-[240px] rounded-3xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur"
      style={{ boxShadow: "0 18px 60px rgba(0,0,0,0.28)" }}
    >
      <div className="flex items-start gap-3">
        <IconBadge color={color}>
          <Icon className="h-4 w-4" {...iconStrongProps} />
        </IconBadge>
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-xs text-white/65">{desc}</div>
        </div>
      </div>
    </motion.div>
  );
}

function DayCard({ day, title, icon: Icon, color }) {
  return (
    <div className="rounded-3xl bg-white/55 p-5 ring-1 ring-[#0B1220]/10">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">{day.toUpperCase()}</div>
        <IconBadge color={color}>
          <Icon className="h-4 w-4" {...iconStrongProps} />
        </IconBadge>
      </div>
      <div className="mt-2 text-sm font-semibold text-[#0B1220]">{title}</div>
    </div>
  );
}

function Bullet({ icon: Icon, text, color }) {
  return (
    <div className="flex items-start gap-3">
      <IconBadge color={color}>
        <Icon className="h-4 w-4" {...iconStrongProps} />
      </IconBadge>
      <div className="text-sm text-[#0B1220]/75">{text}</div>
    </div>
  );
}

function Field({ label, required, hint, children }) {
  return (
    <motion.label variants={fieldV} className="group block">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold text-[#0B1220]">
          {label} {required ? <span style={{ color: THEME.pink }}>*</span> : null}
        </div>
        {hint ? <div className="text-xs text-[#0B1220]/55">{hint}</div> : null}
      </div>

      <div className="relative">
        {children}

        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-focus-within:opacity-100"
          style={{
            boxShadow: "0 0 0 4px rgba(34,211,238,0.18), 0 20px 60px rgba(34,211,238,0.14)",
          }}
        />
      </div>
    </motion.label>
  );
}

function Input({ icon: Icon, iconColor = THEME.accent, className, ...props }) {
  const hasIcon = !!Icon;

  return (
    <div className="relative">
      {hasIcon ? (
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
          <Icon className="h-4 w-4" style={{ color: iconColor }} {...iconStrongProps} />
        </div>
      ) : null}

      <input
        {...props}
        className={cx(
          "w-full rounded-2xl px-4 py-3 text-sm outline-none ring-1 transition",
          "bg-white/60 text-[#0B1220] placeholder:text-[#0B1220]/40",
          "ring-[#0B1220]/10 hover:ring-[#0B1220]/20 focus:ring-2 focus:ring-[rgba(34,211,238,0.35)]",
          hasIcon ? "pl-11" : "",
          className
        )}
      />
    </div>
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className={cx(
        "w-full rounded-2xl px-4 py-3 text-sm outline-none ring-1 transition",
        "bg-white/60 text-[#0B1220] placeholder:text-[#0B1220]/40",
        "ring-[#0B1220]/10 hover:ring-[#0B1220]/20 focus:ring-2 focus:ring-[rgba(34,211,238,0.35)]"
      )}
      rows={4}
    />
  );
}

function Select({ value, onChange, options, icon: Icon, iconColor = THEME.accent }) {
  const hasIcon = !!Icon;

  return (
    <div className="relative">
      {hasIcon ? (
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
          <Icon className="h-4 w-4" style={{ color: iconColor }} {...iconStrongProps} />
        </div>
      ) : null}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cx(
          "w-full appearance-none rounded-2xl px-4 py-3 pr-10 text-sm outline-none ring-1 transition",
          "bg-white/60 text-[#0B1220]",
          "ring-[#0B1220]/10 hover:ring-[#0B1220]/20 focus:ring-2 focus:ring-[rgba(34,211,238,0.35)]",
          hasIcon ? "pl-11" : ""
        )}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0B1220]/55">
        <ChevronRight className="h-4 w-4 rotate-90" {...iconStrongProps} />
      </div>
    </div>
  );
}

function FilePicker({ onFile }) {
  return (
    <div className="relative">
      <input id="cv" type="file" className="hidden" onChange={(e) => onFile?.(e.target.files?.[0] || null)} />

      <label
        htmlFor="cv"
        className="group relative flex cursor-pointer items-center justify-between rounded-2xl bg-white/60 px-4 py-4 ring-1 ring-[#0B1220]/10 transition hover:ring-[#0B1220]/20"
      >
        <div className="flex items-center gap-3">
          <IconBadge color={THEME.accent3}>
            <FileCheck2 className="h-4 w-4" {...iconStrongProps} />
          </IconBadge>
          <div>
            <div className="text-sm font-semibold text-[#0B1220]">Upload your CV</div>
            <div className="text-xs text-[#0B1220]/55">PDF preferred - optional</div>
          </div>
        </div>

        <span
          className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
          style={{
            background: "rgba(11,18,32,0.06)",
            borderColor: "rgba(11,18,32,0.10)",
            color: "rgba(11,18,32,0.70)",
          }}
        >
          Choose file
        </span>

        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="shine" />
        </div>
      </label>
    </div>
  );
}

const css = `
  .light-streak{
    position:absolute;
    inset:-20% -10%;
    background: linear-gradient(120deg,
      transparent 0%,
      rgba(233,231,223,0.05) 20%,
      rgba(255,255,255,0.10) 35%,
      transparent 55%);
    transform: translateX(-30%) rotate(-10deg);
    filter: blur(2px);
    animation: streak 7.5s ease-in-out infinite;
    opacity: 0.35;
  }
  @keyframes streak{
    0%{ transform: translateX(-35%) rotate(-10deg); }
    50%{ transform: translateX(25%) rotate(-10deg); }
    100%{ transform: translateX(-35%) rotate(-10deg); }
  }

  /* Program card shine */
  .shine{
    position:absolute;
    inset:-30% -30%;
    background: linear-gradient(120deg,
      transparent 0%,
      rgba(255,255,255,0.05) 35%,
      rgba(255,255,255,0.10) 45%,
      transparent 60%);
    transform: translateX(-25%) rotate(-10deg);
    filter: blur(1px);
    animation: shineMove 5.6s ease-in-out infinite;
    opacity: 0.35;
  }
  @keyframes shineMove{
    0%{ transform: translateX(-30%) rotate(-10deg); }
    50%{ transform: translateX(25%) rotate(-10deg); }
    100%{ transform: translateX(-30%) rotate(-10deg); }
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .include-pill{
    position: relative;
    overflow: hidden;
    transition: transform 220ms ease, filter 220ms ease;
  }
  .include-pill:hover{
    transform: translateY(-1px);
    filter: brightness(1.04);
  }
  .include-pill-accent::after{
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.20) 45%, transparent 70%);
    transform: translateX(-120%);
    animation: includeShine 3.2s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes includeShine{
    0%, 62%, 100%{ transform: translateX(-120%); }
    78%{ transform: translateX(120%); }
  }
  @keyframes gradMove{
    0%{ background-position: 0% 50%; }
    50%{ background-position: 100% 50%; }
    100%{ background-position: 0% 50%; }
  }
`;

