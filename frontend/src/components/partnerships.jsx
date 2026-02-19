import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Compass,
  FileCheck2,
  Globe2,
  GraduationCap,
  Handshake,
  LineChart,
  MapPin,
  Shield,
  Sparkles,
  Star,
  Target,
  Zap,
  Briefcase,
  Users,
  Network,
  Landmark,
  Mail,
  Phone,
  Link as LinkIcon,
  Upload,
  CheckCircle2,
} from "lucide-react";

/** ---------------- THEME (same as your provided code) ---------------- */
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
void motion;

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

/** ---------------- VIEWPORT HOOK ---------------- */
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

/** ---------------- ANIMATED NUMBER ---------------- */
function AnimatedNumber({ value, suffix = "", durationMs = 900 }) {
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

  return (
    <span>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

/** ---------------- UI ATOMS ---------------- */
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

function Pill({ label, tone = "dark" }) {
  const dark = tone === "dark";
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
      style={{
        background: dark ? "rgba(255,255,255,0.08)" : "rgba(11,18,32,0.06)",
        color: dark ? "rgba(255,255,255,0.84)" : "rgba(11,18,32,0.75)",
        border: dark
          ? "1px solid rgba(255,255,255,0.12)"
          : "1px solid rgba(11,18,32,0.12)",
      }}
    >
      {label}
    </span>
  );
}

function SectionTitle({ eyebrow, title, accentText, subtitle, dark = false }) {
  return (
    <div className={cx("mx-auto max-w-6xl", dark ? "text-white" : "text-[#0B1220]")}>
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
          eyebrow ? "mt-5 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl" : "mt-0 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl",
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
            "mt-3 max-w-5xl text-balance text-base sm:text-lg",
            dark ? "text-white/70" : "text-[#0B1220]/70"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function MagneticButton({ children, href, onClick, variant = "primary" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const primary =
    "text-white shadow-[0_16px_40px_rgba(34,211,238,0.16)] hover:translate-y-[-1px] active:translate-y-[0px]";
  const secondary =
    "bg-transparent text-white ring-1 ring-white/20 hover:bg-white/5";

  const stylePrimary = {
    background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.84)} 55%, ${accent(
      0.60
    )} 120%)`,
  };

  const Comp = href ? "a" : "button";
  const props = href ? { href } : { type: "button" };

  function onMove(e) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    setPos({ x: x * 0.18, y: y * 0.18 });
  }

  function onLeave() {
    setPos({ x: 0, y: 0 });
  }

  return (
    <Comp
      {...props}
      onClick={onClick}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cx(base, variant === "primary" ? primary : secondary)}
      style={variant === "primary" ? stylePrimary : undefined}
    >
      <motion.span
        animate={reduce ? undefined : { x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
        className="inline-flex items-center gap-2"
      >
        {children}
        <ArrowRight className="h-4 w-4" {...iconStrongProps} />
      </motion.span>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full opacity-0 transition-opacity duration-200 hover:opacity-100">
        <span className="shine" />
      </span>
    </Comp>
  );
}

/** ---------------- PAGE DATA (from PDF content) ---------------- */
const ARCHITECTURE = [
  {
    title: "University Partnerships",
    desc: "Integrate real industry experience into academic frameworks through structured internships, industrial courses, and co-hosted initiatives.",
    icon: GraduationCap,
    accent: THEME.accent2,
    photo:
      "/images/uni-partnership.jpg",
    bullets: [
      "Industry-integrated internships (3–6 months)",
      "Industrial courses aligned with curricula",
      "Co-hosted global programs",
      "Portfolio-driven outcomes",
      "Academic–industry integration",
    ],
  },
  {
    title: "Industry & Corporate Partnerships",
    desc: "Workforce development, innovation acceleration, and future skills adoption through tailored programs and execution models.",
    icon: Building2,
    accent: THEME.accent,
    photo:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
    bullets: [
      "AI & emerging tech upskilling",
      "Tailored executive programs",
      "Workshops & masterclasses",
      "Employee development tracks",
      "Innovation labs collaboration",
    ],
  },
  {
    title: "Strategic Alliances",
    desc: "Long-term institutional collaboration designed to create ecosystem-level impact across regions and sectors.",
    icon: Landmark,
    accent: THEME.accent4,
    photo:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1400&q=80",
    bullets: [
      "Government collaboration",
      "Innovation ecosystem development",
      "Public-private partnerships",
      "Regional transformation initiatives",
      "International program expansion",
    ],
  },
  {
    title: "Co-Hosted Programs",
    desc: "Co-host programs leveraging our European expert network while enhancing institutional positioning and shared outcomes.",
    icon: Handshake,
    accent: THEME.accent3,
    photo:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80",
    bullets: [
      "Joint certification",
      "Shared academic branding",
      "Onsite / hybrid implementation",
      "Faculty collaboration",
    ],
  },
];

const EXPERT_OPPORTUNITIES = [
  { label: "Internship supervision", icon: Briefcase, color: THEME.accent3 },
  { label: "AI & executive workshops", icon: Sparkles, color: THEME.accent2 },
  { label: "Curriculum co-design", icon: ClipboardCheck, color: THEME.accent4 },
  { label: "Industry mentorship", icon: Users, color: THEME.accent },
  { label: "Advisory boards", icon: Shield, color: THEME.accent3 },
];

const EXPERT_ELIGIBILITY = [
  "Proven industry experience",
  "Academic background (preferred but not mandatory)",
  "Leadership or project ownership experience",
  "Fluent professional communication",
];

const IMPACT_METRICS = [
  { label: "Trainees engaged", value: 1000, suffix: "+", icon: GraduationCap, color: THEME.accent },
  { label: "Institutional collaborations", value: 40, suffix: "+", icon: Network, color: THEME.accent2 },
  { label: "Industry mentors", value: 20, suffix: "+", icon: BadgeCheck, color: THEME.accent3 },
  { label: "Portfolio completion", value: 85, suffix: "%", icon: FileCheck2, color: THEME.accent4 },
  { label: "Improved career readiness", value: 70, suffix: "%", icon: Target, color: THEME.accent },
];

const WHY_PARTNER = [
  "Structured delivery model",
  "Real project-based execution",
  "European academic & industry integration",
  "AI-driven curriculum evolution",
  "Measurable outcomes",
  "Scalable deployment",
];

const PORTRAITS = [
  {
    name: "Prof. Elina M.",
    role: "University Professor • AI Systems",
    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    bio: "Curriculum co-design + academic rigor for outcome-based programs.",
    accent: THEME.accent2,
  },
  {
    name: "David K.",
    role: "Senior Consultant • Digital Transformation",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
    bio: "Workforce transformation roadmaps and scalable delivery playbooks.",
    accent: THEME.accent,
  },
  {
    name: "Sara N.",
    role: "Industry Mentor • Data & BI",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    bio: "Mentorship and evaluation loops to ship portfolio-grade dashboards.",
    accent: THEME.accent4,
  },
  {
    name: "Lukas R.",
    role: "Engineering Lead • Cloud & DevOps",
    photo:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80",
    bio: "Hands-on supervision for real infra + CI/CD production outputs.",
    accent: THEME.accent3,
  },
];

/** ---------------- HERO: network glow background nodes ---------------- */
function NetworkBackdrop() {
  // purely decorative; different from your other hero
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* subtle photo layer */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(900px circle at 15% 20%, rgba(34,211,238,0.18), transparent 55%), radial-gradient(900px circle at 85% 35%, rgba(167,139,250,0.16), transparent 55%), radial-gradient(900px circle at 60% 90%, rgba(245,158,11,0.12), transparent 55%)",
        }}
      />
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233,231,223,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(233,231,223,0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(900px circle at 30% 25%, rgba(0,0,0,1), transparent 70%)",
        }}
      />
      {/* animated constellation */}
      <div className="absolute inset-0 opacity-80">
        <div className="constellation" />
      </div>
    </div>
  );
}

/** ---------------- ARCHITECTURE CARD ---------------- */
function ArchitectureCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: Math.min(index * 0.06, 0.18) }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group relative overflow-hidden rounded-[36px] bg-white/5 ring-1 ring-white/10 backdrop-blur"
      style={{ boxShadow: "0 22px 80px rgba(0,0,0,0.35)" }}
    >
      {/* photo */}
      <div className="absolute inset-0">
        <img
          src={item.photo}
          alt={item.title}
          className="h-full w-full object-cover opacity-[0.45] transition duration-500 group-hover:opacity-[0.58] group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,18,32,0.42) 0%, rgba(11,18,32,0.72) 65%, rgba(11,18,32,0.84) 100%)",
          }}
        />
      </div>

      {/* top accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-1 opacity-90"
        style={{ background: `linear-gradient(90deg, ${item.accent} 0%, rgba(255,255,255,0) 80%)` }}
      />

      {/* hover shine */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="shine" />
      </div>

      <div className="relative p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 6 }}
              className="relative"
            >
              <IconBadge color={item.accent}>
                <Icon className="h-5 w-5" {...iconStrongProps} />
              </IconBadge>
              <span
                className="pointer-events-none absolute -right-2 -top-2 h-3 w-3 rounded-full"
                style={{ background: item.accent, boxShadow: `0 0 0 6px rgba(255,255,255,0.06)` }}
              />
            </motion.div>

            <div>
              <div className="text-lg font-semibold text-white" style={clampStyle(2)}>
                {item.title}
              </div>
            </div>
          </div>

        </div>

        <p className="mt-4 text-sm leading-relaxed text-white/70" style={clampStyle(3)}>
          {item.desc}
        </p>

        <div className="mt-5 grid grid-cols-1 gap-2">
          {item.bullets.slice(0, 5).map((b) => (
            <div key={b} className="flex items-start gap-3">
              <span
                className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full ring-1"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.10)",
                }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: item.accent }} />
              </span>
              <div className="text-sm text-white/80">{b}</div>
            </div>
          ))}
        </div>

      </div>
    </motion.article>
  );
}

/** ---------------- EXPERT PORTRAIT TILE ---------------- */
function PortraitTile({ p, idx }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.06 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[32px] bg-white/5 ring-1 ring-white/10 backdrop-blur"
      style={{ boxShadow: "0 20px 70px rgba(0,0,0,0.32)" }}
    >
      <div className="absolute inset-0">
        <img
          src={p.photo}
          alt={p.name}
          className="h-full w-full object-cover opacity-[0.95] transition duration-500 group-hover:scale-[1.04]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,18,32,0.06) 0%, rgba(11,18,32,0.88) 70%, rgba(11,18,32,0.98) 100%)",
          }}
        />
      </div>

      <div
        className="absolute inset-x-0 top-0 h-1 opacity-90"
        style={{ background: `linear-gradient(90deg, ${p.accent} 0%, rgba(255,255,255,0) 80%)` }}
      />

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-base font-semibold text-white">{p.name}</div>
            <div className="mt-1 text-sm text-white/70">{p.role}</div>
          </div>

          <div className="hidden sm:block">
            <IconBadge color={p.accent}>
              <BadgeCheck className="h-5 w-5" {...iconStrongProps} />
            </IconBadge>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-2xl p-4 ring-1"
          style={{
            background: "rgba(255,255,255,0.06)",
            borderColor: "rgba(255,255,255,0.10)",
          }}
        >
          <div className="text-xs font-semibold tracking-widest text-white/60">BIO</div>
          <div className="mt-2 text-sm text-white/80" style={clampStyle(3)}>
            {p.bio}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/** ---------------- MAP PANEL (animated SVG connections) ---------------- */
function ReachMap() {
  const reduce = useReducedMotion();

  const points = [
    { id: "hub", x: 49, y: 32, label: "Europe Hub", color: THEME.accent2 },
    { id: "universities", x: 62, y: 26, label: "Universities", color: THEME.accent },
    { id: "industry", x: 43, y: 42, label: "Industry", color: THEME.accent3 },
    { id: "mena", x: 70, y: 56, label: "MENA Expansion", color: THEME.accent4 },
  ];

  const paths = [
    { from: "universities", to: "hub", color: THEME.accent, bend: 10 },
    { from: "industry", to: "hub", color: THEME.accent3, bend: 8 },
    { from: "industry", to: "universities", color: "rgba(255,255,255,0.45)", bend: 12 },
    { from: "hub", to: "mena", color: THEME.accent2, bend: 14 },
  ];

  const byId = Object.fromEntries(points.map((p) => [p.id, p]));

  return (
    <div
      className="relative overflow-hidden rounded-[40px] ring-1 ring-white/10"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
        boxShadow: "0 26px 90px rgba(0,0,0,0.35)",
      }}
    >
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(34,211,238,0.14)" }} />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(167,139,250,0.12)" }} />

      {/* photo removed: clean layered background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,18,32,0.55) 0%, rgba(11,18,32,0.82) 100%)",
        }}
      />

      <div className="relative p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold tracking-widest text-white/60">GLOBAL REACH</div>
            <div className="mt-2 text-2xl font-semibold text-white">
              A European-rooted network with international expansion
            </div>
            <p className="mt-2 max-w-xl text-sm text-white/70">
              Universities, corporations, and ecosystems across Europe — with growing momentum in MENA and global markets.
            </p>
          </div>

        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-[32px] ring-1 ring-white/10 bg-white/5 backdrop-blur">
              <svg viewBox="0 0 100 70" className="h-[320px] w-full">
                {/* subtle "continent" blob */}
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="1.4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="ocean" x1="0" x2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                  </linearGradient>
                </defs>

                <rect x="0" y="0" width="100" height="70" fill="url(#ocean)" />

                <g transform="translate(0,-8)">
                  {/* abstract land */}
                  <path
                    d="M20,50 C27,33 36,21 50,18 C58,16 64,20 69,25 C75,30 82,30 84,37 C86,47 78,55 64,60 C49,65 32,62 20,50 Z"
                    fill="rgba(255,255,255,0.06)"
                    stroke="rgba(255,255,255,0.10)"
                    strokeWidth="0.5"
                  />

                  {/* connections */}
                  {paths.map((p, i) => {
                    const a = byId[p.from];
                    const b = byId[p.to];
                    const midX = (a.x + b.x) / 2;
                    const bend = p.bend ?? 10;
                    const d = `M ${a.x} ${a.y} C ${midX - 3} ${a.y - bend}, ${midX + 4} ${b.y + bend * 0.35}, ${b.x} ${b.y}`;
                    return (
                      <motion.path
                        key={i}
                        d={d}
                        fill="none"
                        stroke={p.color}
                        strokeOpacity="0.75"
                        strokeWidth="0.8"
                        filter="url(#glow)"
                        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                        animate={reduce ? false : { pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.15 + i * 0.12 }}
                        strokeDasharray="1 1"
                      />
                    );
                  })}

                  {/* points */}
                  {points.map((pt, i) => (
                    <g key={pt.id}>
                      <motion.circle
                        cx={pt.x}
                        cy={pt.y}
                        r="2.1"
                        fill={pt.color}
                        filter="url(#glow)"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 + i * 0.08 }}
                      />
                      {!reduce ? (
                        <motion.circle
                          cx={pt.x}
                          cy={pt.y}
                          r="5.2"
                          fill="transparent"
                          stroke={pt.color}
                          strokeOpacity="0.35"
                          strokeWidth="0.7"
                          animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.5, 0.25] }}
                          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                        />
                      ) : null}
                    </g>
                  ))}
                </g>
              </svg>

              {/* legend */}
              <div className="absolute left-4 bottom-4">
                <div className="flex flex-col gap-2">
                  {points.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 rounded-2xl px-4 py-2.5 ring-1"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        borderColor: "rgba(255,255,255,0.10)",
                      }}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: p.color, boxShadow: `0 0 0 6px rgba(255,255,255,0.05)` }}
                      />
                      <div className="text-sm font-semibold text-white">{p.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* side highlights */}
          <div className="lg:col-span-2 space-y-3">
            {[
              { icon: GraduationCap, title: "European professors", desc: "Outcome-first academic integration.", color: THEME.accent2 },
              { icon: Building2, title: "Leading companies", desc: "Mentors & partners across sectors.", color: THEME.accent3 },
              { icon: Globe2, title: "Cross-border delivery", desc: "Hybrid, onsite, and remote pathways.", color: THEME.accent },
            ].map((h, idx) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.06 }}
                  className="rounded-[28px] bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur"
                >
                  <div className="flex items-start gap-3">
                    <IconBadge color={h.color}>
                      <Icon className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                    <div>
                      <div className="text-sm font-semibold text-white">{h.title}</div>
                      <div className="mt-1 text-sm text-white/70">{h.desc}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/** ---------------- METRICS STRIP ---------------- */
function MetricsStrip() {
  const { ref: impactRef, inView: isImpactInView } = useInViewOnce(0.25);
  return (
    <div ref={impactRef} className="mt-10">
      <div
        className="relative overflow-hidden rounded-[40px] ring-1 ring-white/10"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
          boxShadow: "0 26px 90px rgba(0,0,0,0.35)",
        }}
      >
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(245,158,11,0.10)" }} />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(34,211,238,0.12)" }} />

        <div className="relative p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold tracking-widest text-white/60">PARTNERSHIP IMPACT</div>
              <div className="mt-2 text-2xl font-semibold text-white">Measured outcomes — not theoretical engagement</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {IMPACT_METRICS.map((m, idx) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isImpactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="rounded-[28px] bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur"
                >
                  <div className="flex items-start justify-between gap-3">
                    <IconBadge color={m.color}>
                      <Icon className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                    <div className="h-10 w-1 rounded-full" style={{ background: m.color, opacity: 0.55 }} />
                  </div>
                  <div className="mt-4 text-3xl font-semibold text-white">
                    {isImpactInView ? <AnimatedNumber value={m.value} suffix={m.suffix} /> : "0"}
                  </div>
                  <div className="mt-1 text-sm text-white/70">{m.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/** ---------------- WHY PARTNER ---------------- */
function WhyPartner() {
  return (
    <div className="mt-10">
      <div className="rounded-[40px] bg-white/55 p-7 ring-1 ring-[#0B1220]/10 backdrop-blur">
        <div className="flex items-center gap-3">
          <IconBadge color={THEME.accent}>
            <Star className="h-5 w-5" style={{ color: THEME.star, fill: THEME.star }} strokeWidth={2.2} />
          </IconBadge>
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">WHY PARTNER</div>
            <div className="mt-1 text-lg font-semibold text-[#0B1220]">Why Institutions Choose Praktix</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {WHY_PARTNER.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
              className="flex items-start gap-3 rounded-3xl bg-white/60 p-5 ring-1 ring-[#0B1220]/10"
            >
              <span
                className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl ring-1"
                style={{
                  background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.25)} 120%)`,
                  borderColor: "rgba(11,18,32,0.10)",
                }}
              >
                <CheckCircle2 className="h-4 w-4 text-white" {...iconStrongProps} />
              </span>
              <div className="text-sm font-semibold text-[#0B1220]/80">{b}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** ---------------- MULTI-STEP FORM (wizard) ---------------- */
function FormWizard() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [applicantType, setApplicantType] = useState("University / Educational Institution");

  const [basic, setBasic] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    orgName: "",
    position: "",
    linkedin: "",
    website: "",
  });

  const [partnership, setPartnership] = useState({
    collab: [],
    deliveryMode: "Online",
    participants: "10–25",
    startTimeline: "Within 1 Month",
    duration: "3 Months",
    objectives: "",
  });

  const [expert, setExpert] = useState({
    expertise: [],
    years: "5–10",
    organization: "",
    roleType: "Industry Professional",
    availability: "4–8 Hours",
    engagement: [],
    delivery: "Online",
    travel: false,
    hasMaterial: "Partially",
    contentTypes: [],
    coDesign: true,
    ledProjects: true,
    projectsDesc: "",
    references: true,
    portfolio: "",
    scholar: "",
    compensation: "Per Program",
    longTerm: true,
  });

  const [alignment, setAlignment] = useState({
    why: "",
    impact: "",
    confirm: false,
    contact: false,
    consent: false,
  });

  const isExpert = applicantType === "Industry Expert / University Professor";

  const steps = useMemo(() => {
    const arr = [
      { key: "type", label: "Applicant Type" },
      { key: "basic", label: "Basic Info" },
      { key: isExpert ? "expert" : "partnership", label: isExpert ? "Expert Profile" : "Partnership Details" },
      { key: "alignment", label: "Alignment & Compliance" },
      { key: "review", label: "Review & Submit" },
    ];
    return arr;
  }, [isExpert]);

  const pct = Math.round(((step + 1) / steps.length) * 100);

  function next() {
    setStep((s) => Math.min(steps.length - 1, s + 1));
  }
  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function resetForm() {
    setStep(0);
    setApplicantType("University / Educational Institution");
    setBasic({
      fullName: "",
      email: "",
      phone: "",
      country: "",
      orgName: "",
      position: "",
      linkedin: "",
      website: "",
    });
    setPartnership({
      collab: [],
      deliveryMode: "Online",
      participants: "10–25",
      startTimeline: "Within 1 Month",
      duration: "3 Months",
      objectives: "",
    });
    setExpert({
      expertise: [],
      years: "5–10",
      organization: "",
      roleType: "Industry Professional",
      availability: "4–8 Hours",
      engagement: [],
      delivery: "Online",
      travel: false,
      hasMaterial: "Partially",
      contentTypes: [],
      coDesign: true,
      ledProjects: true,
      projectsDesc: "",
      references: true,
      portfolio: "",
      scholar: "",
      compensation: "Per Program",
      longTerm: true,
    });
    setAlignment({
      why: "",
      impact: "",
      confirm: false,
      contact: false,
      consent: false,
    });
  }

  function submit() {
    // hook your API here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 9000);
    resetForm();
  }

  return (
    <div className="mt-10">
      <div className="relative overflow-hidden rounded-[42px] p-[1px]" style={{ background: "#FFFFFF", boxShadow: "0 26px 90px rgba(0,0,0,0.18)" }}>
        <div className="relative rounded-[40px] bg-white/55 p-6 sm:p-8 ring-1 ring-[#0B1220]/10 backdrop-blur">
          <AnimatePresence>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, x: 24, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 24, y: 24, scale: 0.96 }}
                className="fixed bottom-4 left-1/2 z-[95] w-[min(92vw,560px)] -translate-x-1/2"
              >
                <div className="rounded-2xl border border-[#C51F5D]/40 bg-gradient-to-r from-[#0B1220]/95 via-[#1A2340]/95 to-[#0B1220]/95 p-4 text-white shadow-[0_18px_55px_rgba(197,31,93,0.35)] backdrop-blur">
                  <p className="text-sm leading-relaxed text-white/95">
                    Thank you. Your form was submitted successfully. Our team will review it and contact you within 3-5 business days.
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mt-1 text-2xl font-semibold text-[#0B1220]">Partnership & Expert Application Form</div>
              <p className="mt-2 max-w-3xl text-sm text-[#0B1220]/70">
                We collaborate with universities, corporations, public institutions, and industry experts to deliver structured, measurable professional impact.
              </p>
              <p className="mt-2 max-w-3xl text-sm text-[#0B1220]/70">
                Please complete the form below to initiate a partnership or apply to join our expert network.
              </p>
            </div>

            <div className="w-full sm:w-[280px]">
              <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">PROGRESS</div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#0B1220]/10">
                <motion.div
                  className="h-full"
                  initial={false}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.55)} 100%)` }}
                />
              </div>
              <div className="mt-2 text-xs text-[#0B1220]/60">
                Step {step + 1} of {steps.length}: <span className="font-semibold">{steps[step].label}</span>
              </div>
            </div>
          </div>

          {/* stepper pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {steps.map((s, idx) => {
              const active = idx === step;
              const done = idx < step;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setStep(idx)}
                  className="rounded-full px-4 py-2 text-xs font-semibold ring-1 transition"
                  style={{
                    background: active
                      ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.45)} 100%)`
                      : done
                      ? "rgba(52,211,153,0.14)"
                      : "rgba(11,18,32,0.06)",
                    borderColor: active ? "rgba(11,18,32,0.10)" : "rgba(11,18,32,0.12)",
                    color: active ? "white" : "rgba(11,18,32,0.72)",
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* body */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              {steps[step].key === "type" ? (
                <motion.div
                  key="type"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="grid grid-cols-1 gap-4"
                >
                  <FormCard
                    title="Choose applicant type"
                    icon={<Users className="h-5 w-5" {...iconStrongProps} />}
                  >
                    <RadioGroup
                      value={applicantType}
                      onChange={setApplicantType}
                      options={[
                        "University / Educational Institution",
                        "Company / Organization",
                        "Government / Public Sector",
                        "Industry Expert / University Professor",
                      ]}
                    />
                    <div className="mt-4 text-sm text-[#0B1220]/70">
                      Conditional sections will appear based on your selection.
                    </div>
                  </FormCard>

                </motion.div>
              ) : null}

              {steps[step].key === "basic" ? (
                <motion.div
                  key="basic"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Full Name" required>
                      <Input
                        icon={BadgeCheck}
                        iconColor={THEME.accent2}
                        placeholder="Your full name"
                        value={basic.fullName}
                        onChange={(e) => setBasic({ ...basic, fullName: e.target.value })}
                      />
                    </Field>

                    <Field label="Email Address" required>
                      <Input
                        icon={Mail}
                        iconColor={THEME.accent}
                        placeholder="name@email.com"
                        type="email"
                        value={basic.email}
                        onChange={(e) => setBasic({ ...basic, email: e.target.value })}
                      />
                    </Field>

                    <Field label="Phone Number">
                      <Input
                        icon={Phone}
                        iconColor={THEME.accent3}
                        placeholder="+(country code) ..."
                        value={basic.phone}
                        onChange={(e) => setBasic({ ...basic, phone: e.target.value })}
                      />
                    </Field>

                    <Field label="Country of Residence">
                      <Input
                        icon={MapPin}
                        iconColor={THEME.accent4}
                        placeholder="Country"
                        value={basic.country}
                        onChange={(e) => setBasic({ ...basic, country: e.target.value })}
                      />
                    </Field>

                    <Field label="Organization Name (if applicable)">
                      <Input
                        icon={Building2}
                        iconColor={THEME.accent}
                        placeholder="University / Company / Entity"
                        value={basic.orgName}
                        onChange={(e) => setBasic({ ...basic, orgName: e.target.value })}
                      />
                    </Field>

                    <Field label="Current Position / Title">
                      <Input
                        icon={Briefcase}
                        iconColor={THEME.accent3}
                        placeholder="Role / Title"
                        value={basic.position}
                        onChange={(e) => setBasic({ ...basic, position: e.target.value })}
                      />
                    </Field>

                    <Field
                      label="LinkedIn Profile URL"
                      required={isExpert}
                      hint={isExpert ? "Required for experts" : "Optional"}
                    >
                      <Input
                        icon={LinkIcon}
                        iconColor={THEME.accent2}
                        placeholder="https://linkedin.com/in/..."
                        value={basic.linkedin}
                        onChange={(e) => setBasic({ ...basic, linkedin: e.target.value })}
                      />
                    </Field>

                    <Field label="Company / University Website">
                      <Input
                        icon={Globe2}
                        iconColor={THEME.accent4}
                        placeholder="https://..."
                        value={basic.website}
                        onChange={(e) => setBasic({ ...basic, website: e.target.value })}
                      />
                    </Field>
                  </div>
                </motion.div>
              ) : null}

              {steps[step].key === "partnership" ? (
                <motion.div
                  key="partnership"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="Type of collaboration interested in" required hint="Multi-select">
                          <MultiSelect
                            value={partnership.collab}
                            onChange={(v) => setPartnership({ ...partnership, collab: v })}
                            options={[
                              "Internship Programs (3–6 months)",
                              "AI Training Programs",
                              "Industrial Courses Integration",
                              "Executive Workshops",
                              "Tailored Corporate Programs",
                              "Co-Hosted Programs",
                              "Strategic Alliance",
                              "Hiring Initiatives",
                              "Research Collaboration",
                            ]}
                          />
                        </Field>

                        <div className="space-y-4">
                          <Field label="Preferred delivery mode">
                            <Select
                              value={partnership.deliveryMode}
                              onChange={(v) => setPartnership({ ...partnership, deliveryMode: v })}
                              options={["Online", "Hybrid", "Onsite"]}
                              icon={Compass}
                              iconColor={THEME.accent}
                            />
                          </Field>

                          <Field label="Estimated number of participants">
                            <Select
                              value={partnership.participants}
                              onChange={(v) => setPartnership({ ...partnership, participants: v })}
                              options={["10–25", "25–50", "50–100", "100+"]}
                              icon={Users}
                              iconColor={THEME.accent3}
                            />
                          </Field>
                        </div>

                        <Field label="Expected start timeline">
                          <Select
                            value={partnership.startTimeline}
                            onChange={(v) => setPartnership({ ...partnership, startTimeline: v })}
                            options={["Immediately", "Within 1 Month", "Within 3 Months", "Within 6 Months"]}
                            icon={Calendar}
                            iconColor={THEME.accent4}
                          />
                        </Field>

                        <Field label="Program duration preference">
                          <Select
                            value={partnership.duration}
                            onChange={(v) => setPartnership({ ...partnership, duration: v })}
                            options={["1–2 Weeks", "1 Month", "3 Months", "3–6 Months", "Custom"]}
                            icon={LineChart}
                            iconColor={THEME.accent2}
                          />
                        </Field>

                        <Field label="Primary objectives (outcomes you aim to achieve)" required>
                          <Textarea
                            value={partnership.objectives}
                            onChange={(e) => setPartnership({ ...partnership, objectives: e.target.value })}
                            placeholder="What outcomes are you aiming to achieve?"
                          />
                        </Field>
                      </div>
                    </div>

                  </div>
                </motion.div>
              ) : null}

              {steps[step].key === "expert" ? (
                <motion.div
                  key="expert"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="Primary area of expertise" required hint="Multi-select">
                          <MultiSelect
                            value={expert.expertise}
                            onChange={(v) => setExpert({ ...expert, expertise: v })}
                            options={[
                              "Software Development",
                              "AI & Machine Learning",
                              "Data Science",
                              "Cloud & DevOps",
                              "Cybersecurity",
                              "Digital Transformation",
                              "Product Management",
                              "UX/UI",
                              "Business & Consulting",
                              "Finance & FinTech",
                              "Healthcare & Digital Health",
                              "Marketing & Growth",
                              "Entrepreneurship",
                              "Supply Chain",
                              "Project Management",
                              "Other (Specify)",
                            ]}
                          />
                        </Field>

                        <div className="space-y-4">
                          <Field label="Years of professional experience">
                            <Select
                              value={expert.years}
                              onChange={(v) => setExpert({ ...expert, years: v })}
                              options={["3–5", "5–10", "10–15", "15+"]}
                              icon={BadgeCheck}
                              iconColor={THEME.accent3}
                            />
                          </Field>

                          <Field label="Role type">
                            <Select
                              value={expert.roleType}
                              onChange={(v) => setExpert({ ...expert, roleType: v })}
                              options={["Industry Professional", "University Professor", "Consultant", "Executive", "Founder", "Other"]}
                              icon={Briefcase}
                              iconColor={THEME.accent4}
                            />
                          </Field>
                        </div>

                        <Field label="Current organization">
                          <Input
                            icon={Building2}
                            iconColor={THEME.accent}
                            placeholder="Company / University name"
                            value={expert.organization}
                            onChange={(e) => setExpert({ ...expert, organization: e.target.value })}
                          />
                        </Field>

                        <Field label="Weekly availability (hours)">
                          <Select
                            value={expert.availability}
                            onChange={(v) => setExpert({ ...expert, availability: v })}
                            options={["2–4 Hours", "4–8 Hours", "8–12 Hours", "12+ Hours"]}
                            icon={Calendar}
                            iconColor={THEME.accent2}
                          />
                        </Field>

                        <Field label="Preferred engagement type" required hint="Multi-select">
                          <MultiSelect
                            value={expert.engagement}
                            onChange={(v) => setExpert({ ...expert, engagement: v })}
                            options={[
                              "Internship Supervision",
                              "1-to-1 Mentorship",
                              "Workshops & Masterclasses",
                              "AI Training Programs",
                              "Curriculum Co-Design",
                              "Advisory Board",
                              "Research Supervision",
                            ]}
                          />
                        </Field>

                        <Field label="Delivery preference">
                          <Select
                            value={expert.delivery}
                            onChange={(v) => setExpert({ ...expert, delivery: v })}
                            options={["Online", "Hybrid", "Onsite (Europe)", "Onsite (MENA)"]}
                            icon={Compass}
                            iconColor={THEME.accent}
                          />
                        </Field>

                        <Field label="Do you have existing training material?">
                          <Select
                            value={expert.hasMaterial}
                            onChange={(v) => setExpert({ ...expert, hasMaterial: v })}
                            options={["Yes", "No", "Partially"]}
                            icon={FileCheck2}
                            iconColor={THEME.accent4}
                          />
                        </Field>

                        <Field label="Type of content available" hint="Optional">
                          <MultiSelect
                            value={expert.contentTypes}
                            onChange={(v) => setExpert({ ...expert, contentTypes: v })}
                            options={[
                              "Course Curriculum",
                              "Slides & Workshops",
                              "Case Studies",
                              "Real Industry Projects",
                              "Recorded Sessions",
                              "AI Labs / Technical Modules",
                            ]}
                          />
                        </Field>

                        <Field label="Key projects (short description)">
                          <Textarea
                            value={expert.projectsDesc}
                            onChange={(e) => setExpert({ ...expert, projectsDesc: e.target.value })}
                            placeholder="Short description of key projects"
                          />
                        </Field>

                        <Field label="Portfolio / personal website URL">
                          <Input
                            icon={Globe2}
                            iconColor={THEME.accent3}
                            placeholder="https://..."
                            value={expert.portfolio}
                            onChange={(e) => setExpert({ ...expert, portfolio: e.target.value })}
                          />
                        </Field>

	                        <Field label="Preferred collaboration model">
	                          <Select
	                            value={expert.compensation}
	                            onChange={(v) => setExpert({ ...expert, compensation: v })}
	                            options={["Per Program", "Per Hour"]}
	                            icon={Handshake}
	                            iconColor={THEME.accent4}
	                          />
	                        </Field>

                        <Field label="Uploads (optional)">
                          <FileRow />
                        </Field>
                      </div>
                    </div>

                  </div>
                </motion.div>
              ) : null}

              {steps[step].key === "alignment" ? (
                <motion.div
                  key="alignment"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="grid grid-cols-1 gap-6"
                >
                  <div className="space-y-4">
                    <Field label="Why do you want to collaborate with Praktix?" required>
                      <Textarea
                        value={alignment.why}
                        onChange={(e) => setAlignment({ ...alignment, why: e.target.value })}
                        placeholder="Explain motivation and collaboration goals."
                      />
                    </Field>

                    <Field label="What impact do you want to create?" required>
                      <Textarea
                        value={alignment.impact}
                        onChange={(e) => setAlignment({ ...alignment, impact: e.target.value })}
                        placeholder="Describe the impact you want to achieve (outcomes)."
                      />
                    </Field>
                  </div>

                  <div className="space-y-2 rounded-3xl bg-white/60 p-4 ring-1 ring-[#0B1220]/10">
                    <Checkbox
                      checked={alignment.confirm}
                      onChange={(v) => setAlignment({ ...alignment, confirm: v })}
                      label="I confirm the information provided is accurate."
                    />
                    <Checkbox
                      checked={alignment.contact}
                      onChange={(v) => setAlignment({ ...alignment, contact: v })}
                      label="I agree to be contacted regarding partnership opportunities."
                    />
                    <Checkbox
                      checked={alignment.consent}
                      onChange={(v) => setAlignment({ ...alignment, consent: v })}
                      label="I consent to data processing in accordance with the privacy policy."
                    />
                  </div>
                </motion.div>
              ) : null}

              {steps[step].key === "review" ? (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="grid grid-cols-1 gap-6"
                >
                  <div>
                    <div className="rounded-[36px] bg-white/60 p-6 ring-1 ring-[#0B1220]/10">
                      <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">REVIEW</div>
                      <div className="mt-2 text-lg font-semibold text-[#0B1220]">Check details before submitting</div>

                      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <MiniKV k="Applicant type" v={applicantType} />
                        <MiniKV k="Name" v={basic.fullName || "—"} />
                        <MiniKV k="Email" v={basic.email || "—"} />
                        <MiniKV k="Country" v={basic.country || "—"} />
                        <MiniKV k="Organization" v={basic.orgName || "—"} />
                        <MiniKV k="LinkedIn" v={basic.linkedin || "—"} />
                      </div>

                      <div className="mt-5 rounded-3xl bg-white/60 p-5 ring-1 ring-[#0B1220]/10">
                        <div className="text-sm font-semibold text-[#0B1220]">
                          {isExpert ? "Expert profile" : "Partnership details"}
                        </div>
                        <div className="mt-2 text-sm text-[#0B1220]/70">
                          {isExpert ? (
                            <>
                              Expertise: <span className="font-semibold">{expert.expertise.join(", ") || "—"}</span>
                              <br />
                              Engagement: <span className="font-semibold">{expert.engagement.join(", ") || "—"}</span>
                              <br />
                              Availability: <span className="font-semibold">{expert.availability}</span>
                            </>
                          ) : (
                            <>
                              Collaboration: <span className="font-semibold">{partnership.collab.join(", ") || "—"}</span>
                              <br />
                              Delivery: <span className="font-semibold">{partnership.deliveryMode}</span>
                              <br />
                              Objectives: <span className="font-semibold">{partnership.objectives || "—"}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="mt-5 text-xs text-[#0B1220]/60">
                        After submission: confirmation message and (optional) confirmation email.
                      </div>
                    </div>
                  </div>

                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* footer nav */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className={cx(
                "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ring-1 transition",
                step === 0 ? "opacity-40" : "hover:bg-[#0B1220]/5"
              )}
              style={{
                background: "rgba(11,18,32,0.04)",
                borderColor: "rgba(11,18,32,0.10)",
                color: "rgba(11,18,32,0.78)",
              }}
            >
              <ChevronLeft className="h-4 w-4" {...iconStrongProps} />
              Back
            </button>

            <button
              type="button"
              onClick={step === steps.length - 1 ? submit : next}
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
              style={{
                background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)`,
              }}
            >
              {step === steps.length - 1 ? "Submit" : "Continue"}
              <ChevronRight className="h-4 w-4" {...iconStrongProps} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** ---------------- FORM SUBCOMPONENTS ---------------- */
function FormCard({ title, icon, tone = "light", children }) {
  const isDark = tone === "dark";
  const isGrad = tone === "gradient";

  return (
    <div
      className={cx("relative overflow-hidden rounded-[36px] p-7 ring-1")}
      style={{
        background: isGrad
          ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.55)} 100%)`
          : isDark
          ? "linear-gradient(135deg, #061A3B 0%, #0A2A4F 100%)"
          : "rgba(255,255,255,0.55)",
        borderColor: isGrad || isDark ? "rgba(255,255,255,0.12)" : "rgba(11,18,32,0.10)",
      }}
    >
      {isGrad ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)",
          }}
        />
      ) : null}

      <div className="relative">
        <div className="flex items-center gap-3">
          <div
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{
              background: isGrad || isDark ? "rgba(255,255,255,0.12)" : "rgba(11,18,32,0.05)",
              border: isGrad || isDark ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(11,18,32,0.10)",
              color: isGrad || isDark ? "rgba(255,255,255,0.95)" : THEME.accent,
            }}
          >
            {icon}
          </div>
          <div>
            <div className={cx("text-xs font-semibold tracking-widest", isGrad || isDark ? "text-white/70" : "text-[#0B1220]/55")}>
              SECTION
            </div>
            <div className={cx("mt-1 text-lg font-semibold", isGrad || isDark ? "text-white" : "text-[#0B1220]")}>
              {title}
            </div>
          </div>
        </div>

        <div className={cx("mt-6", isGrad || isDark ? "text-white" : "text-[#0B1220]")}>{children}</div>
      </div>
    </div>
  );
}

