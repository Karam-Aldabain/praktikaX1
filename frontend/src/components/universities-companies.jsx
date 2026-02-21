import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Compass,
  FileCheck2,
  Flame,
  Globe2,
  GraduationCap,
  Handshake,
  LineChart,
  ListChecks,
  MapPin,
  PenTool,
  Shield,
  Sparkles,
  Star,
  Target,
  Zap,
  Users,
  Layers,
  Mail,
  Phone,
  MessageCircle,
  Download,
  Send,
  X,
} from "lucide-react";

/**
 * OrganizationsLanding.jsx
 * - Uses the SAME color system as your provided code (THEME).
 * - Rebuilds the “For Organizations: Universities & Companies” page structure from the PDF.
 * - Adds richer motion: animated node-graph, section reveals, glass cards, step form transitions, micro-interactions.
 *
 * Requirements:
 * - TailwindCSS
 * - framer-motion
 * - lucide-react
 */

const THEME = {
  // Core background
  deep: "#0B1220",
  slate: "#1E2A3A",
  sand: "#E9E7DF",

  // Accent system
  accent: "#22D3EE", // cyan
  accent2: "#A78BFA", // violet
  accent3: "#34D399", // green
  accent4: "#F59E0B", // amber

  // Keep pink only where you explicitly want it
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

function IconBadge({ color, children }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl ring-1" style={POWER_ICON_SHELL}>
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

function GradientButton({ children, href, onClick, variant = "primary", icon = ArrowRight }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const primary = "text-white shadow-[0_12px_30px_rgba(34,211,238,0.18)] hover:translate-y-[-1px] active:translate-y-[0px]";
  const secondary = "bg-transparent text-white ring-1 ring-white/20 hover:bg-white/5";

  const stylePrimary = {
    background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.82)} 55%, ${accent(0.60)} 120%)`,
  };

  const Comp = href ? "a" : "button";
  const props = href ? { href } : { type: "button" };
  const Icon = icon;

  return (
    <Comp
      {...props}
      onClick={onClick}
      className={cx(base, variant === "primary" ? primary : secondary)}
      style={variant === "primary" ? stylePrimary : undefined}
    >
      {children}
      <Icon className="h-4 w-4" {...iconStrongProps} />
    </Comp>
  );
}

function SectionTitle({ eyebrow, title, accentText, subtitle, dark }) {
  return (
    <div className={cx("mx-auto max-w-6xl", dark ? "text-white" : "text-[#0B1220]")}>
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

      <h2
        className={cx(
          eyebrow ? "mt-5 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl" : "mt-0 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-[#0B1220]"
        )}
      >
        {title}{" "}
        {accentText ? (
          <span
            style={{
              color: THEME.pink,
            }}
          >
            {accentText}
          </span>
        ) : null}
      </h2>

      {subtitle ? (
        <p className={cx("mt-3 max-w-5xl text-balance text-base sm:text-lg", dark ? "text-white/70" : "text-[#0B1220]/70")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

/** ---------- Animated Node Graph (Hero Visual) ---------- */
function NodeGraph() {
  const reduce = useReducedMotion();

  const nodes = [
    { id: "u", label: "University", x: 18, y: 40, c: THEME.accent2, icon: GraduationCap },
    { id: "i", label: "Industry", x: 70, y: 30, c: THEME.accent, icon: Building2 },
    { id: "n", label: "Innovation", x: 62, y: 72, c: THEME.accent3, icon: Sparkles },
    { id: "a", label: "AI", x: 30, y: 75, c: THEME.accent4, icon: Flame },
  ];

  const links = [
    ["u", "i"],
    ["i", "n"],
    ["n", "a"],
    ["a", "u"],
    ["u", "n"],
  ];

  const nodeById = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), []);

  return (
    <div
      className="relative overflow-hidden rounded-[44px] ring-1 ring-white/10"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
        boxShadow: "0 25px 80px rgba(0,0,0,0.40)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.14]" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(34,211,238,0.25), transparent 55%), radial-gradient(circle at 80% 20%, rgba(167,139,250,0.22), transparent 55%), radial-gradient(circle at 60% 85%, rgba(52,211,153,0.18), transparent 60%)" }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.14]" style={{ backgroundImage: "linear-gradient(rgba(233,231,223,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(233,231,223,0.12) 1px, transparent 1px)", backgroundSize: "52px 52px", maskImage: "radial-gradient(520px circle at 40% 35%, rgba(0,0,0,1), transparent 70%)" }} />

      {/* SVG lines */}
      <div className="relative h-[320px] w-full sm:h-[420px]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="linkGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={THEME.accent} stopOpacity="0.55" />
              <stop offset="0.5" stopColor={THEME.pink} stopOpacity="0.35" />
              <stop offset="1" stopColor={THEME.accent3} stopOpacity="0.50" />
            </linearGradient>

            <filter id="softGlow">
              <feGaussianBlur stdDeviation="0.9" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {links.map(([a, b], idx) => {
            const A = nodeById[a];
            const B = nodeById[b];
            return (
              <g key={idx} filter="url(#softGlow)">
                <path
                  d={`M ${A.x} ${A.y} Q ${(A.x + B.x) / 2} ${(A.y + B.y) / 2 - 8} ${B.x} ${B.y}`}
                  fill="none"
                  stroke="url(#linkGrad)"
                  strokeWidth="0.8"
                  opacity="0.55"
                  strokeLinecap="round"
                />
                {/* moving shimmer */}
                {!reduce ? (
                  <motion.circle
                    r="1.1"
                    fill={THEME.sand}
                    opacity="0.45"
                    animate={{ offsetDistance: ["0%", "100%"] }}
                    transition={{ duration: 3.8 + idx * 0.3, repeat: Infinity, ease: "linear" }}
                    style={{ offsetPath: `path("M ${A.x} ${A.y} Q ${(A.x + B.x) / 2} ${(A.y + B.y) / 2 - 8} ${B.x} ${B.y}")` }}
                  />
                ) : null}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        <div className="absolute inset-0">
          {nodes.map((n, i) => {
            const Icon = n.icon;
            return (
              <motion.div
                key={n.id}
                className="absolute"
                style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%, -50%)" }}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.10 + i * 0.08 }}
              >
                <motion.div
                  className="relative max-w-[44vw] rounded-3xl bg-white/5 px-3 py-2 ring-1 ring-white/10 backdrop-blur sm:max-w-none sm:px-4 sm:py-3"
                  whileHover={{ scale: 1.03, y: -2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  style={{ boxShadow: "0 18px 65px rgba(0,0,0,0.30)" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <span className="absolute inset-0 rounded-2xl" style={{ background: n.c, opacity: 0.12, filter: "blur(10px)" }} />
                      <IconBadge color={n.c}>
                        <Icon className="h-5 w-5" {...iconStrongProps} />
                      </IconBadge>
                    </div>

                    <div>
                      <div className="text-[10px] font-semibold tracking-widest text-white/55 sm:text-xs">CONNECTED</div>
                      <div className="mt-0.5 truncate text-xs font-semibold text-white sm:text-sm">{n.label}</div>
                    </div>
                  </div>

                  {/* pulse ring */}
                  {!reduce ? (
                    <motion.span
                      className="pointer-events-none absolute inset-0 rounded-3xl"
                      style={{ border: `1px solid ${n.c}`, opacity: 0.16 }}
                      animate={{ scale: [1, 1.06, 1], opacity: [0.12, 0.22, 0.12] }}
                      transition={{ duration: 2.8 + i * 0.25, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ) : null}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Shine */}
        <div className="pointer-events-none absolute inset-0 opacity-55">
          <div className="light-streak" />
        </div>
      </div>

      {/* Bottom caption */}
      <div className="border-t border-white/10 bg-white/5 p-5 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mt-1 text-sm font-semibold text-white">University ↔ Industry ↔ Innovation, delivered with structured execution.</div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/75 ring-1 ring-white/10">
            <Compass className="h-4 w-4" style={{ color: THEME.accent2 }} {...iconStrongProps} />
            <span>Institutional-grade delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** ---------- Reusable Cards ---------- */
function GlassCard({ children, className }) {
  return (
    <div
      className={cx("relative overflow-hidden rounded-[36px] bg-white/5 p-7 ring-1 ring-white/10 backdrop-blur", className)}
      style={{ boxShadow: "0 22px 80px rgba(0,0,0,0.32)" }}
    >
      <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(34,211,238,0.12)" }} />
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(167,139,250,0.10)" }} />
      {children}
    </div>
  );
}

function MiniFeature({ icon: Icon, title, desc, color }) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10"
    >
      <div className="flex items-start gap-3">
        <IconBadge color={color}>
          <Icon className="h-5 w-5" {...iconStrongProps} />
        </IconBadge>
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-sm text-white/65">{desc}</div>
        </div>
      </div>
    </motion.div>
  );
}

function SplitToneCard({ tone = "pink", title, bullets, icon }) {
  const bg =
    tone === "pink"
      ? "linear-gradient(135deg, #C91D67 0%, #B3175A 100%)"
      : tone === "blue"
      ? "linear-gradient(135deg, #061A3B 0%, #0A2A4F 100%)"
      : "rgba(255,255,255,0.55)";

  const isDark = tone === "pink" || tone === "blue";

  return (
    <div
      className={cx("relative overflow-hidden rounded-[36px] p-7 ring-1", isDark ? "text-white" : "text-[#0B1220]")}
      style={{
        background: bg,
        borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(11,18,32,0.10)",
      }}
    >
      {tone === "pink" ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.20) 0px, rgba(255,255,255,0.20) 14px, transparent 14px, transparent 30px)",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-3 left-6 h-40 w-20 opacity-[0.16]"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.40), transparent 70%)", transform: "skewX(-18deg)" }}
          />
        </>
      ) : null}

      {tone === "blue" ? (
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-[0.5]"
          style={{ border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 0 0 18px rgba(255,255,255,0.05), 0 0 0 36px rgba(255,255,255,0.03)" }}
        />
      ) : null}

      <div className="flex items-center gap-3">
        <div
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{
            background: isDark ? "rgba(255,255,255,0.12)" : "rgba(11,18,32,0.05)",
            border: isDark ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(11,18,32,0.10)",
          }}
        >
          <span style={{ color: isDark ? "rgba(255,255,255,0.95)" : THEME.accent }}>{icon}</span>
        </div>
        <div>
          <div className={cx("mt-1 text-lg font-semibold", isDark ? "text-white" : "text-[#0B1220]")}>{title}</div>
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
            <div className={cx("text-sm", isDark ? "text-white/85" : "text-[#0B1220]/75")}>{b}</div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl" style={{ background: isDark ? "rgba(255,255,255,0.10)" : "rgba(11,18,32,0.06)" }} />
    </div>
  );
}

/** ---------- Data from PDF (content only; colors from your code) ---------- */
const universityPrograms = [
  {
    group: "Technology & Engineering",
    icon: Zap,
    color: THEME.accent,
    items: [
      "Software Development (Frontend, Backend, Full Stack)",
      "Cloud Computing",
      "AI & Machine Learning",
      "Cybersecurity",
      "Data Analysis",
      "Web & Mobile Development",
      "UI/UX Design",
      "Game Development",
      "Digital Transformation",
    ],
  },
  {
    group: "Business & Strategy",
    icon: Handshake,
    color: THEME.accent3,
    items: [
      "Finance",
      "Business Development",
      "Digital Marketing",
      "Sales & Marketing",
      "Project Management",
      "Business Consulting",
      "Entrepreneurship & Startup Building",
      "Supply Chain Management",
      "Digital Economics",
    ],
  },
  {
    group: "Emerging & Specialized Fields",
    icon: Sparkles,
    color: THEME.accent2,
    items: ["FinTech", "Digital Health Management"],
  },
];

const companyPrograms = [
  {
    title: "Corporate Internship Programs",
    icon: Briefcase,
    color: THEME.accent,
    bullets: [
      "Junior employees",
      "Graduate recruits",
      "Talent pipeline programs",
      "Internships can be customized to company workflows and real operational projects.",
    ],
  },
  {
    title: "Tailored Capability Building",
    icon: ClipboardCheck,
    color: THEME.accent3,
    bullets: [
      "AI adoption workshops",
      "Digital transformation training",
      "Leadership programs",
      "Strategic innovation sessions",
      "Technical bootcamps",
      "Department-specific skill upgrades",
      "Tailored to organizational goals",
      "Delivered by European industry professionals",
      "Built around measurable outcomes",
    ],
  },
  {
    title: "Future-Proofing the Extended Workforce",
    icon: Users,
    color: THEME.accent2,
    bullets: [
      "Organizations may provide AI learning access for employees, young professionals, and employees' children (AI foundational programs).",
      "Practical AI use in daily work",
      "Prompt engineering",
      "Automation tools",
      "AI productivity frameworks",
      "Industry-specific AI applications",
      "This enhances long-term organizational adaptability and digital culture.",
    ],
  },
];
const expertCards = [
  { name: "European Industry Experts", role: "Hands-on practitioners", icon: Building2, color: THEME.accent },
  { name: "Top University Professors", role: "Academic rigor + relevance", icon: GraduationCap, color: THEME.accent2 },
  { name: "Senior Consultants", role: "Field-proven delivery", icon: LineChart, color: THEME.accent3 },
  { name: "Program Leads", role: "Structured milestones", icon: ListChecks, color: THEME.accent4 },
];

const deliveryItems = [
  { label: "Formats", icon: Layers, color: THEME.accent, lines: ["Fully Online", "Hybrid", "On-Site", "Co-Hosted Campus Programs"] },
  { label: "Duration", icon: Calendar, color: THEME.accent3, lines: ["3–6 months (Internships)", "Academic-term aligned (Industrial Courses)", "Short-term intensive (Workshops)"] },
  { label: "Includes", icon: FileCheck2, color: THEME.accent4, lines: ["Clear milestones", "Defined deliverables", "Performance evaluation", "Structured reporting"] },
];

const whyPartner = [
  { title: "Industry-integrated design", icon: Compass, color: THEME.accent },
  { title: "European quality standards", icon: BadgeCheck, color: THEME.accent2 },
  { title: "Flexible deployment models", icon: Layers, color: THEME.accent3 },
  { title: "Measurable outcomes", icon: Target, color: THEME.accent4 },
  { title: "Scalable institutional framework", icon: Building2, color: THEME.accent },
  { title: "AI-first workforce development", icon: Flame, color: THEME.accent3 },
];

/** ---------- Multi-step Partnership Form ---------- */
const ORG_TYPES = [
  "University",
  "College",
  "Technical Institute",
  "Private Training Center",
  "Corporate Company",
  "Government Entity",
  "Innovation Hub",
  "Other",
];

const CONTACT_METHODS = ["Email", "Phone", "WhatsApp", "Video Meeting"];

const COLLAB_TYPES = [
  { group: "For Universities", items: ["Industry Internship Programs", "Industrial Courses (Parallel Academic Integration)", "Co-Hosting Model", "AI Programs for Students", "Workshops & Innovation Labs"] },
  { group: "For Companies", items: ["Corporate Internship Programs", "Custom Training Programs", "AI Upskilling for Employees", "Leadership & Strategy Workshops", "AI Programs for Employees’ Children", "Innovation & Digital Transformation Programs"] },
];

const FORMATS = ["Fully Online", "Hybrid", "On-Campus / On-Site", "Co-Hosted Model"];

const COHORT_SIZES = ["10–25", "25–50", "50–100", "100+", "Not sure yet"];

const AUDIENCES = [
  "Undergraduate Students",
  "Graduate Students",
  "Fresh Graduates",
  "Junior Employees",
  "Mid-Level Employees",
  "Leadership / Executives",
  "Mixed Audience",
];

const DURATIONS = ["3 Months", "4–6 Months", "Academic Term-Based", "Short Intensive (2–6 Weeks)", "Custom Duration"];

const START_TIMELINE = ["Immediately", "Within 1 Month", "Within 2–3 Months", "Next Academic Term", "Planning for Next Year"];

const OBJECTIVES = [
  "Improve employability outcomes",
  "Strengthen academic-industry alignment",
  "Upskill workforce",
  "AI adoption",
  "Innovation & digital transformation",
  "Leadership development",
  "Build long-term talent pipeline",
  "Other",
];

function ToggleChip({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ring-1 transition",
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
      {active ? <Check className="h-4 w-4" {...iconStrongProps} /> : <span className="h-2 w-2 rounded-full bg-white/20" />}
      <span>{label}</span>
    </button>
  );
}

function Field({ label, required, hint, children, dark = false }) {
  return (
    <label className="group block">
      <div className="mb-2 flex items-center justify-between">
        <div className={cx("text-sm font-semibold", dark ? "text-white" : "text-[#0B1220]")}>
          {label} {required ? <span style={{ color: THEME.pink }}>*</span> : null}
        </div>
        {hint ? <div className={cx("text-xs", dark ? "text-white/60" : "text-[#0B1220]/55")}>{hint}</div> : null}
      </div>

      <div className="relative">
        {children}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-focus-within:opacity-100"
          style={{ boxShadow: "0 0 0 4px rgba(34,211,238,0.18), 0 20px 60px rgba(34,211,238,0.14)" }}
        />
      </div>
    </label>
  );
}

function Input({ icon: Icon, iconColor = THEME.accent, className, dark = false, ...props }) {
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
          dark
            ? "bg-white/5 text-white placeholder:text-white/35 ring-white/10 hover:ring-white/20 focus:ring-2 focus:ring-[rgba(34,211,238,0.35)]"
            : "bg-white/60 text-[#0B1220] placeholder:text-[#0B1220]/40 ring-[#0B1220]/10 hover:ring-[#0B1220]/20 focus:ring-2 focus:ring-[rgba(34,211,238,0.35)]",
          hasIcon ? "pl-11" : "",
          className
        )}
      />
    </div>
  );
}

function Textarea({ dark = false, className, ...props }) {
  return (
    <textarea
      {...props}
      className={cx(
        "w-full rounded-2xl px-4 py-3 text-sm outline-none ring-1 transition",
        dark
          ? "bg-white/5 text-white placeholder:text-white/35 ring-white/10 hover:ring-white/20 focus:ring-2 focus:ring-[rgba(34,211,238,0.35)]"
          : "bg-white/60 text-[#0B1220] placeholder:text-[#0B1220]/40 ring-[#0B1220]/10 hover:ring-[#0B1220]/20 focus:ring-2 focus:ring-[rgba(34,211,238,0.35)]",
        className
      )}
      rows={4}
    />
  );
}

function Select({ value, onChange, options, icon: Icon, iconColor = THEME.accent, dark = false }) {
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
          dark
            ? "bg-white/5 text-white ring-white/10 hover:ring-white/20 focus:ring-2 focus:ring-[rgba(34,211,238,0.35)]"
            : "bg-white/60 text-[#0B1220] ring-[#0B1220]/10 hover:ring-[#0B1220]/20 focus:ring-2 focus:ring-[rgba(34,211,238,0.35)]",
          hasIcon ? "pl-11" : ""
        )}
      >
        {options.map((o) => (
          <option key={o} value={o} className="text-[#0B1220]">
            {o}
          </option>
        ))}
      </select>

      <div className={cx("pointer-events-none absolute right-4 top-1/2 -translate-y-1/2", dark ? "text-white/55" : "text-[#0B1220]/55")}>
        <ChevronRight className="h-4 w-4 rotate-90" {...iconStrongProps} />
      </div>
    </div>
  );
}

function StepPills({ step, steps, onJump }) {
  return (
    <div className="flex flex-wrap gap-2">
      {steps.map((s, idx) => {
        const active = idx === step;
        const done = idx < step;
        return (
          <button
            key={s.key}
            type="button"
            onClick={() => onJump(idx)}
            className={cx(
              "inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ring-1 transition",
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
            <span
              className="inline-flex h-5 w-5 items-center justify-center rounded-full"
              style={{
                background: done ? "rgba(52,211,153,0.18)" : active ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {done ? <Check className="h-3.5 w-3.5" style={{ color: THEME.accent3 }} {...iconStrongProps} /> : <span className="text-[11px]">{idx + 1}</span>}
            </span>
            <span>{s.short}</span>
          </button>
        );
      })}
    </div>
  );
}

const DEFAULT_APPLY_OFFER = {
  title: "Institutional Partnership Package",
  type: "General Partnership",
  points: ["Tailored program scope", "Structured milestones", "Expert-led delivery", "Outcome reporting"],
  price: 1499,
};

function ApplyFlowModal({ open, offer, onClose }) {
  const selectedOffer = offer || DEFAULT_APPLY_OFFER;
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Stripe");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    persona: "University Student",
    academicYear: "Final Year",
    specialization: "",
    preferredCategory: selectedOffer.type || "Engineering & Technology",
    startTimeline: "Within 1 Month",
    selectedProgram: selectedOffer.title,
  });

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setPaymentMethod("Stripe");
    setErrors({});
    setForm({
      fullName: "",
      email: "",
      phone: "",
      country: "",
      persona: "University Student",
      academicYear: "Final Year",
      specialization: "",
      preferredCategory: selectedOffer.type || "Engineering & Technology",
      startTimeline: "Within 1 Month",
      selectedProgram: selectedOffer.title,
    });
  }, [open, selectedOffer.title, selectedOffer.type]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const price = Number(selectedOffer.price || 1499);
  const vat = Number((price * 0.19).toFixed(2));
  const total = Number((price + vat).toFixed(2));

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validateStepOne = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 0 && !validateStepOne()) return;
    setStep((p) => Math.min(p + 1, 2));
  };

  const back = () => setStep((p) => Math.max(p - 1, 0));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] bg-[#0B1220]/70 p-4 backdrop-blur-sm sm:p-6"
      >
        <div className="mx-auto max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-[28px] bg-[#F3F4F6] ring-1 ring-[#0B1220]/10">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#0B1220]/10 bg-[#F3F4F6] px-6 py-5">
            <div>
              <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">APPLICATION FLOW</div>
              <div className="mt-1 text-xl font-semibold text-[#0B1220]">Apply for {selectedOffer.title}</div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-[#0B1220]/10 transition hover:bg-[#E5E7EB]"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-[#0B1220]" {...iconStrongProps} />
            </button>
          </div>

          <div className="px-6 py-6">
            <div className="mb-6 grid grid-cols-3 gap-2">
              {["Form", "Review", "Pay"].map((label, idx) => {
                const active = idx === step;
                const done = idx < step;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => (idx <= step ? setStep(idx) : null)}
                    className={cx(
                      "rounded-full px-3 py-2 text-xs font-semibold ring-1 transition",
                      active ? "text-white" : "text-[#0B1220]/70",
                      active ? "ring-transparent" : "ring-[#0B1220]/10"
                    )}
                    style={active ? { background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.72)} 100%)` } : { background: done ? "rgba(52,211,153,0.16)" : "white" }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {step === 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Full Name" required>
                    <Input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Your full name" icon={Users} iconColor={THEME.accent2} />
                    {errors.fullName ? <p className="mt-2 text-xs text-rose-600">{errors.fullName}</p> : null}
                  </Field>
                  <Field label="Email Address" required>
                    <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="name@email.com" icon={Globe2} iconColor={THEME.accent} />
                    {errors.email ? <p className="mt-2 text-xs text-rose-600">{errors.email}</p> : null}
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Phone Number">
                    <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+20 000 000 000" icon={Briefcase} iconColor={THEME.accent3} />
                  </Field>
                  <Field label="Country">
                    <Input value={form.country} onChange={(e) => set("country", e.target.value)} placeholder="Country" icon={MapPin} iconColor={THEME.accent4} />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Are You?">
                    <Select value={form.persona} onChange={(v) => set("persona", v)} options={["University Student", "Graduate"]} icon={GraduationCap} iconColor={THEME.accent3} />
                  </Field>
                  <Field label="Current Academic Year">
                    <Select value={form.academicYear} onChange={(v) => set("academicYear", v)} options={["1st", "2nd", "3rd", "Final Year"]} icon={Calendar} iconColor={THEME.accent} />
                  </Field>
                </div>

                <Field label="Field of Study / Specialization">
                  <Input value={form.specialization} onChange={(e) => set("specialization", e.target.value)} placeholder="e.g., Software Engineering, Business, Finance" icon={Sparkles} iconColor={THEME.accent2} />
                </Field>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Preferred Internship Category">
                    <Select
                      value={form.preferredCategory}
                      onChange={(v) => set("preferredCategory", v)}
                      options={["Engineering & Technology", "Business, Finance & Consulting", "Digital Health & Emerging Fields", selectedOffer.type || "Custom"]}
                      icon={Briefcase}
                      iconColor={THEME.accent4}
                    />
                  </Field>
                  <Field label="Preferred Start Timeline">
                    <Select
                      value={form.startTimeline}
                      onChange={(v) => set("startTimeline", v)}
                      options={["Immediately", "Within 1 Month", "Within 2-3 Months"]}
                      icon={Calendar}
                      iconColor={THEME.accent}
                    />
                  </Field>
                </div>

                <Field label="Selected Program">
                  <Input value={form.selectedProgram} readOnly icon={BadgeCheck} iconColor={THEME.pink} />
                </Field>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="space-y-4">
                <div className="rounded-[22px] bg-white p-5 ring-1 ring-[#0B1220]/10">
                  <div className="text-lg font-semibold text-[#0B1220]">Review Application</div>
                  <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-[#0B1220]/80 sm:grid-cols-2">
                    <div><span className="font-semibold">Full Name:</span> {form.fullName}</div>
                    <div><span className="font-semibold">Email:</span> {form.email}</div>
                    <div><span className="font-semibold">Phone:</span> {form.phone}</div>
                    <div><span className="font-semibold">Country:</span> {form.country}</div>
                    <div><span className="font-semibold">Are You?:</span> {form.persona}</div>
                    <div><span className="font-semibold">Academic Year:</span> {form.academicYear}</div>
                    <div><span className="font-semibold">Specialization:</span> {form.specialization || "-"}</div>
                    <div><span className="font-semibold">Preferred Category:</span> {form.preferredCategory}</div>
                    <div><span className="font-semibold">Start Timeline:</span> {form.startTimeline}</div>
                    <div><span className="font-semibold">Selected Program:</span> {form.selectedProgram}</div>
                  </div>
                </div>

                <div className="rounded-[22px] bg-white p-5 ring-1 ring-[#0B1220]/10">
                  <div className="text-sm font-semibold tracking-widest text-[#0B1220]/55">SELECTED PROGRAM DETAILS</div>
                  <div className="mt-3 text-lg font-semibold text-[#0B1220]">{selectedOffer.title}</div>
                  <div className="mt-3 space-y-2">
                    {(selectedOffer.points || []).slice(0, 6).map((point) => (
                      <div key={point} className="flex items-start gap-3 text-sm text-[#0B1220]/75">
                        <Check className="mt-0.5 h-4 w-4" style={{ color: THEME.accent3 }} {...iconStrongProps} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-5">
                <div className="rounded-[22px] bg-gradient-to-br from-[#0B1220] to-[#152238] p-7 text-center ring-1 ring-[#0B1220]/20">
                  <div className="text-4xl font-semibold leading-tight text-white sm:text-5xl">Complete Your Purchase</div>
                  <div className="mt-2 text-sm text-white/70">Secure checkout with VAT-inclusive pricing.</div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_1fr]">
                  <div className="rounded-[22px] bg-white p-7 ring-1 ring-[#0B1220]/10">
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-2xl font-semibold text-[#0B1220]">{selectedOffer.title}</div>
                      <div className="text-2xl font-semibold text-[#0B1220]">EUR{price.toFixed(2)}</div>
                    </div>

                    <div className="mt-6 space-y-2">
                      {(selectedOffer.points || []).slice(0, 8).map((point) => (
                        <div key={point} className="flex items-start gap-3 text-sm text-[#0B1220]/75">
                          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full" style={{ background: THEME.accent3 }}>
                            <Check className="h-3.5 w-3.5 text-white" {...iconStrongProps} />
                          </span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[22px] bg-white p-6 ring-1 ring-[#0B1220]/10">
                      <div className="text-2xl font-semibold text-[#0B1220]">Order Summary</div>
                      <div className="mt-4 space-y-2 text-base text-[#0B1220]/80">
                        <div className="flex items-center justify-between"><span>Ticket Price</span><span className="font-semibold text-[#0B1220]">EUR{price.toFixed(2)}</span></div>
                        <div className="flex items-center justify-between"><span>Price before VAT</span><span className="font-semibold text-[#0B1220]">EUR{price.toFixed(2)}</span></div>
                        <div className="flex items-center justify-between"><span>VAT (19%)</span><span className="font-semibold text-[#0B1220]">EUR{vat.toFixed(2)}</span></div>
                        <div className="border-t border-[#0B1220]/12 pt-3">
                          <div className="flex items-center justify-between text-xl font-semibold text-[#0B1220]"><span>Total Amount</span><span>EUR{total.toFixed(2)}</span></div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[22px] bg-white p-6 ring-1 ring-[#0B1220]/10">
                      <div className="text-lg font-semibold text-[#0B1220]">Payment Method</div>
                      <div className="mt-3 space-y-3">
                        {["Stripe", "PayPal"].map((m) => {
                          const active = paymentMethod === m;
                          return (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setPaymentMethod(m)}
                              className={cx(
                                "w-full rounded-2xl border px-4 py-4 text-left transition",
                                active ? "border-blue-500 bg-blue-50 shadow-[0_8px_24px_rgba(59,130,246,0.12)]" : "border-[#0B1220]/15 bg-white hover:bg-[#F8FAFC]"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <span className={cx("inline-flex h-5 w-5 rounded-full border", active ? "border-blue-500" : "border-[#0B1220]/30")}>
                                  {active ? <span className="m-auto h-2.5 w-2.5 rounded-full bg-blue-500" /> : null}
                                </span>
                                <div>
                                  <div className="text-base font-semibold text-[#0B1220]">{m === "Stripe" ? "Secure payment with Stripe" : "Pay with PayPal"}</div>
                                  <div className="text-xs text-[#0B1220]/60">Card checkout | 19% VAT included</div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={step === 0 ? onClose : back}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] ring-1 ring-[#0B1220]/12 transition hover:bg-[#E5E7EB]"
              >
                {step === 0 ? "Cancel" : "Back"}
              </button>
              {step < 2 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
                  style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)` }}
                >
                  {step === 1 ? "Continue to Pay" : "Continue"}
                  <ChevronRight className="h-4 w-4" {...iconStrongProps} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    alert(`Proceeding with ${paymentMethod} payment for EUR${total.toFixed(2)}.`);
                    onClose();
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-[#0B1220] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                >
                  Proceed to Secure Payment • EUR{total.toFixed(2)}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function uid() {
  return Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
}

function PartnershipForm() {
  const reduce = useReducedMotion();

  const steps = useMemo(
    () => [
      { key: "org", short: "Org Info", title: "Organization Information" },
      { key: "contact", short: "Contact", title: "Primary Contact Person" },
      { key: "interest", short: "Programs", title: "Program Interest" },
      { key: "objectives", short: "Objectives", title: "Strategic Objectives" },
      { key: "extra", short: "Confirm", title: "Additional Information & Agreement" },
    ],
    []
  );

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem("org_partnership_form_v1");
      return saved
        ? JSON.parse(saved)
        : {
            // section 1
            orgType: "University",
            orgName: "",
            website: "",
            countryCity: "",
            field: "",
            // section 2
            fullName: "",
            title: "",
            email: "",
            phone: "",
            preferredContact: "Email",
            // section 3
            collabTypes: [],
            formats: [],
            cohortSize: "10–25",
            audiences: [],
            duration: "3 Months",
            startTimeline: "Within 1 Month",
            // section 4
            objectives: [],
            goals: "",
            // section 5
            budget: "To be discussed",
            implementedBefore: "No",
            implementedDesc: "",
            // section 6 agreement
            authorized: false,
            agreeContact: false,
          };
    } catch {
      return {
        orgType: "University",
        orgName: "",
        website: "",
        countryCity: "",
        field: "",
        fullName: "",
        title: "",
        email: "",
        phone: "",
        preferredContact: "Email",
        collabTypes: [],
        formats: [],
        cohortSize: "10–25",
        audiences: [],
        duration: "3 Months",
        startTimeline: "Within 1 Month",
        objectives: [],
        goals: "",
        budget: "To be discussed",
        implementedBefore: "No",
        implementedDesc: "",
        authorized: false,
        agreeContact: false,
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("org_partnership_form_v1", JSON.stringify(form));
    } catch {
      // ignore
    }
  }, [form]);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const toggleInArray = (key, value) => {
    setForm((p) => {
      const arr = p[key] || [];
      const has = arr.includes(value);
      return { ...p, [key]: has ? arr.filter((x) => x !== value) : [...arr, value] };
    });
  };

  const validateStep = (s = step) => {
    const e = {};
    const req = (k, msg) => {
      if (!form[k] || (typeof form[k] === "string" && !form[k].trim())) e[k] = msg;
    };

    if (s === 0) {
      req("orgName", "Organization name is required.");
      req("countryCity", "Country / City is required.");
      req("field", "Industry / Academic field is required.");
    }
    if (s === 1) {
      req("fullName", "Full name is required.");
      req("title", "Position / title is required.");
      req("email", "Official email is required.");
      req("phone", "Phone number is required.");
    }
    if (s === 2) {
      if (!form.collabTypes.length) e.collabTypes = "Select at least one collaboration type.";
      if (!form.formats.length) e.formats = "Select at least one preferred format.";
      if (!form.audiences.length) e.audiences = "Select at least one target audience.";
    }
    if (s === 3) {
      if (!form.objectives.length) e.objectives = "Select at least one objective.";
      req("goals", "Goals/needs description is required.");
    }
    if (s === 4) {
      if (form.implementedBefore === "Yes" && !form.implementedDesc.trim()) e.implementedDesc = "Please describe briefly.";
      if (!form.authorized) e.authorized = "Authorization confirmation is required.";
      if (!form.agreeContact) e.agreeContact = "Consent to be contacted is required.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((p) => Math.min(p + 1, steps.length - 1));
  };

  const back = () => setStep((p) => Math.max(p - 1, 0));

  const jump = (idx) => {
    // allow jump backward freely; forward only if current step valid
    if (idx <= step) return setStep(idx);
    if (!validateStep(step)) return;
    setStep(idx);
  };

  const submit = async () => {
    if (!validateStep(4)) return;

    setSubmitting(true);

    // Simulate submission + capture metadata required for admin tracking
    const submission = {
      id: uid(),
      timestamp: new Date().toISOString(),
      orgType: form.orgType,
      countryCity: form.countryCity,
      cohortSize: form.cohortSize,
      programTypes: form.collabTypes,
      status: "New",
      payload: form,
    };

    // Hook this to your API
    // await fetch("/api/partnership", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(submission) });
    // For now:
    // eslint-disable-next-line no-console
    console.log("PARTNERSHIP_SUBMISSION", submission);

    await new Promise((r) => setTimeout(r, reduce ? 250 : 650));
    setSubmitting(false);
    setSubmitted(true);

    // keep draft (save & continue later) but you can clear if you want:
    // localStorage.removeItem("org_partnership_form_v1");

    setTimeout(() => setSubmitted(false), 2600);
  };

  const paneV = {
    initial: { opacity: 0, y: 10, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -8, scale: 0.99 },
  };

  return (
    <div className="relative rounded-[44px] p-[1px]" style={{ background: "rgba(255,255,255,0.12)", boxShadow: "0 26px 90px rgba(0,0,0,0.35)" }}>
      <div className="relative overflow-hidden rounded-[40px] bg-[#0B1220]/55 p-6 ring-1 ring-white/10 backdrop-blur sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/75 ring-1 ring-white/10">
              <Handshake className="h-4 w-4" style={{ color: THEME.accent3 }} {...iconStrongProps} />
              <span>PARTNERSHIP INQUIRY</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">Start an Institutional Partnership</h3>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Tell us about your organization and objectives. We’ll review and schedule a strategic discussion to align on the best collaboration model.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.setItem("org_partnership_form_v1", JSON.stringify(form));
                } catch {}
              }}
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 ring-1 ring-white/10 transition hover:bg-white/10"
            >
              Save draft <Download className="h-4 w-4" {...iconStrongProps} />
            </button>

            <AnimatePresence>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  className="rounded-full px-4 py-2 text-xs font-semibold ring-1"
                  style={{ background: "rgba(52,211,153,0.18)", borderColor: "rgba(52,211,153,0.30)", color: "rgba(255,255,255,0.92)" }}
                >
                  Submitted ✓
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* Step indicator */}
        <div className="mt-6">
          <StepPills step={step} steps={steps} onJump={jump} />
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
            <motion.div
              className="h-full"
              style={{ background: `linear-gradient(90deg, ${THEME.pink}, ${accent(0.7)})` }}
              initial={false}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="mt-6 rounded-[32px] bg-white/5 p-5 ring-1 ring-white/10">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-semibold tracking-widest text-white/60">STEP {step + 1} / {steps.length}</div>
            <div className="text-sm font-semibold text-white">{steps[step].title}</div>
          </div>

          <div className="mt-4">
            <AnimatePresence mode="wait">
              <motion.div key={steps[step].key} {...paneV} transition={{ duration: 0.35, ease: "easeOut" }}>
                {/* STEP 1 */}
                {step === 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Organization Type" required dark>
                      <Select
                        dark
                        icon={Building2}
                        iconColor={THEME.accent}
                        value={form.orgType}
                        onChange={(v) => set("orgType", v)}
                        options={ORG_TYPES}
                      />
                    </Field>

                    <Field label="Organization Name" required dark>
                      <Input dark icon={BadgeCheck} iconColor={THEME.accent2} value={form.orgName} onChange={(e) => set("orgName", e.target.value)} placeholder="Organization name" />
                      {errors.orgName ? <p className="mt-2 text-xs text-rose-200">{errors.orgName}</p> : null}
                    </Field>

                    <Field label="Website URL" hint="Optional" dark>
                      <Input dark icon={Globe2} iconColor={THEME.accent} value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="https://..." />
                    </Field>

                    <Field label="Country / City" required dark>
                      <Input dark icon={MapPin} iconColor={THEME.accent4} value={form.countryCity} onChange={(e) => set("countryCity", e.target.value)} placeholder="Country, City" />
                      {errors.countryCity ? <p className="mt-2 text-xs text-rose-200">{errors.countryCity}</p> : null}
                    </Field>

                    <div className="sm:col-span-2">
                      <Field label="Industry / Academic Field" required hint="e.g., Technology, Business, Healthcare" dark>
                        <Input dark icon={Target} iconColor={THEME.accent3} value={form.field} onChange={(e) => set("field", e.target.value)} placeholder="Field" />
                        {errors.field ? <p className="mt-2 text-xs text-rose-200">{errors.field}</p> : null}
                      </Field>
                    </div>
                  </div>
                ) : null}

                {/* STEP 2 */}
                {step === 1 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Full Name" required dark>
                      <Input dark icon={Users} iconColor={THEME.accent2} value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Full name" />
                      {errors.fullName ? <p className="mt-2 text-xs text-rose-200">{errors.fullName}</p> : null}
                    </Field>

                    <Field label="Position / Title" required hint="e.g., Dean, HR Director, CEO" dark>
                      <Input dark icon={Briefcase} iconColor={THEME.accent3} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Title" />
                      {errors.title ? <p className="mt-2 text-xs text-rose-200">{errors.title}</p> : null}
                    </Field>

                    <Field label="Official Email Address" required dark>
                      <Input dark icon={Mail} iconColor={THEME.accent} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="name@org.com" />
                      {errors.email ? <p className="mt-2 text-xs text-rose-200">{errors.email}</p> : null}
                    </Field>

                    <Field label="Phone Number (with country code)" required dark>
                      <Input dark icon={Phone} iconColor={THEME.accent4} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+962 ..." />
                      {errors.phone ? <p className="mt-2 text-xs text-rose-200">{errors.phone}</p> : null}
                    </Field>

                    <div className="sm:col-span-2">
                      <Field label="Preferred Contact Method" required dark>
                        <Select
                          dark
                          icon={MessageCircle}
                          iconColor={THEME.accent3}
                          value={form.preferredContact}
                          onChange={(v) => set("preferredContact", v)}
                          options={CONTACT_METHODS}
                        />
                      </Field>
                    </div>
                  </div>
                ) : null}

                {/* STEP 3 */}
                {step === 2 ? (
                  <div className="space-y-5">
                    <div>
                      <div className="text-sm font-semibold text-white">What type of collaboration are you interested in?</div>
                      <div className="mt-2 text-xs text-white/60">Choose one or more.</div>

                      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {COLLAB_TYPES.map((g) => (
                          <div key={g.group} className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                            <div className="text-xs font-semibold tracking-widest text-white/60">{g.group.toUpperCase()}</div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {g.items.map((it) => (
                                <ToggleChip
                                  key={it}
                                  label={it}
                                  active={form.collabTypes.includes(it)}
                                  onClick={() => toggleInArray("collabTypes", it)}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {errors.collabTypes ? <p className="mt-3 text-xs text-rose-200">{errors.collabTypes}</p> : null}
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                      <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                        <div className="text-sm font-semibold text-white">Preferred Program Format</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {FORMATS.map((f) => (
                            <ToggleChip key={f} label={f} active={form.formats.includes(f)} onClick={() => toggleInArray("formats", f)} />
                          ))}
                        </div>
                        {errors.formats ? <p className="mt-3 text-xs text-rose-200">{errors.formats}</p> : null}
                      </div>

                      <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                        <div className="text-sm font-semibold text-white">Expected Number of Participants</div>
                        <div className="mt-3">
                          <Select dark value={form.cohortSize} onChange={(v) => set("cohortSize", v)} options={COHORT_SIZES} icon={Users} iconColor={THEME.accent2} />
                        </div>
                      </div>

                      <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                        <div className="text-sm font-semibold text-white">Target Audience</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {AUDIENCES.map((a) => (
                            <ToggleChip key={a} label={a} active={form.audiences.includes(a)} onClick={() => toggleInArray("audiences", a)} />
                          ))}
                        </div>
                        {errors.audiences ? <p className="mt-3 text-xs text-rose-200">{errors.audiences}</p> : null}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                        <div className="text-sm font-semibold text-white">Preferred Program Duration</div>
                        <div className="mt-3">
                          <Select dark value={form.duration} onChange={(v) => set("duration", v)} options={DURATIONS} icon={Calendar} iconColor={THEME.accent4} />
                        </div>
                      </div>

                      <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                        <div className="text-sm font-semibold text-white">Desired Start Timeline</div>
                        <div className="mt-3">
                          <Select dark value={form.startTimeline} onChange={(v) => set("startTimeline", v)} options={START_TIMELINE} icon={Compass} iconColor={THEME.accent3} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* STEP 4 */}
                {step === 3 ? (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                      <div className="text-sm font-semibold text-white">What are your main objectives?</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {OBJECTIVES.map((o) => (
                          <ToggleChip key={o} label={o} active={form.objectives.includes(o)} onClick={() => toggleInArray("objectives", o)} />
                        ))}
                      </div>
                      {errors.objectives ? <p className="mt-3 text-xs text-rose-200">{errors.objectives}</p> : null}
                    </div>

                    <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                      <Field
                        dark
                        label="Describe your goals or specific needs"
                        required
                        hint="The more context you provide, the better the proposal."
                      >
                        <Textarea
                          dark
                          value={form.goals}
                          onChange={(e) => set("goals", e.target.value)}
                          placeholder="Tell us about your challenges, expectations, and desired outcomes..."
                        />
                        {errors.goals ? <p className="mt-2 text-xs text-rose-200">{errors.goals}</p> : null}
                      </Field>
                    </div>
                  </div>
                ) : null}

                {/* STEP 5 */}
                {step === 4 ? (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                        <div className="text-sm font-semibold text-white">Budget Range (Optional)</div>
                        <div className="mt-3">
                          <Select
                            dark
                            value={form.budget}
                            onChange={(v) => set("budget", v)}
                            options={["To be discussed", "Defined internally", "Open to proposal", "Prefer cost breakdown first"]}
                            icon={LineChart}
                            iconColor={THEME.accent}
                          />
                        </div>
                      </div>

                      <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                        <div className="text-sm font-semibold text-white">Previously implemented similar programs?</div>
                        <div className="mt-3 flex items-center gap-2">
                          {["Yes", "No", "Partially"].map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => set("implementedBefore", v)}
                              className={cx(
                                "rounded-full px-4 py-2 text-xs font-semibold ring-1 transition",
                                form.implementedBefore === v ? "text-white ring-white/15" : "text-white/70 ring-white/10 hover:bg-white/5"
                              )}
                              style={form.implementedBefore === v ? { background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 75%)` } : undefined}
                            >
                              {v}
                            </button>
                          ))}
                        </div>

                        {form.implementedBefore === "Yes" ? (
                          <div className="mt-4">
                            <Field dark label="If Yes → please describe briefly" required>
                              <Input
                                dark
                                icon={ClipboardCheck}
                                iconColor={THEME.accent3}
                                value={form.implementedDesc}
                                onChange={(e) => set("implementedDesc", e.target.value)}
                                placeholder="Short description"
                              />
                              {errors.implementedDesc ? <p className="mt-2 text-xs text-rose-200">{errors.implementedDesc}</p> : null}
                            </Field>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                      <div className="text-sm font-semibold text-white">Agreement</div>

                      <div className="mt-3 space-y-3">
                        <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                          <input
                            type="checkbox"
                            checked={form.authorized}
                            onChange={(e) => set("authorized", e.target.checked)}
                            className="mt-1 h-4 w-4"
                          />
                          <div>
                            <div className="text-sm font-semibold text-white">I confirm that I am authorized to represent this organization.</div>
                            {errors.authorized ? <div className="mt-1 text-xs text-rose-200">{errors.authorized}</div> : null}
                          </div>
                        </label>

                        <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                          <input
                            type="checkbox"
                            checked={form.agreeContact}
                            onChange={(e) => set("agreeContact", e.target.checked)}
                            className="mt-1 h-4 w-4"
                          />
                          <div>
                            <div className="text-sm font-semibold text-white">I agree to be contacted regarding this inquiry.</div>
                            {errors.agreeContact ? <div className="mt-1 text-xs text-rose-200">{errors.agreeContact}</div> : null}
                          </div>
                        </label>
                      </div>
                    </div>

                    <motion.button
                      type="button"
                      onClick={submit}
                      disabled={submitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="relative w-full overflow-hidden rounded-full px-5 py-3 text-sm font-semibold text-white shadow-sm transition disabled:opacity-70"
                      style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)` }}
                    >
                      <span className="relative z-10 inline-flex items-center justify-center gap-2">
                        {submitting ? "Submitting..." : "Request Institutional Consultation"}
                        <Send className="h-4 w-4" {...iconStrongProps} />
                      </span>
                      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 hover:opacity-100">
                        <span className="shine" />
                      </span>
                    </motion.button>

                    <div className="text-center text-xs text-white/60">
                      After submission: success message + confirmation email (hook up your backend). If urgent, contact: <span className="font-semibold text-white/80">official@yourdomain.com</span>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 ring-1 ring-white/10 transition hover:bg-white/10 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" {...iconStrongProps} />
              Back
            </button>

            <div className="text-center text-xs text-white/55">
              Progress is auto-saved locally (draft). You can also jump steps using the pills above.
            </div>

            <button
              type="button"
              onClick={step === steps.length - 1 ? submit : next}
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:brightness-[1.03] disabled:opacity-70"
              style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.70)} 90%)` }}
            >
              {step === steps.length - 1 ? "Submit" : "Next"}
              <ChevronRight className="h-4 w-4" {...iconStrongProps} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** ---------- Main Page ---------- */
export default function OrganizationsLanding() {
  const heroRef = useInViewOnce(0.2);
  const uniRef = useInViewOnce(0.2);
  const compRef = useInViewOnce(0.2);
  const expertsRef = useInViewOnce(0.2);
  const deliveryRef = useInViewOnce(0.2);
  const whyRef = useInViewOnce(0.2);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(DEFAULT_APPLY_OFFER);

  const openApply = (offer) => {
    setSelectedOffer({ ...DEFAULT_APPLY_OFFER, ...offer });
    setIsApplyOpen(true);
  };


  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: THEME.deep,
        color: "white",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      }}
    >
      {/* Global background */}
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

      {/* HERO */}
      <section id="overview" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div ref={heroRef.ref} className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-14 pt-8 lg:grid-cols-2 lg:pb-20 lg:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroRef.inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="mt-2 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              Building Workforce-Ready Talent{" "}
              <span style={{ color: THEME.pink }} className="whitespace-nowrap">
                at Scale.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-balance text-base text-white/70 sm:text-lg">
              We partner with universities and organizations to deliver industry-integrated training, internships, and AI-powered upskilling programs.
            </p>

            <p className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-white/65">
              From academic institutions to corporate enterprises, we design structured programs that close the gap between knowledge and execution — led by European industry experts and university professors.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GradientButton onClick={() => openApply(DEFAULT_APPLY_OFFER)}>Partner With Us</GradientButton>
              <GradientButton href="#universities" variant="secondary" icon={ArrowRight}>
                Explore Institutional Programs
              </GradientButton>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill label="Institutional-grade" />
              <Pill label="Structured milestones" />
              <Pill label="Measurable outcomes" />
              <Pill label="Flexible formats" />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <BadgeCheck className="h-4 w-4" style={{ color: THEME.accent3 }} {...iconStrongProps} />
                <span className="text-sm text-white/75">European delivery standards</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <FileCheck2 className="h-4 w-4" style={{ color: THEME.accent4 }} {...iconStrongProps} />
                <span className="text-sm text-white/75">Defined deliverables & evaluation</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={heroRef.inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
            className="relative"
          >
            <NodeGraph />
          </motion.div>
        </div>
      </section>

      {/* FOR UNIVERSITIES */}
      <section id="universities" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div ref={uniRef.ref} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Academic Excellence Meets"
            accentText="Industry Execution"
            subtitle="We collaborate with universities to embed real industry experience into academic pathways, ensuring graduates are prepared for the global job market."
          />

          {/* Split comparison (executive, clean) */}
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SplitToneCard
              tone="pink"
              title="Academic Integration"
              icon={<GraduationCap className="h-5 w-5" {...iconStrongProps} />}
              bullets={["Industry-aligned curricula", "Applied projects alongside modules", "Co-branding & reputation lift"]}
            />
            <SplitToneCard
              tone="blue"
              title="Industry Execution"
              icon={<Briefcase className="h-5 w-5" {...iconStrongProps} />}
              bullets={["Real delivery constraints", "Ownership + iteration", "Clear evaluation + reporting signals"]}
            />
          </div>

          {/* Programs */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {universityPrograms.map((g, i) => {
              const Icon = g.icon;
              return (
                <motion.div
                  key={g.group}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: Math.min(i * 0.05, 0.15) }}
                  className="rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur"
                >
                  <div className="flex items-center gap-3">
                    <IconBadge color={g.color}>
                      <Icon className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                    <div>
                      <div className="mt-1 text-lg font-semibold text-[#0B1220]">{g.group}</div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    {g.items.map((it) => (
                      <div key={it} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ background: g.color }} />
                        <div className="text-sm text-[#0B1220]/75">{it}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-3xl bg-white/55 p-4 ring-1 ring-[#0B1220]/10">
                    <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">FORMAT</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["Online", "Hybrid", "On-campus / Offline"].map((p) => (
                        <span
                          key={p}
                          className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
                          style={{ background: "rgba(11,18,32,0.06)", borderColor: "rgba(11,18,32,0.10)", color: "rgba(11,18,32,0.72)" }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-[#0B1220]/70">
                      <span className="font-semibold">Duration:</span> 3–6 months · <span className="font-semibold">Start cycles:</span> 4 times / year
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openApply({
                        title: g.group,
                        type: "University Program",
                        points: g.items,
                        price: 1499,
                      })
                    }
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                    style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)` }}
                  >
                    Apply
                    <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Co-hosting + Industrial courses */}
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur">
              <div className="flex items-center gap-3">
                <IconBadge color={THEME.accent2}>
                  <Building2 className="h-5 w-5" {...iconStrongProps} />
                </IconBadge>
                <div>
                  <div className="mt-1 text-lg font-semibold text-[#0B1220]">Institutional Co-Hosting Partnership</div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#0B1220]/70">
                Universities may act as co-hosting institutions, providing facilities, academic integration, alignment with graduation projects, and joint program branding.
              </p>

              <div className="mt-5 space-y-2">
                {["Campus facilities", "Academic integration", "Alignment with graduation projects", "Joint program branding"].map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0B1220]/5 ring-1 ring-[#0B1220]/10">
                      <Check className="h-4 w-4" style={{ color: THEME.accent3 }} {...iconStrongProps} />
                    </span>
                    <div className="text-sm text-[#0B1220]/75">{b}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-[#0B1220] px-5 py-4 text-white">
                <div className="text-xs font-semibold tracking-widest text-white/70">IMPACT</div>
                <div className="mt-1 text-sm font-semibold">Strengthens institutional reputation + improves employability metrics.</div>
              </div>

              <button
                type="button"
                onClick={() =>
                  openApply({
                    title: "Institutional Co-Hosting Partnership",
                    type: "University Partnership",
                    points: ["Campus facilities", "Academic integration", "Alignment with graduation projects", "Joint program branding"],
                    price: 1499,
                  })
                }
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)` }}
              >
                Apply
                <ArrowRight className="h-4 w-4" {...iconStrongProps} />
              </button>
            </div>

            <div className="rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur">
              <div className="flex items-center gap-3">
                <IconBadge color={THEME.accent4}>
                  <PenTool className="h-5 w-5" {...iconStrongProps} />
                </IconBadge>
                <div>
                  <div className="mt-1 text-lg font-semibold text-[#0B1220]">From Theory to Application</div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#0B1220]/70">
                Industrial courses run alongside existing subjects. Each course mirrors a module, includes a real-world applied project, is delivered by an industry expert, and produces a final technical or business output.
              </p>

              <div className="mt-5 rounded-3xl bg-white/55 p-5 ring-1 ring-[#0B1220]/10">
                <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">EXAMPLES</div>
                <div className="mt-3 space-y-2">
                  {["AI-Enhanced Data Analytics Projects", "Software Engineering Practical Systems", "Business Strategy Simulations", "Digital Product Development"].map((x) => (
                    <div key={x} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ background: THEME.accent4 }} />
                      <div className="text-sm text-[#0B1220]/75">{x}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm text-[#0B1220]/70">
                  <span className="font-semibold">Duration:</span> aligned with the academic term.
                </div>
                <div className="mt-2 text-sm font-semibold text-[#0B1220]">Students do not only learn — they build.</div>
              </div>
              <button
                type="button"
                onClick={() =>
                  openApply({
                    title: "Industrial Courses",
                    type: "University Program",
                    points: [
                      "AI-Enhanced Data Analytics Projects",
                      "Software Engineering Practical Systems",
                      "Business Strategy Simulations",
                      "Digital Product Development",
                    ],
                    price: 1499,
                  })
                }
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)` }}
              >
                Apply
                <ArrowRight className="h-4 w-4" {...iconStrongProps} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOR COMPANIES */}
      <section id="companies" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div ref={compRef.ref} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Upskilling Organizations"
            accentText="for the AI-Driven Economy"
            subtitle="We support organizations in building future-ready teams through expert-led, structured development programs."
            dark
          />

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {companyPrograms.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: Math.min(i * 0.06, 0.18) }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="rounded-[36px] bg-white/5 p-7 ring-1 ring-white/10 backdrop-blur"
                  style={{ boxShadow: "0 18px 70px rgba(0,0,0,0.35)" }}
                >
                  <div className="flex items-center gap-3">
                    <IconBadge color={p.color}>
                      <Icon className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                    <div className="text-lg font-semibold text-white">{p.title}</div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {p.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ background: p.color }} />
                        <div className="text-sm text-white/70">{b}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openApply({
                        title: p.title,
                        type: "Company Program",
                        points: p.bullets,
                        price: 1499,
                      })
                    }
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                    style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)` }}
                  >
                    Apply
                    <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8">
            <GlassCard>
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mt-2 text-2xl font-semibold text-white">Tailored to your organization’s goals — not generic training.</div>
                  <p className="mt-2 max-w-2xl text-sm text-white/70">
                    We translate strategic objectives into executable programs, with reporting and evaluation your leadership team can track.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <GradientButton onClick={() => openApply(DEFAULT_APPLY_OFFER)}>Request Partnership Discussion</GradientButton>
                  <GradientButton href="#delivery" variant="secondary">
                    See Delivery Model
                  </GradientButton>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* EXPERT NETWORK */}
      <section id="experts" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div ref={expertsRef.ref} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Delivered by Practitioners,"
            accentText="Not Just Trainers"
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-4">
            {expertCards.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: Math.min(i * 0.06, 0.18) }}
                  whileHover={{ y: -6, rotate: 0.2 }}
                  className="group relative overflow-hidden rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="shine" />
                  </div>

                  <div className="flex items-center gap-3">
                    <IconBadge color={c.color}>
                      <Icon className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                    <div>
                      <div className="mt-1 text-lg font-semibold text-[#0B1220]}">{c.name}</div>
                      <div className="mt-1 text-sm text-[#0B1220]/70">{c.role}</div>
                    </div>
                  </div>

                  <div className="mt-6 h-32 overflow-hidden rounded-3xl ring-1 ring-[#0B1220]/10">
                    {/* Portrait grid placeholder */}
                    <div
                      className="h-full w-full"
                      style={{
                        background:
                          "radial-gradient(120px circle at 25% 35%, rgba(34,211,238,0.18), transparent 60%), radial-gradient(120px circle at 70% 35%, rgba(167,139,250,0.16), transparent 60%), radial-gradient(120px circle at 45% 75%, rgba(52,211,153,0.14), transparent 60%), rgba(11,18,32,0.04)",
                      }}
                    />
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">QUALITY</div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="h-4 w-4"
                          style={{
                            color: THEME.star,
                            fill: idx < 4 ? THEME.star : "transparent",
                            opacity: idx < 4 ? 1 : 0.35,
                          }}
                          strokeWidth={2.2}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DELIVERY MODEL */}
      <section id="delivery" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div ref={deliveryRef.ref} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Flexible Delivery."
            accentText="Structured Execution."
            dark
          />

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {deliveryItems.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: Math.min(i * 0.06, 0.18) }}
                  className="rounded-[36px] bg-white/5 p-7 ring-1 ring-white/10 backdrop-blur"
                  style={{ boxShadow: "0 18px 70px rgba(0,0,0,0.35)" }}
                >
                  <div className="flex items-center gap-3">
                    <IconBadge color={b.color}>
                      <Icon className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                    <div>
                      <div className="mt-1 text-lg font-semibold text-white">{b.label}</div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    {b.lines.map((x) => (
                      <div key={x} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ background: b.color }} />
                        <div className="text-sm text-white/70">{x}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <MiniFeature icon={ClipboardCheck} title="Clear milestones" desc="A clean weekly rhythm that leadership teams can track." color={THEME.accent3} />
            <MiniFeature icon={FileCheck2} title="Defined deliverables" desc="Proof-of-work outputs aligned to real roles." color={THEME.accent4} />
            <MiniFeature icon={LineChart} title="Structured reporting" desc="Evaluation and reporting for measurable outcomes." color={THEME.accent} />
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section id="why" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div ref={whyRef.ref} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="A Strategic Talent"
            accentText="Development Partner."
            subtitle="Institutional programs engineered for quality, scalability, and measurable impact."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyPartner.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div
                  key={w.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: Math.min(i * 0.04, 0.16) }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur"
                >
                  <div className="flex items-center gap-3">
                    <IconBadge color={w.color}>
                      <Icon className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                    <div>
                      <div className="mt-1 text-lg font-semibold text-[#0B1220]" style={clampStyle(2)}>
                        {w.title}
                      </div>
                    </div>
                  </div>

                 
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Ready to Elevate"
            accentText="Your Institutional Impact?"
            subtitle="Partner with us to build graduates and teams prepared for the demands of modern industry."
            dark
          />

          <div className="mt-10">
            <div
              className="relative overflow-hidden rounded-[36px] border border-white/10 px-6 py-8 text-center sm:px-10 sm:py-10"
              style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 100%)`, boxShadow: "0 24px 90px rgba(0,0,0,0.20)" }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.16]"
                style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)" }}
              />
              <div className="relative mx-auto max-w-6xl text-white">
                <div className="text-xs font-semibold text-white/80 sm:text-sm">Executive tone · clean structure · measurable outcomes</div>
                <div className="mt-3 text-3xl font-semibold md:text-4xl">Institutional partnerships that scale delivery — without losing quality.</div>
                <p className="mx-auto mt-4 max-w-4xl text-sm font-medium text-white/85">
                  Request a partnership discussion or download the institutional brief.
                </p>

                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => openApply(DEFAULT_APPLY_OFFER)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] transition hover:opacity-95"
                  >
                    Request Partnership Discussion <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </button>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Hook this to your PDF download route (e.g., /institutional-brief.pdf).");
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15"
                  >
                    Download Institutional Brief <Download className="h-4 w-4" {...iconStrongProps} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky button */}
      <button
        type="button"
        onClick={() => openApply(DEFAULT_APPLY_OFFER)}
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:inline-flex"
        style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)` }}
      >
        <Handshake className="h-4 w-4" {...iconStrongProps} />
        Partner With Us
      </button>

      <ApplyFlowModal open={isApplyOpen} offer={selectedOffer} onClose={() => setIsApplyOpen(false)} />

      <style>{css}</style>
    </div>
  );
}

/** ---------- CSS (extra animations) ---------- */
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
    animation: streak 7.2s ease-in-out infinite;
    opacity: 0.38;
  }
  @keyframes streak{
    0%{ transform: translateX(-35%) rotate(-10deg); }
    50%{ transform: translateX(25%) rotate(-10deg); }
    100%{ transform: translateX(-35%) rotate(-10deg); }
  }

  /* Card shine */
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
    animation: shineMove 5.2s ease-in-out infinite;
    opacity: 0.35;
  }
  @keyframes shineMove{
    0%{ transform: translateX(-30%) rotate(-10deg); }
    50%{ transform: translateX(25%) rotate(-10deg); }
    100%{ transform: translateX(-30%) rotate(-10deg); }
  }
`;
