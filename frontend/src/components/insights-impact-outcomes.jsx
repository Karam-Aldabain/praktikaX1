import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const Motion = motion;
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Briefcase,
  Building2,
  ClipboardCheck,
  Download,
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
  CheckCircle2,
  Info,
} from "lucide-react";

/** ---------------------------------------------------------------------
 *  THEME (keep your palette — NOT PDF palette)
 *  ------------------------------------------------------------------- */
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

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

const iconStrongProps = { strokeWidth: 2.4 };

/** ---------------------------------------------------------------------
 *  DATA (admin-editable via local “Edit mode”)
 *  ------------------------------------------------------------------- */
const DEFAULT_METRICS = [
  {
    key: "completion",
    label: "Program Completion Rate",
    value: 85,
    suffix: "%",
    bar: 85,
    hint: "Completion tracked per cohort cycle",
    icon: CheckCircle2,
    color: THEME.accent3,
  },
  {
    key: "advancement",
    label: "Career Advancement (≤ 6 months)",
    value: 72,
    suffix: "%",
    bar: 72,
    hint: "Placement, promotion, or role transition",
    icon: Briefcase,
    color: THEME.accent4,
  },
  {
    key: "portfolio",
    label: "Portfolio → Interview Conversion",
    value: 60,
    suffix: "%+",
    bar: 60,
    hint: "Validated by hiring pipeline outcomes",
    icon: Target,
    color: THEME.accent,
  },
  {
    key: "salary",
    label: "Reported Salary Growth",
    value: 40,
    suffix: "%",
    bar: 40,
    hint: "Self-reported + verified where possible",
    icon: LineChart,
    color: THEME.accent2,
  },
  {
    key: "projects",
    label: "Practical Project Experience Increase",
    value: 4,
    suffix: "x",
    bar: 80,
    hint: "Measured as scoped deliverables shipped",
    icon: Zap,
    color: THEME.accent,
  },
  {
    key: "satisfaction",
    label: "Institutional Satisfaction Rate",
    value: 90,
    suffix: "%",
    bar: 90,
    hint: "Post-program partner survey",
    icon: BadgeCheck,
    color: THEME.accent3,
  },
];

const CAREER_BREAKDOWN = [
  {
    title: "Placement Impact",
    points: ["Full-time job offers", "Internship-to-hire conversions", "Cross-border opportunities"],
    icon: Briefcase,
    color: THEME.accent4,
  },
  {
    title: "Professional Growth",
    points: ["Promotions in 6–12 months", "Role transitions (Student → Analyst)", "Expanded responsibilities"],
    icon: BarChart3,
    color: THEME.accent3,
  },
  {
    title: "Portfolio Strength",
    points: ["Deployed live systems", "Industry-reviewed evaluations", "Verified mentor assessments"],
    icon: ClipboardCheck,
    color: THEME.accent2,
  },
];

const ROI_BLOCKS = [
  {
    title: "For Universities",
    icon: GraduationCap,
    color: THEME.accent2,
    bullets: [
      "Increased graduate employability",
      "Improved industry alignment",
      "Stronger accreditation positioning",
      "Employer partnership expansion",
    ],
  },
  {
    title: "For Companies",
    icon: Building2,
    color: THEME.accent3,
    bullets: [
      "Workforce upskilling",
      "Productivity increase",
      "AI adoption acceleration",
      "Reduced onboarding time",
    ],
  },
  {
    title: "For Public Sector",
    icon: Globe2,
    color: THEME.accent,
    bullets: [
      "Digital readiness development",
      "Youth employment acceleration",
      "Innovation ecosystem growth",
      "Measurable delivery outcomes",
    ],
  },
];

