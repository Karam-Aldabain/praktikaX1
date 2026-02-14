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
  Award,
  Brain,
  Briefcase,
  CheckCircle2,
  Clock3,
  Code2,
  Globe,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Star,
  BadgeCheck,
} from "lucide-react";

/**
 * Palette (from screenshot)
 * base:    #141D26
 * surface: #243447
 * text:    #E2E2D2
 * brand:   #C51F5D
 */
const COLORS = {
  bg: "#141D26",
  surface: "#243447",
  text: "#E2E2D2",
  brand: "#C51F5D",
};

const cn = (...c) => c.filter(Boolean).join(" ");

const STATS = [
  { icon: Users, value: "500+", label: "Companies Trained", gradient: "from-[#2563EB] to-[#06B6D4]" },
  { icon: Award, value: "95%", label: "Success Rate", gradient: "from-[#9333EA] to-[#EC4899]" },
  { icon: Globe, value: "30+", label: "Countries Reached", gradient: "from-[#F97316] to-[#EF4444]" },
];

const FIELD_CARDS = [
  {
    icon: Code2,
    title: "Technology & IT",
    desc: "Software development, cybersecurity, data science",
    gradient: "from-[#2563EB] to-[#06B6D4]",
  },
  {
    icon: Briefcase,
    title: "Business & Management",
    desc: "Leadership, project management, strategy",
    gradient: "from-[#9333EA] to-[#EC4899]",
  },
  {
    icon: Brain,
    title: "Soft Skills",
    desc: "Communication, teamwork, problem-solving",
    gradient: "from-[#22C55E] to-[#14B8A6]",
  },
  {
    icon: TrendingUp,
    title: "Industry-Specific",
    desc: "Finance, healthcare, manufacturing",
    gradient: "from-[#F97316] to-[#EF4444]",
  },
];

const FORMAT_CARDS = [
  {
    icon: Briefcase,
    title: "Workshop Series",
    desc: "Targeted modules delivered weekly with live facilitation and checkpoints.",
    gradient: "from-[#2563EB] to-[#06B6D4]",
  },
  {
    icon: Target,
    title: "Bootcamp Model",
    desc: "Intensive, practical cohorts for rapid capability upgrades and outcomes.",
    gradient: "from-[#9333EA] to-[#EC4899]",
  },
  {
    icon: Sparkles,
    title: "Project-Based Cohort",
    desc: "Learning through real use-cases and measurable business-aligned delivery.",
    gradient: "from-[#22C55E] to-[#14B8A6]",
  },
  {
    icon: Globe,
    title: "Hybrid Delivery",
    desc: "On-site and remote program structure for distributed global teams.",
    gradient: "from-[#F97316] to-[#EF4444]",
  },
];

const DURATION_CARDS = [
  { icon: Clock3, title: "4 Weeks", desc: "Fast-track sprint for urgent skill gaps.", gradient: "from-[#2563EB] to-[#06B6D4]" },
  { icon: Clock3, title: "8 Weeks", desc: "Balanced path with practice and progress reviews.", gradient: "from-[#9333EA] to-[#EC4899]" },
  { icon: Clock3, title: "12 Weeks", desc: "Comprehensive upskilling with project outcomes.", gradient: "from-[#22C55E] to-[#14B8A6]" },
  { icon: Clock3, title: "16+ Weeks", desc: "Enterprise-scale transformation for larger teams.", gradient: "from-[#F97316] to-[#EF4444]" },
];

const TRAINING_PROGRAMS = [
  {
    icon: Code2,
    title: "Technical Skills Training",
    desc: "Master the latest technologies and tools in your industry",
    bullets: ["Programming Languages", "Cloud Computing", "DevOps & CI/CD", "Data Analytics"],
    gradient: "from-[#2563EB] to-[#06B6D4]",
  },
  {
    icon: Users,
    title: "Leadership Development",
    desc: "Build strong leaders who inspire and drive results",
    bullets: ["Strategic Thinking", "Team Management", "Decision Making", "Change Management"],
    gradient: "from-[#9333EA] to-[#EC4899]",
  },
  {
    icon: Award,
    title: "Professional Certification",
    desc: "Prepare your team for industry-recognized certifications",
    bullets: ["Exam Preparation", "Practice Tests", "Expert Mentoring", "Study Materials"],
    gradient: "from-[#F97316] to-[#EF4444]",
  },
  {
    icon: Brain,
    title: "Soft Skills Enhancement",
    desc: "Develop critical interpersonal and communication skills",
    bullets: ["Communication", "Collaboration", "Problem Solving", "Emotional Intelligence"],
    gradient: "from-[#22C55E] to-[#14B8A6]",
  },
];

