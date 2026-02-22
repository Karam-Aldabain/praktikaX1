import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Building2,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Compass,
  FileCheck2,
  Globe2,
  GraduationCap,
  LineChart,
  MapPin,
  Target,
  Zap,
  BadgeCheck,
  Rocket,
  Handshake,
  ListChecks,
} from "lucide-react";

const Motion = motion;

/** =======================
 *  THEME (from your code)
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

const POWER_ICON_SHELL = {
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
  border: "1px solid rgba(255,255,255,0.22)",
  boxShadow:
    "0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.20)",
};

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

const iconStrongProps = { strokeWidth: 2.4 };

function clampStyle(lines) {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
    overflow: "hidden",
  };
}

/** =======================
 *  Small utilities
 *  ======================= */
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

function Pill({ label, tone = "dark" }) {
  const dark = tone === "dark";
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1",
        dark ? "text-white/85 ring-white/10" : "text-[#0B1220]/75 ring-[#0B1220]/10"
      )}
      style={{
        background: dark ? "rgba(255,255,255,0.08)" : "rgba(11,18,32,0.05)",
      }}
    >
      {label}
    </span>
  );
}

function SectionTitle({ eyebrow, title, subtitle, dark, accentWord }) {
  return (
    <div className={cx("mx-auto max-w-5xl", dark ? "text-white" : "text-[#0B1220]")}>
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
          eyebrow ? "mt-5 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl" : "mt-0 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-[#0B1220]"
        )}
      >
        {title}{" "}
        {accentWord ? <span style={{ color: THEME.pink }}>{accentWord}</span> : null}
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

