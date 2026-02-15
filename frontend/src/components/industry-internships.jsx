import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Users,
  GraduationCap,
  Zap,
  Handshake,
  LineChart,
  Trophy,
  Sparkles,
} from "lucide-react";

/**
 * Palette (kept)
 */
const COLORS = {
  accent: "#C51F5D",
  primary: "#243447",
  deep: "#141D26",
  sand: "#E2E2D2",
  sky: "#EAF2FF",
};

// Images (your same links)
const IMAGES = {
  heroBg:
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2400&q=80",
  heroPortrait:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80",
  solution1:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  solution2:
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
  solution3:
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
  solution4:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
  solution5:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
  about:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80",
};

const SOLUTIONS = [
  {
    title: "Real-World Projects",
    desc: "Industry-driven challenges guided by professionals — built for proof, not theory.",
    img: IMAGES.solution1,
    tag1: "Outcome-based",
    tag2: "Hiring-ready",
  },
  {
    title: "Expert-Led Training",
    desc: "Learn directly from experts with modern tools, systems, and real delivery standards.",
    img: IMAGES.solution2,
    tag1: "Hands-on",
    tag2: "Current stack",
  },
  {
    title: "Career Mentorship",
    desc: "Mentors help you ship, iterate, and present your work like a real team member.",
    img: IMAGES.solution3,
    tag1: "1:1 feedback",
    tag2: "Portfolio polish",
  },
  {
    title: "University-Integrated",
    desc: "Programs aligned with curricula and capstones — easy adoption for institutions.",
    img: IMAGES.solution4,
    tag1: "Curriculum fit",
    tag2: "Scalable",
  },
  {
    title: "Global Exposure",
    desc: "Work across regions (Europe + GCC) with global collaboration and expectations.",
    img: IMAGES.solution5,
    tag1: "International",
    tag2: "Network-first",
  },
];

const HOW_IT_WORKS = [
  {
    icon: "??",
    title: "Apply & Get Matched",
    desc: "Submit your application and we’ll match you with opportunities aligned with your goals.",
  },
  {
    icon: "??",
    title: "Start Your Project",
    desc: "Work on real-world projects with expert guidance and mentoring.",
  },
  {
    icon: "??",
    title: "Build Your Portfolio",
    desc: "Create portfolio-ready outputs that hiring teams can validate.",
  },
  {
    icon: "??",
    title: "Launch Your Career",
    desc: "Use proof of work + network to land roles or accelerate your path.",
  },
];

const LOGOS = [
  "Intel",
  "IBM",
  "Oracle",
  "SAP",
  "Salesforce",
  "Adobe",
  "PwC",
  "Deloitte",
  "EY",
  "Accenture",
  "Cisco",
  "Siemens",
];

const EXPERTS = [
  {
    id: "sarah",
    name: "Dr. Sarah Johnson",
    role: "Senior Product Manager",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    detail: {
      org: "Product Leadership",
      focus: "Strategy, Growth, Roadmaps",
      exp: "10+ years leading product teams",
      linkedin: "#",
    },
  },
  {
    id: "michael",
    name: "Michael Chen",
    role: "Engineering Lead",
    img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=1200&q=80",
    detail: {
      org: "Engineering",
      focus: "Systems, Mentorship, Delivery",
      exp: "8+ years engineering leadership",
      linkedin: "#",
    },
  },
  {
    id: "emma",
    name: "Prof. Emma Williams",
    role: "Academic Director",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    detail: {
      org: "Academia",
      focus: "Curricula, Outcomes, Partnerships",
      exp: "12+ years academic leadership",
      linkedin: "#",
    },
  },
  {
    id: "ahmed",
    name: "Ahmed Al-Rashid",
    role: "Business Strategy",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    detail: {
      org: "GCC Ventures",
      focus: "Market Expansion, Partnerships",
      exp: "12+ years consulting",
      linkedin: "#",
    },
  },
];

