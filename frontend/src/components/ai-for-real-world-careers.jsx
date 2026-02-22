import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  Globe2,
  GraduationCap,
  LineChart,
  Sparkles,
  Target,
  Zap,
  Laptop,
  PenTool,
  Handshake,
  ListChecks,
  Rocket,
  Wallet,
  HeartPulse,
  CheckCircle2,
  Check,
  Users,
  Layers,
  Lightbulb,
  Workflow,
  X,
} from "lucide-react";

const Motion = motion;

/* =========================
   THEME
========================= */
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

/* =========================
   IMAGES (swap with your own assets anytime)
   (Unsplash hotlinks are fine for mock)
========================= */
const IMG = {
  hero: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
  tech: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1600&q=80",
  product: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1600&q=80",
  biz: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1600&q=80",
  industry: "https://images.unsplash.com/photo-1581091215367-59ab6b6f3d2b?auto=format&fit=crop&w=1600&q=80",
  foundations: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
  outcomes: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  diff1: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
  diff2: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
  diff3: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80",
};

/* =========================
   MOTION HELPERS
========================= */
const EASE_OUT = [0.16, 1, 0.3, 1];

const vFadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const _vFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

const _vStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
};

function Reveal({
  children,
  delay = 0,
  amount = 0.25,
  y = 14,
  duration = 0.5,
  className,
  once = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: EASE_OUT, delay }}
      className={className}
    >
      {children}
    </motion.div>
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

/* =========================
   OBSERVER
========================= */
function useInViewOnce(threshold = 0.2, rootMargin = "0px 0px -10% 0px") {
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
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}
const _useInViewOnce = useInViewOnce;

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