function GradientButton({ children, href, onClick, variant = "primary" }) {
  const Comp = href ? "a" : "button";
  const props = href ? { href } : { type: "button" };

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const primary =
    "text-white shadow-[0_12px_30px_rgba(34,211,238,0.18)] hover:translate-y-[-1px] active:translate-y-[0px]";
  const secondary = "bg-transparent text-white ring-1 ring-white/20 hover:bg-white/5";

  const stylePrimary = {
    background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.82)} 55%, ${accent(
      0.6
    )} 120%)`,
  };

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

/** =======================
 *  Animated network background
 *  ======================= */
function NetworkBackground() {
  const reduce = useReducedMotion();
  const nodes = useMemo(() => {
    // fixed layout (no randomness per render)
    return [
      { x: 12, y: 24, s: 1.0 },
      { x: 26, y: 58, s: 0.9 },
      { x: 40, y: 18, s: 0.8 },
      { x: 56, y: 44, s: 1.1 },
      { x: 70, y: 22, s: 0.85 },
      { x: 82, y: 62, s: 0.95 },
      { x: 18, y: 78, s: 0.75 },
      { x: 64, y: 78, s: 0.9 },
    ];
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* soft glow */}
      <div
        className="absolute -left-24 -top-24 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(34,211,238,0.14)" }}
      />
      <div
        className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(167,139,250,0.12)" }}
      />

      {/* grid haze */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233,231,223,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(233,231,223,0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(900px circle at 30% 20%, rgba(0,0,0,1), transparent 70%)",
        }}
      />

      {/* nodes */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {!reduce ? (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* nodes */}
            {nodes.map((n, i) => (
              <motion.circle
                key={i}
                cx={n.x}
                cy={n.y}
                r={0.55 * n.s}
                fill={i % 3 === 0 ? THEME.accent : i % 3 === 1 ? THEME.accent2 : THEME.accent3}
                animate={{
                  opacity: [0.7, 1, 0.7],
                  r: [0.5 * n.s, 0.7 * n.s, 0.5 * n.s],
                }}
                transition={{
                  duration: 3.6 + i * 0.25,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.g>
        ) : null}
      </svg>
    </div>
  );
}

/** =======================
 *  DATA (from PDF)
 *  ======================= */
const accelerationTracks = [
  {
    key: "A",
    title: "AI Strategy & Leadership Programs",
    desc: "For executives and decision-makers shaping organizational direction.",
    icon: Target,
    color: THEME.accent2,
    bullets: ["Strategic clarity", "Governance & risk framing", "Roadmap alignment"],
  },
  {
    key: "B",
    title: "AI Workforce Enablement",
    desc: "For departments and teams adopting AI tools into workflows.",
    icon: ListChecks,
    color: THEME.accent,
    bullets: ["Practical enablement", "Workflow integration", "Reusable playbooks"],
  },
  {
    key: "C",
    title: "AI Implementation Labs",
    desc: "Hands-on integration programs focused on deployment, automation, and optimization.",
    icon: Zap,
    color: THEME.accent3,
    bullets: ["Prototype delivery", "Automation & optimization", "Implementation planning"],
  },
];

const programCategories = [
  {
    key: "biz",
    label: "AI for Business & Leadership",
    purpose: "Empower leaders to integrate AI into strategic decision-making.",
    icon: Briefcase,
    accent: THEME.accent2,
    outcome: "AI roadmap + structured adoption framework.",
    programs: [
      "AI Strategy & Governance",
      "AI for Executive Decision-Making",
      "Leading the AI-Driven Organization",
      "AI Adoption & Business Value Creation",
      "Artificial Intelligence & Business Strategy",
    ],
  },
  {
    key: "ops",
    label: "AI for Operations & Enterprise Systems",
    purpose: "Embed AI into operational efficiency and internal systems.",
    icon: Building2,
    accent: THEME.accent3,
    outcome: "Operational AI integration blueprint.",
    programs: [
      "AI in Internal Audit",
      "AI for HR & Workforce Analytics",
      "AI in Customer Onboarding & Data Migration",
      "AI-Enhanced Observability",
      "Agile Delivery Meets AI",
      "AI Project Management",
    ],
  },
  {
    key: "tech",
    label: "AI for Technical & Digital Teams",
    purpose: "Build applied AI capability inside technology teams.",
    icon: LineChart,
    accent: THEME.accent,
    outcome: "Deployed prototype or AI-enabled internal tool.",
    programs: [
      "AI for Developers (Productivity & Automation)",
      "RAG & Agentic AI Systems",
      "Multi-Agent AI Architecture",
      "Real-Time AI Applications",
      "No-Code AI & ML Implementation",
      "AI Security Best Practices",
      "Data Engineering in the Age of AI",
    ],
  },
  {
    key: "sector",
    label: "AI for Industry-Specific Sectors",
    purpose: "Tailored AI applications for sector-focused organizations.",
    icon: Globe2,
    accent: THEME.accent4,
    outcome: "Sector-specific AI integration strategy.",
    programs: [
      "AI for Healthcare",
      "AI in Pharma & Biotech",
      "AI for Financial Services",
      "AI for Family Enterprises",
      "Generative AI in Business",
      "Machine Learning for Enterprise Use",
      "AI for National & Regional Ecosystems",
    ],
  },
];

/** =======================
 *  UI blocks
 *  ======================= */
function SplitImperative() {
  const [mode, setMode] = useState("strategic"); // "unstructured" | "strategic"
  const reduce = useReducedMotion();

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="inline-flex items-center rounded-full bg-white/70 p-1 ring-1 ring-[#0B1220]/10">
          <button
            type="button"
            onClick={() => setMode("unstructured")}
            className={cx(
              "relative rounded-full px-4 py-2 text-sm font-semibold transition",
              mode === "unstructured" ? "text-white" : "text-[#0B1220]/70"
            )}
          >
            {mode === "unstructured" ? (
              <motion.span
                layoutId="imperativePill"
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.7)} 100%)`,
                }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span className="relative">Unstructured AI Use</span>
          </button>

          <button
            type="button"
            onClick={() => setMode("strategic")}
            className={cx(
              "relative rounded-full px-4 py-2 text-sm font-semibold transition",
              mode === "strategic" ? "text-white" : "text-[#0B1220]/70"
            )}
          >
            {mode === "strategic" ? (
              <motion.span
                layoutId="imperativePill"
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${THEME.accent} 0%, rgba(34,211,238,0.45) 100%)`,
                }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span className="relative">Strategic AI Adoption</span>
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[36px] bg-white/70 p-7 ring-1 ring-[#0B1220]/10"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage:
                  mode === "unstructured"
                    ? "repeating-linear-gradient(135deg, rgba(11,18,32,0.16) 0px, rgba(11,18,32,0.16) 14px, transparent 14px, transparent 30px)"
                    : "radial-gradient(900px circle at 20% 20%, rgba(34,211,238,0.16), transparent 55%), radial-gradient(900px circle at 80% 60%, rgba(167,139,250,0.12), transparent 55%)",
              }}
            />

            <div className="relative">
              <div className="flex items-start gap-4">
                <IconBadge color={mode === "unstructured" ? THEME.pink : THEME.accent}>
                  {mode === "unstructured" ? (
                    <Shield className="h-5 w-5" {...iconStrongProps} />
                  ) : (
                    <Rocket className="h-5 w-5" {...iconStrongProps} />
                  )}
                </IconBadge>
                <div>
                  <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
                    {mode === "unstructured" ? "RISK MODE" : "ADVANTAGE MODE"}
                  </div>
                  <div className="mt-1 text-xl font-semibold text-[#0B1220]">
                    {mode === "unstructured"
                      ? "Adoption without direction creates risk."
                      : "Structured adoption drives capability and speed."}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#0B1220]/70">
                    {mode === "unstructured"
                      ? "Leaders struggle to separate hype from strategy, teams lack structured capability, and experimentation remains fragmented."
                      : "Shift from experimentation to intelligent integration with clear governance, playbooks, and implementation roadmaps."}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {mode === "unstructured" ? (
                      <>
                        <Pill label="Fragmented tooling" tone="light" />
                        <Pill label="No governance" tone="light" />
                        <Pill label="Hidden risk" tone="light" />
                      </>
                    ) : (
                      <>
                        <Pill label="Capability assessment" tone="light" />
                        <Pill label="Adoption framework" tone="light" />
                        <Pill label="Implementation roadmap" tone="light" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="rounded-[36px] bg-white/70 p-7 ring-1 ring-[#0B1220]/10">
          <div className="flex items-start gap-4">
            <IconBadge color={THEME.accent4}>
              <ClipboardCheck className="h-5 w-5" {...iconStrongProps} />
            </IconBadge>
            <div>
              <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
                THE REALITY
              </div>
              <div className="mt-1 text-xl font-semibold text-[#0B1220]">
                AI is not the future. It’s the standard.
              </div>
              <div className="mt-4 space-y-3">
                {[
                  "AI is reshaping industries rapidly",
                  "Teams lack structured AI capability",
                  "Leaders struggle to separate hype from strategy",
                  "Adoption without direction creates risk",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <span
                      className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full ring-1"
                      style={{
                        background: "rgba(11,18,32,0.05)",
                        borderColor: "rgba(11,18,32,0.10)",
                      }}
                    >
                      <span className="h-2 w-2 rounded-full" style={{ background: THEME.accent }} />
                    </span>
                    <div className="text-sm text-[#0B1220]/75">{t}</div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-[#0B1220]/70">
                The competitive advantage is no longer experimenting — it’s structured adoption and
                intelligent integration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrackCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: Math.min(index * 0.05, 0.18) }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative overflow-hidden rounded-[36px] bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur"
      style={{ boxShadow: "0 20px 70px rgba(0,0,0,0.35)" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${item.color} 0%, rgba(255,255,255,0) 80%)`,
          opacity: 0.9,
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="shine" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <IconBadge color={item.color}>
              <Icon className="h-5 w-5" {...iconStrongProps} />
            </IconBadge>
            <div>
              <div className="text-xs font-semibold tracking-widest text-white/60">
                TRACK {item.key}
              </div>
              <div className="mt-1 text-lg font-semibold text-white">{item.title}</div>
            </div>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
            style={{
              background: "rgba(255,255,255,0.06)",
              borderColor: "rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.78)",
            }}
          >
            1–2 Weeks
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-white/70">{item.desc}</p>

        <div className="mt-5 space-y-3">
          {item.bullets.map((b) => (
            <div key={b} className="flex items-start gap-3">
              <span
                className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full ring-1"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  borderColor: "rgba(255,255,255,0.10)",
                }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
              </span>
              <div className="text-sm text-white/80">{b}</div>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}

function ProgramCard({ title, accentColor, outcome, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: Math.min(index * 0.03, 0.18) }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative w-[360px] shrink-0 overflow-hidden rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur"
      style={{ boxShadow: "0 18px 70px rgba(0,0,0,0.34)" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${accentColor} 0%, rgba(255,255,255,0) 85%)`,
          opacity: 0.9,
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="shine" />
      </div>

      <div className="relative">
        <div className="flex items-center gap-3">
          <IconBadge color={accentColor}>
            <FileCheck2 className="h-5 w-5" {...iconStrongProps} />
          </IconBadge>
          <div className="text-base font-semibold text-white" style={clampStyle(2)}>
            {title}
          </div>
        </div>

        <div className="mt-4 rounded-2xl p-4 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="text-xs font-semibold tracking-widest text-white/55">OUTCOME</div>
          <div className="mt-2 text-sm font-semibold text-white/90">{outcome}</div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
            style={{
              background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 100%)`,
              color: "rgba(255,255,255,0.96)",
              borderColor: "rgba(255,255,255,0.14)",
              boxShadow: `0 8px 20px ${accent(0.16)}`,
            }}
          >
            Executive-grade
          </span>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
              color: "rgba(255,255,255,0.85)",
              borderColor: "rgba(255,255,255,0.16)",
            }}
          >
            Short duration
          </span>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.80)",
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            Practical
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Field({ label, required, hint, children }) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold text-[#0B1220]">
          {label} {required ? <span style={{ color: THEME.pink }}>*</span> : null}
        </div>
        {hint ? <div className="text-xs text-[#0B1220]/55">{hint}</div> : null}
      </div>
      <div className="relative">
        {children}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 focus-within:opacity-100"
          style={{
            boxShadow: "0 0 0 4px rgba(34,211,238,0.18), 0 20px 60px rgba(34,211,238,0.14)",
          }}
        />
      </div>
    </label>
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
          "bg-white/70 text-[#0B1220] placeholder:text-[#0B1220]/40",
          "ring-[#0B1220]/10 hover:ring-[#0B1220]/20 focus:ring-2 focus:ring-[rgba(34,211,238,0.35)]",
          hasIcon ? "pl-11" : "",
          className
        )}
      />
    </div>
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
          "bg-white/70 text-[#0B1220]",
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

