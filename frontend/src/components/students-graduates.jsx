import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
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
  X,
} from "lucide-react";

/**
 * IMPORTANT:
 * Keep these EXACTLY as-is from your original code (do not change data/colors):
 * - THEME
 * - DARK_SECTION_BG
 * - ACCENT_RGB + accent(a)
 * - IMAGES
 * - categories
 */

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

const IMAGES = {
  heroMain: "/istockphoto-471247592-612x612.jpg",
  germany: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1400&q=60",
};

const categories = [
  {
    key: "eng",
    label: "Engineering & Technology",
    kicker: "Production-grade technical execution with verified outputs",
    programs: [
      {
        name: "Software Engineering (Frontend / Backend / Full Stack)",
        description:
          "Build production-ready systems with APIs, databases, cloud deployment, and code review workflows.",
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
        cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Cloud & DevOps Engineering",
        description:
          "Design cloud infrastructure, CI/CD pipelines, containerized deployments, and monitoring systems.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Industry Mentor Rating",
        rating: 4.8,
        includes: ["Deployed Cloud System", "DevOps Workflow Portfolio"],
        deliverable: "Operational cloud environment with CI/CD workflow",
        careers: ["Cloud Engineer", "DevOps Engineer", "Site Reliability Engineer"],
        icon: LineChart,
        accent: THEME.accent3,
        cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "AI & Machine Learning Internship",
        description:
          "Train and deploy ML models, optimize inference performance, and ship applied AI solutions.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "AI Expert Rating",
        rating: 4.9,
        includes: ["AI-Powered Application", "Model Performance Report"],
        deliverable: "AI-powered application with model performance report",
        careers: ["AI Engineer", "ML Engineer", "Data Scientist"],
        icon: Flame,
        accent: THEME.accent2,
        cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=60",
      },
    ],
  },
  {
    key: "business",
    label: "Business, Finance & Consulting",
    kicker: "Commercial problem solving with measurable strategic outcomes",
    programs: [
      {
        name: "Business Consulting Internship",
        description:
          "Work on market analysis, growth strategy, customer segmentation, and executive recommendations.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Mentor Evaluation Score",
        rating: 4.8,
        includes: ["Strategic Plan", "Presentation Deck"],
        deliverable: "Client-ready growth strategy and executive presentation",
        careers: ["Business Analyst", "Consulting Associate", "Strategy Analyst"],
        icon: Target,
        accent: THEME.accent4,
        cover: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Financial Analysis & Planning",
        description:
          "Develop valuation models, forecasting sheets, and performance reporting with scenario planning.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Industry Mentor Rating",
        rating: 4.7,
        includes: ["Financial Model", "Investment Memo"],
        deliverable: "Decision-ready financial model and planning memo",
        careers: ["Financial Analyst", "FP&A Associate", "Investment Analyst"],
        icon: Wallet,
        accent: THEME.accent2,
        cover: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Marketing & Growth Operations",
        description:
          "Plan campaigns, analyze funnel data, and optimize growth with structured experimentation.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Campaign Performance Score",
        rating: 4.7,
        includes: ["Growth Plan", "Performance Dashboard"],
        deliverable: "Channel strategy with KPI dashboard and optimization loop",
        careers: ["Growth Analyst", "Marketing Associate", "Performance Specialist"],
        icon: Megaphone,
        accent: THEME.accent3,
        cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=60",
      },
    ],
  },
  {
    key: "health",
    label: "Digital Health & Emerging Fields",
    kicker: "Interdisciplinary internships for future-facing sectors",
    programs: [
      {
        name: "Digital Health Operations",
        description:
          "Improve workflows, metrics, and service quality in data-driven healthcare operations.",
        level: "Professional",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Mentor Evaluation Score",
        rating: 4.8,
        includes: ["Operational Dashboard", "Process Improvement Plan"],
        deliverable: "Healthcare KPI dashboard with process optimization roadmap",
        careers: ["Health Operations Analyst", "Digital Health Associate", "Program Coordinator"],
        icon: HeartPulse,
        accent: THEME.accent3,
        cover: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Product & Innovation Internship",
        description:
          "Translate user problems into feature roadmaps, prototypes, and measurable product outcomes.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Product Review Score",
        rating: 4.8,
        includes: ["Product Spec", "Prototype + Validation"],
        deliverable: "Validated product concept with roadmap and KPI framework",
        careers: ["Product Analyst", "Associate Product Manager", "Innovation Associate"],
        icon: Rocket,
        accent: THEME.accent,
        cover: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=60",
      },
      {
        name: "Research & Applied Innovation",
        description:
          "Structure applied research, develop experiments, and communicate findings for practical adoption.",
        level: "Advanced",
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        ratingLabel: "Supervisor Rating",
        rating: 4.7,
        includes: ["Research Brief", "Applied Prototype"],
        deliverable: "Applied research report with implementation recommendations",
        careers: ["Research Associate", "Innovation Analyst", "Program Researcher"],
        icon: PenTool,
        accent: THEME.accent2,
        cover: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1400&q=60",
      },
    ],
  },
];

