import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  Flame,
  Globe2,
  GraduationCap,
  LineChart,
  MapPin,
  Shield,
  Sparkles,
  Target,
  Zap,
  Laptop,
  PenTool,
  Megaphone,
  Handshake,
  ListChecks,
  Rocket,
  Wallet,
  Boxes,
  HeartPulse,
} from "lucide-react";

/* ---------------- THEME (kept from your code) ---------------- */
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

function useScrollProgress() {
  const reduce = useReducedMotion();
  const [p, setP] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const onScroll = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
      const next = Math.min(1, Math.max(0, doc.scrollTop / max));
      setP(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce]);

  return p;
}

function AnimatedNumber({ value, suffix, durationMs = 900 }) {
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

/* ---------------- UI atoms ---------------- */
const POWER_ICON_SHELL = {
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
  border: "1px solid rgba(255,255,255,0.22)",
  boxShadow:
    "0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.20)",
};

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

function GradientButton({ children, href, onClick, variant = "primary" }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const primary =
    "text-white shadow-[0_14px_38px_rgba(34,211,238,0.16)] hover:translate-y-[-1px] active:translate-y-[0px]";
  const secondary =
    "bg-transparent text-white ring-1 ring-white/20 hover:bg-white/5";
  const stylePrimary = {
    background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(
      0.82
    )} 55%, ${accent(0.58)} 120%)`,
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
        {accentWord ? (
          <span style={{ color: THEME.pink }}>{accentWord}</span>
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

function GlowDivider({ dark }) {
  return (
    <div className="mx-auto mt-10 max-w-7xl px-5">
      <div
        className="h-[1px] w-full"
        style={{
          background: dark
            ? `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 30%, rgba(255,255,255,0.14) 70%, transparent 100%)`
            : `linear-gradient(90deg, transparent 0%, rgba(11,18,32,0.14) 30%, rgba(11,18,32,0.14) 70%, transparent 100%)`,
        }}
      />
    </div>
  );
}

/* ---------------- Data (from the PDF page) ---------------- */
const IMPACT = [
  { label: "Participants Completed Programs", value: 1200, suffix: "+", icon: GraduationCap, color: THEME.accent },
  { label: "Reported Career Progress Within 6 Months", value: 85, suffix: "%", icon: LineChart, color: THEME.accent4 },
  { label: "Portfolio Projects Delivered", value: 300, suffix: "+", icon: FileCheck2, color: THEME.accent3 },
  { label: "Partner Institutions & Companies", value: 40, suffix: "+", icon: Handshake, color: THEME.accent2 },
  { label: "Countries Represented", value: 18, suffix: "+", icon: Globe2, color: THEME.accent },
];

const STORIES = [
  {
    key: "omar",
    name: "Omar H.",
    background: "Computer Science Student",
    program: "Software Development Internship",
    location: "Technology Track",
    accent: THEME.accent,
    icon: Zap,
    before: "Strong theoretical foundation but no production experience.",
    during:
      "Built a full-stack web system deployed to cloud infrastructure under expert supervision.",
    outcome: "Secured Junior Backend Developer role within 4 months.",
    quote: "“The project experience changed how I think about system architecture.”",
  },
  {
    key: "sara",
    name: "Sara M.",
    background: "Business Graduate",
    program: "Business Consulting Internship",
    location: "Business & Strategy",
    accent: THEME.accent2,
    icon: Target,
    before: "Academic knowledge without real client exposure.",
    during:
      "Delivered a strategic growth plan for a mid-size company case simulation with expert evaluation.",
    outcome: "Joined consulting firm as Associate Analyst.",
    quote: "“For the first time, I presented real strategic recommendations.”",
  },
  {
    key: "ahmed",
    name: "Ahmed K.",
    background: "Engineering Graduate",
    program: "AI & Machine Learning Internship",
    location: "AI & Data",
    accent: THEME.accent4,
    icon: Flame,
    before: "Basic ML understanding without deployment experience.",
    during:
      "Built and deployed AI-powered application with performance optimization.",
    outcome: "Accepted into AI startup team.",
    quote: "“Deploying my own AI model made the difference.”",
  },
];

const TESTIMONIALS = [
  "“The feedback loop felt like working in a real company.”",
  "“I gained confidence through structured mentorship.”",
  "“My portfolio now proves what I can do.”",
  "“Clear milestones made the process professional.”",
];

const GERMANY_EVENTS = [
  { label: "Final project presentation", icon: FileCheck2, color: THEME.accent },
  { label: "Workshop with European experts", icon: Sparkles, color: THEME.accent2 },
  { label: "Company ecosystem visits", icon: Building2, color: THEME.accent3 },
  { label: "Munich professional exposure", icon: MapPin, color: THEME.accent4 },
];

const CAREER_METRICS = [
  { label: "Job Offers Secured", icon: Briefcase, color: THEME.accent3 },
  { label: "Promotions Achieved", icon: BadgeCheck, color: THEME.accent2 },
  { label: "Startups Launched", icon: Rocket, color: THEME.accent4 },
  { label: "Consulting Projects Delivered", icon: ClipboardCheck, color: THEME.accent },
  { label: "Research Papers Developed", icon: PenTool, color: THEME.accent2 },
];

/* ---------------- Components ---------------- */
function MotionBlob({ className, style, delay = 0, duration = 12 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cx("pointer-events-none absolute rounded-full blur-3xl", className)}
      style={style}
      animate={
        reduce
          ? undefined
          : {
              y: [0, -22, 0],
              x: [0, 18, 0],
              scale: [1, 1.06, 1],
              opacity: [0.6, 0.75, 0.6],
            }
      }
      transition={
        reduce
          ? undefined
          : {
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }
      }
    />
  );
}

function Avatar({ name, accentColor }) {
  const initials = useMemo(() => {
    const parts = name.split(" ").filter(Boolean);
    const a = parts[0]?.[0] || "P";
    const b = parts[1]?.[0] || "X";
    return (a + b).toUpperCase();
  }, [name]);

  return (
    <div
      className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-3xl ring-1"
      style={{
        borderColor: "rgba(255,255,255,0.14)",
        background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.16), transparent 55%),
                     linear-gradient(135deg, ${accentColor} 0%, rgba(255,255,255,0.08) 80%)`,
        boxShadow: `0 20px 55px rgba(0,0,0,0.28)`,
      }}
    >
      <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)" }} />
      <div className="relative text-sm font-black tracking-widest text-white">{initials}</div>
    </div>
  );
}

