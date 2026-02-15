import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  CalendarDays,
  ChevronDown,
  Cpu,
  GraduationCap,
  Layers,
  LineChart,
  Mail,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  Wand2,
} from "lucide-react";

/** Colors from your project:
 *  base: #141D26
 *  surface: #243447
 *  text: #E2E2D2
 *  brand-pink: #C51F5D
 *
 *  From bootcamp screenshots (sampled):
 *  teal highlight ~ #C51F5D
 *  warm highlight ~ #243447
 */
const COLORS = {
  bg: "#141D26",
  surface: "#243447",
  text: "#E2E2D2",
  pink: "#C51F5D",
  teal: "#C51F5D",
  warm: "#243447",
};

const cn = (...c) => c.filter(Boolean).join(" ");

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useScrollShadow() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return scrolled;
}

function Reveal({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.22 });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18, scale: 0.985 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay }}
    >
      {children}
    </motion.div>
  );
}

function GradientBorder({ children, className }) {
  return (
    <div
      className={cn(
        "relative rounded-3xl p-[1px]",
        "bg-gradient-to-br from-[rgba(197,31,93,0.75)] via-[rgba(226,226,210,0.12)] to-[rgba(197,31,93,0.55)]",
        className
      )}
    >
      <div className="rounded-3xl border border-white/5 bg-[rgba(36,52,71,0.28)] backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}

function TiltCard({ children, className }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 180, damping: 18 });

  function onMove(e) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
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
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ children, variant = "primary", onClick, className, icon = true }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function onMove(e) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.08);
    y.set(dy * 0.08);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const styles =
    variant === "primary"
      ? "bg-[#C51F5D] text-[#141D26] shadow-[0_18px_60px_rgba(197,31,93,0.35)]"
      : "border border-[#E2E2D2]/20 bg-white/5 text-[#E2E2D2] hover:bg-white/10";

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={reduce ? undefined : { x, y }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-extrabold",
        "focus:outline-none focus:ring-2 focus:ring-[#C51F5D]/40",
        styles,
        className
      )}
    >
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <span className="shine" />
      </span>
      <span className="relative z-10">{children}</span>
      {icon ? (
        <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      ) : null}
    </motion.button>
  );
}

function Pill({ icon: Icon, children, playful = false }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold tracking-wide text-[#E2E2D2]/85 backdrop-blur",
        playful && "sticker"
      )}
    >
      {Icon ? <Icon className="h-4 w-4 text-[#C51F5D]" /> : null}
      <span>{children}</span>
    </div>
  );
}

function AnimatedNumber({ value, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const parsed = useMemo(() => {
    const raw = String(value);
    const num = parseInt(raw.replace(/[^\d]/g, ""), 10) || 0;
    const suffix = raw.replace(String(num), "");
    return { num, suffix };
  }, [value]);

  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const dur = 900;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(parsed.num * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed.num, reduce]);

  return (
    <div ref={ref} className={className}>
      {reduce && inView ? parsed.num : n}
      {parsed.suffix}
    </div>
  );
}

function ConfettiBurst({ fireKey }) {
  const reduce = useReducedMotion();
  const pieces = useMemo(() => Array.from({ length: 22 }).map((_, i) => i), []);
  if (reduce) return null;

  return (
    <AnimatePresence>
      {fireKey ? (
        <motion.div
          key={fireKey}
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-0 w-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {pieces.map((i) => {
            const angle = (i / pieces.length) * Math.PI * 2;
            const dist = 70 + (i % 6) * 12;
            const x = Math.cos(angle) * dist;
            const y = Math.sin(angle) * dist;
            const rot = (i * 29) % 360;
            const size = 6 + (i % 3) * 2;
            const palette = [COLORS.teal, COLORS.text, COLORS.pink, COLORS.warm];
            const color = palette[i % palette.length];
            return (
              <motion.span
                key={i}
                className="absolute rounded-md"
                style={{
                  width: size,
                  height: size,
                  background: color,
                  boxShadow: "0 0 14px rgba(197,31,93,0.25)",
                }}
                initial={{ x: 0, y: 0, rotate: 0, scale: 0.9 }}
                animate={{
                  x,
                  y,
                  rotate: rot,
                  scale: [1, 1, 0.9],
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 0.75, ease: "easeOut" }}
              />
            );
          })}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function CursorAura() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);
  const sx = useSpring(x, { stiffness: 260, damping: 28 });
  const sy = useSpring(y, { stiffness: 260, damping: 28 });

  useEffect(() => {
    if (reduce) return;
    const on = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", on, { passive: true });
    return () => window.removeEventListener("mousemove", on);
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, rgba(197,31,93,0.28), rgba(197,31,93,0.0) 70%)",
        filter: "blur(2px)",
        mixBlendMode: "screen",
      }}
    />
  );
}