const WHY_CARDS = [
  {
    icon: Target,
    title: "Tailored Content",
    desc: "Programs designed specifically for your industry and team needs",
    gradient: "from-[#2563EB] to-[#1D4ED8]",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    desc: "Learn from industry professionals with real-world experience",
    gradient: "from-[#9333EA] to-[#A855F7]",
  },
  {
    icon: Sparkles,
    title: "Flexible Scheduling",
    desc: "Training that fits your team's schedule and availability",
    gradient: "from-[#EA580C] to-[#F97316]",
  },
  {
    icon: Award,
    title: "Measurable Results",
    desc: "Track progress and ROI with comprehensive analytics",
    gradient: "from-[#16A34A] to-[#22C55E]",
  },
  {
    icon: Globe,
    title: "Global Standards",
    desc: "Training aligned with international best practices",
    gradient: "from-[#0891B2] to-[#06B6D4]",
  },
  {
    icon: TrendingUp,
    title: "Continuous Support",
    desc: "Ongoing assistance and resources after training completion",
    gradient: "from-[#DB2777] to-[#EC4899]",
  },
];

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

function Reveal({ children, className, delay = 0, amount = 0.22 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
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
        "bg-gradient-to-br from-[rgba(197,31,93,0.72)] via-[rgba(226,226,210,0.12)] to-[rgba(36,52,71,0.65)]",
        className
      )}
    >
      <div className="rounded-3xl border border-white/5 bg-[rgba(36,52,71,0.25)] backdrop-blur-xl">
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

function MagneticButton({ children, variant = "primary", onClick, className, icon = true, type = "button" }) {
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
      type={type}
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
      {icon ? <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" /> : null}
    </motion.button>
  );
}