function Textarea(props) {
  return (
    <textarea
      {...props}
      className={cx(
        "w-full rounded-2xl px-4 py-3 text-sm outline-none ring-1 transition",
        "bg-white/70 text-[#0B1220] placeholder:text-[#0B1220]/40",
        "ring-[#0B1220]/10 hover:ring-[#0B1220]/20 focus:ring-2 focus:ring-[rgba(34,211,238,0.35)]"
      )}
      rows={4}
    />
  );
}

function Checkbox({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cx(
        "flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-semibold ring-1 transition",
        checked ? "text-[#0B1220]" : "text-[#0B1220]/75"
      )}
      style={{
        background: checked ? "rgba(34,211,238,0.14)" : "rgba(255,255,255,0.55)",
        borderColor: checked ? "rgba(34,211,238,0.30)" : "rgba(11,18,32,0.10)",
      }}
    >
      <span>{label}</span>
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full ring-1"
        style={{
          background: checked ? "rgba(34,211,238,0.25)" : "rgba(11,18,32,0.06)",
          borderColor: checked ? "rgba(34,211,238,0.35)" : "rgba(11,18,32,0.10)",
        }}
      >
        {checked ? <BadgeCheck className="h-4 w-4" style={{ color: THEME.accent }} {...iconStrongProps} /> : null}
      </span>
    </button>
  );
}

