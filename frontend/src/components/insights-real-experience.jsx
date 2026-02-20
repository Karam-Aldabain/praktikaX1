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
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Compass,
  Download,
  FileCheck2,
  Flame,
  Globe2,
  GraduationCap,
  Laptop,
  LineChart,
  MapPin,
  PenTool,
  Shield,
  Sparkles,
  Star,
  Target,
  Wallet,
  Zap,
  Layers,
  CheckCircle2,
} from "lucide-react";

/** ---------------- THEME (from your provided code vibe) ---------------- */
const THEME = {
  deep: "#0B1220",
  slate: "#1E2A3A",
  sand: "#E9E7DF",
  accent: "#22D3EE", // cyan
  accent2: "#A78BFA", // violet
  accent3: "#34D399", // green
  accent4: "#F59E0B", // amber
  pink: "#C91D67", // keep pink for CTAs/highlights
  star: "#F5D66B",
};

const DARK_SECTION_BG = "linear-gradient(90deg, #050B1F 0%, #071A3E 100%)";
const ACCENT_RGB = "201,29,103";
const pinkRGBA = (a) => `rgba(${ACCENT_RGB}, ${a})`;

const POWER_ICON_SHELL = {
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
  border: "1px solid rgba(255,255,255,0.22)",
  boxShadow:
    "0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.20)",
};

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

