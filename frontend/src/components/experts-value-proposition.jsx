import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Calculator,
  CheckCircle2,
  FileCheck2,
  Globe2,
  Landmark,
  ShieldCheck,
  Sparkles,
  Wallet,
  Layers3,
  Crown,
  Gem,
  Handshake,
  ScrollText,
  Lock,
} from "lucide-react";

/**
 * Same colors (unchanged), but used more intentionally:
 * - Deep/slate for structure
 * - Sand for breathing space
 * - Accent colors for highlights + icon gradients
 */
const THEME = {
  deep: "#0B1220",
  slate: "#1E2A3A",
  sand: "#E9E7DF",
  accent: "#22D3EE",
  accent2: "#A78BFA",
  accent3: "#34D399",
  accent4: "#F59E0B",
  pink: "#C91D67",
};

/**
 * Same data, upgraded icons to feel more “premium”
 * (still Lucide, just better-matched to each promise).
 */
const WHY_ITEMS = [
  { label: "Monetization infrastructure", icon: Wallet },
  { label: "Access to global learners", icon: Globe2 },
  { label: "Corporate client exposure", icon: Handshake },
  { label: "Institutional licensing opportunities", icon: Landmark },
];

const PROGRAM_TYPES = [
  { type: "Self-paced", potential: "Scalable volume and evergreen revenue." },
  { type: "Live cohort", potential: "Premium pricing with high engagement outcomes." },
  { type: "Hybrid", potential: "Balanced operational model with strong retention." },
  { type: "Corporate training", potential: "Higher ticket B2B contracts and repeat deals." },
  { type: "Executive education", potential: "Premium positioning with leadership-focused pricing." },
  { type: "Workshops", potential: "Fast launch model for lead generation and upselling." },
  { type: "Bootcamps", potential: "Intensive format with strong perceived value." },
  { type: "Certification tracks", potential: "Credential-led demand and long-term program lifecycle." },
];

const SOCIAL_PROOF = [
  "Experts delivering to cross-border learners and institutions.",
  "Programs used by corporate teams for practical upskilling.",
  "Structured certification workflows designed for employer trust.",
];

const FAQ = [
  {
    q: "Who owns my intellectual property?",
    a: "You retain ownership of your original content. Platform rights are limited to delivery and agreed distribution scope.",
  },
  {
    q: "When do payouts happen?",
    a: "Payouts follow the configured schedule with transparent gross, fee, tax, and net breakdown in your dashboard.",
  },
  {
    q: "Can I define different pricing for corporate and public cohorts?",
    a: "Yes. Registration includes separate corporate/public pricing controls and additional pricing logic options.",
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function GlowBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Top aurora */}
      <div
        className="absolute -top-64 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(197,31,93,0.28), rgba(167,139,250,0.18), rgba(34,211,238,0.10), rgba(20,29,38,0))",
        }}
      />
      {/* Right glow */}
      <div
        className="absolute -right-56 top-10 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(closest-side, rgba(34,211,238,0.20), rgba(20,29,38,0))",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 50%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 50%, transparent 72%)",
        }}
      />
    </div>
  );
}

function Card({ className, children, tone = "dark", interactive = false }) {
  const base =
    "rounded-[28px] p-5 backdrop-blur-md transition will-change-transform";
  const dark =
    "bg-white/6 ring-1 ring-white/10 shadow-[0_22px_90px_rgba(0,0,0,0.45)]";
  const light =
    "bg-white/70 ring-1 ring-[#0B1220]/10 shadow-[0_18px_55px_rgba(0,0,0,0.14)]";

  const hover = interactive
    ? "hover:-translate-y-1 hover:shadow-[0_26px_100px_rgba(0,0,0,0.18)]"
    : "";

  return (
    <div
      className={cn(base, tone === "dark" ? dark : light, hover, className)}
    >
      {children}
    </div>
  );
}