const OUTCOME_TILES = [
  {
    title: "Software & Engineering",
    sub: "Deployed Applications",
    sample: "Live app + code review report",
    icon: Zap,
    color: THEME.accent,
  },
  {
    title: "Data & AI",
    sub: "Analytical Systems & Dashboards",
    sample: "Decision-grade dashboard + insights pack",
    icon: Flame,
    color: THEME.accent4,
  },
  {
    title: "Business & Strategy",
    sub: "Market & Growth Plans",
    sample: "Expansion plan + partner map",
    icon: Target,
    color: THEME.accent3,
  },
  {
    title: "Cybersecurity",
    sub: "Risk Assessments & Hardened Systems",
    sample: "Audit report + remediation plan",
    icon: Shield,
    color: THEME.accent2,
  },
  {
    title: "Digital Health",
    sub: "Operational Dashboards",
    sample: "KPI dashboard + workflow improvements",
    icon: Star,
    color: THEME.accent3,
  },
  {
    title: "Finance",
    sub: "Models & Forecasting Systems",
    sample: "Model + investment memo",
    icon: LineChart,
    color: THEME.accent4,
  },
];

const VERIFY_STEPS = [
  {
    title: "Real Project Execution",
    desc: "Participants work on live industry challenges.",
    icon: Briefcase,
    color: THEME.accent4,
  },
  {
    title: "Expert Supervision",
    desc: "Mentors from European industry & academia.",
    icon: Sparkles,
    color: THEME.accent2,
  },
  {
    title: "Structured Evaluation",
    desc: "Formal assessment, deliverable review, documented performance.",
    icon: ClipboardCheck,
    color: THEME.accent3,
  },
];

const ALUMNI_ROLES = [
  "AI Engineer",
  "Cloud Engineer",
  "Data Analyst",
  "Product Manager",
  "Consultant",
  "Digital Strategist",
  "FinTech Analyst",
  "Startup Founder",
];

const GERMANY_POINTS = [
  "Final project presentations in Germany",
  "Direct expert feedback",
  "European industry immersion",
  "Network expansion opportunities",
];

/** ---------------------------------------------------------------------
 *  HOOKS
 *  ------------------------------------------------------------------- */

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

function AnimatedNumber({ value, suffix = "", durationMs = 900 }) {
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
      const next = from + (value - from) * eased;
      setN(Number.isInteger(value) ? Math.round(next) : Number(next.toFixed(1)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, durationMs, reduce]);

  const display = reduce ? value : n;

  return (
    <span>
      {typeof display === "number" ? display.toLocaleString() : display}
      {suffix}
    </span>
  );
}

/** ---------------------------------------------------------------------
 *  UI BUILDING BLOCKS
 *  ------------------------------------------------------------------- */
function IconBadge({ color, children }) {
  return (
    <span
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl ring-1"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
        borderColor: "rgba(255,255,255,0.18)",
        boxShadow: "0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.20)",
      }}
    >
      <span style={{ color }}>{children}</span>
    </span>
  );
}

