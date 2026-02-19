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
  deep: "#0B1220",
  slate: "#1E2A3A",
  sand: "#E9E7DF",
  accent: "#22D3EE",
  accent2: "#A78BFA",
  accent3: "#34D399",
  accent4: "#F59E0B",
  pink: "#C91D67",
  star: "#F5D66B",
};

const DARK_SECTION_BG = "linear-gradient(90deg, #050B1F 0%, #071A3E 100%)";
const ACCENT_RGB = "201,29,103";
const accent = (a) => `rgba(${ACCENT_RGB}, ${a})`;

const POWER_ICON_SHELL = {
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
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
    transition: {
      duration: 0.55,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
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

const iconStrongProps = { strokeWidth: 2.4 };

function IconBadge({ color, children }) {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl ring-1" style={POWER_ICON_SHELL}>
      <span style={{ color }}>{children}</span>
    </span>
  );
}

function SectionTitle({ eyebrow, title, accentText, subtitle, dark }) {
  return (
    <div className={cx("mx-auto max-w-5xl", dark ? "text-white" : "text-[#0B1220]")}>
      {eyebrow ? (
        <div
          className={cx(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-widest",
            dark
              ? "bg-white/10 text-white/80 ring-1 ring-white/10"
              : "bg-[#0B1220]/5 text-[#0B1220]/70 ring-1 ring-[#0B1220]/10"
          )}
        >
          <Sparkles className="h-4 w-4" style={{ color: THEME.accent }} {...iconStrongProps} />
          <span>{eyebrow}</span>
        </div>
      ) : null}

      <h2
        className={cx(
          eyebrow ? "mt-5 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl" : "mt-0 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-[#0B1220]"
        )}
      >
        {title}{" "}
        {accentText ? (
          <span style={{ color: THEME.pink }}>{accentText}</span>
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
          style={{ color: THEME.star, fill: filled ? THEME.star : "transparent" }}
          strokeWidth={2.2}
        />
      </span>
    );
  });
  return <div className="flex items-center gap-1">{stars}</div>;
}

function clampStyle(lines) {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
    overflow: "hidden",
  };
}

/** ---- IMAGES (simple, relevant, and “alive”) ---- */
const IMAGES = {
  heroMain: "/istockphoto-471247592-612x612.jpg",
  mosaic: [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=60",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=60",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=60",
  ],
  germany: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1400&q=60",
  mentors: [
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=800&q=60",
  ],
};

function MiniMosaic() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      {IMAGES.mosaic.slice(0, 4).map((src, i) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 + i * 0.06 }}
          className="relative overflow-hidden rounded-3xl ring-1 ring-white/10"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <img src={src} alt="Project moment" className="h-[120px] w-full object-cover" />
        </motion.div>
      ))}
    </div>
  );
}

