import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  ChartNoAxesCombined,
  ChevronRight,
  Compass,
  FileCheck2,
  Flame,
  Globe2,
  GraduationCap,
  Layers,
  LineChart,
  ListChecks,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
  Building2,
  Users,
  CheckCircle2,
  XCircle,
} from "lucide-react";

/** =======================
 *  SAME COLOR SYSTEM (from your code)
 *  ======================= */
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

const iconStrongProps = { strokeWidth: 2.4 };

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useInViewOnce(threshold = 0.25) {
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

function IconShell({ color, children }) {
  return (
    <span
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl ring-1"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
        border: "1px solid rgba(255,255,255,0.22)",
        boxShadow:
          "0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.20)",
      }}
    >
      <span style={{ color }}>{children}</span>
    </span>
  );
}

function SectionHeader({ eyebrow, title, highlight, subtitle, dark }) {
  return (
    <div className={cx("mx-auto max-w-6xl", dark ? "text-white" : "text-[#0B1220]")}>
      {eyebrow ? (
        <div
          className={cx(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-widest ring-1",
            dark
              ? "bg-white/10 text-white/80 ring-white/10"
              : "bg-[#0B1220]/5 text-[#0B1220]/70 ring-[#0B1220]/10"
          )}
        >
          <Sparkles className="h-4 w-4" style={{ color: THEME.accent }} {...iconStrongProps} />
          <span>{eyebrow}</span>
        </div>
      ) : null}

      <h2
        className={cx(
          "mt-5 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-[#0B1220]"
        )}
      >
        {title}{" "}
        {highlight ? (
          <span style={{ color: THEME.pink }}>{highlight}</span>
        ) : null}
      </h2>

      {subtitle ? (
        <p
          className={cx(
            "mt-3 max-w-4xl text-balance text-base sm:text-lg",
            dark ? "text-white/70" : "text-[#0B1220]/70"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function GradientButton({ children, href = "#", variant = "primary" }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const primary =
    "text-white shadow-[0_12px_30px_rgba(34,211,238,0.18)] hover:translate-y-[-1px] active:translate-y-[0px]";
  const secondary =
    "bg-transparent text-white ring-1 ring-white/20 hover:bg-white/5";
  const stylePrimary = {
    background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.82)} 55%, ${accent(
      0.6
    )} 120%)`,
  };

  return (
    <a
      href={href}
      className={cx(base, variant === "primary" ? primary : secondary)}
      style={variant === "primary" ? stylePrimary : undefined}
    >
      {children}
      <ArrowRight className="h-4 w-4" {...iconStrongProps} />
    </a>
  );
}

function clamp(lines) {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
    overflow: "hidden",
  };
}

/** =======================
 *  DATA (from PDF content, re-laid out)
 *  ======================= */
const HERO_WORDS = ["Structured", "Measured", "Engineered"];

const PHILOSOPHY_LAYERS = [
  { label: "Real-World Execution", icon: Zap, color: THEME.accent },
  { label: "Expert Mentorship", icon: ShieldCheck, color: THEME.accent2 },
  { label: "Structured Feedback", icon: ListChecks, color: THEME.accent3 },
  { label: "Measurable Outcomes", icon: Target, color: THEME.accent4 },
];

const PILLARS = [
  {
    key: "projects",
    title: "Real Projects",
    desc:
      "Structured challenges with production-level expectations and tangible deliverables.",
    bullets: ["Defined milestones", "Portfolio-ready output", "Real constraints"],
    icon: Blocks,
    accent: THEME.accent,
    soft: "rgba(34,211,238,0.16)",
  },
  {
    key: "supervision",
    title: "Expert Supervision",
    desc:
      "Guided by industry professionals and university experts with weekly reviews.",
    bullets: ["Practical feedback", "Professional standards", "Strategic guidance"],
    icon: Users,
    accent: THEME.accent2,
    soft: "rgba(167,139,250,0.16)",
  },
  {
    key: "system",
    title: "Structured System",
    desc:
      "A defined execution framework — timelines, KPIs, tracking, and validation.",
    bullets: ["Clear timelines", "Measurable KPIs", "Performance tracking"],
    icon: Layers,
    accent: THEME.accent3,
    soft: "rgba(52,211,153,0.14)",
  },
  {
    key: "outcomes",
    title: "Verified Outcomes",
    desc:
      "Impact measured beyond participation: readiness, reports, and tracked movement.",
    bullets: ["Performance reports", "Career readiness", "Impact tracking"],
    icon: BadgeCheck,
    accent: THEME.accent4,
    soft: "rgba(245,158,11,0.14)",
  },
];

const PROCESS_STEPS = [
  {
    key: "entry",
    title: "Selection & Goal Alignment",
    icon: Compass,
    detail:
      "We align goals, baseline skills, and target outcomes before execution begins.",
    color: THEME.accent,
  },
  {
    key: "struct",
    title: "Program Structuring",
    icon: Layers,
    detail:
      "A structured plan: timeline, milestones, KPIs, and evaluation checkpoints.",
    color: THEME.accent2,
  },
  {
    key: "exec",
    title: "Real Project Execution",
    icon: BriefcaseIcon,
    detail:
      "Weekly sprints, delivery under constraints, iteration, and mentor feedback.",
    color: THEME.accent3,
  },
  {
    key: "eval",
    title: "Expert Evaluation",
    icon: FileCheck2,
    detail:
      "Documented evaluation, standards-based review, and improvement loops.",
    color: THEME.accent4,
  },
  {
    key: "final",
    title: "Final Delivery & Positioning",
    icon: RocketIcon,
    detail:
      "Portfolio-ready outputs, proof-of-work packaging, and career positioning.",
    color: THEME.pink,
  },
];

const STAKEHOLDERS = [
  {
    title: "For Individuals",
    desc: "Structured execution that builds capability and confidence.",
    icon: GraduationCap,
    color: THEME.accent,
  },
  {
    title: "For Universities",
    desc: "Integrated internship models that strengthen employability metrics.",
    icon: Building2,
    color: THEME.accent2,
  },
  {
    title: "For Organizations",
    desc: "Workforce development aligned with emerging tech and measurable ROI.",
    icon: Globe2,
    color: THEME.accent3,
  },
];

const METRICS = [
  { label: "Completion rate", value: 92, suffix: "%", icon: CheckCircle2, color: THEME.accent3 },
  { label: "Project performance", value: 87, suffix: "%", icon: LineChart, color: THEME.accent },
  { label: "Skill progression", value: 3.7, suffix: "x", icon: Flame, color: THEME.accent4 },
  { label: "Career movement", value: 68, suffix: "%", icon: ChevronRight, color: THEME.accent2 },
];

const STANDARDS = [
  "European industry practices",
  "Academic rigor",
  "Outcome-based education models",
  "Professional execution standards",
];

/** =======================
 *  Icon helpers to keep imports light
 *  ======================= */
function BriefcaseIcon(props) {
  return <BriefcaseSvg {...props} />;
}
function RocketIcon(props) {
  return <RocketSvg {...props} />;
}

// Minimal inline SVGs (so you don’t need extra lucide imports if you don’t want)
function BriefcaseSvg({ className, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...rest}>
      <path
        d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 8h16a2 2 0 0 1 2 2v7a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-7a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 12h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function RocketSvg({ className, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...rest}>
      <path
        d="M5 13c5 0 8-8 14-8 0 6-8 9-8 14l-2 2-2-2 2-2c-5 0-4-3-4-6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 10a2 2 0 1 0 0.01 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** =======================
 *  MAIN PAGE
 *  ======================= */
export default function ValueModelPage() {
  const reduce = useReducedMotion();

  // Hero parallax (mouse)
  const [p, setP] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setP({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const heroWordIdx = useMemo(() => {
    // animated loop index
    return Math.floor(Date.now() / 1000) % HERO_WORDS.length;
  }, []);

  // Pillars interactive
  const [activePillar, setActivePillar] = useState(PILLARS[0].key);

  // Process interactive
  const [activeStep, setActiveStep] = useState(PROCESS_STEPS[0].key);

  // In-view triggers
  const philosophy = useInViewOnce(0.25);
  const pillars = useInViewOnce(0.18);
  const process = useInViewOnce(0.18);
  const metrics = useInViewOnce(0.18);
  const diff = useInViewOnce(0.2);

  const activeP = useMemo(
    () => PILLARS.find((x) => x.key === activePillar) || PILLARS[0],
    [activePillar]
  );
  const activeS = useMemo(
    () => PROCESS_STEPS.find((x) => x.key === activeStep) || PROCESS_STEPS[0],
    [activeStep]
  );

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
      {/* Global animated system grid background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 opacity-70 system-radials" />
        <div className="absolute inset-0 opacity-[0.18] system-grid" />
        <div className="absolute inset-0 opacity-55">
          <div className="light-streak" />
        </div>
      </div>

      {/* Top Nav (new layout) */}
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
              <div className="text-xs text-white/60">Value Model</div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink href="#philosophy" label="Philosophy" />
            <NavLink href="#pillars" label="Pillars" />
            <NavLink href="#process" label="Process" />
            <NavLink href="#evidence" label="Measurement" />
            <NavLink href="#difference" label="Differentiator" />
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#process"
              className="hidden rounded-full px-4 py-2 text-sm font-semibold text-white/70 ring-1 ring-white/15 transition hover:bg-white/5 md:inline-flex"
            >
              See How It Works
            </a>
            <GradientButton href="#pillars">Explore Pillars</GradientButton>
          </div>
        </div>
      </header>

      {/* =======================
       *  HERO (NEW: asymmetrical split + orbit system)
       *  ======================= */}
      <section className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-14 lg:grid-cols-12 lg:py-18">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/75 ring-1 ring-white/10">
              <Layers className="h-4 w-4" style={{ color: THEME.sand }} {...iconStrongProps} />
              <span>OUR VALUE MODEL</span>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              A Structured System. <br />
              Not Random Training.
            </h1>

            <p className="mt-5 max-w-xl text-balance text-base text-white/70 sm:text-lg">
              We design professional growth through a deliberate, measurable model.
            </p>

            <p className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-white/65">
              From skill development to verified outcomes — every step is engineered.
            </p>

            {/* Animated words (sequential style) */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {HERO_WORDS.map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.12, duration: 0.45, ease: "easeOut" }}
                  className="rounded-full px-4 py-2 text-xs font-semibold ring-1"
                  style={{
                    background:
                      i === 0
                        ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 100%)`
                        : "rgba(255,255,255,0.06)",
                    borderColor: "rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.92)",
                  }}
                >
                  {w}
                </motion.span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GradientButton href="#process">See How It Works</GradientButton>
              <GradientButton href="#pillars" variant="secondary">
                Explore Programs
              </GradientButton>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
              <MiniProof
                icon={ShieldCheck}
                title="System clarity"
                desc="Framework over improvisation"
                color={THEME.accent2}
              />
              <MiniProof
                icon={FileCheck2}
                title="Verified outcomes"
                desc="Proof-of-work deliverables"
                color={THEME.accent4}
              />
            </div>
          </motion.div>

          {/* Right: orbit diagram (parallax + glow) */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-[560px]">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
                className="relative overflow-hidden rounded-[44px] ring-1 ring-white/10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%)",
                  boxShadow: "0 26px 90px rgba(0,0,0,0.35)",
                }}
              >
                {/* moving grid lines inside the hero card */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.22] hero-grid" />

                {/* orbit system */}
                <div className="relative p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold tracking-widest text-white/60">
                      MODEL MAP
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        borderColor: "rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.82)",
                      }}
                    >
                      Interactive
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-12 sm:items-center">
                    {/* center orb */}
                    <div className="sm:col-span-7">
                      <HeroOrbit parallax={p} reduce={reduce} />
                    </div>

                    {/* legend */}
                    <div className="sm:col-span-5">
                      <div className="space-y-3">
                        {PHILOSOPHY_LAYERS.map((x, idx) => {
                          const Icon = x.icon;
                          return (
                            <motion.div
                              key={x.label}
                              initial={{ opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.5,
                                ease: "easeOut",
                                delay: 0.15 + idx * 0.08,
                              }}
                              className="rounded-3xl p-4 ring-1 ring-white/10"
                              style={{
                                background: "rgba(255,255,255,0.04)",
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <IconShell color={x.color}>
                                  <Icon className="h-4 w-4" {...iconStrongProps} />
                                </IconShell>
                                <div>
                                  <div className="text-sm font-semibold text-white" style={clamp(1)}>
                                    {x.label}
                                  </div>
                                  <div className="mt-1 text-xs text-white/65">
                                    Layer {idx + 1}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      <div className="mt-4 rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
                        <div className="text-xs font-semibold tracking-widest text-white/60">
                          SIGNAL
                        </div>
                        <div className="mt-2 text-sm text-white/75">
                          The system is designed to turn learning into validated capability.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* floating tags */}
              <motion.div
                className="pointer-events-none absolute -left-6 top-10 hidden md:block"
                animate={reduce ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <FloatTag label="Background grid motion" />
              </motion.div>
              <motion.div
                className="pointer-events-none absolute -right-6 bottom-12 hidden md:block"
                animate={reduce ? {} : { y: [0, 12, 0] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <FloatTag label="Expandable sections" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================
       *  PHILOSOPHY (NEW: ring stack + punchy copy)
       *  ======================= */}
      <section
        id="philosophy"
        className="relative"
        style={{ background: THEME.sand, color: THEME.deep }}
      >
        <div ref={philosophy.ref} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionHeader
            eyebrow="THE CORE PHILOSOPHY"
            title="Experience is the foundation"
            subtitle="Education builds knowledge. We build applied capability. Real experience must lead — everything else supports it."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={philosophy.inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div
                className="relative overflow-hidden rounded-[40px] p-7 ring-1 ring-[#0B1220]/10"
                style={{
                  background:
                    "radial-gradient(900px circle at 20% 20%, rgba(11,18,32,0.08), transparent 55%), rgba(255,255,255,0.6)",
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">
                    LAYERED MODEL
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
                    style={{
                      background: "rgba(11,18,32,0.06)",
                      borderColor: "rgba(11,18,32,0.10)",
                      color: "rgba(11,18,32,0.72)",
                    }}
                  >
                    4 levels
                  </span>
                </div>

                <div className="mt-6">
                  <PhilosophyRings />
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <InfoChip
                    icon={Zap}
                    title="Execution first"
                    desc="Work under real constraints"
                    color={THEME.accent}
                    light
                  />
                  <InfoChip
                    icon={Target}
                    title="Outcome proof"
                    desc="Validated deliverables"
                    color={THEME.accent4}
                    light
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={philosophy.inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
              className="lg:col-span-5"
            >
              <div className="space-y-4">
                <QuoteCard
                  title="Why this works"
                  icon={Sparkles}
                  color={THEME.pink}
                  text="Capability is built through deliberate execution — not passive learning."
                />
                <QuoteCard
                  title="What changes"
                  icon={ChartNoAxesCombined}
                  color={THEME.accent2}
                  text="We turn effort into measurable progress: milestones, reviews, and evidence."
                />
                <QuoteCard
                  title="What you get"
                  icon={BadgeCheck}
                  color={THEME.accent3}
                  text="Clear proof-of-work that hiring teams can validate."
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =======================
       *  PILLARS (NEW: interactive split + animated detail panel)
       *  ======================= */}
      <section id="pillars" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div ref={pillars.ref} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionHeader
            eyebrow="THE VALUE FRAMEWORK"
            title="The four pillars of career acceleration"
            highlight="(interactive)"
            subtitle="Tap a pillar to expand details. Built to feel like a system — not a brochure."
            dark
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Pillar grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {PILLARS.map((p, idx) => {
                  const Icon = p.icon;
                  const active = p.key === activePillar;
                  return (
                    <motion.button
                      key={p.key}
                      type="button"
                      onClick={() => setActivePillar(p.key)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        pillars.inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                      }
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.06 + idx * 0.06,
                      }}
                      whileHover={{ y: -6, scale: 1.01 }}
                      className={cx(
                        "group relative overflow-hidden rounded-[36px] p-5 text-left ring-1 transition",
                        active ? "ring-white/18" : "ring-white/10"
                      )}
                      style={{
                        background: active
                          ? `linear-gradient(180deg, ${p.soft} 0%, rgba(255,255,255,0.03) 85%)`
                          : "rgba(255,255,255,0.04)",
                        boxShadow: active
                          ? `0 20px 70px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)`
                          : "0 18px 60px rgba(0,0,0,0.28)",
                      }}
                    >
                      <div
                        className="absolute inset-x-0 top-0 h-1"
                        style={{
                          background: `linear-gradient(90deg, ${p.accent} 0%, rgba(255,255,255,0) 85%)`,
                          opacity: 0.95,
                        }}
                      />
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="shine" />
                      </div>

                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <IconShell color={p.accent}>
                            <Icon className="h-4 w-4" {...iconStrongProps} />
                          </IconShell>
                          <div>
                            <div className="text-sm font-semibold text-white">{p.title}</div>
                            <div className="mt-1 text-xs text-white/60">Click to expand</div>
                          </div>
                        </div>

                        <span
                          className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
                          style={{
                            background: active
                              ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 100%)`
                              : "rgba(255,255,255,0.07)",
                            borderColor: "rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.9)",
                          }}
                        >
                          Pillar {idx + 1}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-white/70" style={clamp(3)}>
                        {p.desc}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.bullets.slice(0, 2).map((b) => (
                          <span
                            key={b}
                            className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              borderColor: "rgba(255,255,255,0.10)",
                              color: "rgba(255,255,255,0.84)",
                            }}
                          >
                            {b}
                          </span>
                        ))}
                      </div>

                      {active ? (
                        <motion.div
                          layoutId="activeGlow"
                          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl"
                          style={{ background: p.soft, opacity: 0.8 }}
                        />
                      ) : null}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeP.key}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative overflow-hidden rounded-[40px] p-6 ring-1 ring-white/10"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
                    boxShadow: "0 26px 90px rgba(0,0,0,0.35)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <IconShell color={activeP.accent}>
                        <activeP.icon className="h-4 w-4" {...iconStrongProps} />
                      </IconShell>
                      <div>
                        <div className="text-xs font-semibold tracking-widest text-white/60">
                          EXPANDED
                        </div>
                        <div className="mt-1 text-xl font-semibold text-white">
                          {activeP.title}
                        </div>
                      </div>
                    </div>

                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
                      style={{
                        background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 100%)`,
                        borderColor: "rgba(255,255,255,0.14)",
                        color: "rgba(255,255,255,0.96)",
                        boxShadow: `0 14px 35px ${accent(0.22)}`,
                      }}
                    >
                      System Pillar
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-white/75">
                    {activeP.desc}
                  </p>

                  <div className="mt-6 rounded-3xl p-5 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <div className="text-xs font-semibold tracking-widest text-white/60">
                      WHAT THIS MEANS
                    </div>
                    <div className="mt-3 space-y-3">
                      {activeP.bullets.map((b, i) => (
                        <motion.div
                          key={b}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.06 }}
                          className="flex items-start gap-3"
                        >
                          <span
                            className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full ring-1"
                            style={{
                              background: "rgba(255,255,255,0.08)",
                              borderColor: "rgba(255,255,255,0.10)",
                            }}
                          >
                            <span className="h-2 w-2 rounded-full bg-white/90" />
                          </span>
                          <div className="text-sm text-white/80">{b}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <GradientButton href="#process">See the process</GradientButton>
                    <GradientButton href="#evidence" variant="secondary">
                      How we measure
                    </GradientButton>
                  </div>

                  <div
                    className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl"
                    style={{ background: activeP.soft, opacity: 0.9 }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* =======================
       *  PROCESS (NEW: clickable step rail + expanding panel)
       *  ======================= */}
      <section id="process" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div ref={process.ref} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionHeader
            eyebrow="FROM ENTRY TO OUTCOME"
            title="A step flow you can click through"
            subtitle="Each stage expands with a short explanation — designed as an interactive framework."
          />

          <div className="mt-10">
            <div className="relative overflow-hidden rounded-[42px] bg-white/60 p-6 ring-1 ring-[#0B1220]/10">
              {/* step rail */}
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2">
                  {PROCESS_STEPS.map((s) => {
                    const active = s.key === activeStep;
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setActiveStep(s.key)}
                        className={cx(
                          "group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition",
                          active ? "text-white" : "text-[#0B1220]/70 hover:bg-[#0B1220]/5"
                        )}
                        style={
                          active
                            ? { background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 75%)`, borderColor: "rgba(201,29,103,0.28)" }
                            : { background: "rgba(11,18,32,0.03)", borderColor: "rgba(11,18,32,0.10)" }
                        }
                      >
                        <Icon className="h-4 w-4" style={{ color: active ? "white" : s.color }} {...iconStrongProps} />
                        <span>{s.title}</span>
                        <ChevronRight className={cx("h-4 w-4 transition", active ? "opacity-90" : "opacity-40 group-hover:opacity-70")} {...iconStrongProps} />
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
                  CLICK A STEP TO EXPAND
                </div>
              </div>

              {/* expanded panel */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeS.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="mt-6 rounded-[36px] p-6 ring-1 ring-[#0B1220]/10"
                  style={{
                    background:
                      "radial-gradient(900px circle at 20% 20%, rgba(11,18,32,0.06), transparent 55%), rgba(255,255,255,0.7)",
                  }}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <span
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1"
                        style={{
                          background: "rgba(11,18,32,0.05)",
                          borderColor: "rgba(11,18,32,0.10)",
                        }}
                      >
                        <activeS.icon
                          className="h-5 w-5"
                          style={{ color: activeS.color }}
                          {...iconStrongProps}
                        />
                      </span>
                      <div>
                        <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
                          EXPANDED STAGE
                        </div>
                        <div className="mt-1 text-2xl font-semibold text-[#0B1220]">
                          {activeS.title}
                        </div>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#0B1220]/70">
                          {activeS.detail}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-3xl bg-[#0B1220]/5 p-4 ring-1 ring-[#0B1220]/10">
                      <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
                        OUTPUT SIGNAL
                      </div>
                      <div className="mt-2 text-sm font-semibold text-[#0B1220]">
                        Clear deliverable + evaluation checkpoint
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* stakeholders (new layout: tri cards + hover glow) */}
          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {STAKEHOLDERS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={process.inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 + i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-[36px] bg-white/60 p-6 ring-1 ring-[#0B1220]/10"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1"
                      style={{
                        background: "rgba(11,18,32,0.05)",
                        borderColor: "rgba(11,18,32,0.10)",
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: s.color }} {...iconStrongProps} />
                    </span>
                    <div>
                      <div className="text-lg font-semibold text-[#0B1220]">{s.title}</div>
                      <p className="mt-2 text-sm leading-relaxed text-[#0B1220]/70">
                        {s.desc}
                      </p>
                    </div>
                  </div>

                  <div
                    className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `rgba(201,29,103,0.10)` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =======================
       *  MEASUREMENT (NEW: dashboard mock + animated svg lines)
       *  ======================= */}
      <section id="evidence" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div ref={metrics.ref} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionHeader
            eyebrow="DATA-DRIVEN APPROACH"
            title="Measured. Not assumed."
            highlight="(dashboard mock)"
            subtitle="We track completion, performance, progression, and career movement as evidence — not vibes."
            dark
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={metrics.inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <DashboardMock />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={metrics.inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.06 }}
              className="lg:col-span-5"
            >
              <div className="rounded-[40px] bg-white/5 p-6 ring-1 ring-white/10">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold tracking-widest text-white/60">
                    KPI SNAPSHOT
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/75 ring-1 ring-white/10">
                    Live-style
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {METRICS.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={metrics.inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 + i * 0.06 }}
                        className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <IconShell color={m.color}>
                              <Icon className="h-4 w-4" {...iconStrongProps} />
                            </IconShell>
                            <div>
                              <div className="text-sm font-semibold text-white">{m.label}</div>
                              <div className="mt-1 text-xs text-white/60">Tracked signal</div>
                            </div>
                          </div>
                          <div className="text-lg font-semibold text-white">
                            {m.value}
                            {m.suffix}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                  <div className="text-xs font-semibold tracking-widest text-white/60">
                    ALIGNMENT
                  </div>
                  <div className="mt-2 text-sm text-white/75">
                    Built on international academic and industry standards.
                  </div>

                  <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-white/10">
                    <div className="marquee flex gap-2 py-3">
                      {[...STANDARDS, ...STANDARDS].map((s, idx) => (
                        <span
                          key={`${s}-${idx}`}
                          className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold ring-1"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            borderColor: "rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.84)",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 text-xs font-semibold tracking-widest text-white/60">
                    Professional. Structured. Outcome-driven.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =======================
       *  DIFFERENTIATOR (NEW: split compare w/ animated reveal)
       *  ======================= */}
      <section id="difference" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div ref={diff.ref} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionHeader
            eyebrow="THE DIFFERENTIATOR"
            title="What makes the model different?"
            subtitle="We replace weak signals with structured execution, supervision, and verified outcomes."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={diff.inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-6"
            >
              <CompareCard
                title="Common failure modes"
                subtitle="Looks like progress — produces weak evidence."
                tone="bad"
                rows={[
                  "Courses without execution",
                  "Internships without structure",
                  "Mentorship without accountability",
                ]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={diff.inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.06 }}
              className="lg:col-span-6"
            >
              <CompareCard
                title="Praktix model"
                subtitle="Clear system — strong proof-of-work."
                tone="good"
                rows={[
                  "Structured execution model",
                  "Expert-supervised delivery",
                  "Verified measurable outcomes",
                ]}
              />
            </motion.div>
          </div>

          {/* Closing CTA */}
          <div className="mt-12">
            <div
              className="relative overflow-hidden rounded-[36px] border border-[#0B1220]/10 px-6 py-10 text-center sm:px-10"
              style={{
                background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 100%)`,
                boxShadow: "0 24px 90px rgba(0,0,0,0.16)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.16]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)",
                }}
              />
              <div className="relative mx-auto max-w-4xl text-white">
                <div className="text-xs font-semibold text-white/85 sm:text-sm">
                  Growth is not accidental.
                </div>
                <div className="mt-3 text-3xl font-semibold md:text-4xl">
                  It is designed.
                </div>
                <p className="mx-auto mt-4 max-w-3xl text-sm font-medium text-white/85">
                  Our value model transforms learning into professional capability — with evidence.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href="#process"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] transition hover:opacity-95"
                  >
                    Start Your Journey <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </a>
                  <a
                    href="#pillars"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15"
                  >
                    Partner With Us <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <a
        href="#process"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
        style={{
          background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)`,
        }}
      >
        <Compass className="h-4 w-4" {...iconStrongProps} />
        See Flow
      </a>

      <style>{css}</style>
    </div>
  );
}

/** =======================
 *  Components
 *  ======================= */
function NavLink({ href, label }) {
  return (
    <a
      href={href}
      className="rounded-full px-3 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
    >
      {label}
    </a>
  );
}

function FloatTag({ label }) {
  return (
    <div
      className="rounded-full px-4 py-2 text-xs font-semibold ring-1"
      style={{
        background: "rgba(255,255,255,0.06)",
        borderColor: "rgba(255,255,255,0.12)",
        color: "rgba(255,255,255,0.82)",
        boxShadow: `0 18px 60px ${accent(0.12)}`,
      }}
    >
      {label}
    </div>
  );
}

function MiniProof({ icon: Icon, title, desc, color }) {
  return (
    <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="flex items-start gap-3">
        <IconShell color={color}>
          <Icon className="h-4 w-4" {...iconStrongProps} />
        </IconShell>
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-xs text-white/65">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function InfoChip({ icon: Icon, title, desc, color, light }) {
  return (
    <div
      className={cx(
        "rounded-3xl p-4 ring-1",
        light ? "bg-white/60 ring-[#0B1220]/10" : "bg-white/5 ring-white/10"
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl ring-1"
          style={{
            background: light ? "rgba(11,18,32,0.05)" : "rgba(255,255,255,0.06)",
            borderColor: light ? "rgba(11,18,32,0.10)" : "rgba(255,255,255,0.12)",
          }}
        >
          <Icon className="h-4 w-4" style={{ color }} {...iconStrongProps} />
        </span>
        <div>
          <div className={cx("text-sm font-semibold", light ? "text-[#0B1220]" : "text-white")}>
            {title}
          </div>
          <div className={cx("mt-1 text-xs", light ? "text-[#0B1220]/65" : "text-white/65")}>
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuoteCard({ title, icon: Icon, color, text }) {
  return (
    <div
      className="relative overflow-hidden rounded-[36px] bg-white/60 p-6 ring-1 ring-[#0B1220]/10"
      style={{
        background:
          "radial-gradient(900px circle at 15% 20%, rgba(11,18,32,0.07), transparent 55%), rgba(255,255,255,0.65)",
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1"
          style={{
            background: "rgba(11,18,32,0.05)",
            borderColor: "rgba(11,18,32,0.10)",
          }}
        >
          <Icon className="h-5 w-5" style={{ color }} {...iconStrongProps} />
        </span>
        <div>
          <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
            {title.toUpperCase()}
          </div>
          <div className="mt-1 text-sm font-semibold text-[#0B1220]">{title}</div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-[#0B1220]/72">{text}</p>
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "rgba(201,29,103,0.10)" }}
      />
    </div>
  );
}

function PhilosophyRings() {
  const rings = [
    { label: "Measurable Outcomes", color: THEME.accent4 },
    { label: "Structured Feedback", color: THEME.accent3 },
    { label: "Expert Mentorship", color: THEME.accent2 },
    { label: "Real-World Execution", color: THEME.accent },
  ];

  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-[520px] place-items-center">
      {/* outer soft glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 40% 30%, rgba(34,211,238,0.14), transparent 55%), radial-gradient(circle at 70% 70%, rgba(167,139,250,0.12), transparent 55%), radial-gradient(circle at 30% 80%, rgba(201,29,103,0.12), transparent 55%)",
        }}
      />
      {rings.map((r, i) => (
        <motion.div
          key={r.label}
          className="absolute grid place-items-center rounded-full ring-1"
          style={{
            width: `${92 - i * 18}%`,
            height: `${92 - i * 18}%`,
            borderColor: "rgba(11,18,32,0.10)",
            background: "rgba(255,255,255,0.38)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.06 * i }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${r.color}`,
              opacity: 0.22,
              filter: "blur(0.2px)",
            }}
          />
          <div className="absolute top-3 left-1/2 -translate-x-1/2">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
              style={{
                background: "rgba(11,18,32,0.05)",
                borderColor: "rgba(11,18,32,0.10)",
                color: "rgba(11,18,32,0.75)",
              }}
            >
              {r.label}
            </span>
          </div>
        </motion.div>
      ))}

      {/* core */}
      <div className="relative grid h-[40%] w-[40%] place-items-center rounded-full bg-[#0B1220] text-white shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
        <div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: `0 0 0 10px ${accent(0.14)}, 0 0 0 20px rgba(34,211,238,0.08)` }}
        />
        <div className="text-center">
          <div className="text-xs font-semibold tracking-widest text-white/70">CENTER</div>
          <div className="mt-2 text-sm font-semibold">Execution</div>
        </div>
      </div>
    </div>
  );
}

function HeroOrbit({ parallax, reduce }) {
  const tiltX = parallax.y * 6;
  const tiltY = parallax.x * 7;

  return (
    <div className="relative aspect-square w-full">
      {/* base glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(34,211,238,0.18), transparent 55%), radial-gradient(circle at 70% 70%, rgba(167,139,250,0.14), transparent 55%), radial-gradient(circle at 30% 80%, rgba(201,29,103,0.14), transparent 55%)",
        }}
      />

      <motion.div
        className="relative mx-auto grid h-full w-full place-items-center"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={
          reduce
            ? {}
            : {
                rotateZ: [0, 8, 0, -8, 0],
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* orbit rings */}
        <div className="absolute inset-[10%] rounded-full ring-1 ring-white/10" />
        <div className="absolute inset-[22%] rounded-full ring-1 ring-white/10" />
        <div className="absolute inset-[34%] rounded-full ring-1 ring-white/10" />

        {/* core orb */}
        <motion.div
          className="relative grid h-[46%] w-[46%] place-items-center overflow-hidden rounded-full ring-1 ring-white/12"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.16), transparent 60%), radial-gradient(circle at 70% 70%, rgba(233,231,223,0.10), transparent 55%), rgba(255,255,255,0.06)",
            boxShadow: "0 25px 70px rgba(0,0,0,0.35)",
            transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          }}
          animate={reduce ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 opacity-[0.28] orb-scan" />
          <div className="text-center">
            <div className="text-xs font-semibold tracking-widest text-white/70">SYSTEM CORE</div>
            <div className="mt-2 text-base font-semibold text-white">Value Model</div>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/75 ring-1 ring-white/10">
              <Zap className="h-4 w-4" style={{ color: THEME.accent }} {...iconStrongProps} />
              <span>Execution-led</span>
            </div>
          </div>
        </motion.div>

        {/* nodes */}
        <OrbitNode
          label="Projects"
          icon={Blocks}
          color={THEME.accent}
          angle={20}
          radius={42}
          parallax={parallax}
          reduce={reduce}
        />
        <OrbitNode
          label="Mentorship"
          icon={ShieldCheck}
          color={THEME.accent2}
          angle={140}
          radius={44}
          parallax={parallax}
          reduce={reduce}
        />
        <OrbitNode
          label="Feedback"
          icon={ListChecks}
          color={THEME.accent3}
          angle={245}
          radius={46}
          parallax={parallax}
          reduce={reduce}
        />
        <OrbitNode
          label="Outcomes"
          icon={Target}
          color={THEME.accent4}
          angle={320}
          radius={40}
          parallax={parallax}
          reduce={reduce}
        />
      </motion.div>
    </div>
  );
}

function OrbitNode({ label, icon: Icon, color, angle, radius, parallax, reduce }) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  const px = parallax.x * 6;
  const py = parallax.y * 6;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `translate(calc(-50% + ${x}px + ${px}px), calc(-50% + ${y}px + ${py}px))`,
      }}
      animate={reduce ? {} : { y: [0, -4, 0] }}
      transition={{ duration: 4.6 + (angle % 7) * 0.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="rounded-3xl bg-white/5 p-3 ring-1 ring-white/10 backdrop-blur">
        <div className="flex items-center gap-3">
          <IconShell color={color}>
            <Icon className="h-4 w-4" {...iconStrongProps} />
          </IconShell>
          <div>
            <div className="text-sm font-semibold text-white">{label}</div>
            <div className="text-xs text-white/60">Node</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DashboardMock() {
  // simple animated sparkline
  return (
    <div
      className="relative overflow-hidden rounded-[42px] p-6 ring-1 ring-white/10"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
        boxShadow: "0 26px 90px rgba(0,0,0,0.35)",
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold tracking-widest text-white/60">DASHBOARD</div>
          <div className="mt-1 text-lg font-semibold text-white">System Metrics</div>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/75 ring-1 ring-white/10">
          Mock UI
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DashCard title="Completion" value="92%" tone={THEME.accent3} />
        <DashCard title="Performance" value="87%" tone={THEME.accent} />
        <DashCard title="Progression" value="3.7x" tone={THEME.accent4} />
        <DashCard title="Movement" value="68%" tone={THEME.accent2} />
      </div>

      <div className="mt-6 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold tracking-widest text-white/60">TREND</div>
          <div className="text-xs font-semibold text-white/60">Month 1 → Month 4</div>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-white/10">
          <svg viewBox="0 0 600 180" className="h-[180px] w-full">
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={THEME.pink} stopOpacity="0.9" />
                <stop offset="55%" stopColor={accent(0.78)} stopOpacity="0.9" />
                <stop offset="100%" stopColor={THEME.accent} stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={THEME.accent} stopOpacity="0.18" />
                <stop offset="100%" stopColor={THEME.accent} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* grid */}
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={i}
                x1="0"
                y1={20 + i * 28}
                x2="600"
                y2={20 + i * 28}
                stroke="rgba(255,255,255,0.08)"
              />
            ))}

            {/* area */}
            <path
              d="M 0 140 C 80 130, 120 120, 180 108 C 240 94, 300 88, 360 72 C 420 56, 490 55, 600 38 L 600 180 L 0 180 Z"
              fill="url(#area)"
            />

            {/* animated line */}
            <path
              d="M 0 140 C 80 130, 120 120, 180 108 C 240 94, 300 88, 360 72 C 420 56, 490 55, 600 38"
              fill="none"
              stroke="url(#g1)"
              strokeWidth="4"
              className="dash-line"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="mt-4 text-sm text-white/65">
          The system tracks evidence across the full execution cycle.
        </div>
      </div>

      {/* soft glow */}
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "rgba(34,211,238,0.14)" }}
      />
      <div
        className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "rgba(167,139,250,0.12)" }}
      />
    </div>
  );
}

