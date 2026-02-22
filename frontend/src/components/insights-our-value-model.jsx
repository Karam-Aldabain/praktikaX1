import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const Motion = motion;
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
 *  SAME COLOR SYSTEM (keep)
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

function clamp(lines) {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
    overflow: "hidden",
  };
}

/** =======================
 *  DATA (keep exactly)
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
 *  Icon helpers (keep)
 *  ======================= */
function BriefcaseIcon(props) {
  return <BriefcaseSvg {...props} />;
}
function RocketIcon(props) {
  return <RocketSvg {...props} />;
}

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
 *  PAGE (completely redesigned UI, same colors/data)
 *  ======================= */
export default function ValueModelPage() {
  const reduce = useReducedMotion();

  // Hero word rotator
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setWordIdx((i) => (i + 1) % HERO_WORDS.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, []);

  // Console tabs
  const CONSOLE_TABS = useMemo(
    () => [
      { key: "pillars", label: "Pillars", icon: Blocks },
      { key: "flow", label: "Flow", icon: Compass },
      { key: "kpis", label: "KPIs", icon: ChartNoAxesCombined },
    ],
    []
  );
  const [tab, setTab] = useState(CONSOLE_TABS[0].key);

  // Accordion + stepper
  const [activePillar, setActivePillar] = useState(PILLARS[0].key);
  const [activeStep, setActiveStep] = useState(PROCESS_STEPS[0].key);

  // In-view triggers
  const { ref: philosophyRef, inView: philosophyInView } = useInViewOnce(0.2);
  const { ref: pillarsRef, inView: pillarsInView } = useInViewOnce(0.18);
  const { ref: processRef, inView: processInView } = useInViewOnce(0.18);
  const { ref: evidenceRef, inView: evidenceInView } = useInViewOnce(0.18);
  const { ref: differenceRef, inView: differenceInView } = useInViewOnce(0.18);

  const _activeP = useMemo(
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
      {/* Background system (new) */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-radials opacity-80" />
        <div className="absolute inset-0 bg-grid opacity-[0.14]" />
        <div className="absolute inset-0 bg-noise opacity-[0.08]" />
        <div className="absolute inset-0">
          <div className="beam" />
        </div>
      </div>

      {/* HERO (new layout) */}
      <section className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 pt-10 pb-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-widest ring-1 ring-white/10 bg-white/5">
                <Sparkles className="h-4 w-4" style={{ color: THEME.accent }} {...iconStrongProps} />
                VALUE MODEL
              </div>

              <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
                A career system built for{" "}
                <span style={{ color: THEME.pink }}>evidence</span>.
              </h1>

              <p className="mt-5 max-w-xl text-balance text-base text-white/70 sm:text-lg">
                We design professional growth through a deliberate, measurable model.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold tracking-widest text-white/55">
                  MODE:
                </span>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={HERO_WORDS[wordIdx]}
                    initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold ring-1"
                    style={{
                      background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(
                        0.75
                      )} 80%)`,
                      borderColor: "rgba(255,255,255,0.12)",
                    }}
                  >
                    {HERO_WORDS[wordIdx]}
                  </motion.span>
                </AnimatePresence>

                <span className="text-xs text-white/60">
                  Designed for measurable value — not theoretical exposure.
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <PrimaryButton href="#process">See the full flow</PrimaryButton>
                <GhostButton href="#pillars">Explore pillars</GhostButton>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SignalCard
                  icon={ShieldCheck}
                  title="System clarity"
                  desc="Framework over improvisation"
                  color={THEME.accent2}
                />
                <SignalCard
                  icon={FileCheck2}
                  title="Verified outcomes"
                  desc="Proof-of-work deliverables"
                  color={THEME.accent4}
                />
              </div>
            </motion.div>

            {/* Console */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
              className="lg:col-span-6"
            >
              <SystemConsole
                reduce={reduce}
                tabs={CONSOLE_TABS}
                tab={tab}
                setTab={setTab}
                activePillar={activePillar}
                setActivePillar={setActivePillar}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </motion.div>
          </div>
        </div>

        {/* bottom fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(11,18,32,0.65) 100%)",
          }}
        />
      </section>

      {/* PHILOSOPHY (new: ladder system) */}
      <section
        id="philosophy"
        className="relative"
        style={{ background: THEME.sand, color: THEME.deep }}
      >
        <div ref={philosophyRef} className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
          <HeaderBlock
            tone="light"
            eyebrow="MODEL PHILOSOPHY"
            title="Experience is the foundation"
            subtitle="Education builds knowledge. We build applied capability. Real experience must lead — everything else supports it."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={philosophyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div
                className="relative overflow-hidden rounded-[40px] p-7 ring-1"
                style={{
                  background:
                    "radial-gradient(900px circle at 20% 20%, rgba(11,18,32,0.08), transparent 55%), rgba(255,255,255,0.72)",
                  borderColor: "rgba(11,18,32,0.12)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.10)",
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
                    LAYER STACK
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

                <div className="mt-7">
                  <LayerLadder inView={philosophyInView} />
                </div>

                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <LightChip icon={Zap} title="Execution first" desc="Work under real constraints" color={THEME.accent} />
                  <LightChip icon={Target} title="Outcome proof" desc="Validated deliverables" color={THEME.accent4} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={philosophyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.06 }}
              className="lg:col-span-5"
            >
              <div className="space-y-4">
                <InsightCard
                  title="Why this works"
                  icon={Sparkles}
                  color={THEME.pink}
                  text="Capability is built through deliberate execution — not passive learning."
                />
                <InsightCard
                  title="What changes"
                  icon={ChartNoAxesCombined}
                  color={THEME.accent2}
                  text="We turn effort into measurable progress: milestones, reviews, and evidence."
                />
                <InsightCard
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

      {/* PILLARS (new: full-width accordion rows) */}
      <section id="pillars" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div ref={pillarsRef} className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
          <HeaderBlock
            tone="dark"
            eyebrow="SYSTEM DESIGN"
            title="The four pillars of career acceleration"
            subtitle="Open a pillar to reveal what the system enforces in practice."
            highlight="(accordion)"
          />

          <div className="mt-10 space-y-4">
            {PILLARS.map((p, idx) => {
              const open = p.key === activePillar;
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={pillarsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.06 + idx * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => setActivePillar(p.key)}
                    className={cx(
                      "group relative w-full overflow-hidden rounded-[34px] text-left ring-1 transition",
                      open ? "ring-white/18" : "ring-white/10 hover:ring-white/16"
                    )}
                    style={{
                      background: open
                        ? `linear-gradient(180deg, ${p.soft} 0%, rgba(255,255,255,0.03) 80%)`
                        : "rgba(255,255,255,0.04)",
                      boxShadow: open
                        ? "0 30px 90px rgba(0,0,0,0.40)"
                        : "0 18px 70px rgba(0,0,0,0.28)",
                    }}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-[2px]"
                      style={{
                        background: `linear-gradient(90deg, ${p.accent} 0%, rgba(255,255,255,0) 85%)`,
                        opacity: 0.95,
                      }}
                    />
                    <div className="p-6 sm:p-7">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-3">
                          <IconBadge color={p.accent}>
                            <Icon className="h-5 w-5" {...iconStrongProps} />
                          </IconBadge>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="text-lg font-semibold text-white">{p.title}</div>
                              <span
                                className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
                                style={{
                                  background: "rgba(255,255,255,0.06)",
                                  borderColor: "rgba(255,255,255,0.12)",
                                  color: "rgba(255,255,255,0.82)",
                                }}
                              >
                                Pillar {idx + 1}
                              </span>
                            </div>
                            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
                              {p.desc}
                            </p>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-white/60">
                          <span className="hidden sm:inline">Click</span>
                          <ChevronRight
                            className={cx(
                              "h-4 w-4 transition",
                              open ? "rotate-90 text-white/90" : "text-white/50 group-hover:text-white/75"
                            )}
                            {...iconStrongProps}
                          />
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {open ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                              {p.bullets.map((b) => (
                                <div
                                  key={b}
                                  className="rounded-3xl p-4 ring-1"
                                  style={{
                                    background: "rgba(255,255,255,0.04)",
                                    borderColor: "rgba(255,255,255,0.10)",
                                  }}
                                >
                                  <div className="flex items-start gap-3">
                                    <span
                                      className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full ring-1"
                                      style={{
                                        background: "rgba(255,255,255,0.06)",
                                        borderColor: "rgba(255,255,255,0.12)",
                                      }}
                                    >
                                      <span className="h-2 w-2 rounded-full" style={{ background: p.accent }} />
                                    </span>
                                    <div className="text-sm font-semibold text-white/85">{b}</div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                              <PrimaryButton href="#process">See the process</PrimaryButton>
                              <GhostButton href="#evidence">How we measure</GhostButton>
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {open ? (
                      <motion.div
                        layoutId="pillarglow"
                        className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full blur-3xl"
                        style={{ background: p.soft, opacity: 0.9 }}
                      />
                    ) : null}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS (new: timeline rail + detail dock) */}
      <section
        id="process"
        className="relative"
        style={{ background: THEME.sand, color: THEME.deep }}
      >
        <div ref={processRef} className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
          <HeaderBlock
            tone="light"
            eyebrow="EXECUTION FLOW"
            title="A step flow you can click through"
            subtitle="Each stage expands with a short explanation — designed as a clear, repeatable framework."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Rail */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-5"
            >
              <div
                className="relative overflow-hidden rounded-[40px] p-6 ring-1"
                style={{
                  background:
                    "radial-gradient(900px circle at 20% 20%, rgba(11,18,32,0.06), transparent 55%), rgba(255,255,255,0.75)",
                  borderColor: "rgba(11,18,32,0.12)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.10)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
                    STAGES
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
                    style={{
                      background: "rgba(11,18,32,0.06)",
                      borderColor: "rgba(11,18,32,0.10)",
                      color: "rgba(11,18,32,0.72)",
                    }}
                  >
                    Click to expand
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {PROCESS_STEPS.map((s, i) => {
                    const active = s.key === activeStep;
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setActiveStep(s.key)}
                        className={cx(
                          "group relative w-full overflow-hidden rounded-[28px] p-4 text-left ring-1 transition",
                          active ? "ring-[#0B1220]/16" : "ring-[#0B1220]/10 hover:bg-[#0B1220]/[0.03]"
                        )}
                        style={{
                          background: active ? "rgba(11,18,32,0.03)" : "rgba(255,255,255,0.55)",
                          borderColor: active ? "rgba(11,18,32,0.16)" : "rgba(11,18,32,0.10)",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl ring-1"
                            style={{
                              background: "rgba(11,18,32,0.05)",
                              borderColor: "rgba(11,18,32,0.10)",
                            }}
                          >
                            <Icon className="h-5 w-5" style={{ color: s.color }} {...iconStrongProps} />
                          </span>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-semibold text-[#0B1220]">
                                {s.title}
                              </div>
                              <span className="text-xs font-semibold text-[#0B1220]/45">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                            </div>
                            <div className="mt-1 text-xs text-[#0B1220]/60" style={clamp(1)}>
                              {s.detail}
                            </div>
                          </div>
                        </div>

                        {active ? (
                          <motion.div
                            layoutId="stepMarker"
                            className="pointer-events-none absolute inset-y-0 left-0 w-1"
                            style={{
                              background: `linear-gradient(180deg, ${THEME.pink} 0%, ${accent(0.75)} 100%)`,
                              opacity: 0.9,
                            }}
                          />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Detail dock */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.06 }}
              className="lg:col-span-7"
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeS.key}
                  initial={{ opacity: 0, y: 10, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.99 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="relative overflow-hidden rounded-[40px] p-7 ring-1"
                  style={{
                    background:
                      "radial-gradient(900px circle at 20% 20%, rgba(11,18,32,0.06), transparent 55%), rgba(255,255,255,0.75)",
                    borderColor: "rgba(11,18,32,0.12)",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.10)",
                  }}
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <span
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1"
                        style={{
                          background: "rgba(11,18,32,0.05)",
                          borderColor: "rgba(11,18,32,0.10)",
                        }}
                      >
                        <activeS.icon className="h-6 w-6" style={{ color: activeS.color }} {...iconStrongProps} />
                      </span>
                      <div>
                        <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
                          EXPANDED STAGE
                        </div>
                        <div className="mt-1 text-2xl font-semibold text-[#0B1220]">
                          {activeS.title}
                        </div>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#0B1220]/70">
                          {activeS.detail}
                        </p>
                      </div>
                    </div>

                    <div
                      className="rounded-3xl p-4 ring-1"
                      style={{
                        background: "rgba(11,18,32,0.04)",
                        borderColor: "rgba(11,18,32,0.10)",
                      }}
                    >
                      <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
                        OUTPUT SIGNAL
                      </div>
                      <div className="mt-2 text-sm font-semibold text-[#0B1220]">
                        Clear deliverable + evaluation checkpoint
                      </div>
                    </div>
                  </div>

                  {/* stakeholders (reframed) */}
                  <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {STAKEHOLDERS.map((s) => {
                      const Icon = s.icon;
                      return (
                        <div
                          key={s.title}
                          className="rounded-[28px] bg-white/60 p-4 ring-1"
                          style={{ borderColor: "rgba(11,18,32,0.10)" }}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl ring-1"
                              style={{
                                background: "rgba(11,18,32,0.05)",
                                borderColor: "rgba(11,18,32,0.10)",
                              }}
                            >
                              <Icon className="h-5 w-5" style={{ color: s.color }} {...iconStrongProps} />
                            </span>
                            <div>
                              <div className="text-sm font-semibold text-[#0B1220]">{s.title}</div>
                              <div className="mt-1 text-xs text-[#0B1220]/65">{s.desc}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl"
                    style={{ background: `rgba(201,29,103,0.10)` }}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EVIDENCE (new: gauges + standards strip) */}
      <section id="evidence" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div ref={evidenceRef} className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
          <HeaderBlock
            tone="dark"
            eyebrow="MEASUREMENT"
            title="Measured. Not assumed."
            subtitle="We track completion, performance, progression, and career movement as evidence — not vibes."
            highlight="(gauges)"
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={evidenceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-7"
            >
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
                    <div className="text-xs font-semibold tracking-widest text-white/60">
                      KPI PANEL
                    </div>
                    <div className="mt-1 text-lg font-semibold text-white">
                      System Signals
                    </div>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/75 ring-1 ring-white/10">
                    Mock UI
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {METRICS.map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={evidenceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.45, ease: "easeOut", delay: 0.06 + i * 0.05 }}
                    >
                      <GaugeCard metric={m} />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 rounded-[34px] bg-white/5 p-5 ring-1 ring-white/10">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold tracking-widest text-white/60">
                      STANDARDS
                    </div>
                    <div className="text-xs font-semibold text-white/60">
                      Alignment layer
                    </div>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-white/10">
                    <div className="standards-marquee flex gap-2 py-3">
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

                <div
                  className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full blur-3xl"
                  style={{ background: "rgba(34,211,238,0.14)" }}
                />
                <div
                  className="pointer-events-none absolute -right-28 -bottom-28 h-80 w-80 rounded-full blur-3xl"
                  style={{ background: "rgba(167,139,250,0.12)" }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={evidenceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.06 }}
              className="lg:col-span-5"
            >
              <div className="space-y-4">
                <DarkNote
                  title="Interpretation"
                  icon={Target}
                  color={THEME.accent4}
                  text="Signals are intentionally simple: completion, performance, progression, movement."
                />
                <DarkNote
                  title="What this prevents"
                  icon={ShieldCheck}
                  color={THEME.accent2}
                  text="No “participation-only” outcomes. Evidence is required at every checkpoint."
                />
                <DarkNote
                  title="What you keep"
                  icon={BadgeCheck}
                  color={THEME.accent3}
                  text="A traceable proof trail: milestones, reviews, and deliverables."
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DIFFERENCE (new: single compare dock with toggle) */}
      <section
        id="difference"
        className="relative"
        style={{ background: THEME.sand, color: THEME.deep }}
      >
        <div ref={differenceRef} className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
          <HeaderBlock
            tone="light"
            eyebrow="DIFFERENTIATOR"
            title="What makes the model different?"
            subtitle="We replace weak signals with structured execution, supervision, and verified outcomes."
          />

          <div className="mt-10">
            <CompareDock inView={differenceInView} />
          </div>

          {/* closing CTA */}
          <div className="mt-12">
            <div
              className="relative overflow-hidden rounded-[36px] border px-6 py-10 text-center sm:px-10"
              style={{
                background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 100%)`,
                borderColor: "rgba(11,18,32,0.10)",
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

      {/* Sticky nav (new) */}
      <a
        href="#process"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:inline-flex"
        style={{
          background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)`,
        }}
      >
        <Compass className="h-4 w-4" {...iconStrongProps} />
        Open Flow
      </a>

      <style>{css}</style>
    </div>
  );
}

/** =======================
 *  Components (new set)
 *  ======================= */

function HeaderBlock({ tone = "dark", eyebrow, title, subtitle, highlight }) {
  const dark = tone === "dark";
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
        {highlight ? <span style={{ color: THEME.pink }}>{highlight}</span> : null}
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

function PrimaryButton({ children, href = "#" }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-all hover:translate-y-[-1px] active:translate-y-[0px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.82)} 55%, ${accent(
          0.6
        )} 120%)`,
        boxShadow: "0 12px 30px rgba(34,211,238,0.18)",
      }}
    >
      {children}
      <ArrowRight className="h-4 w-4" {...iconStrongProps} />
    </a>
  );
}