const BENEFITS = [
  { icon: Users, title: "Professional Network", desc: "Connect with mentors, peers, and hiring teams across Europe and the GCC." },
  { icon: GraduationCap, title: "Skill Development", desc: "Hands-on work with modern tools and standards used by real teams." },
  { icon: Zap, title: "Career Acceleration", desc: "Move faster with real proof of work and verified outcomes." },
  { icon: Handshake, title: "Mentorship Support", desc: "Guidance from people who’ve hired, led teams, and shipped work." },
  { icon: LineChart, title: "Growth Opportunities", desc: "Pathways built around measurable achievement." },
  { icon: Trophy, title: "Recognition", desc: "Earn certifications and credibility with institutions and partners." },
];

const TESTIMONIALS = [
  {
    quote: "Our students gained invaluable experience through these industry partnerships.",
    name: "Prof. Marie Dubois",
    role: "Department Head",
    org: "Sorbonne University",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80",
  },
  {
    quote: "The projects felt real, the feedback was sharp, and the outcomes were measurable.",
    name: "Alex Morgan",
    role: "Program Participant",
    org: "Technology Track",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    quote: "This ecosystem makes hiring simpler because candidates come with proven work.",
    name: "Leila Hassan",
    role: "Talent Partner",
    org: "Industry Partner",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
  },
];

/* ----------------------------- Helpers ----------------------------- */

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useScrolled(px = 10) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > px);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [px]);
  return scrolled;
}