function StatGrid({ inView }) {
  return (
    <div className="rounded-[36px] border border-white/10 bg-[#0D162B]/80 p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {IMPACT.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.05 }}
              className="rounded-2xl bg-[#111C34] p-4 ring-1 ring-white/10"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-white/65">
                  <Icon className="h-4 w-4" style={{ color: s.color }} {...iconStrongProps} />
                  <span>{s.label}</span>
                </div>
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
              </div>
              <div className="mt-3 text-3xl font-bold text-white">
                {inView ? <AnimatedNumber value={s.value} suffix={s.suffix} /> : <span>0</span>}
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-white/10">
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: `${Math.min(100, 40 + idx * 12)}%`, background: s.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-5 text-sm text-white/70">
We track outcomes — not attendance.      </div>
    </div>
  );
}
function useDragScroll(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const down = (e) => {
      isDown = true;
      startX = (e.pageX || e.touches?.[0]?.pageX || 0) - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const leave = () => {
      isDown = false;
    };
    const up = () => {
      isDown = false;
    };
    const move = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = (e.pageX || e.touches?.[0]?.pageX || 0) - el.offsetLeft;
      const walk = (x - startX) * 1.15;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", down);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("mouseup", up);
    el.addEventListener("mousemove", move);

    el.addEventListener("touchstart", down, { passive: true });
    el.addEventListener("touchend", up);
    el.addEventListener("touchmove", move, { passive: false });

    return () => {
      el.removeEventListener("mousedown", down);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("mouseup", up);
      el.removeEventListener("mousemove", move);

      el.removeEventListener("touchstart", down);
      el.removeEventListener("touchend", up);
      el.removeEventListener("touchmove", move);
    };
  }, [ref]);
}

