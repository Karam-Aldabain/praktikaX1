import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Compass,
  FileCheck2,
  Flame,
  Globe2,
  GraduationCap,
  Layers,
  LineChart,
  MapPin,
  Network,
  Shield,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

/**
 * PRAKTIX — ABOUT / OUR MODEL (How We Work)
 * - Same color system as your code (THEME)
 * - New layouts + stronger animations
 * - Photos per section so pages feel unique even with same colors
 * - Premium spacing + micro-interactions
 */

/** ---------------- THEME (same as your code) ---------------- */
const THEME = {
  deep: "#0B1220",
  slate: "#1E2A3A",
  sand: "#E9E7DF",
  accent: "#22D3EE", // cyan
  accent2: "#A78BFA", // violet
  accent3: "#34D399", // green
  accent4: "#F59E0B", // amber
  pink: "#C91D67", // keep only where intentionally used
  star: "#F5D66B",
};

const DARK_SECTION_BG = "linear-gradient(90deg, #050B1F 0%, #071A3E 100%)";
const ACCENT_RGB = "201,29,103";
const accent = (a) => `rgba(${ACCENT_RGB}, ${a})`;
void motion;

const POWER_ICON_SHELL = {
  background: "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
  border: "1px solid rgba(255,255,255,0.22)",
  boxShadow: "0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.20)",
};

const iconStrongProps = { strokeWidth: 2.4 };

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** ---------------- Photos (swap if you want local assets) ---------------- */
const IMAGES = {
  hero: "/images/howwork-hero.png",
  alignment: "/images/howwork-alignment.jpg",
  execution: "/images/howwork-structured1.png",
  validation: "/images/howwork-validation.png",
  impact: "/images/howwork-career.png",
  formats: {
    online:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
    hybrid:
      "https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?auto=format&fit=crop&w=1400&q=80",
    onsite:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=80",
    custom:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
  },
  experts:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80",
  ai: "/images/howwork-ai.png",
  partnerships:
    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1400&q=80",
  closing:
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80",
};

/** ---------------- Motion helpers ---------------- */
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

function AnimatedNumber({ value, suffix = "", durationMs = 950 }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce) return;
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

function IconBadge({ color, children }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl ring-1" style={POWER_ICON_SHELL}>
      <span style={{ color }}>{children}</span>
    </span>
  );
}

function SectionHeader({ eyebrow, title, subtitle, rightSlot, dark = false }) {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className={cx(dark ? "text-white" : "text-[#0B1220]")}>
          {eyebrow ? (
            <div
              className={cx(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-widest ring-1",
                dark ? "bg-white/10 text-white/80 ring-white/10" : "bg-[#0B1220]/5 text-[#0B1220]/70 ring-[#0B1220]/10"
              )}
            >
              <Sparkles className="h-4 w-4" style={{ color: THEME.accent }} {...iconStrongProps} />
              <span>{eyebrow}</span>
            </div>
          ) : null}

          <h2 className={cx("mt-5 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl", dark ? "text-white" : "text-[#0B1220]")}>
            {title}
          </h2>

          {subtitle ? (
            <p className={cx("mt-3 max-w-3xl text-balance text-base sm:text-lg", dark ? "text-white/70" : "text-[#0B1220]/70")}>
              {subtitle}
            </p>
          ) : null}
        </div>

        {rightSlot ? <div>{rightSlot}</div> : null}
      </div>
    </div>
  );
}

