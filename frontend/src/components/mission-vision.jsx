import React, { useMemo, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  Briefcase,
  Target,
  BadgeCheck,
  Compass,
  ClipboardCheck,
  LineChart,
  Globe2,
  Building2,
  Shield,
  Zap,
  Network,
  Layers,
  Orbit,
} from "lucide-react";



const THEME = {
  deep: "#0B1220",
  slate: "#1E2A3A",
  sand: "#E9E7DF",
  accent: "#22D3EE", // cyan
  accent2: "#A78BFA", // violet
  accent3: "#34D399", // green
  accent4: "#F59E0B", // amber
  pink: "#C91D67", // use only where desired
  star: "#F5D66B",
};

const DARK_SECTION_BG = "linear-gradient(90deg, #050B1F 0%, #071A3E 100%)";
const ACCENT_RGB = "201,29,103";
const accent = (a) => `rgba(${ACCENT_RGB}, ${a})`;
void motion;

const iconStrongProps = { strokeWidth: 2.4 };

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay: i * 0.06 },
  }),
};

const softCard = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 24px 90px rgba(0,0,0,0.35)",
};

const glassLight = {
  background: "rgba(255,255,255,0.58)",
  border: "1px solid rgba(11,18,32,0.10)",
  boxShadow: "0 24px 90px rgba(0,0,0,0.14)",
};

const PHOTOS = {
  heroEdu:
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=70",
  heroIndustry:
    "/images/ss.png",
  mission:
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=70",
  vision:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=70",
  whyEdu:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=70",
  whyIndustry:
    "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1200&q=70",
  ai:
    "/images/ai-support.png",
};

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

function IconBadge({ color, children }) {
  return (
    <span
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl ring-1"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
        border: "1px solid rgba(255,255,255,0.22)",
        boxShadow:
          "0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.20)",
      }}
    >
      <span style={{ color }}>{children}</span>
    </span>
  );
}

