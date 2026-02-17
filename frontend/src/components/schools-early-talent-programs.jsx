import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  Briefcase,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Code2,
  Compass,
  Gamepad2,
  Globe2,
  GraduationCap,
  Handshake,
  Lightbulb,
  Lock,
  MessageSquare,
  MonitorSmartphone,
  Paintbrush2,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Users,
  Wand2,
  Wrench,
} from "lucide-react";

/** =========================
 *  THEME (keep SAME palette)
 *  ========================= */
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

function clampStyle(lines) {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
    overflow: "hidden",
  };
}

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

const POWER_ICON_SHELL = {
  background: "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
  border: "1px solid rgba(255,255,255,0.22)",
  boxShadow: "0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.20)",
};

function IconBadge({ color, children, size = 40 }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-2xl ring-1"
      style={{
        ...POWER_ICON_SHELL,
        width: size,
        height: size,
      }}
    >
      <span style={{ color }}>{children}</span>
    </span>
  );
}

function Pill({ label, tone = "dark" }) {
  const dark = tone === "dark";
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
      style={{
        background: dark ? "rgba(255,255,255,0.08)" : "rgba(11,18,32,0.06)",
        color: dark ? "rgba(255,255,255,0.84)" : "rgba(11,18,32,0.78)",
        border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(11,18,32,0.10)",
      }}
    >
      {label}
    </span>
  );
}

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

function SectionTitle({ eyebrow, title, accentText, subtitle, dark = false }) {
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

      <h2 className={cx("mt-5 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl")}>
        {title}{" "}
        {accentText ? (
          <span style={{ color: THEME.pink }} className="whitespace-nowrap">
            {accentText}
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

/** =========================
 *  DATA (from PDF structure)
 *  ========================= */
const AGE_GROUPS = [
  {
    key: "explorers",
    title: "Explorers",
    range: "9-12 Years",
    focus: "Creativity, logic, visual programming, digital confidence",
    designNote: "Colorful but clean - Rounded shapes - Illustration-style visuals",
    icon: Lightbulb,
    accent: THEME.accent,
    learnStyle: ["Gamified lessons", "Visual coding platforms", "Mini project builds", "Team challenges"],
    outputs: [
      "Basic AI chatbot (guided template)",
      "Simple mobile app prototype",
      "Beginner game using visual engines",
      "Interactive website using no-code tools",
      "Creative UI mockups",
    ],
    outcomes: ["Logical thinking", "Digital literacy", "Intro to coding logic", "Creative confidence"],
  },
  {
    key: "builders",
    title: "Builders",
    range: "13-15 Years",
    focus: "Technical foundations + applied projects",
    designNote: "More structured layout - More professional visuals - Learn -> Build transition",
    icon: Wrench,
    accent: THEME.accent3,
    learnStyle: ["Real coding intro", "Simplified data analysis", "Beginner AI models", "Small team collaboration"],
    outputs: [
      "Python mini AI model",
      "Data dashboard with real datasets",
      "Web app with backend integration",
      "Mobile app with API connection",
      "Simple game with logic scripting",
    ],
    outcomes: ["Structured coding", "Data thinking", "Problem-solving frameworks", "Presentation skills"],
  },
  {
    key: "future",
    title: "Future Professionals",
    range: "16-18 Years",
    focus: "Pre-university preparation + portfolio building",
    designNote: "Premium tone - Professional identity - School -> University -> Career progress",
    icon: Rocket,
    accent: THEME.accent2,
    learnStyle: ["Real-world scenarios", "Mentor project sprints", "Demo sessions", "Career exposure"],
    outputs: [
      "AI chatbot with NLP integration",
      "Data analytics project + insights report",
      "Mobile app deployed in test environment",
      "UI/UX portfolio case study",
      "Basic ML model",
      "Digital product prototype",
    ],
    outcomes: ["Portfolio-ready projects", "Pre-university preparation", "Internship readiness", "Career clarity"],
  },
];

const TRACKS = [
  { key: "ai", title: "AI & Machine Learning", desc: "Intro to smart systems + beginner model development.", icon: Brain, accent: THEME.accent4 },
  { key: "game", title: "Game Development", desc: "Build interactive games with logic + creativity.", icon: Gamepad2, accent: THEME.accent },
  { key: "data", title: "Data Analysis", desc: "Read, visualize, interpret real-world data.", icon: ClipboardCheck, accent: THEME.accent3 },
  { key: "web", title: "Web Development", desc: "Build real websites using modern tools.", icon: Code2, accent: THEME.accent2 },
  { key: "ux", title: "UI/UX Design", desc: "Design user-friendly digital experiences.", icon: Paintbrush2, accent: THEME.accent2 },
  { key: "mobile", title: "Mobile App Development", desc: "Create cross-platform mobile applications.", icon: MonitorSmartphone, accent: THEME.accent },
  { key: "chatbot", title: "Chatbot Development", desc: "Build conversational AI assistants.", icon: MessageSquare, accent: THEME.accent4 },
  { key: "robotics", title: "Robotics & Automation", desc: "Program simple robotics logic + automation.", icon: Wand2, accent: THEME.accent3 },
  { key: "safety", title: "Cyber Safety & Digital Security", desc: "Digital protection + ethical tech use.", icon: Lock, accent: THEME.accent2 },
  { key: "creative", title: "Creative Tech & Digital Design", desc: "Blend art + technology for innovation.", icon: Sparkles, accent: THEME.accent },
  { key: "entre", title: "Entrepreneurship for Young Innovators", desc: "Turn ideas into small tech business concepts.", icon: Handshake, accent: THEME.accent3 },
  { key: "lab", title: "Future Tech Exploration Lab", desc: "Explore AR, IoT, smart systems + emerging tech.", icon: Globe2, accent: THEME.accent4 },
];

const DELIVERY_MODELS = [
  {
    title: "School Partnership Model",
    icon: Building2,
    accent: THEME.accent,
    bullets: ["Integrated into curriculum", "After-school programs", "Semester-based structure", "Cohort-based enrollment"],
  },
  {
    title: "Direct Enrollment Model",
    icon: Users,
    accent: THEME.accent2,
    bullets: ["Individual registration", "Online live classes", "Structured weekly schedule", "Parent-friendly onboarding"],
  },
  {
    title: "Innovation Club Model",
    icon: Sparkles,
    accent: THEME.accent3,
    bullets: ["School-based innovation club", "Ongoing project challenges", "Annual showcase events", "Community culture"],
  },
];

const LEARNING_FORMAT = [
  "Online live sessions",
  "Hybrid (school + online)",
  "On-campus delivery",
  "Workshop intensives",
  "Annual summer innovation camp",
  "6-12 weeks per cycle",
  "Monthly / bi-monthly starts",
];

const ACTIVITIES_BEYOND_CODING = [
  { text: "Tech + Art design challenges", icon: Paintbrush2, color: THEME.accent2 },
  { text: "Innovation hackathons", icon: Rocket, color: THEME.accent4 },
  { text: "Mini startup pitch competitions", icon: Briefcase, color: THEME.accent3 },
  { text: "AI storytelling workshops", icon: MessageSquare, color: THEME.accent },
  { text: "Design + robotics integration projects", icon: Wand2, color: THEME.accent3 },
  { text: "Demo Day showcase events for parents", icon: BadgeCheck, color: THEME.accent4 },
];

const TESTIMONIALS = [
  {
    quote: "My daughter built her first AI chatbot at 12. This changed her confidence completely.",
    by: "Parent, Dubai",
    stars: 5,
  },
  {
    quote: "Our students showed remarkable improvement in problem-solving and digital thinking.",
    by: "School Administrator",
    stars: 5,
  },
  {
    quote: "The structured progression by age makes the program extremely impactful.",
    by: "Academic Coordinator",
    stars: 5,
  },
];

/** =========================
 *  SMALL UI PARTS
 *  ========================= */
function StarRow({ count = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cx("h-4 w-4", i < count ? "opacity-100" : "opacity-25")}
          style={{ color: THEME.star, fill: i < count ? THEME.star : "transparent" }}
          strokeWidth={2.2}
        />
      ))}
    </div>
  );
}