const iconStrongProps = { strokeWidth: 2.4 };

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function clampStyle(lines) {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
    overflow: "hidden",
  };
}

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

function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
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

/* -------------------- Motion System -------------------- */
const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const POWER_ICON_SHELL = {
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
  border: "1px solid rgba(255,255,255,0.22)",
  boxShadow:
    "0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.20)",
};

function IconBadge({ color, children }) {
  return (
    <span
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl ring-1"
      style={POWER_ICON_SHELL}
    >
      <span style={{ color }}>{children}</span>
    </span>
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

function SectionHeader({ eyebrow, title, accentText, subtitle, dark }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      className={cx("mx-auto max-w-5xl", dark ? "text-white" : "text-[#0B1220]")}
    >
      {eyebrow ? (
        <motion.div
          variants={fadeUp}
          className={cx(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-widest",
            dark
              ? "bg-white/10 text-white/80 ring-1 ring-white/10"
              : "bg-[#0B1220]/5 text-[#0B1220]/70 ring-1 ring-[#0B1220]/10"
          )}
        >
          <Sparkles className="h-4 w-4" style={{ color: THEME.accent }} {...iconStrongProps} />
          <span>{eyebrow}</span>
        </motion.div>
      ) : null}

      <motion.h2
        variants={fadeUp}
        className={cx(
          eyebrow
            ? "mt-5 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
            : "mt-0 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-[#0B1220]"
        )}
      >
        {title}{" "}
        {accentText ? <span style={{ color: THEME.pink }}>{accentText}</span> : null}
      </motion.h2>

      {subtitle ? (
        <motion.p
          variants={fadeUp}
          className={cx(
            "mt-3 max-w-4xl text-balance text-base sm:text-lg",
            dark ? "text-white/70" : "text-[#0B1220]/70"
          )}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

/* -------------------- Background FX -------------------- */
function BackgroundFX() {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Mesh */}
      <div
        className="absolute inset-0 opacity-75"
        style={{
          background:
            "radial-gradient(1200px circle at 12% 12%, rgba(255,255,255,0.09), transparent 55%), radial-gradient(1000px circle at 85% 20%, rgba(233,231,223,0.06), transparent 58%), radial-gradient(900px circle at 60% 88%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233,231,223,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(233,231,223,0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(900px circle at 30% 20%, rgba(0,0,0,1), transparent 70%)",
        }}
      />
      {/* Aurora streak */}
      <div className="absolute inset-0 opacity-55">
        <div className="aurora-streak" />
      </div>

      {/* Blobs */}
      <motion.div
        className="absolute -left-28 top-24 h-96 w-96 rounded-full blur-3xl"
        animate={reduce ? {} : { y: [0, 22, 0], x: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "rgba(34,211,238,0.10)" }}
      />
      <motion.div
        className="absolute -right-28 bottom-10 h-96 w-96 rounded-full blur-3xl"
        animate={reduce ? {} : { y: [0, -20, 0], x: [0, -14, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "rgba(167,139,250,0.10)" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        animate={reduce ? {} : { scale: [1, 1.08, 1], opacity: [0.22, 0.35, 0.22] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: `radial-gradient(circle, ${accent(0.18)} 0%, transparent 60%)` }}
      />
    </div>
  );
}

/* -------------------- Hero -------------------- */
function HeroVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto w-full max-w-[600px] min-h-[330px] sm:min-h-[380px]">
      <div
        className="absolute inset-0 rounded-[48px] ring-1 ring-white/10"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 100%)",
        }}
      />

      {/* Orbit system */}
      <div className="absolute right-6 top-6 grid place-items-center sm:right-10 sm:top-10">
        <motion.div
          className="relative grid h-[250px] w-[250px] place-items-center rounded-full"
          animate={reduce ? {} : undefined}
          transition={reduce ? undefined : undefined}
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.16), transparent 58%), radial-gradient(circle at 70% 70%, rgba(233,231,223,0.10), transparent 55%), rgba(255,255,255,0.06)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.38)",
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "10px solid rgba(233,231,223,0.75)",
              opacity: 0.9,
              transform: "scale(0.92)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `8px solid ${accent(0.55)}`,
              opacity: 0.9,
              transform: "scale(1.02)",
            }}
          />

          {/* Orbiting dots */}
          <motion.div
            className="absolute inset-0"
            animate={reduce ? {} : { rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: i % 2 === 0 ? THEME.accent : THEME.accent2,
                  opacity: 0.55,
                  transform: `rotate(${i * 60}deg) translateX(118px)`,
                  boxShadow: "0 0 0 8px rgba(255,255,255,0.04)",
                }}
              />
            ))}
          </motion.div>

          <div
            className="relative h-[185px] w-[185px] overflow-hidden rounded-full ring-1 ring-white/15"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(233,231,223,0.22), rgba(11,18,32,0.82))",
            }}
          >
            <img src={IMAGES.heroMain} alt="Hero visual" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Floating chips */}
      <div className="absolute left-6 top-10 hidden space-y-3 sm:left-10 sm:top-12 sm:block">
        <FloatingChip icon={Zap} title="Real client brief" desc="Industry project scope" color={THEME.accent} />
        <FloatingChip icon={ClipboardCheck} title="Weekly reviews" desc="Mentor feedback loop" color={THEME.accent3} />
        <FloatingChip icon={FileCheck2} title="Portfolio output" desc="Deliverable-ready" color={THEME.accent4} />
      </div>

      {/* Bottom glow */}
      <div
        className="pointer-events-none absolute -bottom-16 left-1/2 h-40 w-[520px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent(0.18)} 0%, transparent 70%)` }}
      />
    </div>
  );
}