function GradientButton({ children, href, onClick, variant = "primary" }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const primary =
    "text-white shadow-[0_12px_30px_rgba(34,211,238,0.18)] hover:translate-y-[-1px] active:translate-y-[0px]";
  const secondary =
    "bg-transparent text-white ring-1 ring-white/20 hover:bg-white/5";

  const stylePrimary = {
    background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(
      0.82
    )} 55%, ${accent(0.6)} 120%)`,
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

function SectionTitle({ eyebrow, title, subtitle, dark }) {
  return (
    <div className={cx("mx-auto max-w-5xl", dark ? "text-white" : "text-[#0B1220]")}>
      {eyebrow ? (
        <div
          className={cx(
            "inline-flex items-center rounded-full px-5 py-2 text-xs font-semibold tracking-widest",
            dark
              ? "bg-white/10 text-white/80 ring-1 ring-white/10"
              : "bg-[#0B1220]/5 text-[#0B1220]/70 ring-1 ring-[#0B1220]/10"
          )}
        >
          <span>{eyebrow}</span>
        </div>
      ) : null}

      <h2
        className={cx(
          eyebrow ? "mt-5 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl" : "mt-0 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-[#0B1220]"
        )}
      >
        {title}
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

function ParallaxPhoto({ src, alt, className, tilt = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cx("relative overflow-hidden rounded-[32px] ring-1", className)}
      style={{
        borderColor: "rgba(255,255,255,0.14)",
        background: "rgba(255,255,255,0.06)",
        boxShadow: "0 26px 90px rgba(0,0,0,0.35)",
      }}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={reduce ? undefined : { y: -6, rotate: tilt, scale: 1.01 }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.22]">
        <div className="shine" />
      </div>
    </motion.div>
  );
}

function NetworkBackdrop({ intensity = 0.22 }) {
  // SVG network lines with animated stroke-dashoffset
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ opacity: intensity }}
    >
      <defs>
        <linearGradient id="netGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={THEME.accent} stopOpacity="0.9" />
          <stop offset="0.5" stopColor={THEME.accent2} stopOpacity="0.8" />
          <stop offset="1" stopColor={THEME.accent3} stopOpacity="0.9" />
        </linearGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* main curves */}
      <path
        className="net-line"
        d="M-40,420 C220,260 260,520 540,360 C760,232 860,380 1240,210"
        fill="none"
        stroke="url(#netGrad)"
        strokeWidth="2.2"
        filter="url(#softGlow)"
      />
      <path
        className="net-line2"
        d="M-30,140 C220,260 360,120 520,230 C690,350 860,210 1240,340"
        fill="none"
        stroke="url(#netGrad)"
        strokeWidth="1.9"
        filter="url(#softGlow)"
      />
      <path
        className="net-line3"
        d="M120,610 C240,420 420,520 620,430 C860,320 980,470 1120,360"
        fill="none"
        stroke="url(#netGrad)"
        strokeWidth="1.6"
        filter="url(#softGlow)"
      />

      {/* nodes */}
      {[
        [140, 240],
        [260, 420],
        [420, 180],
        [520, 300],
        [680, 240],
        [820, 360],
        [960, 220],
        [1060, 420],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4.6" fill={THEME.accent} opacity="0.9" />
          <circle cx={x} cy={y} r="14" fill={THEME.accent} opacity="0.08" />
        </g>
      ))}
    </svg>
  );
}

function KineticBridgeWords() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-white/70">
      <motion.span
        initial={reduce ? false : { opacity: 0, x: -18 }}
        animate={reduce ? undefined : { opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative inline-flex items-center rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/10"
      >
        <GraduationCap className="mr-2 h-4 w-4" style={{ color: THEME.sand }} {...iconStrongProps} />
        Education
      </motion.span>

      <div className="relative h-[2px] w-20 overflow-hidden rounded-full bg-white/15">
        <motion.div
          className="absolute inset-y-0 left-0 w-10 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${THEME.pink} 0%, ${accent(0.6)} 100%)`,
          }}
          animate={reduce ? undefined : { x: [0, 50, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.span
        initial={reduce ? false : { opacity: 0, x: 18 }}
        animate={reduce ? undefined : { opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
        className="relative inline-flex items-center rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/10"
      >
        <Briefcase className="mr-2 h-4 w-4" style={{ color: THEME.accent4 }} {...iconStrongProps} />
        Industry
      </motion.span>

      <motion.span
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="ml-1 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/10"
      >
        <span className="text-white/75">→</span>
        <span className="text-white">Professional Readiness</span>
        <span className="h-2 w-2 rounded-full" style={{ background: THEME.accent }} />
      </motion.span>
    </div>
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
        border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(11,18,32,0.10)",
      }}
    >
      {label}
    </span>
  );
}

function FeatureTile({ icon: Icon, title, desc, color, idx = 0, tone = "dark" }) {
  const reduce = useReducedMotion();
  const dark = tone === "dark";
  void Icon;
  return (
    <motion.div
      className={cx(
        "group relative overflow-hidden rounded-[28px] p-5 ring-1",
        dark ? "text-white" : "text-[#0B1220]"
      )}
      style={{
        borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(11,18,32,0.10)",
        background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.55)",
      }}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut", delay: idx * 0.06 } },
      }}
      whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
    >
      <div className="flex items-start gap-3">
        <IconBadge color={color}>
          <Icon className="h-5 w-5" {...iconStrongProps} />
        </IconBadge>
        <div className="flex-1">
          <div className={cx("text-sm font-semibold", dark ? "text-white" : "text-[#0B1220]")}>
            {title}
          </div>
          <div className={cx("mt-1 text-sm leading-relaxed", dark ? "text-white/70" : "text-[#0B1220]/70")}>
            {desc}
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: dark ? "rgba(34,211,238,0.14)" : "rgba(201,29,103,0.10)" }}
      />
    </motion.div>
  );
}