/** ---------------- micro components ---------------- */
function IconBadge({ color, children }) {
  return (
    <span
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl ring-1"
      style={{ ...POWER_ICON_SHELL }}
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

function GradientButton({ children, href, onClick, variant = "primary", icon }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const primary =
    "text-white shadow-[0_12px_30px_rgba(34,211,238,0.18)] hover:translate-y-[-1px] active:translate-y-[0px]";
  const secondary =
    "bg-transparent text-white ring-1 ring-white/20 hover:bg-white/5";

  const stylePrimary = {
    background: `linear-gradient(135deg, ${THEME.pink} 0%, ${pinkRGBA(
      0.82
    )} 55%, ${pinkRGBA(0.55)} 120%)`,
  };

  const Comp = href ? "a" : "button";
  const props = href ? { href } : { type: "button" };

  const RightIcon = icon || ArrowRight;

  return (
    <Comp
      {...props}
      onClick={onClick}
      className={cx(base, variant === "primary" ? primary : secondary)}
      style={variant === "primary" ? stylePrimary : undefined}
    >
      {children}
      <RightIcon className="h-4 w-4" {...iconStrongProps} />
    </Comp>
  );
}

function SectionTitle({ eyebrow, title, accent, subtitle, dark }) {
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
          <Sparkles
            className="h-4 w-4"
            style={{ color: THEME.accent }}
            {...iconStrongProps}
          />
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
        {accent ? (
          <span style={{ color: THEME.pink }}>{accent}</span>
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

function StarRow({ rating = 5 }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full;
        const isHalf = i === full && half;
        return (
          <span
            key={i}
            className={cx("inline-flex", filled || isHalf ? "opacity-100" : "opacity-25")}
          >
            <Star
              className="h-4 w-4"
              style={{ color: THEME.star, fill: filled ? THEME.star : "transparent" }}
              strokeWidth={2.2}
            />
          </span>
        );
      })}
    </div>
  );
}

/** ---------------- page data (derived from the PDF, styled like your code) ---------------- */
const meaningColumns = [
  {
    title: "Live Industry Context",
    desc: "Projects reflect real market challenges — not classroom scenarios.",
    icon: Building2,
    color: THEME.accent,
  },
  {
    title: "Expert Oversight",
    desc: "Supervised by European industry professionals and university professors.",
    icon: BadgeCheck,
    color: THEME.accent2,
  },
  {
    title: "Measurable Deliverables",
    desc: "Each participant produces documented, reviewable output.",
    icon: FileCheck2,
    color: THEME.accent4,
  },
];

const lifecycle = [
  {
    title: "Challenge Definition",
    desc: "Industry-aligned problem statement.",
    icon: Target,
    color: THEME.accent,
  },
  {
    title: "Planning & Scope",
    desc: "Clear milestones and expected output.",
    icon: ClipboardCheck,
    color: THEME.accent2,
  },
  {
    title: "Execution Phase",
    desc: "Team or individual implementation.",
    icon: Briefcase,
    color: THEME.accent3,
  },
  {
    title: "Expert Review",
    desc: "Structured evaluation and feedback loop.",
    icon: Compass,
    color: THEME.accent4,
  },
  {
    title: "Final Delivery",
    desc: "Production-ready outcome or strategic report.",
    icon: CheckCircle2,
    color: THEME.accent,
  },
];

const categoryCards = [
  {
    key: "software",
    title: "Software & App Systems",
    icon: Laptop,
    color: THEME.accent,
    objective: "Build a real system under real constraints.",
    deliverable: "Deployed web/app + technical handover notes.",
    skillFocus: ["Architecture", "APIs", "Testing", "Deployment"],
  },
  {
    key: "ai",
    title: "AI Models & Automation Tools",
    icon: Flame,
    color: THEME.accent4,
    objective: "Solve a practical problem with an AI workflow.",
    deliverable: "Model + evaluation + API endpoint (or automation pipeline).",
    skillFocus: ["Modeling", "Evaluation", "Optimization", "MLOps basics"],
  },
  {
    key: "strategy",
    title: "Business Strategy & Market Expansion",
    icon: LineChart,
    color: THEME.accent3,
    objective: "Create decision-grade expansion and growth logic.",
    deliverable: "Market entry plan + positioning + execution roadmap.",
    skillFocus: ["Research", "Frameworks", "Business cases", "Storytelling"],
  },
  {
    key: "cyber",
    title: "Cybersecurity Audits",
    icon: Shield,
    color: THEME.accent2,
    objective: "Identify risk and propose remediation like a real security team.",
    deliverable: "Audit report + findings + remediation plan.",
    skillFocus: ["Threat modeling", "Vuln analysis", "Reporting", "Hardening"],
  },
  {
    key: "data",
    title: "Data Dashboards & Analytics Reports",
    icon: Target,
    color: THEME.accent4,
    objective: "Turn messy data into business answers.",
    deliverable: "Interactive BI dashboard + insights pack.",
    skillFocus: ["SQL", "Cleaning", "KPIs", "Visualization"],
  },
  {
    key: "transformation",
    title: "Digital Transformation Roadmaps",
    icon: Building2,
    color: THEME.accent3,
    objective: "Map a workflow and design a transformation plan.",
    deliverable: "Transformation roadmap + prioritized initiatives.",
    skillFocus: ["Process analysis", "Roadmapping", "Tooling", "Change logic"],
  },
  {
    key: "finance",
    title: "Financial Modeling Systems",
    icon: Wallet,
    color: THEME.accent,
    objective: "Build models that support real decisions.",
    deliverable: "Forecast model + assumptions doc + memo.",
    skillFocus: ["Forecasting", "Risk", "Sensitivity", "Decision writing"],
  },
  {
    key: "design",
    title: "Product Design Prototypes",
    icon: PenTool,
    color: THEME.accent2,
    objective: "Design a usable product with a clear rationale.",
    deliverable: "UI/UX prototype + validation report.",
    skillFocus: ["Research", "Prototyping", "Systems", "Testing"],
  },
];

const deliverableSlides = [
  {
    group: "Technology",
    icon: Laptop,
    color: THEME.accent,
    items: ["Deployed web application", "Cloud-based infrastructure", "AI-powered API"],
  },
  {
    group: "Business & Strategy",
    icon: LineChart,
    color: THEME.accent3,
    items: ["Market entry plan", "Revenue modeling framework", "Consulting strategy report"],
  },
  {
    group: "Data & AI",
    icon: Flame,
    color: THEME.accent4,
    items: ["Predictive model", "Interactive BI dashboard", "Automation pipeline"],
  },
  {
    group: "Creative & Product",
    icon: PenTool,
    color: THEME.accent2,
    items: ["Full UI/UX prototype", "Functional mobile app", "Usability validation report"],
  },
];

const quotes = [
  "“Working on a live system changed how I approach problems.”",
  "“The feedback loop felt like a real company environment.”",
  "“My portfolio became credible — not academic.”",
];

/** ---------------- animations ---------------- */
const staggerWrap = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.08 },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  if (reduce) return null;

  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left"
      style={{
        scaleX,
        background: `linear-gradient(90deg, ${THEME.pink} 0%, ${THEME.accent} 55%, ${THEME.accent2} 100%)`,
        boxShadow: `0 6px 18px ${pinkRGBA(0.18)}`,
      }}
    />
  );
}

