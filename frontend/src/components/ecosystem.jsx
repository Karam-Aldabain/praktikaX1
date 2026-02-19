import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Calendar,
  ChevronRight,
  ClipboardCheck,
  Compass,
  FileCheck2,
  Globe2,
  GraduationCap,
  Handshake,
  LineChart,
  MapPin,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Target,
  Users,
  Workflow,
} from "lucide-react";

/** =========================
 *  THEME (same as your code)
 *  ========================= */
const THEME = {
  deep: "#0B1220",
  slate: "#1E2A3A",
  sand: "#E9E7DF",

  accent: "#22D3EE",  // cyan
  accent2: "#A78BFA", // violet
  accent3: "#34D399", // green
  accent4: "#F59E0B", // amber

  pink: "#C91D67", // keep pink for primary CTAs & small highlights
  star: "#F5D66B",
};

const DARK_SECTION_BG = "linear-gradient(90deg, #050B1F 0%, #071A3E 100%)";
const ACCENT_RGB = "201,29,103";
const accent = (a) => `rgba(${ACCENT_RGB}, ${a})`;

const iconStrongProps = { strokeWidth: 2.4 };

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** =========================
 *  Small helpers
 *  ========================= */
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

function AnimatedNumber({ value, suffix = "+", durationMs = 950 }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

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
    <span className="tabular-nums">
      {(reduce ? value : n).toLocaleString()}
      {suffix}
    </span>
  );
}