function GhostButton({ children, href = "#" }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      {children}
      <ArrowRight className="h-4 w-4" {...iconStrongProps} />
    </a>
  );
}

function IconBadge({ color, children }) {
  return (
    <span
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%)",
        border: "1px solid rgba(255,255,255,0.20)",
        boxShadow: "0 10px 24px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.18)",
        color,
      }}
    >
      {children}
    </span>
  );
}

function SignalCard({ icon, title, desc, color }) {
  const Icon = icon;
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-white/5 p-5 ring-1 ring-white/10">
      <div className="flex items-start gap-3">
        <IconBadge color={color}>
          <Icon className="h-5 w-5" {...iconStrongProps} />
        </IconBadge>
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-xs text-white/65">{desc}</div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "rgba(201,29,103,0.10)" }}
      />
    </div>
  );
}

function SystemConsole({
  reduce,
  tabs,
  tab,
  setTab,
  activePillar,
  setActivePillar,
  activeStep,
  setActiveStep,
}) {
  const activeTab = tabs.find((t) => t.key === tab) || tabs[0];

  return (
    <div
      className="relative overflow-hidden rounded-[44px] ring-1 ring-white/10"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%)",
        boxShadow: "0 26px 90px rgba(0,0,0,0.35)",
      }}
    >
      <div className="absolute inset-0 console-grid opacity-[0.22]" />
      <div className="relative p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold tracking-widest text-white/60">
            SYSTEM CONSOLE
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/75 ring-1 ring-white/10">
            Interactive
          </span>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = t.key === tab;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={cx(
                  "group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition",
                  active ? "text-white" : "text-white/70 hover:bg-white/5"
                )}
                style={{
                  background: active ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.72)} 85%)` : "rgba(255,255,255,0.05)",
                  borderColor: active ? "rgba(201,29,103,0.30)" : "rgba(255,255,255,0.12)",
                }}
              >
                <Icon className="h-4 w-4" style={{ color: active ? "white" : THEME.accent }} {...iconStrongProps} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-[34px] bg-white/5 p-5 ring-1 ring-white/10">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold tracking-widest text-white/60">
                  VIEW
                </div>
                <div className="text-xs font-semibold text-white/60">
                  {activeTab.label.toUpperCase()}
                </div>
              </div>

              <div className="mt-4">
                <AnimatePresence mode="popLayout">
                  {tab === "pillars" ? (
                    <motion.div
                      key="pillars"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="space-y-3"
                    >
                      {PILLARS.map((p) => {
                        const Icon = p.icon;
                        const active = p.key === activePillar;
                        return (
                          <button
                            key={p.key}
                            type="button"
                            onClick={() => setActivePillar(p.key)}
                            className={cx(
                              "w-full rounded-3xl p-4 text-left ring-1 transition",
                              active ? "bg-white/10 ring-white/14" : "bg-white/5 ring-white/10 hover:bg-white/7"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <IconBadge color={p.accent}>
                                <Icon className="h-5 w-5" {...iconStrongProps} />
                              </IconBadge>
                              <div className="min-w-0">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="text-sm font-semibold text-white">{p.title}</div>
                                  <span className="text-xs text-white/55">{p.bullets.length} signals</span>
                                </div>
                                <div className="mt-1 text-xs text-white/60" style={clamp(2)}>
                                  {p.desc}
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  ) : null}

                  {tab === "flow" ? (
                    <motion.div
                      key="flow"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="space-y-3"
                    >
                      {PROCESS_STEPS.map((s, idx) => {
                        const Icon = s.icon;
                        const active = s.key === activeStep;
                        return (
                          <button
                            key={s.key}
                            type="button"
                            onClick={() => setActiveStep(s.key)}
                            className={cx(
                              "w-full rounded-3xl p-4 text-left ring-1 transition",
                              active ? "bg-white/10 ring-white/14" : "bg-white/5 ring-white/10 hover:bg-white/7"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <span
                                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1"
                                style={{
                                  background: "rgba(255,255,255,0.06)",
                                  borderColor: "rgba(255,255,255,0.12)",
                                }}
                              >
                                <Icon className="h-5 w-5" style={{ color: s.color }} {...iconStrongProps} />
                              </span>
                              <div className="min-w-0">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="text-sm font-semibold text-white">{s.title}</div>
                                  <span className="text-xs text-white/55">
                                    {String(idx + 1).padStart(2, "0")}
                                  </span>
                                </div>
                                <div className="mt-1 text-xs text-white/60" style={clamp(2)}>
                                  {s.detail}
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  ) : null}

                  {tab === "kpis" ? (
                    <motion.div
                      key="kpis"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                    >
                      {METRICS.map((m) => (
                        <div key={m.label} className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <IconBadge color={m.color}>
                                <m.icon className="h-5 w-5" {...iconStrongProps} />
                              </IconBadge>
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
                        </div>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right: “pulse” visualization */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[34px] bg-white/5 p-5 ring-1 ring-white/10">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold tracking-widest text-white/60">
                  SYSTEM PULSE
                </div>
                <span className="text-xs font-semibold text-white/60">Signal density</span>
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-white/10">
                <PulseViz reduce={reduce} />
              </div>

              <div className="mt-4 text-sm text-white/70">
                The model enforces structure through milestones, reviews, and measured outputs.
              </div>

              <div
                className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl"
                style={{ background: "rgba(201,29,103,0.10)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PulseViz({ reduce }) {
  return (
    <div className="bg-white/3 p-4">
      <svg viewBox="0 0 640 220" className="h-[220px] w-full">
        <defs>
          <linearGradient id="pulseLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={THEME.accent} stopOpacity="0.9" />
            <stop offset="45%" stopColor={THEME.pink} stopOpacity="0.9" />
            <stop offset="100%" stopColor={THEME.accent2} stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="pulseArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={THEME.accent} stopOpacity="0.18" />
            <stop offset="100%" stopColor={THEME.accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* grid */}
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={20 + i * 28}
            x2="640"
            y2={20 + i * 28}
            stroke="rgba(255,255,255,0.08)"
          />
        ))}

        <path
          d="M 0 150 C 60 140, 120 165, 170 140 C 220 114, 260 120, 310 98 C 360 74, 420 96, 470 76 C 520 55, 580 62, 640 40 L 640 220 L 0 220 Z"
          fill="url(#pulseArea)"
        />
        <path
          d="M 0 150 C 60 140, 120 165, 170 140 C 220 114, 260 120, 310 98 C 360 74, 420 96, 470 76 C 520 55, 580 62, 640 40"
          fill="none"
          stroke="url(#pulseLine)"
          strokeWidth="4"
          strokeLinecap="round"
          className={reduce ? "" : "pulse-dash"}
        />
      </svg>
    </div>
  );
}

function LayerLadder({ inView }) {
  return (
    <div className="relative">
      <div
        className="absolute left-[22px] top-1 bottom-1 w-[2px]"
        style={{
          background: "linear-gradient(180deg, rgba(11,18,32,0.10), rgba(11,18,32,0.02))",
        }}
      />
      <div className="space-y-4">
        {PHILOSOPHY_LAYERS.map((x, idx) => {
          const Icon = x.icon;
          return (
            <motion.div
              key={x.label}
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.06 + idx * 0.06 }}
              className="relative flex items-start gap-4 rounded-[30px] bg-white/65 p-4 ring-1"
              style={{ borderColor: "rgba(11,18,32,0.10)" }}
            >
              <span
                className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1"
                style={{
                  background: "rgba(11,18,32,0.05)",
                  borderColor: "rgba(11,18,32,0.10)",
                }}
              >
                <Icon className="h-5 w-5" style={{ color: x.color }} {...iconStrongProps} />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#0B1220]">{x.label}</div>
                <div className="mt-1 text-xs text-[#0B1220]/60">Layer {idx + 1}</div>
              </div>

              <div
                className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full blur-3xl"
                style={{ background: "rgba(201,29,103,0.08)" }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function LightChip({ icon, title, desc, color }) {
  const Icon = icon;
  return (
    <div
      className="rounded-3xl p-4 ring-1"
      style={{
        background: "rgba(255,255,255,0.72)",
        borderColor: "rgba(11,18,32,0.10)",
      }}
    >
      <div className="flex items-start gap-3">
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl ring-1"
          style={{
            background: "rgba(11,18,32,0.05)",
            borderColor: "rgba(11,18,32,0.10)",
          }}
        >
          <Icon className="h-5 w-5" style={{ color }} {...iconStrongProps} />
        </span>
        <div>
          <div className="text-sm font-semibold text-[#0B1220]">{title}</div>
          <div className="mt-1 text-xs text-[#0B1220]/65">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ title, icon, color, text }) {
  const Icon = icon;
  return (
    <div
      className="relative overflow-hidden rounded-[36px] p-6 ring-1"
      style={{
        background:
          "radial-gradient(900px circle at 15% 20%, rgba(11,18,32,0.07), transparent 55%), rgba(255,255,255,0.72)",
        borderColor: "rgba(11,18,32,0.10)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.10)",
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
          <Icon className="h-6 w-6" style={{ color }} {...iconStrongProps} />
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

function GaugeCard({ metric }) {
  const Icon = metric.icon;
  const isPercent = metric.suffix === "%";
  const progress = isPercent ? Math.max(0, Math.min(100, metric.value)) : 78; // for x values, show a strong default ring
  const r = 28;
  const c = 2 * Math.PI * r;
  const dash = (progress / 100) * c;

  return (
    <div className="rounded-[34px] bg-white/5 p-5 ring-1 ring-white/10">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconBadge color={metric.color}>
            <Icon className="h-5 w-5" {...iconStrongProps} />
          </IconBadge>
          <div>
            <div className="text-sm font-semibold text-white">{metric.label}</div>
            <div className="mt-1 text-xs text-white/60">Tracked signal</div>
          </div>
        </div>

        <div className="grid place-items-center">
          <svg width="70" height="70" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r={r} stroke="rgba(255,255,255,0.14)" strokeWidth="6" fill="none" />
            <circle
              cx="35"
              cy="35"
              r={r}
              stroke={metric.color}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${c - dash}`}
              transform="rotate(-90 35 35)"
              style={{ filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.25))" }}
            />
          </svg>
          <div className="-mt-[54px] text-lg font-semibold text-white">
            {metric.value}
            {metric.suffix}
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
        <div className="text-xs font-semibold text-white/70">
          Signal strength:{" "}
          <span className="text-white/90">{isPercent ? `${progress}%` : "High"}</span>
        </div>
      </div>
    </div>
  );
}