function Pill({ icon: Icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold tracking-wide text-[#E2E2D2]/85 backdrop-blur sticker">
      {Icon ? <Icon className="h-4 w-4 text-[#C51F5D]" /> : null}
      <span>{children}</span>
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

function AnimatedNumber({ value, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
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
            const palette = [COLORS.brand, COLORS.text, COLORS.surface, COLORS.brand];
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
        background: "radial-gradient(circle, rgba(197,31,93,0.28), rgba(197,31,93,0.0) 70%)",
        filter: "blur(2px)",
        mixBlendMode: "screen",
      }}
    />
  );
}

function AmbientBackground() {
  const reduce = useReducedMotion();
  const stickers = useMemo(
    () => [
      { id: 1, left: "7%", top: "18%", text: "✨", cls: "float-1" },
      { id: 2, left: "87%", top: "22%", text: "🚀", cls: "float-2" },
      { id: 3, left: "12%", top: "72%", text: "🧠", cls: "float-3" },
      { id: 4, left: "90%", top: "70%", text: "🎯", cls: "float-4" },
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.10]" />

      <div className="absolute -top-56 left-[-18%] h-[700px] w-[700px] rounded-full blur-[110px] bg-blobBrand" />
      <div className="absolute right-[-20%] top-[-220px] h-[760px] w-[760px] rounded-full blur-[120px] bg-blobSurface" />
      <div className="absolute bottom-[-380px] left-[20%] h-[900px] w-[900px] rounded-full blur-[150px] bg-blobText" />

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
          <Pill icon={Sparkles}>{eyebrow}</Pill>
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

function Segmented({ tabs, value, onChange }) {
  return (
    <div className="mx-auto inline-flex rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur">
      {tabs.map((t) => {
        const active = value === t.id;
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              "relative rounded-xl px-5 py-2 text-sm font-extrabold transition",
              active ? "text-[#141D26]" : "text-[#E2E2D2]/70 hover:text-[#E2E2D2]"
            )}
            type="button"
          >
            {active ? (
              <motion.span
                layoutId="seg"
                className="absolute inset-0 rounded-xl bg-[#C51F5D]"
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              />
            ) : null}
            <span className="relative z-10 inline-flex items-center gap-2">
              <Icon className={cn("h-4 w-4", active ? "text-[#141D26]" : "text-[#C51F5D]")} />
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function IconBadge({ icon: Icon }) {
  return (
    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 sticker">
      <Icon className="h-6 w-6 text-[#C51F5D]" />
    </div>
  );
}

function StatCard({ s, i }) {
  const Icon = s.icon;
  return (
    <Reveal delay={i * 0.06}>
      <TiltCard className="h-full">
        <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:translate-y-[-5px] transition-transform">
          <div className="flex items-start justify-between gap-3">
            <AnimatedNumber value={s.value} className="text-4xl font-extrabold text-[#E2E2D2]" />
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 sticker">
              <Icon className="h-5 w-5 text-[#C51F5D]" />
            </div>
          </div>
          <div className="mt-2 text-sm text-[#E2E2D2]/65">{s.label}</div>
          <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-[#C51F5D]"
              initial={{ width: "0%" }}
              whileInView={{ width: `${72 + i * 8}%` }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

function SelectableCard({ item, active, onClick, index }) {
  const Icon = item.icon;
  return (
    <Reveal delay={index * 0.04}>
      <TiltCard className="h-full">
        <button
          type="button"
          onClick={onClick}
          className={cn(
            "h-full w-full text-left rounded-3xl border bg-white/5 p-6 backdrop-blur transition-transform",
            "hover:translate-y-[-6px]",
            active ? "border-[#C51F5D]/45 shadow-[0_16px_70px_rgba(197,31,93,0.12)]" : "border-white/10"
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={cn("grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 sticker")}>
                <Icon className="h-5 w-5 text-[#C51F5D]" />
              </div>
              <div>
                <div className="text-lg font-extrabold">{item.title}</div>
                <div className="mt-1 text-sm text-[#E2E2D2]/60">{item.desc}</div>
              </div>
            </div>

            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-[#141D26]/35">
              {active ? <Star className="h-5 w-5 text-[#C51F5D]" /> : <BadgeCheck className="h-5 w-5 text-[#243447]" />}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Chip>Outcome-focused</Chip>
            <Chip>Mentor-led</Chip>
            <Chip>Measurable</Chip>
          </div>

          <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-[#C51F5D]"
              initial={{ width: "0%" }}
              whileInView={{ width: `${68 + index * 8}%` }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>
        </button>
      </TiltCard>
    </Reveal>
  );
}

function DetailPanel({ item, metaLabel }) {
  const Icon = item?.icon ?? Sparkles;
  return (
    <GradientBorder className="sticky top-24">
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={item?.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-extrabold tracking-wide text-[#E2E2D2]/60">
                  {metaLabel}
                </div>
                <div className="mt-1 text-xl font-extrabold">{item?.title}</div>
                <div className="mt-2 text-sm text-[#E2E2D2]/70">{item?.desc}</div>
              </div>
              <IconBadge icon={Icon} />
            </div>

            <div className="mt-6 grid gap-3">
              {[
                { title: "Designed for adoption", desc: "Hands-on structure that drives real usage in the workplace." },
                { title: "Evidence-based progress", desc: "Checkpoints and outcomes you can report to stakeholders." },
                { title: "Built for your schedule", desc: "Flexible delivery without sacrificing momentum." },
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

            <div className="mt-7 flex flex-wrap gap-2">
              <Chip>Workshops</Chip>
              <Chip>Bootcamps</Chip>
              <Chip>Hybrid</Chip>
              <Chip>Team-ready</Chip>
            </div>

            <div className="mt-8 flex gap-3">
              <MagneticButton onClick={() => scrollToId("request")} variant="primary">
                Request Program
              </MagneticButton>
              <MagneticButton onClick={() => scrollToId("programs")} variant="secondary">
                View Programs
              </MagneticButton>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </GradientBorder>
  );
}

export default function CustomTrainingPage() {
  const reduce = useReducedMotion();
  const scrolled = useScrollShadow();
  const { scrollYProgress } = useScroll();
  const topBar = useSpring(scrollYProgress, { stiffness: 140, damping: 22 });

  const [confettiKey, setConfettiKey] = useState(0);

  const [tab, setTab] = useState("field");
  const cards = tab === "format" ? FORMAT_CARDS : tab === "duration" ? DURATION_CARDS : FIELD_CARDS;

  const [selected, setSelected] = useState(cards[0]);
  useEffect(() => {
    setSelected(cards[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const metaLabel = tab === "format" ? "Training Format" : tab === "duration" ? "Program Duration" : "Training Field";

  return (
    <div className="min-h-screen bg-[#141D26] text-[#E2E2D2]" style={{ backgroundColor: COLORS.bg, color: COLORS.text }}>
      <CursorAura />
      <motion.div className="fixed left-0 top-0 z-[80] h-[3px] w-full origin-left bg-[#C51F5D]" style={{ scaleX: topBar }} />

      <div className="relative">
        <AmbientBackground />

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
              type="button"
            >
              <div className="h-11 w-11 rounded-2xl border border-[#C51F5D]/35 bg-[#C51F5D]/15 grid place-items-center sticker">
                <Sparkles className="h-5 w-5 text-[#C51F5D]" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-extrabold tracking-wide">Custom Training</div>
                <div className="text-xs text-[#E2E2D2]/60">Tailored Programs</div>
              </div>
            </motion.button>

            <div className="hidden items-center gap-2 md:flex">
              {[
                ["Customize", "customize"],
                ["Programs", "programs"],
                ["Why", "why"],
                ["Request", "request"],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollToId(id)}
                  className="navlink relative px-3 py-2 text-sm font-extrabold text-[#E2E2D2]/75 hover:text-[#E2E2D2]"
                  type="button"
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
                    scrollToId("request");
                  }}
                  variant="primary"
                >
                  Get a Quote
                </MagneticButton>
              </div>
            </div>

            <div className="md:hidden relative">
              <ConfettiBurst fireKey={confettiKey} />
              <MagneticButton
                onClick={() => {
                  setConfettiKey((k) => k + 1);
                  scrollToId("request");
                }}
                variant="secondary"
                icon={false}
              >
                Request
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* HERO */}
        <section id="top" className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="mb-6">
                <Pill icon={Sparkles}>TAILORED LEARNING SOLUTIONS</Pill>
              </div>

              <motion.h1
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
                className="text-balance text-4xl font-extrabold tracking-tight sm:text-6xl"
              >
                {["Custom", "Training"].map((w, i) => (
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
                  <span className="text-[#C51F5D]">Programs</span> that your team will actually use
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.6 }}
                className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#E2E2D2]/75 sm:text-lg"
              >
                Build your team&apos;s future with programs designed around your organization&apos;s needs, goals, and delivery
                reality — with{" "}
                <span className="font-extrabold text-[#C51F5D]">measurable outcomes</span>.
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
                      scrollToId("request");
                    }}
                    variant="primary"
                  >
                    Customize Your Program
                  </MagneticButton>
                </div>
                <MagneticButton onClick={() => scrollToId("customize")} variant="secondary">
                  Explore Training Types
                </MagneticButton>
              </motion.div>

              <section className="px-0 py-10 w-full">
                <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
                  <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#C51F5D]/25 blur-3xl" />
                  <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-[#243447]/45 blur-3xl" />
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />

                  <div className="relative grid divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
                    <div className="p-8 md:p-10">
                      <p className="text-5xl font-semibold tracking-tight text-[#E2E2D2]">500+</p>
                      <p className="mt-2 text-sm font-medium text-[#E2E2D2]/80">Active Projects</p>
                      <p className="mt-1 text-xs text-[#E2E2D2]/55">Across universities & partners</p>
                    </div>

                    <div className="p-8 md:p-10">
                      <p className="text-5xl font-semibold tracking-tight text-[#E2E2D2]">50+</p>
                      <p className="mt-2 text-sm font-medium text-[#E2E2D2]/80">Partner Companies</p>
                      <p className="mt-1 text-xs text-[#E2E2D2]/55">Hiring & internship pipelines</p>
                    </div>

                    <div className="p-8 md:p-10">
                      <p className="text-5xl font-semibold tracking-tight text-[#E2E2D2]">2000+</p>
                      <p className="mt-2 text-sm font-medium text-[#E2E2D2]/80">Successful Placements</p>
                      <p className="mt-1 text-xs text-[#E2E2D2]/55">Screened and matched talent</p>
                    </div>
                  </div>
                </div>
              </section>
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
                            <Target className="h-7 w-7 text-[#C51F5D]" />
                          </div>
                          <div className="text-2xl font-extrabold">Built Around You</div>
                          <div className="mt-2 text-sm text-[#E2E2D2]/60">Field • Format • Duration</div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap justify-center gap-2">
                        <Chip>Outcomes</Chip>
                        <Chip>Adoption</Chip>
                        <Chip>ROI</Chip>
                      </div>
                    </motion.div>
                  </GradientBorder>
                </TiltCard>
              </Reveal>
            </div>
          </div>
        </section>
      </div>

      {/* CUSTOMIZE */}
      <section id="customize" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeader
          eyebrow="Customize Your Training"
          title={
            <span>
              Choose the perfect combination for your{" "}
              <span className="text-[#C51F5D]">team</span>
            </span>
          }
          subtitle="Tap a card to preview details in the sticky panel — fast, clear, and premium."
        />

        <div className="mt-8 flex justify-center">
          <Segmented
            tabs={[
              { id: "field", label: "Field", icon: Target },
              { id: "format", label: "Format", icon: Users },
              { id: "duration", label: "Duration", icon: Clock3 },
            ]}
            value={tab}
            onChange={setTab}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 grid grid-cols-1 gap-5 md:grid-cols-2">
            {cards.map((c, i) => (
              <SelectableCard
                key={c.title}
                item={c}
                index={i}
                active={selected?.title === c.title}
                onClick={() => setSelected(c)}
              />
            ))}
          </div>

          {/* DETAIL PANEL */}
          <div className="lg:col-span-5">
            <Reveal>
              <DetailPanel item={selected} metaLabel={metaLabel} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeader
          eyebrow="Training Programs We Offer"
          title={
            <span>
              Comprehensive solutions with{" "}
              <span className="text-[#C51F5D]">real</span> deliverables
            </span>
          }
          subtitle="Structured learning + practical projects + progress checkpoints."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {TRAINING_PROGRAMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.05}>
                <TiltCard>
                  <GradientBorder>
                    <div className="p-6 md:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xl font-extrabold">{p.title}</div>
                          <div className="mt-2 text-sm text-[#E2E2D2]/70">{p.desc}</div>
                        </div>
                        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 sticker">
                          <Icon className="h-6 w-6 text-[#C51F5D]" />
                        </div>
                      </div>

                      <div className="mt-6 grid gap-3">
                        {p.bullets.map((b) => (
                          <div key={b} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                            <CheckCircle2 className="h-5 w-5 text-[#C51F5D]" />
                            <div className="text-sm font-semibold text-[#E2E2D2]/90">{b}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-7 flex flex-wrap gap-2">
                        <Chip>Mentor support</Chip>
                        <Chip>Checkpoints</Chip>
                        <Chip>Portfolio-ready</Chip>
                      </div>

                      <div className="mt-7 h-2 w-full overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          className="h-full rounded-full bg-[#C51F5D]"
                          initial={{ width: "0%" }}
                          whileInView={{ width: `${76 + i * 5}%` }}
                          viewport={{ once: true, amount: 0.55 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </GradientBorder>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeader
          eyebrow="Why Choose Our Programs"
          title={
            <span>
              Experience the <span className="text-[#C51F5D]">PraktikaX</span> advantage
            </span>
          }
          subtitle="A premium learning experience that is measurable, adoptable, and scalable."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {WHY_CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={i * 0.05}>
                <TiltCard className="h-full">
                  <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur hover:translate-y-[-6px] transition-transform">
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 sticker">
                        <Icon className="h-6 w-6 text-[#C51F5D]" />
                      </div>
                      <BadgeCheck className="h-5 w-5 text-[#243447]" />
                    </div>
                    <h3 className="mt-6 text-xl font-extrabold">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#E2E2D2]/70">{c.desc}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <Chip>Enterprise-ready</Chip>
                      <Chip>Flexible</Chip>
                      <Chip>Tracked</Chip>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* REQUEST */}
      <section id="request" className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6">
        <SectionHeader
          eyebrow="Request Your Custom Program"
          title="Let's create the perfect training solution"
          subtitle="Submit your needs and we’ll reply with the best-fit program structure."
        />

        <div className="mt-10">
          <GradientBorder>
            <div className="p-6 md:p-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setConfettiKey((k) => k + 1);
                  alert("Submitted! Connect this form to your backend.");
                }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Full Name *" placeholder="John Doe" />
                  <Field label="Email Address *" placeholder="john@company.com" />
                  <Field label="Company Name *" placeholder="Your Company" />
                  <SelectField label="Team Size *" placeholder="Select team size" options={["1-10", "11-50", "51-200", "200+"]} />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <SelectField
                    label="Training Field *"
                    placeholder="Select field"
                    options={["Technology & IT", "Business & Management", "Soft Skills", "Industry-Specific"]}
                  />
                  <SelectField
                    label="Preferred Format *"
                    placeholder="Select format"
                    options={["Workshop Series", "Bootcamp Model", "Project-Based Cohort", "Hybrid Delivery"]}
                  />
                  <SelectField label="Duration *" placeholder="Select duration" options={["4 weeks", "8 weeks", "12 weeks", "16+ weeks"]} />
                </div>

                <label className="mt-5 block">
                  <span className="mb-2 block text-sm font-extrabold text-[#E2E2D2]/85">
                    Additional Details * (min 50 characters)
                  </span>
                  <textarea
                    required
                    minLength={50}
                    rows={5}
                    placeholder="Tell us more about your training needs and goals... (min 50 characters)"
                    className="w-full rounded-2xl border border-white/10 bg-[#141D26]/45 px-5 py-4 text-sm text-[#E2E2D2] placeholder:text-[#E2E2D2]/35 focus:outline-none focus:ring-2 focus:ring-[#C51F5D]/40"
                  />
                </label>

                <div className="mt-6 relative">
                  <ConfettiBurst fireKey={confettiKey + 2000} />
                  <MagneticButton type="submit" variant="primary" className="w-full py-4 text-base" icon={false}>
                    <span className="inline-flex items-center justify-center gap-3">
                      Submit Request
                      <Send className="h-5 w-5" />
                    </span>
                  </MagneticButton>
                </div>
              </form>
            </div>
          </GradientBorder>
        </div>
      </section>

      <section id="contact" className="px-6 pb-14">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_0%_20%,rgba(197,31,93,0.30),transparent_55%),radial-gradient(900px_circle_at_100%_40%,rgba(36,52,71,0.55),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />

          <div className="relative flex flex-col gap-8 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-2xl">
              <h3 className="text-3xl font-semibold tracking-tight text-[#E2E2D2] md:text-4xl">Ready to get started?</h3>
              <p className="mt-3 text-base leading-relaxed text-[#E2E2D2]/75">
                Let’s talk partnerships, programs, and how PraktikaX can help your students or hiring pipeline.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href="#"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#E2E2D2]/70 hover:border-white/20 hover:text-[#E2E2D2]"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 23.5h4V7.98h-4V23.5zM8.5 7.98h3.8v2.12h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.08v9.37h-4v-8.3c0-1.98-.04-4.52-2.76-4.52-2.76 0-3.18 2.16-3.18 4.39v8.43h-4V7.98z" />
                  </svg>
                </a>

                <a
                  href="#"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#E2E2D2]/70 hover:border-white/20 hover:text-[#E2E2D2]"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4.2A4.8 4.8 0 1 1 7.2 13 4.8 4.8 0 0 1 12 8.2zm0 2A2.8 2.8 0 1 0 14.8 13 2.8 2.8 0 0 0 12 10.2zM17.6 6.7a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#C51F5D] px-6 py-3 text-sm font-semibold text-[#E2E2D2] shadow-lg shadow-[#C51F5D]/20 hover:brightness-110 active:brightness-95"
              >
                Contact Us
                <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </a>

              <a
                href="mailto:info@praktix.eu"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-[#E2E2D2]/90 hover:border-white/20 hover:bg-white/[0.06]"
              >
                info@praktix.eu
                <span className="text-[#E2E2D2]/60">⎘</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#141D26]/70">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl border border-[#C51F5D]/35 bg-[#C51F5D]/16 grid place-items-center sticker">
                  <Sparkles className="h-5 w-5 text-[#C51F5D]" />
                </div>
                <div>
                  <div className="text-sm font-extrabold">Custom Training</div>
                  <div className="text-xs text-[#E2E2D2]/60">Tailored Programs</div>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#E2E2D2]/65">
                Practical learning, measurable outcomes, and adoption-first delivery — built to scale with your team.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ["Customize", "customize"],
                ["Programs", "programs"],
                ["Why", "why"],
                ["Request", "request"],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollToId(id)}
                  className="text-left font-extrabold text-[#E2E2D2]/70 hover:text-[#E2E2D2]"
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="text-sm font-extrabold">Ready to start?</div>
              <p className="mt-2 text-sm text-[#E2E2D2]/70">Tell us your goals — we’ll craft the best-fit structure.</p>
              <div className="mt-4 relative">
                <ConfettiBurst fireKey={confettiKey + 3000} />
                <MagneticButton
                  onClick={() => {
                    setConfettiKey((k) => k + 1);
                    scrollToId("request");
                  }}
                  variant="primary"
                >
                  Request Program
                </MagneticButton>
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-[#E2E2D2]/55">
                <Users className="h-4 w-4 text-[#C51F5D]" />
                <span>Support + analytics available</span>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-xs text-[#E2E2D2]/45">
            © {new Date().getFullYear()} Custom Training. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Minimal CSS helpers */}
      <style>{`
        .bg-grid{
          background-image:
            linear-gradient(to right, rgba(226,226,210,0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226,226,210,0.10) 1px, transparent 1px);
          background-size: 44px 44px;
          background-position: center;
        }
        .noise{
          background-image:
            repeating-linear-gradient(0deg, rgba(226,226,210,0.03) 0 1px, transparent 1px 3px),
            repeating-linear-gradient(90deg, rgba(226,226,210,0.02) 0 1px, transparent 1px 4px);
        }
        .shine{
          position:absolute; inset:-40%;
          background: linear-gradient(110deg, transparent 0%, rgba(226,226,210,0.18) 18%, transparent 36%);
          transform: translateX(-60%);
          animation: shine 3.2s ease-in-out infinite;
        }
        @keyframes shine{
          0%{ transform: translateX(-60%) rotate(6deg); }
          55%{ transform: translateX(70%) rotate(6deg); }
          100%{ transform: translateX(70%) rotate(6deg); }
        }
        .sticker{ transform: rotate(-1deg); }
        .float-1{ animation: float1 6s ease-in-out infinite; }
        .float-2{ animation: float2 7s ease-in-out infinite; }
        .float-3{ animation: float3 6.5s ease-in-out infinite; }
        .float-4{ animation: float4 7.5s ease-in-out infinite; }
        @keyframes float1{ 0%,100%{ transform: translateY(0px) rotate(-2deg);} 50%{ transform: translateY(-10px) rotate(2deg);} }
        @keyframes float2{ 0%,100%{ transform: translateY(0px) rotate(2deg);} 50%{ transform: translateY(-12px) rotate(-2deg);} }
        @keyframes float3{ 0%,100%{ transform: translateY(0px) rotate(-1deg);} 50%{ transform: translateY(-9px) rotate(2deg);} }
        @keyframes float4{ 0%,100%{ transform: translateY(0px) rotate(1deg);} 50%{ transform: translateY(-11px) rotate(-2deg);} }
        .bg-blobBrand{ background: radial-gradient(circle, rgba(197,31,93,0.22), rgba(197,31,93,0) 70%); }
        .bg-blobSurface{ background: radial-gradient(circle, rgba(36,52,71,0.55), rgba(36,52,71,0) 70%); }
        .bg-blobText{ background: radial-gradient(circle, rgba(226,226,210,0.10), rgba(226,226,210,0) 70%); }
      `}</style>
    </div>
  );
}

function Field({ label, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold text-[#E2E2D2]/85">{label}</span>
      <input
        required
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-[#141D26]/45 px-5 py-3 text-sm text-[#E2E2D2] placeholder:text-[#E2E2D2]/35 focus:outline-none focus:ring-2 focus:ring-[#C51F5D]/40"
      />
    </label>
  );
}

function SelectField({ label, placeholder, options }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold text-[#E2E2D2]/85">{label}</span>
      <select
        required
        defaultValue=""
        className="w-full rounded-2xl border border-white/10 bg-[#141D26]/45 px-5 py-3 text-sm text-[#E2E2D2] focus:outline-none focus:ring-2 focus:ring-[#C51F5D]/40"
      >
        <option value="" disabled className="bg-[#141D26]">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-[#141D26]">
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