/* =========================
   ANIMATED NUMBER
========================= */
function AnimatedNumber({ value, suffix, durationMs = 900 }) {
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

  const display = reduce ? value : n;

  return (
    <span>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/* =========================
   VISUAL ATOMS
========================= */
const POWER_ICON_SHELL = {
  background: "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
  border: "1px solid rgba(255,255,255,0.22)",
  boxShadow: "0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.20)",
};

function IconBadge({ color, children }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl ring-1" style={POWER_ICON_SHELL}>
      <span style={{ color }}>{children}</span>
    </span>
  );
}

function SectionTitle({ eyebrow, title, accentWord, subtitle, dark }) {
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
          eyebrow ? "mt-5" : "mt-0",
          "text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-[#0B1220]"
        )}
      >
        {title}{" "}
        {accentWord ? (
          <span style={{ color: THEME.pink }}>
            {accentWord}
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

function GradientButton({ children, href, onClick, variant = "primary", iconRight = true }) {
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
      {iconRight ? <ArrowRight className="h-4 w-4" {...iconStrongProps} /> : null}
    </Comp>
  );
}

/* =========================
   LIVING BACKGROUND
========================= */
function AmbientOrbs() {
  const reduce = useReducedMotion();
  const ORBS = useMemo(
    () => [
      { top: "8%", left: "6%", size: 420, color: `rgba(34,211,238,0.16)`, dx: 60, dy: 40, dur: 12 },
      { top: "18%", left: "70%", size: 520, color: `rgba(167,139,250,0.14)`, dx: -80, dy: 55, dur: 15 },
      { top: "70%", left: "20%", size: 520, color: `rgba(201,29,103,0.16)`, dx: 70, dy: -55, dur: 16 },
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {ORBS.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: o.size,
            height: o.size,
            top: o.top,
            left: o.left,
            background: o.color,
            opacity: 0.9,
          }}
          animate={
            reduce
              ? {}
              : {
                  x: [0, o.dx, 0],
                  y: [0, o.dy, 0],
                  scale: [1, 1.06, 1],
                }
          }
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* =========================
   DATA (UNCHANGED)
========================= */
const TRACKS = [
  {
    key: "tech",
    label: "AI for Technology & Developers",
    desc: "For engineers and technical professionals integrating AI into systems, products, and software infrastructure.",
    accent: THEME.accent,
    accentSoft: "rgba(34,211,238,0.16)",
    icon: Zap,
    image: IMG.tech,
    programs: [
      {
        title: "AI for Developers: Productivity & Automation",
        description:
          "Learn how to achieve 50% productivity improvement using AI coding assistants, prompt engineering, and workflow automation.",
      },
      {
        title: "AI Development Tools & Prompt Engineering",
        description:
          "Master AI coding tools, advanced prompting techniques, and structured model interaction.",
      },
      {
        title: "Building & Deploying AI Agents",
        description:
          "Design, build, and deploy AI agents for real-world automation tasks.",
      },
      {
        title: "RAG & Agentic AI Systems",
        description:
          "Implement retrieval-augmented generation and agent-based architectures.",
      },
      {
        title: "Build Real-Time AI Applications",
        description:
          "Develop scalable real-time AI-powered applications.",
      },
      {
        title: "AI-Enhanced Observability",
        description:
          "Integrate AI into monitoring, system optimization, and debugging workflows.",
      },
      {
        title: "Redefining Data Engineering in the Age of AI",
        description:
          "Modern AI-ready data pipelines and architecture.",
      },
    ],
  },
  {
    key: "product",
    label: "AI for Product, UX & Design",
    desc: "For product managers, designers, and UX professionals integrating AI into digital experiences.",
    accent: THEME.accent2,
    accentSoft: "rgba(167,139,250,0.16)",
    icon: PenTool,
    image: IMG.product,
    programs: [
      {
        title: "AI for Product Management",
        description:
          "Use AI to optimize roadmaps, user research, feature prioritization, and product analytics.",
      },
      {
        title: "AI for UX Research",
        description:
          "Enhance user testing, behavior analysis, and feedback synthesis using AI.",
      },
      {
        title: "Digital Product Design & AI",
        description:
          "Design AI-powered products and intelligent user experiences.",
      },
      {
        title: "Design Thinking & Innovation with AI",
        description:
          "Combine structured innovation frameworks with AI-driven ideation.",
      },
      {
        title: "Agile Delivery Meets AI",
        description:
          "Apply AI within sprint planning, backlog management, and delivery optimization.",
      },
    ],
  },
  {
    key: "biz",
    label: "AI for Business & Strategy",
    desc: "For leaders, managers, consultants, and decision-makers applying AI to strategic advantage.",
    accent: THEME.accent3,
    accentSoft: "rgba(52,211,153,0.16)",
    icon: Target,
    image: IMG.biz,
    programs: [
      {
        title: "Artificial Intelligence for Business Strategy",
        description:
          "Understand AI implications, value creation models, and competitive positioning.",
      },
      {
        title: "AI Adoption: Driving Business Value",
        description:
          "Frameworks to implement AI responsibly and effectively.",
      },
      {
        title: "Leading the AI-Driven Organization",
        description:
          "Organizational transformation, governance, and AI readiness.",
      },
      {
        title: "Strategic Decision-Making Through AI",
        description:
          "How AI sharpens testing, forecasting, and scenario planning.",
      },
      {
        title: "Machine Learning in Business",
        description:
          "Practical ML applications without technical overload.",
      },
      {
        title: "Generative AI Business Sprint",
        description:
          "Rapid implementation strategies for business use cases.",
      },
      {
        title: "Become the AI Leader in Your Organization",
        description:
          "AI transformation leadership for senior professionals.",
      },
    ],
  },
  {
    key: "industry",
    label: "AI for Industry & Sector Applications",
    desc: "Specialized AI applications for specific sectors.",
    accent: THEME.accent4,
    accentSoft: "rgba(245,158,11,0.16)",
    icon: Building2,
    image: IMG.industry,
    programs: [
      {
        title: "AI for Financial Services",
        description:
          "AI tools, opportunities, and risk in banking and finance.",
      },
      {
        title: "AI in Pharma & Biotech",
        description:
          "Applications in research, drug development, and data modeling.",
      },
      {
        title: "AI for Healthcare",
        description:
          "Clinical systems, predictive health analytics, and digital transformation.",
      },
      {
        title: "AI for HR",
        description:
          "Talent analytics, workforce planning, and AI-assisted HR operations.",
      },
      {
        title: "AI for Internal Audit",
        description:
          "How AI reshapes risk assessment, audit automation, and compliance.",
      },
      {
        title: "AI in Customer Onboarding & Data Migration",
        description:
          "Automating operational transformation processes.",
      },
      {
        title: "AI for Researchers",
        description:
          "AI tools for academic and applied research workflows.",
      },
      {
        title: "AI for Family Businesses",
        description:
          "Strategic AI adoption for legacy organizations.",
      },
    ],
  },
  {
    key: "foundations",
    label: "AI Foundations & Non-Tech Professionals",
    desc: "For professionals who want structured AI understanding without a technical background.",
    accent: THEME.accent,
    accentSoft: "rgba(34,211,238,0.16)",
    icon: Layers,
    image: IMG.foundations,
    programs: [
      {
        title: "AI Essentials: Accelerating Impactful Adoption",
        description:
          "Fundamentals for responsible and practical AI integration.",
      },
      {
        title: "AI Beyond Tech Roles",
        description:
          "How non-technical professionals use AI effectively.",
      },
      {
        title: "Navigating AI: Business Impact & Human Capability",
        description:
          "Balancing automation and human skills.",
      },
      {
        title: "No-Code AI & Machine Learning",
        description:
          "Build ML-powered solutions without programming.",
      },
    ],
  },
];

const OVERVIEW_FACTS = [
  { icon: Globe2, title: "Online", color: THEME.accent },
  { icon: Calendar, title: "3–7 Weeks", color: THEME.accent4 },
  { icon: Users, title: "Cohort-Based", color: THEME.accent2 },
  { icon: ClipboardCheck, title: "Practical Assignments", color: THEME.accent3 },
  { icon: Briefcase, title: "Industry Use Cases", color: THEME.accent },
  { icon: Compass, title: "Intakes Every 4–8 Weeks", color: THEME.accent2 },
];

const WHY_EXISTS_CARDS = [
  {
    text: "AI is no longer optional.",
    icon: Lightbulb,
    color: THEME.accent,
    bg: "linear-gradient(135deg, rgba(34,211,238,0.20) 0%, rgba(255,255,255,0.05) 100%)",
  },
  {
    text: "It is reshaping workflows, decision-making, operations, and competitive advantage across every industry.",
    icon: Workflow,
    color: THEME.accent2,
    bg: "linear-gradient(135deg, rgba(167,139,250,0.20) 0%, rgba(255,255,255,0.05) 100%)",
  },
  {
    text: "But most professionals do not need to become AI engineers. They need to use AI inside their field.",
    icon: Users,
    color: THEME.accent3,
    bg: "linear-gradient(135deg, rgba(52,211,153,0.18) 0%, rgba(255,255,255,0.05) 100%)",
  },
  {
    text: "Praktix AI programs are structured by role and industry, so every professional can integrate AI into their real work environment.",
    icon: Briefcase,
    color: THEME.accent4,
    bg: "linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(255,255,255,0.05) 100%)",
  },
];

/* =========================
   FORM CONSTANTS (UNCHANGED STRINGS)
========================= */
const FORM_STEPS = ["Professional Background", "AI Goals & Interests", "Program Preferences", "Professional Impact", "Final Confirmation"];

const TRACK_LABELS = [
  "AI for Technology & Developers",
  "AI for Product & UX",
  "AI for Business & Strategy",
  "AI for Industry Applications",
  "AI Foundations (Non-Technical)",
  "Not Sure – Recommend for Me",
];

const OUTCOMES = [
  "AI implementation framework",
  "Executive-level certification",
  "Portfolio case study",
  "Productivity optimization toolkit",
  "AI strategy blueprint",
  "Practical automation workflows",
];

function getProgramPrice(title = "") {
  let h = 0;
  for (let i = 0; i < title.length; i += 1) {
    h = (h * 31 + title.charCodeAt(i)) % 601;
  }
  return 1000 + h;
}

const PROGRAM_COVERS = [
  "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
];

function getProgramCover(trackKey = "", title = "", index = 0) {
  let base = 0;
  for (let i = 0; i < trackKey.length; i += 1) {
    base = (base * 31 + trackKey.charCodeAt(i)) % PROGRAM_COVERS.length;
  }
  for (let i = 0; i < title.length; i += 1) {
    base = (base * 31 + title.charCodeAt(i)) % PROGRAM_COVERS.length;
  }
  return PROGRAM_COVERS[(base + index) % PROGRAM_COVERS.length];
}

const AIProgramCard = React.memo(function AIProgramCard({ track, program, index = 0, onApply }) {
  const Icon = track.icon;
  const cover = program.image || getProgramCover(track.key, program.title, index);
  const price = getProgramPrice(program.title);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay: Math.min(index * 0.03, 0.15) }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative w-[88vw] max-w-[380px] md:w-[440px] shrink-0 overflow-hidden rounded-3xl ring-1 bg-white/5 backdrop-blur"
      style={{ borderColor: "rgba(255,255,255,0.10)", boxShadow: "0 18px 70px rgba(0,0,0,0.35)" }}
    >
      <div className="relative h-[180px] overflow-hidden">
        <img src={cover} alt={program.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,18,32,0.15) 0%, rgba(11,18,32,0.70) 85%, rgba(11,18,32,0.90) 100%)" }} />
        <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${track.accent} 0%, rgba(255,255,255,0) 80%)` }} />
        <div className="absolute left-5 top-5 flex items-center gap-3">
          <IconBadge color={track.accent}>
            <Icon className="h-5 w-5" {...iconStrongProps} />
          </IconBadge>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
            style={{ background: track.accentSoft, borderColor: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.92)" }}
          >
            {track.label}
          </span>
        </div>
        <div className="absolute right-5 top-5 rounded-full px-3 py-1 text-xs font-semibold text-white ring-1" style={{ background: "rgba(11,18,32,0.55)", borderColor: "rgba(255,255,255,0.22)" }}>
          EUR {price.toFixed(2)}
        </div>
      </div>

      <div className="p-6">
        <div className="text-lg font-semibold text-white" style={clampStyle(2)}>
          {program.title}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-white/70" style={clampStyle(4)}>
          {program.description}
        </p>
        <div className="mt-4 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
          <div className="text-[11px] font-semibold tracking-widest text-white/55">PROGRAM FEE</div>
          <div className="mt-1 text-base font-semibold text-white">EUR {price.toFixed(2)}</div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => onApply?.(track, program)}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
            style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 100%)` }}
          >
            Apply for this program <ChevronRight className="h-4 w-4" {...iconStrongProps} />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