function IconBadge({ color, children }) {
  return (
    <span
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl ring-1"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
        border: "1px solid rgba(255,255,255,0.22)",
        boxShadow: "0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.20)",
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
    "text-white shadow-[0_14px_38px_rgba(34,211,238,0.18)] hover:translate-y-[-1px] active:translate-y-[0px]";
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

function SectionHeader({ eyebrow, title, subtitle, dark }) {
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

      <h2
        className={cx(
          eyebrow ? "mt-5 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl" : "mt-0 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-[#0B1220]"
        )}
      >
        {title}
      </h2>

      {subtitle ? (
        <p className={cx("mt-3 max-w-4xl text-balance text-base sm:text-lg", dark ? "text-white/70" : "text-[#0B1220]/70")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function PhotoCard({ title, subtitle, image, icon: Icon, color, bullets, darkCopy = false }) {
  void Icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[34px] ring-1"
      style={{ borderColor: "rgba(255,255,255,0.12)", boxShadow: "0 22px 70px rgba(0,0,0,0.35)" }}
    >
      <div className="absolute inset-0">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              darkCopy
                ? "linear-gradient(180deg, rgba(233,231,223,0.25) 0%, rgba(233,231,223,0.82) 62%, rgba(233,231,223,0.92) 100%)"
                : "linear-gradient(180deg, rgba(11,18,32,0.15) 0%, rgba(11,18,32,0.78) 62%, rgba(11,18,32,0.92) 100%)",
          }}
        />
      </div>

      {/* hover shimmer */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="shine" />
      </div>

      <div className="relative p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className={cx("text-xl font-semibold", darkCopy ? "text-[#0B1220]" : "text-white")}>{title}</div>
            <div className={cx("mt-2 text-sm", darkCopy ? "text-[#0B1220]/80" : "text-white/70")}>{subtitle}</div>
          </div>
          <IconBadge color={color}>
            <Icon className="h-5 w-5" {...iconStrongProps} />
          </IconBadge>
        </div>

        {bullets?.length ? (
          <div className="mt-5 grid gap-2">
            {bullets.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full ring-1 ring-white/15 bg-white/10">
                  <span className={cx("h-2 w-2 rounded-full", darkCopy ? "bg-[#0B1220]/80" : "bg-white/90")} />
                </span>
                <div className={cx("text-sm", darkCopy ? "text-[#0B1220]/85" : "text-white/80")}>{b}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

function PillarNode({ title, desc, icon: Icon, color, image, align = "left" }) {
  void Icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[32px] bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur"
      style={{ boxShadow: "0 18px 60px rgba(0,0,0,0.28)" }}
    >
      <div className="absolute inset-0 opacity-70">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,18,32,0.55), rgba(11,18,32,0.90))" }} />
      </div>

      <div className="relative">
        <div className={cx("flex items-start gap-4", align === "right" ? "flex-row-reverse text-right" : "")}>
          <IconBadge color={color}>
            <Icon className="h-5 w-5" {...iconStrongProps} />
          </IconBadge>

          <div className="flex-1">
            <div className="text-lg font-semibold text-white">{title}</div>
            <div className="mt-2 text-sm leading-relaxed text-white/75">{desc}</div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

function OrbitEcosystem({ reduce }) {
  // "Data-related" animation: orbiting nodes = ecosystem stakeholders in motion.
  const nodes = [
    { label: "Talent", icon: Users, color: THEME.accent, x: 0, y: -1 },
    { label: "Institutions", icon: Building2, color: THEME.accent3, x: 1, y: 0 },
    { label: "Experts", icon: BadgeCheck, color: THEME.accent2, x: -1, y: 0 },
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* outer glass */}
      <div
        className="absolute inset-0 rounded-[44px] ring-1 ring-white/10"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
        }}
      />

      {/* animated connection SVG */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={THEME.accent} stopOpacity="0.85" />
            <stop offset="55%" stopColor={THEME.pink} stopOpacity="0.55" />
            <stop offset="100%" stopColor={THEME.accent2} stopOpacity="0.85" />
          </linearGradient>
        </defs>

        <path
          d="M50 18 C70 25, 84 40, 78 57 C72 74, 54 84, 38 78 C22 72, 18 55, 25 40 C32 25, 42 20, 50 18 Z"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1.1"
          strokeDasharray="3 3"
          className="dash-flow"
          opacity="0.75"
        />

        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      </svg>

      {/* center core */}
      <div className="absolute inset-0 grid place-items-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative grid h-[68%] w-[68%] place-items-center rounded-full ring-1 ring-white/15 overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(233,231,223,0.22), rgba(11,18,32,0.92))",
            boxShadow: "0 26px 85px rgba(0,0,0,0.42)",
          }}
        >
          {/* subtle texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.14]" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.20) 0px, rgba(255,255,255,0.20) 14px, transparent 14px, transparent 30px)" }} />
          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/80 ring-1 ring-white/10">
              <Globe2 className="h-4 w-4" style={{ color: THEME.accent }} {...iconStrongProps} />
              <span>ECOSYSTEM CORE</span>
            </div>
            <div className="mt-4 text-2xl font-semibold text-white">Praktix Network</div>
            <div className="mt-2 text-sm text-white/70">
              Connected stakeholders, structured outcomes.
            </div>
          </div>
        </motion.div>
      </div>

      {/* orbit */}
      <div className={cx("absolute inset-0", reduce ? "" : "orbit-rot")}>
        {nodes.map((n, idx) => {
          const Icon = n.icon;
          const positions = [
            { left: "50%", top: "7%" },
            { left: "84%", top: "54%" },
            { left: "16%", top: "58%" },
          ];
          const pos = positions[idx];

          return (
            <motion.div
              key={n.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={pos}
              animate={reduce ? undefined : { y: [0, -2, 0] }}
              transition={reduce ? undefined : { duration: 5.8 + idx * 0.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="group relative">
                <div
                  className={cx(
                    "flex items-center gap-3 rounded-full px-4 py-3 ring-1 backdrop-blur",
                    reduce ? "" : "orbit-node-upright"
                  )}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.14)",
                    boxShadow: `0 18px 55px rgba(0,0,0,0.32)`,
                  }}
                >
                  <IconBadge color={n.color}>
                    <Icon className="h-4 w-4" {...iconStrongProps} />
                  </IconBadge>
                  <div>
                    <div className="text-sm font-semibold text-white">{n.label}</div>
                  </div>
                </div>

                {/* hover glow */}
                <div
                  className="pointer-events-none absolute -inset-2 -z-10 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle, ${n.color} 0%, transparent 60%)` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/** =========================
 *  Page
 *  ========================= */
export default function EcosystemAboutPage() {
  void motion;
  const reduce = useReducedMotion();

  // top progress bar (subtle "better animations")
  const { scrollYProgress } = useScroll();
  const progressX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // counters section
  const { ref: metricsRef, inView: isMetricsInView } = useInViewOnce(0.35);

  // data (from PDF structure; numbers can be adjusted)
  const metrics = useMemo(
    () => [
      {
        label: "Experts",
        value: 40,
        suffix: "+",
        desc: "Industry professionals + European university professors",
        icon: BadgeCheck,
        color: THEME.accent2,
      },
      {
        label: "Institutional & Corporate Partners",
        value: 65,
        suffix: "+",
        desc: "Universities, corporations, public entities, innovation hubs",
        icon: Building2,
        color: THEME.accent3,
      },
      {
        label: "Programs & Engagements",
        value: 120,
        suffix: "+",
        desc: "Workshops, internships, showcases, and transformation initiatives",
        icon: Workflow,
        color: THEME.accent,
      },
      {
        label: "Talent Outcomes Supported",
        value: 1200,
        suffix: "+",
        desc: "Portfolio verification, evaluation, structured transitions",
        icon: GraduationCap,
        color: THEME.accent4,
      },
    ],
    []
  );

  const photo = {
    hero: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    pillarsTalent: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    pillarsInstitutions: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    pillarsExperts: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",

    experts: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    industry: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=80",
    events: "/images/career-events-banner.jpg",
    hiring: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80",
    europe: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
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
      <div className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-white/5">
        <motion.div
          className="h-full"
          style={{
            width: progressX,
            background: `linear-gradient(90deg, ${THEME.accent} 0%, ${THEME.pink} 55%, ${THEME.accent2} 100%)`,
          }}
        />
      </div>

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

      {/* HERO (new layout, not like your other page) */}
      <section className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-8 lg:grid-cols-2 lg:py-12">
          {/* left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <h1 className="mt-2 text-balance text-4xl font-semibold leading-[1.06] sm:text-5xl lg:text-6xl">
              A Connected <span style={{ color: THEME.pink }}>Professional</span> Ecosystem.
            </h1>

            <p className="mt-5 max-w-xl text-balance text-base text-white/70 sm:text-lg">
              Where talent, institutions, and industry collaborate to create measurable impact.
            </p>

            <div className="mt-5 max-w-xl space-y-2 text-sm leading-relaxed text-white/65">
              <p>
                Praktix is <span className="font-semibold text-white">not a platform</span>.
              </p>
              <p>
                It is a structured ecosystem integrating European experts, universities, corporations, and emerging
                talent into one outcome-driven environment.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GradientButton href="#pillars">See the Pillars</GradientButton>
              <GradientButton href="#metrics" variant="secondary">
                Ecosystem Metrics
              </GradientButton>
            </div>

            {/* hero photo ribbon (adds visual variety) */}
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-xl">
              {[
                { t: "Experts", c: THEME.accent2, i: BadgeCheck },
                { t: "Institutions", c: THEME.accent3, i: Building2 },
                { t: "Talent", c: THEME.accent, i: Users },
              ].map((x) => {
                const I = x.i;
                return (
                  <div
                    key={x.t}
                    className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur"
                    style={{ boxShadow: "0 18px 60px rgba(0,0,0,0.25)" }}
                  >
                    <div className="flex items-center gap-3">
                      <IconBadge color={x.c}>
                        <I className="h-4 w-4" {...iconStrongProps} />
                      </IconBadge>
                      <div>
                        <div className="text-sm font-semibold text-white">{x.t}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* right */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
            className="relative"
          >
            <OrbitEcosystem reduce={reduce} />
          </motion.div>
        </div>
      </section>

      {/* PILLARS (triangular + animated connection lines) */}
      <section id="pillars" className="relative" style={{ background: "linear-gradient(180deg, rgba(11,18,32,1) 0%, rgba(7,26,62,1) 100%)" }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionHeader
            title="Each pillar strengthens the other."
            subtitle="Ensuring that learning becomes execution—and execution becomes measurable impact."
            dark
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="h-full">
              <PillarNode
                title="Talent"
                desc="Students, graduates, early talent, and professionals upgrading their skills."
                icon={GraduationCap}
                color={THEME.accent}
                image={photo.pillarsTalent}
              />
            </div>

            <div className="h-full">
              <PillarNode
                title="Institutions"
                desc="Universities, companies, public sector entities, and innovation hubs."
                icon={Building2}
                color={THEME.accent3}
                image={photo.pillarsInstitutions}
              />
            </div>

            <div className="h-full">
              <PillarNode
                title="Experts"
                desc="Industry leaders, professors, consultants, and strategic advisors."
                icon={BadgeCheck}
                color={THEME.accent2}
                image={photo.pillarsExperts}
              />
            </div>
          </div>

        </div>
      </section>

      {/* NETWORK (photo-led modular cards, different layout) */}
      <section id="network" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionHeader
            title="Global Expert Network"
            subtitle="Powered by active industry professionals and European university professors who design, supervise, and evaluate real-world programs."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Industry-active experts", i: BadgeCheck, c: THEME.accent2 },
              { t: "Academic credibility", i: GraduationCap, c: THEME.accent3 },
              { t: "Measurable evaluation", i: FileCheck2, c: THEME.accent4 },
              { t: "Structured supervision model", i: Compass, c: THEME.accent },
            ].map((x, idx) => {
              const I = x.i;
              return (
                <motion.div
                  key={x.t}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.06 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-[34px] p-7 ring-1 ring-[#0B1220]/10 backdrop-blur"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.55) 100%)",
                    boxShadow: "0 16px 50px rgba(11,18,32,0.10)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `${x.c}33` }}
                  />

                  <div className="relative flex items-center gap-3">
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                    >
                      <IconBadge color={x.c}>
                        <I className="h-5 w-5" {...iconStrongProps} />
                      </IconBadge>
                    </motion.div>
                    <div className="text-lg font-semibold text-[#0B1220]">{x.t}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8">
            <div
              className="relative overflow-hidden rounded-[36px] p-7 ring-1 ring-[#0B1220]/10"
              style={{
                background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 100%)`,
                boxShadow: "0 22px 70px rgba(0,0,0,0.16)",
              }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.14]" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)" }} />
              <div className="relative text-white">
                <div className="text-2xl font-semibold">Experts don’t just guide.</div>
                <div className="mt-1 text-2xl font-semibold">They structure capability.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRY + EVENTS + HIRING + EUROPE (photo modules, consistent theme) */}
      <section id="engagements" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionHeader
            title="Industry is integrated into execution."
            subtitle="Not positioned as an external destination—organizations become part of the learning and innovation infrastructure."
            dark
          />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <PhotoCard
              title="Industry Engagements"
              subtitle="Organizations contribute directly through structured programs."
              image={photo.industry}
              icon={Handshake}
              color={THEME.accent3}
              bullets={[
                "Internship supervision",
                "Corporate AI workshops",
                "Capability development programs",
                "Tailored transformation initiatives",
                "Hiring pipelines",
                "Co-hosted academic programs",
              ]}
            />

            <div className="grid grid-cols-1 gap-6">
              <PhotoCard
                title="Educational & Career Events"
                subtitle="Alignment. Visibility. Opportunity creation."
                image={photo.events}
                icon={Calendar}
                color={THEME.accent4}
                bullets={[
                  "Innovation showcases",
                  "Career summits",
                  "Demo days",
                  "Executive AI briefings",
                  "Expert roundtables",
                  "Global exposure programs",
                ]}
              />

              <PhotoCard
                title="Hiring & Talent Mobility"
                subtitle="Merit-based access supported by evidence."
                image={photo.hiring}
                icon={Shield}
                color={THEME.accent}
                bullets={[
                  "Portfolio verification",
                  "Skill validation",
                  "Project-based assessment",
                  "Employer introductions",
                  "Structured evaluation frameworks",
                ]}
              />
            </div>
          </div>

          {/* EUROPE MAP module */}
          <div className="mt-10">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[40px] ring-1 ring-white/10"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
                boxShadow: "0 26px 90px rgba(0,0,0,0.35)",
              }}
            >
              <div className="absolute inset-0">
                <img src={photo.europe} alt="European network" className="h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(11,18,32,0.78), rgba(11,18,32,0.92))" }} />
              </div>

              {/* pulsing "nodes" */}
              <div className="absolute inset-0 pointer-events-none">
                {[
                  { left: "20%", top: "55%", c: THEME.accent },
                  { left: "38%", top: "40%", c: THEME.accent2 },
                  { left: "52%", top: "58%", c: THEME.accent3 },
                  { left: "67%", top: "44%", c: THEME.accent4 },
                  { left: "78%", top: "62%", c: THEME.pink },
                ].map((p, i) => (
                  <span
                    key={i}
                    className="absolute h-3 w-3 rounded-full"
                    style={{ left: p.left, top: p.top, background: p.c, boxShadow: `0 0 0 10px rgba(255,255,255,0.06)` }}
                  >
                    <span className="map-pulse" style={{ "--dot": p.c }} />
                  </span>
                ))}
              </div>

              <div className="relative p-7 sm:p-9">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="text-xs font-semibold tracking-widest text-white/60">EUROPEAN NETWORK INTEGRATION</div>
                    <div className="mt-2 text-3xl font-semibold text-white">Built on European standards. Delivered with global relevance.</div>
                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                      Structured collaboration across European academic and industry networks ensures academic alignment,
                      industry integration, innovation exchange, exposure opportunities, and knowledge mobility.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur lg:w-[360px]">
                    <div className="flex items-center gap-3">
                      <IconBadge color={THEME.accent2}>
                        <MapPin className="h-5 w-5" {...iconStrongProps} />
                      </IconBadge>
                      <div>
                        <div className="text-xs font-semibold tracking-widest text-white/60">DELIVERY MODEL</div>
                        <div className="mt-1 text-sm font-semibold text-white">Cross-border collaboration</div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {[
                        { t: "Academic alignment", c: THEME.accent2 },
                        { t: "Industry integration", c: THEME.accent3 },
                        { t: "Innovation exchange", c: THEME.accent },
                        { t: "Exposure opportunities", c: THEME.accent4 },
                        { t: "Knowledge mobility", c: THEME.pink },
                      ].map((x) => (
                        <div key={x.t} className="flex items-center gap-3">
                          <span className="h-2 w-2 rounded-full" style={{ background: x.c }} />
                          <span className="text-sm text-white/80">{x.t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* METRICS (counters on scroll, clean numeric emphasis) */}
      <section id="metrics" className="relative" style={{ background: THEME.sand, color: THEME.deep }}>
        <div ref={metricsRef} className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <SectionHeader
            title="Ecosystem at a Glance"
            subtitle=""
          />

          <div className="mt-10 relative overflow-hidden rounded-[40px] bg-white/55 ring-1 ring-[#0B1220]/10 backdrop-blur"
               style={{ boxShadow: "0 26px 90px rgba(0,0,0,0.16)" }}>
            <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(34,211,238,0.16)" }} />
            <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(167,139,250,0.14)" }} />

            <div className="relative grid grid-cols-1 overflow-hidden sm:grid-cols-2">
              {metrics.map((m, idx) => {
                const Icon = m.icon;
                const border =
                  idx === 0
                    ? "border-b border-[#0B1220]/10 sm:border-b sm:border-r"
                    : idx === 1
                    ? "border-b border-[#0B1220]/10 sm:border-b"
                    : idx === 2
                    ? "border-[#0B1220]/10 sm:border-r"
                    : "";

                return (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isMetricsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.06 }}
                    className={cx("p-6 sm:p-7", border)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 text-xs font-semibold tracking-widest text-[#0B1220]/55">
                          <IconBadge color={m.color}>
                            <Icon className="h-4 w-4" {...iconStrongProps} />
                          </IconBadge>
                          <span>{m.label.toUpperCase()}</span>
                        </div>

                        <div className="mt-3 text-4xl font-semibold text-[#0B1220]">
                          {isMetricsInView ? (
                            <AnimatedNumber value={m.value} suffix={m.suffix} />
                          ) : (
                            <span className="tabular-nums">0{m.suffix}</span>
                          )}
                        </div>

                        <div className="mt-2 text-sm text-[#0B1220]/70">{m.desc}</div>
                      </div>

                      <div className="hidden sm:block">
                        <div className="h-12 w-1 rounded-full" style={{ background: m.color, opacity: 0.6 }} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative" style={{ background: DARK_SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-18">
          <div
            className="relative overflow-hidden rounded-[38px] border border-white/10 px-6 py-8 sm:px-10 sm:py-10"
            style={{
              background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 100%)`,
              boxShadow: "0 24px 90px rgba(0,0,0,0.20)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.16]" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 28px)" }} />

            <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="text-xs font-semibold tracking-widest text-white/80">OPTIONS</div>
                <div className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                  Build with the network—<span className="text-white/90">not around it.</span>
                </div>
                <p className="mt-4 max-w-2xl text-sm font-medium text-white/85">
                  Partnerships align institutions and industry. Experts structure capability. Collaboration turns learning into verified outcomes.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <GradientButton href="/about/partnerships#architecture">
                    Explore Partnerships
                  </GradientButton>
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

/** =========================
 *  CSS (custom motion + lines)
 *  ========================= */
const css = `
.light-streak{
  position:absolute; inset:-20% -10%;
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

.shine{
  position:absolute; inset:-30% -30%;
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

.dash-flow{
  animation: dash 4.2s linear infinite;
}
@keyframes dash{
  to { stroke-dashoffset: -60; }
}

.pulse-dot{
  filter: drop-shadow(0 10px 22px rgba(0,0,0,0.35));
}
.pulse-dot{
  animation: dotPulse 2.8s ease-in-out infinite;
}
@keyframes dotPulse{
  0%,100%{ transform: scale(1); opacity: 0.95; }
  50%{ transform: scale(1.25); opacity: 0.75; }
}

.orbit-rot{
  animation: orbit 28s linear infinite;
  transform-origin: center;
}
@keyframes orbit{
  to { transform: rotate(360deg); }
}

.orbit-node-upright{
  animation: orbitCounter 28s linear infinite;
  transform-origin: center;
}
@keyframes orbitCounter{
  to { transform: rotate(-360deg); }
}

/* map pulse */
.map-pulse{
  position:absolute; inset:-18px;
  border-radius: 999px;
  border: 2px solid var(--dot, rgba(255,255,255,0.6));
  opacity: 0.0;
  transform: scale(0.6);
  animation: mapPulse 2.6s ease-out infinite;
}
@keyframes mapPulse{
  0%{ opacity: 0.0; transform: scale(0.6); }
  20%{ opacity: 0.35; }
  100%{ opacity: 0.0; transform: scale(1.6); }
}
`;
