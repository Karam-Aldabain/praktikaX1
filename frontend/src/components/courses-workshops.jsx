import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Brain,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Code2,
  Globe,
  GraduationCap,
  Layers,
  LineChart,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wand2,
} from "lucide-react";

/** ✅ Palette from your 2nd screenshot */
const COLORS = {
  accent: "#C51F5D",
  slate: "#243447",
  navy: "#141D26",
  paper: "#E2E2D2",
};

const cn = (...c) => c.filter(Boolean).join(" ");

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** ----------------------- BACKGROUNDS (match screenshot) ----------------------- */
const WAVES_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3CradialGradient id='g' cx='35%25' cy='20%25' r='70%25'%3E%3Cstop offset='0%25' stop-color='%23ffffff' stop-opacity='.08'/%3E%3Cstop offset='70%25' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='1600' height='900' fill='url(%23g)'/%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='.08' stroke-width='2'%3E%3Cpath d='M-50 740 C 240 610, 520 840, 860 720 C 1160 610, 1330 540, 1680 660'/%3E%3Cpath d='M-40 680 C 260 560, 540 780, 880 670 C 1180 560, 1340 510, 1700 610'/%3E%3Cpath d='M-30 620 C 280 520, 560 720, 900 620 C 1200 520, 1360 470, 1720 560'/%3E%3Cpath d='M-20 560 C 300 480, 580 660, 920 570 C 1220 480, 1380 430, 1740 510'/%3E%3C/g%3E%3C/svg%3E";

const NOISE_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E";