function MergeScene() {
  // Classroom vs Industry, then merge into unified system (scroll-triggered)
  const reduce = useReducedMotion();
  const wrap = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start 0.85", "end 0.45"],
  });

  const leftX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 72]);
  const rightX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -72]);
  const leftRot = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-3, 0]);
  const rightRot = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [3, 0]);
  const midScale = useTransform(scrollYProgress, [0.25, 0.85], reduce ? [1, 1] : [0.96, 1]);

  return (
    <div ref={wrap} className="relative mt-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div style={{ x: leftX, rotate: leftRot }} className="relative">
          <div className="relative overflow-hidden rounded-[34px] ring-1" style={glassLight}>
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-5">
              <div className="relative sm:col-span-2">
                <img
                  src={PHOTOS.whyEdu}
                  alt="University environment"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>
              <div className="p-6 sm:col-span-3">
                <div className="flex items-center gap-3">
                  <IconBadge color={THEME.pink}>
                    <GraduationCap className="h-5 w-5" {...iconStrongProps} />
                  </IconBadge>
                  <div>
                    <div className="mt-1 text-lg font-semibold text-[#0B1220]">Theory advances.</div>
                  </div>
                </div>
                <div className="mt-5 space-y-3 text-sm text-[#0B1220]/75">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ background: THEME.accent2 }} />
                    <span>Content-heavy learning, limited proof of delivery.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ background: THEME.accent3 }} />
                    <span>Skills aren’t always measurable or repeatable.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ background: THEME.accent4 }} />
                    <span>Outcomes vary by exposure to real constraints.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div style={{ x: rightX, rotate: rightRot }} className="relative">
          <div className="relative overflow-hidden rounded-[34px] ring-1" style={glassLight}>
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-5">
              <div className="relative sm:col-span-2">
                <img
                  src={PHOTOS.whyIndustry}
                  alt="Company environment"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>
              <div className="p-6 sm:col-span-3">
                <div className="flex items-center gap-3">
                  <IconBadge color={THEME.accent4}>
                    <Briefcase className="h-5 w-5" {...iconStrongProps} />
                  </IconBadge>
                  <div>
                    <div className="mt-1 text-lg font-semibold text-[#0B1220]">Technology evolves.</div>
                  </div>
                </div>
                <div className="mt-5 space-y-3 text-sm text-[#0B1220]/75">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ background: THEME.pink }} />
                    <span>Deadlines, stakeholders, trade-offs, and accountability.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ background: THEME.accent }} />
                    <span>Performance is visible: output, iteration, and reliability.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ background: THEME.accent3 }} />
                    <span>Hiring relies on signals, not promises.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* merge */}
      <motion.div
        className="relative mt-6 overflow-hidden rounded-[36px] ring-1"
        style={{
          ...glassLight,
          scale: midScale,
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.14]" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(11,18,32,0.22) 0px, rgba(11,18,32,0.22) 12px, transparent 12px, transparent 26px)" }} />
        <div className="relative p-6 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs font-semibold tracking-widest text-[#0B1220]/60">THE GAP</div>
              <div className="mt-2 text-2xl font-semibold text-[#0B1220]">
                Real-world readiness lags behind.
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#0B1220]/70">
                Praktix was built to close that gap structurally — not symbolically — by turning learning into
                measured execution.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill tone="light" label="Industry-aligned internships" />
              <Pill tone="light" label="AI-powered acceleration" />
              <Pill tone="light" label="Workforce development" />
              <Pill tone="light" label="Institutional partnerships" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function IntersectionDiagram() {
  const reduce = useReducedMotion();
  return (
    <div className="relative overflow-hidden rounded-[38px] p-6 ring-1 ring-white/10" style={{ ...softCard }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <NetworkBackdrop intensity={0.22} />
      </div>

      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="mt-2 text-2xl font-semibold text-white">More than programs.</div>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Praktix is a professional development system at the intersection of:
              Education · Technology · Industry · AI Innovation.
            </p>
          </div>
          <IconBadge color={THEME.accent2}>
            <Orbit className="h-5 w-5" {...iconStrongProps} />
          </IconBadge>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[1.15/1] overflow-hidden rounded-[34px] ring-1 ring-white/10 bg-white/5">
              {/* animated intersection circles */}
              <div className="absolute inset-0">
                <motion.div
                  className="absolute left-[18%] top-[22%] h-48 w-48 rounded-full"
                  style={{ border: "1px solid rgba(255,255,255,0.16)", background: "rgba(34,211,238,0.06)" }}
                  animate={reduce ? undefined : { y: [0, -6, 0], x: [0, 4, 0] }}
                  transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute right-[18%] top-[22%] h-48 w-48 rounded-full"
                  style={{ border: "1px solid rgba(255,255,255,0.16)", background: "rgba(167,139,250,0.06)" }}
                  animate={reduce ? undefined : { y: [0, 6, 0], x: [0, -4, 0] }}
                  transition={{ duration: 6.0, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute left-[18%] bottom-[16%] h-48 w-48 rounded-full"
                  style={{ border: "1px solid rgba(255,255,255,0.16)", background: "rgba(52,211,153,0.06)" }}
                  animate={reduce ? undefined : { y: [0, 5, 0], x: [0, 3, 0] }}
                  transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute right-[18%] bottom-[16%] h-48 w-48 rounded-full"
                  style={{ border: "1px solid rgba(255,255,255,0.16)", background: "rgba(245,158,11,0.06)" }}
                  animate={reduce ? undefined : { y: [0, -5, 0], x: [0, -3, 0] }}
                  transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* center */}
                <div
                  className="absolute left-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2"
                  style={{ top: "53%" }}
                >
                  <motion.div
                    className="grid h-full w-full place-items-center rounded-full ring-1 ring-white/12"
                    style={{
                      background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 80%)`,
                      boxShadow: `0 20px 70px ${accent(0.25)}`,
                    }}
                    animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="text-center">
                      <div className="text-xs font-black tracking-widest text-white/90">PRAKTIX</div>
                      <div className="mt-1 text-[11px] font-semibold text-white/80">System</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* labels */}
              <div className="absolute left-8 top-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 ring-1 ring-white/10">
                <GraduationCap className="h-4 w-4" style={{ color: THEME.sand }} {...iconStrongProps} />
                Education
              </div>
              <div className="absolute right-8 top-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 ring-1 ring-white/10">
                <Layers className="h-4 w-4" style={{ color: THEME.accent2 }} {...iconStrongProps} />
                Technology
              </div>
              <div className="absolute left-8 bottom-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 ring-1 ring-white/10">
                <Building2 className="h-4 w-4" style={{ color: THEME.accent3 }} {...iconStrongProps} />
                Industry
              </div>
              <div className="absolute right-8 bottom-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 ring-1 ring-white/10">
                <Sparkles className="h-4 w-4" style={{ color: THEME.accent4 }} {...iconStrongProps} />
                AI Innovation
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <FeatureTile
              tone="dark"
              idx={0}
              icon={ClipboardCheck}
              title="Outcome-driven structure"
              desc="We design for measurable delivery, not passive attendance."
              color={THEME.accent4}
            />
            <FeatureTile
              tone="dark"
              idx={1}
              icon={Compass}
              title="Expert-led systems"
              desc="Guided by industry professionals and academic experts."
              color={THEME.accent2}
            />
            <FeatureTile
              tone="dark"
              idx={2}
              icon={LineChart}
              title="Performance tracking"
              desc="Signals hiring teams can verify: artifacts, iterations, evaluation."
              color={THEME.accent}
            />
            <FeatureTile
              tone="dark"
              idx={3}
              icon={HandshakeIcon}
              title="Scalable partnerships"
              desc="Sustainable models for institutions and organizations to expand."
              color={THEME.accent3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function HandshakeIcon(props) {
  // tiny custom icon wrapper using existing lucide shape
  return <BadgeCheck {...props} />;
}

function StickyProgressBar() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent">
      <motion.div
        className="h-full"
        style={{
          width: reduce ? "100%" : width,
          background: `linear-gradient(90deg, ${THEME.pink} 0%, ${accent(
            0.7
          )} 55%, rgba(34,211,238,0.65) 100%)`,
          boxShadow: `0 10px 25px ${accent(0.22)}`,
        }}
      />
    </div>
  );
}

export default function AboutMissionVisionPage() {
  const reduce = useReducedMotion();
  const isVisionInView = true;

  const principles = useMemo(
    () => [
      {
        title: "Real Execution",
        desc: "Applied projects over theoretical exercises.",
        icon: Zap,
        color: THEME.accent,
      },
      {
        title: "Expert-Led Systems",
        desc: "Guided by industry professionals and academic experts.",
        icon: BadgeCheck,
        color: THEME.accent2,
      },
      {
        title: "Measurable Impact",
        desc: "Outcome-driven, performance-tracked initiatives.",
        icon: Target,
        color: THEME.accent4,
      },
      {
        title: "Scalable Partnerships",
        desc: "Models institutions can sustain and expand.",
        icon: Globe2,
        color: THEME.accent3,
      },
    ],
    []
  );

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
      <StickyProgressBar />

      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0 opacity-75"
          style={{
            background:
              "radial-gradient(1200px circle at 12% 12%, rgba(255,255,255,0.08), transparent 55%), radial-gradient(1200px circle at 82% 20%, rgba(233,231,223,0.06), transparent 55%), radial-gradient(900px circle at 60% 90%, rgba(255,255,255,0.06), transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(233,231,223,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(233,231,223,0.12) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(900px circle at 30% 20%, rgba(0,0,0,1), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 opacity-55">
          <div className="light-streak" />
        </div>
      </div>

      


      {/* HERO — new layout: collage + kinetic bridge + floating panels */}
      <section id="about" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="absolute inset-0">
          <NetworkBackdrop intensity={0.18} />
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-8 lg:grid-cols-2 lg:py-14">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="mt-1 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              Designing the Future of{" "}
              <span
                className="relative inline-block"
                style={{
                  background: `linear-gradient(135deg, ${THEME.pink}, ${accent(
                    0.75
                  )}, rgba(34,211,238,0.75))`,
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Professional Readiness
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-balance text-base text-white/70 sm:text-lg">
              We bridge the gap between education and real-world performance.
            </p>
            <p className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-white/65">
              Praktix exists to transform potential into measurable capability.
            </p>

            <KineticBridgeWords />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GradientButton href="/about/how-we-work">Explore Our Model</GradientButton>
              <GradientButton href="/students-graduates" variant="secondary">
                See Our Programs
              </GradientButton>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              <Pill label="Structured Execution" />
              <Pill label="Expert Mentorship" />
              <Pill label="Measured Impact" />
              <Pill label="Scalable Systems" />
            </div>
          </motion.div>

          {/* collage */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-[560px]">
              <div
                className="absolute -inset-4 rounded-[48px] ring-1 ring-white/10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                }}
              />

              <div className="relative grid grid-cols-12 gap-4">
                <div className="col-span-7">
                  <ParallaxPhoto
                    src={PHOTOS.heroEdu}
                    alt="Education scene"
                    className="h-[320px]"
                    tilt={-1.2}
                  />
                  <motion.div
                    className="mt-4 overflow-hidden rounded-[32px] p-5 ring-1 ring-white/10 bg-white/5 backdrop-blur"
                    style={{ boxShadow: "0 22px 70px rgba(0,0,0,0.35)" }}
                    animate={reduce ? undefined : { y: [0, -6, 0] }}
                    transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-start gap-3">
                      <IconBadge color={THEME.accent2}>
                        <Compass className="h-5 w-5" {...iconStrongProps} />
                      </IconBadge>
                      <div>
                        <div className="mt-1 text-sm font-semibold text-white">
                          From learning → to deliverables
                        </div>
                        <div className="mt-1 text-xs text-white/65">
                          Clear artifacts, clear evaluation, real readiness.
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="col-span-5">
                  <ParallaxPhoto
                    src={PHOTOS.heroIndustry}
                    alt="Industry collaboration"
                    className="h-[220px]"
                    tilt={1.2}
                  />

                  <motion.div
                    className="relative mt-4 overflow-hidden rounded-[32px] ring-1 ring-white/10"
                    style={{
                      background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.7)} 100%)`,
                      boxShadow: `0 26px 90px ${accent(0.22)}`,
                    }}
                    animate={reduce ? undefined : { y: [0, 7, 0] }}
                    transition={{ duration: 6.0, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)" }} />
                    <div className="relative p-5">
                      <div className="flex items-center gap-3">
                        <IconBadge color={"rgba(255,255,255,0.92)"}>
                          <Shield className="h-5 w-5" {...iconStrongProps} />
                        </IconBadge>
                        <div>
                          <div className="mt-1 text-sm font-semibold text-white">
                            Structured. Confident. Measurable.
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/85 ring-1 ring-white/20">
                          Execution
                        </span>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/85 ring-1 ring-white/20">
                          Mentorship
                        </span>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/85 ring-1 ring-white/20">
                          Measurement
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  <div className="mt-4 overflow-hidden rounded-[32px] ring-1 ring-white/10 bg-white/5 p-5 backdrop-blur">
                    <div className="flex items-start gap-3">
                      <IconBadge color={THEME.accent4}>
                        <RocketIcon className="h-5 w-5" {...iconStrongProps} />
                      </IconBadge>
                      <div>
                        <div className="mt-1 text-sm font-semibold text-white">
                          Professional performance readiness
                        </div>
                        <div className="mt-1 text-xs text-white/65">
                          Not job prep. Performance prep.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* floating orb */}
              <motion.div
                className="pointer-events-none absolute -bottom-8 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full blur-2xl"
                style={{ background: `radial-gradient(circle, ${accent(0.35)} 0%, transparent 70%)` }}
                animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION — left statement + right animated icon blocks + photo strip */}
      <section id="mission" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            title="Transform learning into professional capability"
            subtitle="We design experiences that convert potential into measurable execution — built for the modern workforce."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <motion.div
              className="lg:col-span-5"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.div
                variants={fadeUp}
                className="overflow-hidden rounded-[36px] p-[1px]"
                style={{
                  background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(
                    0.55
                  )} 55%, rgba(34,211,238,0.55) 120%)`,
                }}
              >
                <div className="rounded-[35px] p-7" style={glassLight}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mt-2 text-2xl font-semibold text-[#0B1220]">
                        We do not believe in passive education.
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-[#0B1220]/70">
                        Praktix turns learning into delivery through structured, real-world execution.
                      </p>
                    </div>
                    <IconBadge color={THEME.pink}>
                      <ClipboardCheck className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      "Integrate real industry challenges",
                      "Build measurable skills",
                      "Connect learners with global experts",
                      "Prepare individuals for modern workforce demands",
                    ].map((t, i) => (
                      <motion.div
                        key={t}
                        variants={fadeUp}
                        custom={i + 1}
                        className="flex items-start gap-3"
                      >
                        <span
                          className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full ring-1"
                          style={{
                            background: "rgba(11,18,32,0.06)",
                            borderColor: "rgba(11,18,32,0.10)",
                          }}
                        >
                          <span className="h-2 w-2 rounded-full" style={{ background: THEME.accent }} />
                        </span>
                        <div className="text-sm text-[#0B1220]/75">{t}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Pill tone="light" label="Execution-first" />
                <Pill tone="light" label="Mentor-led" />
                <Pill tone="light" label="Measured" />
                <Pill tone="light" label="Repeatable" />
              </div>
            </motion.div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FeatureTile
                  tone="light"
                  idx={0}
                  icon={Zap}
                  title="Execution"
                  desc="Real tasks with constraints, iteration, and delivery."
                  color={THEME.accent}
                />
                <FeatureTile
                  tone="light"
                  idx={1}
                  icon={Compass}
                  title="Mentorship"
                  desc="Experts guide decisions, not just content."
                  color={THEME.accent2}
                />
                <FeatureTile
                  tone="light"
                  idx={2}
                  icon={LineChart}
                  title="Measurement"
                  desc="Performance tracking that creates real signals."
                  color={THEME.accent4}
                />
                <FeatureTile
                  tone="light"
                  idx={3}
                  icon={Target}
                  title="Impact"
                  desc="Outcome-driven work aligned with hiring expectations."
                  color={THEME.accent3}
                />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <ParallaxPhoto
                  src={PHOTOS.mission}
                  alt="Mission execution"
                  className="h-[170px] sm:col-span-2"
                  tilt={-0.8}
                />
                <div className="relative overflow-hidden rounded-[32px] ring-1" style={glassLight}>
                  <div className="absolute inset-0">
                    <img
                      src={PHOTOS.ai}
                      alt="AI support"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/82 via-white/45 to-white/18" />
                  </div>
                  <div className="relative p-5">
                    <div className="text-xs font-bold tracking-widest text-white/90">AI SUPPORT</div>
                    <div className="mt-2 text-base font-bold leading-tight text-white">
                      Acceleration without losing rigor
                    </div>
                    <div className="mt-2 text-sm font-medium leading-relaxed text-white/90">
                      AI enhances execution, feedback, and measurement — not shortcuts.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION — dark network + photo panel */}
      <section id="vision" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="absolute inset-0">
          <NetworkBackdrop intensity={0.22} />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionTitle
            dark
            title="Become the global bridge between academia and high-performance industries"
            subtitle="A future where experience becomes the standard — not the exception."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[38px] ring-1 ring-white/10" style={softCard}>
                <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
                  <div className="net-glow" />
                </div>

                <div className="relative p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mt-2 text-2xl font-semibold text-white">
                        We envision a world where:
                      </div>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
                        Students graduate job-ready, organizations upskill intelligently, and AI enhances human capability.
                      </p>
                    </div>
                    <IconBadge color={THEME.accent2}>
                      <Network className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      { t: "Students graduate job-ready", c: THEME.accent },
                      { t: "Organizations upskill intelligently", c: THEME.accent3 },
                      { t: "AI enhances human capability", c: THEME.accent2 },
                      { t: "Experience becomes the standard", c: THEME.accent4 },
                    ].map((x, i) => (
                      <motion.div
                        key={x.t}
                        initial={reduce ? false : { opacity: 0, y: 10 }}
                        animate={isVisionInView ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.07 }}
                        className="group relative overflow-hidden rounded-[28px] bg-white/5 p-5 ring-1 ring-white/10"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full" style={{ background: x.c }} />
                          <div className="text-sm font-semibold text-white">{x.t}</div>
                        </div>
                        <div
                          className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{ background: "rgba(255,255,255,0.08)" }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Pill label="Global standards" />
                    <Pill label="Outcome-based" />
                    <Pill label="Ecosystem building" />
                    <Pill label="AI-enabled" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-full overflow-hidden rounded-[38px] ring-1 ring-white/10" style={softCard}>
                <div className="absolute inset-0">
                  <img
                    src={PHOTOS.vision}
                    alt="Abstract network"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10" />
                </div>
                <div className="relative p-7">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/75 ring-1 ring-white/10">
                    <Globe2 className="h-4 w-4" style={{ color: THEME.accent3 }} {...iconStrongProps} />
                    <span>ECOSYSTEM</span>
                  </div>
                  <div className="mt-4 text-2xl font-semibold text-white">
                    Connected systems, not isolated courses.
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    We map education nodes to industry nodes and connect them through execution pathways.
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <MiniStat label="Nodes" value="Education ↔ Industry" color={THEME.accent} />
                    <MiniStat label="Signal" value="Verified deliverables" color={THEME.accent4} />
                    <MiniStat label="Loop" value="Feedback & iteration" color={THEME.accent2} />
                    <MiniStat label="Outcome" value="Performance readiness" color={THEME.accent3} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY — split & merge system (new layout) */}
      <section id="why" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 pt-9 pb-0 sm:pt-10 sm:pb-1">
          <SectionTitle
            title="Closing the readiness gap — structurally"
            subtitle="Theory advances. Technology evolves. But real-world readiness lags behind."
          />
          <MergeScene />
        </div>
      </section>

      {/* PRINCIPLES — minimal iconography + hover lift (light section) */}
      <section id="principles" className="relative" style={{ background: "linear-gradient(180deg, rgba(233,231,223,1) 0%, rgba(233,231,223,0.85) 100%)", color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 pt-0 pb-8 sm:pt-0 sm:pb-9">
          <SectionTitle
            title="What we stand for"
          />

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.06 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-[34px] p-6 ring-1"
                  style={{
                    ...glassLight,
                    borderColor: "rgba(11,18,32,0.10)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <IconBadge color={p.color}>
                      <Icon className="h-5 w-5" {...iconStrongProps} />
                    </IconBadge>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold ring-1"
                      style={{
                        background: "rgba(11,18,32,0.06)",
                        color: "rgba(11,18,32,0.70)",
                        borderColor: "rgba(11,18,32,0.10)",
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  <div className="mt-4 text-lg font-semibold text-[#0B1220]">{p.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-[#0B1220]/70">{p.desc}</div>

                  <div
                    className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "rgba(201,29,103,0.10)" }}
                  />
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* GLOBAL + BIGGER PICTURE — dark, premium, photo + intersection */}
      <section id="global" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="absolute inset-0">
          <NetworkBackdrop intensity={0.18} />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pt-4 pb-10 sm:pt-6 sm:pb-12">
          <SectionTitle
            dark
            title="Built with international standards"
            subtitle="Aligned with European professional frameworks, execution standards, and outcome-based education models."
          />

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-[38px] ring-1 ring-white/10 bg-[#0B1220]/90" style={softCard}>
                <div className="relative p-7">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/75 ring-1 ring-white/10">
                    <Globe2 className="h-4 w-4" style={{ color: THEME.accent3 }} {...iconStrongProps} />
                    <span>STANDARDS</span>
                  </div>

                  <div className="mt-4 text-2xl font-semibold text-white">
                    Global structure. Local execution.
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/90">
                    We align execution pathways with professional frameworks and measurable outcomes.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Pill label="European frameworks" />
                    <Pill label="Execution standards" />
                    <Pill label="Outcome-based models" />
                    <Pill label="AI workforce shift" />
                  </div>

                  <div className="mt-6">
                    <GradientButton href="#closing">Start Your Journey</GradientButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <IntersectionDiagram />
            </div>
          </div>

          {/* CLOSING */}
          <div id="closing" className="mt-12">
            <div
              className="relative overflow-hidden rounded-[36px] border border-white/10 px-7 py-10 text-center sm:px-12"
              style={{
                background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 100%)`,
                boxShadow: "0 24px 90px rgba(0,0,0,0.20)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)",
                }}
              />
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="relative mx-auto max-w-4xl text-white"
              >
                <div className="mt-4 text-3xl font-semibold md:text-4xl">
                  We Don’t Just Prepare People for Jobs. <br />
                  We Prepare Them for Performance.
                </div>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href="/about/partnerships"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] transition hover:opacity-95"
                  >
                    Partner With Us <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </a>
                  <a
                    href="/about/how-we-work"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15"
                  >
                    Explore Our Model <ArrowRight className="h-4 w-4" {...iconStrongProps} />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* sticky CTA */}
      <a
        href="#closing"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:inline-flex"
        style={{
          background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 90%)`,
        }}
      >
        <Briefcase className="h-4 w-4" {...iconStrongProps} />
        Partner / Start
      </a>

      <style>{css}</style>
    </div>
  );
}

/* tiny helper */
function MiniStat({ label, value, color }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
      <div className="text-xs font-semibold tracking-widest text-white/60">{label}</div>
      <div className="mt-2 text-sm font-semibold text-white">
        <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full" style={{ background: color }} />
        {value}
      </div>
    </div>
  );
}

function RocketIcon(props) {
  return <Zap {...props} />;
}

const css = `
/* global streak */
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

/* shine overlay (used in photos) */
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

/* subtle network glow layer */
.net-glow{
  position:absolute;
  inset:-30%;
  background:
    radial-gradient(900px circle at 20% 30%, rgba(34,211,238,0.18), transparent 60%),
    radial-gradient(900px circle at 85% 70%, rgba(167,139,250,0.14), transparent 60%);
  animation: glowDrift 10s ease-in-out infinite;
}
@keyframes glowDrift{
  0%{ transform: translate3d(-1%, -1%, 0); }
  50%{ transform: translate3d(1%, 1%, 0); }
  100%{ transform: translate3d(-1%, -1%, 0); }
}

/* SVG network animated lines */
.net-line{
  stroke-dasharray: 14 10;
  animation: dash 7.2s linear infinite;
}
.net-line2{
  stroke-dasharray: 16 12;
  animation: dash 9.0s linear infinite;
}
.net-line3{
  stroke-dasharray: 12 12;
  animation: dash 8.0s linear infinite;
}
@keyframes dash{
  to { stroke-dashoffset: -220; }
}
`;