function MentorRow() {
  return (
    <div className="mt-8 rounded-[36px] bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold tracking-widest text-white/60">MENTORS</div>
          <div className="mt-1 text-sm font-semibold text-white">European experts + professors</div>
        </div>
        <div className="hidden rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-white/15 text-white/80 sm:inline-flex">
          Live reviews • weekly feedback
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
        {IMAGES.mentors.map((src, i) => (
          <motion.div
            key={src}
            className="relative shrink-0"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 + i * 0.05 }}
          >
            <div className="h-12 w-12 overflow-hidden rounded-full ring-1 ring-white/15">
              <img src={src} alt="Mentor" className="h-full w-full object-cover" />
            </div>
            <div className="pointer-events-none absolute -bottom-2 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full blur-2xl" style={{ background: "rgba(34,211,238,0.18)" }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** ---- DATA (now includes cover images) ---- */
const categories = [
  {
    key: "eng",
    label: "Engineering & Technology",
    kicker: "Production-grade technical execution with verified outputs",
    programs: [
      {
        name: "Software Engineering (Frontend / Backend / Full Stack)",
        description:
          "Skills you'll gain: System architecture, API development, database integration, cloud deployment, Git workflows, and production-ready coding standards.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Industry Mentor Rating",
        rating: 4.9,
        includes: ["Real Client Project", "Portfolio Deployment", "Expert Evaluation"],
        deliverable: "Live product build with documented engineering review",
        careers: ["Frontend Engineer", "Backend Engineer", "Full Stack Developer"],
        icon: Zap,
        accent: THEME.accent,
        accentSoft: "rgba(34,211,238,0.18)",
        cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Cloud & DevOps Engineering",
        description:
          "Skills you'll gain: Cloud infrastructure setup, CI/CD pipelines, containerization, Kubernetes orchestration, monitoring systems, and scalable deployment models.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Industry Mentor Rating",
        rating: 4.8,
        includes: ["Deployed Cloud System", "DevOps Workflow Portfolio"],
        deliverable: "Operational cloud environment with CI/CD deployment workflow",
        careers: ["Cloud Engineer", "DevOps Engineer", "Site Reliability Engineer"],
        icon: LineChart,
        accent: THEME.accent3,
        accentSoft: "rgba(52,211,153,0.16)",
        cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Digital Twin Engineering",
        description: "Skills you'll gain: System simulation, IoT integration, predictive analytics, digital modeling, and AI optimization.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Industry Mentor Rating",
        rating: 4.9,
        includes: ["Functional Digital Twin Prototype", "Executive Demo Presentation"],
        deliverable: "Functional digital twin prototype with executive-level demo",
        careers: ["Digital Twin Analyst", "Simulation Engineer", "IoT Solutions Associate"],
        icon: Boxes,
        accent: THEME.accent2,
        accentSoft: "rgba(167,139,250,0.18)",
        cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Data Analysis & Business Intelligence",
        description:
          "Skills you'll gain: Data cleaning, SQL modeling, dashboard development, predictive analysis, executive reporting, and data storytelling.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Mentor Evaluation Score",
        rating: 4.9,
        includes: ["Interactive Dashboard", "Insight Report"],
        deliverable: "Interactive dashboard and executive insight report",
        careers: ["Data Analyst", "BI Analyst", "Reporting Specialist"],
        icon: Target,
        accent: THEME.accent4,
        accentSoft: "rgba(245,158,11,0.16)",
        cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Cybersecurity",
        description:
          "Skills you'll gain: Vulnerability assessment, encryption layers, authentication systems, penetration basics, and security reporting.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Industry Mentor Rating",
        rating: 4.9,
        includes: ["Security Audit", "Hardened System Framework"],
        deliverable: "Security audit report with hardened architecture framework",
        careers: ["Cybersecurity Analyst", "SOC Analyst", "Application Security Associate"],
        icon: Shield,
        accent: THEME.accent2,
        accentSoft: "rgba(167,139,250,0.18)",
        cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Mobile App Development",
        description:
          "Skills you'll gain: Cross-platform development, API integration, performance optimization, deployment pipelines, and push notification systems.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Mentor Rating",
        rating: 4.8,
        includes: ["Functional Mobile Application", "Deployment Demo"],
        deliverable: "Functional mobile app with deployment demonstration",
        careers: ["Mobile Developer", "React Native Developer", "Flutter Developer"],
        icon: Laptop,
        accent: THEME.accent,
        accentSoft: "rgba(34,211,238,0.18)",
        cover: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Web Development Internship",
        description:
          "Skills you'll gain: Responsive layout engineering, backend integration, CMS systems, SEO optimization, and cross-device testing.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Professional Rating",
        rating: 4.7,
        includes: ["Live Website", "CMS Deployment"],
        deliverable: "Live website with CMS deployment and performance checks",
        careers: ["Web Developer", "Frontend Developer", "CMS Specialist"],
        icon: Globe2,
        accent: THEME.accent3,
        accentSoft: "rgba(52,211,153,0.16)",
        cover: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "AI & Machine Learning Internship",
        description:
          "Skills you'll gain: Machine learning modeling, model optimization, AI deployment as APIs, explainable AI frameworks, and real-world automation systems.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "AI Expert Rating",
        rating: 4.9,
        includes: ["AI-Powered Application", "Model Performance Report"],
        deliverable: "AI-powered application with model performance report",
        careers: ["Machine Learning Engineer", "AI Engineer", "Applied Data Scientist"],
        icon: Flame,
        accent: THEME.accent4,
        accentSoft: "rgba(245,158,11,0.16)",
        cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Game Development Internship",
        description: "Skills you'll gain: Gameplay mechanics, physics engines, level design, AI integration, and performance tuning.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Industry Rating",
        rating: 4.7,
        includes: ["Playable Demo", "Game Prototype"],
        deliverable: "Playable game demo with optimized core mechanics",
        careers: ["Game Developer", "Gameplay Programmer", "Interactive Systems Developer"],
        icon: Rocket,
        accent: THEME.accent2,
        accentSoft: "rgba(167,139,250,0.18)",
        cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1400&q=60",
      },
    ],
  },
  {
    key: "digital",
    label: "Digital & Innovation",
    kicker: "Design, growth, and transformation execution tracks",
    programs: [
      {
        name: "UI/UX Product Design",
        description:
          "Skills you'll gain: User research, wireframing, prototyping, usability testing, interface systems, and product validation methods.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Expert Rating",
        rating: 4.8,
        includes: ["High-Fidelity Prototype", "Design Case Study"],
        deliverable: "High-fidelity prototype with complete design case study",
        careers: ["UI/UX Designer", "Product Designer", "UX Research Associate"],
        icon: PenTool,
        accent: THEME.accent2,
        accentSoft: "rgba(167,139,250,0.18)",
        cover: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Digital Transformation",
        description:
          "Skills you'll gain: Workflow analysis, automation strategy, digital tool selection, efficiency mapping, and transformation roadmapping.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Mentor Evaluation Score",
        rating: 4.8,
        includes: ["Transformation Roadmap", "Executive Presentation"],
        deliverable: "Digital transformation roadmap with executive presentation",
        careers: ["Transformation Analyst", "Operations Analyst", "Business Analyst"],
        icon: Building2,
        accent: THEME.accent3,
        accentSoft: "rgba(52,211,153,0.16)",
        cover: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Digital Marketing",
        description:
          "Skills you'll gain: Campaign optimization, funnel design, A/B testing, performance analytics, and conversion strategy.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Mentor Rating",
        rating: 4.8,
        includes: ["Performance Campaign Report"],
        deliverable: "Performance campaign report with optimization roadmap",
        careers: ["Performance Marketer", "Growth Analyst", "Marketing Specialist"],
        icon: Megaphone,
        accent: THEME.accent,
        accentSoft: "rgba(34,211,238,0.18)",
        cover: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Content Writing Internship",
        description: "Skills you'll gain: Professional copywriting, SEO structuring, content optimization, and editorial workflows.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Editorial Rating",
        rating: 4.7,
        includes: ["Published Portfolio Collection"],
        deliverable: "Published content portfolio with SEO optimization proof",
        careers: ["Content Writer", "SEO Copywriter", "Content Strategist"],
        icon: FileCheck2,
        accent: THEME.accent4,
        accentSoft: "rgba(245,158,11,0.16)",
        cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=60",
      },
    ],
  },
  {
    key: "biz",
    label: "Business & Strategy",
    kicker: "Business execution systems with measurable strategic output",
    programs: [
      {
        name: "Business Development",
        description: "Skills you'll gain: Market research, partnership mapping, revenue modeling, and strategic expansion frameworks.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Industry Rating",
        rating: 4.8,
        includes: ["Expansion Strategy Report"],
        deliverable: "Expansion strategy report with opportunity map",
        careers: ["Business Development Associate", "Partnerships Associate", "Growth Associate"],
        icon: Handshake,
        accent: THEME.accent3,
        accentSoft: "rgba(52,211,153,0.16)",
        cover: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Business Consulting",
        description:
          "Skills you'll gain: Financial diagnostics, strategic analysis, executive reporting, and performance benchmarking.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Consulting Rating",
        rating: 4.8,
        includes: ["Consulting Report", "Executive Presentation"],
        deliverable: "Consulting report with board-style executive presentation",
        careers: ["Business Analyst", "Consulting Associate", "Strategy Analyst"],
        icon: Compass,
        accent: THEME.accent2,
        accentSoft: "rgba(167,139,250,0.18)",
        cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Project Management",
        description:
          "Skills you'll gain: Milestone planning, stakeholder communication, risk management, and project documentation systems.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Professional Rating",
        rating: 4.8,
        includes: ["Execution Plan", "Project Documentation"],
        deliverable: "Execution plan with full project governance documentation",
        careers: ["Project Coordinator", "Junior Project Manager", "Delivery Associate"],
        icon: ListChecks,
        accent: THEME.accent,
        accentSoft: "rgba(34,211,238,0.18)",
        cover: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Entrepreneurship & Startup Building",
        description: "Skills you'll gain: MVP development, business validation, revenue strategy design, and investor pitch structuring.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Innovation Mentor Rating",
        rating: 4.9,
        includes: ["Startup Prototype", "Investor Pitch Deck"],
        deliverable: "Validated startup prototype and investor-ready pitch deck",
        careers: ["Startup Founder", "Venture Analyst", "Innovation Associate"],
        icon: Rocket,
        accent: THEME.accent2,
        accentSoft: "rgba(167,139,250,0.18)",
        cover: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Sales & Marketing",
        description: "Skills you'll gain: CRM processes, lead prospecting, pitch design, and structured revenue strategies.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Industry Rating",
        rating: 4.7,
        includes: ["Sales Strategy Model"],
        deliverable: "Sales pipeline model with conversion strategy plan",
        careers: ["Sales Analyst", "Revenue Operations Associate", "Growth Executive"],
        icon: Megaphone,
        accent: THEME.accent3,
        accentSoft: "rgba(52,211,153,0.16)",
        cover: "https://images.unsplash.com/photo-1553484771-cc0d9b8c2b33?auto=format&fit=crop&w=1400&q=60",
      },
    ],
  },
  {
    key: "fin",
    label: "Finance & Economics",
    kicker: "Financial systems, digital markets, and operational economics",
    programs: [
      {
        name: "Finance & Financial Modeling",
        description: "Skills you'll gain: Financial forecasting, risk modeling, investment analysis, and budgeting frameworks.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Financial Expert Rating",
        rating: 4.8,
        includes: ["Financial Model", "Investment Scenario Analysis"],
        deliverable: "Financial model and investment scenario presentation",
        careers: ["Financial Analyst", "Investment Analyst", "Corporate Finance Associate"],
        icon: Wallet,
        accent: THEME.accent4,
        accentSoft: "rgba(245,158,11,0.16)",
        cover: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "FinTech Engineering",
        description:
          "Skills you'll gain: Financial modeling, dashboard development, risk simulation, payment logic systems, and fintech architecture basics.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Financial Tech Rating",
        rating: 4.8,
        includes: ["FinTech Prototype", "Financial Dashboard"],
        deliverable: "Functional fintech prototype with decision dashboard",
        careers: ["FinTech Analyst", "Product Analyst", "Financial Systems Associate"],
        icon: Wallet,
        accent: THEME.accent,
        accentSoft: "rgba(34,211,238,0.18)",
        cover: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Supply Chain Management Internship",
        description: "Skills you'll gain: Demand forecasting, bottleneck analysis, inventory optimization, and operational modeling.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Industry Rating",
        rating: 4.7,
        includes: ["Operational Efficiency Report"],
        deliverable: "Operational efficiency report with optimization roadmap",
        careers: ["Supply Chain Analyst", "Operations Analyst", "Logistics Associate"],
        icon: Boxes,
        accent: THEME.accent3,
        accentSoft: "rgba(52,211,153,0.16)",
        cover: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Digital Economics",
        description: "Skills you'll gain: Platform economy analysis, ecosystem modeling, digital market forecasting, and economic reporting.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Research Rating",
        rating: 4.7,
        includes: ["Market Research Study"],
        deliverable: "Digital market research study with forecast scenarios",
        careers: ["Economic Analyst", "Research Associate", "Policy Analyst"],
        icon: LineChart,
        accent: THEME.accent2,
        accentSoft: "rgba(167,139,250,0.18)",
        cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Digital Health Management Internship",
        description:
          "Skills you'll gain: Healthcare KPI analysis, patient data dashboards, workflow optimization, and digital service mapping.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Expert Rating",
        rating: 4.8,
        includes: ["Health Management Dashboard"],
        deliverable: "Health management dashboard with service optimization insights",
        careers: ["Health Operations Analyst", "Healthcare Data Associate", "Digital Health Coordinator"],
        icon: HeartPulse,
        accent: THEME.accent4,
        accentSoft: "rgba(245,158,11,0.16)",
        cover: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=60",
      },
    ],
  },
];

function LevelPill({ level, color }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold ring-1"
      style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)" }}
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
      className={cx("group relative w-[380px] md:w-[420px] shrink-0 overflow-hidden rounded-3xl ring-1", "bg-white/5 backdrop-blur")}
      style={{ borderColor: "rgba(255,255,255,0.10)", boxShadow: "0 18px 70px rgba(0,0,0,0.35)" }}
    >
      {/* Top accent */}
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

      <div className="relative flex h-[710px] flex-col p-5">
        {/* Cover image */}
        <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10">
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
          <img
            src={program.cover}
            alt={`${program.name} cover`}
            className="w-full object-cover"
            style={{ height: 300, objectPosition: program.coverPosition || "center" }}
          />
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <IconBadge color={program.accent}>
              <Icon className="h-4.5 w-4.5" {...iconStrongProps} />
            </IconBadge>
            <LevelPill level={program.level} color={program.accent} />
          </div>
        </div>

        {/* Rating */}
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="text-xs font-semibold text-white/55"> </div>
          <div className="text-right">
            <div className="text-xs font-semibold text-white/55">{program.ratingLabel}</div>
            <div className="mt-1 flex items-center justify-end gap-2">
              <StarRow rating={program.rating} />
              <span className="text-sm font-semibold text-white">{program.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Main text */}
        <div className="mt-3">
          <div className="text-lg font-semibold text-white" style={clampStyle(2)}>
            {program.name}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/70" style={clampStyle(3)}>
            {program.description}
          </p>
        </div>

        {/* Metrics */}
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

        {/* Deliverable */}
        <div className="mt-4 rounded-2xl p-3 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="text-xs font-semibold tracking-widest text-white/55">DELIVERABLE</div>
          <div className="mt-1 text-sm font-semibold text-white" style={clampStyle(2)}>
            {program.deliverable}
          </div>
        </div>

        {/* Careers */}
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

        {/* Bottom */}
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition-all hover:bg-white/5"
              onClick={() => alert("Hook up to a program details route/modal.")}
            >
              View Details
              <ChevronRight className="h-4 w-4" {...iconStrongProps} />
            </button>
            <div className="text-xs font-semibold text-white/55">Includes:</div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {program.includes.map((i, includeIdx) => (
              <span
                key={i}
                className="include-pill rounded-full px-3 py-1 text-xs font-semibold ring-1"
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
        background: isPink
          ? "linear-gradient(135deg, #C91D67 0%, #B3175A 100%)"
          : isBlue
          ? "linear-gradient(135deg, #061A3B 0%, #0A2A4F 100%)"
          : "rgba(255,255,255,0.55)",
        borderColor: isPink || isBlue ? "rgba(255,255,255,0.12)" : "rgba(11,18,32,0.10)",
      }}
    >
      {isPink ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.20) 0px, rgba(255,255,255,0.20) 14px, transparent 14px, transparent 30px)",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-3 left-6 h-40 w-20 opacity-[0.16]"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.40), transparent 70%)", transform: "skewX(-18deg)" }}
          />
        </>
      ) : null}

      {isBlue ? (
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-[0.5]"
          style={{
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 0 0 18px rgba(255,255,255,0.05), 0 0 0 36px rgba(255,255,255,0.03)",
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
              style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.10)" }}
            >
              <span className="h-2 w-2 rounded-full bg-white/90" />
            </span>
            <div className={cx("text-sm", isPink || isBlue ? "text-white/85" : "text-[#0B1220]/75")}>{b}</div>
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: isPink ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.10)" }}
      />
    </div>
  );
}