function Pill({ children, icon: Icon = Layers3 }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3.5 py-1.5 text-xs font-semibold text-white/75 ring-1 ring-white/10">
      <span
        className="grid h-5 w-5 place-items-center rounded-full ring-1 ring-white/10"
        style={{
          background:
            "linear-gradient(135deg, rgba(201,29,103,0.35), rgba(34,211,238,0.20))",
        }}
      >
        <Icon className="h-3.5 w-3.5 text-white/80" />
      </span>
      {children}
    </span>
  );
}

function IconBadge({ icon: Icon, gradient }) {
  return (
    <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl">
      {/* glow */}
      <span
        className="absolute inset-0 rounded-2xl blur-xl opacity-70"
        style={{ background: gradient }}
      />
      {/* body */}
      <span
        className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ring-white/12"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))",
        }}
      >
        <span
          className="absolute inset-[1px] rounded-2xl"
          style={{ background: gradient, opacity: 0.18 }}
        />
        <Icon className="relative h-[18px] w-[18px] text-white/85" />
      </span>
    </span>
  );
}

function SectionHeader({ kicker, title, desc, tone = "light" }) {
  const titleCls =
    tone === "dark" ? "text-[#E9E7DF]" : "text-[#0B1220]";
  const descCls =
    tone === "dark" ? "text-white/65" : "text-[#0B1220]/70";

  return (
    <div className="mb-5">
      {kicker ? (
        <div className={cn("text-xs font-semibold tracking-wide uppercase", descCls)}>
          {kicker}
        </div>
      ) : null}
      <h2 className={cn("mt-1 text-xl font-semibold sm:text-2xl", titleCls)}>
        {title}
      </h2>
      {desc ? <p className={cn("mt-2 text-sm sm:text-base", descCls)}>{desc}</p> : null}
    </div>
  );
}