function ApplyProgramModal({
  open,
  onClose,
  selectedTrack,
  selectedProgram,
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  roleTitle,
  setRoleTitle,
  industry,
  setIndustry,
  experience,
  setExperience,
  interestTracks,
  setInterestTracks,
  goal,
  setGoal,
  knowledge,
  setKnowledge,
  challenge,
  setChallenge,
  startTime,
  setStartTime,
  timeCommitment,
  setTimeCommitment,
  weeklyAvail,
  setWeeklyAvail,
  applyingAs,
  setApplyingAs,
  outcomes,
  setOutcomes,
  linkedin,
  setLinkedin,
  consent,
  setConsent,
}) {
  useLockBodyScroll(open);
  const [step, setStep] = useState(0);
  const [formStep, setFormStep] = useState(0);
  const [method, setMethod] = useState("Stripe");

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      setStep(0);
      setFormStep(0);
      setMethod("Stripe");
    }, 0);
    return () => window.clearTimeout(timer);
  }, [open, selectedProgram]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const formStepLabels = FORM_STEPS;
  const formProgress = Math.round(((formStep + 1) / formStepLabels.length) * 100);
  const price = getProgramPrice(selectedProgram || selectedTrack || "AI Program");
  const vat = Number((price * 0.19).toFixed(2));
  const total = Number((price + vat).toFixed(2));

  const canNextForm = useMemo(() => {
    if (formStep === 0) return fullName.trim() && email.trim() && phone.trim() && roleTitle.trim();
    if (formStep === 1) return interestTracks.size > 0 && goal && knowledge;
    if (formStep === 2) return startTime && timeCommitment && weeklyAvail && applyingAs;
    if (formStep === 3) return outcomes.size > 0;
    if (formStep === 4) return consent;
    return true;
  }, [formStep, fullName, email, phone, roleTitle, interestTracks, goal, knowledge, startTime, timeCommitment, weeklyAvail, applyingAs, outcomes, consent]);

  const next = () => {
    if (step === 0) {
      if (!canNextForm) return;
      if (formStep < formStepLabels.length - 1) setFormStep((s) => s + 1);
      else setStep(1);
      return;
    }
    if (step === 1) {
      setStep(2);
      return;
    }
    alert(`Proceeding with ${method} payment for EUR${total.toFixed(2)}.`);
    onClose?.();
  };

  const back = () => {
    if (step === 2) {
      setStep(1);
      return;
    }
    if (step === 1) {
      setStep(0);
      setFormStep(formStepLabels.length - 1);
      return;
    }
    if (formStep > 0) {
      setFormStep((s) => s - 1);
      return;
    }
    onClose?.();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] flex items-end bg-[#040B1D]/75 px-0 py-0 backdrop-blur-sm sm:block sm:px-4 sm:py-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.28, ease: EASE_OUT }}
          className="mx-auto h-[100dvh] max-h-[100dvh] w-full max-w-[980px] overflow-hidden rounded-none bg-[#ECEEF3] text-[#0B1220] shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:h-auto sm:max-h-[92vh] sm:rounded-[28px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-[#0B1220]/12 px-4 pb-4 pt-4 sm:px-6 sm:pb-5 sm:pt-6">
            <div className="flex items-start justify-between gap-5">
              <div>
                <div className="text-xs font-semibold tracking-[0.18em] text-[#0B1220]/55">APPLICATION FLOW</div>
                <h3 className="mt-2 text-lg font-semibold leading-tight sm:text-2xl">
                  Apply for {selectedProgram || selectedTrack || "AI Program"}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/65 ring-1 ring-[#0B1220]/14 transition hover:bg-white sm:h-12 sm:w-12"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-[#0B1220] sm:h-6 sm:w-6" {...iconStrongProps} />
              </button>
            </div>
          </div>

          <div className="max-h-[calc(100dvh-82px)] overflow-y-auto px-4 py-4 sm:max-h-[calc(92vh-104px)] sm:px-6 sm:py-6">
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:pb-0">
              {["Form", "Review", "Pay"].map((label, idx) => {
                const active = idx === step;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => (idx <= step ? setStep(idx) : null)}
                    className={cx(
                      "min-w-[120px] rounded-full border px-4 py-2 text-center text-sm font-semibold transition sm:min-w-0",
                      active ? "border-transparent text-white" : "border-[#0B1220]/12 bg-white/60 text-[#0B1220]/60"
                    )}
                    style={active ? { background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 100%)` } : undefined}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {step === 0 ? (
              <div className="mt-6 space-y-5">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">FORM PROGRESS</div>
                    <div className="text-xs font-semibold text-[#0B1220]/70">{formProgress}%</div>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#0B1220]/10">
                    <motion.div
                      initial={false}
                      animate={{ width: `${formProgress}%` }}
                      transition={{ duration: 0.45, ease: EASE_OUT }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 100%)` }}
                    />
                  </div>
                  <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
                    {formStepLabels.map((s, i) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => (i <= formStep ? setFormStep(i) : null)}
                        className="whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1"
                        style={{
                          background: i === formStep ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.70)} 100%)` : "rgba(11,18,32,0.06)",
                          color: i === formStep ? "rgba(255,255,255,0.95)" : "rgba(11,18,32,0.70)",
                          borderColor: "rgba(11,18,32,0.10)",
                        }}
                      >
                        {i + 1}. {s}
                      </button>
                    ))}
                  </div>
                </div>

                {formStep === 0 ? (
                  <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Full Name" required>
                        <Input icon={BadgeCheck} iconColor={THEME.accent2} placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                      </Field>
                      <Field label="Email Address" required>
                        <Input icon={Globe2} iconColor={THEME.accent} placeholder="name@email.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Phone Number (with country code)" required>
                        <Input icon={Briefcase} iconColor={THEME.accent3} placeholder="+962 ..." value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </Field>
                      <Field label="Current Role / Title" required>
                        <Input icon={Briefcase} iconColor={THEME.accent4} placeholder="Software Engineer, Marketing Manager, Finance Analyst" value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Industry" required>
                        <Select
                          icon={Building2}
                          iconColor={THEME.accent2}
                          value={industry}
                          onChange={setIndustry}
                          options={["Technology", "Finance", "Healthcare", "Education", "Government", "Manufacturing", "Consulting", "Marketing", "HR", "Research", "Startup / Entrepreneurship", "Other"]}
                        />
                      </Field>
                      <Field label="Years of Experience" required>
                        <Select icon={Calendar} iconColor={THEME.accent} value={experience} onChange={setExperience} options={["Student", "0–2 Years", "3–5 Years", "6–10 Years", "10+ Years"]} />
                      </Field>
                    </div>
                  </>
                ) : null}

                {formStep === 1 ? (
                  <>
                    <Field label="Which AI Track Are You Interested In?" required hint="Multi-select">
                      <TogglePills
                        options={TRACK_LABELS}
                        valueSet={interestTracks}
                        onChange={(nextSet) => {
                          if (nextSet.has("Not Sure – Recommend for Me") && nextSet.size > 1) nextSet.delete("Not Sure – Recommend for Me");
                          setInterestTracks(nextSet);
                        }}
                      />
                    </Field>
                    <Field label="What Is Your Primary Goal?" required>
                      <RadioRow
                        options={["Increase productivity in my current job", "Lead AI transformation in my organization", "Transition into an AI-related role", "Build AI-powered products", "Strengthen decision-making with AI", "Future-proof my career", "Other"]}
                        value={goal}
                        onChange={setGoal}
                      />
                    </Field>
                    <Field label="Current AI Knowledge Level" required>
                      <RadioRow options={["Beginner", "Intermediate", "Advanced", "Technical AI Background"]} value={knowledge} onChange={setKnowledge} />
                    </Field>
                    <Field label="Describe a challenge you want AI to help you solve" hint="Optional (max ~400 chars)">
                      <Textarea value={challenge} onChange={(e) => setChallenge(e.target.value.slice(0, 400))} placeholder="e.g., automate reporting, improve customer onboarding, speed up research synthesis..." />
                      <div className="mt-2 text-xs text-[#0B1220]/55">{challenge.length}/400</div>
                    </Field>
                  </>
                ) : null}

                {formStep === 2 ? (
                  <>
                    <Field label="Preferred Start Time" required>
                      <RadioRow options={["Next Cohort (Immediate)", "Within 1 Month", "Within 2–3 Months", "Just Exploring for Now"]} value={startTime} onChange={setStartTime} />
                    </Field>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Preferred Time Commitment" required>
                        <Select icon={Calendar} iconColor={THEME.accent4} value={timeCommitment} onChange={setTimeCommitment} options={["3 Weeks Intensive", "4–5 Weeks Balanced", "6–7 Weeks Advanced Track", "Flexible"]} />
                      </Field>
                      <Field label="Weekly Availability" required>
                        <Select icon={ListChecks} iconColor={THEME.accent3} value={weeklyAvail} onChange={setWeeklyAvail} options={["3–5 hours/week", "6–8 hours/week", "8–12 hours/week"]} />
                      </Field>
                    </div>
                    <Field label="Are You Applying As" required>
                      <RadioRow options={["Individual Self-Sponsored", "Company-Sponsored", "Considering Team Enrollment"]} value={applyingAs} onChange={setApplyingAs} />
                    </Field>
                  </>
                ) : null}

                {formStep === 3 ? (
                  <>
                    <Field label="What Outcome Matters Most to You?" required hint="Multi-select">
                      <TogglePills options={OUTCOMES} valueSet={outcomes} onChange={setOutcomes} />
                    </Field>
                    <Field label="LinkedIn Profile" hint="Optional but recommended">
                      <Input icon={Rocket} iconColor={THEME.accent2} placeholder="https://linkedin.com/in/" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                    </Field>
                    <div className="rounded-3xl bg-white/50 p-5 ring-1 ring-[#0B1220]/10">
                      <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">TRACK CONTEXT</div>
                      <div className="mt-2 text-sm text-[#0B1220]/75">Selected track family: <span className="font-semibold">{selectedTrack || "—"}</span></div>
                      <div className="mt-1 text-sm text-[#0B1220]/75">Selected program: <span className="font-semibold">{selectedProgram || "—"}</span></div>
                    </div>
                  </>
                ) : null}

                {formStep === 4 ? (
                  <motion.button
                    type="button"
                    onClick={() => setConsent((v) => !v)}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex w-full items-center justify-between rounded-2xl bg-white/60 px-4 py-4 text-left ring-1 ring-[#0B1220]/10 transition hover:ring-[#0B1220]/20"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-md ring-1"
                        style={{
                          background: consent ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.70)} 100%)` : "transparent",
                          borderColor: "rgba(11,18,32,0.18)",
                        }}
                      >
                        {consent ? <CheckCircle2 className="h-4 w-4 text-white" {...iconStrongProps} /> : null}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-[#0B1220]">I agree to be contacted regarding AI program enrollment and updates.</div>
                        <div className="mt-1 text-xs text-[#0B1220]/55">Required to proceed.</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#0B1220]/55">{consent ? "Enabled" : "Disabled"}</span>
                  </motion.button>
                ) : null}
              </div>
            ) : null}

            {step === 1 ? (
              <div className="mt-6 space-y-4">
                <div className="rounded-[22px] bg-white p-5 ring-1 ring-[#0B1220]/10">
                  <div className="text-lg font-semibold text-[#0B1220]">Review Application</div>
                  <div className="mt-3 space-y-1 text-sm text-[#0B1220]/80">
                    <div><span className="font-semibold">Name:</span> {fullName || "-"}</div>
                    <div><span className="font-semibold">Email:</span> {email || "-"}</div>
                    <div><span className="font-semibold">Phone:</span> {phone || "-"}</div>
                    <div><span className="font-semibold">Role:</span> {roleTitle || "-"}</div>
                    <div><span className="font-semibold">Industry:</span> {industry || "-"}</div>
                    <div><span className="font-semibold">Experience:</span> {experience || "-"}</div>
                    <div><span className="font-semibold">Interested tracks:</span> {[...interestTracks].join(", ") || "-"}</div>
                    <div><span className="font-semibold">Goal:</span> {goal || "-"}</div>
                    <div><span className="font-semibold">AI knowledge:</span> {knowledge || "-"}</div>
                    <div><span className="font-semibold">Challenge:</span> {challenge || "-"}</div>
                    <div><span className="font-semibold">Start:</span> {startTime || "-"}</div>
                    <div><span className="font-semibold">Time commitment:</span> {timeCommitment || "-"}</div>
                    <div><span className="font-semibold">Weekly availability:</span> {weeklyAvail || "-"}</div>
                    <div><span className="font-semibold">Applying as:</span> {applyingAs || "-"}</div>
                    <div><span className="font-semibold">Outcomes:</span> {[...outcomes].join(", ") || "-"}</div>
                    <div><span className="font-semibold">LinkedIn:</span> {linkedin || "-"}</div>
                    <div><span className="font-semibold">Program:</span> {selectedProgram || "-"}</div>
                  </div>
                </div>
                <div className="rounded-[22px] bg-white p-5 ring-1 ring-[#0B1220]/10">
                  <div className="text-sm font-semibold tracking-widest text-[#0B1220]/55">INCLUDES</div>
                  <div className="mt-3 space-y-2">
                    {["Live expert sessions", "Applied assignments", "Certificate of completion"].map((x) => (
                      <div key={x} className="flex items-start gap-3 text-sm text-[#0B1220]/75">
                        <Check className="mt-0.5 h-4 w-4" style={{ color: THEME.accent3 }} {...iconStrongProps} />
                        <span>{x}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="mt-6 space-y-5">
                <div className="rounded-[22px] bg-gradient-to-br from-[#0B1220] to-[#152238] p-5 text-center ring-1 ring-[#0B1220]/20 sm:p-7">
                  <div className="text-2xl font-semibold leading-tight text-white sm:text-5xl">Complete Your Purchase</div>
                  <div className="mt-2 text-sm text-white/70">Secure checkout with VAT-inclusive pricing.</div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_1fr]">
                  <div className="rounded-[22px] bg-white p-7 ring-1 ring-[#0B1220]/10">
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-2xl font-semibold text-[#0B1220]">{selectedProgram || "AI Program"}</div>
                      <div className="text-2xl font-semibold text-[#0B1220]">EUR{price.toFixed(2)}</div>
                    </div>
                    <div className="mt-6 space-y-2">
                      {["Live expert sessions", "Applied assignments", "Certificate of completion"].map((x) => (
                        <div key={x} className="flex items-start gap-3 text-sm text-[#0B1220]/75">
                          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full" style={{ background: THEME.accent3 }}>
                            <Check className="h-3.5 w-3.5 text-white" {...iconStrongProps} />
                          </span>
                          <span>{x}</span>
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
                          const active = method === m;
                          return (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setMethod(m)}
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

            <div className="sticky bottom-0 -mx-4 mt-6 border-t border-[#0B1220]/12 bg-[#ECEEF3]/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:mt-7 sm:border-0 sm:bg-transparent sm:p-0">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={back}
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] ring-1 ring-[#0B1220]/12 transition hover:bg-[#E5E7EB] sm:w-auto"
              >
                {step === 0 && formStep === 0 ? "Cancel" : "Back"}
              </button>
              <button
                type="button"
                onClick={next}
                className={cx(
                  "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white sm:w-auto",
                  step === 0 && !canNextForm ? "cursor-not-allowed opacity-60" : ""
                )}
                disabled={step === 0 && !canNextForm}
                style={step === 2 ? { background: "#0B1220" } : { background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)` }}
              >
                {step === 0 ? (formStep === formStepLabels.length - 1 ? "Continue to Review" : "Continue") : null}
                {step === 1 ? "Continue to Pay" : null}
                {step === 2 ? `Proceed to Secure Payment • EUR${total.toFixed(2)}` : null}
                {step < 2 ? <ChevronRight className="h-4 w-4" {...iconStrongProps} /> : null}
              </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================
   FORM COMPONENTS
========================= */
function Field({ label, required, hint, children }) {
  return (
    <label className="group block">
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

function TogglePills({ options, valueSet, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = valueSet.has(o);
        return (
          <motion.button
            key={o}
            type="button"
            onClick={() => {
              const next = new Set(valueSet);
              if (next.has(o)) next.delete(o);
              else next.add(o);
              onChange(next);
            }}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className={cx(
              "rounded-full px-4 py-2 text-sm font-semibold ring-1 transition",
              active ? "text-white" : "text-[#0B1220]/70 hover:bg-[#0B1220]/5"
            )}
            style={
              active
                ? { background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 75%)`, borderColor: "rgba(11,18,32,0.10)" }
                : { background: "rgba(255,255,255,0.60)", borderColor: "rgba(11,18,32,0.10)" }
            }
          >
            {o}
          </motion.button>
        );
      })}
    </div>
  );
}

function RadioRow({ options, value, onChange }) {
  return (
    <div className="space-y-2">
      {options.map((o) => {
        const checked = value === o;
        return (
          <motion.button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.99 }}
            className="flex w-full items-center justify-between rounded-2xl bg-white/60 px-4 py-3 text-left ring-1 ring-[#0B1220]/10 transition hover:ring-[#0B1220]/20"
          >
            <div className="text-sm font-semibold text-[#0B1220]">{o}</div>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full ring-1 ring-[#0B1220]/10">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  background: checked ? THEME.pink : "transparent",
                  border: checked ? "none" : "2px solid rgba(11,18,32,0.25)",
                }}
              />
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

/* =========================
   DIAGNOSTIC MINI QUIZ
========================= */
function AIDiagnostic({ onResult }) {
  const [q1, setQ1] = useState("Increase productivity in my current job");
  const [q2, setQ2] = useState("Beginner");
  const [q3, setQ3] = useState("Not Sure – Recommend for Me");

  const result = useMemo(() => {
    if (q3 !== "Not Sure – Recommend for Me") return q3;
    if (q1.includes("products")) return "AI for Product, UX & Design";
    if (q1.includes("transformation") || q1.includes("Lead")) return "AI for Business & Strategy";
    if (q2 === "Technical AI Background") return "AI for Technology & Developers";
    if (q2 === "Advanced") return "AI for Technology & Developers";
    return "AI Foundations & Non-Tech Professionals";
  }, [q1, q2, q3]);

  return (
    <div className="rounded-[36px] bg-white/5 p-7 ring-1 ring-white/10 backdrop-blur" style={{ boxShadow: "0 18px 70px rgba(0,0,0,0.35)" }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/75 ring-1 ring-white/10">
            <Lightbulb className="h-4 w-4" style={{ color: THEME.accent4 }} {...iconStrongProps} />
            <span>AI CAREER DIAGNOSTIC</span>
          </div>
          <div className="mt-4 text-2xl font-semibold text-white">Find your AI path in 3 minutes</div>
          <p className="mt-2 text-sm text-white/70">Answer 3 quick questions and we’ll recommend a best-fit track.</p>
        </div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
          className="hidden sm:block"
        >
          <div className="h-10 w-10 rounded-2xl ring-1 ring-white/10" style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.72)} 70%)` }} />
        </motion.div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
          <div className="text-xs font-semibold tracking-widest text-white/60">PRIMARY GOAL</div>
          <div className="mt-3">
            <Select
              icon={Target}
              iconColor={THEME.accent}
              value={q1}
              onChange={setQ1}
              options={[
                "Increase productivity in my current job",
                "Lead AI transformation in my organization",
                "Transition into an AI-related role",
                "Build AI-powered products",
                "Strengthen decision-making with AI",
                "Future-proof my career",
              ]}
            />
          </div>
        </div>

        <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
          <div className="text-xs font-semibold tracking-widest text-white/60">KNOWLEDGE LEVEL</div>
          <div className="mt-3">
            <Select
              icon={GraduationCap}
              iconColor={THEME.accent2}
              value={q2}
              onChange={setQ2}
              options={["Beginner", "Intermediate", "Advanced", "Technical AI Background"]}
            />
          </div>
        </div>

        <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
          <div className="text-xs font-semibold tracking-widest text-white/60">TRACK PREFERENCE</div>
          <div className="mt-3">
            <Select
              icon={Compass}
              iconColor={THEME.accent3}
              value={q3}
              onChange={setQ3}
              options={[
                "Not Sure – Recommend for Me",
                "AI for Technology & Developers",
                "AI for Product, UX & Design",
                "AI for Business & Strategy",
                "AI for Industry & Sector Applications",
                "AI Foundations & Non-Tech Professionals",
              ]}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <IconBadge color={THEME.accent3}>
            <BadgeCheck className="h-5 w-5" {...iconStrongProps} />
          </IconBadge>
          <div>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={result}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="mt-1 text-lg font-semibold text-white"
              >
                {result}
              </motion.div>
            </AnimatePresence>
            <div className="mt-1 text-sm text-white/70">Use this to pre-fill your application.</div>
          </div>
        </div>

        <GradientButton onClick={() => onResult?.(result)}>Use this track</GradientButton>
      </div>
    </div>
  );
}

/* =========================
   PAGE
========================= */
export default function AIForRealWorldCareersPage() {
  const reduce = useReducedMotion();

  const [activeTrack, setActiveTrack] = useState(TRACKS[0].key);
  const track = useMemo(() => TRACKS.find((t) => t.key === activeTrack) || TRACKS[0], [activeTrack]);

  const sliderRef = useRef(null);

  const steps = FORM_STEPS;
  const [step, setStep] = useState(0);

  const [_submitted, setSubmitted] = useState(false);
  const [_submitting, setSubmitting] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedProgramTitle, setSelectedProgramTitle] = useState("");
  const [selectedTrackLabel, setSelectedTrackLabel] = useState(track.label);

  // Step 1
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [industry, setIndustry] = useState("Technology");
  const [experience, setExperience] = useState("0–2 Years");

  // Step 2
  const [interestTracks, setInterestTracks] = useState(new Set(["Not Sure – Recommend for Me"]));
  const [goal, setGoal] = useState("Increase productivity in my current job");
  const [knowledge, setKnowledge] = useState("Beginner");
  const [challenge, setChallenge] = useState("");

  // Step 3
  const [startTime, setStartTime] = useState("Next Cohort (Immediate)");
  const [timeCommitment, setTimeCommitment] = useState("4–5 Weeks Balanced");
  const [weeklyAvail, setWeeklyAvail] = useState("6–8 hours/week");
  const [applyingAs, setApplyingAs] = useState("Individual Self-Sponsored");

  // Step 4
  const [outcomes, setOutcomes] = useState(new Set(["Executive-level certification", "Practical automation workflows"]));
  const [linkedin, setLinkedin] = useState("");

  // Step 5
  const [consent, setConsent] = useState(false);

  const _progress = Math.round(((step + 1) / steps.length) * 100);

  const canNext = useMemo(() => {
    if (step === 0) return fullName.trim() && email.trim() && phone.trim() && roleTitle.trim();
    if (step === 1) return interestTracks.size > 0 && goal && knowledge;
    if (step === 2) return startTime && timeCommitment && weeklyAvail && applyingAs;
    if (step === 3) return outcomes.size > 0;
    if (step === 4) return consent;
    return true;
  }, [step, fullName, email, phone, roleTitle, interestTracks, goal, knowledge, startTime, timeCommitment, weeklyAvail, applyingAs, outcomes, consent]);

  const scrollSlider = useCallback((dir) => {
    const el = sliderRef.current;
    if (!el) return;

    // dynamic step based on card width (no hardcoding)
    const first = el.querySelector("[data-track-card]");
    const cardW = first ? first.getBoundingClientRect().width : 420;
    const styles = window.getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "20") || 20;

    const dx = (cardW + gap) * (dir === "left" ? -1 : 1);
    el.scrollBy({ left: dx, behavior: "smooth" });
  }, []);

  function normalizeTrackLabel(label) {
    if (label.includes("Technology")) return "AI for Technology & Developers";
    if (label.includes("Product")) return "AI for Product, UX & Design";
    if (label.includes("Business")) return "AI for Business & Strategy";
    if (label.includes("Industry")) return "AI for Industry & Sector Applications";
    if (label.includes("Foundations")) return "AI Foundations & Non-Tech Professionals";
    return label;
  }

  const trackKeyFromLabel = useCallback((label) => {
    if (label.includes("Technology")) return "tech";
    if (label.includes("Product")) return "product";
    if (label.includes("Business")) return "biz";
    if (label.includes("Industry")) return "industry";
    if (label.includes("Foundations")) return "foundations";
    return TRACKS[0].key;
  }, []);

  const openApplyModal = useCallback((targetTrack, targetProgram) => {
    const nextTrackLabel = targetTrack?.label || track.label;
    const nextProgramTitle = targetProgram?.title || "";

    setSelectedTrackLabel(nextTrackLabel);
    setSelectedProgramTitle(nextProgramTitle);
    setInterestTracks(new Set([nextTrackLabel]));
    if (nextProgramTitle) {
      setRoleTitle(nextProgramTitle);
    }
    setActiveTrack(trackKeyFromLabel(nextTrackLabel));
    setIsApplyModalOpen(true);
  }, [track.label, trackKeyFromLabel]);

  const _applyDiagnosticRecommendation = useCallback((reco) => {
    const normalized = normalizeTrackLabel(reco);
    const next = new Set([normalized]);
    setInterestTracks(next);

    setActiveTrack(trackKeyFromLabel(normalized));
    document.querySelector("#apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [trackKeyFromLabel]);

  const _resetAndSubmit = useCallback(() => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2600);
      setStep(0);
    }, 650);
  }, []);

  const _goNext = useCallback(() => {
    if (!canNext) return;
    setStep((s) => Math.min(steps.length - 1, s + 1));
  }, [canNext, steps.length]);

  const _goBack = useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
  }, []);

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
      <div className="pointer-events-none fixed inset-0 -z-10">
        <AmbientOrbs />

        <div
          className="absolute inset-0 opacity-65"
          style={{
            background:
              "radial-gradient(1200px circle at 10% 10%, rgba(255,255,255,0.08), transparent 55%), radial-gradient(1200px circle at 80% 20%, rgba(233,231,223,0.06), transparent 55%), radial-gradient(900px circle at 60% 90%, rgba(255,255,255,0.06), transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.15]"
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
        <div className="absolute inset-0 noise" />
      </div>

      <section id="overview" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-10 lg:grid-cols-2 lg:py-14">
          <motion.div variants={vFadeUp} initial="hidden" animate="show">
            <motion.h1
              className="mt-1 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.05 }}
            >
              AI Is Not a Skill.
              <br />
              It’s a{" "}
              <span style={{ color: THEME.pink }}>
                Career Multiplier
              </span>
              .
            </motion.h1>

            <motion.p
              className="mt-4 max-w-xl text-balance text-base text-white/70 sm:text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.12 }}
            >
              Practical AI programs designed for professionals across every industry — so you don’t
              get replaced by AI. You lead with it
            </motion.p>

            <motion.p
              className="mt-4 max-w-2xl text-sm text-white/65"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.18 }}
            >
              Online · 3-7 Weeks · Monthly & Bi-Monthly Intakes · Built for Working Professionals
            </motion.p>

            <motion.div
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.25 }}
            >
              <GradientButton href="#tracks">Explore AI Tracks</GradientButton>
              <GradientButton href="#diagnostic" variant="secondary">
                Find Your AI Path
              </GradientButton>
            </motion.div>
          </motion.div>

          <motion.div variants={vFadeUp} initial="hidden" animate="show" transition={{ delay: 0.08 }} className="relative">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px]">
              <div className="absolute inset-0 overflow-hidden rounded-[44px] ring-1 ring-white/10">
                <motion.img
                  src={IMG.hero}
                  alt="Professionals using AI"
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.05 }}
                  animate={reduce ? { scale: 1.05 } : { scale: [1.05, 1.09, 1.05] }}
                  transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(11,18,32,0.30) 0%, rgba(11,18,32,0.66) 65%, rgba(11,18,32,0.90) 100%)",
                  }}
                />
                <div className="absolute inset-0 neural opacity-60" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-12 sm:py-14">
          <SectionTitle title="Why AI for Real-World Careers?" dark />
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {WHY_EXISTS_CARDS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.text} delay={i * 0.06} amount={0.3}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.01 }}
                    className="relative overflow-hidden rounded-[30px] p-6 ring-1 ring-white/10 backdrop-blur"
                    style={{ background: item.bg, boxShadow: "0 18px 42px rgba(0,0,0,0.24)" }}
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-35">
                      <div className="shine" />
                    </div>
                    <div className="relative flex items-start gap-4">
                      <motion.div
                        animate={reduce ? undefined : { y: [0, -4, 0], rotate: [0, -3, 0] }}
                        transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                        className="mt-0.5"
                      >
                        <IconBadge color={item.color}>
                          <Icon className="h-5 w-5" {...iconStrongProps} />
                        </IconBadge>
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-base leading-relaxed text-white/85">{item.text}</p>
                        <motion.div
                          className="mt-4 h-1.5 w-16 rounded-full"
                          style={{ background: item.color }}
                          animate={reduce ? undefined : { width: [64, 96, 64], opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                        />
                      </div>
                    </div>
                    <motion.span
                      className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full"
                      style={{ background: item.color }}
                      animate={reduce ? undefined : { scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
                    />
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-12 sm:py-14">
          <SectionTitle title="Choose Your AI Track" dark />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OVERVIEW_FACTS.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 0.04} amount={0.25}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur"
                  >
                    <div className="flex items-start gap-3">
                      <IconBadge color={f.color}>
                        <Icon className="h-5 w-5" {...iconStrongProps} />
                      </IconBadge>
                      <div>
                        <div className="text-sm font-semibold text-white">{f.title}</div>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="tracks" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-12 sm:py-14">
          <SectionTitle title="Categorized AI Tracks" subtitle="We do not present 30 random courses. We present clear categories." dark />

          <div className="mt-10 flex flex-col gap-5">
            <div className="flex flex-wrap gap-2">
              {TRACKS.map((t) => {
                const active = t.key === activeTrack;
                return (
                  <motion.button
                    key={t.key}
                    type="button"
                    onClick={() => {
                      setActiveTrack(t.key);
                      sliderRef.current?.scrollTo({ left: 0, behavior: "smooth" });
                    }}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className={cx(
                      "rounded-full px-4 py-2 text-sm font-semibold ring-1 transition",
                      active ? "text-white" : "text-white/70 hover:bg-white/5",
                      active ? "ring-white/15" : "ring-white/10"
                    )}
                    style={active ? { background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 75%)` } : undefined}
                  >
                    {t.label}
                  </motion.button>
                );
              })}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-xs font-semibold tracking-widest text-white/60">SELECTED</div>
                <div className="mt-1 text-xl font-semibold text-white">{track.label}</div>
                <div className="mt-1 text-sm text-white/65">{track.desc}</div>
              </div>

              <button
                type="button"
                onClick={() => openApplyModal(track)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/5 sm:mt-0"
              >
                Apply for this track <ArrowRight className="h-4 w-4" {...iconStrongProps} />
              </button>
            </div>

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

              <div ref={sliderRef} className="no-scrollbar flex gap-4 overflow-x-auto pb-2 pr-5 sm:gap-5 sm:pr-0" style={{ scrollSnapType: "x mandatory" }}>
                {track.programs.map((p, idx) => (
                  <div key={p.title} style={{ scrollSnapAlign: "start" }} data-track-card>
                    <AIProgramCard track={track} program={p} index={idx} onApply={openApplyModal} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how"
        className="relative"
        style={{ background: `linear-gradient(180deg, rgba(233,231,223,1) 0%, rgba(233,231,223,0.85) 100%)`, color: THEME.deep }}
      >
        <div className="mx-auto max-w-7xl px-5 py-12 sm:py-14">
          <SectionTitle title="How It Works" />

          <div className="mt-10 grid grid-cols-1 gap-4">
            {[
              { title: "Choose Your Industry Track", desc: "Pick the track family that matches your role and workflows.", icon: Compass, color: THEME.accent },
              { title: "Join a 3–7 Week Structured Program", desc: "Cohort cadence, assignments, and guided checkpoints.", icon: Calendar, color: THEME.accent2 },
              { title: "Apply AI to Real Work Cases", desc: "Work on cases that map directly to your job environment.", icon: Briefcase, color: THEME.accent3 },
              { title: "Build AI-Ready Capability", desc: "Graduate with portfolio outputs and implementation templates.", icon: BadgeCheck, color: THEME.accent4 },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 0.05} amount={0.35}>
                  <motion.div whileHover={{ y: -3 }} className="relative rounded-[36px] bg-white/55 p-6 ring-1 ring-[#0B1220]/10">
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
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="outcomes" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-12 sm:py-14">
          <SectionTitle title="You leave with proof" accentWord="not attendance" subtitle="Verified capability + a practical portfolio you can use in real work." dark />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Reveal amount={0.25}>
                <div className="rounded-[36px] bg-white/5 p-7 ring-1 ring-white/10 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <IconBadge color={THEME.accent3}>
                      <FileCheck2 className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                    <div>
                      <div className="mt-1 text-lg font-semibold text-white">Deliverables designed for real workflows</div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      { icon: BadgeCheck, text: "Verified AI Capability Certificate", color: THEME.accent3 },
                      { icon: Briefcase, text: "Practical AI Use Case Portfolio", color: THEME.accent },
                      { icon: ClipboardCheck, text: "Implementation Framework Templates", color: THEME.accent2 },
                      { icon: Layers, text: "AI Workflow Blueprints", color: THEME.accent4 },
                      { icon: LineChart, text: "Executive Summary Toolkit (for leaders)", color: THEME.accent3 },
                    ].map((b, i) => {
                      const Icon = b.icon;
                      return (
                        <Reveal key={b.text} delay={i * 0.04} amount={0.25}>
                          <motion.div whileHover={{ y: -3 }} className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                            <div className="flex items-start gap-3">
                              <IconBadge color={b.color}>
                                <Icon className="h-4 w-4" {...iconStrongProps} />
                              </IconBadge>
                              <div className="text-sm font-semibold text-white">{b.text}</div>
                            </div>
                          </motion.div>
                        </Reveal>
                      );
                    })}
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-white/70">Built for real work environments — not generic exercises.</div>
                    <GradientButton onClick={() => openApplyModal(track)}>Apply Now</GradientButton>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-2">
              <Reveal amount={0.25} delay={0.05}>
                <div className="relative h-full overflow-hidden rounded-[36px] p-7 ring-1 ring-white/10">
                  <motion.img
                    src={IMG.outcomes}
                    alt="Outcomes visual"
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ scale: 1.05 }}
                    animate={reduce ? { scale: 1.05 } : { scale: [1.05, 1.10, 1.05] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(11,18,32,0.35) 0%, rgba(11,18,32,0.75) 75%, rgba(11,18,32,0.92) 100%)",
                    }}
                  />

                  <div className="relative">
                    <div className="mt-2 text-2xl font-semibold leading-tight text-white">
                      Professionals who want AI leverage inside their role.
                    </div>

                    <div className="mt-6 space-y-3">
                      {[
                        { icon: Briefcase, text: "Working professionals", color: THEME.accent },
                        { icon: Target, text: "Managers & decision-makers", color: THEME.accent3 },
                        { icon: Zap, text: "Developers", color: THEME.accent2 },
                        { icon: GraduationCap, text: "Researchers", color: THEME.accent4 },
                        { icon: Handshake, text: "Consultants & sector specialists", color: THEME.accent3 },
                      ].map((b, i) => {
                        const Icon = b.icon;
                        return (
                          <Reveal key={b.text} delay={i * 0.04} amount={0.5} y={10}>
                            <div className="flex items-start gap-3">
                              <IconBadge color={b.color}>
                                <Icon className="h-4 w-4" {...iconStrongProps} />
                              </IconBadge>
                              <div className="text-sm text-white/85">{b.text}</div>
                            </div>
                          </Reveal>
                        );
                      })}
                    </div>

                    <div className="mt-7">
                      <button
                        type="button"
                        onClick={() => openApplyModal(track)}
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15"
                      >
                        Speak With an AI Advisor <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                      </button>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute -bottom-20 -right-24 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(255,255,255,0.08)" }} />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-12 sm:py-14">
          <SectionTitle
            title="Why Praktix AI programs?"
            subtitle="We don’t teach AI in isolation. We integrate AI inside real job functions — turning AI into a productivity engine, strategic layer, decision system, and workflow multiplier."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Productivity engine", desc: "Automate, accelerate, and improve throughput.", color: THEME.accent },
              { icon: Target, title: "Strategic layer", desc: "Better prioritization, planning, and competitive moves.", color: THEME.accent3 },
              { icon: LineChart, title: "Decision system", desc: "Sharper analysis, scenarios, and forecasting.", color: THEME.accent4 },
              { icon: Workflow, title: "Workflow multiplier", desc: "Embed AI directly into role-specific execution.", color: THEME.accent2 },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={i * 0.05}>
                  <motion.div whileHover={{ y: -4 }} className="rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur">
                    <div className="flex items-center gap-3">
                      <IconBadge color={c.color}>
                        <Icon className="h-5 w-5" {...iconStrongProps} />
                      </IconBadge>
                      <div>
                        <div className="mt-1 text-lg font-semibold">{c.title}</div>
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-[#0B1220]/70">{c.desc}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ApplyProgramModal
        open={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        selectedTrack={selectedTrackLabel}
        selectedProgram={selectedProgramTitle}
        fullName={fullName}
        setFullName={setFullName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        roleTitle={roleTitle}
        setRoleTitle={setRoleTitle}
        industry={industry}
        setIndustry={setIndustry}
        experience={experience}
        setExperience={setExperience}
        interestTracks={interestTracks}
        setInterestTracks={setInterestTracks}
        goal={goal}
        setGoal={setGoal}
        knowledge={knowledge}
        setKnowledge={setKnowledge}
        challenge={challenge}
        setChallenge={setChallenge}
        startTime={startTime}
        setStartTime={setStartTime}
        timeCommitment={timeCommitment}
        setTimeCommitment={setTimeCommitment}
        weeklyAvail={weeklyAvail}
        setWeeklyAvail={setWeeklyAvail}
        applyingAs={applyingAs}
        setApplyingAs={setApplyingAs}
        outcomes={outcomes}
        setOutcomes={setOutcomes}
        linkedin={linkedin}
        setLinkedin={setLinkedin}
        consent={consent}
        setConsent={setConsent}
      />

      <style>{css}</style>
    </div>
  );
}

/* =========================
   CSS (COLORS UNCHANGED, ADDED ONLY ANIMATION UTILS)
========================= */
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

  @keyframes gradMove{
    0%{ background-position: 0% 50%; }
    50%{ background-position: 100% 50%; }
    100%{ background-position: 0% 50%; }
  }

  .neural{
    position:absolute;
    inset:-40% -40%;
    background:
      radial-gradient(circle at 20% 30%, rgba(34,211,238,0.18), transparent 42%),
      radial-gradient(circle at 70% 60%, rgba(167,139,250,0.14), transparent 46%),
      linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px),
      linear-gradient(180deg, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: auto, auto, 44px 44px, 44px 44px;
    transform: rotate(-8deg);
    opacity: 0.55;
    animation: neuralDrift 10.5s ease-in-out infinite;
    filter: blur(0.2px);
  }
  @keyframes neuralDrift{
    0%{ transform: translateX(-2%) translateY(0%) rotate(-8deg); }
    50%{ transform: translateX(2%) translateY(1.5%) rotate(-8deg); }
    100%{ transform: translateX(-2%) translateY(0%) rotate(-8deg); }
  }

  .noise{
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.18'/%3E%3C/svg%3E");
    opacity: .08;
    mix-blend-mode: overlay;
  }
`;
