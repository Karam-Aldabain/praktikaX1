import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Compass,
  FileCheck2,
  Filter,
  Globe2,
  GraduationCap,
  Handshake,
  HeartPulse,
  LineChart,
  MapPin,
  Shield,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";

/** -------------------------------------------------------
 *  THEME (matches your provided code palette + vibe)
 *  ------------------------------------------------------ */
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

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.05 },
  }),
};

function useInViewOnce(threshold = 0.22) {
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

function IconBadge({ color, children }) {
  return (
    <span
      className="inline-flex h-9 w-9 items-center justify-center rounded-2xl ring-1"
      style={{ ...POWER_ICON_SHELL }}
    >
      <span style={{ color }}>{children}</span>
    </span>
  );
}

function Anchor({ href, label }) {
  return (
    <a
      href={href}
      className="rounded-full px-3 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
    >
      {label}
    </a>
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
          "mt-5 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-[#0B1220]"
        )}
      >
        {title}{" "}
        {accentText ? (
          <span style={{ color: THEME.pink }}>{accentText}</span>
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

function GradientButton({ children, href, onClick, variant = "primary" }) {
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

function clampStyle(lines) {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
    overflow: "hidden",
  };
}

/** -------------------------------------------------------
 *  DATA (from the PDF, rendered with your theme)
 *  ------------------------------------------------------ */
const whoFor = [
  {
    title: "Students & Graduates",
    desc: "Career clarity, internship planning, and skill strategy—move from confusion to structured execution.",
    icon: GraduationCap,
    color: THEME.accent,
  },
  {
    title: "Working Professionals",
    desc: "Promotion strategy, AI upskilling, and career transitions—redesign your next 2–3 years intentionally.",
    icon: Briefcase,
    color: THEME.accent3,
  },
  {
    title: "Startup Founders",
    desc: "Product-market validation, go-to-market strategy, investor preparation, and growth decisions.",
    icon: RocketIcon,
    color: THEME.accent4,
  },
  {
    title: "Companies & Teams",
    desc: "Executive advisory, AI transformation, digital strategy, and organizational design.",
    icon: Building2,
    color: THEME.accent2,
  },
];

const processSteps = [
  { title: "Define Your Goal", desc: "You tell us your objective and background.", icon: ClipboardCheck, color: THEME.accent },
  { title: "Expert Matching", desc: "We connect you with the right industry specialist.", icon: Compass, color: THEME.accent2 },
  { title: "Strategy Session", desc: "60–90 minute deep advisory conversation.", icon: Briefcase, color: THEME.accent3 },
  { title: "Action Roadmap", desc: "You leave with a structured execution plan.", icon: FileCheck2, color: THEME.accent4 },
];

const sessionTypes = [
  {
    key: "career",
    name: "Career Strategy Session",
    desc: "Ideal for students and professionals. Direction, skills, positioning.",
    duration: "60 minutes",
    icon: Target,
    color: THEME.accent,
  },
  {
    key: "ai",
    name: "AI Career Upgrade Session",
    desc: "Integrate AI into your field. Tools, workflow, competitive advantage.",
    duration: "60–90 minutes",
    icon: Zap,
    color: THEME.accent2,
  },
  {
    key: "startup",
    name: "Startup & Business Advisory",
    desc: "Validation, scale, digital transition.",
    duration: "60 minutes",
    icon: Handshake,
    color: THEME.accent4,
  },
  {
    key: "exec",
    name: "Executive Decision Lab",
    desc: "High-level discussion for critical business decisions.",
    duration: "60 minutes",
    icon: Shield,
    color: THEME.accent3,
  },
];

// lightweight “experts” mock so the UI works immediately
const experts = [
  {
    id: "e1",
    name: "Dr. Lina Schmitt",
    title: "European Professor • Strategy & Innovation",
    specialization: "Career Roadmaps, Executive Decisions",
    years: 12,
    industries: ["Consulting", "Education", "Technology"],
    tags: ["Consulting", "Product"],
    badge: true,
  },
  {
    id: "e2",
    name: "Omar Haddad",
    title: "Head of Data • Applied AI",
    specialization: "AI Upskilling, Workflow Integration",
    years: 10,
    industries: ["AI", "Healthcare", "Finance"],
    tags: ["AI", "Technology", "Healthcare"],
    badge: true,
  },
  {
    id: "e3",
    name: "Sara Klein",
    title: "Growth Advisor • Startup GTM",
    specialization: "PMF, Go-to-market, Investor Prep",
    years: 9,
    industries: ["Entrepreneurship", "Marketing", "Technology"],
    tags: ["Marketing", "Product", "Technology"],
    badge: false,
  },
  {
    id: "e4",
    name: "Daniel Weber",
    title: "Senior Executive • Transformation",
    specialization: "Org Design, Digital Strategy",
    years: 15,
    industries: ["Consulting", "Government", "Technology"],
    tags: ["Consulting", "Technology"],
    badge: true,
  },
];

const expertFilters = ["All", "Technology", "AI", "Finance", "Product", "Marketing", "Consulting", "Healthcare"];

const testimonials = [
  {
    quote: "The session gave me clarity I couldn’t get in months alone.",
    who: "Product Manager",
    where: "Berlin",
  },
  {
    quote: "Our advisory roadmap saved us six months of trial and error.",
    who: "Startup Founder",
    where: "Dubai",
  },
  {
    quote: "I left with a real plan, not generic advice. Exactly what I needed.",
    who: "Senior Analyst",
    where: "Amsterdam",
  },
];

const faqs = [
  { q: "How are mentors selected?", a: "We match based on your goals, background, and the outcomes you want—then align you with the closest-fit expert." },
  { q: "Can I choose my expert?", a: "Yes. You can browse experts and request a specific mentor, or ask us to recommend the best fit." },
  { q: "Are sessions recorded?", a: "Optional and only with your explicit consent. Default is privacy-first, not recording." },
  { q: "What happens after the session?", a: "You leave with an actionable roadmap, next steps, and recommended resources or follow-up options if you want continuity." },
  { q: "Do you offer follow-up plans?", a: "Yes—multi-session roadmaps (3–5 sessions) for deeper execution, accountability, and iteration." },
];

/** -------------------------------------------------------
 *  MAIN PAGE
 *  ------------------------------------------------------ */
export default function CareerMentorshipPage() {
  const sliderRef = useRef(null);
  const statsInView = useInViewOnce(0.25);
  const reduce = useReducedMotion();

  // experts filter
  const [filter, setFilter] = useState("All");
  const filteredExperts = useMemo(() => {
    if (filter === "All") return experts;
    return experts.filter((e) => e.tags.includes(filter));
  }, [filter]);

  // sessions select
  const [activeSession, setActiveSession] = useState(sessionTypes[0].key);
  const activeSessionObj = useMemo(
    () => sessionTypes.find((s) => s.key === activeSession) || sessionTypes[0],
    [activeSession]
  );

  // testimonials carousel
  const [tIdx, setTIdx] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setTIdx((x) => (x + 1) % testimonials.length), 5200);
    return () => clearInterval(id);
  }, [reduce]);

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState(0);

  // booking form (multi-step, max 4)
  const steps = ["Info", "Objective", "Session", "Confirm"];
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    status: "Working Professional",
    roleOrStudy: "",
    industry: "Technology",
    exp: "3–5",
    advisoryType: ["Career Direction & Roadmap"],
    objective: "",
    challenge: "",
    sessionType: "60-Minute Strategy Session",
    mode: "Online (Zoom / Meet)",
    timeline: "Within 2 weeks",
    timezone: "Europe/Berlin",
    linkedin: "",
    previousMentor: "No",
    expertLevel: "Open to Recommendation",
    companyName: "",
    companySize: "10–50",
    orgFocus: "AI Adoption Strategy",
    seriousness: false,
  });

  const isOrg = form.status === "Organization Representative";

  const progressPct = Math.round(((step + 1) / steps.length) * 100);

  function updateField(key, value) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function toggleMulti(key, value) {
    setForm((p) => {
      const arr = new Set(p[key] || []);
      if (arr.has(value)) arr.delete(value);
      else arr.add(value);
      return { ...p, [key]: Array.from(arr) };
    });
  }

  const scrollSlider = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    const dx = dir === "left" ? -420 : 420;
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  const advisoryOptions = [
    "Career Direction & Roadmap",
    "AI Integration in My Field",
    "Career Transition / Industry Shift",
    "Promotion Strategy",
    "Startup Validation & Growth",
    "Digital Transformation Strategy",
    "Executive-Level Advisory",
    "Skill Gap Assessment",
    "Leadership Development",
    "Other (Specify)",
  ];

  const industryOptions = [
    "Technology",
    "AI & Data",
    "Finance",
    "Marketing",
    "Healthcare",
    "Consulting",
    "Entrepreneurship",
    "Education",
    "Government",
    "Other (Specify)",
  ];

  function validateStep(s) {
    if (s === 0) return form.fullName && form.email && form.phone && form.roleOrStudy;
    if (s === 1) return form.objective;
    if (s === 2) return form.sessionType && form.timeline && form.timezone;
    if (s === 3) return form.seriousness;
    return true;
  }

  function nextStep() {
    if (!validateStep(step)) {
      alert("Please complete the required fields for this step.");
      return;
    }
    setStep((p) => Math.min(p + 1, steps.length - 1));
  }

  function prevStep() {
    setStep((p) => Math.max(p - 1, 0));
  }

  function submit() {
    if (!validateStep(3)) {
      alert("Please confirm you are serious about this mentorship session.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setStep(0);
      setTimeout(() => setSubmitted(false), 3200);
    }, 900);
  }

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
      </div>

      {/* Sticky top nav */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B1220]/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl ring-1 ring-white/10"
              style={{
                background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.72)} 70%)`,
              }}
            >
              <span className="text-sm font-black tracking-widest">M</span>
            </div>
            <div>
              <div className="text-sm font-semibold">MENTORSHIP</div>
              <div className="text-xs text-white/60">1-to-1 Advisory</div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            <Anchor href="#overview" label="Overview" />
            <Anchor href="#who" label="Who It’s For" />
            <Anchor href="#process" label="Process" />
            <Anchor href="#sessions" label="Session Types" />
            <Anchor href="#experts" label="Experts" />
            <Anchor href="#book" label="Book" />
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#experts"
              className="hidden rounded-full px-4 py-2 text-sm font-semibold text-white/70 ring-1 ring-white/15 transition hover:bg-white/5 md:inline-flex"
            >
              Browse Experts
            </a>
            <GradientButton href="#book">Book a Session</GradientButton>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="overview" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/75 ring-1 ring-white/10">
              <Sparkles className="h-4 w-4" style={{ color: THEME.sand }} {...iconStrongProps} />
              <span>PREMIUM • STRUCTURED • OUTCOME-DRIVEN</span>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              Your Career Deserves{" "}
              <span style={{ color: THEME.pink }}>Strategy</span> — Not Guesswork.
            </h1>

            <p className="mt-5 max-w-xl text-balance text-base text-white/70 sm:text-lg">
              Private sessions with industry experts, European professors, and startup advisors to accelerate your career or business direction.
            </p>

            <p className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-white/65">
              From career pivots to executive decisions — get clarity, structure, and an action plan.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GradientButton href="#book">Book a Session</GradientButton>
              <GradientButton href="#experts" variant="secondary">
                Browse Experts
              </GradientButton>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill label="High-trust advisory" />
              <Pill label="Structured frameworks" />
              <Pill label="Decision-driven" />
              <Pill label="Roadmap output" />
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-white/65">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <BadgeCheck className="h-4 w-4" style={{ color: THEME.accent3 }} {...iconStrongProps} />
                <span>No generic advice</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <FileCheck2 className="h-4 w-4" style={{ color: THEME.accent4 }} {...iconStrongProps} />
                <span>Action roadmap</span>
              </div>
            </div>
          </motion.div>

          {/* Hero visual: split-screen concept */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px]">
              <div
                className="absolute inset-0 rounded-[44px] ring-1 ring-white/10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                }}
              />

              {/* Animated brand gradient wash */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[44px]">
                <motion.div
                  animate={{ x: ["-20%", "20%", "-20%"] }}
                  transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 opacity-[0.24]"
                  style={{
                    background: `linear-gradient(120deg, transparent 0%, ${accent(
                      0.3
                    )} 35%, rgba(34,211,238,0.18) 55%, transparent 75%)`,
                    filter: "blur(10px)",
                  }}
                />
              </div>

              {/* Right side: “expert in consultation” (placeholder image) */}
              <div className="absolute inset-6 grid grid-cols-2 gap-4">
                <div className="flex flex-col justify-between rounded-[36px] bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur">
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-white/60">WHAT THIS IS</div>
                    <div className="mt-2 text-xl font-semibold text-white">
                      Strategic mentorship for serious professionals.
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      Not motivational coaching. Structured advisory designed to define direction, identify skill gaps, build roadmaps, and improve decision quality.
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <MiniTag icon={Target} label="Direction" color={THEME.accent} />
                    <MiniTag icon={LineChart} label="Roadmap" color={THEME.accent3} />
                    <MiniTag icon={Shield} label="Decision quality" color={THEME.accent2} />
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[36px] ring-1 ring-white/10">
                  {/* Replace src with your own asset */}
                  <img
                    src="/a_colored_Woman_Showing_Documents_1390x940_2502_d14330746b.jpg"
                    alt="Expert consultation"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/80 via-[#0B1220]/20 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold tracking-widest text-white/60">OUTCOME</div>
                        <div className="mt-1 text-sm font-semibold text-white">
                          Clarity + strategy + a concrete action plan.
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/75 ring-1 ring-white/10">
                        <MapPin className="h-4 w-4" style={{ color: THEME.accent2 }} {...iconStrongProps} />
                        <span>Online / In-person</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* WHO IT’S FOR */}
      <section id="who" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            eyebrow="WHO THIS IS FOR"
            title="Mentorship designed for"
            accentText="serious outcomes"
            subtitle="Individuals and teams who want structured direction and measurable decision improvement."
          />

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {whoFor.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="relative overflow-hidden rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <div className="shine" />
                  </div>

                  <div className="flex items-start gap-4">
                    <IconBadge color={c.color}>
                      <Icon className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>

                    <div className="flex-1">
                      <div className="text-lg font-semibold text-[#0B1220]">{c.title}</div>
                      <p className="mt-2 text-sm leading-relaxed text-[#0B1220]/70">{c.desc}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">OUTCOME-DRIVEN</div>
                    <a
                      href="#book"
                      className="inline-flex items-center gap-2 rounded-full bg-[#0B1220] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Book <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            eyebrow="HOW IT WORKS"
            title="A clear 4-step process"
            accentText="that builds proof"
            subtitle="Assessment → matching → advisory session → action roadmap."
            dark
          />

          <div className="mt-10 relative">
            <div
              className="absolute left-6 top-7 hidden h-[calc(100%-56px)] w-[2px] sm:block"
              style={{
                background: `linear-gradient(180deg, ${THEME.accent} 0%, rgba(34,211,238,0.10) 100%)`,
              }}
            />
            <div className="grid grid-cols-1 gap-4">
              {processSteps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
                    className="relative rounded-[36px] bg-white/55 p-6 ring-1 ring-[#0B1220]/10"
                  >
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

                    {/* subtle timeline animation */}
                    <motion.div
                      className="pointer-events-none absolute right-7 top-7 h-2 w-2 rounded-full"
                      style={{ background: s.color }}
                      animate={{ opacity: [0.35, 0.9, 0.35], scale: [1, 1.35, 1] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SESSION TYPES */}
      <section id="sessions" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            eyebrow="SESSION TYPES"
            title="Pick the session that fits"
            accentText="your objective"
            subtitle="Select a type, then book or request matching based on your goals."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {sessionTypes.map((s, i) => {
                  const Icon = s.icon;
                  const active = s.key === activeSession;
                  return (
                    <motion.button
                      key={s.key}
                      type="button"
                      onClick={() => setActiveSession(s.key)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.25 }}
                      custom={i}
                      variants={fadeUp}
                      whileHover={{ y: -5 }}
                      className={cx(
                        "text-left relative overflow-hidden rounded-[32px] p-6 ring-1 transition",
                        active ? "ring-[#0B1220]/15" : "ring-[#0B1220]/10"
                      )}
                      style={{
                        background: active ? "rgba(255,255,255,0.70)" : "rgba(255,255,255,0.55)",
                        boxShadow: active ? `0 18px 60px ${accent(0.12)}` : "none",
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <IconBadge color={s.color}>
                            <Icon className="h-5 w-5" {...iconStrongProps} />
                          </IconBadge>
                          <div>
                            <div className="text-sm font-semibold text-[#0B1220]">{s.name}</div>
                            <div className="mt-1 text-xs font-semibold tracking-widest text-[#0B1220]/55">
                              {s.duration.toUpperCase()}
                            </div>
                          </div>
                        </div>
                        {active ? (
                          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1"
                            style={{
                              background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 100%)`,
                              color: "rgba(255,255,255,0.95)",
                              borderColor: "rgba(255,255,255,0.14)",
                              boxShadow: `0 10px 26px ${accent(0.18)}`,
                            }}
                          >
                            Selected <CheckCircle2 className="h-4 w-4" {...iconStrongProps} />
                          </span>
                        ) : (
                          <span className="text-xs font-semibold text-[#0B1220]/50">Select</span>
                        )}
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-[#0B1220]/70" style={clampStyle(3)}>
                        {s.desc}
                      </p>

                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
                        <div className="shine" />
                      </div>
                    </motion.button>
                  );
                })}
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
                <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">SELECTED TYPE</div>
                <div className="mt-2 text-2xl font-semibold leading-tight">{activeSessionObj.name}</div>
                <p className="mt-4 text-sm leading-relaxed text-[#0B1220]/70">{activeSessionObj.desc}</p>

                <div className="mt-6 space-y-3">
                  <Bullet icon={ClockIcon} text={`Duration: ${activeSessionObj.duration}`} color={THEME.accent3} />
                  <Bullet icon={FileCheck2} text="Output: structured action roadmap" color={THEME.accent4} />
                  <Bullet icon={BadgeCheck} text="Expert matching available" color={THEME.accent2} />
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#book"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)`,
                    }}
                  >
                    Book this session <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </a>
                  <a
                    href="#experts"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-[#0B1220] ring-1 ring-[#0B1220]/10 transition hover:bg-white/70"
                    style={{ background: "rgba(255,255,255,0.55)" }}
                  >
                    Browse experts <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </a>
                </div>

                <div
                  className="pointer-events-none absolute -bottom-20 -right-24 h-72 w-72 rounded-full blur-3xl"
                  style={{ background: "rgba(11,18,32,0.07)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTS + FILTER */}
      <section id="experts" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            eyebrow="MEET OUR EXPERTS"
            title="High-trust advisors with"
            accentText="real experience"
            subtitle="Filter by domain and book directly. Verified expert badges available."
            dark
          />

          <div className="mt-10 flex flex-col gap-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {expertFilters.map((f) => {
                  const active = f === filter;
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilter(f)}
                      className={cx(
                        "rounded-full px-4 py-2 text-sm font-semibold ring-1 transition",
                        active ? "text-white" : "text-white/70 hover:bg-white/5",
                        active ? "ring-white/15" : "ring-white/10"
                      )}
                      style={
                        active
                          ? { background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 75%)` }
                          : undefined
                      }
                    >
                      <span className="inline-flex items-center gap-2">
                        {f === "All" ? <Filter className="h-4 w-4" {...iconStrongProps} /> : null}
                        {f}
                      </span>
                    </button>
                  );
                })}
              </div>

              <a
                href="#book"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/5 sm:mt-0"
              >
                Request Matching <ArrowRight className="h-4 w-4" {...iconStrongProps} />
              </a>
            </div>

            {/* Horizontal card rail (same vibe as your programs slider) */}
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

              <div
                ref={sliderRef}
                className="no-scrollbar flex gap-5 overflow-x-auto pb-2"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {filteredExperts.map((e, idx) => (
                  <div key={e.id} style={{ scrollSnapAlign: "start" }}>
                    <ExpertCard expert={e} index={idx} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION + STATS */}
      <section id="value" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div ref={statsInView.ref} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            eyebrow="WHY THIS IS DIFFERENT"
            title="Premium advisory built on"
            accentText="frameworks"
            subtitle="Real industry leaders • European academic advisors • decision-driven approach • no generic advice."
            dark
          />

          <div className="mt-10 relative overflow-hidden rounded-[36px] ring-1 ring-white/10"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
              boxShadow: "0 26px 90px rgba(0,0,0,0.35)",
            }}
          >
            <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(34,211,238,0.16)" }} />
            <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(167,139,250,0.14)" }} />

            <div className="relative p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <ValueBullet icon={BadgeCheck} title="Real industry leaders" desc="Practitioner-grade advice built on real constraints." color={THEME.accent3} />
                <ValueBullet icon={GraduationCap} title="European academic advisors" desc="High-rigor thinking and structured strategy." color={THEME.accent2} />
                <ValueBullet icon={Target} title="Decision-driven approach" desc="Clear options, tradeoffs, and next steps." color={THEME.accent4} />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-0 overflow-hidden rounded-3xl ring-1 ring-white/10 sm:grid-cols-2">
                <StatCell inView={statsInView.inView} label="Experts" value={120} suffix="+" icon={Users} color={THEME.accent} idx={0} />
                <StatCell inView={statsInView.inView} label="Industries" value={18} suffix="+" icon={Globe2} color={THEME.accent2} idx={1} />
                <StatCell inView={statsInView.inView} label="Advisory Sessions" value={1000} suffix="+" icon={FileCheck2} color={THEME.accent4} idx={2} />
                <StatCell inView={statsInView.inView} label="Client Satisfaction" value={92} suffix="%" icon={Star} color={THEME.star} idx={3} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            eyebrow="TESTIMONIALS"
            title="Professional outcomes"
            accentText="people can feel"
            subtitle="Carousel-style—short, direct, high-trust statements."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="relative overflow-hidden rounded-[36px] bg-white/55 p-8 ring-1 ring-[#0B1220]/10 backdrop-blur">
                <div className="pointer-events-none absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, rgba(11,18,32,0.12) 0px, rgba(11,18,32,0.12) 14px, transparent 14px, transparent 30px)",
                  }}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tIdx}
                    initial={{ opacity: 0, y: 10, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.99 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="relative"
                  >
                    <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">CLIENT NOTE</div>
                    <div className="mt-4 text-2xl font-semibold leading-tight text-[#0B1220]">
                      “{testimonials[tIdx].quote}”
                    </div>
                    <div className="mt-5 text-sm font-semibold text-[#0B1220]/70">
                      — {testimonials[tIdx].who}, {testimonials[tIdx].where}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-7 flex items-center gap-2">
                  {testimonials.map((_, i) => {
                    const active = i === tIdx;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setTIdx(i)}
                        className="h-2.5 w-2.5 rounded-full transition"
                        style={{
                          background: active ? THEME.pink : "rgba(11,18,32,0.18)",
                          boxShadow: active ? `0 0 0 6px rgba(201,29,103,0.12)` : "none",
                        }}
                        aria-label={`Testimonial ${i + 1}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div
                className="relative h-full overflow-hidden rounded-[36px] p-7 ring-1 ring-[#0B1220]/10"
                style={{
                  background:
                    "radial-gradient(900px circle at 30% 15%, rgba(255,255,255,0.10), transparent 55%), radial-gradient(900px circle at 80% 70%, rgba(255,255,255,0.06), transparent 55%), rgba(255,255,255,0.55)",
                }}
              >
                <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">WHAT YOU GET</div>
                <div className="mt-2 text-2xl font-semibold leading-tight">
                  A structured plan, not a motivational talk.
                </div>
                <div className="mt-5 space-y-3">
                  <Bullet icon={ClipboardCheck} text="Clear objective definition" color={THEME.accent3} />
                  <Bullet icon={Compass} text="Expert matching" color={THEME.accent2} />
                  <Bullet icon={Briefcase} text="Deep advisory conversation" color={THEME.accent4} />
                  <Bullet icon={FileCheck2} text="Execution roadmap" color={THEME.accent} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="book" className="relative" style={{ background: "rgba(233,231,223,1)", color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            eyebrow="BOOKING"
            title="Book your private mentorship session"
            subtitle="Multi-step form with progress indicator—filters unserious applicants and captures strategic context."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
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
                        Thank you. Your request has been received.
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  {/* progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">PROGRESS</div>
                      <div className="text-xs font-semibold text-[#0B1220]/60">{progressPct}%</div>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full ring-1 ring-[#0B1220]/10" style={{ background: "rgba(255,255,255,0.6)" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPct}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="h-full"
                        style={{
                          background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)`,
                          boxShadow: `0 12px 30px ${accent(0.15)}`,
                        }}
                      />
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      {steps.map((s, i) => {
                        const active = i === step;
                        const done = i < step;
                        return (
                          <div key={s} className="flex items-center gap-2">
                            <div
                              className="grid h-7 w-7 place-items-center rounded-full ring-1"
                              style={{
                                background: done
                                  ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 100%)`
                                  : active
                                  ? "rgba(11,18,32,0.08)"
                                  : "rgba(11,18,32,0.05)",
                                borderColor: "rgba(11,18,32,0.10)",
                                color: done ? "white" : "rgba(11,18,32,0.75)",
                              }}
                            >
                              <span className="text-xs font-black">{i + 1}</span>
                            </div>
                            <div className={cx("text-xs font-semibold", active ? "text-[#0B1220]" : "text-[#0B1220]/55")}>
                              {s}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* step content */}
                  <div className="space-y-5">
                    {step === 0 ? (
                      <>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field label="Full Name" required>
                            <Input
                              icon={BadgeCheck}
                              iconColor={THEME.accent2}
                              value={form.fullName}
                              onChange={(e) => updateField("fullName", e.target.value)}
                              placeholder="Your full name"
                            />
                          </Field>
                          <Field label="Professional Email" required>
                            <Input
                              icon={Globe2}
                              iconColor={THEME.accent}
                              value={form.email}
                              onChange={(e) => updateField("email", e.target.value)}
                              placeholder="name@email.com"
                              type="email"
                            />
                          </Field>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field label="Mobile Number (with country code)" required>
                            <Input
                              icon={Briefcase}
                              iconColor={THEME.accent3}
                              value={form.phone}
                              onChange={(e) => updateField("phone", e.target.value)}
                              placeholder="+49 000 000000"
                            />
                          </Field>
                          <Field label="Current Status" required>
                            <Select
                              icon={Users}
                              iconColor={THEME.accent4}
                              value={form.status}
                              onChange={(v) => updateField("status", v)}
                              options={[
                                "Student",
                                "Recent Graduate",
                                "Working Professional",
                                "Manager / Team Lead",
                                "Executive / C-Level",
                                "Startup Founder",
                                "Organization Representative",
                              ]}
                            />
                          </Field>
                        </div>

                        <Field label="Current Role / Field of Study" required>
                          <Input
                            icon={GraduationCap}
                            iconColor={THEME.accent3}
                            value={form.roleOrStudy}
                            onChange={(e) => updateField("roleOrStudy", e.target.value)}
                            placeholder="e.g., Product Analyst, Computer Science"
                          />
                        </Field>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field label="Industry / Sector">
                            <Select
                              icon={Briefcase}
                              iconColor={THEME.accent}
                              value={form.industry}
                              onChange={(v) => updateField("industry", v)}
                              options={industryOptions}
                            />
                          </Field>

                          <Field label="Years of Experience">
                            <Select
                              icon={LineChart}
                              iconColor={THEME.accent4}
                              value={form.exp}
                              onChange={(v) => updateField("exp", v)}
                              options={["0–1", "1–3", "3–5", "5–10", "10+"]}
                            />
                          </Field>
                        </div>
                      </>
                    ) : null}

                    {step === 1 ? (
                      <>
                        <Field label="What Type of Advisory Are You Seeking?" hint="Multi-select allowed">
                          <div className="flex flex-wrap gap-2">
                            {advisoryOptions.map((o) => {
                              const active = form.advisoryType.includes(o);
                              return (
                                <button
                                  key={o}
                                  type="button"
                                  onClick={() => toggleMulti("advisoryType", o)}
                                  className="rounded-full px-3 py-2 text-xs font-semibold ring-1 transition"
                                  style={{
                                    background: active
                                      ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 100%)`
                                      : "rgba(255,255,255,0.55)",
                                    color: active ? "rgba(255,255,255,0.95)" : "rgba(11,18,32,0.75)",
                                    borderColor: active ? "rgba(255,255,255,0.14)" : "rgba(11,18,32,0.10)",
                                  }}
                                >
                                  {o}
                                </button>
                              );
                            })}
                          </div>
                        </Field>

                        <Field
                          label="Describe Your Main Objective"
                          required
                          hint="What outcome would make this session successful for you?"
                        >
                          <Textarea
                            value={form.objective}
                            onChange={(e) => updateField("objective", e.target.value)}
                            placeholder="Example: I want a roadmap to transition into AI-focused product roles in 90 days."
                          />
                        </Field>

                        <Field label="Key Challenge You’re Facing">
                          <Textarea
                            value={form.challenge}
                            onChange={(e) => updateField("challenge", e.target.value)}
                            placeholder='Example: "I am unsure how to position my experience for AI roles..."'
                          />
                        </Field>
                      </>
                    ) : null}

                    {step === 2 ? (
                      <>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field label="Preferred Session Type" required>
                            <Select
                              icon={Calendar}
                              iconColor={THEME.accent}
                              value={form.sessionType}
                              onChange={(v) => updateField("sessionType", v)}
                              options={[
                                "60-Minute Strategy Session",
                                "90-Minute Deep Advisory Session",
                                "Multi-Session Roadmap (3–5 sessions)",
                                "Corporate Advisory (Team/Company)",
                              ]}
                            />
                          </Field>

                          <Field label="Preferred Mode">
                            <Select
                              icon={Globe2}
                              iconColor={THEME.accent2}
                              value={form.mode}
                              onChange={(v) => updateField("mode", v)}
                              options={["Online (Zoom / Meet)", "In-Person (If Available)"]}
                            />
                          </Field>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field label="Preferred Timeline" required>
                            <Select
                              icon={Compass}
                              iconColor={THEME.accent3}
                              value={form.timeline}
                              onChange={(v) => updateField("timeline", v)}
                              options={["As soon as possible", "Within 2 weeks", "Within 1 month", "Flexible"]}
                            />
                          </Field>

                          <Field label="Time Zone" required>
                            <Input
                              icon={MapPin}
                              iconColor={THEME.accent4}
                              value={form.timezone}
                              onChange={(e) => updateField("timezone", e.target.value)}
                              placeholder="e.g., Europe/Berlin"
                            />
                          </Field>
                        </div>

                        {isOrg ? (
                          <div className="mt-2 rounded-[28px] bg-white/55 p-5 ring-1 ring-[#0B1220]/10">
                            <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">
                              ORGANIZATIONAL DETAILS
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <Field label="Company Name">
                                <Input
                                  icon={Building2}
                                  iconColor={THEME.accent2}
                                  value={form.companyName}
                                  onChange={(e) => updateField("companyName", e.target.value)}
                                  placeholder="Company name"
                                />
                              </Field>

                              <Field label="Company Size">
                                <Select
                                  icon={Users}
                                  iconColor={THEME.accent3}
                                  value={form.companySize}
                                  onChange={(v) => updateField("companySize", v)}
                                  options={["1–10", "10–50", "50–200", "200+"]}
                                />
                              </Field>
                            </div>

                            <Field label="Advisory Focus for Organization">
                              <Select
                                icon={Target}
                                iconColor={THEME.accent4}
                                value={form.orgFocus}
                                onChange={(v) => updateField("orgFocus", v)}
                                options={[
                                  "AI Adoption Strategy",
                                  "Digital Transformation",
                                  "Leadership Development",
                                  "Innovation & Product Strategy",
                                  "Operational Optimization",
                                  "Executive Coaching",
                                ]}
                              />
                            </Field>
                          </div>
                        ) : null}
                      </>
                    ) : null}

                    {step === 3 ? (
                      <>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field label="LinkedIn Profile URL" hint="Optional">
                            <Input
                              icon={RocketIcon}
                              iconColor={THEME.accent2}
                              value={form.linkedin}
                              onChange={(e) => updateField("linkedin", e.target.value)}
                              placeholder="https://linkedin.com/in/"
                            />
                          </Field>

                          <Field label="Have You Previously Worked with a Mentor?">
                            <Select
                              icon={HeartPulse}
                              iconColor={THEME.accent3}
                              value={form.previousMentor}
                              onChange={(v) => updateField("previousMentor", v)}
                              options={["Yes", "No"]}
                            />
                          </Field>
                        </div>

                        <Field label="What Level of Expert Are You Looking For?">
                          <Select
                            icon={BadgeCheck}
                            iconColor={THEME.accent4}
                            value={form.expertLevel}
                            onChange={(v) => updateField("expertLevel", v)}
                            options={[
                              "Industry Practitioner",
                              "European Academic Expert",
                              "Senior Executive",
                              "Open to Recommendation",
                            ]}
                          />
                        </Field>

                        <div className="rounded-[28px] bg-white/55 p-5 ring-1 ring-[#0B1220]/10">
                          <label className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={form.seriousness}
                              onChange={(e) => updateField("seriousness", e.target.checked)}
                              className="mt-1 h-4 w-4"
                            />
                            <div>
                              <div className="text-sm font-semibold text-[#0B1220]">
                                I confirm I am serious about this mentorship session.
                              </div>
                              <div className="mt-1 text-xs text-[#0B1220]/60">
                                This is structured professional advisory (premium, outcome-driven).
                              </div>
                            </div>
                          </label>
                        </div>
                      </>
                    ) : null}
                  </div>

                  {/* actions */}
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={step === 0}
                      className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ring-1 transition disabled:opacity-40"
                      style={{
                        background: "rgba(255,255,255,0.55)",
                        borderColor: "rgba(11,18,32,0.10)",
                        color: "rgba(11,18,32,0.80)",
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" {...iconStrongProps} />
                      Back
                    </button>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("Hook up to scheduling: intro call booking flow.");
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-[#0B1220] ring-1 ring-[#0B1220]/10 transition hover:bg-white/70"
                        style={{ background: "rgba(255,255,255,0.55)" }}
                      >
                        Schedule Intro Call <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                      </a>

                      {step < steps.length - 1 ? (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={nextStep}
                          className="relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition"
                          style={{
                            background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)`,
                          }}
                        >
                          Next <ChevronRight className="ml-1 inline-block h-4 w-4" {...iconStrongProps} />
                          <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 hover:opacity-100">
                            <span className="shine" />
                          </span>
                        </motion.button>
                      ) : (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={submit}
                          className="relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition"
                          style={{
                            background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)`,
                          }}
                        >
                          {submitting ? "Submitting..." : "Request Session"}
                          <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 hover:opacity-100">
                            <span className="shine" />
                          </span>
                        </motion.button>
                      )}
                    </div>
                  </div>

                  <p className="mt-4 text-center text-xs text-[#0B1220]/60">
                    After submission: success message + matching within 24–48 hours.
                  </p>
                </div>
              </motion.div>

              {/* Org add-on */}
              <div className="mt-6 rounded-[32px] bg-white/55 p-6 ring-1 ring-[#0B1220]/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">
                      FOR ORGANIZATIONS
                    </div>
                    <div className="mt-2 text-lg font-semibold text-[#0B1220]">
                      Bulk mentorship & team advisory
                    </div>
                    <p className="mt-2 text-sm text-[#0B1220]/70">
                      Executive advisory for AI transformation, digital strategy, and organizational design.
                    </p>
                  </div>
                  <IconBadge color={THEME.accent2}>
                    <Building2 className="h-5 w-5" {...iconStrongProps} />
                  </IconBadge>
                </div>

                <div className="mt-5">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Hook up to corporate proposal request flow.");
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)`,
                    }}
                  >
                    Request Corporate Proposal <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </a>
                </div>
              </div>
            </div>

            {/* right rail */}
            <div className="lg:col-span-2">
              <div
                className="rounded-[36px] p-7 ring-1 ring-[#0B1220]/10 lg:sticky lg:top-24"
                style={{
                  background:
                    "radial-gradient(900px circle at 30% 15%, rgba(255,255,255,0.10), transparent 55%), radial-gradient(900px circle at 80% 70%, rgba(255,255,255,0.06), transparent 55%), rgba(255,255,255,0.55)",
                }}
              >
                <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">POSITIONING</div>
                <div className="mt-2 text-2xl font-semibold leading-tight">
                  Executive-level advisory, not casual coaching.
                </div>

                <div className="mt-5 space-y-3">
                  <Bullet icon={BadgeCheck} text="Real experts, not influencers" color={THEME.accent3} />
                  <Bullet icon={ClipboardCheck} text="Structured frameworks & roadmaps" color={THEME.accent2} />
                  <Bullet icon={Shield} text="High-trust, decision-grade" color={THEME.accent4} />
                  <Bullet icon={FileCheck2} text="Measurable outcomes" color={THEME.accent} />
                </div>

                <div className="mt-7 rounded-3xl bg-white/55 p-5 ring-1 ring-[#0B1220]/10">
                  <div className="text-sm font-semibold">Tip</div>
                  <p className="mt-2 text-sm text-[#0B1220]/70">
                    Write your objective as a deliverable: “After this session I will have a roadmap for ___ with 3 next actions.”
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-14">
            <SectionTitle eyebrow="FAQ" title="Quick answers" accentText="before you book" subtitle="Accordion style—short and professional." />
            <div className="mt-8 grid grid-cols-1 gap-4">
              {faqs.map((f, i) => {
                const open = i === openFaq;
                return (
                  <div key={f.q} className="rounded-[28px] bg-white/55 p-5 ring-1 ring-[#0B1220]/10">
                    <button
                      type="button"
                      onClick={() => setOpenFaq((p) => (p === i ? -1 : i))}
                      className="flex w-full items-center justify-between gap-4 text-left"
                    >
                      <div className="text-sm font-semibold text-[#0B1220]">{f.q}</div>
                      <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown className="h-5 w-5 text-[#0B1220]/65" {...iconStrongProps} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -6 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -6 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 text-sm text-[#0B1220]/70">{f.a}</div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FINAL CTA */}
          <div className="mt-14">
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
                <div className="text-xs font-semibold text-white/80 sm:text-sm">Premium • Strategic • High-trust</div>
                <div className="mt-3 text-3xl font-semibold md:text-4xl">Clarity changes trajectories.</div>
                <p className="mx-auto mt-4 max-w-4xl text-sm font-medium text-white/80">
                  Book the conversation that moves you forward.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href="#book"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] transition hover:opacity-95"
                  >
                    Book Your Strategy Session <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </a>
                  <a
                    href="#experts"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15"
                  >
                    Browse Experts <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{css}</style>
    </div>
  );
}

/** -------------------------------------------------------
 *  SUB-COMPONENTS
 *  ------------------------------------------------------ */
function MiniTag({ icon: Icon, label, color }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ring-1"
      style={{
        background: "rgba(255,255,255,0.06)",
        borderColor: "rgba(255,255,255,0.12)",
        color: "rgba(255,255,255,0.86)",
      }}
    >
      <Icon className="h-4 w-4" style={{ color }} {...iconStrongProps} />
      {label}
    </span>
  );
}

function ValueBullet({ icon: Icon, title, desc, color }) {
  return (
    <div className="rounded-3xl p-5 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
      <div className="flex items-start gap-3">
        <IconBadge color={color}>
          <Icon className="h-4 w-4" {...iconStrongProps} />
        </IconBadge>
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-sm text-white/65">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function StatCell({ inView, label, value, suffix, icon: Icon, color, idx }) {
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
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.06 }}
      whileHover={{ scale: 1.01 }}
      className={cx("p-5 sm:p-6", border)}
      style={{ background: "rgba(255,255,255,0.03)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 text-xs font-semibold tracking-widest text-white/60">
            <IconBadge color={color}>
              <Icon className="h-4 w-4" {...iconStrongProps} />
            </IconBadge>
            <span>{label.toUpperCase()}</span>
          </div>
          <div className="mt-3 text-4xl font-semibold text-white">
            {inView ? <AnimatedNumber value={value} suffix={suffix} /> : <span>0</span>}
          </div>
          <div className="mt-1 text-sm text-white/70">Measured outcomes</div>
        </div>
        <div className="hidden sm:block">
          <div className="h-12 w-1 rounded-full" style={{ background: color, opacity: 0.65 }} />
        </div>
      </div>
    </motion.div>
  );
}

function ExpertCard({ expert, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: Math.min(index * 0.03, 0.18) }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={cx("group relative w-[360px] md:w-[420px] shrink-0 overflow-hidden rounded-3xl ring-1", "bg-white/5 backdrop-blur")}
      style={{
        borderColor: "rgba(255,255,255,0.10)",
        boxShadow: "0 18px 70px rgba(0,0,0,0.35)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${THEME.accent} 0%, rgba(255,255,255,0.0) 80%)`,
          opacity: 0.7,
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="shine" />
      </div>

      <div className="relative flex h-[420px] flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <IconBadge color={THEME.accent2}>
              <Users className="h-4.5 w-4.5" {...iconStrongProps} />
            </IconBadge>

            {expert.badge ? (
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ring-1"
                style={{
                  background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 100%)`,
                  color: "rgba(255,255,255,0.96)",
                  borderColor: "rgba(255,255,255,0.14)",
                  boxShadow: `0 8px 20px ${accent(0.18)}`,
                }}
              >
                <BadgeCheck className="h-4 w-4" {...iconStrongProps} />
                Verified Expert
              </span>
            ) : (
              <span className="text-xs font-semibold text-white/55">Expert</span>
            )}
          </div>

          <div className="text-right">
            <div className="text-xs font-semibold text-white/55">Experience</div>
            <div className="mt-1 text-sm font-semibold text-white">{expert.years}+ yrs</div>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-lg font-semibold text-white" style={clampStyle(2)}>
            {expert.name}
          </div>
          <div className="mt-1 text-sm text-white/70" style={clampStyle(2)}>
            {expert.title}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/70" style={clampStyle(3)}>
            <span className="text-white/85 font-semibold">Specialization:</span> {expert.specialization}
          </p>
        </div>

        <div className="mt-4">
          <div className="text-xs font-semibold tracking-widest text-white/55">INDUSTRIES</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {expert.industries.slice(0, 4).map((x) => (
              <span
                key={x}
                className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.82)",
                  borderColor: "rgba(255,255,255,0.10)",
                }}
              >
                {x}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition-all hover:bg-white/5"
              onClick={() => alert("Hook up to expert profile route/modal.")}
            >
              View Profile <ChevronRight className="h-4 w-4" {...iconStrongProps} />
            </button>
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
              style={{
                background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)`,
                boxShadow: `0 14px 35px ${accent(0.18)}`,
              }}
            >
              Book <ArrowRight className="h-4 w-4" {...iconStrongProps} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
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

/** -------------------------------------------------------
 *  SMALL ICON HELPERS (so we don't import more)
 *  ------------------------------------------------------ */
function RocketIcon(props) {
  return <Zap {...props} />;
}
function ClockIcon(props) {
  return <Calendar {...props} />;
}

/** -------------------------------------------------------
 *  CSS (same style language as your snippet: streak + shine + scrollbar)
 *  ------------------------------------------------------ */
const css = `
.light-streak{
  position:absolute; inset:-20% -10%;
  background: linear-gradient(120deg, transparent 0%,
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

/* Card shine */
.shine{
  position:absolute; inset:-30% -30%;
  background: linear-gradient(120deg, transparent 0%,
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

.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }

@keyframes gradMove{
  0%{ background-position: 0% 50%; }
  50%{ background-position: 100% 50%; }
  100%{ background-position: 0% 50%; }
}
`;