function SoftCard({ children, className, style }) {
  return (
    <div
      className={cx("relative overflow-hidden rounded-[36px] ring-1", className)}
      style={{
        borderColor: "rgba(255,255,255,0.10)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
        boxShadow: "0 26px 90px rgba(0,0,0,0.35)",
        ...style,
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="shine" />
      </div>
      {children}
    </div>
  );
}

function Bullet({ icon: Icon, text, color, dark = false }) {
  return (
    <div className="flex items-start gap-3">
      <IconBadge color={color} size={36}>
        <Icon className="h-4 w-4" {...iconStrongProps} />
      </IconBadge>
      <div className={cx("text-sm", dark ? "text-white/75" : "text-[#0B1220]/75")}>{text}</div>
    </div>
  );
}

/** =========================
 *  MODAL (tracks)
 *  ========================= */
function TrackModal({ open, onClose, track }) {
  return (
    <AnimatePresence>
      {open && track ? (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-x-0 top-[6%] z-[90] mx-auto w-[92%] max-w-3xl"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div
              className="relative overflow-hidden rounded-[38px] bg-[#0B1220] p-[1px]"
              style={{
                boxShadow: "0 30px 110px rgba(0,0,0,0.55)",
                background: `linear-gradient(135deg, ${track.accent} 0%, rgba(255,255,255,0.10) 40%, ${accent(0.65)} 100%)`,
              }}
            >
              <div className="relative overflow-hidden rounded-[36px] bg-[#0B1220] p-6 ring-1 ring-white/10 sm:p-7">
                <div
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
                  style={{ background: `rgba(255,255,255,0.08)` }}
                />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <IconBadge color={track.accent}>
                      <track.icon className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                    <div>
                      <div className="text-xs font-semibold tracking-widest text-white/60">CORE TRACK</div>
                      <div className="mt-1 text-xl font-semibold text-white">{track.title}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full px-3 py-2 text-sm font-semibold text-white/70 ring-1 ring-white/15 transition hover:bg-white/5 hover:text-white"
                  >
                    Close
                  </button>
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70">
                  {track.desc} This track is delivered in an age-appropriate way, shifting from guided exploration to real project execution as students
                  progress.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                    <div className="text-xs font-semibold tracking-widest text-white/60">WHAT STUDENTS DO</div>
                    <div className="mt-3 space-y-2">
                      {["Hands-on mini builds", "Team challenges", "Mentor-led demos", "Safe & supervised tools"].map((t) => (
                        <div key={t} className="flex items-start gap-3 text-sm text-white/75">
                          <span className="mt-1 h-2 w-2 rounded-full" style={{ background: track.accent }} />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                    <div className="text-xs font-semibold tracking-widest text-white/60">OUTPUT SIGNALS</div>
                    <div className="mt-3 space-y-2">
                      {["Project artifact", "Presentation confidence", "Progress milestone", "Parents / school visibility"].map((t) => (
                        <div key={t} className="flex items-start gap-3 text-sm text-white/75">
                          <span className="mt-1 h-2 w-2 rounded-full" style={{ background: track.accent }} />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Pill label="Safe curriculum" />
                    <Pill label="Project-based" />
                    <Pill label="Age-structured" />
                    <Pill label="Mentor-guided" />
                  </div>

                  <GradientButton href="#register">Explore Programs</GradientButton>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

/** =========================
 *  TESTIMONIAL SLIDER
 *  ========================= */
function Testimonials() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIdx((v) => (v + 1) % TESTIMONIALS.length), 5200);
    return () => clearInterval(id);
  }, [reduce]);

  const t = TESTIMONIALS[idx];

  return (
    <div className="mt-10">
      <div className="relative overflow-hidden rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">WHAT PARENTS & SCHOOLS SAY</div>
            <div className="mt-2 text-xl font-semibold text-[#0B1220]">Real feedback from real classrooms</div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => setIdx((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="rounded-full p-2 ring-1 ring-[#0B1220]/10 transition hover:bg-[#0B1220]/5"
            >
              <ChevronLeft className="h-5 w-5" {...iconStrongProps} />
            </button>
            <button
              type="button"
              onClick={() => setIdx((v) => (v + 1) % TESTIMONIALS.length)}
              className="rounded-full p-2 ring-1 ring-[#0B1220]/10 transition hover:bg-[#0B1220]/5"
            >
              <ChevronRight className="h-5 w-5" {...iconStrongProps} />
            </button>
          </div>
        </div>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.99 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-3xl bg-white/70 p-6 ring-1 ring-[#0B1220]/10"
            >
              <StarRow count={t.stars} />
              <div className="mt-3 text-base font-semibold text-[#0B1220]" style={clampStyle(4)}>
                "{t.quote}"
              </div>
              <div className="mt-3 text-sm text-[#0B1220]/60">{t.by}</div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex items-center justify-between">
            <div className="text-xs text-[#0B1220]/55">
              {idx + 1} / {TESTIMONIALS.length}
            </div>
            <div className="flex items-center gap-2 sm:hidden">
              <button
                type="button"
                onClick={() => setIdx((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="rounded-full p-2 ring-1 ring-[#0B1220]/10 transition hover:bg-[#0B1220]/5"
              >
                <ChevronLeft className="h-5 w-5" {...iconStrongProps} />
              </button>
              <button
                type="button"
                onClick={() => setIdx((v) => (v + 1) % TESTIMONIALS.length)}
                className="rounded-full p-2 ring-1 ring-[#0B1220]/10 transition hover:bg-[#0B1220]/5"
              >
                <ChevronRight className="h-5 w-5" {...iconStrongProps} />
              </button>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                className="h-2 flex-1 rounded-full transition"
                style={{
                  background: i === idx ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.70)} 100%)` : "rgba(11,18,32,0.10)",
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** =========================
 *  FORM (multi-step)
 *  ========================= */
const INTEREST_OPTIONS = [
  "AI & Machine Learning",
  "Game Development",
  "Data Analysis",
  "Web Development",
  "UI/UX Design",
  "Mobile App Development",
  "Chatbots",
  "Robotics & Automation",
  "Cyber Safety",
  "Entrepreneurship",
  "Innovation Club",
  "Not Sure - Need Guidance",
];

function Field({ label, required, hint, children, dark = false }) {
  return (
    <div className="group block">
      <div className="mb-2 flex items-center justify-between">
        <div className={cx("text-sm font-semibold", dark ? "text-white" : "text-[#0B1220]")}>
          {label} {required ? <span style={{ color: THEME.pink }}>*</span> : null}
        </div>
        {hint ? <div className={cx("text-xs", dark ? "text-white/55" : "text-[#0B1220]/55")}>{hint}</div> : null}
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
    </div>
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
          <option key={o} value={o} className="text-black">
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

function Textarea({ dark = false, ...props }) {
  return (
    <textarea
      {...props}
      className={cx(
        "w-full rounded-2xl px-4 py-3 text-sm outline-none ring-1 transition",
        dark
          ? "bg-white/5 text-white placeholder:text-white/35 ring-white/10 hover:ring-white/20 focus:ring-2 focus:ring-[rgba(34,211,238,0.35)]"
          : "bg-white/60 text-[#0B1220] placeholder:text-[#0B1220]/40 ring-[#0B1220]/10 hover:ring-[#0B1220]/20 focus:ring-2 focus:ring-[rgba(34,211,238,0.35)]"
      )}
      rows={4}
    />
  );
}

function StepPill({ i, active, label }) {
  return (
    <div
      className={cx("flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ring-1 transition")}
      style={{
        background: active ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.70)} 100%)` : "rgba(255,255,255,0.06)",
        borderColor: active ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.10)",
        color: active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.70)",
      }}
    >
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/20 ring-1 ring-white/10">{i}</span>
      <span>{label}</span>
    </div>
  );
}

function RegistrationForm() {
  const reduce = useReducedMotion();
  const [role, setRole] = useState("School / Institution");
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    schoolName: "",
    contactName: "",
    position: "Principal",
    email: "",
    phone: "",
    city: "",
    country: "",

    parentName: "",
    childAge: "9-12",

    studentName: "",
    studentAge: "",
    grade: "",

    interests: [],
    format: "Online Live Program",
    timeline: "Within 1 Month",
    message: "",
    consent: false,
  });

  const positions = ["Principal", "Academic Coordinator", "Teacher", "Innovation Lead", "Other"];
  const roleOptions = ["School / Institution", "Parent", "Student (16+)"];
  const ageBands = ["9-12", "13-15", "16-18"];
  const formats = ["Online Live Program", "School-Based Program", "After-School Club", "Summer Camp", "I'm Not Sure"];
  const timelines = ["Start Immediately", "Within 1 Month", "Next Academic Term", "Just Exploring Options"];

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const toggleInterest = (x) => {
    setForm((s) => {
      const exists = s.interests.includes(x);
      return { ...s, interests: exists ? s.interests.filter((i) => i !== x) : [...s.interests, x] };
    });
  };

  const canNext = useMemo(() => {
    if (step === 1) {
      if (role === "School / Institution") return form.schoolName && form.contactName && form.email;
      if (role === "Parent") return form.parentName && form.email;
      return form.studentName && form.studentAge && form.email;
    }
    if (step === 2) return form.interests.length > 0;
    if (step === 3) return form.consent && form.email;
    return true;
  }, [step, role, form]);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2600);
      setStep(1);
      // Hook your API here
    }, reduce ? 0 : 700);
  };

  return (
    <div className="mt-10">
      <div className="relative overflow-hidden rounded-[40px] p-[1px]" style={{ background: "rgba(255,255,255,0.10)", boxShadow: "0 26px 90px rgba(0,0,0,0.35)" }}>
        <div className="relative overflow-hidden rounded-[36px] bg-[#0B1220] p-7 ring-1 ring-white/10">
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(34,211,238,0.14)" }} />
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(167,139,250,0.12)" }} />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/75 ring-1 ring-white/10">
                <Sparkles className="h-4 w-4" style={{ color: THEME.accent }} {...iconStrongProps} />
                <span>REGISTRATION</span>
              </div>
              <div className="mt-4 text-2xl font-semibold text-white">Start the Journey</div>
              <div className="mt-2 max-w-2xl text-sm text-white/65">Tell us who you are, and we'll guide you to the right program.</div>
            </div>

            <div className="flex flex-wrap gap-2">
              <StepPill i={1} active={step === 1} label="Who + Basics" />
              <StepPill i={2} active={step === 2} label="Interests" />
              <StepPill i={3} active={step === 3} label="Preferences" />
            </div>
          </div>

          <div className="mt-7">
            <div className="flex flex-wrap gap-2">
              {roleOptions.map((r) => {
                const active = role === r;
                return (
                  <motion.button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRole(r);
                      setStep(1);
                    }}
                    whileHover={{ y: -1, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="rounded-full px-4 py-2 text-sm font-semibold ring-1 transition"
                    style={{
                      background: active ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.70)} 100%)` : "rgba(255,255,255,0.06)",
                      borderColor: active ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.10)",
                      color: active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.70)",
                    }}
                  >
                    {r}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <form onSubmit={submit} className="mt-6">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="grid grid-cols-1 gap-4"
                >
                  {role === "School / Institution" ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="School Name" required dark>
                        <Input dark icon={Building2} iconColor={THEME.accent} value={form.schoolName} onChange={(e) => update("schoolName", e.target.value)} placeholder="School name" />
                      </Field>
                      <Field label="Contact Person Name" required dark>
                        <Input dark icon={Users} iconColor={THEME.accent2} value={form.contactName} onChange={(e) => update("contactName", e.target.value)} placeholder="Full name" />
                      </Field>
                      <Field label="Position" dark>
                        <Select dark icon={Briefcase} iconColor={THEME.accent3} value={form.position} onChange={(v) => update("position", v)} options={positions} />
                      </Field>
                      <Field label="Email Address" required dark>
                        <Input dark icon={Globe2} iconColor={THEME.accent} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="name@email.com" type="email" />
                      </Field>
                      <Field label="Phone Number" dark>
                        <Input dark icon={Shield} iconColor={THEME.accent4} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+000 0000 0000" />
                      </Field>
                      <Field label="City / Country" dark>
                        <Input dark icon={Compass} iconColor={THEME.accent2} value={`${form.city}${form.country ? ", " + form.country : ""}`} onChange={(e) => {
                          const v = e.target.value;
                          const parts = v.split(",").map((x) => x.trim());
                          update("city", parts[0] || "");
                          update("country", parts[1] || "");
                        }} placeholder="City, Country" />
                      </Field>
                    </div>
                  ) : role === "Parent" ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Parent Full Name" required dark>
                        <Input dark icon={Users} iconColor={THEME.accent2} value={form.parentName} onChange={(e) => update("parentName", e.target.value)} placeholder="Your name" />
                      </Field>
                      <Field label="Email Address" required dark>
                        <Input dark icon={Globe2} iconColor={THEME.accent} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="name@email.com" type="email" />
                      </Field>
                      <Field label="Phone Number" dark>
                        <Input dark icon={Shield} iconColor={THEME.accent4} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+000 0000 0000" />
                      </Field>
                      <Field label="Child's Age" dark>
                        <Select dark icon={GraduationCap} iconColor={THEME.accent3} value={form.childAge} onChange={(v) => update("childAge", v)} options={ageBands} />
                      </Field>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Full Name" required dark>
                        <Input dark icon={Users} iconColor={THEME.accent2} value={form.studentName} onChange={(e) => update("studentName", e.target.value)} placeholder="Your name" />
                      </Field>
                      <Field label="Age" required dark>
                        <Input dark icon={Calendar} iconColor={THEME.accent4} value={form.studentAge} onChange={(e) => update("studentAge", e.target.value)} placeholder="16-18" />
                      </Field>
                      <Field label="Email" required dark>
                        <Input dark icon={Globe2} iconColor={THEME.accent} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="name@email.com" type="email" />
                      </Field>
                      <Field label="Phone Number" dark>
                        <Input dark icon={Shield} iconColor={THEME.accent3} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+000 0000 0000" />
                      </Field>
                      <Field label="Current Grade" dark>
                        <Input dark icon={GraduationCap} iconColor={THEME.accent2} value={form.grade} onChange={(e) => update("grade", e.target.value)} placeholder="e.g., Grade 11" />
                      </Field>
                    </div>
                  )}

                  <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs text-white/55">Keep it simple - we'll follow up with the right recommendations.</div>
                    <motion.button
                      type="button"
                      disabled={!canNext}
                      whileHover={{ scale: canNext ? 1.01 : 1 }}
                      whileTap={{ scale: canNext ? 0.99 : 1 }}
                      onClick={() => setStep(2)}
                      className={cx(
                        "relative overflow-hidden rounded-full px-5 py-3 text-sm font-semibold text-white ring-1 transition",
                        canNext ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                      )}
                      style={{
                        background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)`,
                        borderColor: "rgba(255,255,255,0.14)",
                      }}
                    >
                      Continue
                      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 hover:opacity-100">
                        <span className="shine" />
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              ) : null}

              {step === 2 ? (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                    <div className="text-xs font-semibold tracking-widest text-white/60">WHAT ARE YOU INTERESTED IN?</div>
                    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {INTEREST_OPTIONS.map((x) => {
                        const active = form.interests.includes(x);
                        return (
                          <button
                            type="button"
                            key={x}
                            onClick={() => toggleInterest(x)}
                            className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold ring-1 transition"
                            style={{
                              background: active ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.05)",
                              borderColor: active ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.10)",
                              color: active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)",
                            }}
                          >
                            <span>{x}</span>
                            <span className="h-2 w-2 rounded-full" style={{ background: active ? THEME.accent : "rgba(255,255,255,0.18)" }} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="rounded-full px-4 py-2 text-sm font-semibold text-white/70 ring-1 ring-white/15 transition hover:bg-white/5 hover:text-white"
                    >
                      Back
                    </button>

                    <motion.button
                      type="button"
                      disabled={!canNext}
                      whileHover={{ scale: canNext ? 1.01 : 1 }}
                      whileTap={{ scale: canNext ? 0.99 : 1 }}
                      onClick={() => setStep(3)}
                      className={cx(
                        "relative overflow-hidden rounded-full px-5 py-3 text-sm font-semibold text-white ring-1 transition",
                        canNext ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                      )}
                      style={{
                        background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)`,
                        borderColor: "rgba(255,255,255,0.14)",
                      }}
                    >
                      Continue
                      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 hover:opacity-100">
                        <span className="shine" />
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              ) : null}

              {step === 3 ? (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="grid grid-cols-1 gap-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Preferred Format" dark>
                      <Select dark icon={Compass} iconColor={THEME.accent3} value={form.format} onChange={(v) => update("format", v)} options={formats} />
                    </Field>
                    <Field label="Timeline" dark>
                      <Select dark icon={Calendar} iconColor={THEME.accent4} value={form.timeline} onChange={(v) => update("timeline", v)} options={timelines} />
                    </Field>
                  </div>

                  <Field label="Message (Optional)" hint="Max ~300 characters" dark>
                    <Textarea dark value={form.message} onChange={(e) => update("message", e.target.value.slice(0, 300))} placeholder="Tell us your goals or what you're looking for." />
                  </Field>

                  <label className="flex items-start gap-3 rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => update("consent", e.target.checked)}
                      className="mt-1 h-4 w-4 accent-[rgba(201,29,103,0.9)]"
                    />
                    <div>
                      <div className="text-sm font-semibold text-white">Consent</div>
                      <div className="mt-1 text-sm text-white/65">I agree to be contacted regarding program details.</div>
                    </div>
                  </label>

                  <div className="mt-1 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="rounded-full px-4 py-2 text-sm font-semibold text-white/70 ring-1 ring-white/15 transition hover:bg-white/5 hover:text-white"
                    >
                      Back
                    </button>

                    <motion.button
                      type="submit"
                      disabled={!canNext || submitting}
                      whileHover={{ scale: canNext && !submitting ? 1.01 : 1 }}
                      whileTap={{ scale: canNext && !submitting ? 0.99 : 1 }}
                      className={cx(
                        "relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white ring-1 transition",
                        canNext && !submitting ? "" : "cursor-not-allowed opacity-60"
                      )}
                      style={{
                        background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)`,
                        borderColor: "rgba(255,255,255,0.14)",
                      }}
                    >
                      <span className="relative z-10">{submitting ? "Submitting..." : "Explore Programs"}</span>
                      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 hover:opacity-100">
                        <span className="shine" />
                      </span>
                    </motion.button>
                  </div>

                  <div className="mt-3 text-xs text-white/55">We'll respond within 24-48 hours.</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </form>

          <AnimatePresence>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.99 }}
                className="pointer-events-none absolute right-6 top-6 rounded-full px-4 py-2 text-xs font-semibold ring-1"
                style={{
                  background: "rgba(52,211,153,0.18)",
                  borderColor: "rgba(52,211,153,0.30)",
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                Submitted - we'll reach out soon
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/** =========================
 *  MAIN PAGE
 *  ========================= */
export default function SchoolsEarlyTalentLanding() {
  const heroIcons = [
    { Icon: Brain, label: "AI", color: THEME.accent4 },
    { Icon: Code2, label: "Code", color: THEME.accent },
    { Icon: Lightbulb, label: "Ideas", color: THEME.accent2 },
    { Icon: MessageSquare, label: "Chatbots", color: THEME.accent3 },
  ];

  const [trackOpen, setTrackOpen] = useState(false);
  const [activeTrackKey, setActiveTrackKey] = useState(TRACKS[0].key);
  const activeTrack = useMemo(() => TRACKS.find((t) => t.key === activeTrackKey), [activeTrackKey]);

  const { ref: impactRef, inView: impactInView } = useInViewOnce(0.25);

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
              <span className="text-sm font-black tracking-widest">S</span>
            </div>
            <div>
              <div className="text-sm font-semibold">Schools & Early Talent</div>
              <div className="text-xs text-white/60">From curiosity to capability</div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            <Anchor href="#overview" label="Overview" />
            <Anchor href="#why" label="Why This Matters" />
            <Anchor href="#pathway" label="Age Pathway" />
            <Anchor href="#tracks" label="Tracks" />
            <Anchor href="#delivery" label="Delivery" />
            <Anchor href="#register" label="Register" />
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#tracks"
              className="hidden rounded-full px-4 py-2 text-sm font-semibold text-white/70 ring-1 ring-white/15 transition hover:bg-white/5 md:inline-flex"
            >
              Explore Tracks
            </a>
            <GradientButton href="#register">Partner With Us</GradientButton>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="overview" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/75 ring-1 ring-white/10">
              <GraduationCap className="h-4 w-4" style={{ color: THEME.sand }} {...iconStrongProps} />
              <span>FOR ORGANIZATIONS &rarr; SCHOOLS</span>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              Shaping Tomorrow's Innovators -
              <br />
              <span style={{ color: THEME.pink }}>From Curiosity to Capability</span>
            </h1>

            <p className="mt-5 max-w-xl text-balance text-base text-white/70 sm:text-lg">
              Early exposure to AI, technology, and innovation for students aged <span className="font-semibold text-white">9-18</span>.
            </p>

            <p className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-white/65">
              We design structured, age-appropriate programs that transform curiosity into real skills - preparing the next generation for a digital future.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GradientButton href="#register">Partner With Us</GradientButton>
              <GradientButton href="#tracks" variant="secondary">
                Explore Programs
              </GradientButton>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill label="Age-appropriate" />
              <Pill label="Safe & supervised" />
              <Pill label="Project-based" />
              <Pill label="Monthly intakes" />
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-white/65">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <Shield className="h-4 w-4" style={{ color: THEME.accent3 }} {...iconStrongProps} />
                <span>Secure learning environments</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <BadgeCheck className="h-4 w-4" style={{ color: THEME.accent4 }} {...iconStrongProps} />
                <span>Structured progression</span>
              </div>
            </div>
          </motion.div>

          {/* HERO VISUAL */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
            className="relative"
          >
            <div className="relative mx-auto min-h-[520px] w-full max-w-[560px] overflow-hidden rounded-[44px] ring-1 ring-white/10 sm:aspect-[4/3] sm:min-h-0">
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                }}
              />
              <div className="pointer-events-none absolute -left-20 -top-16 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(34,211,238,0.12)" }} />
              <div className="pointer-events-none absolute -right-16 -bottom-16 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(167,139,250,0.12)" }} />

              <svg className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block" viewBox="0 0 560 420" fill="none">
                <motion.path
                  d="M164 120 C 240 102, 278 110, 336 120"
                  stroke={accent(0.65)}
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0.2, opacity: 0.2 }}
                  animate={{ pathLength: [0.2, 1, 0.2], opacity: [0.2, 0.85, 0.2] }}
                  transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                />
                <motion.path
                  d="M164 120 C 158 182, 166 214, 164 258"
                  stroke="rgba(34,211,238,0.65)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0.2, opacity: 0.2 }}
                  animate={{ pathLength: [0.2, 1, 0.2], opacity: [0.2, 0.85, 0.2] }}
                  transition={{ duration: 5.4, ease: "easeInOut", repeat: Infinity, delay: 0.4 }}
                />
                <motion.path
                  d="M336 120 C 350 188, 354 224, 344 258"
                  stroke="rgba(52,211,153,0.62)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0.2, opacity: 0.2 }}
                  animate={{ pathLength: [0.2, 1, 0.2], opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 6.6, ease: "easeInOut", repeat: Infinity, delay: 0.8 }}
                />
                <motion.path
                  d="M164 258 C 240 276, 276 276, 344 258"
                  stroke="rgba(167,139,250,0.58)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0.2, opacity: 0.2 }}
                  animate={{ pathLength: [0.2, 1, 0.2], opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 6.1, ease: "easeInOut", repeat: Infinity, delay: 0.55 }}
                />
              </svg>

              {[
                { x: heroIcons[0], left: 78, top: 72, delay: 0 },
                { x: heroIcons[1], left: 256, top: 72, delay: 0.15 },
                { x: heroIcons[2], left: 78, top: 212, delay: 0.3 },
                { x: heroIcons[3], left: 256, top: 212, delay: 0.45 },
              ].map((n, i) => (
                <motion.div
                  key={`node-chip-${n.x.label}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 + i * 0.08 }}
                  className="absolute hidden rounded-3xl bg-white/5 px-4 py-3 ring-1 ring-white/12 backdrop-blur sm:block"
                  style={{ left: n.left, top: n.top, boxShadow: "0 14px 44px rgba(0,0,0,0.26)" }}
                >
                  <div className="flex items-center gap-3">
                    <IconBadge color={n.x.color} size={34}>
                      <n.x.Icon className="h-4 w-4" {...iconStrongProps} />
                    </IconBadge>
                    <div className="text-sm font-semibold text-white">{n.x.label}</div>
                  </div>
                  <motion.span
                    className="pointer-events-none absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full"
                    style={{ background: n.x.color, boxShadow: `0 0 14px ${n.x.color}` }}
                    animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: n.delay }}
                  />
                </motion.div>
              ))}

              <div className="absolute inset-x-4 top-5 grid grid-cols-1 gap-2 sm:hidden">
                {heroIcons.map((x) => (
                  <div
                    key={`mobile-${x.label}`}
                    className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/12 backdrop-blur"
                    style={{ boxShadow: "0 12px 36px rgba(0,0,0,0.24)" }}
                  >
                    <div className="flex items-center gap-3">
                      <IconBadge color={x.color} size={32}>
                        <x.Icon className="h-4 w-4" {...iconStrongProps} />
                      </IconBadge>
                      <div className="text-sm font-semibold text-white">{x.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-4 left-4 right-4 rounded-3xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-white/60">VISUAL DIRECTION</div>
                    <div className="mt-1 text-sm font-semibold text-white">Connected live system - playful motion, structured layout.</div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/75 ring-1 ring-white/10">
                    <Sparkles className="h-4 w-4" style={{ color: THEME.accent2 }} {...iconStrongProps} />
                    <span>Animated connection map</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            eyebrow="WHY EARLY TECHNOLOGY EDUCATION MATTERS"
            title="The Future Starts Earlier Than You Think"
            subtitle="By 2030, digital and AI skills will be essential across almost every profession - the goal is not just to use technology, but to create it."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <IconBadge color={THEME.accent}>
                  <Lightbulb className="h-5 w-5" {...iconStrongProps} />
                </IconBadge>
                <div>
                  <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">THE SHIFT</div>
                  <div className="mt-1 text-lg font-semibold">Curiosity becomes capability</div>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#0B1220]/70">
                Students move from passive consumption to active creation - building problem-solving habits and creative confidence early.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { t: "Computational thinking", c: THEME.accent },
                  { t: "Problem-solving skills", c: THEME.accent3 },
                  { t: "Logical reasoning", c: THEME.accent2 },
                  { t: "Responsible AI use", c: THEME.accent4 },
                ].map((x) => (
                  <div key={x.t} className="rounded-3xl bg-white/70 p-4 ring-1 ring-[#0B1220]/10">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#0B1220]">
                      <span className="h-2 w-2 rounded-full" style={{ background: x.c }} />
                      <span>{x.t}</span>
                    </div>
                    <div className="mt-2 text-xs text-[#0B1220]/60">Built through projects, not lectures.</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Split visual: Curiosity -> Capability (animated) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
              className="relative overflow-hidden rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">VISUAL STORY</div>
                  <div className="mt-1 text-lg font-semibold">Curiosity &rarr; Capability</div>
                </div>

                <div className="rounded-full bg-[#0B1220] px-3 py-2 text-xs font-semibold text-white">Animated transition</div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden rounded-3xl bg-white/70 p-4 ring-1 ring-[#0B1220]/10">
                  <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">LEFT</div>
                  <div className="mt-2 text-sm font-semibold text-[#0B1220]">Exploring</div>
                  <div className="mt-2 text-xs text-[#0B1220]/60">Child experimenting with a tablet / kit.</div>
                  <div className="mt-4 h-28 rounded-2xl bg-[#0B1220]/5" />
                  <div className="pointer-events-none absolute inset-0 opacity-25">
                    <div className="soft-sweep" />
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-3xl bg-white/70 p-4 ring-1 ring-[#0B1220]/10">
                  <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">RIGHT</div>
                  <div className="mt-2 text-sm font-semibold text-[#0B1220]">Presenting</div>
                  <div className="mt-2 text-xs text-[#0B1220]/60">Same student demoing a small project.</div>
                  <div className="mt-4 h-28 rounded-2xl bg-[#0B1220]/5" />
                  <div className="pointer-events-none absolute inset-0 opacity-25">
                    <div className="soft-sweep" style={{ animationDelay: "1.4s" }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl bg-white/70 p-5 ring-1 ring-[#0B1220]/10">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-[#0B1220]">Transition</div>
                  <div className="text-xs font-semibold text-[#0B1220]/60">Animated label</div>
                </div>

                <div className="mt-4">
                  <div className="relative h-3 overflow-hidden rounded-full bg-[#0B1220]/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.70)} 100%)` }}
                      initial={{ width: "18%" }}
                      whileInView={{ width: "86%" }}
                      viewport={{ once: true, amount: 0.45 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                    <div className="pointer-events-none absolute inset-0 opacity-40">
                      <div className="progress-shine" />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs font-semibold text-[#0B1220]/70">
                    <span>Curiosity</span>
                    <span>Capability</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AGE PATHWAY */}
      <section id="pathway" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            eyebrow="AGE-BASED LEARNING PATHWAY"
            title="Structured Learning by Age"
            accentText="& cognitive development"
            subtitle="A clear pathway from playful exploration to portfolio-ready outputs."
            dark
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {AGE_GROUPS.map((g, i) => {
              const Icon = g.icon;
              return (
                <motion.div
                  key={g.key}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.05 }}
                  whileHover={{ y: -6, rotate: i === 1 ? 0.3 : -0.2, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-[36px] bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur"
                  style={{ boxShadow: "0 18px 70px rgba(0,0,0,0.35)" }}
                >
                  <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${g.accent} 0%, rgba(255,255,255,0.0) 80%)` }} />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="shine" />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <IconBadge color={g.accent}>
                        <Icon className="h-5 w-5" {...iconStrongProps} />
                      </IconBadge>
                      <div>
                        <div className="text-xs font-semibold tracking-widest text-white/60">{g.range}</div>
                        <div className="mt-1 text-lg font-semibold text-white">{g.title}</div>
                      </div>
                    </div>
                    <Pill label="Age track" />
                  </div>

                  <div className="mt-5">
                    <div className="text-xs font-semibold tracking-widest text-white/55">FOCUS</div>
                    <div className="mt-2 text-sm text-white/75">{g.focus}</div>

                    <div className="mt-4 text-xs font-semibold tracking-widest text-white/55">LEARNING STYLE</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {g.learnStyle.map((x) => (
                        <Pill key={x} label={x} />
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="text-xs font-semibold tracking-widest text-white/55">SAMPLE OUTPUTS</div>
                    <div className="mt-3 space-y-2">
                      {g.outputs.slice(0, 4).map((x) => (
                        <div key={x} className="flex items-start gap-3 text-sm text-white/75">
                          <span className="mt-1 h-2 w-2 rounded-full" style={{ background: g.accent }} />
                          <span>{x}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="text-xs font-semibold tracking-widest text-white/55">SKILL OUTCOMES</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {g.outcomes.map((x) => (
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
                    <div className="mt-4 text-xs text-white/55">{g.designNote}</div>
                  </div>

                  {g.key === "future" ? (
                    <div className="mt-5 rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
                      <div className="text-xs font-semibold tracking-widest text-white/55">PROGRESSION</div>
                      <div className="mt-3">
                        <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)` }}
                            initial={{ width: "12%" }}
                            whileInView={{ width: "95%" }}
                            viewport={{ once: true, amount: 0.45 }}
                            transition={{ duration: 1.3, ease: "easeOut" }}
                          />
                          <div className="pointer-events-none absolute inset-0 opacity-35">
                            <div className="progress-shine" />
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-xs font-semibold text-white/65">
                          <span>School</span>
                          <span>University</span>
                          <span>Career</span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRACKS */}
      <section id="tracks" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            eyebrow="PROGRAM TRACKS"
            title="Core Technology Tracks"
            subtitle="12 core fields displayed as animated cards. Click to view details in a modal."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRACKS.map((t, i) => (
              <motion.button
                key={t.key}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: Math.min(i * 0.03, 0.18) }}
                whileHover={{ y: -6, rotate: (i % 2 === 0 ? -0.2 : 0.2), scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  setActiveTrackKey(t.key);
                  setTrackOpen(true);
                }}
                className="group relative overflow-hidden rounded-[30px] bg-white/55 p-6 text-left ring-1 ring-[#0B1220]/10 backdrop-blur"
              >
                <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${t.accent} 0%, rgba(11,18,32,0.0) 80%)` }} />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="soft-sweep" />
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <IconBadge color={t.accent}>
                      <t.icon className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                    <div>
                      <div className="text-sm font-semibold text-[#0B1220]">{t.title}</div>
                      <div className="mt-1 text-xs text-[#0B1220]/60">Tap for details</div>
                    </div>
                  </div>

                  <span className="rounded-full bg-[#0B1220]/5 px-3 py-1 text-xs font-semibold text-[#0B1220]/70 ring-1 ring-[#0B1220]/10">
                    Track
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#0B1220]/70" style={clampStyle(3)}>
                  {t.desc}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill label="Hands-on" tone="light" />
                  <Pill label="Safe tools" tone="light" />
                  <Pill label="Projects" tone="light" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <TrackModal open={trackOpen} onClose={() => setTrackOpen(false)} track={activeTrack} />

      {/* DELIVERY + FORMAT + ACTIVITIES */}
      <section id="delivery" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            eyebrow="DELIVERY MODELS"
            title="Flexible implementation"
            accentText="for schools & families"
            subtitle="Choose a model that fits your context - curriculum, club, or direct enrollment."
            dark
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {DELIVERY_MODELS.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.06 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-[36px] bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur"
                  style={{ boxShadow: "0 18px 70px rgba(0,0,0,0.35)" }}
                >
                  <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${m.accent} 0%, rgba(255,255,255,0.0) 80%)` }} />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="shine" />
                  </div>

                  <div className="flex items-center gap-3">
                    <IconBadge color={m.accent}>
                      <Icon className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                    <div>
                      <div className="text-xs font-semibold tracking-widest text-white/60">MODEL</div>
                      <div className="mt-1 text-lg font-semibold text-white">{m.title}</div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    {m.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-3 text-sm text-white/75">
                        <span className="mt-1 h-2 w-2 rounded-full" style={{ background: m.accent }} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="rounded-[36px] bg-white/5 p-7 ring-1 ring-white/10 backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <IconBadge color={THEME.accent2}>
                  <Compass className="h-5 w-5" {...iconStrongProps} />
                </IconBadge>
                <div>
                  <div className="text-xs font-semibold tracking-widest text-white/60">LEARNING FORMAT</div>
                  <div className="mt-1 text-lg font-semibold text-white">Multiple formats - same outcomes</div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {LEARNING_FORMAT.map((x) => (
                  <Pill key={x} label={x} />
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                <div className="text-xs font-semibold tracking-widest text-white/60">DURATION</div>
                <div className="mt-2 text-sm text-white/75">6-12 weeks per cycle - starts monthly or bi-monthly.</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
              className="relative overflow-hidden rounded-[36px] bg-white/5 p-7 ring-1 ring-white/10 backdrop-blur"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-[0.35]" style={{ border: "1px solid rgba(255,255,255,0.10)" }} />
              <div className="flex items-center gap-3">
                <IconBadge color={THEME.accent4}>
                  <Sparkles className="h-5 w-5" {...iconStrongProps} />
                </IconBadge>
                <div>
                  <div className="text-xs font-semibold tracking-widest text-white/60">BEYOND CODING</div>
                  <div className="mt-1 text-lg font-semibold text-white">Creativity matters at this age</div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {ACTIVITIES_BEYOND_CODING.map((a) => (
                  <Bullet key={a.text} icon={a.icon} text={a.text} color={a.color} dark />
                ))}
              </div>

              <div className="pointer-events-none absolute -bottom-20 -right-24 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(255,255,255,0.08)" }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SHOWCASE + SAFETY + TESTIMONIALS + IMPACT */}
      <section className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div ref={impactRef} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            eyebrow="SHOWCASE & SUPERVISION"
            title="From learning to presenting"
            subtitle="Students present final projects to mentors, parents, and school representatives - with optional excellence recognition."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <IconBadge color={THEME.accent4}>
                  <BadgeCheck className="h-5 w-5" {...iconStrongProps} />
                </IconBadge>
                <div>
                  <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">DEMO DAY</div>
                  <div className="mt-1 text-lg font-semibold">A real milestone, not a worksheet</div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {["Mentor + instructor review", "Parents invited to observe", "School visibility & alignment", "Certificates for top performance"].map((x) => (
                  <div key={x} className="flex items-start gap-3 text-sm text-[#0B1220]/75">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ background: THEME.accent4 }} />
                    <span>{x}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-3xl bg-white/70 p-5 ring-1 ring-[#0B1220]/10">
                <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">OPTIONAL PATHWAYS</div>
                <div className="mt-2 text-sm text-[#0B1220]/70">
                  Top-performing students can receive an Advanced Track Invitation and (16+) Early Internship Pathway.
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
              className="rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <IconBadge color={THEME.accent3}>
                  <Shield className="h-5 w-5" {...iconStrongProps} />
                </IconBadge>
                <div>
                  <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">SAFETY & SUPERVISION</div>
                  <div className="mt-1 text-lg font-semibold">Safe, structured & supervised</div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "Age-appropriate curriculum",
                  "Monitored digital platforms",
                  "Secure collaboration tools",
                  "Certified instructors",
                  "European academic & industry supervision model",
                ].map((x) => (
                  <div key={x} className="flex items-start gap-3 text-sm text-[#0B1220]/75">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ background: THEME.accent3 }} />
                    <span>{x}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-3xl bg-white/70 p-5 ring-1 ring-[#0B1220]/10">
                <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">RESPONSIBLE AI</div>
                <div className="mt-2 text-sm text-[#0B1220]/70">Students learn ethical use, digital safety, and responsible creation.</div>
              </div>
            </motion.div>
          </div>

          <Testimonials />

          {/* Impact numbers */}
          <div className="mt-10 rounded-[36px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">IMPACT NUMBERS</div>
                <div className="mt-2 text-xl font-semibold text-[#0B1220]">Animated counters</div>
              </div>

              <div className="rounded-full bg-[#0B1220] px-3 py-2 text-xs font-semibold text-white">Verified impact</div>
            </div>

            <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-3xl ring-1 ring-[#0B1220]/10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Young learners trained", value: 1500, suffix: "+", icon: GraduationCap, color: THEME.accent },
                { label: "Partner schools", value: 40, suffix: "+", icon: Building2, color: THEME.accent3 },
                { label: "Technology tracks", value: 12, suffix: "", icon: Code2, color: THEME.accent4 },
                { label: "Student satisfaction", value: 90, suffix: "%", icon: BadgeCheck, color: THEME.accent2 },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={impactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-5"
                    style={{
                      background: "rgba(255,255,255,0.55)",
                      borderRight: i < 3 ? "1px solid rgba(11,18,32,0.10)" : "none",
                      borderBottom: i < 2 ? "1px solid rgba(11,18,32,0.10)" : "none",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-3 text-xs font-semibold tracking-widest text-[#0B1220]/60">
                          <IconBadge color={s.color} size={34}>
                            <Icon className="h-4 w-4" {...iconStrongProps} />
                          </IconBadge>
                          <span>{s.label.toUpperCase()}</span>
                        </div>
                        <div className="mt-3 text-3xl font-semibold text-[#0B1220]">
                          {impactInView ? <AnimatedNumber value={s.value} suffix={s.suffix} /> : <span>0</span>}
                        </div>
                        <div className="mt-1 text-sm text-[#0B1220]/65">Measured across cohorts.</div>
                      </div>

                      <div className="hidden sm:block">
                        <div className="h-12 w-1 rounded-full" style={{ background: s.color, opacity: 0.65 }} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Closing */}
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
                  backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)",
                }}
              />
              <div className="relative mx-auto max-w-6xl text-white">
                <div className="text-xs font-semibold text-white/80 sm:text-sm">Technology literacy is foundational - not optional.</div>
                <div className="mt-3 text-3xl font-semibold md:text-4xl">
                  Empower the next generation to become confident creators.
                </div>
                <p className="mx-auto mt-4 max-w-4xl text-sm font-medium text-white/80">
                  We help students move from passive users to capable builders - with safe supervision and structured, age-based progression.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href="#register"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] transition hover:opacity-95"
                  >
                    Start a School Partnership <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </a>
                  <a
                    href="#register"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15"
                  >
                    Explore Programs for Your Child <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Registration */}
          <div id="register" className="mt-12">
            <SectionTitle
              eyebrow="SCHOOLS & EARLY TALENT - REGISTRATION FORM"
              title="Start the Journey"
              subtitle="Smooth step transitions - max 5-6 visible fields - simple validation (email required)."
            />
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <a
        href="#register"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:inline-flex"
        style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)` }}
      >
        <Building2 className="h-4 w-4" {...iconStrongProps} />
        Partner / Register
      </a>

      <style>{css}</style>
    </div>
  );
}

/** =========================
 *  CSS (enhanced motion layers)
 *  ========================= */
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

  .soft-sweep{
    position:absolute;
    inset:-30% -30%;
    background: linear-gradient(120deg,
      transparent 0%,
      rgba(11,18,32,0.05) 35%,
      rgba(11,18,32,0.12) 45%,
      transparent 60%);
    transform: translateX(-25%) rotate(-10deg);
    filter: blur(1px);
    animation: softSweepMove 6.2s ease-in-out infinite;
    opacity: 0.45;
  }
  @keyframes softSweepMove{
    0%{ transform: translateX(-35%) rotate(-10deg); }
    50%{ transform: translateX(22%) rotate(-10deg); }
    100%{ transform: translateX(-35%) rotate(-10deg); }
  }

  .progress-shine{
    position:absolute;
    inset:-40% -40%;
    background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.25) 45%, transparent 70%);
    transform: translateX(-120%) rotate(-10deg);
    animation: progressShine 2.9s ease-in-out infinite;
    opacity: 0.35;
  }
  @keyframes progressShine{
    0%, 58%, 100%{ transform: translateX(-120%) rotate(-10deg); }
    78%{ transform: translateX(120%) rotate(-10deg); }
  }

  .micro-streak{
    position:absolute;
    inset:-40% -40%;
    background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.14) 45%, transparent 70%);
    transform: translateX(-120%) rotate(-10deg);
    animation: microStreak 4.2s ease-in-out infinite;
  }
  @keyframes microStreak{
    0%, 65%, 100%{ transform: translateX(-120%) rotate(-10deg); }
    82%{ transform: translateX(120%) rotate(-10deg); }
  }
`;