function Timeline() {
  const steps = [
    { title: "Apply & Assessment", desc: "Readiness screening and capability assessment.", icon: ClipboardCheck, color: THEME.accent },
    { title: "Track Placement", desc: "Placement into the best-fit internship category.", icon: Compass, color: THEME.accent2 },
    { title: "Real Project Execution", desc: "Real project delivery under expert supervision.", icon: Briefcase, color: THEME.accent3 },
    { title: "Final Evaluation & Portfolio Delivery", desc: "Documented evaluation and portfolio-ready outputs.", icon: FileCheck2, color: THEME.accent4 },
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
              className="relative rounded-[36px] bg-white/55 p-5 sm:p-6 ring-1 ring-[#0B1220]/10"
            >
              <div className="flex items-center gap-4">
                <div>
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
    { label: "Interns Trained", value: 1200, suffix: "+", hint: "Structured internship execution", icon: GraduationCap, color: THEME.accent },
    { label: "Built Job-Ready Portfolios", value: 87, suffix: "%", hint: "Portfolio-ready professional outputs", icon: FileCheck2, color: THEME.accent4 },
    { label: "Secured Career Opportunities", value: 72, suffix: "%", hint: "Within 6 months of completion", icon: Briefcase, color: THEME.accent3 },
    { label: "European Mentors & Professors", value: 40, suffix: "+", hint: "Active practitioners and academic experts", icon: BadgeCheck, color: THEME.accent2 },
  ];

  const proofs = [
    { title: "Real performance", desc: "Real scopes, constraints, and stakeholder expectations.", icon: Building2, color: THEME.accent },
    { title: "Real outcomes", desc: "Documented performance + improvement loops.", icon: ClipboardCheck, color: THEME.accent3 },
    { title: "Verified impact", desc: "Portfolio-ready outputs that hiring teams can validate.", icon: FileCheck2, color: THEME.accent4 },
  ];

  return (
    <div className="mt-6 sm:mt-8">
      <div
        className="relative overflow-hidden rounded-[36px] ring-1 ring-white/10"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)", boxShadow: "0 26px 90px rgba(0,0,0,0.35)" }}
      >
        {/* Soft glow */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(34,211,238,0.16)" }} />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(167,139,250,0.14)" }} />

        <div className="relative p-6 sm:p-8">
          {/* Stats grid */}
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
                  style={{ background: "rgba(255,255,255,0.03)" }}
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

                    <div className="hidden sm:block">
                      <div className="h-12 w-1 rounded-full" style={{ background: s.color, opacity: 0.65 }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Proof row */}
          <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
            {proofs.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.22 + i * 0.06 }}
                  className="rounded-3xl px-5 py-4 ring-1 ring-white/10 sm:px-6 sm:py-5"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div className="flex items-center gap-3">
                    <IconBadge color={p.color}>
                      <Icon className="h-4 w-4" {...iconStrongProps} />
                    </IconBadge>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">{p.title}</div>
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
  const [persona, setPersona] = useState("University Student");
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
    const dx = dir === "left" ? -380 : 380;
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
        {/* extra alive blobs */}
        <motion.div
          className="absolute -left-28 top-24 h-80 w-80 rounded-full blur-3xl"
          animate={{ y: [0, 18, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "rgba(34,211,238,0.10)" }}
        />
        <motion.div
          className="absolute -right-28 bottom-10 h-80 w-80 rounded-full blur-3xl"
          animate={{ y: [0, -16, 0], x: [0, -12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "rgba(167,139,250,0.10)" }}
        />
      </div>

      {/* HERO (navbar removed + tighter top padding) */}
      <section id="overview" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 pt-5 pb-14 lg:grid-cols-2 lg:pt-8 lg:pb-18">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <h1 className="mt-2 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              Build Experience. <br /> Launch Your Career With Proof.
            </h1>

            <p className="mt-5 max-w-xl text-balance text-base text-white/70 sm:text-lg">
              Real industry internships supervised by European experts and university professors.
            </p>

            <p className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-white/65">
              We bridge the gap between academic theory and real market execution through structured, project-based internships.
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

          </motion.div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-[560px] min-h-[290px] sm:min-h-[340px]">
              <div
                className="absolute inset-0 rounded-[44px] ring-1 ring-white/10"
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)" }}
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
                    style={{ background: "radial-gradient(circle at 30% 30%, rgba(233,231,223,0.22), rgba(11,18,32,0.82))" }}
                  >
                    <img src={IMAGES.heroMain} alt="Hero visual" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                </motion.div>
              </div>

              {/* Floating chips */}
              <div className="absolute left-6 top-10 hidden space-y-3 sm:left-10 sm:top-12 sm:block">
                <FloatingChip icon={Zap} title="Real client brief" desc="Industry project scope" color={THEME.accent} />
                <FloatingChip icon={ClipboardCheck} title="Weekly reviews" desc="Mentor feedback loop" color={THEME.accent3} />
                <FloatingChip icon={FileCheck2} title="Portfolio output" desc="Deliverable-ready" color={THEME.accent4} />
              </div>

            </div>

          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="The Gap Between Study and Employment"
            subtitle="Universities teach knowledge. The market demands capability. Our internships convert academic knowledge into measurable professional execution."
          />

          <div className="relative mt-10 overflow-hidden">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <SplitCard
                title="University classroom"
                icon={<GraduationCap className="h-5 w-5" {...iconStrongProps} />}
                bullets={["Theory-heavy learning", "Limited exposure to real delivery", "Few performance signals"]}
                tone="light"
              />
              <SplitCard
                title="Real company office"
                icon={<Briefcase className="h-5 w-5" {...iconStrongProps} />}
                bullets={["Execution under constraints", "Output + iteration", "Clear ownership & accountability"]}
                tone="dark"
              />
            </div>
          </div>

        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div ref={impact.ref} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Impact & Numbers"
            subtitle={null}
            dark
          />
          <ImpactPanel inView={impact.inView} />
        </div>
      </section>

      {/* HOW IT WORKS (subtitle removed as requested) */}
      <section
        className="relative"
        style={{
          background: "linear-gradient(180deg, rgba(233,231,223,1) 0%, rgba(233,231,223,0.85) 100%)",
          color: THEME.deep,
        }}
      >
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle title="How Our Internships Work" subtitle={null} />
          <div className="mt-10">
            <Timeline />
          </div>
        </div>
      </section>

      {/* PROGRAMS (subtitle removed as requested) */}
      <section id="programs" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <div className="mt-2 flex flex-col gap-5 sm:mt-4">
            {/* Tabs */}
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
                        active ? "text-white ring-white/15" : "text-white/70 hover:bg-white/5 ring-white/10"
                      )}
                      style={
                        active
                          ? { background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 75%)` }
                          : undefined
                      }
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected category */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-xl font-semibold text-white">{cat.label}</div>
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

              <div ref={sliderRef} className="no-scrollbar flex gap-5 overflow-x-auto pb-2" style={{ scrollSnapType: "x mandatory" }}>
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
          <SectionTitle
            title="Outstanding Teams Get Invited to Germany"
            subtitle="Top-performing teams receive an exclusive 4-day professional visit to Germany."
          />

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
                    style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)` }}
                  >
                    Learn About International Opportunities <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="relative h-full overflow-hidden rounded-[36px] ring-1 ring-[#0B1220]/10">
                <img src={IMAGES.germany} alt="Germany visit" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION FORM (footnote removed as requested) */}
      <section id="apply" className="relative" style={{ background: "rgba(233,231,223,1)", color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle title="Apply for an Industry Internship" subtitle="Start building real experience today." />

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
                      <Field label="Are You?">
                        <Select icon={GraduationCap} iconColor={THEME.accent3} value={persona} onChange={setPersona} options={["University Student", "Graduate"]} />
                      </Field>
                      <Field label="Current Academic Year" hint={persona === "Graduate" ? "(hidden for graduates)" : undefined}>
                        {persona === "University Student" ? (
                          <Select icon={Calendar} iconColor={THEME.accent} value={year} onChange={setYear} options={["1st", "2nd", "3rd", "Final Year"]} />
                        ) : (
                          <div className="rounded-2xl bg-white/50 px-4 py-3 text-sm text-[#0B1220]/60 ring-1 ring-[#0B1220]/10">Not applicable</div>
                        )}
                      </Field>
                    </div>

                    <Field label="Field of Study / Specialization">
                      <Input icon={Sparkles} iconColor={THEME.accent2} placeholder="e.g., Software Engineering, Business, Finance" />
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
                        <Select icon={Calendar} iconColor={THEME.accent} value="Within 1 Month" onChange={() => null} options={["Immediately", "Within 1 Month", "Within 2-3 Months"]} />
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
                        style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)` }}
                      >
                        <span className="relative z-10">{submitting ? "Submitting..." : "Submit Application"}</span>
                        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 hover:opacity-100">
                          <span className="shine" />
                        </span>
                      </motion.button>
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
                <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">WHY PRAKTIX IS DIFFERENT</div>
                <div className="mt-2 text-2xl font-semibold leading-tight">Structured, measurable internship capability.</div>

                <div className="mt-5 space-y-3">
                  <Bullet icon={ClipboardCheck} text="Structured Supervision: Industry experts + European professors" color={THEME.accent4} />
                  <Bullet icon={Briefcase} text="Real Production-Level Projects: No simulations. No fake assignments" color={THEME.accent3} />
                  <Bullet icon={FileCheck2} text="Measurable Output: Portfolio-ready deliverables" color={THEME.accent} />
                  <Bullet icon={BadgeCheck} text="Professional Evaluation: Documented performance reports" color={THEME.accent2} />
                </div>

                <div className="mt-7 rounded-3xl bg-white/55 p-5 ring-1 ring-[#0B1220]/10">
                  <div className="text-sm font-semibold">Selected track</div>
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
              style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 100%)`, boxShadow: "0 24px 90px rgba(0,0,0,0.16)" }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.16]"
                style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)" }}
              />
              <div className="relative mx-auto max-w-6xl text-white">
                <div className="text-xs font-semibold text-white/80 sm:text-sm">High credibility • European-standard • outcome-focused</div>
                <div className="mt-3 text-3xl font-semibold md:text-4xl">
                  Ready to Build Real Capability?
                </div>
                <p className="mx-auto mt-4 max-w-4xl text-sm font-medium text-white/80">
                  Start your internship journey with structured programs and measurable professional output.
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
        style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)` }}
      >
        <Briefcase className="h-4 w-4" {...iconStrongProps} /> Apply Now
      </a>

      <style>{css}</style>
    </div>
  );
}

/** ---- Small Components ---- */
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
          style={{ boxShadow: "0 0 0 4px rgba(34,211,238,0.18), 0 20px 60px rgba(34,211,238,0.14)" }}
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
            <div className="text-xs text-[#0B1220]/55">PDF preferred — optional</div>
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

/** ---- CSS ---- */
const css = `
.light-streak{
  position:absolute;
  inset:-20% -10%;
  background: linear-gradient(120deg, transparent 0%, rgba(233,231,223,0.05) 20%, rgba(255,255,255,0.10) 35%, transparent 55%);
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
  background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.10) 45%, transparent 60%);
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

.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }

.include-pill{ position: relative; overflow: hidden; transition: transform 220ms ease, filter 220ms ease; }
.include-pill:hover{ transform: translateY(-1px); filter: brightness(1.04); }

.include-pill::after{
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