function DarkPanel({ children, className }) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[36px] text-white",
        "shadow-[0_28px_90px_rgba(0,0,0,0.35)]",
        "border border-white/10",
        "bg-[color:var(--navy)]",
        className
      )}
    >
      {/* base shading */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 650px at 10% 10%, rgba(36,52,71,0.55), transparent 60%)," +
            "radial-gradient(900px 600px at 85% 18%, rgba(255,255,255,0.06), transparent 55%)," +
            "linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.24))",
        }}
      />

      {/* waves */}
      <div
        className="absolute inset-0 opacity-[0.95]"
        style={{
          backgroundImage: `url("${WAVES_DATA_URI}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* accent sweep (bottom-right) */}
      <motion.div
        className="absolute -bottom-44 -right-44 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(197,31,93,0.70), rgba(197,31,93,0.0) 62%)",
          filter: "blur(8px)",
        }}
        animate={reduce ? undefined : { x: [0, -18, 0], y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* subtle corner glow */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(120,160,255,0.12),transparent_60%)] blur-[8px]" />

      {/* noise */}
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-soft-light"
        style={{ backgroundImage: `url("${NOISE_DATA_URI}")`, backgroundSize: "220px 220px" }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Reveal({ children, delay = 0, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ type: "spring", stiffness: 140, damping: 18, delay }}
    >
      {children}
    </motion.div>
  );
}

function Chip({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold tracking-wide text-white/80">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-[rgba(197,31,93,0.22)] border border-[rgba(197,31,93,0.35)]">
        <BookOpen className="h-3.5 w-3.5 text-[color:var(--accent)]" />
      </span>
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-extrabold",
        "bg-[linear-gradient(135deg,#C51F5D,#A9164E)] text-white",
        "shadow-[0_18px_55px_rgba(197,31,93,0.30)]",
        "hover:brightness-110 active:scale-[0.99] transition",
        className
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

function SecondaryButton({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-extrabold",
        "border border-white/10 bg-white/5 text-white/85",
        "hover:bg-white/8 active:scale-[0.99] transition",
        className
      )}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-80 transition-transform group-hover:translate-y-0.5" />
    </button>
  );
}

function PaperCard({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-[color:var(--paper)] text-[color:var(--navy)]",
        "border border-black/10 shadow-[0_18px_50px_rgba(0,0,0,0.20)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function StatCard({ icon: Icon, value, suffix, label, bar = 0.78 }) {
  return (
    <PaperCard className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-4xl font-extrabold leading-none">
            {value}
            <span className="text-[color:var(--accent)]">{suffix}</span>
          </div>
          <div className="mt-3 text-sm font-semibold text-[color:var(--slate)]/80">{label}</div>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-black/10 bg-white/55">
          <Icon className="h-5 w-5 text-[color:var(--navy)]" />
        </div>
      </div>

      <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-black/10">
        <div className="h-full rounded-full bg-[color:var(--accent)]" style={{ width: `${Math.round(bar * 100)}%` }} />
      </div>
    </PaperCard>
  );
}

function MiniRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-white/5">
          <Icon className="h-4.5 w-4.5 text-[color:var(--accent)]" />
        </div>
        <div className="text-xs font-extrabold text-white/70">{label}</div>
      </div>
      <div className="text-xs font-extrabold text-white/90">{value}</div>
    </div>
  );
}

function GlassCard({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/10 bg-white/5",
        "shadow-[0_28px_90px_rgba(0,0,0,0.40)]",
        "backdrop-blur-md",
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base font-semibold text-white/65">{subtitle}</p> : null}
    </div>
  );
}

function Field({ label, placeholder, icon: Icon, type = "text", required = true }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold text-white/60">{label}</span>
      <div className="relative">
        {Icon ? <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" /> : null}
        <input
          required={required}
          type={type}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90",
            "placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/55",
            Icon ? "pl-10" : ""
          )}
        />
      </div>
    </label>
  );
}

function SelectField({ label, placeholder, options, required = true }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold text-white/60">{label}</span>
      <select
        required={required}
        defaultValue=""
        className={cn(
          "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90",
          "focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/55"
        )}
      >
        <option value="" disabled className="bg-[color:var(--navy)]">
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[color:var(--navy)]">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({ label, placeholder, minLength = 30, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold text-white/60">{label}</span>
      <textarea
        required
        minLength={minLength}
        rows={5}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90",
          "placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/55"
        )}
      />
    </label>
  );
}

/** ----------------------- PAGE (matches your screenshot blocks) ----------------------- */
export default function CoursesWorkshopsPage() {
  const { scrollYProgress } = useScroll();
  const topBar = useSpring(scrollYProgress, { stiffness: 140, damping: 22 });

  useEffect(() => {
    localStorage.setItem("px_theme", "dark");
  }, []);

  const [details, setDetails] = useState("");

  return (
    <div
      className="min-h-screen"
      style={{
        ["--accent"]: COLORS.accent,
        ["--navy"]: COLORS.navy,
        ["--slate"]: COLORS.slate,
        ["--paper"]: COLORS.paper,
        background: "#F2F1E7",
      }}
    >
      {/* top progress bar */}
      <motion.div className="fixed left-0 top-0 z-[80] h-[3px] w-full origin-left bg-[color:var(--accent)]" style={{ scaleX: topBar }} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* ---------------- HERO (top-left screenshot) ---------------- */}
        <section id="top">
          <DarkPanel className="p-8 md:p-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              {/* left */}
              <div className="lg:col-span-7">
                <Reveal>
                  <Chip>Expert led Learning Experiences</Chip>

                  <h1 className="mt-7 text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
                    <span className="block text-white">Transform Your</span>
                    <span className="block">
                      <span className="text-[color:var(--accent)]">Team</span>{" "}
                      <span className="text-white/90">Fast</span>
                    </span>
                  </h1>

                  <p className="mt-5 max-w-2xl text-base font-semibold text-white/65">
                    World-class workshops and courses tailored to deliver measurable results — in{" "}
                    <span className="text-[color:var(--accent)] font-extrabold">days</span>, not months.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <PrimaryButton onClick={() => scrollToId("request")}>Book a Workshop</PrimaryButton>
                    <SecondaryButton onClick={() => scrollToId("delivery-1")}>Explore Options</SecondaryButton>
                  </div>
                </Reveal>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <Reveal delay={0.05}>
                    <StatCard icon={Users} value="500" suffix="+" label="Workshops Delivered" bar={0.74} />
                  </Reveal>
                  <Reveal delay={0.10}>
                    <StatCard icon={Globe} value="30" suffix="+" label="Countries Reached" bar={0.62} />
                  </Reveal>
                  <Reveal delay={0.15}>
                    <StatCard icon={AwardIcon} value="98" suffix="%" label="Satisfaction" bar={0.86} />
                  </Reveal>
                </div>
              </div>

              {/* right (floating Upskill card like screenshot) */}
              <div className="lg:col-span-5">
                <Reveal>
                  <div className="relative">
                    <div className="absolute -inset-6 rounded-[36px] bg-white/5 blur-[0px] border border-white/10" />

                    <GlassCard className="relative p-6">
                      <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7">
                        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
                          <GraduationCap className="h-6 w-6 text-[color:var(--accent)]" />
                        </div>

                        <div className="mt-5 text-center text-2xl font-extrabold">Upskil</div>
                        <div className="mt-2 text-center text-sm font-semibold text-white/55">Expert led delivery</div>

                        <div className="mt-5 flex flex-wrap justify-center gap-2">
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white/75">
                            Workshops
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white/75">
                            Courses
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3">
                        <MiniRow icon={Clock3} label="Response" value="24 hrs" />
                        <MiniRow icon={BadgeCheck} label="Customization" value="100%" />
                        <MiniRow icon={Users} label="Facilitators" value="Expert" />
                        <MiniRow icon={ShieldCheck} label="Support" value="60 days" />
                      </div>
                    </GlassCard>
                  </div>
                </Reveal>
              </div>
            </div>
          </DarkPanel>
        </section>

        {/* ---------------- DELIVERY OPTIONS (top-right screenshot) ---------------- */}
        <section id="delivery-1" className="mt-10">
          <DarkPanel className="p-8 md:p-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <Chip>Expert led Learning Experiences</Chip>

                  <h2 className="mt-7 text-4xl font-extrabold tracking-tight md:text-5xl">
                    Delivery options that feel <span className="text-[color:var(--accent)]">premium</span>
                  </h2>

                  <p className="mt-4 max-w-xl text-base font-semibold text-white/65">
                    Pick a format, field it, then choose how you want it delivered.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <PrimaryButton onClick={() => scrollToId("request")}>Book a Workshop</PrimaryButton>
                    <SecondaryButton onClick={() => scrollToId("offer")}>Explore Options</SecondaryButton>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <Reveal>
                  <GlassCard className="p-6">
                    <div className="space-y-4">
                      <DeliveryRow icon={Wand2} title="Flexible & Integrated" desc="Fit your team’s schedule and workflow." />
                      <DeliveryRow icon={Users} title="Co-Business" desc="We align with your goals & agreements." />
                      <DeliveryRow icon={Brain} title="Soft Choices" desc="Communication, teamwork, and leadership." />
                    </div>
                  </GlassCard>
                </Reveal>
              </div>
            </div>
          </DarkPanel>
        </section>

        {/* ---------------- DELIVERY OPTIONS (middle-right screenshot) ---------------- */}
        <section id="delivery-2" className="mt-10">
          <DarkPanel className="p-8 md:p-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
                    Delivery options that feel <span className="text-[color:var(--accent)]">premium</span>
                  </h2>
                  <p className="mt-4 max-w-xl text-base font-semibold text-white/65">
                    Pick a format that works for your team and watch features update instantly.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <PrimaryButton onClick={() => scrollToId("request")}>Workshops</PrimaryButton>
                    <SecondaryButton onClick={() => scrollToId("offer")}>Blocks Options</SecondaryButton>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <Reveal>
                  <div className="relative">
                    {/* floating tip bubble */}
                    <div className="absolute -top-6 right-0 max-w-[360px] rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur-md">
                      <span className="inline-flex items-center gap-2">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-[rgba(197,31,93,0.22)] border border-[rgba(197,31,93,0.35)]">
                          <Sparkles className="h-3 w-3 text-[color:var(--accent)]" />
                        </span>
                        Pick a format type with it to choose an integrated experience.
                      </span>
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-4">
                      <GlassCard className="p-6">
                        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
                          <Users className="h-6 w-6 text-[color:var(--accent)]" />
                        </div>
                        <div className="mt-5 text-sm font-extrabold text-white/90">In-Person Intensive</div>
                        <div className="mt-2 text-xs font-semibold text-white/55">
                          Hands-on at your location with live demos.
                        </div>
                        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-[color:var(--accent)]" style={{ width: "70%" }} />
                        </div>
                      </GlassCard>

                      <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(197,31,93,0.90),rgba(197,31,93,0.65))] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.40)]">
                        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-white/10">
                          <Globe className="h-6 w-6 text-white" />
                        </div>
                        <div className="mt-5 text-sm font-extrabold text-white">Live Virtual Sessions</div>
                        <div className="mt-2 text-xs font-semibold text-white/85">
                          Interactive online sessions + resources.
                        </div>
                        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                          <div className="h-full rounded-full bg-white" style={{ width: "82%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </DarkPanel>
        </section>

        {/* ---------------- WHAT WE OFFER (bottom-left screenshot) ---------------- */}
        <section id="offer" className="mt-10">
          <DarkPanel className="p-8 md:p-12">
            <Reveal>
              <SectionHeader
                title={<span>What we offer</span>}
                subtitle="Technical skills training tailored for your team — choose a track, then choose delivery."
              />
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              <OfferCard
                icon={Code2}
                title="Technology & IT"
                desc="Software development, cybersecurity, data science."
                foot="Ecosystem alignment"
                bar={0.78}
              />
              <OfferCard
                icon={Briefcase}
                title="Business & Management"
                desc="Leadership, project management, strategy."
                foot="Professional outcomes"
                bar={0.72}
              />
              <OfferCard
                icon={Brain}
                title="Soft Skills"
                desc="Communication, teamwork, problem-solving."
                foot="Team dynamics"
                bar={0.66}
              />
            </div>
          </DarkPanel>
        </section>

        {/* ---------------- SIX PILLARS (bottom-right screenshot) ---------------- */}
        <section id="why" className="mt-10">
          <DarkPanel className="p-8 md:p-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <Reveal>
                  <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
                    Six pillars of <span className="text-[color:var(--accent)]">excellence</span>
                  </h2>
                  <p className="mt-4 max-w-xl text-base font-semibold text-white/65">
                    The details that make your workshops feel premium and produce outcomes.
                  </p>
                </Reveal>
              </div>

              <div className="lg:col-span-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <PillarCard icon={Target} title="Tailored Content" desc="Contextualized for your org & goals." />
                  <PillarCard icon={Users} title="Expert Instructors" desc="Real-world experience, not theory only." />
                  <PillarCard icon={Clock3} title="Flexible Scheduling" desc="Fits your team’s availability." />
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <DarkPill icon={Layers}>Colored Content</DarkPill>
              <DarkPill icon={Globe}>Global Standards</DarkPill>
              <DarkPill icon={ShieldCheck}>Scalable Support</DarkPill>
              <DarkPill icon={TrendingUp}>Continuous Support</DarkPill>
            </div>
          </DarkPanel>
        </section>

        {/* ---------------- REQUEST (kept from your original) ---------------- */}
        <section id="request" className="mt-10 pb-14">
          <DarkPanel className="p-8 md:p-12">
            <Reveal>
              <SectionHeader
                title={
                  <span>
                    Let’s create something <span className="text-[color:var(--accent)]">powerful</span>
                  </span>
                }
                subtitle="Tell us what you need — we’ll propose the best course + format for your team."
              />
            </Reveal>

            <div className="mt-10">
              <GlassCard className="p-6 md:p-8">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Submitted! Connect this to your API.");
                  }}
                  className="grid gap-6"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field label="Organization *" placeholder="Your Organization" />
                    <Field label="Full Name *" placeholder="John Doe" />
                    <Field label="Email *" placeholder="your@email.com" icon={Mail} type="email" />
                    <Field label="Phone *" placeholder="+1 (555) 123-4567" icon={Phone} />
                    <SelectField label="Workshop Type *" placeholder="Select type" options={["Course", "Workshop", "Bootcamp", "Masterclass"]} />
                    <SelectField label="Participants *" placeholder="Select count" options={["1-10", "11-20", "21-50", "51-100", "100+"]} />
                    <SelectField label="Format *" placeholder="Select format" options={["In-Person Intensive", "Live Virtual Sessions", "Hybrid Experience"]} />
                    <SelectField label="Timeline *" placeholder="Select timeline" options={["ASAP", "This month", "Next month", "This quarter"]} />
                  </div>

                  <div>
                    <TextArea
                      label="Focus Areas *"
                      placeholder="e.g., React, backend, leadership, communication..."
                      minLength={30}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                    />
                    <div className="mt-2 text-right text-xs font-semibold text-white/45">{details.length}/2000</div>
                  </div>

                  <button
                    type="submit"
                    className={cn(
                      "w-full rounded-2xl px-6 py-4 text-base font-extrabold text-white",
                      "bg-[linear-gradient(135deg,#C51F5D,#A9164E)]",
                      "shadow-[0_18px_55px_rgba(197,31,93,0.30)]",
                      "hover:brightness-110 active:scale-[0.99] transition",
                      "focus:outline-none focus:ring-2 focus:ring-white/20"
                    )}
                  >
                    Submit Request
                  </button>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white/55">
                      <CalendarDays className="h-4 w-4 text-[color:var(--accent)]" />
                      Fast scheduling in days, not months.
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-white/55">
                      <Send className="h-4 w-4 text-[color:var(--accent)]" />
                      We reply within 24 hours.
                    </div>
                  </div>
                </form>
              </GlassCard>
            </div>
          </DarkPanel>
        </section>

        {/* footer */}
        <div className="mt-10 text-center text-xs font-semibold text-black/40">
          © {new Date().getFullYear()} Courses & Workshops — All rights reserved.
        </div>

        {/* quick jump buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => scrollToId("top")}
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-extrabold text-black/70 hover:bg-white/90"
          >
            Back to top
          </button>
          <button
            onClick={() => scrollToId("offer")}
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-extrabold text-black/70 hover:bg-white/90"
          >
            What we offer
          </button>
          <button
            onClick={() => scrollToId("request")}
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-extrabold text-black/70 hover:bg-white/90"
          >
            Request
          </button>
        </div>
      </div>
    </div>
  );
}

/** ---------- Small parts for fidelity ---------- */

function DeliveryRow({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
          <Icon className="h-5 w-5 text-[color:var(--accent)]" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-extrabold text-white/90">{title}</div>
          <div className="mt-1 text-xs font-semibold text-white/55">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function OfferCard({ icon: Icon, title, desc, foot, bar = 0.72 }) {
  return (
    <Reveal>
      <PaperCard className="p-6">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-white/60">
          <Icon className="h-6 w-6 text-[color:var(--accent)]" />
        </div>

        <div className="mt-6 text-lg font-extrabold">{title}</div>
        <div className="mt-2 text-sm font-semibold text-[color:var(--slate)]/80">{desc}</div>

        <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[color:var(--slate)]/85">
          <span className="grid h-6 w-6 place-items-center rounded-full border border-black/10 bg-white">
            <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--accent)]" />
          </span>
          {foot}
        </div>

        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-black/10">
          <div className="h-full rounded-full bg-[color:var(--accent)]" style={{ width: `${Math.round(bar * 100)}%` }} />
        </div>
      </PaperCard>
    </Reveal>
  );
}

function PillarCard({ icon: Icon, title, desc }) {
  return (
    <Reveal>
      <PaperCard className="p-5">
        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-black/10 bg-white/60">
          <Icon className="h-5 w-5 text-[color:var(--accent)]" />
        </div>
        <div className="mt-4 text-sm font-extrabold">{title}</div>
        <div className="mt-2 text-xs font-semibold text-[color:var(--slate)]/80">{desc}</div>
        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
          <div className="h-full rounded-full bg-[color:var(--accent)]" style={{ width: "78%" }} />
        </div>
      </PaperCard>
    </Reveal>
  );
}

function DarkPill({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold text-white/75">
      <Icon className="h-4 w-4 text-[color:var(--accent)]" />
      {children}
    </span>
  );
}

/** Simple Award icon */
function AwardIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props} className={cn("h-5 w-5", props.className)}>
      <path d="M12 15a6 6 0 1 0-6-6 6 6 0 0 0 6 6Z" stroke="currentColor" strokeWidth="2" />
      <path d="M8 14.5 7 22l5-2 5 2-1-7.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