function RocketIcon() {
  return <Zap className="h-5 w-5" {...iconStrongProps} />;
}

function MiniKV({ k, v }) {
  return (
    <div className="rounded-3xl bg-white/60 p-4 ring-1 ring-[#0B1220]/10">
      <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">{k}</div>
      <div className="mt-1 text-sm font-semibold text-[#0B1220]/80" style={clampStyle(2)}>
        {v}
      </div>
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

function Checkbox({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-3xl bg-white/60 p-4 ring-1 ring-[#0B1220]/10">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 accent-[#C91D67]"
      />
      <div className="text-sm text-[#0B1220]/75">{label}</div>
    </label>
  );
}

function RadioGroup({ value, onChange, options }) {
  return (
    <div className="space-y-2">
      {options.map((o) => (
        <label
          key={o}
          className="flex cursor-pointer items-center justify-between rounded-3xl bg-white/60 px-5 py-4 ring-1 ring-[#0B1220]/10 transition hover:ring-[#0B1220]/20"
        >
          <div className="text-sm font-semibold text-[#0B1220]/80">{o}</div>
          <input
            type="radio"
            name="applicantType"
            checked={value === o}
            onChange={() => onChange(o)}
            className="h-4 w-4 accent-[#C91D67]"
          />
        </label>
      ))}
    </div>
  );
}

function MultiSelect({ value, onChange, options }) {
  return (
    <div className="rounded-3xl bg-white/60 p-4 ring-1 ring-[#0B1220]/10">
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value.includes(o);
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(active ? value.filter((x) => x !== o) : [...value, o])}
              className="rounded-full px-3 py-2 text-xs font-semibold ring-1 transition"
              style={{
                background: active
                  ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.35)} 100%)`
                  : "rgba(11,18,32,0.06)",
                borderColor: active ? "rgba(11,18,32,0.10)" : "rgba(11,18,32,0.12)",
                color: active ? "white" : "rgba(11,18,32,0.72)",
              }}
            >
              {o}
            </button>
          );
        })}
      </div>
      {value.length ? (
        <div className="mt-3 text-xs text-[#0B1220]/55">
          Selected: <span className="font-semibold text-[#0B1220]/75">{value.length}</span>
        </div>
      ) : (
        <div className="mt-3 text-xs text-[#0B1220]/55">Select one or more.</div>
      )}
    </div>
  );
}

function FileRow() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <FilePicker label="Upload Professional Photo" />
      <FilePicker label="Upload CV (PDF)" />
    </div>
  );
}

function FilePicker({ label }) {
  const id = `file_${useId().replace(/:/g, "")}`;
  return (
    <div className="relative">
      <input id={id} type="file" className="hidden" onChange={() => null} />
      <label
        htmlFor={id}
        className="group relative flex min-h-[132px] cursor-pointer flex-col items-start justify-between rounded-2xl bg-white/60 px-4 py-4 ring-1 ring-[#0B1220]/10 transition hover:ring-[#0B1220]/20"
      >
        <div className="flex items-start gap-3">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl ring-1"
            style={{
              background: "rgba(11,18,32,0.05)",
              borderColor: "rgba(11,18,32,0.10)",
            }}
          >
            <Upload className="h-4 w-4" style={{ color: THEME.accent3 }} {...iconStrongProps} />
          </span>
          <div>
            <div className="text-sm font-semibold text-[#0B1220]">{label}</div>
            <div className="text-xs text-[#0B1220]/55">Optional</div>
          </div>
        </div>

        <span
          className="self-end rounded-full px-3 py-1 text-xs font-semibold ring-1"
          style={{
            background: "rgba(11,18,32,0.06)",
            borderColor: "rgba(11,18,32,0.10)",
            color: "rgba(11,18,32,0.70)",
          }}
        >
          Choose
        </span>

        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="shine" />
        </div>
      </label>
    </div>
  );
}

/** ---------------- MAIN PAGE ---------------- */
export default function PartnershipsPage() {
  const reduce = useReducedMotion();

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

      {/* HERO (different layout: collage + animated network overlay) */}
      <section className="relative" style={{ background: DARK_SECTION_BG }}>
        <NetworkBackdrop />
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* text */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="lg:col-span-6"
            >
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
                Strategic Partnerships <br /> Built on Outcomes.
              </h1>
              

              <p className="mt-5 max-w-xl text-balance text-base text-white/70 sm:text-lg">
                We collaborate with universities, corporations, public institutions, and industry leaders to deliver measurable professional impact — not theoretical engagement.
              </p>

              <p className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-white/65">
                From co-hosted internships to executive AI programs and expert networks — our partnership model is structured, scalable, and results-driven.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <MagneticButton href="#apply">Become a Partner</MagneticButton>
                <MagneticButton href="#apply" variant="secondary">Become an Expert</MagneticButton>
              </div>

            </motion.div>

            {/* collage */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
              className="relative lg:col-span-6"
            >
              <div className="relative overflow-hidden rounded-[44px] ring-1 ring-white/10 bg-white/5 backdrop-blur"
                   style={{ boxShadow: "0 26px 90px rgba(0,0,0,0.35)" }}>
                <div className="absolute inset-0">
                  <div className="heroGrid" />
                </div>

                <div className="relative grid grid-cols-12 gap-3 p-5 sm:p-6">
                  {/* big image */}
                  <motion.div
                    className="col-span-12 sm:col-span-7 overflow-hidden rounded-[34px] ring-1 ring-white/10"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.25 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=80"
                      alt="Partnership meeting"
                      className="h-[260px] w-full object-cover"
                    />
                  </motion.div>

                  {/* stack */}
                  <div className="col-span-12 sm:col-span-5 grid gap-3">
                    <motion.div
                      className="overflow-hidden rounded-[34px] ring-1 ring-white/10"
                      whileHover={{ y: -4 }}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80"
                        alt="Team collaboration"
                        className="h-[124px] w-full object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className="overflow-hidden rounded-[34px] ring-1 ring-white/10"
                      whileHover={{ y: -4 }}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=1400&q=80"
                        alt="Workshop"
                        className="h-[124px] w-full object-cover"
                      />
                    </motion.div>
                  </div>

                  {/* floating chips */}
                  <div className="col-span-12 mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <HeroChip icon={GraduationCap} title="Universities" desc="Academic integration" color={THEME.accent2} />
                    <HeroChip icon={Building2} title="Corporations" desc="Workforce upskilling" color={THEME.accent} />
                    <HeroChip icon={Landmark} title="Governments" desc="Ecosystem impact" color={THEME.accent4} />
                  </div>
                </div>

                {/* animated nodes overlay */}
                {!reduce ? (
                  <div className="pointer-events-none absolute inset-0">
                    <div className="nodesOverlay" />
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section id="architecture" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Structured collaboration models"
            accentText="aligned with outcomes"
            subtitle="We design partnerships aligned with institutional goals, workforce transformation, and long-term impact."
            dark
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {ARCHITECTURE.map((item, idx) => (
              <ArchitectureCard key={item.title} item={item} index={idx} />
            ))}
          </div>
        </div>
      </section>


      {/* REACH */}
      <section id="reach" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="A European-Rooted, Global Network"
            subtitle="Our partnerships span universities, corporations, and ecosystems across Europe — with expansion in MENA and international markets."
            dark
          />
          <div className="mt-10">
            <ReachMap />
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Partnership impact"
            accentText="on outcomes"
            subtitle=""
            dark
          />
          <MetricsStrip />
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <WhyPartner />
        </div>
      </section>

      {/* CLOSING CTA + FORM */}
      <section id="apply" className="relative" style={{ background: "rgba(233,231,223,1)", color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Let's Build Structured Impact Together."
            subtitle="Whether you represent a university, company, government entity, or expert network — we design partnerships that create measurable value."
          />

          <div id="application-form" className="mt-10 scroll-mt-24">
            <FormWizard />
          </div>
        </div>
      </section>

      {/* floating action */}
      <a
        href="#apply"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
        style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)` }}
      >
        <Handshake className="h-4 w-4" {...iconStrongProps} />
        Partner / Expert Apply
      </a>

      <style>{css}</style>
    </div>
  );
}