/** ---------------- HERO background: animated “project board” ---------------- */
function ProjectBoardBG() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(1200px circle at 10% 10%, rgba(255,255,255,0.08), transparent 55%), radial-gradient(900px circle at 80% 20%, rgba(233,231,223,0.06), transparent 55%), radial-gradient(900px circle at 60% 90%, rgba(255,255,255,0.06), transparent 55%)",
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
  );
}

/** ---------------- sections ---------------- */
function MeaningThree() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
      {meaningColumns.map((m, i) => {
        const Icon = m.icon;
        return (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.06 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="relative overflow-hidden rounded-[34px] bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur"
            style={{ boxShadow: "0 18px 70px rgba(0,0,0,0.35)" }}
          >
            <div
              className="absolute inset-x-0 top-0 h-1"
              style={{
                background: `linear-gradient(90deg, ${m.color} 0%, rgba(255,255,255,0.0) 85%)`,
                opacity: 0.9,
              }}
            />
            <div className="flex items-start gap-3">
              <IconBadge color={m.color}>
                <Icon className="h-5 w-5" {...iconStrongProps} />
              </IconBadge>
              <div className="flex-1">
                <div className="text-lg font-semibold text-white" style={clampStyle(2)}>
                  {m.title}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">{m.desc}</div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-60"
              style={{ background: `rgba(255,255,255,0.06)` }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

function LifecycleTimeline() {
  return (
    <div className="mt-10">
      <div className="hidden md:block">
        <div className="relative overflow-hidden rounded-[40px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10">
          <div
            className="absolute left-10 right-10 top-1/2 h-[2px] -translate-y-1/2"
            style={{
              background: `linear-gradient(90deg, ${THEME.accent} 0%, rgba(11,18,32,0.12) 50%, ${THEME.accent2} 100%)`,
              opacity: 0.65,
            }}
          />
          <div className="grid grid-cols-5 gap-4">
            {lifecycle.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
                  className="relative"
                >
                  <div className="mx-auto flex w-full max-w-[210px] flex-col items-center text-center">
                    <IconBadge color={s.color}>
                      <Icon className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                    <div className="mt-4 text-sm font-semibold text-[#0B1220]">{s.title}</div>
                    <div className="mt-2 text-sm text-[#0B1220]/70">{s.desc}</div>
                    <div
                      className="mt-4 h-2 w-2 rounded-full"
                      style={{ background: s.color, boxShadow: `0 10px 24px ${pinkRGBA(0.12)}` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* mobile layout */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {lifecycle.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.04 }}
              className="rounded-[34px] bg-white/55 p-6 ring-1 ring-[#0B1220]/10"
            >
              <div className="flex items-start gap-4">
                <IconBadge color={s.color}>
                  <Icon className="h-5 w-5" {...iconStrongProps} />
                </IconBadge>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-base font-semibold text-[#0B1220]">{s.title}</div>
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
                  <div className="mt-2 text-sm text-[#0B1220]/70">{s.desc}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        
        <GradientButton
          href="#"
          variant="primary"
          icon={Download}
        >
          Download Framework
        </GradientButton>
      </div>
    </div>
  );
}

function CategoryGrid() {
  const [open, setOpen] = useState(null);

  const active = useMemo(() => categoryCards.find((c) => c.key === open), [open]);

  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categoryCards.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.button
              key={c.key}
              type="button"
              onClick={() => setOpen(c.key)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.04 }}
              whileHover={{ y: -6, rotateX: 2, rotateY: -2, scale: 1.01 }}
              className="group relative overflow-hidden rounded-[34px] bg-white/5 p-5 text-left ring-1 ring-white/10 backdrop-blur"
              style={{ boxShadow: "0 18px 70px rgba(0,0,0,0.35)" }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{
                  background: `linear-gradient(90deg, ${c.color} 0%, rgba(255,255,255,0) 80%)`,
                  opacity: 0.9,
                }}
              />
              <div className="flex items-start gap-3">
                <IconBadge color={c.color}>
                  <Icon className="h-5 w-5" {...iconStrongProps} />
                </IconBadge>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white" style={clampStyle(2)}>
                    {c.title}
                  </div>
                  
                </div>
                <ChevronRight className="h-4 w-4 text-white/60 transition group-hover:text-white" />
              </div>

              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="shine" />
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpen(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-2xl overflow-hidden rounded-[40px] ring-1 ring-white/15"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.06) 100%)",
                boxShadow: "0 30px 120px rgba(0,0,0,0.55)",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{
                  background: `linear-gradient(90deg, ${active.color} 0%, ${THEME.pink} 45%, rgba(255,255,255,0) 85%)`,
                  opacity: 0.95,
                }}
              />

              <div className="relative p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <IconBadge color={active.color}>
                      <active.icon className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                    <div>
                      <div className="text-xs font-semibold tracking-widest text-white/60">
                        PROJECT CATEGORY
                      </div>
                      <div className="mt-1 text-xl font-semibold text-white">{active.title}</div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-white/65">
                        <StarRow rating={4.9} />
                        <span className="font-semibold text-white/85">Mentor-rated</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(null)}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-white/70 ring-1 ring-white/15 transition hover:bg-white/5 hover:text-white"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-white/60">
                      <Target className="h-4 w-4" style={{ color: active.color }} {...iconStrongProps} />
                      OBJECTIVE
                    </div>
                    <div className="mt-2 text-sm text-white/80">{active.objective}</div>
                  </div>

                  <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-white/60">
                      <FileCheck2 className="h-4 w-4" style={{ color: active.color }} {...iconStrongProps} />
                      TYPICAL DELIVERABLE
                    </div>
                    <div className="mt-2 text-sm text-white/80">{active.deliverable}</div>
                  </div>
                </div>

                <div className="mt-4 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-white/60">
                    <Layers className="h-4 w-4" style={{ color: THEME.accent2 }} {...iconStrongProps} />
                    SKILL FOCUS
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.skillFocus.map((s) => (
                      <span
                        key={s}
                        className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(255,255,255,0.85)",
                          borderColor: "rgba(255,255,255,0.12)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-white/65">
                    Expandable cards + documented output = portfolio-grade proof.
                  </div>
                  <GradientButton href="#closing" variant="primary">
                    See Closing CTA
                  </GradientButton>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(255,255,255,0.20) 0px, rgba(255,255,255,0.20) 12px, transparent 12px, transparent 28px)",
                }}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function DeliverablesSlider() {
  const sliderRef = useRef(null);

  const scrollSlider = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    const dx = dir === "left" ? -420 : 420;
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <div className="mt-10 relative">
      <motion.button
        type="button"
        onClick={() => scrollSlider("left")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="absolute -left-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full ring-1 transition lg:inline-flex"
        style={{
          background: `linear-gradient(135deg, ${THEME.pink} 0%, ${pinkRGBA(0.65)} 90%)`,
          borderColor: "rgba(255,255,255,0.14)",
          boxShadow: `0 14px 35px ${pinkRGBA(0.22)}`,
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
        className="absolute -right-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full ring-1 transition lg:inline-flex"
        style={{
          background: `linear-gradient(135deg, ${THEME.pink} 0%, ${pinkRGBA(0.65)} 90%)`,
          borderColor: "rgba(255,255,255,0.14)",
          boxShadow: `0 14px 35px ${pinkRGBA(0.22)}`,
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
        {deliverableSlides.map((d, idx) => {
          const Icon = d.icon;
          return (
            <motion.div
              key={d.group}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: Math.min(idx * 0.05, 0.2) }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="shrink-0"
              style={{ scrollSnapAlign: "start" }}
            >
              <div
                className="relative w-[320px] overflow-hidden rounded-[36px] bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur sm:w-[380px]"
                style={{ boxShadow: "0 18px 70px rgba(0,0,0,0.35)" }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{
                    background: `linear-gradient(90deg, ${d.color} 0%, rgba(255,255,255,0.0) 80%)`,
                    opacity: 0.9,
                  }}
                />
                <div className="flex items-start gap-3">
                  <IconBadge color={d.color}>
                    <Icon className="h-5 w-5" {...iconStrongProps} />
                  </IconBadge>
                  <div className="flex-1">
                    <div className="text-xs font-semibold tracking-widest text-white/60">
                      DELIVERABLES
                    </div>
                    <div className="mt-1 text-lg font-semibold text-white">{d.group}</div>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {d.items.map((it) => (
                    <div key={it} className="flex items-start gap-3">
                      <span
                        className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full ring-1"
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          borderColor: "rgba(255,255,255,0.10)",
                        }}
                      >
                        <span className="h-2 w-2 rounded-full bg-white/90" />
                      </span>
                      <div className="text-sm text-white/80">{it}</div>
                    </div>
                  ))}
                </div>

                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <div className="shine" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function SupervisionParallax() {
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -24]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -44]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -64]);

  const layers = [
    {
      title: "Technical Guidance",
      desc: "Hands-on direction during execution.",
      icon: Zap,
      color: THEME.accent,
      y: y1,
    },
    {
      title: "Performance Feedback",
      desc: "Structured evaluation sessions.",
      icon: ClipboardCheck,
      color: THEME.accent3,
      y: y2,
    },
    {
      title: "Strategic Perspective",
      desc: "Industry context beyond task completion.",
      icon: Globe2,
      color: THEME.accent2,
      y: y3,
    },
  ];

  return (
    <div ref={wrapRef} className="mt-10">
      <div className="relative overflow-hidden rounded-[44px] ring-1 ring-white/10"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
          boxShadow: "0 26px 90px rgba(0,0,0,0.35)",
        }}
      >
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(34,211,238,0.14)" }}
        />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(167,139,250,0.12)" }}
        />

        <div className="relative p-6 sm:p-8">
         
       

          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {layers.map((l) => {
              const Icon = l.icon;
              return (
                <motion.div
                  key={l.title}
                  style={{ y: l.y }}
                  whileHover={{ y: reduce ? 0 : -4, scale: 1.01 }}
                  className="relative overflow-hidden rounded-[36px] p-6 ring-1 ring-white/10"
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-1"
                    style={{
                      background: `linear-gradient(90deg, ${l.color} 0%, rgba(255,255,255,0) 80%)`,
                      opacity: 0.9,
                    }}
                  />
                  <div className="flex items-start gap-3">
                    <IconBadge color={l.color}>
                      <Icon className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                    <div className="flex-1">
                      <div className="text-lg font-semibold text-white">{l.title}</div>
                      <div className="mt-2 text-sm text-white/70">{l.desc}</div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full blur-3xl"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Comparison() {
  const rowsLeft = ["Theory-first", "Simulation exercises", "Passive evaluation", "Certificate-based outcome"];
  const rowsRight = ["Execution-first", "Industry challenges", "Continuous expert review", "Deliverable-based outcome"];

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-[40px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10">
        <div className="flex items-center gap-3">
          <IconBadge color={THEME.accent2}>
            <GraduationCap className="h-5 w-5" {...iconStrongProps} />
          </IconBadge>
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">
              TRADITIONAL LEARNING
            </div>
            <div className="mt-1 text-lg font-semibold text-[#0B1220]">How it usually works</div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {rowsLeft.map((r) => (
            <div key={r} className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full ring-1"
                style={{ background: "rgba(11,18,32,0.06)", borderColor: "rgba(11,18,32,0.10)" }}
              >
                <span className="h-2 w-2 rounded-full bg-[#0B1220]/60" />
              </span>
              <div className="text-sm text-[#0B1220]/75">{r}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="relative overflow-hidden rounded-[40px] p-7 ring-1"
        style={{
          background: `linear-gradient(135deg, ${THEME.pink} 0%, ${pinkRGBA(0.78)} 100%)`,
          borderColor: "rgba(255,255,255,0.14)",
          boxShadow: "0 26px 90px rgba(0,0,0,0.18)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)",
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-3">
            <IconBadge color="rgba(255,255,255,0.92)">
              <Briefcase className="h-5 w-5" {...iconStrongProps} />
            </IconBadge>
            <div>
              <div className="text-xs font-semibold tracking-widest text-white/80">
                PRAKTIX EXPERIENCE
              </div>
              <div className="mt-1 text-lg font-semibold text-white">The difference is structural</div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {rowsRight.map((r) => (
              <div key={r} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full ring-1"
                  style={{ background: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.18)" }}
                >
                  <span className="h-2 w-2 rounded-full bg-white/90" />
                </span>
                <div className="text-sm text-white/90">{r}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-sm font-semibold text-white/90">
            Employability is built through execution.
          </div>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIdx((x) => (x + 1) % quotes.length), 3800);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div className="mt-10">
      <div className="relative overflow-hidden rounded-[44px] ring-1 ring-white/10"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
          boxShadow: "0 26px 90px rgba(0,0,0,0.35)",
        }}
      >
        <div className="relative p-7 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold tracking-widest text-white/60">
                FROM PARTICIPANTS
              </div>
              <div className="mt-2 text-2xl font-semibold text-white">
                Proof feels different than theory.
              </div>
              <div className="mt-2 text-sm text-white/65">
                Short rotating quotes (preview).
              </div>
            </div>
            <GradientButton href="#closing" variant="secondary">
              Read Full Success Stories
            </GradientButton>
          </div>

          <div className="mt-8 min-h-[84px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="text-balance text-xl font-semibold text-white sm:text-2xl"
              >
                {quotes[idx]}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
      </div>
    </div>
  );
}

function GlobalExposure() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <div className="rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur">
          <div className="flex items-center gap-3">
            <IconBadge color={THEME.accent2}>
              <Globe2 className="h-5 w-5" {...iconStrongProps} />
            </IconBadge>
            <div>
              <div className="mt-1 text-lg font-semibold">
                Experience beyond borders.
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ExposureCard
              title="Final project presentation in Germany"
              icon={FileCheck2}
              color={THEME.accent}
            />
            <ExposureCard
              title="Workshop with European experts"
              icon={Sparkles}
              color={THEME.accent2}
            />
            <ExposureCard
              title="Company visit & ecosystem exposure"
              icon={Building2}
              color={THEME.accent3}
            />
            <ExposureCard
              title="Munich cultural & industry tour"
              icon={MapPin}
              color={THEME.accent4}
            />
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-[#0B1220]/70">
              Exposure strengthens confidence. Execution builds careers.
            </div>
            <a
              href="#closing"
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
              style={{
                background: `linear-gradient(135deg, ${THEME.pink} 0%, ${pinkRGBA(0.78)} 80%)`,
              }}
            >
              Start Your Internship
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
          <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">WHY IT MATTERS</div>
          <div className="mt-2 text-2xl font-semibold leading-tight">
            Your work becomes a signal — not a line on a CV.
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[#0B1220]/70">
            The system is built around execution, expert review, and proof-of-work deliverables
            that hiring teams can validate.
          </p>

          <div className="mt-6 space-y-3">
            <MiniBullet icon={BadgeCheck} text="Professional evaluation mindset" color={THEME.accent3} />
            <MiniBullet icon={FileCheck2} text="Portfolio-ready proof" color={THEME.accent4} />
            <MiniBullet icon={Building2} text="Partner exposure" color={THEME.accent2} />
          </div>

          <div className="pointer-events-none absolute -bottom-20 -right-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "rgba(255,255,255,0.10)" }}
          />
        </div>
      </div>
    </div>
  );
}

function ExposureCard({ title, icon: Icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-3xl bg-white/55 p-5 ring-1 ring-[#0B1220]/10"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-[#0B1220]" style={clampStyle(2)}>{title}</div>
        <IconBadge color={color}>
          <Icon className="h-4 w-4" {...iconStrongProps} />
        </IconBadge>
      </div>
    </motion.div>
  );
}

function MiniBullet({ icon: Icon, text, color }) {
  return (
    <div className="flex items-start gap-3">
      <IconBadge color={color}>
        <Icon className="h-4 w-4" {...iconStrongProps} />
      </IconBadge>
      <div className="text-sm text-[#0B1220]/75">{text}</div>
    </div>
  );
}

/** ---------------- main page ---------------- */
export default function RealExperiencePage() {
  const reduce = useReducedMotion();
  const meaning = useInViewOnce(0.2);

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
      <ScrollProgress />

      {/* Decorative global background (fixed) */}
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
      </div>

      {/* HERO */}
      <section id="hero" className="relative" style={{ background: DARK_SECTION_BG }}>
        <ProjectBoardBG />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-14 pt-8 lg:grid-cols-2 lg:pb-20 lg:pt-12">
          <motion.div variants={staggerWrap} initial="hidden" animate="show">
            <motion.h1
              variants={fadeUp}
              className="mt-2 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
            >
              Experience Is Not an Add-On.
              <br />
              It Is the System.
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-5 max-w-xl text-balance text-base text-white/70 sm:text-lg">
              Real industry challenges. Real supervision. Real accountability.
            </motion.p>

            <motion.p variants={fadeUp} className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-white/65">
              Every program is built around applied execution — not passive learning.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GradientButton href="#categories">Explore Active Tracks</GradientButton>
              <GradientButton href="#deliverables" variant="secondary">
                View Sample Projects
              </GradientButton>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/65">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <BadgeCheck className="h-4 w-4" style={{ color: THEME.accent3 }} {...iconStrongProps} />
                <span>Expert-reviewed output</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <FileCheck2 className="h-4 w-4" style={{ color: THEME.accent4 }} {...iconStrongProps} />
                <span>Documented deliverables</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right hero visual */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(900px circle at 20% 10%, rgba(34,211,238,0.16), transparent 55%), radial-gradient(900px circle at 80% 85%, rgba(167,139,250,0.14), transparent 55%)",
                }}
              />

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-white/60">LIVE DELIVERY BOARD</div>
                    <div className="mt-1 text-xl font-semibold text-white">Execution signals in real time</div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white/80 ring-1 ring-white/10">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Live now
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[#0C1428] p-4 ring-1 ring-white/10">
                    <div className="text-xs font-semibold tracking-widest text-white/55">ACTIVE PROJECTS</div>
                    <div className="mt-2 text-2xl font-bold text-white">18</div>
                    <div className="mt-1 text-xs text-emerald-300">+4 this week</div>
                  </div>
                  <div className="rounded-2xl bg-[#0C1428] p-4 ring-1 ring-white/10">
                    <div className="text-xs font-semibold tracking-widest text-white/55">REVIEW CYCLES</div>
                    <div className="mt-2 text-2xl font-bold text-white">42</div>
                    <div className="mt-1 text-xs text-cyan-300">Updated hourly</div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-[#0C1428] p-4 ring-1 ring-white/10">
                  <div className="mb-3 text-xs font-semibold tracking-widest text-white/55">TRACK STATUS</div>
                  {[["Software", 78, THEME.accent], ["AI & Data", 64, THEME.accent4], ["Strategy", 86, THEME.accent3]].map(
                    ([label, value, color]) => (
                      <div key={label} className="mb-3 last:mb-0">
                        <div className="mb-1 flex items-center justify-between text-xs text-white/75">
                          <span>{label}</span>
                          <span>{value}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div className="h-2 rounded-full" style={{ width: `${value}%`, background: color }} />
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-4 rounded-2xl bg-[#0C1428] p-4 ring-1 ring-white/10">
                  <div className="mb-3 text-xs font-semibold tracking-widest text-white/55">LATEST ACTIVITY</div>
                  <div className="space-y-2 text-sm text-white/80">
                    <div className="flex items-center justify-between"><span>Cyber audit report submitted</span><span className="text-white/50">2m</span></div>
                    <div className="flex items-center justify-between"><span>Mentor review completed</span><span className="text-white/50">9m</span></div>
                    <div className="flex items-center justify-between"><span>Dashboard milestone approved</span><span className="text-white/50">15m</span></div>
                  </div>
                </div>
              </div>
            </div>

            {!reduce ? <div className="pointer-events-none absolute inset-0 opacity-40"><div className="shine" /></div> : null}
          </motion.div>
        </div>
      </section>

      {/* MEANING */}
      <section id="meaning" className="relative" style={{ background: THEME.deep }}>
        <div ref={meaning.ref} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Not Simulation."
            accent="Not Case Studies."
            dark
          />
          <MeaningThree />
        </div>
      </section>

      {/* LIFECYCLE (light section) */}
      <section id="lifecycle" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="How real projects are structured"
          />
          <LifecycleTimeline />
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Project categories"
            accent="across disciplines"
            dark
          />
          <CategoryGrid />
        </div>
      </section>

      {/* DELIVERABLES */}
      <section id="deliverables" className="relative" style={{ background: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="What participants actually build"
            dark
          />
          <DeliverablesSlider />
        </div>
      </section>

      {/* SUPERVISION */}
      <section id="supervision" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Supervision"
            accent="that builds capability"
            dark
          />
          <SupervisionParallax />
        </div>
      </section>

      {/* COMPARISON (light) */}
      <section id="compare" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="The difference"
            accent="is structural"
          />
          <Comparison />
        </div>
      </section>

      {/* GLOBAL (light) */}
      <section id="global" className="relative" style={{ background: "rgba(233,231,223,1)", color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Experience"
            accent="beyond borders"
          />
          <GlobalExposure />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <Testimonials />
        </div>
      </section>

      {/* CLOSING */}
      <section id="closing" className="relative" style={{ background: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <div
            className="relative overflow-hidden rounded-[42px] border border-white/10 px-6 py-10 text-center sm:px-10"
            style={{
              background: `linear-gradient(135deg, ${THEME.pink} 0%, ${pinkRGBA(0.78)} 100%)`,
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

            <div className="relative mx-auto max-w-5xl text-white">
              <div className="text-xs font-semibold text-white/80 sm:text-sm">
                Experience creates proof. Proof creates opportunity.
              </div>
              <div className="mt-3 text-3xl font-semibold md:text-4xl">
                Build a portfolio that feels like real work — because it is.
              </div>
              <p className="mx-auto mt-4 max-w-3xl text-sm font-medium text-white/80">
                Execution-first projects, continuous expert review, and deliverables designed to be validated.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="#categories"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] transition hover:opacity-95"
                >
                  Start Your Internship
                  <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                </a>
                <a
                  href="#global"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15"
                >
                  Partner With Us
                  <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <a
        href="#closing"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:inline-flex"
        style={{
          background: `linear-gradient(135deg, ${THEME.pink} 0%, ${pinkRGBA(0.74)} 90%)`,
        }}
      >
        <Briefcase className="h-4 w-4" {...iconStrongProps} />
        Start Now
      </a>

      <style>{css}</style>
    </div>
  );
}

/** ---------------- small helpers ---------------- */
/** ---------------- CSS ---------------- */
const css = `
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
/* Shine */
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
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }
`;