function SectionTitle({ eyebrow, title, subtitle, dark }) {
  return (
    <div className={cx("mx-auto max-w-6xl", dark ? "text-white" : "text-[#0B1220]")}>
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

      <h2
        className={cx(
          eyebrow ? "mt-5 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl" : "mt-0 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-[#0B1220]"
        )}
      >
        {title}
      </h2>

      {subtitle ? (
        <p className={cx("mt-3 max-w-4xl text-balance text-base sm:text-lg", dark ? "text-white/70" : "text-[#0B1220]/70")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function GradientButton({ children, href, onClick, variant = "primary", icon = ArrowRight }) {
  const Icon = icon;
  const Comp = href ? "a" : "button";
  const props = href ? { href } : { type: "button" };
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const primary =
    "text-white shadow-[0_12px_30px_rgba(34,211,238,0.18)] hover:translate-y-[-1px] active:translate-y-[0px]";
  const secondary = "bg-transparent text-white ring-1 ring-white/20 hover:bg-white/5";

  return (
    <Comp
      {...props}
      onClick={onClick}
      className={cx(base, variant === "primary" ? primary : secondary)}
      style={
        variant === "primary"
          ? {
              background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.82)} 55%, ${accent(0.60)} 120%)`,
            }
          : undefined
      }
    >
      {children}
      <Icon className="h-4 w-4" {...iconStrongProps} />
    </Comp>
  );
}

function Tooltip({ text }) {
  return (
    <span className="group relative inline-flex items-center">
      <Info className="h-4 w-4 text-white/55" {...iconStrongProps} />
      <span
        className={cx(
          "pointer-events-none absolute right-0 top-6 z-20 w-[240px] origin-top-right scale-95 rounded-2xl px-3 py-2 text-xs opacity-0 shadow-2xl ring-1 transition",
          "group-hover:scale-100 group-hover:opacity-100"
        )}
        style={{
          background: "rgba(11,18,32,0.92)",
          borderColor: "rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.86)",
        }}
      >
        {text}
      </span>
    </span>
  );
}

/** Fancy tilt wrapper (more premium hover feel) */
function TiltCard({ children, className, style, hoverScale = 1.01 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const smx = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.7 });
  const smy = useSpring(my, { stiffness: 180, damping: 18, mass: 0.7 });

  const rotateX = useTransform(smy, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smx, [-0.5, 0.5], [-10, 10]);

  function onMove(e) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(px);
    my.set(py);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={reduce ? undefined : { scale: hoverScale }}
      style={{
        transformStyle: "preserve-3d",
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Simple animated SVG line chart (viewport-triggered) */
function MiniTrend({ inView }) {
  const reduce = useReducedMotion();
  return (
    <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold tracking-widest text-white/60">PERFORMANCE TREND</div>
        <div className="text-xs font-semibold text-white/60">Cohort-to-cohort</div>
      </div>

      <div className="mt-3">
        <svg viewBox="0 0 320 120" className="h-[120px] w-full">
          <defs>
            <linearGradient id="trendStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={THEME.accent} stopOpacity="1" />
              <stop offset="55%" stopColor={THEME.accent2} stopOpacity="1" />
              <stop offset="100%" stopColor={THEME.accent3} stopOpacity="1" />
            </linearGradient>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={THEME.accent} stopOpacity="0.20" />
              <stop offset="100%" stopColor={THEME.accent} stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M10 95 C 50 60, 70 75, 110 55 C 150 35, 175 55, 210 40 C 250 22, 275 35, 310 18"
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          <motion.path
            d="M10 95 C 50 60, 70 75, 110 55 C 150 35, 175 55, 210 40 C 250 22, 275 35, 310 18"
            fill="none"
            stroke="url(#trendStroke)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              reduce
                ? { pathLength: 1, opacity: 1 }
                : inView
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          <motion.path
            d="M10 95 C 50 60, 70 75, 110 55 C 150 35, 175 55, 210 40 C 250 22, 275 35, 310 18 L 310 118 L 10 118 Z"
            fill="url(#trendFill)"
            initial={{ opacity: 0 }}
            animate={reduce ? { opacity: 1 } : inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          />
        </svg>

        <div className="mt-2 flex items-center justify-between text-xs text-white/55">
          <span>Baseline</span>
          <span>Acceleration</span>
          <span>Validated outcomes</span>
        </div>
      </div>
    </div>
  );
}

/** ---------------------------------------------------------------------
 *  MAIN PAGE
 *  ------------------------------------------------------------------- */
export default function ImpactOutcomesPage() {
  const [metrics] = useState(DEFAULT_METRICS);

  const { ref: trendRef, inView: trendVisible } = useInViewOnce(0.35);
  const { ref: countersRef, inView: countersVisible } = useInViewOnce(0.35);

  const reduce = useReducedMotion();

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
      {/* Global background layers */}
      <div className="pointer-events-none fixed inset-0">
        <motion.div
          className="absolute inset-0 opacity-70"
          animate={reduce ? undefined : { backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "radial-gradient(1200px circle at 10% 10%, rgba(255,255,255,0.08), transparent 55%), " +
              "radial-gradient(1200px circle at 80% 20%, rgba(233,231,223,0.06), transparent 55%), " +
              "radial-gradient(900px circle at 60% 90%, rgba(255,255,255,0.06), transparent 55%)",
            backgroundSize: "180% 180%",
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

      {/* HERO */}
      <section id="hero" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-14 pt-8 lg:grid-cols-2 lg:pb-20 lg:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <h1 className="mt-2 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              Results You Can Measure.
              <br />
              Careers You Can Prove.
            </h1>

            <p className="mt-5 max-w-xl text-balance text-base text-white/70 sm:text-lg">
              We don’t measure attendance. We measure placements, promotions, performance, and portfolio impact.
            </p>
            <p className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-white/65">
              Structured programs. Real projects. Verified outcomes — designed to become a hiring signal.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GradientButton href="#metrics">View Success Stories</GradientButton>
              <GradientButton href="#roi" variant="secondary">
                Partner With Us
              </GradientButton>
            </div>

          </motion.div>

          {/* Hero Visual / Animated Data Preview */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-[620px]">
              <div
                className="relative overflow-hidden rounded-[44px] p-6 ring-1 ring-white/10"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                  boxShadow: "0 25px 70px rgba(0,0,0,0.35)",
                }}
              >
                {/* moving horizontal data lines */}
                <div className="pointer-events-none absolute inset-0 opacity-70">
                  <div className="data-lines" />
                </div>

                {/* glow orbs */}
                <motion.div
                  className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full blur-3xl"
                  animate={reduce ? undefined : { y: [0, -12, 0], x: [0, 10, 0] }}
                  transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ background: "rgba(34,211,238,0.16)" }}
                />
                <motion.div
                  className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full blur-3xl"
                  animate={reduce ? undefined : { y: [0, 10, 0], x: [0, -12, 0] }}
                  transition={{ duration: 8.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ background: "rgba(167,139,250,0.14)" }}
                />

                {/* big ghost counters */}
                <div className="relative grid grid-cols-2 gap-4">
                  <GhostStat label="COMPLETION" value="85%" />
                  <GhostStat label="ADVANCEMENT" value="72%" />
                  <GhostStat label="PORTFOLIO" value="60%+" />
                  <GhostStat label="SATISFACTION" value="90%" />
                </div>

              </div>

            
            </div>
          </motion.div>
        </div>
      </section>

      {/* METRICS */}
      <section id="metrics" className="relative">
        <div ref={countersRef} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Measurable outcomes that hiring teams recognize"
            dark
          />

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {metrics.map((m, idx) => {
              const Icon = m.icon;
              return (
                <TiltCard
                  key={m.key}
                  className="group relative overflow-hidden rounded-[34px] bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur"
                  style={{ boxShadow: "0 18px 70px rgba(0,0,0,0.35)" }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-1"
                    style={{
                      background: `linear-gradient(90deg, ${m.color} 0%, rgba(255,255,255,0.0) 80%)`,
                      opacity: 0.9,
                    }}
                  />

                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="shine" />
                  </div>

                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <IconBadge color={m.color}>
                        <Icon className="h-5 w-5" {...iconStrongProps} />
                      </IconBadge>
                      <div>
                        <div className="text-xs font-semibold tracking-widest text-white/55">{m.label.toUpperCase()}</div>
                        <div className="mt-2 text-4xl font-semibold text-white">
                          {countersVisible ? (
                            <AnimatedNumber value={m.value} suffix={m.suffix} durationMs={980 + idx * 70} />
                          ) : (
                            <span>0{m.suffix}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Tooltip text={m.hint} />
                  </div>

                  <div className="relative mt-5 h-3 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 70%, ${m.color} 140%)`,
                      }}
                      initial={{ width: 0 }}
                      animate={reduce ? { width: `${m.bar}%` } : countersVisible ? { width: `${m.bar}%` } : { width: 0 }}
                      transition={{ duration: 0.9, ease: "easeOut", delay: 0.08 + idx * 0.04 }}
                    />
                  </div>
                </TiltCard>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div ref={trendRef}>
              <MiniTrend inView={trendVisible} />
            </div>
          </div>
        </div>
      </section>

      {/* CAREER BREAKDOWN */}
      <section id="breakdown" className="relative" style={{ background: "linear-gradient(180deg, rgba(11,18,32,1) 0%, rgba(6,10,20,1) 100%)" }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="From internship to career progression"
            dark
          />

          {/* progression rail */}
          <div className="mt-10 rounded-[36px] bg-white/5 p-6 ring-1 ring-white/10">
            <div className="relative overflow-hidden rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {["Assessment", "Placement", "Execution", "Evaluation", "Career Signal"].map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.05 }}
                    className="relative flex-1 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10"
                  >
                    <div className="text-sm font-semibold text-white">{s}</div>
                    <div className="mt-1 text-xs text-white/55">Step {i + 1}</div>
                    {i < 4 ? (
                      <div className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 sm:block">
                        <motion.div
                          className="h-[2px] w-10"
                          initial={{ scaleX: 0, opacity: 0 }}
                          whileInView={{ scaleX: 1, opacity: 1 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 + i * 0.06 }}
                          style={{ transformOrigin: "left", background: `linear-gradient(90deg, ${THEME.accent} 0%, rgba(255,255,255,0.0) 90%)` }}
                        />
                      </div>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {CAREER_BREAKDOWN.map((b) => {
                const Icon = b.icon;
                return (
                  <TiltCard
                    key={b.title}
                    className="relative overflow-hidden rounded-[34px] bg-white/5 p-6 ring-1 ring-white/10"
                    style={{ boxShadow: "0 18px 70px rgba(0,0,0,0.30)" }}
                  >
                    <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${b.color} 0%, rgba(255,255,255,0.0) 80%)` }} />
                    <div className="flex items-center gap-3">
                      <IconBadge color={b.color}>
                        <Icon className="h-5 w-5" {...iconStrongProps} />
                      </IconBadge>
                      <div>
                        <div className="mt-1 text-lg font-semibold text-white">{b.title}</div>
                      </div>
                    </div>
                    <div className="mt-5 space-y-3">
                      {b.points.map((p) => (
                        <div key={p} className="flex items-start gap-3">
                          <span
                            className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full ring-1"
                            style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.10)" }}
                          >
                            <span className="h-2 w-2 rounded-full bg-white/90" />
                          </span>
                          <div className="text-sm text-white/80">{p}</div>
                        </div>
                      ))}
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ROI */}
      <section id="roi" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Institutional Impact & ROI"
subtitle={"Designed for measurable value — not theoretical exposure."}          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {ROI_BLOCKS.map((r, idx) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="relative overflow-hidden rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur"
                  style={{ boxShadow: "0 26px 90px rgba(0,0,0,0.14)" }}
                >
                  <div className="flex items-center gap-3">
                    <IconBadge color={r.color}>
                      <Icon className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                    <div>
                      <div className="mt-1 text-lg font-semibold text-[#0B1220]">{r.title}</div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {r.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-3">
                        <span
                          className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full ring-1"
                          style={{ background: "rgba(11,18,32,0.06)", borderColor: "rgba(11,18,32,0.10)" }}
                        >
                          <span className="h-2 w-2 rounded-full" style={{ background: r.color }} />
                        </span>
                        <div className="text-sm text-[#0B1220]/75">{b}</div>
                      </div>
                    ))}
                  </div>

                  <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(11,18,32,0.06)" }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUTCOME CATEGORIES */}
      <section id="categories" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Outcome categories across tracks"
            dark
          />

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OUTCOME_TILES.map((t, idx) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-[34px] bg-white/5 p-6 ring-1 ring-white/10"
                  style={{ boxShadow: "0 18px 70px rgba(0,0,0,0.32)" }}
                >
                  <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${t.color} 0%, rgba(255,255,255,0) 80%)` }} />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="shine" />
                  </div>

                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <IconBadge color={t.color}>
                        <Icon className="h-5 w-5" {...iconStrongProps} />
                      </IconBadge>
                      <div>
                        <div className="text-lg font-semibold text-white">{t.title}</div>
                        <div className="mt-1 text-sm text-white/65">{t.sub}</div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VERIFICATION FRAMEWORK */}
      <section id="verification" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="How we verify outcomes"
          />

          <div className="mt-10 rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {VERIFY_STEPS.map((s, idx) => {
                const Icon = s.icon;
                const showConnector = idx < VERIFY_STEPS.length - 1;
                return (
                  <div key={s.title} className="relative">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.06 }}
                      className="relative overflow-hidden rounded-[34px] bg-white/55 p-6 ring-1 ring-[#0B1220]/10"
                    >
                      <div className="flex items-center gap-3">
                        <IconBadge color={s.color}>
                          <Icon className="h-5 w-5" {...iconStrongProps} />
                        </IconBadge>
                        <div>
                          <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">STEP {idx + 1}</div>
                          <div className="mt-1 text-lg font-semibold text-[#0B1220]">{s.title}</div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-[#0B1220]/70">{s.desc}</p>
                      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(11,18,32,0.06)" }} />
                    </motion.div>

                    {showConnector ? (
                      <div className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 lg:block">
                        <motion.div
                          className="h-[2px] w-8"
                          initial={{ scaleX: 0, opacity: 0 }}
                          whileInView={{ scaleX: 1, opacity: 1 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 0.65, ease: "easeOut", delay: 0.25 + idx * 0.08 }}
                          style={{
                            transformOrigin: "left",
                            background: `linear-gradient(90deg, ${THEME.pink} 0%, ${accent(0.35)} 100%)`,
                          }}
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-[#0B1220]/70">Want to see the evaluation structure?</div>
              <a
                href="/sample-evaluation-report.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)` }}
              >
                <Download className="h-4 w-4" {...iconStrongProps} />
                Download Sample Evaluation Report
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ALUMNI */}
      <section id="alumni" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Where our participants advance"
            dark
          />

          <div className="mt-10 overflow-hidden rounded-[36px] bg-white/5 p-6 ring-1 ring-white/10">

            <div className="mt-4 relative">
              <div className="marquee">
                <div className="marquee__row">
                  {[...ALUMNI_ROLES, ...ALUMNI_ROLES].map((r, idx) => (
                    <span
                      key={`${r}-${idx}`}
                      className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ring-1"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        borderColor: "rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.85)",
                      }}
                    >
                      <span
                        className="mr-2 inline-block h-2 w-2 rounded-full"
                        style={{ background: idx % 3 === 0 ? THEME.accent : idx % 3 === 1 ? THEME.accent2 : THEME.accent3 }}
                      />
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-y-0 left-0 w-16" style={{ background: "linear-gradient(90deg, rgba(11,18,32,1), transparent)" }} />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16" style={{ background: "linear-gradient(270deg, rgba(11,18,32,1), transparent)" }} />
            </div>

          
          </div>
        </div>
      </section>

      {/* GERMANY */}
      <section id="germany" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Germany exposure impact"
            subtitle="Exposure builds confidence. Results build careers."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur">
                <div className="flex items-center gap-3">
                  <IconBadge color={THEME.accent2}>
                    <MapPin className="h-5 w-5" {...iconStrongProps} />
                  </IconBadge>
                  <div>
                    <div className="mt-1 text-lg font-semibold text-[#0B1220]">Network. Feedback. Global positioning.</div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {GERMANY_POINTS.map((p, idx) => (
                    <motion.div
                      key={p}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <IconBadge color={idx % 2 === 0 ? THEME.accent : THEME.accent4}>
                        <Globe2 className="h-4 w-4" {...iconStrongProps} />
                      </IconBadge>
                      <div className="text-sm text-[#0B1220]/75">{p}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-[#0B1220]/70">Learn how teams qualify and what partners expect.</div>
                  <a
                    href="#summary"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                    style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)` }}
                  >
                    Explore Real Experience
                    <ArrowRight className="h-4 w-4" {...iconStrongProps} />
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
                <div className="mt-2 text-2xl font-semibold leading-tight">
                  Your outcomes become a signal — not a line on a CV.
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#0B1220]/70">
                  We structure evaluation and deliverables so hiring teams can validate impact quickly and confidently.
                </p>

                <div className="mt-6 space-y-3">
                  <BulletLight icon={BadgeCheck} text="Professional evaluation report" color={THEME.accent3} />
                  <BulletLight icon={ClipboardCheck} text="Verified performance documentation" color={THEME.accent2} />
                  <BulletLight icon={Briefcase} text="Portfolio-ready proof-of-work" color={THEME.accent4} />
                </div>

                <div className="pointer-events-none absolute -bottom-20 -right-24 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(11,18,32,0.06)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXEC SUMMARY */}
      <section id="summary" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Impact is not a claim. It is documented performance."
            subtitle="Praktix programs are structured to deliver measurable advancement across skills, careers, and institutional value."
            dark
          />

          <div
            className="mt-10 relative overflow-hidden rounded-[36px] border border-white/10 px-6 py-10 text-center sm:px-10"
            style={{
              background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 100%)`,
              boxShadow: "0 24px 90px rgba(0,0,0,0.18)",
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
              <div className="text-xs font-semibold text-white/80 sm:text-sm">
                Evidence-based impact • Verified evaluations • Portfolio-first outcomes
              </div>
              <div className="mt-4 text-3xl font-semibold md:text-4xl">
                Turn learning into measurable outcomes that hiring teams can validate.
              </div>
              <p className="mx-auto mt-4 max-w-3xl text-sm font-medium text-white/85">
                Add your real success stories, partner quotes, and a downloadable institutional brief to complete the loop.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="/institutional-brief.pdf"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] transition hover:opacity-95"
                >
                  Request Institutional Brief
                  <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                </a>
                <a
                  href="#hero"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15"
                >
                  Back to Top
                  <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <a
        href="#summary"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:inline-flex"
        style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)` }}
      >
        <Briefcase className="h-4 w-4" {...iconStrongProps} />
        Request Brief
      </a>

      <style>{css}</style>
    </div>
  );
}

/** ---------------------------------------------------------------------
 *  Small components
 *  ------------------------------------------------------------------- */
function GhostStat({ label, value }) {
  return (
    <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="text-xs font-semibold tracking-widest text-white/55">{label}</div>
      <motion.div
        className="mt-3 text-4xl font-semibold text-white"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity: 0.95 }}
      >
        {value}
      </motion.div>
      <div className="mt-2 h-2 w-full rounded-full bg-white/10">
        <motion.div
          className="h-2 rounded-full"
          style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.75)} 100%)` }}
          animate={{ width: ["30%", "70%", "45%"] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

function BulletLight({ icon, text, color }) {
  const Icon = icon;
  return (
    <div className="flex items-start gap-3">
      <IconBadge color={color}>
        <Icon className="h-4 w-4" {...iconStrongProps} />
      </IconBadge>
      <div className="text-sm text-[#0B1220]/75">{text}</div>
    </div>
  );
}

/** ---------------------------------------------------------------------
 *  CSS (animations + smooth scroll helpers)
 *  ------------------------------------------------------------------- */
const css = `
html { scroll-behavior: smooth; }

.light-streak{
  position:absolute; inset:-20% -10%;
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

.shine{
  position:absolute; inset:-30% -30%;
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

/* moving horizontal data lines in hero card */
.data-lines{
  position:absolute; inset:-10% -10%;
  background:
    repeating-linear-gradient(90deg,
      rgba(255,255,255,0.0) 0px,
      rgba(255,255,255,0.0) 18px,
      rgba(255,255,255,0.06) 18px,
      rgba(255,255,255,0.06) 19px
    );
  mask-image: radial-gradient(600px circle at 55% 40%, rgba(0,0,0,1), transparent 70%);
  animation: slideLines 6.2s linear infinite;
  opacity: 0.35;
}
@keyframes slideLines{
  0%{ transform: translateX(-8%); }
  100%{ transform: translateX(8%); }
}

/* marquee */
.marquee{
  overflow:hidden;
  border-radius: 28px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.10);
  padding: 14px;
}
.marquee__row{
  display:flex;
  gap: 10px;
  width: max-content;
  animation: marquee 18s linear infinite;
}
@keyframes marquee{
  0%{ transform: translateX(0); }
  100%{ transform: translateX(-50%); }
}
`;