function AmbientBackgroundBootcamp() {
  const reduce = useReducedMotion();
  const stickers = useMemo(
    () => [
      { id: 1, left: "8%", top: "18%", text: "✨", cls: "float-1" },
      { id: 2, left: "86%", top: "20%", text: "🚀", cls: "float-2" },
      { id: 3, left: "18%", top: "72%", text: "🧠", cls: "float-3" },
      { id: 4, left: "88%", top: "72%", text: "🎯", cls: "float-4" },
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.10]" />

      <div className="absolute -top-56 left-[-18%] h-[700px] w-[700px] rounded-full blur-[100px] bg-blobTeal" />
      <div className="absolute right-[-20%] top-[-220px] h-[760px] w-[760px] rounded-full blur-[110px] bg-blobWarm" />
      <div className="absolute bottom-[-380px] left-[20%] h-[900px] w-[900px] rounded-full blur-[140px] bg-blobPinkSoft" />

      {!reduce &&
        stickers.map((s) => (
          <div
            key={s.id}
            className={cn(
              "absolute grid place-items-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur",
              "h-12 w-12 text-xl shadow-[0_18px_70px_rgba(197,31,93,0.10)]",
              s.cls
            )}
            style={{ left: s.left, top: s.top }}
          >
            {s.text}
          </div>
        ))}

      <div className="absolute inset-0 noise opacity-[0.07]" />
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <div className="mb-4 flex justify-center">
          <Pill icon={Wand2} playful>
            {eyebrow}
          </Pill>
        </div>
      ) : null}
      <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-3 text-pretty text-base leading-relaxed text-[#E2E2D2]/70 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function Chip({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#E2E2D2]/80">
      {children}
    </span>
  );
}