function FloatingChip({ icon: Icon, title, desc, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -14, y: 6, filter: "blur(6px)" }}
      animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.75, ease: EASE }}
      whileHover={{ y: -3, scale: 1.02 }}
      className="w-[250px] rounded-[28px] bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur"
      style={{ boxShadow: "0 18px 70px rgba(0,0,0,0.30)" }}
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

/* -------------------- Cards / UI -------------------- */
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

function SoftGlass({ children, className, style }) {
  return (
    <div
      className={cx("relative overflow-hidden rounded-[40px] ring-1 ring-white/10", className)}
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
        boxShadow: "0 28px 110px rgba(0,0,0,0.38)",
        ...style,
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 55%)" }} />
      {children}
    </div>
  );
}

/* -------------------- Program Modal -------------------- */
function ProgramModal({ open, program, onClose }) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && program ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: "rgba(0,0,0,0.62)" }}
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-3xl overflow-hidden rounded-[44px] ring-1 ring-white/10"
            initial={{ y: 18, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)",
              boxShadow: "0 40px 140px rgba(0,0,0,0.55)",
              backdropFilter: "blur(14px)",
            }}
          >
            {/* Cover */}
            <div className="relative h-[220px]">
              <img src={program.cover} alt={`${program.name} cover`} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute left-5 top-5 flex items-center gap-3">
                <IconBadge color={program.accent}>
                  <program.icon className="h-4.5 w-4.5" {...iconStrongProps} />
                </IconBadge>
                <LevelPill level={program.level} color={program.accent} />
              </div>

              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-white/15 text-white/85 hover:bg-white/10"
                aria-label="Close"
              >
                <X className="h-5 w-5" {...iconStrongProps} />
              </button>

              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-xl font-semibold text-white">{program.name}</div>
                <div className="mt-2 text-sm text-white/70">{program.description}</div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white/65">
                    <Calendar className="h-4 w-4" style={{ color: program.accent }} {...iconStrongProps} />
                    <span>Duration</span>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">{program.duration}</div>
                </div>
                <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white/65">
                    <GraduationCap className="h-4 w-4" style={{ color: program.accent }} {...iconStrongProps} />
                    <span>Intakes</span>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">{program.intakes}</div>
                </div>
                <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="text-xs font-semibold text-white/65">{program.ratingLabel}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <StarRow rating={program.rating} />
                    <span className="text-sm font-semibold text-white">{program.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                <div className="text-xs font-semibold tracking-widest text-white/55">DELIVERABLE</div>
                <div className="mt-2 text-sm font-semibold text-white">{program.deliverable}</div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                  <div className="text-xs font-semibold tracking-widest text-white/55">INCLUDES</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {program.includes.map((i, idx) => (
                      <span
                        key={i}
                        className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
                        style={{
                          ...(idx % 2 === 0
                            ? {
                                background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 100%)`,
                                color: "rgba(255,255,255,0.96)",
                                borderColor: "rgba(255,255,255,0.14)",
                              }
                            : {
                                background:
                                  "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
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

                <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                  <div className="text-xs font-semibold tracking-widest text-white/55">CAREER PATHS</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {program.careers.map((c) => (
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
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/5"
                >
                  Apply for this program <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white/85 ring-1 ring-white/15 transition hover:bg-white/5"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* -------------------- Program Card (New) -------------------- */
function ProgramCard({ program, index = 0, onOpen }) {
  const Icon = program.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: EASE, delay: Math.min(index * 0.03, 0.18) }}
      whileHover={{ y: -8, scale: 1.015 }}
      className="group relative w-[360px] md:w-[420px] shrink-0 overflow-hidden rounded-[34px] ring-1"
      style={{
        borderColor: "rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.04)",
        boxShadow: "0 22px 90px rgba(0,0,0,0.40)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Gradient top rail */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${program.accent} 0%, rgba(255,255,255,0.0) 80%)`,
          opacity: 0.95,
        }}
      />

      {/* Cover as stage */}
      <div className="relative h-[290px] overflow-hidden">
        <img
          src={program.cover}
          alt={`${program.name} cover`}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
          style={{ objectPosition: program.coverPosition || "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Header badges */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <IconBadge color={program.accent}>
            <Icon className="h-4.5 w-4.5" {...iconStrongProps} />
          </IconBadge>
          <LevelPill level={program.level} color={program.accent} />
        </div>

        {/* Rating */}
        <div className="absolute right-4 top-4 rounded-2xl bg-black/25 px-3 py-2 ring-1 ring-white/10 backdrop-blur">
          <div className="text-[11px] font-semibold text-white/65">{program.ratingLabel}</div>
          <div className="mt-1 flex items-center gap-2">
            <StarRow rating={program.rating} />
            <span className="text-sm font-semibold text-white">{program.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-lg font-semibold text-white" style={clampStyle(2)}>
            {program.name}
          </div>
          <div className="mt-2 text-sm text-white/70" style={clampStyle(2)}>
            {program.description}
          </div>
        </div>

        {/* Shine */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="card-shine" />
        </div>
      </div>

      {/* Body */}
      <div className="relative p-5">
        <div className="grid grid-cols-2 gap-3">
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

        <div className="mt-4 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
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

        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition-all hover:bg-white/5"
            onClick={() => onOpen?.(program)}
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
                      boxShadow: `0 10px 26px ${accent(0.18)}`,
                    }
                  : {
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
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
    </motion.div>
  );
}

/* -------------------- Split Panels (Problem) -------------------- */
function SplitCard({ title, bullets, icon, tone }) {
  const isPink = tone === "light";
  const isBlue = tone === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: EASE }}
      className={cx(
        "relative overflow-hidden rounded-[40px] p-7 ring-1",
        isPink || isBlue ? "text-white" : "text-[#0B1220]"
      )}
      style={{
        background: isPink
          ? "linear-gradient(135deg, #C91D67 0%, #B3175A 100%)"
          : isBlue
          ? "linear-gradient(135deg, #061A3B 0%, #0A2A4F 100%)"
          : "rgba(255,255,255,0.55)",
        borderColor: isPink || isBlue ? "rgba(255,255,255,0.12)" : "rgba(11,18,32,0.10)",
        boxShadow: "0 22px 80px rgba(0,0,0,0.18)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.16]" style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.22), transparent 60%)" }} />

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
        
          <div className={cx("mt-1 text-lg font-semibold", isPink || isBlue ? "text-white" : "text-[#0B1220]")}>
            {title}
          </div>
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
        className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full blur-3xl"
        style={{ background: isPink ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.10)" }}
      />
    </motion.div>
  );
}

/* -------------------- Timeline (Upgraded) -------------------- */
function Timeline() {
  const steps = [
    { title: "Apply & Assessment", desc: "Readiness screening and capability assessment.", icon: ClipboardCheck, color: THEME.accent },
    { title: "Track Placement", desc: "Placement into the best-fit internship category.", icon: Compass, color: THEME.accent2 },
    { title: "Real Project Execution", desc: "Real project delivery under expert supervision.", icon: Briefcase, color: THEME.accent3 },
    { title: "Final Evaluation & Portfolio Delivery", desc: "Documented evaluation and portfolio-ready outputs.", icon: FileCheck2, color: THEME.accent4 },
  ];

  return (
    <div className="relative">
      <div className="hidden sm:block">
        <div className="absolute left-1/2 top-6 h-[2px] w-[92%] -translate-x-1/2 rounded-full bg-[#0B1220]/10" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.05 }}
              className="relative overflow-hidden rounded-[36px] bg-white/55 p-6 ring-1 ring-[#0B1220]/10"
              style={{ boxShadow: "0 18px 60px rgba(0,0,0,0.10)" }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <IconBadge color={s.color}>
                    <Icon className="h-5 w-5" {...iconStrongProps} />
                  </IconBadge>
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">STEP {i + 1}</div>
                    <div className="mt-1 text-base font-semibold text-[#0B1220]">{s.title}</div>
                  </div>
                </div>

                <div className="hidden sm:block">
                  <div className="h-12 w-1 rounded-full" style={{ background: s.color, opacity: 0.6 }} />
                </div>
              </div>

              <div className="mt-3 text-sm text-[#0B1220]/70">{s.desc}</div>

              <div
                className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full blur-3xl"
                style={{ background: "rgba(11,18,32,0.06)" }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------- Impact Panel (Upgraded) -------------------- */
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
      <SoftGlass>
        <div className="relative p-6 sm:p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.55, ease: EASE, delay: idx * 0.06 }}
                  whileHover={{ scale: 1.01 }}
                  className="rounded-[28px] bg-white/5 p-5 ring-1 ring-white/10"
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

          {/* Proofs */}
          <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
            {proofs.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.18 + i * 0.07 }}
                  className="rounded-[28px] bg-white/5 px-5 py-4 ring-1 ring-white/10"
                >
                  <div className="flex items-center gap-3">
                    <IconBadge color={p.color}>
                      <Icon className="h-4 w-4" {...iconStrongProps} />
                    </IconBadge>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">{p.title}</div>
                      <div className="mt-1 text-xs text-white/65">{p.desc}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </SoftGlass>
    </div>
  );
}

/* -------------------- Germany Section Cards -------------------- */
function DayCard({ day, title, icon: Icon, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="rounded-[28px] bg-white/55 p-5 ring-1 ring-[#0B1220]/10"
      style={{ boxShadow: "0 18px 60px rgba(0,0,0,0.10)" }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">{day.toUpperCase()}</div>
        <IconBadge color={color}>
          <Icon className="h-4 w-4" {...iconStrongProps} />
        </IconBadge>
      </div>
      <div className="mt-2 text-sm font-semibold text-[#0B1220]">{title}</div>
    </motion.div>
  );
}

/* -------------------- Form Components -------------------- */
const formWrapV = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, when: "beforeChildren", staggerChildren: 0.06 },
  },
};
const fieldV = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

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
          <div className="card-shine" />
        </div>
      </label>
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

/* -------------------- Main Page -------------------- */
export default function StudentsGraduatesLanding() {
  const [activeCat, setActiveCat] = useState(categories[0].key);
  const [persona, setPersona] = useState("University Student");
  const [year, setYear] = useState("Final Year");
  const [cv, setCv] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const cat = useMemo(() => categories.find((c) => c.key === activeCat) || categories[0], [activeCat]);
  const impact = useInViewOnce(0.25);

  const [openProgram, setOpenProgram] = useState(null);

  const sliderRef = useRef(null);
  const scrollSlider = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    const dx = dir === "left" ? -420 : 420;
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  // Subtle scroll-based hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 18]);

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
      <BackgroundFX />

      {/* HERO */}
      <section id="overview" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div ref={heroRef} className="mx-auto max-w-7xl px-5 pt-6 pb-14 lg:pt-10 lg:pb-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.h1 variants={fadeUp} className="mt-2 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
                Build Experience. <br /> Launch Your Career With Proof.
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-5 max-w-xl text-balance text-base text-white/70 sm:text-lg">
                Real industry internships supervised by European experts and university professors.
              </motion.p>

              <motion.p variants={fadeUp} className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-white/65">
                We bridge the gap between academic theory and real market execution through structured, project-based internships.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <GradientButton href="#apply">Apply Now</GradientButton>
                <GradientButton href="#programs" variant="secondary">
                  Explore Programs
                </GradientButton>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
                <Pill label="Real Projects" />
                <Pill label="Industry Mentorship" />
                <Pill label="Portfolio-Ready Outcomes" />
                <Pill label="3-4 Month Programs" />
              </motion.div>
            </motion.div>

            <motion.div style={{ y: heroY }} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE }}>
              <HeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20">
          <SectionHeader
            title="The Gap Between Study and Employment"
            subtitle="Universities teach knowledge. The market demands capability. Our internships convert academic knowledge into measurable professional execution."
          />

          <div className="relative mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
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
      </section>

      {/* IMPACT */}
      <section id="impact" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div ref={impact.ref} className="mx-auto max-w-7xl px-5 py-14 sm:py-20">
          <SectionHeader title="Impact & Numbers" subtitle={null} dark />
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
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20">
          <SectionHeader title="How Our Internships Work" subtitle={null} />
          <div className="mt-10">
            <Timeline />
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20">
          <div className="flex flex-col gap-5">
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
                        "relative rounded-full px-4 py-2 text-sm font-semibold ring-1 transition",
                        active ? "text-white ring-white/15" : "text-white/70 hover:bg-white/5 ring-white/10"
                      )}
                      style={active ? { background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 75%)` } : undefined}
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
                whileHover={{ scale: 1.06 }}
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
                whileHover={{ scale: 1.06 }}
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
                    <ProgramCard program={p} index={idx} onOpen={setOpenProgram} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GERMANY */}
      <section id="international" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20">
          <SectionHeader
            title="Outstanding Teams Get Invited to Germany"
            subtitle="Top-performing teams receive an exclusive 4-day professional visit to Germany."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.75, ease: EASE }}
                className="rounded-[40px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur"
                style={{ boxShadow: "0 22px 80px rgba(0,0,0,0.10)" }}
              >
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
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.06 }}
                className="relative h-full overflow-hidden rounded-[40px] ring-1 ring-[#0B1220]/10"
                style={{ boxShadow: "0 22px 80px rgba(0,0,0,0.12)" }}
              >
                <img src={IMAGES.germany} alt="Germany visit" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div
                  className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl"
                  style={{ background: "rgba(255,255,255,0.10)" }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="relative" style={{ background: "rgba(233,231,223,1)", color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20">
          <SectionHeader title="Apply for an Industry Internship" subtitle="Start building real experience today." />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <motion.div
                variants={formWrapV}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="relative rounded-[44px] p-[1px]"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.70))`,
                  boxShadow: "0 30px 110px rgba(0,0,0,0.18)",
                }}
              >
                <div className="relative rounded-[42px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur">
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
                          <span className="card-shine" />
                        </span>
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <div
                className="rounded-[40px] p-7 ring-1 ring-[#0B1220]/10 lg:sticky lg:top-24"
                style={{
                  background:
                    "radial-gradient(900px circle at 30% 15%, rgba(255,255,255,0.10), transparent 55%), radial-gradient(900px circle at 80% 70%, rgba(255,255,255,0.06), transparent 55%), rgba(255,255,255,0.55)",
                  boxShadow: "0 22px 80px rgba(0,0,0,0.10)",
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
              className="relative overflow-hidden rounded-[34px] border border-white/10 px-6 py-8 text-center sm:px-10 sm:py-10"
              style={{
                background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 100%)`,
                boxShadow: "0 28px 110px rgba(0,0,0,0.16)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.16]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)",
                }}
              />
              <div className="relative mx-auto max-w-6xl text-white">
                <div className="text-xs font-semibold text-white/80 sm:text-sm">High credibility • European-standard • outcome-focused</div>
                <div className="mt-3 text-3xl font-semibold md:text-4xl">Ready to Build Real Capability?</div>
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

      {/* Modal */}
      <ProgramModal open={!!openProgram} program={openProgram} onClose={() => setOpenProgram(null)} />

      <style>{css}</style>
    </div>
  );
}

/** ---- CSS (Upgraded) ---- */
const css = `
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }

/* Aurora streak */
.aurora-streak{
  position:absolute;
  inset:-25% -15%;
  background: linear-gradient(120deg, transparent 0%, rgba(233,231,223,0.05) 18%, rgba(255,255,255,0.12) 34%, transparent 56%);
  transform: translateX(-30%) rotate(-10deg);
  filter: blur(2px);
  animation: auroraMove 8.2s ease-in-out infinite;
  opacity: 0.38;
}
@keyframes auroraMove{
  0%{ transform: translateX(-38%) rotate(-10deg); }
  50%{ transform: translateX(30%) rotate(-10deg); }
  100%{ transform: translateX(-38%) rotate(-10deg); }
}

/* Card shine */
.card-shine{
  position:absolute;
  inset:-30% -30%;
  background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.05) 32%, rgba(255,255,255,0.12) 44%, transparent 62%);
  transform: translateX(-30%) rotate(-10deg);
  filter: blur(1px);
  animation: shineMove 6.2s ease-in-out infinite;
  opacity: 0.38;
}
@keyframes shineMove{
  0%{ transform: translateX(-38%) rotate(-10deg); }
  50%{ transform: translateX(34%) rotate(-10deg); }
  100%{ transform: translateX(-38%) rotate(-10deg); }
}

/* Include pill shimmer */
.include-pill{ position: relative; overflow: hidden; transition: transform 220ms ease, filter 220ms ease; }
.include-pill:hover{ transform: translateY(-1px); filter: brightness(1.04); }

.include-pill::after{
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.22) 46%, transparent 72%);
  transform: translateX(-120%);
  animation: includeShine 3.0s ease-in-out infinite;
  pointer-events: none;
}
@keyframes includeShine{
  0%, 62%, 100%{ transform: translateX(-120%); }
  78%{ transform: translateX(120%); }
}
`;