function StoryCard({ story, index, onOpen }) {
  const Icon = story.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: Math.min(index * 0.06, 0.18) }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={cx(
        "group relative w-[360px] md:w-[420px] shrink-0 overflow-hidden rounded-3xl ring-1",
        "bg-white/5 backdrop-blur"
      )}
      style={{
        borderColor: "rgba(255,255,255,0.10)",
        boxShadow: "0 18px 70px rgba(0,0,0,0.35)",
      }}
    >
      {/* top accent */}
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${story.accent} 0%, rgba(255,255,255,0.0) 80%)`,
          opacity: 0.9,
        }}
      />
      {/* hover shine */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="shine" />
      </div>

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar name={story.name} accentColor={story.accent} />
            <div>
              <div className="text-sm font-semibold text-white">{story.name}</div>
              <div className="text-xs text-white/65">{story.background}</div>
            </div>
          </div>
          <IconBadge color={story.accent}>
            <Icon className="h-4.5 w-4.5" {...iconStrongProps} />
          </IconBadge>
        </div>

        <div className="mt-5 rounded-3xl p-4 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="text-xs font-semibold tracking-widest text-white/55">PROGRAM</div>
          <div className="mt-1 text-sm font-semibold text-white" style={clampStyle(2)}>
            {story.program}
          </div>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs font-semibold text-white/75 ring-1 ring-white/10">
            <MapPin className="h-4 w-4" style={{ color: story.accent }} {...iconStrongProps} />
            <span>{story.location}</span>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <MiniBlock title="Before" text={story.before} icon={Compass} color={story.accent} />
          <MiniBlock title="During" text={story.during} icon={ListChecks} color={story.accent} />
          <MiniBlock title="Outcome" text={story.outcome} icon={BadgeCheck} color={story.accent} />
        </div>

        <div className="mt-5 rounded-3xl p-4 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="text-xs font-semibold tracking-widest text-white/55">QUOTE</div>
          <div className="mt-2 text-sm text-white/80" style={clampStyle(3)}>
            {story.quote}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onOpen(story)}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition-all hover:bg-white/5"
          >
            Expand story <ChevronRight className="h-4 w-4" {...iconStrongProps} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function MiniBlock({ title, text, icon: Icon, color }) {
  return (
    <div className="rounded-3xl p-4 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
      <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-white/55">
        <Icon className="h-4 w-4" style={{ color }} {...iconStrongProps} />
        <span>{title.toUpperCase()}</span>
      </div>
      <div className="mt-2 text-sm text-white/75">{text}</div>
    </div>
  );
}

function StoryModal({ story, onClose }) {
  const reduce = useReducedMotion();
  const Icon = story?.icon;

  return (
    <AnimatePresence>
      {story ? (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[90] grid place-items-center p-4"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div
              className="relative w-full max-w-3xl overflow-hidden rounded-[40px] ring-1"
              style={{
                borderColor: "rgba(255,255,255,0.14)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
                boxShadow: "0 40px 140px rgba(0,0,0,0.55)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.22]" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)" }} />
              <MotionBlob
                className="-left-32 -top-32 h-80 w-80"
                style={{ background: "rgba(34,211,238,0.14)" }}
                delay={0.05}
                duration={14}
              />
              <MotionBlob
                className="-right-32 -bottom-32 h-80 w-80"
                style={{ background: "rgba(201,29,103,0.14)" }}
                delay={0.1}
                duration={16}
              />

              <div className="relative p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={story.name} accentColor={story.accent} />
                    <div>
                      <div className="text-base font-semibold text-white">{story.name}</div>
                      <div className="mt-1 text-sm text-white/70">{story.background}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-white/70 ring-1 ring-white/15 transition hover:bg-white/5 hover:text-white"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <div className="rounded-[32px] p-5 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-white/55">
                        <Icon className="h-4 w-4" style={{ color: story.accent }} {...iconStrongProps} />
                        <span>PROGRAM COMPLETED</span>
                      </div>
                      <div className="mt-2 text-lg font-semibold text-white">{story.program}</div>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs font-semibold text-white/75 ring-1 ring-white/10">
                        <MapPin className="h-4 w-4" style={{ color: story.accent }} {...iconStrongProps} />
                        <span>{story.location}</span>
                      </div>

                      <GlowDivider dark />

                      <div className="mt-5 space-y-4">
                        <DetailRow title="Before" icon={Compass} color={story.accent} text={story.before} />
                        <DetailRow title="During" icon={ListChecks} color={story.accent} text={story.during} />
                        <DetailRow title="Outcome" icon={BadgeCheck} color={story.accent} text={story.outcome} />
                      </div>

                      <div className="mt-6 rounded-3xl p-5 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <div className="text-xs font-semibold tracking-widest text-white/55">PARTICIPANT QUOTE</div>
                        <div className="mt-2 text-base font-medium text-white/85">{story.quote}</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="rounded-[32px] p-5 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <div className="text-xs font-semibold tracking-widest text-white/55">PROOF SIGNALS</div>
                      <div className="mt-4 space-y-3">
                        <ProofChip icon={FileCheck2} label="Portfolio-ready deliverables" color={THEME.accent3} />
                        <ProofChip icon={ClipboardCheck} label="Expert evaluation loops" color={THEME.accent2} />
                        <ProofChip icon={Shield} label="Production discipline" color={THEME.accent4} />
                        <ProofChip icon={Briefcase} label="Hiring-aligned outcomes" color={THEME.accent} />
                      </div>

                      <div className="mt-6 rounded-3xl p-4 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <div className="text-xs font-semibold tracking-widest text-white/55">NEXT STEP</div>
                        <p className="mt-2 text-sm text-white/70">
                          Want results like this? Start with execution — end with opportunity.
                        </p>
                        <div className="mt-4">
                          <GradientButton href="#apply">Apply Now</GradientButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {!reduce ? (
                  <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
                    <div className="aurora" />
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function DetailRow({ title, icon: Icon, color, text }) {
  return (
    <div className="rounded-3xl p-4 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
      <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-white/55">
        <Icon className="h-4 w-4" style={{ color }} {...iconStrongProps} />
        <span>{title.toUpperCase()}</span>
      </div>
      <div className="mt-2 text-sm text-white/75">{text}</div>
    </div>
  );
}

function ProofChip({ icon: Icon, label, color }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl p-4 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
      <IconBadge color={color}>
        <Icon className="h-4 w-4" {...iconStrongProps} />
      </IconBadge>
      <div className="text-sm font-semibold text-white/80">{label}</div>
    </div>
  );
}

function TestimonialsMasonry() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setActive((x) => (x + 1) % TESTIMONIALS.length);
    }, 2600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative">
      {/* rotating spotlight */}
      {!reduce ? (
        <motion.div
          className="pointer-events-none absolute -top-10 left-1/2 h-40 w-[820px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: `linear-gradient(90deg, rgba(34,211,238,0.16), ${accent(0.12)}, rgba(167,139,250,0.16))` }}
          animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.05, 1] }}
          transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      <div className="rounded-[36px] p-6 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="text-xs font-semibold tracking-widest text-white/55">SPOTLIGHT</div>
        <div className="mt-3 text-2xl font-semibold leading-tight text-white">
          What participants say <span style={{ color: THEME.pink }}>in one line</span>.
        </div>
        <div className="mt-4 rounded-3xl p-5 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="text-base font-medium text-white/85"
            >
              {TESTIMONIALS[active]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function MapRoute() {
  const reduce = useReducedMotion();
  return (
    <div className="relative overflow-hidden rounded-[36px] ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
      <div className="relative p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="mt-2 text-sm text-white/70">
              Selected high-performing teams were invited for a premium, outcome-driven exposure.
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-white/75 ring-1 ring-white/10">
            <Globe2 className="h-4 w-4" style={{ color: THEME.accent2 }} {...iconStrongProps} />
            <span>Germany</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-[32px] p-5 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="text-xs font-semibold tracking-widest text-white/55">INVITE INCLUDES</div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {GERMANY_EVENTS.map((e) => {
                  const Icon = e.icon;
                  return (
                    <div key={e.label} className="flex items-center gap-3 rounded-3xl p-4 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <IconBadge color={e.color}>
                        <Icon className="h-4 w-4" {...iconStrongProps} />
                      </IconBadge>
                      <div className="text-sm font-semibold text-white/85">{e.label}</div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <QuoteChip text="“It was my first time presenting to international experts.”" />
                <QuoteChip text="“The exposure gave me confidence to apply globally.”" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="relative h-full overflow-hidden rounded-[32px] p-5 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>

              <div className="mt-4 rounded-3xl p-4 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                <svg viewBox="0 0 520 220" className="h-[180px] w-full">
                  <defs>
                    <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={THEME.accent} stopOpacity="0.95" />
                      <stop offset="55%" stopColor={THEME.pink} stopOpacity="0.85" />
                      <stop offset="100%" stopColor={THEME.accent2} stopOpacity="0.95" />
                    </linearGradient>
                    <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* backdrop */}
                  <path
                    d="M40,170 C120,70 210,210 300,110 C360,40 430,60 480,45"
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />

                  {/* animated route */}
                  <motion.path
                    d="M40,170 C120,70 210,210 300,110 C360,40 430,60 480,45"
                    fill="none"
                    stroke="url(#routeGrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    filter="url(#softGlow)"
                    initial={{ pathLength: 0, opacity: 0.9 }}
                    animate={reduce ? { pathLength: 1 } : { pathLength: [0, 1] }}
                    transition={reduce ? { duration: 0 } : { duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.2 }}
                  />

                  {/* nodes */}
                  {[
                    { x: 40, y: 170, c: THEME.accent },
                    { x: 300, y: 110, c: THEME.pink },
                    { x: 480, y: 45, c: THEME.accent2 },
                  ].map((p, i) => (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="10" fill={p.c} opacity="0.22" />
                      <circle cx={p.x} cy={p.y} r="5" fill={p.c} opacity="0.92" />
                    </g>
                  ))}
                </svg>

                {!reduce ? (
                  <motion.div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "radial-gradient(300px circle at 30% 20%, rgba(34,211,238,0.10), transparent 60%), radial-gradient(260px circle at 75% 60%, rgba(167,139,250,0.10), transparent 60%)" }}
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : null}
              </div>

              <div className="mt-4 rounded-3xl p-4 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {!reduce ? (
          <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
            <div className="aurora" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function QuoteChip({ text }) {
  return (
    <div className="rounded-3xl p-4 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
      <div className="text-sm font-semibold text-white/80">{text}</div>
    </div>
  );
}

function InstitutionPanel() {
  const blocks = [
    {
      title: "University Case",
      icon: GraduationCap,
      color: THEME.accent,
      partner: "European Partner University",
      challenge: "Students lacked applied execution exposure.",
      solution: "Integrated Praktix internships into academic semester.",
      results: ["70% of participating students built deployable portfolios", "Increased employability metrics"],
    },
    {
      title: "Corporate Case",
      icon: Building2,
      color: THEME.accent3,
      partner: "Technology Firm",
      challenge: "Need structured junior talent pipeline.",
      solution: "Co-hosted industry internship.",
      results: ["5 participants hired", "Reduced onboarding time"],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {blocks.map((b, idx) => {
        const Icon = b.icon;
        return (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.06 }}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-[36px] p-6 ring-1 ring-white/10"
            style={{
              background: "rgba(255,255,255,0.03)",
              boxShadow: "0 24px 90px rgba(0,0,0,0.28)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.10]" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)" }} />
            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <IconBadge color={b.color}>
                    <Icon className="h-5 w-5" {...iconStrongProps} />
                  </IconBadge>
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-white/55">IMPACT FOR</div>
                    <div className="mt-1 text-lg font-semibold text-white">{b.title}</div>
                  </div>
                </div>
               
              </div>

              <div className="mt-5 space-y-3">
                <InfoRow label="Partner" value={b.partner} color={b.color} />
                <InfoRow label="Challenge" value={b.challenge} color={b.color} />
                <InfoRow label="Solution" value={b.solution} color={b.color} />
              </div>

              <div className="mt-5 rounded-3xl p-5 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="text-xs font-semibold tracking-widest text-white/55">RESULTS</div>
                <div className="mt-3 space-y-2">
                  {b.results.map((r) => (
                    <div key={r} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full ring-1"
                        style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.10)" }}>
                        <span className="h-2 w-2 rounded-full bg-white/90" />
                      </span>
                      <div className="text-sm text-white/80">{r}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function InfoRow({ label, value, color }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl p-4 ring-1 ring-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
      <IconBadge color={color}>
        <BadgeCheck className="h-4 w-4" {...iconStrongProps} />
      </IconBadge>
      <div>
        <div className="text-xs font-semibold tracking-widest text-white/55">{label.toUpperCase()}</div>
        <div className="mt-1 text-sm font-semibold text-white/85">{value}</div>
      </div>
    </div>
  );
}

function CareerMetricGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {CAREER_METRICS.map((m, i) => {
        const Icon = m.icon;
        return (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: Math.min(i * 0.04, 0.18) }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="relative overflow-hidden rounded-[32px] p-5 ring-1 ring-white/10"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div className="shine" />
            </div>
            <div className="relative flex items-start gap-3">
              <IconBadge color={m.color}>
                <Icon className="h-4 w-4" {...iconStrongProps} />
              </IconBadge>
              <div>
                <div className="mt-1 text-sm font-semibold text-white/85" style={clampStyle(2)}>
                  {m.label}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ---------------- Main Page ---------------- */
export default function SuccessTestimonialsPage() {
  const progress = useScrollProgress();
  const impact = useInViewOnce(0.25);
  const reduce = useReducedMotion();
  const realPhrases = ["participants", "execution", "career movement"];

  const sliderRef = useRef(null);
  useDragScroll(sliderRef);

  const [activeStory, setActiveStory] = useState(null);
  const [activeRealPhrase, setActiveRealPhrase] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setActiveRealPhrase((x) => (x + 1) % realPhrases.length);
    }, 1900);
    return () => clearInterval(id);
  }, [reduce, realPhrases.length]);

  const scrollSlider = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    const dx = dir === "left" ? -420 : 420;
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

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
      {/* top progress bar */}
      <div className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent">
        <motion.div
          className="h-full"
          style={{
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${THEME.accent} 0%, ${THEME.pink} 55%, ${THEME.accent2} 100%)`,
            boxShadow: `0 0 18px ${accent(0.22)}`,
          }}
          animate={{ opacity: progress > 0.02 ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* decorative global background */}
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
            maskImage:
              "radial-gradient(900px circle at 30% 20%, rgba(0,0,0,1), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 opacity-55">
          <div className="light-streak" />
        </div>
        <div className="absolute inset-0 opacity-[0.10]">
          <div className="aurora" />
        </div>
      </div>

      {/* HERO */}
      <section id="overview" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-14 pt-8 lg:grid-cols-2 lg:pb-20 lg:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <h1 className="mt-2 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              Results Speak <br />
              Louder Than Promises.
            </h1>

            <div className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">
              <div className="inline-flex items-baseline gap-2">
                <span className="whitespace-nowrap">Real</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeRealPhrase}
                    initial={{ opacity: 0, y: 8, filter: "blur(1px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(1px)" }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="whitespace-nowrap"
                  >
                    {realPhrases[activeRealPhrase]}.
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <p className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-white/65">
              Every story begins with a project — and ends with measurable growth.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GradientButton href="#stories">Explore Stories</GradientButton>
              <GradientButton href="#impact" variant="secondary">
                View Impact Metrics
              </GradientButton>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-white/65">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <FileCheck2 className="h-4 w-4" style={{ color: THEME.accent3 }} {...iconStrongProps} />
                <span>Outcome-driven proof</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <LineChart className="h-4 w-4" style={{ color: THEME.accent4 }} {...iconStrongProps} />
                <span>Measurable movement</span>
              </div>
            </div>
          </motion.div>

          {/* hero visual */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, ease: "easeOut", delay: 0.05 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(900px circle at 10% 10%, rgba(34,211,238,0.15), transparent 55%), radial-gradient(900px circle at 90% 90%, rgba(167,139,250,0.14), transparent 55%)",
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-white/60">LIVE STORY SIGNALS</div>
                    <div className="mt-1 text-xl font-semibold text-white">Proof timeline from active cohorts</div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white/80 ring-1 ring-white/10">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Updated now
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    { title: "Case Study Published", meta: "Data Track Cohort 12", ago: "3m", color: THEME.accent },
                    { title: "Mentor Validation Complete", meta: "AI Internship Cohort 8", ago: "11m", color: THEME.accent3 },
                    { title: "Hiring Outcome Logged", meta: "Business Consulting Track", ago: "27m", color: THEME.accent4 },
                  ].map((row) => (
                    <div key={row.title} className="flex items-center justify-between rounded-2xl bg-[#0D162B] p-4 ring-1 ring-white/10">
                      <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: row.color }} />
                        <div>
                          <div className="text-sm font-semibold text-white">{row.title}</div>
                          <div className="text-xs text-white/60">{row.meta}</div>
                        </div>
                      </div>
                      <span className="text-xs text-white/55">{row.ago}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[#0D162B] p-4 ring-1 ring-white/10">
                    <div className="text-xs font-semibold tracking-widest text-white/55">VERIFIED THIS MONTH</div>
                    <div className="mt-2 text-2xl font-bold text-white">126</div>
                    <div className="text-xs text-cyan-300">story artifacts</div>
                  </div>
                  <div className="rounded-2xl bg-[#0D162B] p-4 ring-1 ring-white/10">
                    <div className="text-xs font-semibold tracking-widest text-white/55">HIRING SIGNALS</div>
                    <div className="mt-2 text-2xl font-bold text-white">38</div>
                    <div className="text-xs text-emerald-300">validated outcomes</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div ref={impact.ref} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Measured Progress"
            accentWord="Across Programs"
            dark
          />
          <div className="mt-10">
            <StatGrid inView={impact.inView} />
          </div>
        </div>
      </section>

      {/* FEATURED CASE STUDIES */}
      <section id="stories" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Stories that show"
            accentWord="real movement"
            dark
          />

          <div className="mt-10">
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
                style={{ scrollSnapType: "x mandatory", cursor: "grab" }}
              >
                {STORIES.map((s, idx) => (
                  <div key={s.key} style={{ scrollSnapAlign: "start" }}>
                    <StoryCard story={s} index={idx} onOpen={setActiveStory} />
                  </div>
                ))}
              </div>

           
            </div>
          </div>

          <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />
        </div>
      </section>

      {/* INSTITUTIONAL SUCCESS STORIES */}
      <section id="institutions" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            accentWord="Universities & Organizations"
            dark
          />
          <div className="mt-10">
            <InstitutionPanel />
          </div>
        </div>
      </section>

      {/* GERMANY */}
      <section id="germany" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="From Local Projects"
            accentWord="to Global Stage"
            dark
          />
          <div className="mt-10">
            <MapRoute />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="What Participants Say"
            dark
          />
          <div className="mt-10">
            <TestimonialsMasonry />
          </div>
        </div>
      </section>

      {/* CAREER MOVEMENT */}
      <section id="momentum" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Beyond completion"
            accentWord="— momentum"
            subtitle="Execution builds confidence. Confidence builds opportunity."
            dark
          />
          <div className="mt-10">
            <CareerMetricGrid />
          </div>

          <div className="mt-10 rounded-[36px] border border-white/10 px-6 py-8 text-center sm:px-10 sm:py-10"
            style={{
              background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 100%)`,
              boxShadow: "0 24px 90px rgba(0,0,0,0.16)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)",
              }}
            />
            <div className="relative mx-auto max-w-6xl text-white">
              <div className="mt-3 text-3xl font-semibold md:text-4xl">
                Your Story Can Be Next.
              </div>
              <p className="mx-auto mt-4 max-w-4xl text-sm font-medium text-white/80">
                Start with execution. End with opportunity.
              </p>
              <div id="apply" className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] transition hover:opacity-95"
                >
                  Apply Now <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                </a>
                <a
                  href="#institutions"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15"
                >
                  Partner With Us <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Sticky CTA */}
      <a
        href="#apply"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:inline-flex"
        style={{
          background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)`,
        }}
      >
        <Briefcase className="h-4 w-4" {...iconStrongProps} />
        Apply Now
      </a>

      <style>{css}</style>
    </div>
  );
}