function Divider() {
  return (
    <div className="my-10 h-px w-full bg-[#0B1220]/10" />
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function InputNumber({ label, value, onChange }) {
  return (
    <label className="text-xs font-semibold text-[#0B1220]/65">
      {label}
      <div className="mt-1 flex items-center gap-2 rounded-2xl border border-[#0B1220]/10 bg-white/80 px-3 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.05)] focus-within:border-[#0B1220]/25">
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent text-sm text-[#0B1220] outline-none"
        />
      </div>
    </label>
  );
}

function Row({ label, value, bold = false }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#0B1220]/72">{label}</span>
      <span className={cn(bold ? "font-semibold" : "", "text-[#0B1220]")}>
        {value}
      </span>
    </div>
  );
}

function FancyButton({ href, children }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-sm font-semibold text-white ring-1 ring-white/20 shadow-[0_14px_36px_rgba(201,29,103,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(11,18,32,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
      style={{
        background:
          "linear-gradient(120deg, #C91D67 0%, #B947A0 48%, #6CC8E6 100%)",
      }}
    >
      <span
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 opacity-0 blur-md transition-all duration-500 group-hover:left-[110%] group-hover:opacity-100"
        aria-hidden="true"
      />
      <span className="relative">
        {children}
        <span
          className="absolute -bottom-1 left-0 h-px w-0 bg-white/70 transition-all duration-300 group-hover:w-full"
          aria-hidden="true"
        />
      </span>
      <span className="relative grid h-6 w-6 place-items-center rounded-full bg-white/18 ring-1 ring-white/30">
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

export default function ExpertsValuePropositionPage() {
  const [programPrice, setProgramPrice] = useState(1000);
  const [learners, setLearners] = useState(30);
  const [commission, setCommission] = useState(15);

  const numbers = useMemo(() => {
    const gross =
      Math.max(0, Number(programPrice || 0)) *
      Math.max(0, Number(learners || 0));
    const fee = gross * (Math.max(0, Number(commission || 0)) / 100);
    const net = gross - fee;
    return { gross, fee, net };
  }, [programPrice, learners, commission]);

  // Same palette (unchanged), but now used as gradients for cohesive icon styling
  const gradients = [
    `linear-gradient(135deg, ${THEME.accent} 0%, ${THEME.accent2} 100%)`,
    `linear-gradient(135deg, ${THEME.accent2} 0%, ${THEME.pink} 100%)`,
    `linear-gradient(135deg, ${THEME.accent3} 0%, ${THEME.accent} 100%)`,
    `linear-gradient(135deg, ${THEME.accent4} 0%, ${THEME.pink} 100%)`,
    `linear-gradient(135deg, ${THEME.slate} 0%, ${THEME.accent2} 100%)`,
    `linear-gradient(135deg, ${THEME.pink} 0%, ${THEME.accent} 100%)`,
  ];

  return (
    <div className="min-h-screen" style={{ background: THEME.sand, color: THEME.deep }}>
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #050B1F 0%, #071A3E 55%, #0B1220 100%)",
        }}
      >
        <GlowBackdrop />

        <div className="relative z-10 px-5 py-12 text-white">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4 flex flex-wrap gap-2">
              <Pill icon={Crown}>Expert Value Framework</Pill>
              <Pill icon={Gem}>Built for delivery</Pill>
              <Pill icon={ScrollText}>Governance-ready</Pill>
            </div>

            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-12">
                <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-[#E9E7DF] sm:text-5xl">
                  Build, price, certify, and scale your programs through structured expert infrastructure.
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
                  Praktix is built for professional educators and industry specialists who need transparent monetization,
                  institutional-grade governance, and flexible pricing control.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <FancyButton href="/experts/register">Create My Expert Account</FancyButton>

                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 ring-1 ring-white/10">
                    <Lock className="h-4 w-4" style={{ color: THEME.accent }} />
                    Verification + payout setup in onboarding
                  </span>
                </div>
              </div>
            </div>

            {/* Why Praktix */}
            <div className="mt-10 pb-10">
              <Card className="p-6" tone="dark">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-[#E9E7DF]">
                    Why Praktix for Experts
                  </h2>
                
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {WHY_ITEMS.map(({ label, icon: Icon }, idx) => (
                    <div
                      key={label}
                      className="group rounded-[22px] bg-white/5 p-4 ring-1 ring-white/10 transition hover:bg-white/7"
                    >
                      <div className="flex items-center gap-3">
                        <IconBadge
                          icon={Icon}
                          gradient={gradients[idx % gradients.length]}
                        />
                        <div>
                          <div className="font-semibold text-[#E9E7DF] leading-snug">
                            {label}
                          </div>
                          <div className="text-xs text-white/55">
                            Layer {idx + 1}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 h-px w-full bg-white/10" />

                      <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                        
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>

      </section>

      {/* BODY */}
      <section className="px-5 py-12">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            title="Model earnings with transparent inputs"
            tone="light"
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <Card className="p-6" tone="light">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#0B1220]">
                <span
                  className="grid h-8 w-8 place-items-center rounded-2xl ring-1 ring-[#0B1220]/10"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(167,139,250,0.25), rgba(34,211,238,0.18))",
                  }}
                >
                  <Calculator className="h-4 w-4" style={{ color: THEME.accent2 }} />
                </span>
                Example earnings calculator
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <InputNumber label="Program Price" value={programPrice} onChange={setProgramPrice} />
                <InputNumber label="Learners" value={learners} onChange={setLearners} />
                <InputNumber label="Platform Fee %" value={commission} onChange={setCommission} />
              </div>

              <div className="mt-6 rounded-3xl bg-white/60 p-4 ring-1 ring-[#0B1220]/10">
                <div className="space-y-2 text-sm">
                  <Row label="Gross revenue" value={formatCurrency(numbers.gross)} />
                  <Row label="Platform fee" value={formatCurrency(numbers.fee)} />
                  <div className="h-px w-full bg-[#0B1220]/10" />
                  <Row label="Net payout" value={formatCurrency(numbers.net)} bold />
                </div>
              </div>

            </Card>

            <Card className="p-6" tone="light">
              <h3 className="text-lg font-semibold text-[#0B1220]">
                Reference Scenario
              </h3>
              <p className="mt-3 text-sm text-[#0B1220]/70">
                If you sell a EUR 1,000 program to 30 learners:
              </p>

              <ul className="mt-4 space-y-3 text-sm text-[#0B1220]/90">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: THEME.accent3 }} />
                  Gross revenue: EUR 30,000
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: THEME.accent2 }} />
                  Platform fee: X% (configurable)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: THEME.accent4 }} />
                  Net payout: transparent before publishing
                </li>
              </ul>

              <div className="mt-6 rounded-3xl bg-white/60 p-4 ring-1 ring-[#0B1220]/10">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-2xl ring-1 ring-[#0B1220]/10"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(201,29,103,0.18), rgba(34,211,238,0.14))",
                    }}
                  >
                    <BadgeCheck className="h-5 w-5" style={{ color: THEME.pink }} />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-[#0B1220]">
                      Publish with confidence
                    </div>
                    <div className="text-xs text-[#0B1220]/65">
                      Clear fees + predictable payout math.
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Divider />

          <SectionHeader
            title="Program Types Experts Can Create"
            tone="light"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PROGRAM_TYPES.map((item, idx) => (
              <Card key={item.type} className="p-5" tone="light" interactive>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl ring-1 ring-[#0B1220]/10"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(11,18,32,0.06), rgba(255,255,255,0.85))",
                      }}
                    >
                      <Briefcase
                        className="h-5 w-5"
                        style={{
                          color: [THEME.accent, THEME.accent2, THEME.accent3, THEME.accent4, THEME.pink][
                            idx % 5
                          ],
                        }}
                      />
                    </span>
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#0B1220]">
                      {item.type}
                    </h3>
                    <p className="mt-1 text-sm text-[#0B1220]/70">
                      {item.potential}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Divider />

          <SectionHeader
            title="Trust & Governance"
            tone="light"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: "Quality standards", icon: ShieldCheck, c: THEME.accent3 },
              { label: "Expert verification", icon: BadgeCheck, c: THEME.accent2 },
              { label: "Certification authority", icon: FileCheck2, c: THEME.accent4 },
              { label: "Intellectual property ownership", icon: ScrollText, c: THEME.pink },
              { label: "Data protection", icon: Lock, c: THEME.slate },
            ].map((item) => (
              <Card key={item.label} className="p-4" tone="light" interactive>
                <div className="flex items-center gap-3 text-sm font-semibold text-[#0B1220]">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-2xl ring-1 ring-[#0B1220]/10"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(11,18,32,0.06))",
                    }}
                  >
                    <item.icon className="h-5 w-5" style={{ color: item.c }} />
                  </span>
                  <span className="leading-snug">{item.label}</span>
                </div>
              </Card>
            ))}
          </div>

          <Divider />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Card className="p-6" tone="light">
              <h3 className="text-lg font-semibold text-[#0B1220]">
                Why experts choose this model
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[#0B1220]/80">
                {SOCIAL_PROOF.map((item, idx) => (
                  <li key={item} className="flex items-start gap-2">
                    <BadgeCheck
                      className="mt-0.5 h-4 w-4"
                      style={{
                        color: [THEME.accent, THEME.accent2, THEME.accent3][idx % 3],
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6" tone="light">
              <h3 className="text-lg font-semibold text-[#0B1220]">FAQ</h3>
              <div className="mt-4 space-y-4">
                {FAQ.map((item) => (
                  <article key={item.q} className="rounded-2xl bg-white/60 p-4 ring-1 ring-[#0B1220]/10">
                    <p className="text-sm font-semibold text-[#0B1220]/90">{item.q}</p>
                    <p className="mt-1 text-sm text-[#0B1220]/72">{item.a}</p>
                  </article>
                ))}
              </div>
            </Card>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <Card className="p-6 sm:p-8" tone="light">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#0B1220] sm:text-2xl">
                    Ready to structure your expert business on Praktix?
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-[#0B1220]/70 sm:text-base">
                    Continue to registration and configure your profile, monetization model, and pricing logic.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      { t: "Pricing control", c: THEME.accent2 },
                      { t: "Certification-ready", c: THEME.accent4 },
                      { t: "Corporate exposure", c: THEME.accent3 },
                    ].map((p) => (
                      <span
                        key={p.t}
                        className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-semibold ring-1 ring-[#0B1220]/10"
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.c }} />
                        {p.t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-stretch gap-3 sm:items-end">
                  <FancyButton href="/experts/register">Create My Expert Account</FancyButton>
                
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