const outcomesDeliverables = [
  { icon: ClipboardCheck, t: "AI Capability Assessment", c: THEME.accent },
  { icon: Shield, t: "Risk & Readiness Mapping", c: THEME.accent3 },
  { icon: Target, t: "AI Adoption Framework", c: THEME.accent2 },
  { icon: ListChecks, t: "Departmental AI Playbooks", c: THEME.accent4 },
  { icon: Briefcase, t: "Executive-Level Strategy Brief", c: THEME.pink },
  { icon: MapPin, t: "Implementation Roadmap", c: THEME.accent },
];

function OutcomesDeliverablesGrid({ inView, reduce }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {outcomesDeliverables.map((x, i) => {
        const I = x.icon;
        return (
          <motion.div
            key={x.t}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: "easeOut", delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            className="rounded-[36px] bg-white/70 p-7 ring-1 ring-[#0B1220]/10"
          >
            <div className="flex items-start gap-4">
              <IconBadge color={x.c}>
                <I className="h-5 w-5" {...iconStrongProps} />
              </IconBadge>
              <div>
                <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
                  DELIVERABLE
                </div>
                <div className="mt-1 text-lg font-semibold text-[#0B1220]">{x.t}</div>
                <p className="mt-2 text-sm text-[#0B1220]/70">
                  Executive-ready output designed for action, governance, and adoption.
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/** =======================
 *  MAIN PAGE
 *  ======================= */
export default function AIForOrganizationsLanding() {
  const { i18n } = useTranslation();
  const reduce = useReducedMotion();
  const lang = i18n.resolvedLanguage || i18n.language || "en";
  const pageDir = lang === "ar" ? "rtl" : "ltr";

  const [activeCat, setActiveCat] = useState(programCategories[0].key);
  const active = useMemo(
    () => programCategories.find((c) => c.key === activeCat) || programCategories[0],
    [activeCat]
  );

  const sliderRef = useRef(null);
  const scrollSlider = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    const dx = dir === "left" ? -420 : 420;
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  const { ref: outcomesRef, inView: outcomesVisible } = useInViewOnce(0.25);

  // form state
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [orgSize, setOrgSize] = useState("51–200");
  const [maturity, setMaturity] = useState("Exploring AI");
  const [format, setFormat] = useState("Hybrid");
  const [timeline, setTimeline] = useState("Within 1 Month");

  const [focus, setFocus] = useState({
    exec: true,
    workforce: false,
    technical: false,
    industry: false,
    govt: false,
    custom: false,
  });

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      dir={pageDir}
      lang={lang}
      style={{
        background: THEME.deep,
        color: "white",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      }}
    >
      {/* background */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(1200px circle at 10% 10%, rgba(255,255,255,0.08), transparent 55%), radial-gradient(1200px circle at 80% 20%, rgba(233,231,223,0.06), transparent 55%), radial-gradient(900px circle at 60% 90%, rgba(255,255,255,0.06), transparent 55%)",
          }}
        />
        <div className="absolute inset-0 opacity-55">
          <div className="light-streak" />
        </div>
      </div>

      {/* HERO */}
      <section id="overview" className="relative" style={{ background: DARK_SECTION_BG }}>
        <NetworkBackground />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-14 pt-8 lg:grid-cols-2 lg:pb-20 lg:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.65, ease: "easeOut" }}
          >
            <h1 className="mt-2 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              AI-Ready Organizations
              <br />
              <span style={{ color: THEME.pink }}>Win Faster</span>.
            </h1>

            <p className="mt-5 max-w-xl text-balance text-base text-white/70 sm:text-lg">
              Intensive AI programs designed for companies, enterprises, and governments ready to
              lead — not follow.
            </p>

            <p className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-white/65">
              High-impact, short-duration AI programs (1–2 weeks) tailored for immediate capability,
              strategic clarity, and practical implementation — led by European industry experts and
              academic specialists.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GradientButton href="#consult">Request AI Consultation</GradientButton>
              <GradientButton href="#programs" variant="secondary">
                Explore Corporate AI Programs
              </GradientButton>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.75, ease: "easeOut", delay: 0.05 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-[620px] min-h-[440px] overflow-hidden rounded-[44px] ring-1 ring-white/10 sm:min-h-[540px]">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.16), transparent 58%), radial-gradient(circle at 70% 70%, rgba(233,231,223,0.10), transparent 55%), rgba(255,255,255,0.06)",
                }}
              />
              <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)" }} />
              <div className="absolute inset-0 flex flex-col p-6 sm:p-8">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { icon: Compass, t: "Capability + clarity", d: "From hype → strategy", c: THEME.accent2 },
                    { icon: ClipboardCheck, t: "Risk-aware adoption", d: "Governance + guardrails", c: THEME.accent3 },
                    { icon: Zap, t: "Implementation sprints", d: "Execution in 1–2 weeks", c: THEME.accent },
                  ].map((x, i) => {
                    const I = x.icon;
                    return (
                      <motion.div
                        key={x.t}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut", delay: 0.12 + i * 0.08 }}
                        whileHover={{ y: -4 }}
                        className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur"
                        style={{ boxShadow: "0 18px 60px rgba(0,0,0,0.28)" }}
                      >
                        <div className="flex items-start gap-3">
                          <IconBadge color={x.c}>
                            <I className="h-4 w-4" {...iconStrongProps} />
                          </IconBadge>
                          <div>
                            <div className="text-sm font-semibold text-white">{x.t}</div>
                            <div className="mt-1 text-xs text-white/65">{x.d}</div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

              </div>

              {/* subtle moving shine */}
              {!reduce ? (
                <div className="pointer-events-none absolute inset-0 opacity-60">
                  <div className="shine" />
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMPERATIVE */}
      <section id="imperative" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="AI Is Not the Future. It’s the Standard."
            subtitle="Organizations face a critical reality: capability gaps, strategy confusion, and adoption risk. Advantage comes from structured integration."
          />
          <SplitImperative />
        </div>
      </section>

      {/* MODEL */}
      <section id="model" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="From Awareness to Execution —"
            accentWord="Fast."
            subtitle="Intensive AI sprints (1–2 weeks) focused on real implementation."
            dark
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {accelerationTracks.map((t, i) => (
              <TrackCard key={t.key} item={t} index={i} />
            ))}
          </div>

          <div className="mt-8 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-semibold tracking-widest text-white/60">DELIVERY MODE</div>
                <div className="mt-1 text-base font-semibold text-white">
                  Real implementation, case simulations, and roadmap planning — not generic content.
                </div>
              </div>
              <a
                href="#programs"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/5"
              >
                Browse categories <ArrowRight className="h-4 w-4" {...iconStrongProps} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM CATEGORIES */}
      <section id="programs" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
      

          {/* tabs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {programCategories.map((c) => {
                const activeTab = c.key === activeCat;
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
                      activeTab ? "text-white ring-white/15" : "text-white/70 ring-white/10 hover:bg-white/5"
                    )}
                    style={
                      activeTab
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

          {/* selected info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut" }}
              className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-5"
            >
              <div className="lg:col-span-2">
                <div className="rounded-[36px] bg-white/5 p-7 ring-1 ring-white/10">
                  <div className="flex items-start gap-4">
                    <IconBadge color={active.accent}>
                      <active.icon className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                    <div>
                      <div className="text-xs font-semibold tracking-widest text-white/60">
                        PURPOSE
                      </div>
                      <div className="mt-1 text-lg font-semibold text-white">{active.purpose}</div>
                      <div className="mt-5 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                        <div className="text-xs font-semibold tracking-widest text-white/60">
                          OUTCOME
                        </div>
                        <div className="mt-2 text-sm font-semibold text-white/90">
                          {active.outcome}
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <Pill label="Clickable switcher" />
                        <Pill label="Horizontal cards" />
                        <Pill label="Hover glow" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* slider */}
              <div className="lg:col-span-3">
                <div className="relative">
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
                    {active.programs.map((p, idx) => (
                      <div key={p} style={{ scrollSnapAlign: "start" }}>
                        <ProgramCard
                          title={p}
                          accentColor={active.accent}
                          outcome={active.outcome}
                          index={idx}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FORMAT */}
      <section
        id="format"
        className="relative"
        style={{
          background:
            "linear-gradient(180deg, rgba(233,231,223,1) 0%, rgba(233,231,223,0.85) 100%)",
          color: THEME.deep,
        }}
      >
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="1 to 2 Weeks"
            accentWord="Intensive."
            subtitle="Online cohorts, hybrid delivery, fully on-site corporate delivery, or government-level strategic workshops."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                icon: CalendarIcon,
                title: "Duration",
                desc: "1–2 weeks (intensive format)",
                c: THEME.accent,
              },
              {
                icon: DeliveryIcon,
                title: "Delivery Options",
                desc: "Online · Hybrid · On-site · Executive workshops",
                c: THEME.accent3,
              },
              {
                icon: ScheduleIcon,
                title: "Start Frequency",
                desc: "Rolling monthly schedules or private corporate cohorts",
                c: THEME.accent4,
              },
            ].map((x, i) => (
              <motion.div
                key={x.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="rounded-[36px] bg-white/70 p-7 ring-1 ring-[#0B1220]/10"
              >
                <div className="flex items-start gap-4">
                  <IconBadge color={x.c}>
                    <x.icon className="h-5 w-5" {...iconStrongProps} />
                  </IconBadge>
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
                      {x.title.toUpperCase()}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-[#0B1220]">{x.title}</div>
                    <div className="mt-3 text-sm leading-relaxed text-[#0B1220]/70">{x.desc}</div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <Pill label="Premium spacing" tone="light" />
                      <Pill label="High-credibility" tone="light" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 rounded-[36px] bg-white/70 p-7 ring-1 ring-[#0B1220]/10">
            <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">NOTE</div>
            <div className="mt-2 text-2xl font-semibold text-[#0B1220]">
              Designed around your organization — not generic content.
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Industry sector",
                "Organizational size",
                "AI maturity level",
                "Strategic objectives",
                "Regulatory environment",
                "Digital transformation goals",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3 rounded-3xl bg-white/55 p-4 ring-1 ring-[#0B1220]/10">
                  <IconBadge color={THEME.accent2}>
                    <Handshake className="h-4 w-4" {...iconStrongProps} />
                  </IconBadge>
                  <div className="text-sm font-semibold text-[#0B1220]/80">{t}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[32px] p-6 ring-1 ring-[#0B1220]/10" style={{ background: "rgba(11,18,32,0.04)" }}>
              <div className="text-sm font-semibold text-[#0B1220]">
                “AI Adoption Without Structure Creates Risk. We Deliver Structured Transformation.”
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTS */}
      <section id="experts" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Led by practitioners"
            accentWord="and academic specialists"
            subtitle="Each engagement includes simulations, modeling, risk discussions, and implementation planning."
            dark
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                icon: Briefcase,
                title: "European AI Practitioners",
                desc: "Industry execution, implementation constraints, and delivery realism.",
                c: THEME.accent,
              },
              {
                icon: GraduationCap,
                title: "University Professors",
                desc: "AI & digital systems expertise with research-grade clarity.",
                c: THEME.accent2,
              },
              {
                icon: Shield,
                title: "Implementation Specialists",
                desc: "Security, governance, risk framing, and operational reliability.",
                c: THEME.accent3,
              },
            ].map((x, i) => {
              const I = x.icon;
              return (
                <motion.div
                  key={x.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-[36px] bg-white/5 p-7 ring-1 ring-white/10"
                  style={{ boxShadow: "0 22px 80px rgba(0,0,0,0.35)" }}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="shine" />
                  </div>
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <IconBadge color={x.c}>
                        <I className="h-5 w-5" {...iconStrongProps} />
                      </IconBadge>
                      <div>
                        <div className="text-lg font-semibold text-white">{x.title}</div>
                        <div className="mt-2 text-sm leading-relaxed text-white/70">{x.desc}</div>
                        <div className="mt-5 flex flex-wrap gap-2">
                          <Pill label="Case simulations" />
                          <Pill label="Use-case modeling" />
                          <Pill label="Planning workshop" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* OUTCOMES */}
      <section
        className="relative"
        style={{ background: THEME.sand, color: THEME.deep }}
      >
        <div ref={outcomesRef} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Beyond learning."
            accentWord="Toward capability."
            subtitle="Assessments, playbooks, strategy briefs, and implementation roadmaps designed for real adoption."
          />

          <OutcomesDeliverablesGrid inView={outcomesVisible} reduce={reduce} />

          <div className="mt-8 rounded-[36px] bg-white/70 p-7 ring-1 ring-[#0B1220]/10">
            <div className="flex items-start gap-4">
              <IconBadge color={THEME.accent2}>
                <BadgeCheck className="h-5 w-5" {...iconStrongProps} />
              </IconBadge>
              <div>
                <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
                  OPTIONAL ADD-ON
                </div>
                <div className="mt-1 text-xl font-semibold text-[#0B1220]">
                  Ongoing AI advisory partnership
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#0B1220]/70">
                  Continue with governance support, implementation checkpoints, and roadmap refinement.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[36px] bg-white/70 p-7 ring-1 ring-[#0B1220]/10">
            <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">
              WHO THIS IS DESIGNED FOR
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Corporations & Enterprises",
                "Government Authorities",
                "Ministries & Public Sector Entities",
                "Innovation Centers",
                "National Digital Programs",
                "Family-Owned Businesses",
                "Large SMEs transitioning to AI-enabled operations",
              ].map((t) => (
                <Pill key={t} label={t} tone="light" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONSULTATION FORM */}
      <section id="consult" className="relative" style={{ background: "rgba(233,231,223,1)", color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Request an Organizational"
            accentWord="AI Strategy Session"
            subtitle="Share your context and we’ll propose the right sprint format and outcomes."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reduce ? 0 : 0.55, ease: "easeOut" }}
                className="relative rounded-[40px] p-[1px]"
                style={{
                  background: "#FFFFFF",
                  backgroundSize: "200% 200%",
                  animation: reduce ? "none" : "gradMove 10s ease-in-out infinite",
                  boxShadow: "0 26px 90px rgba(0,0,0,0.18)",
                }}
              >
                <div className="relative rounded-[36px] bg-white/70 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur">
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
                        Request received
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
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Organization Name" required>
                        <Input icon={Building2} iconColor={THEME.accent2} placeholder="Organization name" />
                      </Field>
                      <Field label="Industry" required>
                        <Input icon={Briefcase} iconColor={THEME.accent3} placeholder="e.g., Banking, Healthcare" />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Country" required>
                        <Input icon={MapPin} iconColor={THEME.accent4} placeholder="Country" />
                      </Field>
                      <Field label="Organization Size" required>
                        <Select
                          icon={LineChart}
                          iconColor={THEME.accent}
                          value={orgSize}
                          onChange={setOrgSize}
                          options={["1–50", "51–200", "201–1000", "1000+"]}
                        />
                      </Field>
                    </div>

                    <Field label="Department (Optional)">
                      <Input icon={Compass} iconColor={THEME.accent2} placeholder="Department (optional)" />
                    </Field>

                    <div className="pt-2 text-xs font-semibold tracking-widest text-[#0B1220]/60">
                      CONTACT INFORMATION
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Full Name" required>
                        <Input icon={BadgeCheck} iconColor={THEME.accent2} placeholder="Full name" />
                      </Field>
                      <Field label="Position / Title" required>
                        <Input icon={Briefcase} iconColor={THEME.accent3} placeholder="e.g., CIO, Director" />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Corporate Email" required>
                        <Input icon={Globe2} iconColor={THEME.accent} placeholder="name@company.com" type="email" />
                      </Field>
                      <Field label="Phone Number">
                        <Input icon={Rocket} iconColor={THEME.accent4} placeholder="+000 000 000 000" />
                      </Field>
                    </div>

                    <div className="pt-2 text-xs font-semibold tracking-widest text-[#0B1220]/60">
                      AI FOCUS AREA (MULTI-SELECT)
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Checkbox
                        label="Executive Strategy"
                        checked={focus.exec}
                        onChange={(v) => setFocus((s) => ({ ...s, exec: v }))}
                      />
                      <Checkbox
                        label="Workforce Upskilling"
                        checked={focus.workforce}
                        onChange={(v) => setFocus((s) => ({ ...s, workforce: v }))}
                      />
                      <Checkbox
                        label="Technical AI Integration"
                        checked={focus.technical}
                        onChange={(v) => setFocus((s) => ({ ...s, technical: v }))}
                      />
                      <Checkbox
                        label="Industry-Specific AI"
                        checked={focus.industry}
                        onChange={(v) => setFocus((s) => ({ ...s, industry: v }))}
                      />
                      <Checkbox
                        label="Government AI Program"
                        checked={focus.govt}
                        onChange={(v) => setFocus((s) => ({ ...s, govt: v }))}
                      />
                      <Checkbox
                        label="Customized AI Sprint"
                        checked={focus.custom}
                        onChange={(v) => setFocus((s) => ({ ...s, custom: v }))}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="AI Maturity Level" required>
                        <Select
                          icon={Target}
                          iconColor={THEME.accent2}
                          value={maturity}
                          onChange={setMaturity}
                          options={["Exploring AI", "Pilot Phase", "Active Implementation", "Advanced Deployment"]}
                        />
                      </Field>
                      <Field label="Preferred Format" required>
                        <Select
                          icon={Handshake}
                          iconColor={THEME.accent3}
                          value={format}
                          onChange={setFormat}
                          options={["Online", "Hybrid", "On-site", "Executive Workshop"]}
                        />
                      </Field>
                    </div>

                    <Field label="Desired Timeline" required>
                      <Select
                        icon={Calendar}
                        iconColor={THEME.accent4}
                        value={timeline}
                        onChange={setTimeline}
                        options={["Immediate", "Within 1 Month", "Within 3 Months", "Planning Phase"]}
                      />
                    </Field>

                    <Field label="Additional Notes" hint="Describe your objectives or current challenges.">
                      <Textarea placeholder="What are you trying to achieve? What constraints exist?" />
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
                        <span className="relative z-10">
                          {submitting ? "Submitting..." : "Schedule AI Strategy Session"}
                        </span>
                        {!reduce ? (
                          <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 hover:opacity-100">
                            <span className="shine" />
                          </span>
                        ) : null}
                      </motion.button>

                    </div>
                  </form>
                </div>
              </motion.div>
            </div>

            {/* side panel */}
            <div className="lg:col-span-2">
              <div
                className="rounded-[36px] p-7 ring-1 ring-[#0B1220]/10 lg:sticky lg:top-24"
                style={{
                  background:
                    "radial-gradient(900px circle at 30% 15%, rgba(255,255,255,0.12), transparent 55%), radial-gradient(900px circle at 80% 70%, rgba(255,255,255,0.06), transparent 55%), rgba(255,255,255,0.70)",
                }}
              >
                <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">
                  WHAT YOU GET
                </div>
                <div className="mt-2 text-2xl font-semibold leading-tight text-[#0B1220]">
                  A structured transformation path — not just training.
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    { icon: ClipboardCheck, t: "Capability assessment + readiness mapping", c: THEME.accent },
                    { icon: Shield, t: "Risk-aware adoption framing", c: THEME.accent3 },
                    { icon: FileCheck2, t: "Implementation roadmap + playbooks", c: THEME.accent4 },
                    { icon: Briefcase, t: "Executive strategy brief", c: THEME.accent2 },
                  ].map((x) => {
                    const I = x.icon;
                    return (
                      <div key={x.t} className="flex items-start gap-3">
                        <IconBadge color={x.c}>
                          <I className="h-4 w-4" {...iconStrongProps} />
                        </IconBadge>
                        <div className="text-sm text-[#0B1220]/75">{x.t}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-7 rounded-3xl bg-white/70 p-5 ring-1 ring-[#0B1220]/10">
                  <div className="text-sm font-semibold text-[#0B1220]">Quick fit</div>
                  <p className="mt-2 text-sm text-[#0B1220]/70">
                    Selected category: <span className="font-semibold">{active.label}</span>
                  </p>
                  <p className="mt-1 text-sm text-[#0B1220]/70">{active.purpose}</p>
                  <div className="mt-4">
                    <a
                      href="#programs"
                      className="inline-flex items-center gap-2 rounded-full bg-[#0B1220] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Browse programs <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* footer CTA */}
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
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)",
                }}
              />
              <div className="relative mx-auto max-w-6xl text-white">
                <div className="text-xs font-semibold text-white/80 sm:text-sm">
                  High-impact sprints · executive-ready deliverables · practical implementation
                </div>
                <div className="mt-3 text-3xl font-semibold md:text-4xl">
                  Move from AI interest to <span className="text-white">structured adoption</span>
                </div>
                <p className="mx-auto mt-4 max-w-4xl text-sm font-medium text-white/80">
                  Fast, credible programs designed to create capability, reduce risk, and deliver implementation momentum.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href="#consult"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] transition hover:opacity-95"
                  >
                    Request Consultation <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </a>
                  <a
                    href="#programs"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15"
                  >
                    Explore Programs <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <style>{css}</style>
        </div>
      </section>

      {/* sticky CTA */}
      <a
        href="#consult"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:inline-flex"
        style={{
          background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)`,
        }}
      >
        <Briefcase className="h-4 w-4" {...iconStrongProps} />
        Request Consultation
      </a>
    </div>
  );
}

/** =======================
 *  Small inline icons used in cards
 *  ======================= */
function CalendarIcon(props) {
  return <Calendar {...props} />;
}
function DeliveryIcon(props) {
  return <Building2 {...props} />;
}
function ScheduleIcon(props) {
  return <Compass {...props} />;
}

/** =======================
 *  CSS (same style language as your code)
 *  ======================= */
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

/* generic shine */
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

@keyframes gradMove{
  0%{ background-position: 0% 50%; }
  50%{ background-position: 100% 50%; }
  100%{ background-position: 0% 50%; }
}

.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }
`;