/* ---------------- CSS (animations) ---------------- */
const css = `
/* streak */
.light-streak{
  position:absolute; inset:-20% -10%;
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

/* aurora background */
.aurora{
  position:absolute; inset:-40%;
  background:
    radial-gradient(500px circle at 20% 30%, rgba(34,211,238,0.16), transparent 60%),
    radial-gradient(480px circle at 70% 30%, rgba(167,139,250,0.14), transparent 60%),
    radial-gradient(520px circle at 50% 80%, rgba(201,29,103,0.12), transparent 60%);
  filter: blur(16px);
  animation: auroraMove 11s ease-in-out infinite;
  opacity: 0.65;
}
@keyframes auroraMove{
  0%{ transform: translate3d(-2%, -1%, 0) scale(1); }
  50%{ transform: translate3d(2%, 2%, 0) scale(1.05); }
  100%{ transform: translate3d(-2%, -1%, 0) scale(1); }
}

/* shine pass */
.shine{
  position:absolute; inset:-30% -30%;
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

/* hide scrollbar */
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }

/* masonry */
.masonry{
  column-count: 1;
  column-gap: 14px;
}
@media (min-width: 768px){
  .masonry{ column-count: 2; }
}
@media (min-width: 1024px){
  .masonry{ column-count: 3; }
}
.masonry-item{
  break-inside: avoid;
  margin-bottom: 14px;
}
`;