function DashCard({ title, value, tone }) {
  return (
    <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="h-10 w-1 rounded-full" style={{ background: tone, opacity: 0.7 }} />
      </div>
      <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs text-white/60">Tracked signal</div>
    </div>
  );
}

function CompareCard({ title, subtitle, rows, tone }) {
  const good = tone === "good";
  return (
    <div
      className="relative overflow-hidden rounded-[40px] bg-white/60 p-7 ring-1 ring-[#0B1220]/10"
      style={{
        background: good
          ? "linear-gradient(180deg, rgba(52,211,153,0.14) 0%, rgba(255,255,255,0.65) 65%)"
          : "linear-gradient(180deg, rgba(201,29,103,0.12) 0%, rgba(255,255,255,0.65) 65%)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
            {good ? "DESIGNED MODEL" : "COMMON PATTERN"}
          </div>
          <div className="mt-1 text-2xl font-semibold text-[#0B1220]">{title}</div>
          <div className="mt-2 text-sm text-[#0B1220]/70">{subtitle}</div>
        </div>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
          style={{
            background: "rgba(11,18,32,0.06)",
            borderColor: "rgba(11,18,32,0.10)",
            color: "rgba(11,18,32,0.72)",
          }}
        >
          Compare
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {rows.map((r, i) => (
          <motion.div
            key={r}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.06 }}
            className="flex items-start gap-3 rounded-3xl bg-white/55 p-4 ring-1 ring-[#0B1220]/10"
          >
            <span className="mt-0.5">
              {good ? (
                <CheckCircle2 className="h-5 w-5" style={{ color: THEME.accent3 }} {...iconStrongProps} />
              ) : (
                <XCircle className="h-5 w-5" style={{ color: THEME.pink }} {...iconStrongProps} />
              )}
            </span>
            <div className="text-sm text-[#0B1220]/75">{r}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** =======================
 *  CSS (same vibe as your code, but more animated)
 *  ======================= */
const css = `
.system-radials{
  background:
    radial-gradient(1200px circle at 10% 10%, rgba(255,255,255,0.08), transparent 55%),
    radial-gradient(1200px circle at 80% 20%, rgba(233,231,223,0.06), transparent 55%),
    radial-gradient(900px circle at 60% 90%, rgba(255,255,255,0.06), transparent 55%);
}
.system-grid{
  background-image:
    linear-gradient(rgba(233,231,223,0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(233,231,223,0.12) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(900px circle at 30% 20%, rgba(0,0,0,1), transparent 70%);
  animation: gridMove 14s linear infinite;
}
@keyframes gridMove{
  0% { transform: translate3d(0,0,0); }
  100% { transform: translate3d(-60px, -60px, 0); }
}

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

.hero-grid{
  background-image:
    linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px);
  background-size: 54px 54px;
  animation: heroGrid 10s linear infinite;
  mask-image: radial-gradient(420px circle at 60% 35%, rgba(0,0,0,1), transparent 70%);
}
@keyframes heroGrid{
  0% { transform: translate3d(0,0,0); }
  100% { transform: translate3d(-54px, -54px, 0); }
}

.orb-scan{
  background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.12) 45%, transparent 62%);
  transform: translateX(-30%) rotate(-12deg);
  filter: blur(1px);
  animation: orbScan 5.4s ease-in-out infinite;
}
@keyframes orbScan{
  0% { transform: translateX(-35%) rotate(-12deg); opacity: 0.2; }
  50% { transform: translateX(20%) rotate(-12deg); opacity: 0.35; }
  100% { transform: translateX(-35%) rotate(-12deg); opacity: 0.2; }
}

/* Card shine (same concept as your code) */
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

/* Marquee */
.marquee{
  animation: marquee 16s linear infinite;
}
@keyframes marquee{
  0%{ transform: translateX(0); }
  100%{ transform: translateX(-50%); }
}

/* SVG dash animation */
.dash-line{
  stroke-dasharray: 1200;
  stroke-dashoffset: 1200;
  animation: dash 2.2s ease-out forwards;
}
@keyframes dash{
  to { stroke-dashoffset: 0; }
}
`;