function Field({ label, placeholder, icon: Icon, required, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold text-[#E2E2D2]/85">{label}</span>
      <div className="relative">
        {Icon ? <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#E2E2D2]/40" /> : null}
        <input
          required={required}
          type={type}
          className={cn(
            "w-full rounded-2xl border border-white/10 bg-[#141D26]/45 px-4 py-3 text-sm",
            "text-[#E2E2D2] placeholder:text-[#E2E2D2]/35",
            "focus:outline-none focus:ring-2 focus:ring-[#C51F5D]/40",
            Icon ? "pl-10" : ""
          )}
          placeholder={placeholder}
        />
      </div>
    </label>
  );
}

function SelectField({ label, options, required = true, placeholder = "Select option" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold text-[#E2E2D2]/85">{label}</span>
      <select
        required={required}
        defaultValue=""
        className={cn(
          "w-full rounded-2xl border border-white/10 bg-[#141D26]/45 px-4 py-3 text-sm",
          "text-[#E2E2D2] focus:outline-none focus:ring-2 focus:ring-[#C51F5D]/40"
        )}
      >
        <option value="" disabled className="bg-[#141D26]">
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#141D26]">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({ label, placeholder, minLength, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold text-[#E2E2D2]/85">{label}</span>
      <textarea
        required
        minLength={minLength}
        rows={5}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full rounded-2xl border border-white/10 bg-[#141D26]/45 px-4 py-3 text-sm",
          "text-[#E2E2D2] placeholder:text-[#E2E2D2]/35 focus:outline-none focus:ring-2 focus:ring-[#C51F5D]/40"
        )}
        placeholder={placeholder}
      />
    </label>
  );
}

function Segmented({ left, right, value, onChange }) {
  return (
    <div className="mx-auto inline-flex rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur">
      <button
        onClick={() => onChange("left")}
        className={cn(
          "relative rounded-xl px-6 py-2 text-sm font-extrabold transition",
          value === "left" ? "text-[#141D26]" : "text-[#E2E2D2]/70 hover:text-[#E2E2D2]"
        )}
      >
        {value === "left" ? (
          <motion.span
            layoutId="seg"
            className="absolute inset-0 rounded-xl bg-[#C51F5D]"
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          />
        ) : null}
        <span className="relative z-10">{left}</span>
      </button>
      <button
        onClick={() => onChange("right")}
        className={cn(
          "relative rounded-xl px-6 py-2 text-sm font-extrabold transition",
          value === "right" ? "text-[#141D26]" : "text-[#E2E2D2]/70 hover:text-[#E2E2D2]"
        )}
      >
        {value === "right" ? (
          <motion.span
            layoutId="seg"
            className="absolute inset-0 rounded-xl bg-[#C51F5D]"
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          />
        ) : null}
        <span className="relative z-10">{right}</span>
      </button>
    </div>
  );
}

export default function BootcampPage () {
  const reduce = useReducedMotion();
  const scrolled = useScrollShadow();
  const { scrollYProgress } = useScroll();
  const topBar = useSpring(scrollYProgress, { stiffness: 140, damping: 22 });

  const [confettiKey, setConfettiKey] = useState(0);

  // Bootcamp screenshot data
  const heroStats = useMemo(
    () => [
      { value: "6", label: "Months", icon: CalendarDays },
      { value: "8+", label: "Tracks", icon: Layers },
      { value: "87%", label: "Hired", icon: Briefcase },
    ],
    []
  );

  const journey = useMemo(
    () => [
      {
        key: "m12",
        tab: "Month 1-2",
        title: "Foundations & Momentum",
        subtitle: "Set fundamentals, build habits, ship first mini-projects.",
        bullets: ["Core fundamentals", "Tooling + workflow", "Mini projects", "Mentor check-ins"],
        progress: 33,
        emoji: "📚",
      },
      {
        key: "m34",
        tab: "Month 3-4",
        title: "Specialization & Projects",
        subtitle: "Pick a track, build real portfolio projects with reviews.",
        bullets: ["Track specialization", "Team collaboration", "Code reviews", "Project delivery"],
        progress: 66,
        emoji: "⚙️",
      },
      {
        key: "m56",
        tab: "Month 5-6",
        title: "Capstone & Career Prep",
        subtitle: "Build your portfolio and prepare for the job market",
        bullets: ["Capstone project", "Interview prep", "Resume building", "Job placement"],
        progress: 100,
        emoji: "🎯",
      },
    ],
    []
  );

  const techTracks = useMemo(
    () => [
      {
        key: "fullstack",
        title: "Full-Stack Development",
        duration: "6 months",
        projects: "5 Projects",
        desc: "Master modern web development from frontend to backend",
        skills: ["React/Next.js", "Node.js", "Databases", "DevOps", "Cloud Services"],
        icon: Cpu,
      },
      {
        key: "dsai",
        title: "Data Science & AI",
        duration: "6 months",
        projects: "4 Projects",
        desc: "Learn machine learning, data analysis, and AI applications",
        skills: ["Python", "ML/DL", "Data Visualization", "Statistics", "AI Tools"],
        icon: LineChart,
      },
      {
        key: "cloud",
        title: "Cloud & DevOps",
        duration: "6 months",
        projects: "4 Projects",
        desc: "Build expertise in cloud infrastructure and automation",
        skills: ["Cloud Basics", "Docker", "CI/CD", "Monitoring", "Infrastructure as Code"],
        icon: Rocket,
      },
      {
        key: "cyber",
        title: "Cybersecurity",
        duration: "6 months",
        projects: "4 Projects",
        desc: "Protect systems and networks from security threats",
        skills: ["Security Basics", "Networking", "Threat Analysis", "SOC Tools", "Hardening"],
        icon: ShieldCheck,
      },
    ],
    []
  );

  const businessTracks = useMemo(
    () => [
      {
        key: "pm",
        title: "Product Management",
        duration: "6 months",
        projects: "3 Projects",
        desc: "Lead product strategy and drive business outcomes",
        skills: ["Product Strategy", "User Research", "Analytics", "Roadmapping", "Stakeholder Mgmt"],
        icon: Target,
      },
      {
        key: "marketing",
        title: "Digital Marketing",
        duration: "6 months",
        projects: "4 Projects",
        desc: "Master digital channels and growth strategies",
        skills: ["SEO/SEM", "Social Media", "Content Marketing", "Analytics", "Email Marketing"],
        icon: Sparkles,
      },
      {
        key: "ba",
        title: "Business Analytics",
        duration: "6 months",
        projects: "4 Projects",
        desc: "Transform data into strategic business insights",
        skills: ["Excel/SQL", "Power BI", "Statistical Analysis", "Forecasting", "Business Intelligence"],
        icon: LineChart,
      },
      {
        key: "ux",
        title: "UX/UI Design",
        duration: "6 months",
        projects: "5 Projects",
        desc: "Create user-centered designs that drive engagement",
        skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Usability Testing"],
        icon: BookOpen,
      },
    ],
    []
  );

  const results = useMemo(
    () => [
      { value: "87%", title: "Job Placement", note: "of graduates hired within 3 months", emoji: "💼" },
      { value: "65%", title: "Salary Increase", note: "average salary boost for career switchers", emoji: "📈" },
      { value: "4+", title: "Portfolio Projects", note: "real-world projects completed", emoji: "🧩" },
      { value: "50+", title: "Industry Mentors", note: "experts guiding your journey", emoji: "🤝" },
    ],
    []
  );

  const [journeyKey, setJourneyKey] = useState("m56");
  const activeJourney = journey.find((j) => j.key === journeyKey) ?? journey[0];

  const [trackTab, setTrackTab] = useState("left"); // left=tech right=business
  const tracks = trackTab === "left" ? techTracks : businessTracks;

  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);
  useEffect(() => {
    setSelectedTrack(tracks[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackTab]);

  // form
  const [why, setWhy] = useState("");
  const whyCount = why.length;

  return (
    <div className="min-h-screen bg-[#141D26] text-[#E2E2D2]" style={{ backgroundColor: COLORS.bg, color: COLORS.text }}>
      <CursorAura />
      <motion.div className="fixed left-0 top-0 z-[80] h-[3px] w-full origin-left bg-[#C51F5D]" style={{ scaleX: topBar }} />

      <div className="relative">
        <AmbientBackgroundBootcamp />

        {/* NAV */}
        <div
          className={cn(
            "sticky top-0 z-50 transition-all",
            scrolled ? "bg-[#141D26]/75 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
            <motion.button
              onClick={() => scrollToId("top")}
              whileHover={reduce ? undefined : { rotate: -1.5, scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <div className="h-11 w-11 rounded-2xl border border-[#C51F5D]/35 bg-[#C51F5D]/15 grid place-items-center sticker">
                <Rocket className="h-5 w-5 text-[#C51F5D]" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-extrabold tracking-wide">Bootcamps</div>
                <div className="text-xs text-[#E2E2D2]/60">6-Month Intensive Program</div>
              </div>
            </motion.button>

            <div className="hidden items-center gap-2 md:flex">
              {[
                ["Journey", "journey"],
                ["Tracks", "tracks"],
                ["Results", "results"],
                ["Apply", "apply"],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollToId(id)}
                  className="navlink relative px-3 py-2 text-sm font-extrabold text-[#E2E2D2]/75 hover:text-[#E2E2D2]"
                >
                  {label}
                  <span className="nav-underline absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-[#C51F5D]" />
                </button>
              ))}

              <div className="relative">
                <ConfettiBurst fireKey={confettiKey} />
                <MagneticButton
                  onClick={() => {
                    setConfettiKey((k) => k + 1);
                    scrollToId("apply");
                  }}
                  variant="primary"
                >
                  Apply Now
                </MagneticButton>
              </div>
            </div>

            <div className="md:hidden relative">
              <ConfettiBurst fireKey={confettiKey} />
              <MagneticButton
                onClick={() => {
                  setConfettiKey((k) => k + 1);
                  scrollToId("apply");
                }}
                variant="secondary"
                icon={false}
              >
                Apply
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* HERO */}
        <section id="top" className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="mb-6">
                <Pill icon={Sparkles} playful>
                  6-MONTH INTENSIVE PROGRAM
                </Pill>
              </div>

              <motion.h1
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
                className="text-balance text-4xl font-extrabold tracking-tight sm:text-6xl"
              >
                {["Launch", "Your"].map((w, i) => (
                  <motion.span
                    key={w + i}
                    variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                    transition={{ type: "spring", stiffness: 120, damping: 16 }}
                    className="mr-3 inline-block"
                  >
                    {w}
                  </motion.span>
                ))}
                <span className="block">
                  <span className="bootcamp-gradient-teal">Tech</span>{" "}
                  <span className="bootcamp-gradient-warm">Career</span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.6 }}
                className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#E2E2D2]/75 sm:text-lg"
              >
                Intensive bootcamp programs designed to transform beginners into{" "}
                <span className="font-extrabold text-[#C51F5D]">job-ready professionals</span> in just 6 months.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26, duration: 0.6 }}
                className="mt-9 flex flex-col items-start gap-3 sm:flex-row"
              >
                <div className="relative">
                  <ConfettiBurst fireKey={confettiKey + 1000} />
                  <MagneticButton
                    onClick={() => {
                      setConfettiKey((k) => k + 1);
                      scrollToId("apply");
                    }}
                    variant="primary"
                  >
                    Apply Now
                  </MagneticButton>
                </div>
                <MagneticButton onClick={() => scrollToId("tracks")} variant="secondary">
                  View Tracks
                </MagneticButton>
              </motion.div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {heroStats.map((s, i) => (
                  <Reveal key={s.label} delay={i * 0.05}>
                    <TiltCard className="h-full">
                      <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:translate-y-[-3px] transition-transform">
                        <div className="flex items-start justify-between gap-3">
                          <AnimatedNumber value={s.value} className="text-3xl font-extrabold text-[#E2E2D2]" />
                          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 sticker">
                            <s.icon className="h-5 w-5 text-[#C51F5D]" />
                          </div>
                        </div>
                        <div className="mt-1 text-sm text-[#E2E2D2]/60">{s.label}</div>
                        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            className="h-full rounded-full bg-[#C51F5D]"
                            initial={{ width: "0%" }}
                            whileInView={{ width: `${72 + i * 7}%` }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* hero card */}
            <div className="lg:col-span-5">
              <Reveal>
                <TiltCard>
                  <GradientBorder>
                    <motion.div
                      className="relative p-8"
                      initial={{ y: 0 }}
                      animate={reduce ? undefined : { y: [0, -8, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="mx-auto grid h-[320px] w-full max-w-[360px] place-items-center rounded-3xl border border-white/10 bg-[#141D26]/25">
                        <div className="text-center">
                          <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/5 sticker">
                            <GraduationCap className="h-7 w-7 text-[#243447]" />
                          </div>
                          <div className="text-2xl font-extrabold">Transform</div>
                          <div className="mt-2 text-sm text-[#E2E2D2]/60">In 6 Months</div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap justify-center gap-2">
                        <Chip>Mentor-led</Chip>
                        <Chip>Portfolio Projects</Chip>
                        <Chip>Career Prep</Chip>
                      </div>
                    </motion.div>
                  </GradientBorder>
                </TiltCard>
              </Reveal>
            </div>
          </div>
        </section>
      </div>

      {/* JOURNEY */}
      <section id="journey" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeader
          eyebrow="Your 6-Month Journey"
          title={
            <span>
              A carefully structured path from beginner to{" "}
              <span className="text-[#C51F5D]">professional</span>
            </span>
          }
          subtitle="Pick a phase to preview what it feels like — animated, clear, and outcome-driven."
        />

        <div className="mt-10">
          <div className="flex justify-center gap-3">
            {journey.map((j) => {
              const active = j.key === journeyKey;
              return (
                <motion.button
                  key={j.key}
                  onClick={() => setJourneyKey(j.key)}
                  className={cn(
                    "rounded-2xl border px-6 py-3 text-sm font-extrabold backdrop-blur",
                    active ? "border-[#C51F5D]/40 bg-[#C51F5D]/18" : "border-white/10 bg-white/5 text-[#E2E2D2]/75 hover:text-[#E2E2D2]"
                  )}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {j.tab}
                </motion.button>
              );
            })}
          </div>

          <div className="mt-10">
            <GradientBorder>
              <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-8">
                <TiltCard className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#C51F5D]/25 via-white/5 to-[#243447]/45 blur-2xl" />
                  <div className="relative grid h-[360px] place-items-center rounded-3xl border border-white/10 bg-[#141D26]/30 p-6 backdrop-blur">
                    <motion.div
                      key={activeJourney.key}
                      initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.96, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 140, damping: 16 }}
                      className="text-center"
                    >
                      <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl border border-white/10 bg-white/5 text-4xl sticker">
                        {activeJourney.emoji}
                      </div>
                      <div className="mt-6 text-xl font-extrabold">{activeJourney.title}</div>
                      <div className="mt-2 text-sm text-[#E2E2D2]/60">{activeJourney.subtitle}</div>
                    </motion.div>
                  </div>
                </TiltCard>

                <div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeJourney.key}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                    >
                      <div className="text-3xl font-extrabold">
                        {activeJourney.tab.replace("-", "- ")}
                      </div>
                      <div className="mt-2 text-xl font-extrabold">{activeJourney.title}</div>
                      <div className="mt-2 text-sm text-[#E2E2D2]/70">{activeJourney.subtitle}</div>

                      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {activeJourney.bullets.map((b) => (
                          <div
                            key={b}
                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                          >
                            <div className="flex items-center gap-3">
                              <span className="h-2 w-2 rounded-full bg-[#C51F5D]" />
                              <span className="text-sm font-semibold text-[#E2E2D2]/90">{b}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 flex items-center justify-between text-sm text-[#E2E2D2]/65">
                        <span className="font-extrabold">Program Progress</span>
                        <span className="font-extrabold text-[#C51F5D]">{activeJourney.progress}%</span>
                      </div>

                      <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          key={`${activeJourney.key}-bar`}
                          className="h-full rounded-full bg-[#C51F5D]"
                          initial={{ width: "0%" }}
                          animate={{ width: `${activeJourney.progress}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>

                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <MagneticButton
                          onClick={() => scrollToId("apply")}
                          variant="primary"
                        >
                          Apply Now
                        </MagneticButton>
                        <MagneticButton
                          onClick={() => scrollToId("tracks")}
                          variant="secondary"
                        >
                          Choose a Track
                        </MagneticButton>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </GradientBorder>
          </div>
        </div>
      </section>

      {/* TRACKS */}
      <section id="tracks" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeader
          eyebrow="Choose Your Track"
          title={
            <span>
              Specialized programs in tech and business{" "}
              <span className="text-[#C51F5D]">domains</span>
            </span>
          }
          subtitle="Tap a card to open the animated detail panel."
        />

        <div className="mt-8 flex justify-center">
          <Segmented
            left="Tech Tracks"
            right="Business Tracks"
            value={trackTab}
            onChange={(v) => setTrackTab(v)}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 grid grid-cols-1 gap-5 md:grid-cols-2">
            {tracks.map((t, i) => (
              <Reveal key={t.key} delay={i * 0.04}>
                <TiltCard className="h-full">
                  <button
                    onClick={() => setSelectedTrack(t)}
                    className={cn(
                      "h-full w-full text-left rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur",
                      "hover:translate-y-[-6px] transition-transform"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 grid place-items-center sticker">
                          <t.icon className="h-5 w-5 text-[#C51F5D]" />
                        </div>
                        <div>
                          <div className="text-lg font-extrabold">{t.title}</div>
                          <div className="mt-1 text-sm text-[#E2E2D2]/60">{t.desc}</div>
                        </div>
                      </div>

                      <div className="text-right text-xs text-[#E2E2D2]/60">
                        <div className="text-sm font-extrabold text-[#C51F5D]">{t.duration}</div>
                        <div>{t.projects}</div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="text-xs font-extrabold text-[#E2E2D2]/55">Key Skills:</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {t.skills.map((s) => (
                          <Chip key={s}>{s}</Chip>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        className="h-full rounded-full bg-[#C51F5D]"
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${72 + i * 5}%` }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                    </div>
                  </button>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          {/* DETAIL PANEL */}
          <div className="lg:col-span-5">
            <Reveal>
              <GradientBorder className="sticky top-24">
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedTrack?.key}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xl font-extrabold">{selectedTrack?.title}</div>
                          <div className="mt-2 text-sm text-[#E2E2D2]/70">{selectedTrack?.desc}</div>
                        </div>
                        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 sticker">
                          <Star className="h-5 w-5 text-[#243447]" />
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <Chip>{selectedTrack?.duration}</Chip>
                        <Chip>{selectedTrack?.projects}</Chip>
                        <Chip>Mentor reviews</Chip>
                        <Chip>Portfolio-ready</Chip>
                      </div>

                      <div className="mt-7 grid gap-3">
                        {[
                          { title: "Weekly Mentorship", desc: "Structured check-ins + feedback loops that keep you shipping." },
                          { title: "Project Evidence", desc: "Deliverables you can show in interviews and portfolios." },
                          { title: "Career Prep", desc: "Interview drills, resume polish, and job-ready storytelling." },
                        ].map((row) => (
                          <div key={row.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-extrabold">{row.title}</div>
                              <BadgeCheck className="h-4 w-4 text-[#C51F5D]" />
                            </div>
                            <div className="mt-2 text-sm text-[#E2E2D2]/70">{row.desc}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-7">
                        <div className="text-xs font-extrabold text-[#E2E2D2]/55">Skills stack</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedTrack?.skills?.map((s) => (
                            <Chip key={s}>{s}</Chip>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 flex gap-3">
                        <MagneticButton onClick={() => scrollToId("apply")} variant="primary">
                          Apply Now
                        </MagneticButton>
                        <MagneticButton
                          onClick={() => {
                            setConfettiKey((k) => k + 1);
                            scrollToId("results");
                          }}
                          variant="secondary"
                        >
                          See Results
                        </MagneticButton>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </GradientBorder>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeader
          eyebrow="Real Results"
          title={
            <span>
              Outcomes that feel{" "}
              <span className="text-[#C51F5D]">real</span>
            </span>
          }
          subtitle="Our graduates achieve incredible career transformations."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {results.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <TiltCard className="h-full">
                <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:translate-y-[-5px] transition-transform">
                  <div className="flex items-start justify-between">
                    <AnimatedNumber value={r.value} className="text-4xl font-extrabold text-[#C51F5D]" />
                    <div className="text-2xl">{r.emoji}</div>
                  </div>
                  <div className="mt-2 text-lg font-extrabold">{r.title}</div>
                  <div className="mt-2 text-sm text-[#E2E2D2]/65">{r.note}</div>
                  <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full bg-[#C51F5D]"
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${70 + i * 6}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* APPLY */}
      <section id="apply" className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6">
        <SectionHeader
          eyebrow="Apply Now"
          title="Start your transformation journey today"
          subtitle="Complete the form below and we’ll contact you with next steps."
        />

        <div className="mt-10">
          <GradientBorder>
            <div className="p-6 md:p-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setConfettiKey((k) => k + 1);
                  alert("Submitted! Hook this up to your API.");
                }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Full Name *" placeholder="John Doe" required />
                  <Field label="Email Address *" placeholder="john@example.com" icon={Mail} required type="email" />
                  <Field label="Phone Number *" placeholder="+1 (555) 000-0000" icon={Phone} required />
                  <SelectField
                    label="Education Level *"
                    placeholder="Select education level"
                    options={["High school", "Diploma", "Bachelor's", "Master's", "PhD", "Other"]}
                  />
                  <SelectField
                    label="Preferred Track *"
                    placeholder="Select a track"
                    options={[...techTracks.map((t) => t.title), ...businessTracks.map((t) => t.title)]}
                  />
                  <SelectField
                    label="Availability *"
                    placeholder="Select availability"
                    options={["Full-time", "Part-time", "Weekends", "Evenings", "Flexible"]}
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4">
                  <Field label="Previous Experience (Optional)" placeholder="Brief description of relevant experience" required={false} />
                  <Field label="Portfolio/GitHub (Optional)" placeholder="https://github.com/yourname" required={false} />
                </div>

                <div className="mt-4">
                  <TextArea
                    label="Why do you want to join this bootcamp? * (minimum 150 characters)"
                    placeholder="Tell us about your goals and motivation (minimum 150 characters)..."
                    minLength={150}
                    value={why}
                    onChange={(e) => setWhy(e.target.value)}
                  />
                  <div className="mt-2 text-right text-xs text-[#E2E2D2]/55">{whyCount}/2000 characters</div>
                </div>

                <label className="mt-4 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-[#E2E2D2]/90">
                  <input type="checkbox" required className="mt-1 h-4 w-4 accent-[#C51F5D]" />
                  <span>
                    I agree to the{" "}
                    <a href="/privacy-policy" className="font-extrabold text-[#C51F5D] underline underline-offset-2">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>

                <div className="mt-6 relative">
                  <ConfettiBurst fireKey={confettiKey + 2000} />
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className={cn(
                      "w-full rounded-2xl px-6 py-4 text-base font-extrabold",
                      "bg-[#C51F5D] text-[#141D26]",
                      "shadow-[0_22px_55px_rgba(197,31,93,0.34)]",
                      "focus:outline-none focus:ring-2 focus:ring-[#E2E2D2]/40"
                    )}
                  >
                    Submit Application
                  </motion.button>
                </div>
              </form>
            </div>
          </GradientBorder>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#141D26]/70">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl border border-[#C51F5D]/35 bg-[#C51F5D]/16 grid place-items-center sticker">
                  <Rocket className="h-5 w-5 text-[#C51F5D]" />
                </div>
                <div>
                  <div className="text-sm font-extrabold">Bootcamps</div>
                  <div className="text-xs text-[#E2E2D2]/60">6-Month Intensive Program</div>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#E2E2D2]/65">
                Structured learning, real projects, and career prep — built to launch your next chapter.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ["Journey", "journey"],
                ["Tracks", "tracks"],
                ["Results", "results"],
                ["Apply", "apply"],
              ].map(([label, id]) => (
                <button key={id} onClick={() => scrollToId(id)} className="text-left font-extrabold text-[#E2E2D2]/70 hover:text-[#E2E2D2]">
                  {label}
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="text-sm font-extrabold">Ready to apply?</div>
              <p className="mt-2 text-sm text-[#E2E2D2]/70">Tell us your goals — we’ll guide you to the best track.</p>
              <div className="mt-4 relative">
                <ConfettiBurst fireKey={confettiKey + 3000} />
                <MagneticButton
                  onClick={() => {
                    setConfettiKey((k) => k + 1);
                    scrollToId("apply");
                  }}
                  variant="primary"
                >
                  Apply Now
                </MagneticButton>
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-[#E2E2D2]/55">
                <Users className="h-4 w-4 text-[#C51F5D]" />
                <span>Career support built-in</span>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-xs text-[#E2E2D2]/45">
            © {new Date().getFullYear()} Bootcamps. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