function useActiveSection(sectionIds = []) {
  const [active, setActive] = useState(sectionIds[0] || "top");
  useEffect(() => {
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top?.target?.id) setActive(top.target.id);
      },
      { threshold: [0.18, 0.28, 0.4], rootMargin: "-20% 0px -65% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return active;
}

function SectionHeading({ eyebrow, title, subtitle, center }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`mx-auto max-w-3xl ${center ? "text-center" : ""}`}
      initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(10px)" }}
      whileInView={reduce ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {eyebrow && (
        <div className="inline-flex items-center rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-extrabold text-[rgba(20,29,38,.70)] shadow-sm backdrop-blur">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--primary)] sm:text-4xl">
        {title}
      </h2>
      <div className={`mt-3 h-1 w-16 rounded-full bg-[var(--accent)] ${center ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-[rgba(20,29,38,.68)] sm:text-base">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function GlowCard({ children, className = "" }) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl border border-black/10 bg-white/70 shadow-[0_18px_60px_rgba(20,29,38,.12)] backdrop-blur-xl",
        className,
      ].join(" ")}
    >
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "rgba(197,31,93,.14)" }}
      />
      <div
        className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "rgba(36,52,71,.10)" }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10" />
      <div className="relative">{children}</div>
    </div>
  );
}

function Tilt({ children, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-30, 30], [6, -6]);
  const rotateY = useTransform(x, [-30, 30], [-6, 6]);

  const onMove = useCallback(
    (e) => {
      if (reduce) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      x.set(Math.max(-30, Math.min(30, dx / 10)));
      y.set(Math.max(-30, Math.min(30, dy / 10)));
    },
    [reduce, x, y]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={reduce ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="py-5">
      <div className="text-4xl font-extrabold tracking-tight text-[var(--deep)]">{value}</div>
      <div className="mt-1 text-sm font-bold text-[rgba(20,29,38,.60)]">{label}</div>
    </div>
  );
}

/* ----------------------------- Navbar ----------------------------- */
function NavBar({ activeId }) {
  const reduce = useReducedMotion();
  const scrolled = useScrolled(6);
  const [open, setOpen] = useState(false);

  const links = [
    { id: "method", label: "Method" },
    { id: "tools", label: "Tools" },
    { id: "journey", label: "Journey" },
    { id: "experts", label: "Experts" },
    { id: "stories", label: "Stories" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.header
      className="fixed left-0 right-0 top-3 z-50 px-3"
      initial={reduce ? false : { y: -16, opacity: 0 }}
      animate={reduce ? {} : { y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div
        className={[
          "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white/70 px-4 py-3 shadow-[0_22px_70px_rgba(20,29,38,.12)] backdrop-blur-xl",
          scrolled ? "bg-white/80" : "",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={() => smoothScrollTo("top")}
          className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-black/5"
        >
          <span
            className="h-3 w-3 rounded-full"
            style={{ background: "var(--accent)", boxShadow: "0 0 0 6px rgba(197,31,93,.12)" }}
          />
          <span className="font-extrabold tracking-tight text-[var(--primary)]">Praktix</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => smoothScrollTo(l.id)}
              className={[
                "relative rounded-xl px-3 py-2 text-sm font-extrabold",
                activeId === l.id ? "text-[rgba(20,29,38,.92)]" : "text-[rgba(20,29,38,.68)] hover:bg-black/5",
              ].join(" ")}
            >
              {l.label}
              {activeId === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-3 right-3 top-[calc(100%-6px)] h-[2px] rounded-full bg-[var(--accent)]"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={(e) => (e.preventDefault(), smoothScrollTo("contact"))}
            className="hidden items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(197,31,93,.20)] hover:brightness-110 md:inline-flex"
          >
            Become a Partner <ArrowRight size={16} />
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 flex-col items-center justify-center gap-1 rounded-xl border border-black/10 bg-white/60 md:hidden"
            aria-label="Open menu"
            aria-expanded={open ? "true" : "false"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="h-[2px] w-5 rounded-full bg-black/70" />
            <span className="h-[2px] w-5 rounded-full bg-black/70" />
            <span className="h-[2px] w-5 rounded-full bg-black/70" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-black/10 bg-white/80 p-2 shadow-[0_22px_70px_rgba(20,29,38,.12)] backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -8, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(10px)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid gap-2">
              {links.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => (setOpen(false), smoothScrollTo(l.id))}
                  className={[
                    "rounded-xl px-3 py-3 text-left text-sm font-extrabold",
                    activeId === l.id ? "bg-[rgba(197,31,93,.10)] text-[rgba(20,29,38,.92)]" : "bg-black/5 text-black/75",
                  ].join(" ")}
                >
                  {l.label}
                </button>
              ))}
              <a
                href="#contact"
                onClick={(e) => (e.preventDefault(), setOpen(false), smoothScrollTo("contact"))}
                className="rounded-xl bg-[var(--accent)] px-3 py-3 text-sm font-extrabold text-white"
              >
                Become a Partner
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ----------------------------- Testimonials ----------------------------- */
function Testimonials() {
  const reduce = useReducedMotion();
  const [[index, dir], setIndex] = useState([0, 0]);

  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setIndex(([i]) => [(i + 1) % TESTIMONIALS.length, 1]), 6500);
    return () => window.clearInterval(t);
  }, [reduce]);

  const paginate = (nextDir) => {
    setIndex(([i]) => {
      const next = (i + nextDir + TESTIMONIALS.length) % TESTIMONIALS.length;
      return [next, nextDir];
    });
  };

  const variants = {
    enter: (d) => ({ x: d > 0 ? 70 : -70, opacity: 0, scale: 0.98, filter: "blur(10px)" }),
    center: { x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: (d) => ({ x: d > 0 ? -70 : 70, opacity: 0, scale: 0.98, filter: "blur(10px)" }),
  };

  return (
    <div className="relative mt-6">
      <div className="mb-2 flex justify-end gap-2">
        <button
          className="grid h-11 w-11 place-items-center rounded-2xl border border-black/10 bg-white/70 shadow-sm"
          onClick={() => paginate(-1)}
          type="button"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          className="grid h-11 w-11 place-items-center rounded-2xl border border-black/10 bg-white/70 shadow-sm"
          onClick={() => paginate(1)}
          type="button"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="relative">
        <AnimatePresence custom={dir} mode="popLayout">
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/75 p-6 shadow-[0_22px_70px_rgba(20,29,38,.12)] backdrop-blur-xl"
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(e, info) => {
              if (reduce) return;
              if (info.offset.x > 70) paginate(-1);
              if (info.offset.x < -70) paginate(1);
            }}
          >
            <div
              className="pointer-events-none absolute -left-10 -top-10 h-52 w-40 rotate-[22deg] rounded-3xl"
              style={{ background: "linear-gradient(180deg, rgba(197,31,93,.55), transparent)" }}
            />
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(197,31,93,.18)] bg-[rgba(197,31,93,.10)]">
              <Sparkles size={18} />
            </div>

            <div className="mt-3 text-lg font-extrabold leading-snug text-black/85">
              “{TESTIMONIALS[index].quote}”
            </div>

            <div className="mt-5 flex items-center gap-3">
              <img
                src={TESTIMONIALS[index].avatar}
                alt={TESTIMONIALS[index].name}
                className="h-12 w-12 rounded-2xl border border-black/10 object-cover"
              />
              <div>
                <div className="font-extrabold text-black/85">{TESTIMONIALS[index].name}</div>
                <div className="text-sm font-bold text-black/60">
                  {TESTIMONIALS[index].role} · {TESTIMONIALS[index].org}
                </div>
              </div>
            </div>

            <div className="mt-4 h-[3px] overflow-hidden rounded-full bg-black/10">
              <motion.div
                key={`bar-${index}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduce ? 0 : 6.4, ease: "linear" }}
                className="h-full w-full origin-left bg-[var(--accent)]"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            className={[
              "h-2.5 w-2.5 rounded-full border border-black/15",
              i === index ? "bg-[var(--accent)]" : "bg-white/70",
            ].join(" ")}
            onClick={() => setIndex([i, i > index ? 1 : -1])}
            type="button"
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- FAQ ----------------------------- */
function FAQ() {
  const reduce = useReducedMotion();
  const items = useMemo(() => SOLUTIONS.map((s) => ({ q: s.title, a: s.desc })), []);
  const [open, setOpen] = useState(items[0]?.q);

  return (
    <div className="mt-6 grid gap-3">
      {items.map((it, idx) => {
        const isOpen = open === it.q;
        return (
          <motion.div
            key={it.q}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.03 }}
            className="overflow-hidden rounded-3xl border border-black/10 bg-white/75 shadow-[0_18px_60px_rgba(20,29,38,.10)] backdrop-blur-xl"
          >
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              type="button"
              onClick={() => setOpen(isOpen ? null : it.q)}
            >
              <span className="text-sm font-extrabold text-black/85">{it.q}</span>
              <span
                className={[
                  "text-black/60 transition-transform",
                  isOpen ? "rotate-180" : "rotate-0",
                ].join(" ")}
                aria-hidden="true"
              >
                ?
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="px-5 pb-5 text-sm leading-relaxed text-black/65">{it.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ----------------------------- Page ----------------------------- */

export default function LandingPage() {
  const reduce = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 22, mass: 0.7 });

  const heroBgY = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 22]);
  const heroArtY = useTransform(scrollY, [0, 900], [0, reduce ? 0 : -10]);

  const activeId = useActiveSection(["method", "tools", "journey", "experts", "stories", "faq", "contact"]);
  const scrolled = useScrolled(6);

  const [selectedExpert, setSelectedExpert] = useState(EXPERTS[3]);

  return (
    <div
      id="top"
      className="min-h-screen"
      style={{
        ["--accent"]: COLORS.accent,
        ["--primary"]: COLORS.primary,
        ["--deep"]: COLORS.deep,
        ["--sand"]: COLORS.sand,
        ["--sky"]: COLORS.sky,
      }}
    >
      {/* LIGHT background like screenshot */}
      <div className="fixed inset-0 -z-10 bg-[#F6F1ED]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(900px_circle_at_12%_18%,rgba(197,31,93,0.12),transparent_60%)]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(1100px_circle_at_88%_0%,rgba(36,52,71,0.10),transparent_55%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.70),rgba(246,241,237,1))]" />

      {/* Progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-[var(--accent)] shadow-[0_10px_30px_rgba(197,31,93,.16)]"
        style={{ scaleX: progress }}
      />

      <NavBar activeId={activeId} />

      <main className="pt-[84px]">
        {/* HERO card (matches screenshot: light, pill offer, big headline, select + CTA, circle portrait) */}
        <section className="mx-auto max-w-6xl px-4">
          <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white/65 shadow-[0_26px_90px_rgba(20,29,38,.14)] backdrop-blur-xl">
            <motion.div
              className="absolute inset-0 opacity-[0.18]"
              style={{
                y: heroBgY,
                backgroundImage: `url(${IMAGES.heroBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "scale(1.05)",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(700px_380px_at_12%_20%,rgba(197,31,93,0.10),transparent_62%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(800px_420px_at_92%_10%,rgba(36,52,71,0.10),transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(246,241,237,0.92))]" />

            {/* diagonal pink stripe like screenshot */}
            <div className="pointer-events-none absolute right-[18%] top-[-35%] h-[180%] w-[14px] rotate-[18deg] rounded-full bg-[linear-gradient(180deg,rgba(197,31,93,0.85),rgba(197,31,93,0.35))] opacity-60" />

            <div className="relative grid gap-6 p-6 md:grid-cols-[1.1fr_.9fr] md:items-center md:p-10">
              {/* left */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={reduce ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="inline-flex rounded-full border border-white/25 bg-[linear-gradient(135deg,rgba(197,31,93,0.92),rgba(36,52,71,0.78))] px-4 py-2 text-xs font-extrabold text-white shadow-sm">
                  Up to 25% off!
                </div>

                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--primary)] sm:text-5xl">
                  Build proof<span className="text-[var(--accent)]">.</span>
                  <br />
                  <span className="text-[var(--accent)]">Launch a real career</span>.
                </h1>

                <p className="mt-3 max-w-[56ch] text-sm font-bold leading-relaxed text-black/60 sm:text-base">
                  Real projects, mentor feedback, and portfolio-ready outcomes — built for students who want results.
                </p>

                <div className="mt-6">
                  <div className="mb-2 text-xs font-extrabold text-black/60">Select your track</div>
                  <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-3 shadow-sm">
                      <span className="text-base">??</span>
                      <select
                        defaultValue="software"
                        className="w-full appearance-none bg-transparent text-sm font-extrabold text-black/80 outline-none"
                      >
                        <option value="software">Software Engineering</option>
                        <option value="data">Data & AI</option>
                        <option value="cyber">Cybersecurity</option>
                        <option value="product">Product</option>
                      </select>
                      <span className="text-sm font-extrabold text-black/45">?</span>
                    </div>

                    <a
                      href="#method"
                      onClick={(e) => (e.preventDefault(), smoothScrollTo("method"))}
                      className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(197,31,93,.20)] hover:brightness-110"
                    >
                      Get started
                    </a>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {["? Verified outcomes", "?? Real projects", "?? Mentor feedback"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-black/10 bg-white/65 px-3 py-2 text-xs font-extrabold text-black/65"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* right */}
              <motion.div
                style={{ y: heroArtY }}
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={reduce ? {} : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.85, ease: [0.2, 0.8, 0.2, 1], delay: 0.05 }}
                className="relative mx-auto w-full max-w-[420px]"
              >
                <div className="relative h-[320px] w-full">
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-[22px] rounded-full border-2 border-[rgba(197,31,93,.22)] shadow-[inset_0_0_0_14px_rgba(36,52,71,.06)]"
                    animate={reduce ? {} : { rotate: 360 }}
                    transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-[52px] overflow-hidden rounded-full border-[12px] border-white/70 shadow-[0_24px_70px_rgba(20,29,38,.18)]">
                    <img src={IMAGES.heroPortrait} alt="Student" className="h-full w-full object-cover" />
                  </div>

                  {/* small dark floating cards like screenshot */}
                  <div className="absolute right-2 top-8 w-[190px] rounded-2xl border border-white/15 bg-[rgba(36,52,71,.86)] p-3 text-white shadow-[0_18px_55px_rgba(20,29,38,.18)]">
                    <div className="text-xs font-extrabold text-white/75">Your goal</div>
                    <div className="mt-1 flex items-center gap-2 text-sm font-extrabold">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> 9 activities/week
                    </div>
                  </div>

                  <div className="absolute right-2 bottom-7 w-[190px] rounded-2xl border border-white/15 bg-[rgba(36,52,71,.86)] p-3 text-white shadow-[0_18px_55px_rgba(20,29,38,.18)]">
                    <div className="text-xs font-extrabold text-white/75">Industry-ready</div>
                    <div className="mt-1 flex items-center gap-2 text-sm font-extrabold">
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" /> Portfolio outputs
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats card (like screenshot) */}
        <section className="mx-auto mt-6 max-w-6xl px-4">
          <div className="rounded-3xl bg-[linear-gradient(90deg,rgba(197,31,93,.22),rgba(36,52,71,.10),rgba(255,255,255,.55))] p-[1px]">
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/70 px-6 shadow-[0_18px_60px_rgba(20,29,38,.10)] backdrop-blur-xl">
              <div className="pointer-events-none absolute -left-40 -bottom-48 h-[30rem] w-[30rem] rounded-full blur-3xl" style={{ background: "rgba(197,31,93,.10)" }} />
              <div className="pointer-events-none absolute -right-48 -bottom-56 h-[36rem] w-[36rem] rounded-full blur-3xl" style={{ background: "rgba(36,52,71,.10)" }} />

              <div className="relative grid grid-cols-1 divide-y divide-black/10 md:grid-cols-3 md:divide-x md:divide-y-0">
                <div className="md:pr-8"><Stat value="500+" label="Active Projects" /></div>
                <div className="md:px-8"><Stat value="50+" label="Partner Companies" /></div>
                <div className="md:pl-8"><Stat value="2000+" label="Successful Placements" /></div>
              </div>

              {/* logo strip under stats (like screenshot) */}
              <div className="relative -mx-2 mb-5 mt-1 flex flex-wrap items-center justify-center gap-2 px-2">
                {LOGOS.slice(0, 10).map((n) => (
                  <span
                    key={n}
                    className="rounded-full border border-black/10 bg-white/65 px-3 py-1.5 text-[11px] font-extrabold text-black/55"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Method */}
        <section id="method" className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading
            eyebrow="The Praktix Method"
            title="A system built for real outcomes"
            subtitle="Three pillars that turn learning into proof of work."
            center
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {SOLUTIONS.slice(0, 3).map((c, idx) => (
              <motion.div
                key={c.title}
                initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(10px)" }}
                whileInView={reduce ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
              >
                <Tilt>
                  <GlowCard className="h-full">
                    <div className="h-44 overflow-hidden">
                      <img src={c.img} alt={c.title} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <div className="text-base font-extrabold text-black/85">{c.title}</div>
                      <div className="mt-2 text-sm font-bold leading-relaxed text-black/60">{c.desc}</div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full border border-[rgba(197,31,93,.18)] bg-[rgba(197,31,93,.10)] px-3 py-1.5 text-xs font-extrabold text-black/75">
                          {c.tag1}
                        </span>
                        <span className="rounded-full border border-black/10 bg-white/65 px-3 py-1.5 text-xs font-extrabold text-black/60">
                          {c.tag2}
                        </span>
                      </div>
                    </div>
                  </GlowCard>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section id="tools" className="border-y border-black/5 bg-[linear-gradient(180deg,rgba(234,242,255,0.55),rgba(255,255,255,0))] py-14">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeading
              eyebrow="Your tools for success"
              title="Everything needed to build confidence and credibility"
              subtitle="Balanced structure + strong visuals, without changing your data."
              center
            />

            <div className="mt-8 grid gap-4">
              {[0, 1, 2].map((i) => {
                const b = BENEFITS[i];
                const Icon = b.icon;
                const img = [IMAGES.solution4, IMAGES.solution5, IMAGES.about][i];
                const flip = i % 2 === 1;

                return (
                  <motion.div
                    key={b.title}
                    className={[
                      "grid overflow-hidden rounded-3xl border border-black/10 bg-white/70 shadow-[0_18px_60px_rgba(20,29,38,.12)] backdrop-blur-xl md:grid-cols-2",
                      flip ? "md:[direction:rtl]" : "",
                    ].join(" ")}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55 }}
                  >
                    <div className="p-6 md:[direction:ltr]">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(197,31,93,.18)] bg-[rgba(197,31,93,.10)] text-black/80">
                        <Icon size={20} />
                      </div>
                      <div className="mt-3 text-lg font-extrabold text-black/85">{b.title}</div>
                      <div className="mt-2 text-sm font-bold leading-relaxed text-black/60">{b.desc}</div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full border border-[rgba(197,31,93,.18)] bg-[rgba(197,31,93,.10)] px-3 py-1.5 text-xs font-extrabold text-black/75">
                          Outcome-driven
                        </span>
                        <span className="rounded-full border border-black/10 bg-white/65 px-3 py-1.5 text-xs font-extrabold text-black/60">
                          Mentor-backed
                        </span>
                      </div>
                    </div>

                    <div className="p-6 md:[direction:ltr]">
                      <div className="overflow-hidden rounded-3xl border border-black/10 shadow-[0_18px_60px_rgba(20,29,38,.12)]">
                        <img src={img} alt={b.title} className="h-[260px] w-full object-cover md:h-[320px]" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Journey */}
        <section id="journey" className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading
            eyebrow="Start your journey"
            title="A clear path from application to outcomes"
            subtitle="Simple steps. Strong guidance. Real artifacts."
            center
          />

          <div className="mt-8 grid gap-4">
            {HOW_IT_WORKS.map((s, idx) => (
              <motion.div
                key={s.title}
                className="grid overflow-hidden rounded-3xl border border-black/10 bg-white/70 shadow-[0_18px_60px_rgba(20,29,38,.12)] backdrop-blur-xl md:grid-cols-[1.2fr_.8fr]"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                <div className="flex gap-4 p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-black/10 bg-black/5 text-sm font-extrabold text-black/70">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-extrabold text-black/85">
                      <span className="grid h-9 w-9 place-items-center rounded-2xl border border-[rgba(197,31,93,.18)] bg-[rgba(197,31,93,.10)]">
                        {s.icon}
                      </span>
                      {s.title}
                    </div>
                    <div className="mt-2 text-sm font-bold leading-relaxed text-black/60">{s.desc}</div>
                    <a
                      href="#contact"
                      onClick={(e) => (e.preventDefault(), smoothScrollTo("contact"))}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--primary)] hover:text-[var(--accent)]"
                    >
                      Talk to us <ArrowRight size={14} />
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <div className="overflow-hidden rounded-3xl border border-black/10 shadow-[0_18px_60px_rgba(20,29,38,.12)]">
                    <img
                      src={[IMAGES.solution1, IMAGES.solution2, IMAGES.solution3, IMAGES.solution4][idx]}
                      alt={s.title}
                      className="h-[220px] w-full object-cover md:h-[260px]"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href="#contact"
              onClick={(e) => (e.preventDefault(), smoothScrollTo("contact"))}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(197,31,93,.20)] hover:brightness-110"
            >
              Get started <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* Experts */}
        <section id="experts" className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading
            eyebrow="Our Experts"
            title="Meet the leaders guiding your journey"
            subtitle="Mentors who know what hiring teams actually want."
            center
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="grid gap-4 lg:col-span-2 sm:grid-cols-2">
              {EXPERTS.slice(0, 2).map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setSelectedExpert(p)}
                  className="group relative h-[340px] overflow-hidden rounded-3xl border border-black/10 bg-white/70 shadow-[0_18px_60px_rgba(20,29,38,.12)] backdrop-blur-xl transition hover:-translate-y-1"
                >
                  <img src={p.img} alt={p.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,29,38,.78)] via-[rgba(20,29,38,.10)] to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <div className="text-lg font-extrabold">{p.name}</div>
                    <div className="mt-1 text-sm font-bold text-white/70">{p.role}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/70 p-6 shadow-[0_18px_60px_rgba(20,29,38,.12)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_250px_at_15%_15%,rgba(197,31,93,.14),transparent_60%)]" />

              <div className="relative flex items-center gap-3">
                <img src={selectedExpert.img} alt={selectedExpert.name} className="h-14 w-14 rounded-2xl border border-black/10 object-cover" />
                <div>
                  <div className="font-extrabold text-black/85">{selectedExpert.name}</div>
                  <div className="text-sm font-bold text-black/60">{selectedExpert.role}</div>
                </div>
              </div>

              <div className="relative mt-5 grid gap-3">
                {[
                  { k: "Organization", v: selectedExpert.detail.org },
                  { k: "Focus", v: selectedExpert.detail.focus },
                  { k: "Experience", v: selectedExpert.detail.exp },
                ].map((row) => (
                  <div key={row.k} className="rounded-2xl border border-black/10 bg-white/65 px-4 py-3">
                    <div className="text-xs font-extrabold text-black/50">{row.k}</div>
                    <div className="mt-1 text-sm font-extrabold text-black/80">{row.v}</div>
                  </div>
                ))}

                <a
                  href={selectedExpert.detail.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between rounded-2xl border border-black/10 bg-white/65 px-4 py-3 text-sm font-extrabold text-black/80 hover:border-[rgba(197,31,93,.35)]"
                >
                  LinkedIn <span className="text-black/60">?</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stories */}
        <section id="stories" className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading
            eyebrow="Success Stories"
            title="Real stories from our interns and partners"
            subtitle="Outcomes that hiring teams can validate."
            center
          />
          <Testimonials />
        </section>

        {/* FAQ (matches screenshot accordion style) */}
        <section id="faq" className="border-y border-black/5 bg-[linear-gradient(180deg,rgba(234,242,255,0.55),rgba(255,255,255,0))] py-14">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeading
              eyebrow="Frequently asked questions"
              title="Answers based on how Praktix works"
              subtitle="Built directly from your solution pillars (no new data invented)."
              center
            />
            <FAQ />
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="mx-auto max-w-6xl px-4 py-14">
          <div className="rounded-3xl bg-[linear-gradient(90deg,rgba(197,31,93,.24),rgba(36,52,71,.10),rgba(255,255,255,.65))] p-[1px]">
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/75 p-8 shadow-[0_18px_60px_rgba(20,29,38,.10)] backdrop-blur-xl md:p-10">
              <div className="pointer-events-none absolute -left-36 -top-36 h-[28rem] w-[28rem] rounded-full blur-3xl" style={{ background: "rgba(197,31,93,.12)" }} />
              <div className="pointer-events-none absolute -right-48 -top-48 h-[34rem] w-[34rem] rounded-full blur-3xl" style={{ background: "rgba(36,52,71,.10)" }} />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <h3 className="text-2xl font-extrabold tracking-tight text-black/85 sm:text-3xl">
                    Ready to Get Started?
                  </h3>
                  <p className="mt-3 text-sm font-bold leading-relaxed text-black/60 sm:text-base">
                    Let’s talk partnerships, programs, and how Praktix can help your students or hiring pipeline.
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-2xl bg-[var(--accent)] px-5 py-3 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(197,31,93,.20)] hover:brightness-110"
                    >
                      Contact Us <span aria-hidden>?</span>
                    </a>
                    <a
                      href="mailto:info@praktix.eu"
                      className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white/60 px-5 py-3 text-sm font-extrabold text-black/75 hover:bg-white/80"
                    >
                      info@praktix.eu
                    </a>
                  </div>
                </div>

                <div className="hidden gap-3 md:flex">
                  <div className="h-12 w-12 rounded-2xl border border-black/10 bg-white/60" />
                  <div className="h-12 w-12 rounded-2xl border border-black/10 bg-white/60" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-10" />
      </main>
    </div>
  );
}