/** ---------------- Fancy Backdrops ---------------- */
function FlowBackdrop() {
  // Animated flow network behind hero text
  return (
    <motion.svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={THEME.accent} stopOpacity="0.75" />
          <stop offset="45%" stopColor={THEME.accent2} stopOpacity="0.55" />
          <stop offset="100%" stopColor={THEME.pink} stopOpacity="0.5" />
        </linearGradient>

        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.26" />
          <stop offset="60%" stopColor={THEME.accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>

        <filter id="blurGlow">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* soft glow blobs */}
      <circle cx="180" cy="140" r="170" fill="url(#nodeGlow)" opacity="0.55" />
      <circle cx="980" cy="220" r="210" fill="url(#nodeGlow)" opacity="0.45" />
      <circle cx="820" cy="560" r="240" fill="url(#nodeGlow)" opacity="0.35" />

      {/* network paths */}
      {[
        "M120 520 C 260 420, 320 420, 420 320 S 620 180, 820 260 S 1000 420, 1140 320",
        "M80 220 C 260 160, 380 240, 520 220 S 780 170, 940 240 S 1040 340, 1180 220",
        "M240 640 C 360 520, 460 520, 620 440 S 840 280, 1020 420 S 1100 520, 1180 460",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="url(#flowGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="10 16"
          filter="url(#blurGlow)"
          initial={{ strokeDashoffset: 0, opacity: 0.0 }}
          animate={{ strokeDashoffset: [0, -240], opacity: 0.75 }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* nodes */}
      {[
        { x: 220, y: 460, r: 10 },
        { x: 420, y: 320, r: 8 },
        { x: 610, y: 220, r: 10 },
        { x: 820, y: 260, r: 9 },
        { x: 980, y: 420, r: 10 },
        { x: 920, y: 560, r: 8 },
        { x: 520, y: 440, r: 8 },
      ].map((n, idx) => (
        <motion.circle
          key={idx}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill="rgba(255,255,255,0.22)"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
          initial={{ opacity: 0.0, scale: 0.9 }}
          animate={{ opacity: [0.35, 0.9, 0.35], scale: [0.95, 1.08, 0.95] }}
          transition={{ duration: 2.8 + (idx % 3) * 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </motion.svg>
  );
}

function PhotoPanel({ src, tone = "dark", caption, className }) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[34px] ring-1",
        tone === "dark" ? "ring-white/10 bg-white/5" : "ring-[#0B1220]/10 bg-white/60",
        className
      )}
      style={{ boxShadow: tone === "dark" ? "0 24px 90px rgba(0,0,0,0.35)" : "0 24px 90px rgba(0,0,0,0.16)" }}
    >
      <motion.img
        src={src}
        alt={caption || "Section visual"}
        className="h-full w-full object-cover"
        initial={{ scale: 1.05, opacity: 0.9 }}
        whileHover={{ scale: 1.08, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,18,32,0.0) 0%, rgba(11,18,32,0.72) 85%)" }} />
      {caption ? (
        <div className="absolute bottom-5 left-5 right-5">
          <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/10 backdrop-blur">
            {caption}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** ---------------- Components for “How we work” ---------------- */
const heroSteps = [
  { label: "Foundation", icon: Layers, color: THEME.accent },
  { label: "Execution", icon: Zap, color: THEME.accent3 },
  { label: "Validation", icon: CheckCircle2, color: THEME.accent4 },
  { label: "Impact", icon: Target, color: THEME.accent2 },
];

const frameworkSteps = [
  {
    key: "alignment",
    title: "Alignment",
    icon: Compass,
    color: THEME.accent,
    photo: IMAGES.alignment,
    lead: "We begin by aligning with real market needs.",
    columns: [
      {
        label: "For Individuals",
        bullets: ["Career goals", "Skill gaps", "Industry demand"],
      },
      {
        label: "For Organizations",
        bullets: ["Workforce capability gaps", "Strategic objectives", "Digital transformation priorities"],
      },
    ],
    micro: "Pulse effect on the alignment icon + “signal ping” rings.",
  },
  {
    key: "execution",
    title: "Structured Execution",
    icon: Briefcase,
    color: THEME.accent3,
    photo: IMAGES.execution,
    lead: "This is where transformation happens.",
    columns: [
      {
        label: "We design",
        bullets: ["Real industry projects", "Applied AI integrations", "Mentor-guided execution", "Cross-functional exposure"],
      },
      {
        label: "Each program is",
        bullets: ["Expert-led", "Outcome-based", "Time-structured", "Performance-tracked"],
      },
    ],
    micro: "Workflow pipeline animation moving left → right.",
  },
  {
    key: "validation",
    title: "Validation & Performance",
    icon: FileCheck2,
    color: THEME.accent4,
    photo: IMAGES.validation,
    lead: "Learning without validation creates no value.",
    columns: [
      {
        label: "We measure",
        bullets: ["Project quality", "Technical execution", "Strategic thinking", "Delivery standards"],
      },
      {
        label: "Deliverables",
        bullets: ["Deployed systems", "Strategic reports", "Functional prototypes", "Executive presentations"],
      },
    ],
    micro: "Milestone checkmarks appear in sequence.",
  },
  {
    key: "impact",
    title: "Career & Organizational Impact",
    icon: Target,
    color: THEME.accent2,
    photo: IMAGES.impact,
    lead: "Final focus is measurable growth.",
    columns: [
      {
        label: "For Individuals",
        bullets: ["Portfolio-ready outcomes", "Job readiness", "Confidence in execution"],
      },
      {
        label: "For Organizations",
        bullets: ["Upskilled workforce", "AI adoption capability", "Operational efficiency", "Innovation acceleration"],
      },
    ],
    micro: "Impact counters animate as you scroll into view.",
  },
];

const deliveryFormats = [
  {
    key: "online",
    label: "Online",
    icon: Globe2,
    color: THEME.accent,
    photo: IMAGES.formats.online,
    desc: "Fully digital cohorts designed for measurable execution, with structured check-ins and review loops.",
  },
  {
    key: "hybrid",
    label: "Hybrid",
    icon: Building2,
    color: THEME.accent2,
    photo: IMAGES.formats.hybrid,
    desc: "Institution-based touchpoints + digital delivery so learners execute in context without losing velocity.",
  },
  {
    key: "onsite",
    label: "Onsite",
    icon: MapPin,
    color: THEME.accent3,
    photo: IMAGES.formats.onsite,
    desc: "Co-hosted inside universities or organizations with aligned stakeholder access and clear delivery standards.",
  },
  {
    key: "custom",
    label: "Custom-tailored",
    icon: Network,
    color: THEME.accent4,
    photo: IMAGES.formats.custom,
    desc: "Tailored execution architecture based on your objectives, constraints, and capability targets.",
  },
];

const experts = [
  { role: "Industry professionals", icon: Briefcase, color: THEME.accent3 },
  { role: "European corporate experts", icon: Globe2, color: THEME.accent2 },
  { role: "University professors", icon: GraduationCap, color: THEME.accent4 },
  { role: "AI specialists", icon: Flame, color: THEME.accent },
];

const aiDisciplines = [
  { label: "Software development", icon: Zap, color: THEME.accent },
  { label: "Data analysis", icon: LineChart, color: THEME.accent3 },
  { label: "Marketing strategy", icon: Sparkles, color: THEME.accent2 },
  { label: "Financial modeling", icon: Target, color: THEME.accent4 },
  { label: "Operational systems", icon: Layers, color: THEME.accent3 },
  { label: "Product management", icon: Compass, color: THEME.accent2 },
];

const partnerships = [
  {
    key: "universities",
    title: "For Universities",
    icon: GraduationCap,
    color: THEME.accent2,
    items: ["Co-hosted internship models", "Parallel industrial courses", "Capstone integration"],
  },
  {
    key: "companies",
    title: "For Companies",
    icon: Building2,
    color: THEME.accent3,
    items: ["Workforce training sprints", "AI adoption programs", "Tailored workshops"],
  },
  {
    key: "governments",
    title: "For Governments",
    icon: Shield,
    color: THEME.accent4,
    items: ["Strategic upskilling initiatives", "Digital readiness acceleration"],
  },
];

const differentiators = [
  { title: "Structured, not generic", icon: Layers, color: THEME.accent },
  { title: "Measurable, not symbolic", icon: LineChart, color: THEME.accent4 },
  { title: "Expert-led, not content-based", icon: BadgeCheck, color: THEME.accent2 },
  { title: "Execution-driven, not theoretical", icon: Briefcase, color: THEME.accent3 },
];

/** ---------------- UI building blocks ---------------- */
function GradientButton({ children, href, onClick, variant = "primary" }) {
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

function MiniNav({ items }) {
  return (
    <div className="hidden items-center gap-2 rounded-full bg-white/5 px-2 py-2 ring-1 ring-white/10 backdrop-blur lg:inline-flex">
      {items.map((it) => (
        <a
          key={it.href}
          href={it.href}
          className="rounded-full px-3 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
        >
          {it.label}
        </a>
      ))}
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

function CardShell({ children, tone = "dark", className }) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[34px] ring-1",
        tone === "dark" ? "bg-white/5 ring-white/10" : "bg-white/60 ring-[#0B1220]/10",
        className
      )}
      style={{
        boxShadow: tone === "dark" ? "0 24px 90px rgba(0,0,0,0.35)" : "0 24px 90px rgba(0,0,0,0.16)",
      }}
    >
      {/* subtle animated sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
        <div className="shine" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

function Accordion({ items, tone = "dark" }) {
  const [open, setOpen] = useState(items?.[0]?.id || null);

  return (
    <div className={cx("space-y-3")}>
      {items.map((it) => {
        const isOpen = open === it.id;
        return (
          <div key={it.id} className={cx("rounded-3xl ring-1", tone === "dark" ? "bg-white/5 ring-white/10" : "bg-white/60 ring-[#0B1220]/10")}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : it.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <IconBadge color={it.color}>
                  <it.icon className="h-4 w-4" {...iconStrongProps} />
                </IconBadge>
                <div>
                  <div className={cx("text-sm font-semibold", tone === "dark" ? "text-white" : "text-[#0B1220]")}>{it.title}</div>
                  {it.subtitle ? (
                    <div className={cx("mt-1 text-xs", tone === "dark" ? "text-white/65" : "text-[#0B1220]/60")}>{it.subtitle}</div>
                  ) : null}
                </div>
              </div>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className={cx(tone === "dark" ? "text-white/75" : "text-[#0B1220]/70")}>
                <ChevronDown className="h-5 w-5" {...iconStrongProps} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className={cx("px-5 pb-5", tone === "dark" ? "text-white/70" : "text-[#0B1220]/70")}>
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {it.items.map((x) => (
                        <li key={x} className="flex items-start gap-2">
                          <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full ring-1" style={{ background: "rgba(255,255,255,0.08)", borderColor: tone === "dark" ? "rgba(255,255,255,0.12)" : "rgba(11,18,32,0.10)" }}>
                            <span className="h-2 w-2 rounded-full bg-white/90" />
                          </span>
                          <span className="text-sm">{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/** ---------------- Feature sections ---------------- */
function Hero() {
  const reduce = useReducedMotion();
  const chipsV = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.09 } },
  };
  const chipV = { hidden: { opacity: 0, y: 10, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1 } };

  return (
    <section id="top" className="relative overflow-hidden" style={{ background: DARK_SECTION_BG }}>
      {/* Photo backdrop */}
      <div className="absolute inset-0 opacity-[0.22]">
        <img src={IMAGES.hero} alt="Praktix model" className="h-full w-full object-cover" />
      </div>

      {/* Animated flow diagram backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <FlowBackdrop />
        <div className="absolute inset-0" style={{ background: "radial-gradient(900px circle at 30% 25%, rgba(255,255,255,0.10), transparent 55%), radial-gradient(900px circle at 70% 70%, rgba(255,255,255,0.08), transparent 55%)" }} />
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left: headline */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/75 ring-1 ring-white/10">
              <Network className="h-4 w-4" style={{ color: THEME.sand }} {...iconStrongProps} />
              <span>ABOUT → OUR MODEL (HOW WE WORK)</span>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              A Structured System.{" "}
              <span style={{ color: THEME.pink }}>Not Just Programs.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-balance text-base text-white/75 sm:text-lg">
              How Praktix transforms learning into measurable professional performance.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65">
              We operate through a clear execution model designed for individuals, institutions, and organizations.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GradientButton href="#framework">Explore Our Framework</GradientButton>
              <GradientButton href="#partnerships" variant="secondary">
                Partner With Us
              </GradientButton>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              <Pill label="Outcome-based" />
              <Pill label="Performance-tracked" />
              <Pill label="Expert-led" />
              <Pill label="AI embedded" />
            </div>

            <motion.div
              variants={chipsV}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              {heroSteps.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.label}
                    variants={chipV}
                    className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-white/10"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <motion.span
                      className="inline-flex h-9 w-9 items-center justify-center rounded-2xl ring-1 ring-white/10"
                      animate={reduce ? {} : { scale: [1, 1.08, 1], opacity: [0.8, 1, 0.85] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                      <Icon className="h-4 w-4" style={{ color: s.color }} {...iconStrongProps} />
                    </motion.span>
                    <span className="text-white/85">{s.label}</span>
                    <span className="text-white/40">→</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right: hero visual card (different layout vs your other page) */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 18, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
          >
            <CardShell className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold tracking-widest text-white/60">MODEL SIGNAL</div>
                  <div className="mt-2 text-xl font-semibold text-white">Execution-first outcomes</div>
                  <div className="mt-2 text-sm text-white/70">
                    A system designed to produce <span style={{ color: THEME.accent }}>performance</span>, not participation.
                  </div>
                </div>

                <motion.div
                  className="relative h-14 w-14 rounded-3xl ring-1 ring-white/10"
                  animate={reduce ? {} : { rotate: [0, 6, 0, -6, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.70)} 80%)`,
                    boxShadow: `0 18px 50px ${accent(0.18)}`,
                  }}
                >
                  <div className="absolute inset-0 grid place-items-center">
                    <Sparkles className="h-6 w-6 text-white" {...iconStrongProps} />
                  </div>
                </motion.div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: "Market alignment", icon: Compass, color: THEME.accent },
                  { label: "Structured execution", icon: Briefcase, color: THEME.accent3 },
                  { label: "Validated deliverables", icon: FileCheck2, color: THEME.accent4 },
                  { label: "Measurable impact", icon: LineChart, color: THEME.accent2 },
                ].map((b) => {
                  const Icon = b.icon;
                  return (
                    <motion.div
                      key={b.label}
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <IconBadge color={b.color}>
                          <Icon className="h-4 w-4" {...iconStrongProps} />
                        </IconBadge>
                        <div className="text-sm font-semibold text-white">{b.label}</div>
                      </div>
                      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: b.color }}
                          initial={{ width: "0%" }}
                          animate={{ width: "72%" }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6 overflow-hidden rounded-3xl ring-1 ring-white/10">
                <div className="relative">
                  <motion.img
                    src={IMAGES.hero}
                    alt="Model overview"
                    className="h-44 w-full object-cover"
                    initial={{ scale: 1.08, opacity: 0.85 }}
                    animate={{ scale: 1.03, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,18,32,0.10), rgba(11,18,32,0.85))" }} />
                  <div className="absolute bottom-4 left-4 right-4 hidden">
                    <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/10 backdrop-blur">
                      
                    </div>
                  </div>
                </div>
              </div>
            </CardShell>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Framework() {
  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 0.85", "end 0.15"] });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const reduce = useReducedMotion();

  return (
    <section id="framework" className="relative" style={{ background: THEME.deep, color: "white" }}>
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px circle at 10% 15%, rgba(255,255,255,0.08), transparent 55%), radial-gradient(1200px circle at 85% 20%, rgba(233,231,223,0.06), transparent 55%), radial-gradient(900px circle at 60% 90%, rgba(255,255,255,0.06), transparent 55%)",
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
      </div>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
        <SectionHeader
          eyebrow="THE PRAKTIX FRAMEWORK"
          title="The Praktix Performance Framework"
          subtitle="Four structured pillars that ensure real-world outcomes — not theoretical exposure."
          dark
          rightSlot={
            <div className="hidden lg:block">
              <div className="rounded-3xl bg-white/5 px-5 py-4 ring-1 ring-white/10">
                <div className="text-xs font-semibold tracking-widest text-white/60">DISPLAY</div>
                <div className="mt-1 text-sm font-semibold text-white">Connected stages with animated progress flow</div>
              </div>
            </div>
          }
        />

        <div ref={wrapRef} className="relative mt-12">
          {/* Progress spine */}
          <div className="absolute left-4 top-0 hidden h-full w-[2px] rounded-full bg-white/10 sm:block" />
          <motion.div
            className="absolute left-4 top-0 hidden w-[2px] rounded-full sm:block"
            style={{ height: line, background: `linear-gradient(180deg, ${THEME.accent} 0%, ${THEME.pink} 60%, ${THEME.accent2} 100%)` }}
          />

          <div className="space-y-6 sm:space-y-7">
            {frameworkSteps.map((s, idx) => (
              <FrameworkStep key={s.key} step={s} index={idx} reduce={reduce} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FrameworkStep({ step, index, reduce }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: Math.min(index * 0.05, 0.2) }}
      className="relative"
    >
      {/* Node */}
      <div className="absolute left-0 top-8 hidden sm:block">
        <motion.div
          className="relative grid h-9 w-9 place-items-center rounded-2xl ring-1 ring-white/10"
          style={{ background: "rgba(255,255,255,0.06)" }}
          animate={reduce ? {} : { boxShadow: [`0 0 0 0 ${accent(0.0)}`, `0 0 0 14px ${accent(0.10)}`, `0 0 0 0 ${accent(0.0)}`] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon className="h-4 w-4" style={{ color: step.color }} {...iconStrongProps} />
        </motion.div>
      </div>

      <div className="sm:pl-14">
        <CardShell className="p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <IconBadge color={step.color}>
                    <Icon className="h-4.5 w-4.5" {...iconStrongProps} />
                  </IconBadge>
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-white/60">STEP {index + 1}</div>
                    <div className="mt-1 text-xl font-semibold text-white">{step.title}</div>
                  </div>
                </div>

                <div className="rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <span style={{ color: step.color }}>●</span> {step.micro}
                </div>
              </div>

              <div className="mt-4 text-sm text-white/70">{step.lead}</div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {step.columns.map((c) => (
                  <div key={c.label} className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                    <div className="text-xs font-semibold tracking-widest text-white/55">{c.label.toUpperCase()}</div>
                    <div className="mt-3 space-y-2">
                      {c.bullets.map((b, i) => (
                        <motion.div
                          key={b}
                          initial={{ opacity: 0, x: -6 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.35 }}
                          transition={{ duration: 0.4, ease: "easeOut", delay: 0.06 * i }}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: step.color }} {...iconStrongProps} />
                          <span className="text-sm text-white/80">{b}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Extra “data-driven” animation blocks per step */}
              <div className="mt-6">
                {step.key === "execution" ? <PipelineBar color={step.color} /> : null}
                {step.key === "validation" ? <MilestoneChecks color={step.color} /> : null}
                {step.key === "impact" ? <ImpactCounters /> : null}
              </div>
            </div>

            <div className="lg:col-span-5">
              <PhotoPanel
                src={step.photo}
                className="h-[320px] lg:h-[440px]"
              />
            </div>
          </div>
        </CardShell>
      </div>
    </motion.div>
  );
}

function PipelineBar({ color }) {
  // left → right workflow movement
  const items = ["Brief", "Scope", "Build", "Review", "Deploy"];
  return (
    <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm font-semibold text-white">Execution pipeline</div>
        <div className="text-xs font-semibold text-white/60">Workflow moves left → right</div>
      </div>

      <div className="mt-4 overflow-hidden rounded-full bg-white/10 p-1">
        <div className="relative h-10 overflow-hidden rounded-full bg-[#0B1220]/40">
          <motion.div
            className="absolute inset-y-0 left-0 w-[38%] rounded-full"
            style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.72)} 70%, ${color} 120%)` }}
            initial={{ x: "-110%" }}
            animate={{ x: ["-110%", "260%"] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-between px-4">
            {items.map((t) => (
              <div key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/10">
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MilestoneChecks({ color }) {
  const milestones = ["Quality gate", "Delivery standard", "Review notes", "Final approval"];
  return (
    <div className="mt-4 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="text-sm font-semibold text-white">Milestones</div>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {milestones.map((m, i) => (
          <motion.div
            key={m}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 * i }}
            className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10"
          >
            <motion.span
              className="grid h-8 w-8 place-items-center rounded-2xl ring-1 ring-white/10"
              style={{ background: "rgba(255,255,255,0.06)" }}
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            >
              <CheckCircle2 className="h-4 w-4" style={{ color }} {...iconStrongProps} />
            </motion.span>
            <div className="text-sm font-semibold text-white/85">{m}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ImpactCounters() {
  const { ref: viewRef, inView } = useInViewOnce(0.35);
  const stats = [
    { label: "Portfolio-ready outputs", value: 1200, suffix: "+", icon: FileCheck2, color: THEME.accent2 },
    { label: "Validated deliverables", value: 87, suffix: "%", icon: CheckCircle2, color: THEME.accent4 },
    { label: "Execution confidence", value: 72, suffix: "%", icon: Briefcase, color: THEME.accent3 },
    { label: "AI adoption capability", value: 40, suffix: "+", icon: Flame, color: THEME.accent },
  ];

  return (
    <div ref={viewRef} className="mt-4 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm font-semibold text-white">Impact metrics</div>
        <div className="text-xs font-semibold text-white/60">Animated counters</div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 * i }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10"
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
                </div>
                <div className="hidden sm:block">
                  <div className="h-12 w-1 rounded-full" style={{ background: s.color, opacity: 0.7 }} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function DeliveryFormats() {
  const [active, setActive] = useState(deliveryFormats[0].key);
  const current = useMemo(() => deliveryFormats.find((x) => x.key === active) || deliveryFormats[0], [active]);

  return (
    <section id="formats" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
      <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
        <SectionHeader
          eyebrow="DELIVERY FORMATS"
          title="Flexible Delivery Architecture"
          subtitle="Our model adapts to context — choose the execution format that fits your reality."
          rightSlot={
            <div className="hidden lg:block rounded-3xl bg-white/55 px-5 py-4 ring-1 ring-[#0B1220]/10">
              <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">INTERACTION</div>
              <div className="mt-1 text-sm font-semibold text-[#0B1220]">Tabs switch with animated transitions</div>
            </div>
          }
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-5">
            <div className="space-y-3">
              {deliveryFormats.map((t) => {
                const Icon = t.icon;
                const isActive = t.key === active;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActive(t.key)}
                    className={cx(
                      "group flex w-full items-center justify-between gap-4 rounded-3xl px-5 py-4 text-left ring-1 transition",
                      isActive ? "ring-[#0B1220]/15" : "ring-[#0B1220]/10 hover:ring-[#0B1220]/20"
                    )}
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, rgba(11,18,32,0.06) 0%, rgba(11,18,32,0.03) 100%)`
                        : "rgba(255,255,255,0.55)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <IconBadge color={t.color}>
                        <Icon className="h-4 w-4" {...iconStrongProps} />
                      </IconBadge>
                      <div>
                        <div className="text-sm font-semibold text-[#0B1220]">{t.label}</div>
                        <div className="mt-1 text-xs text-[#0B1220]/60">{t.desc}</div>
                      </div>
                    </div>
                    <motion.span
                      animate={{ x: isActive ? 4 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[#0B1220]/60"
                    >
                      <ChevronRight className="h-5 w-5" {...iconStrongProps} />
                    </motion.span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-3xl bg-white/55 p-6 ring-1 ring-[#0B1220]/10">
              <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">NOTE</div>
              <div className="mt-2 text-sm font-semibold text-[#0B1220]">Custom-tailored execution is supported</div>
              <div className="mt-2 text-sm text-[#0B1220]/70">
                We adapt scope, cadence, and evaluation to match your constraints while preserving measurable outcomes.
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 14, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.99 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
                  <div className="lg:col-span-7">
                    <CardShell tone="light" className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <IconBadge color={current.color}>
                            <current.icon className="h-4 w-4" {...iconStrongProps} />
                          </IconBadge>
                          <div>
                            <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">SELECTED FORMAT</div>
                            <div className="mt-1 text-xl font-semibold text-[#0B1220]">{current.label}</div>
                          </div>
                        </div>

                        <div
                          className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
                          style={{ background: "rgba(11,18,32,0.06)", borderColor: "rgba(11,18,32,0.12)", color: "rgba(11,18,32,0.75)" }}
                        >
                          Architecture-ready
                        </div>
                      </div>

                      <div className="mt-4 text-sm leading-relaxed text-[#0B1220]/70">{current.desc}</div>

                      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {[
                          { label: "Cadence", v: "Structured sprints", icon: Calendar },
                          { label: "Tracking", v: "Performance signals", icon: LineChart },
                          { label: "Mentorship", v: "Expert feedback", icon: BadgeCheck },
                          { label: "Output", v: "Validated deliverables", icon: FileCheck2 },
                        ].map((x, i) => {
                          const I = x.icon;
                          return (
                            <motion.div
                              key={x.label}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35, delay: 0.05 * i }}
                              className="rounded-3xl bg-white/60 p-4 ring-1 ring-[#0B1220]/10"
                            >
                              <div className="flex items-center gap-3">
                                <IconBadge color={current.color}>
                                  <I className="h-4 w-4" {...iconStrongProps} />
                                </IconBadge>
                                <div>
                                  <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">{x.label.toUpperCase()}</div>
                                  <div className="mt-1 text-sm font-semibold text-[#0B1220]">{x.v}</div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </CardShell>
                  </div>

                  <div className="lg:col-span-5">
                    <PhotoPanel src={current.photo} tone="light" className="h-[360px] lg:h-[440px]" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExpertEcosystem() {
  return (
    <section id="experts" className="relative" style={{ background: DARK_SECTION_BG, color: "white" }}>
      <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
        <SectionHeader
          eyebrow="EXPERT-LED ECOSYSTEM"
          title="Built on Real Industry Expertise"
          subtitle="No simulated environments. No generic teaching. Only active market practitioners."
          dark
          rightSlot={<GradientButton href="#partnerships">Work With Us</GradientButton>}
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-5">
            <PhotoPanel src={IMAGES.experts} className="h-[420px] lg:h-[560px]" />
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4">
              {experts.map((e, i) => {
                const Icon = e.icon;
                return (
                  <motion.div
                    key={e.role}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 * i }}
                    className="group relative overflow-hidden rounded-[34px] bg-white/5 p-6 ring-1 ring-white/10"
                    style={{ boxShadow: "0 20px 70px rgba(0,0,0,0.28)" }}
                  >
                    {/* hover reveal layer */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(900px circle at 15% 20%, ${accent(0.20)}, transparent 55%)`,
                        }}
                      />
                      <div className="shine" />
                    </div>

                    <div className="relative flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <IconBadge color={e.color}>
                          <Icon className="h-4.5 w-4.5" {...iconStrongProps} />
                        </IconBadge>
                        <div>
                          <div className="text-xs font-semibold tracking-widest text-white/60">GUIDED BY</div>
                          <div className="mt-1 text-lg font-semibold text-white">{e.role}</div>
                        </div>
                      </div>

                      <motion.div
                        className="hidden sm:block rounded-2xl px-4 py-3 text-xs font-semibold ring-1 ring-white/10"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                        whileHover={{ scale: 1.02 }}
                      >
                        Hover to reveal
                      </motion.div>
                    </div>

                    <div className="relative mt-4 text-sm leading-relaxed text-white/70">
                      <span className="text-white/85">Expectation:</span> active practitioners who deliver and evaluate against real standards — not generic content.
                    </div>

                    <div className="relative mt-6 flex flex-wrap gap-2">
                      {["Mentor reviews", "Delivery standards", "Performance signals", "Portfolio proof"].map((t, idx) => (
                        <span
                          key={t}
                          className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
                          style={{
                            background: idx % 2 === 0 ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.70)} 100%)` : "rgba(255,255,255,0.06)",
                            borderColor: "rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.88)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 rounded-[34px] bg-white/5 p-6 ring-1 ring-white/10">
              <div className="text-xs font-semibold tracking-widest text-white/60">WHY IT MATTERS</div>
              <div className="mt-2 text-xl font-semibold text-white">Expert-led evaluation creates credible signals.</div>
              <div className="mt-2 text-sm text-white/70">
                Hiring teams recognize validated outputs faster than attendance-based “certificates”.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AILayer() {
  return (
    <section id="ai" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
      <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
        <SectionHeader
          eyebrow="AI INTEGRATION LAYER"
          title="AI Embedded Across All Programs"
          subtitle="AI is not a separate course — it’s an integrated layer across disciplines to ensure future-proof capability."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-5">
            <PhotoPanel src={IMAGES.ai} tone="light" className="h-[420px] lg:h-[540px]" />
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[34px] bg-white/55 p-6 ring-1 ring-[#0B1220]/10">
              {/* moving overlay glow */}
              <div className="pointer-events-none absolute inset-0">
                <motion.div
                  className="absolute -inset-y-12 -left-1/2 w-1/2 rotate-12"
                  style={{ background: `linear-gradient(90deg, transparent 0%, ${accent(0.16)} 40%, transparent 80%)` }}
                  initial={{ x: "-20%" }}
                  animate={{ x: "260%" }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <div className="relative">
                <div className="flex items-center gap-3">
                  <IconBadge color={THEME.accent}>
                    <Flame className="h-4.5 w-4.5" {...iconStrongProps} />
                  </IconBadge>
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">EMBEDDED LAYER</div>
                    <div className="mt-1 text-xl font-semibold text-[#0B1220]">AI is integrated — not isolated</div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-[#0B1220]/70">
                  We embed AI into the work itself so learners ship practical outputs with modern tooling — across multiple fields.
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {aiDisciplines.map((d, i) => {
                    const Icon = d.icon;
                    return (
                      <motion.div
                        key={d.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 * i }}
                        whileHover={{ y: -4, scale: 1.01 }}
                        className="group rounded-3xl bg-white/60 p-5 ring-1 ring-[#0B1220]/10"
                      >
                        <div className="flex items-start gap-3">
                          <IconBadge color={d.color}>
                            <Icon className="h-4.5 w-4.5" {...iconStrongProps} />
                          </IconBadge>
                          <div>
                            <div className="text-sm font-semibold text-[#0B1220]">{d.label}</div>
                            <div className="mt-1 text-xs text-[#0B1220]/60">
                              Integrated workflows • AI-assisted execution • validated output
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-[#0B1220]/10">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: d.color }}
                            initial={{ width: "0%" }}
                            whileInView={{ width: "75%" }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-3xl bg-white/55 p-5 ring-1 ring-[#0B1220]/10">
                  <div className="text-sm font-semibold text-[#0B1220]">Outcome</div>
                  <div className="mt-2 text-sm text-[#0B1220]/70">
                    This ensures learners develop capability that stays relevant as the market evolves.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/55 p-6 ring-1 ring-[#0B1220]/10">
                <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">PRINCIPLE</div>
                <div className="mt-2 text-lg font-semibold text-[#0B1220]">AI is a layer</div>
                <div className="mt-2 text-sm text-[#0B1220]/70">Not a standalone module — it’s applied inside real work.</div>
              </div>
              <div className="rounded-3xl bg-white/55 p-6 ring-1 ring-[#0B1220]/10">
                <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">RESULT</div>
                <div className="mt-2 text-lg font-semibold text-[#0B1220]">Future-proof capability</div>
                <div className="mt-2 text-sm text-[#0B1220]/70">Modern execution signals that hiring teams can validate.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnershipArchitecture() {
  return (
    <section id="partnerships" className="relative" style={{ background: DARK_SECTION_BG, color: "white" }}>
      <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
        <SectionHeader
          eyebrow="INSTITUTIONAL & ORGANIZATIONAL MODEL"
          title="Scalable Partnership Architecture"
          subtitle="Structured models for universities, companies, and governments — with expandable scopes."
          dark
          rightSlot={
            <div className="flex flex-col gap-3 sm:flex-row">
              <GradientButton href="#closing">Explore Opportunities</GradientButton>
              <GradientButton href="#top" variant="secondary">
                Back to Top
              </GradientButton>
            </div>
          }
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-5">
            <PhotoPanel src={IMAGES.partnerships} className="h-[420px] lg:h-[560px]" />
          </div>

          <div className="lg:col-span-7">
            <Accordion
              tone="dark"
              items={partnerships.map((p) => ({
                id: p.key,
                title: p.title,
                subtitle: "Expandable scope",
                icon: p.icon,
                color: p.color,
                items: p.items,
              }))}
            />

            <div className="mt-6 rounded-[34px] bg-white/5 p-6 ring-1 ring-white/10">
              <div className="text-xs font-semibold tracking-widest text-white/60">DESIGN NOTE</div>
              <div className="mt-2 text-xl font-semibold text-white">Same framework, different contexts</div>
              <div className="mt-2 text-sm text-white/70">
                The architecture adapts to objectives, but the outcome logic remains consistent: alignment → execution → validation → impact.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Differentiator() {
  return (
    <section className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
      <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
        <SectionHeader
          eyebrow="THE DIFFERENTIATOR"
          title="Why Our Model Works"
          subtitle="We design systems that produce performance — not participation."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 * i }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="relative overflow-hidden rounded-[34px] bg-white/55 p-6 ring-1 ring-[#0B1220]/10"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl" style={{ background: `rgba(11,18,32,0.08)` }} />
                <div className="flex items-center gap-3">
                  <IconBadge color={d.color}>
                    <Icon className="h-4.5 w-4.5" {...iconStrongProps} />
                  </IconBadge>
                  <div className="text-sm font-semibold text-[#0B1220]">{d.title}</div>
                </div>

                <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-[#0B1220]/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: d.color }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "80%" }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                </div>

                <div className="mt-3 text-sm text-[#0B1220]/70">
                  Built to create credible outcomes through execution, evaluation, and measurable signals.
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section id="closing" className="relative overflow-hidden" style={{ background: THEME.deep, color: "white" }}>
      <div className="absolute inset-0 opacity-[0.20]">
        <img src={IMAGES.closing} alt="Closing visual" className="h-full w-full object-cover" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1100px circle at 15% 20%, rgba(255,255,255,0.10), transparent 55%), radial-gradient(1100px circle at 85% 70%, rgba(255,255,255,0.08), transparent 55%), linear-gradient(180deg, rgba(11,18,32,0.55), rgba(11,18,32,0.92))",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/75 ring-1 ring-white/10">
            <Sparkles className="h-4 w-4" style={{ color: THEME.accent }} {...iconStrongProps} />
            <span>CLOSING</span>
          </div>

          <h3 className="mt-6 text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl">
            From Capability to Impact. <br />
            From Theory to Execution. <br />
            From Learning to Leadership.
          </h3>

          <p className="mx-auto mt-5 max-w-2xl text-base text-white/75 sm:text-lg">
            Ready to build a measurable, execution-driven system for your learners or teams?
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <GradientButton href="#partnerships">Work With Us</GradientButton>
            <GradientButton href="#framework" variant="secondary">
              Explore Our Framework
            </GradientButton>
          </div>

          <motion.div
            className="mt-10 rounded-[34px] border border-white/10 bg-white/5 px-6 py-8"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-xs font-semibold tracking-widest text-white/60">PREMIUM TONE</div>
            <div className="mt-2 text-lg font-semibold text-white">Wide spacing • consistent hierarchy • micro-interactions</div>
            <div className="mt-2 text-sm text-white/70">
              This page keeps the same Praktix color system while making each section visually distinct via unique imagery and motion.
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 right-6 z-10">
        <a
          href="#top"
          className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
          style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)` }}
        >
          <ArrowRight className="h-4 w-4 rotate-180" {...iconStrongProps} />
          Back to Top
        </a>
      </div>
    </section>
  );
}

/** ---------------- PAGE ---------------- */
export default function PraktixModelAboutPage() {
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
      <Hero />
      <Framework />
      <DeliveryFormats />
      <ExpertEcosystem />
      <AILayer />
      <PartnershipArchitecture />
      <Differentiator />
      <Closing />

      <style>{css}</style>
    </div>
  );
}

/** ---------------- CSS (extra premium animations) ---------------- */
const css = `
/* subtle global moving streak */
.shine{
  position:absolute;
  inset:-30% -30%;
  background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0.12) 45%, transparent 60%);
  transform: translateX(-25%) rotate(-10deg);
  filter: blur(1px);
  animation: shineMove 5.6s ease-in-out infinite;
  opacity: 0.45;
}
@keyframes shineMove{
  0%{ transform: translateX(-30%) rotate(-10deg); }
  50%{ transform: translateX(25%) rotate(-10deg); }
  100%{ transform: translateX(-30%) rotate(-10deg); }
}
`;