/** ---------------- HERO CHIP ---------------- */
function HeroChip({ icon: Icon, title, desc, color }) {
  void Icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur"
      style={{ boxShadow: "0 18px 60px rgba(0,0,0,0.28)" }}
    >
      <div className="flex items-start gap-3">
        <IconBadge color={color}>
          <Icon className="h-5 w-5" {...iconStrongProps} />
        </IconBadge>
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-xs text-white/65">{desc}</div>
        </div>
      </div>
    </motion.div>
  );
}

/** ---------------- CSS ---------------- */
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

/* global shine */
.shine{
  position:absolute;
  inset:-30% -30%;
  background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.12) 45%, transparent 60%);
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

/* hero grid texture */
.heroGrid{
  position:absolute;
  inset:0;
  opacity: 0.18;
  background-image:
    radial-gradient(650px circle at 10% 30%, rgba(34,211,238,0.18), transparent 60%),
    radial-gradient(650px circle at 90% 40%, rgba(167,139,250,0.14), transparent 60%),
    radial-gradient(600px circle at 55% 95%, rgba(245,158,11,0.12), transparent 60%),
    linear-gradient(rgba(233,231,223,0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(233,231,223,0.12) 1px, transparent 1px);
  background-size: auto, auto, auto, 56px 56px, 56px 56px;
  mask-image: radial-gradient(900px circle at 55% 30%, rgba(0,0,0,1), transparent 70%);
}

/* constellation */
.constellation{
  position:absolute;
  inset:0;
  background:
    radial-gradient(2px 2px at 12% 30%, rgba(255,255,255,0.65), transparent 60%),
    radial-gradient(2px 2px at 18% 55%, rgba(255,255,255,0.55), transparent 60%),
    radial-gradient(2px 2px at 35% 28%, rgba(255,255,255,0.55), transparent 60%),
    radial-gradient(2px 2px at 52% 40%, rgba(255,255,255,0.55), transparent 60%),
    radial-gradient(2px 2px at 68% 22%, rgba(255,255,255,0.55), transparent 60%),
    radial-gradient(2px 2px at 78% 48%, rgba(255,255,255,0.55), transparent 60%),
    radial-gradient(2px 2px at 88% 30%, rgba(255,255,255,0.55), transparent 60%),
    radial-gradient(2px 2px at 62% 72%, rgba(255,255,255,0.45), transparent 60%),
    radial-gradient(2px 2px at 26% 76%, rgba(255,255,255,0.45), transparent 60%);
  filter: blur(0.2px);
  animation: constellate 10s ease-in-out infinite;
  opacity: 0.5;
}
@keyframes constellate{
  0%{ transform: translateY(0px); opacity: 0.35; }
  50%{ transform: translateY(-10px); opacity: 0.55; }
  100%{ transform: translateY(0px); opacity: 0.35; }
}

/* hero nodes overlay: animated "network" */
.nodesOverlay{
  position:absolute;
  inset:0;
  background:
    radial-gradient(6px 6px at 18% 35%, rgba(34,211,238,0.85), transparent 55%),
    radial-gradient(7px 7px at 42% 18%, rgba(167,139,250,0.75), transparent 55%),
    radial-gradient(6px 6px at 68% 28%, rgba(52,211,153,0.75), transparent 55%),
    radial-gradient(7px 7px at 78% 62%, rgba(245,158,11,0.65), transparent 55%),
    radial-gradient(6px 6px at 36% 70%, rgba(201,29,103,0.55), transparent 55%);
  mix-blend-mode: screen;
  filter: blur(0.2px);
  animation: nodesPulse 5.2s ease-in-out infinite;
  opacity: 0.8;
}
@keyframes nodesPulse{
  0%{ transform: translateY(0px); opacity: 0.55; }
  50%{ transform: translateY(-8px); opacity: 0.85; }
  100%{ transform: translateY(0px); opacity: 0.55; }
}
`;