function DarkNote({ title, icon, color, text }) {
  const Icon = icon;
  return (
    <div className="relative overflow-hidden rounded-[36px] bg-white/5 p-6 ring-1 ring-white/10">
      <div className="flex items-center gap-3">
        <IconBadge color={color}>
          <Icon className="h-5 w-5" {...iconStrongProps} />
        </IconBadge>
        <div>
          <div className="text-xs font-semibold tracking-widest text-white/60">
            {title.toUpperCase()}
          </div>
          <div className="mt-1 text-sm font-semibold text-white">{title}</div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-white/75">{text}</p>
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "rgba(201,29,103,0.10)" }}
      />
    </div>
  );
}

function CompareDock({ inView }) {
  const [mode, setMode] = useState("bad"); // bad | good

  const badRows = useMemo(
    () => ["Courses without execution", "Internships without structure", "Mentorship without accountability"],
    []
  );
  const goodRows = useMemo(
    () => ["Structured execution model", "Expert-supervised delivery", "Verified measurable outcomes"],
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[44px] ring-1"
      style={{
        background:
          "radial-gradient(900px circle at 20% 20%, rgba(11,18,32,0.06), transparent 55%), rgba(255,255,255,0.78)",
        borderColor: "rgba(11,18,32,0.10)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.10)",
      }}
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
              COMPARISON DOCK
            </div>
            <div className="mt-1 text-2xl font-semibold text-[#0B1220]">
              Weak signals vs strong proof
            </div>
            <div className="mt-2 text-sm text-[#0B1220]/70">
              Toggle the view to see what the model replaces.
            </div>
          </div>

          <div
            className="inline-flex rounded-full p-1 ring-1"
            style={{ background: "rgba(11,18,32,0.05)", borderColor: "rgba(11,18,32,0.10)" }}
          >
            <button
              type="button"
              onClick={() => setMode("bad")}
              className={cx(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                mode === "bad" ? "text-white" : "text-[#0B1220]/70 hover:text-[#0B1220]"
              )}
              style={
                mode === "bad"
                  ? { background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.75)} 100%)` }
                  : { background: "transparent" }
              }
            >
              Common
            </button>
            <button
              type="button"
              onClick={() => setMode("good")}
              className={cx(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                mode === "good" ? "text-white" : "text-[#0B1220]/70 hover:text-[#0B1220]"
              )}
              style={
                mode === "good"
                  ? { background: `linear-gradient(135deg, ${THEME.accent3} 0%, rgba(52,211,153,0.65) 100%)` }
                  : { background: "transparent" }
              }
            >
              Praktix
            </button>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {mode === "bad" ? (
            <motion.div
              key="bad"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12"
            >
              <div className="lg:col-span-5">
                <div
                  className="rounded-[36px] p-6 ring-1"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(201,29,103,0.12) 0%, rgba(255,255,255,0.70) 70%)",
                    borderColor: "rgba(11,18,32,0.10)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
                      COMMON PATTERN
                    </div>
                    <XCircle className="h-5 w-5" style={{ color: THEME.pink }} {...iconStrongProps} />
                  </div>
                  <div className="mt-2 text-lg font-semibold text-[#0B1220]">
                    Looks like progress
                  </div>
                  <div className="mt-1 text-sm text-[#0B1220]/70">
                    Produces weak evidence.
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="space-y-3">
                  {badRows.map((r, i) => (
                    <motion.div
                      key={r}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.05 }}
                      className="flex items-start gap-3 rounded-[30px] bg-white/70 p-4 ring-1"
                      style={{ borderColor: "rgba(11,18,32,0.10)" }}
                    >
                      <XCircle className="mt-0.5 h-5 w-5" style={{ color: THEME.pink }} {...iconStrongProps} />
                      <div className="text-sm text-[#0B1220]/75">{r}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="good"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12"
            >
              <div className="lg:col-span-5">
                <div
                  className="rounded-[36px] p-6 ring-1"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(52,211,153,0.14) 0%, rgba(255,255,255,0.70) 70%)",
                    borderColor: "rgba(11,18,32,0.10)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
                      DESIGNED MODEL
                    </div>
                    <CheckCircle2 className="h-5 w-5" style={{ color: THEME.accent3 }} {...iconStrongProps} />
                  </div>
                  <div className="mt-2 text-lg font-semibold text-[#0B1220]">
                    Clear system
                  </div>
                  <div className="mt-1 text-sm text-[#0B1220]/70">
                    Strong proof-of-work.
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="space-y-3">
                  {goodRows.map((r, i) => (
                    <motion.div
                      key={r}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.05 }}
                      className="flex items-start gap-3 rounded-[30px] bg-white/70 p-4 ring-1"
                      style={{ borderColor: "rgba(11,18,32,0.10)" }}
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5" style={{ color: THEME.accent3 }} {...iconStrongProps} />
                      <div className="text-sm text-[#0B1220]/75">{r}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "rgba(201,29,103,0.10)" }}
      />
    </motion.div>
  );
}

/** =======================
 *  CSS (new effects)
 *  ======================= */
const css = `
.bg-radials{
  background:
    radial-gradient(1200px circle at 10% 10%, rgba(255,255,255,0.08), transparent 55%),
    radial-gradient(1200px circle at 80% 20%, rgba(233,231,223,0.06), transparent 55%),
    radial-gradient(900px circle at 55% 90%, rgba(255,255,255,0.06), transparent 55%);
}

.bg-grid{
  background-image:
    linear-gradient(rgba(233,231,223,0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(233,231,223,0.12) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(900px circle at 30% 20%, rgba(0,0,0,1), transparent 70%);
  animation: gridFloat 18s linear infinite;
}
@keyframes gridFloat{
  0% { transform: translate3d(0,0,0); }
  100% { transform: translate3d(-64px, -64px, 0); }
}

.bg-noise{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
  background-size: 180px 180px;
}

.beam{
  position:absolute;
  inset:-25% -10%;
  background: linear-gradient(120deg, transparent 0%, rgba(233,231,223,0.05) 20%, rgba(255,255,255,0.12) 35%, transparent 55%);
  transform: translateX(-30%) rotate(-10deg);
  filter: blur(2px);
  animation: beam 8s ease-in-out infinite;
  opacity: 0.32;
}
@keyframes beam{
  0%{ transform: translateX(-35%) rotate(-10deg); }
  50%{ transform: translateX(25%) rotate(-10deg); }
  100%{ transform: translateX(-35%) rotate(-10deg); }
}

.console-grid{
  background-image:
    linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px);
  background-size: 56px 56px;
  animation: consoleGrid 12s linear infinite;
  mask-image: radial-gradient(520px circle at 60% 35%, rgba(0,0,0,1), transparent 70%);
}
@keyframes consoleGrid{
  0% { transform: translate3d(0,0,0); }
  100% { transform: translate3d(-56px, -56px, 0); }
}

.pulse-dash{
  stroke-dasharray: 1200;
  stroke-dashoffset: 1200;
  animation: pulseDash 2.2s ease-out forwards;
}
@keyframes pulseDash{
  to { stroke-dashoffset: 0; }
}

.standards-marquee{
  animation: standardsMarquee 16s linear infinite;
}
@keyframes standardsMarquee{
  0%{ transform: translateX(0); }
  100%{ transform: translateX(-50%); }
}
`;
