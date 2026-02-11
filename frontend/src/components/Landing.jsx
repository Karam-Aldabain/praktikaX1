import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  animate,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Linkedin,
  Instagram,
  Users,
  GraduationCap,
  Zap,
  Handshake,
  LineChart,
  Trophy,
  FolderKanban,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import "./landing.css";

/**
 * Colors unchanged (your palette)
 */
const COLORS = {
  accent: "#C51F5D",
  primary: "#243447",
  deep: "#141D26",
  sand: "#E2E2D2",
};

// Photos
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
    icon: "📝",
    title: "Apply & Get Matched",
    desc: "Submit your application and we’ll match you with opportunities aligned with your goals.",
  },
  {
    icon: "🧪",
    title: "Start Your Project",
    desc: "Work on real-world projects with expert guidance and mentoring.",
  },
  {
    icon: "🧰",
    title: "Build Your Portfolio",
    desc: "Create portfolio-ready outputs that hiring teams can validate.",
  },
  {
    icon: "🚀",
    title: "Launch Your Career",
    desc: "Use proof of work + network to land roles or accelerate your path.",
  },
];

const LOGOS = [
  "IBM",
  "Oracle",
  "SAP",
  "Salesforce",
  "Adobe",
  "Intel",
  "Cisco",
  "Siemens",
  "Accenture",
  "PwC",
  "Deloitte",
  "EY",
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

/** Theme based on what's in view (for background crossfade) */
function useActiveTheme(sectionRefs) {
  const [theme, setTheme] = useState("sand");
  useEffect(() => {
    if (!sectionRefs?.length) return;

    const elToTheme = new Map();
    sectionRefs.forEach((ref) => {
      if (ref.current) elToTheme.set(ref.current, ref.current.dataset.theme || "sand");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        setTheme(elToTheme.get(visible.target) || "sand");
      },
      { threshold: [0.08, 0.16, 0.24], rootMargin: "-5% 0px -75% 0px" }
    );

    sectionRefs.forEach((ref) => ref.current && observer.observe(ref.current));
    return () => observer.disconnect();
  }, [sectionRefs]);

  return theme;
}

/** Active section id for nav underline */
function useActiveSection(sectionIds = []) {
  const [active, setActive] = useState(sectionIds[0] || "top");
  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top?.target?.id) setActive(top.target.id);
      },
      { threshold: [0.22, 0.35, 0.5], rootMargin: "-20% 0px -65% 0px" }
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
      className={`lp-heading ${center ? "center" : ""}`}
      initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(10px)" }}
      whileInView={reduce ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {eyebrow && <div className="lp-eyebrow">{eyebrow}</div>}
      <h2 className="lp-h2">{title}</h2>
      {subtitle && <p className="lp-subtitle">{subtitle}</p>}
    </motion.div>
  );
}

function GlowCard({ children, className = "", as = "div", ...props }) {
  const Tag = as;
  return (
    <Tag className={`lp-card lp-glow ${className}`} {...props}>
      <div className="lp-cardInner">{children}</div>
      <div className="lp-cardGlow" aria-hidden="true" />
      <div className="lp-cardNoise" aria-hidden="true" />
      <div className="lp-cardShine" aria-hidden="true" />
    </Tag>
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
      className={`lp-tilt ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduce ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}

function MetricCounter({ value = 0, suffix = "+", label = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.7, once: true });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduce) return;
    const controls = animate(mv, value, { duration: 1.1, ease: [0.2, 0.8, 0.2, 1] });
    const unsub = mv.on("change", (v) => setDisplay(Math.round(v)));
    return () => {
      controls.stop();
      unsub();
    };
  }, [isInView, mv, value, reduce]);

  return (
    <div className="lp-metric" ref={ref}>
      <div className="lp-metricNum">
        {reduce ? value : display}
        {suffix}
      </div>
      <div className="lp-metricLabel">{label}</div>
    </div>
  );
}

function BackgroundLayers({ theme, scrollProgress }) {
  const reduce = useReducedMotion();
  const t = reduce ? { duration: 0 } : { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] };
  const y = useTransform(scrollProgress, [0, 1], reduce ? [0, 0] : [0, -90]);
  const scale = useTransform(scrollProgress, [0, 1], reduce ? [1, 1] : [1, 1.08]);
  const rotate = useTransform(scrollProgress, [0, 1], reduce ? [0, 0] : [0, -1.4]);
  const ySoft = useTransform(scrollProgress, [0, 1], reduce ? [0, 0] : [0, -42]);
  const yStrong = useTransform(scrollProgress, [0, 1], reduce ? [0, 0] : [0, -120]);

  return (
    <motion.div className="lp-bg" style={reduce ? {} : { y, scale, rotate }} aria-hidden="true">
      <motion.div
        className="lp-bgLayer sand"
        style={reduce ? {} : { y: ySoft }}
        animate={{ opacity: theme === "sand" ? 1 : 0 }}
        transition={t}
      />
      <motion.div
        className="lp-bgLayer primary"
        style={reduce ? {} : { y: yStrong }}
        animate={{ opacity: theme === "primary" ? 1 : 0 }}
        transition={t}
      />
      <motion.div
        className="lp-bgLayer deep"
        style={reduce ? {} : { y: ySoft }}
        animate={{ opacity: theme === "deep" ? 1 : 0 }}
        transition={t}
      />
    </motion.div>
  );
}

function NavBar({ activeId }) {
  const reduce = useReducedMotion();
  const scrolled = useScrolled(6);
  const [open, setOpen] = useState(false);

  const links = [
    { id: "solutions", label: "Solutions" },
    { id: "how", label: "How it works" },
    { id: "experts", label: "Experts" },
    { id: "stories", label: "Stories" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.header
      className="lp-nav"
      data-scrolled={scrolled ? "1" : "0"}
      initial={reduce ? false : { y: -18, opacity: 0 }}
      animate={reduce ? {} : { y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="lp-navInner">
        <button className="lp-brand" type="button" onClick={() => smoothScrollTo("top")}>
          <span className="lp-brandDot" aria-hidden="true" />
          <span className="lp-brandText">PraktikaX</span>
        </button>

        <nav className="lp-navLinks" aria-label="Primary">
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              className={`lp-navLink ${activeId === l.id ? "active" : ""}`}
              onClick={() => smoothScrollTo(l.id)}
            >
              {l.label}
              {activeId === l.id && (
                <motion.span
                  className="lp-navUnderline"
                  layoutId="nav-underline"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="lp-navActions">
          <a
            className="lp-navCta"
            href="#contact"
            onClick={(e) => (e.preventDefault(), smoothScrollTo("contact"))}
          >
            Become a Partner <ArrowRight size={16} />
          </a>

          <button
            type="button"
            className="lp-burger"
            aria-label="Open menu"
            aria-expanded={open ? "true" : "false"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lp-mobileMenu"
            initial={{ opacity: 0, y: -8, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(10px)" }}
            transition={{ duration: 0.22 }}
          >
            {links.map((l) => (
              <button
                key={l.id}
                type="button"
                className={`lp-mobileLink ${activeId === l.id ? "active" : ""}`}
                onClick={() => {
                  setOpen(false);
                  smoothScrollTo(l.id);
                }}
              >
                {l.label}
              </button>
            ))}
            <div className="lp-mobileDivider" />
            <a
              className="lp-mobileCta"
              href="#contact"
              onClick={(e) => (e.preventDefault(), setOpen(false), smoothScrollTo("contact"))}
            >
              Become a Partner
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------- Trusted logo wall (2 rows) ---------- */
function LogoWall() {
  const reduce = useReducedMotion();
  const midpoint = Math.ceil(LOGOS.length / 2);
  const rowOne = LOGOS.slice(0, midpoint);
  const rowTwo = LOGOS.slice(midpoint);

  return (
    <div className="lp-logoWall" aria-label="Partner logos">
      <div className="lp-logoRow">
        <div className="lp-logoTrack" data-reduce={reduce ? "1" : "0"}>
          {[...rowOne, ...rowOne].map((name, idx) => (
            <div className="lp-logoPill" key={`${name}-r1-${idx}`}>
              {name}
            </div>
          ))}
        </div>
      </div>

      <div className="lp-logoRow reverse">
        <div className="lp-logoTrack" data-reduce={reduce ? "1" : "0"}>
          {[...rowTwo, ...rowTwo].map((name, idx) => (
            <div className="lp-logoPill" key={`${name}-r2-${idx}`}>
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
    enter: (d) => ({ x: d > 0 ? 70 : -70, opacity: 0, scale: 0.97, filter: "blur(10px)" }),
    center: { x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: (d) => ({ x: d > 0 ? -70 : 70, opacity: 0, scale: 0.97, filter: "blur(10px)" }),
  };

  return (
    <div className="lp-storyWrap">
      <div className="lp-storyNav">
        <button className="lp-storyArrow" type="button" onClick={() => paginate(-1)} aria-label="Previous">
          <ChevronLeft size={18} />
        </button>
        <button className="lp-storyArrow" type="button" onClick={() => paginate(1)} aria-label="Next">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="lp-storyStage">
        <AnimatePresence custom={dir} mode="popLayout">
          <motion.div
            key={index}
            className="lp-storyCard"
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(e, info) => {
              if (reduce) return;
              if (info.offset.x > 70) paginate(-1);
              if (info.offset.x < -70) paginate(1);
            }}
          >
            <div className="lp-storyStripe" aria-hidden="true" />
            <div className="lp-quoteMark" aria-hidden="true">
              <Sparkles size={18} />
            </div>

            <div className="lp-storyQuote">“{TESTIMONIALS[index].quote}”</div>

            <div className="lp-storyMeta">
              <img className="lp-storyAvatar" src={TESTIMONIALS[index].avatar} alt={TESTIMONIALS[index].name} />
              <div>
                <div className="lp-storyName">{TESTIMONIALS[index].name}</div>
                <div className="lp-storyRole">
                  {TESTIMONIALS[index].role} · {TESTIMONIALS[index].org}
                </div>
              </div>
            </div>

            <div className="lp-storyBar" aria-hidden="true">
              <motion.span
                key={`bar-${index}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduce ? 0 : 6.4, ease: "linear" }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="lp-dots" role="tablist" aria-label="Testimonials">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            className={`lp-dotBtn ${i === index ? "active" : ""}`}
            onClick={() => setIndex([i, i > index ? 1 : -1])}
            type="button"
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ScrollTopButton() {
  const [show, setShow] = useState(() => typeof window !== "undefined" && window.scrollY > 700);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="lp-topBtn"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ----------------------------- Page ----------------------------- */

export default function LandingPage() {
  const reduce = useReducedMotion();

  const heroRef = useRef(null);
  const solutionRef = useRef(null);
  const howRef = useRef(null);
  const logosRef = useRef(null);
  const expertsRef = useRef(null);
  const benefitsRef = useRef(null);
  const storiesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = useMemo(
    () => [heroRef, solutionRef, howRef, logosRef, expertsRef, benefitsRef, storiesRef, aboutRef, contactRef],
    []
  );

  const activeTheme = useActiveTheme(sectionRefs);
  const activeId = useActiveSection(["solutions", "how", "experts", "stories", "contact"]);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 22, mass: 0.7 });

  // Hero parallax
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 40]);
  const heroArtY = useTransform(scrollY, [0, 900], [0, reduce ? 0 : -16]);

  const [selectedExpert, setSelectedExpert] = useState(EXPERTS[3]);

  // Copy email UX
  const [copied, setCopied] = useState(false);
  const onCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("info@praktix.eu");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className="lp"
      id="top"
      data-active-theme={activeTheme}
      style={{
        ["--accent"]: COLORS.accent,
        ["--primary"]: COLORS.primary,
        ["--deep"]: COLORS.deep,
        ["--sand"]: COLORS.sand,
      }}
    >
      <BackgroundLayers theme={activeTheme} scrollProgress={progress} />

      {/* Scroll progress */}
      <motion.div className="lp-progress" style={{ scaleX: progress }} aria-hidden="true" />

      <NavBar activeId={activeId} />

      <div className="lp-content">
        {/* HERO (matches screenshot 5 layout style, with your data + palette) */}
        <section ref={heroRef} data-theme="deep" className="lp-hero">
          <motion.div className="lp-heroBg" style={{ y: heroBgY, backgroundImage: `url(${IMAGES.heroBg})` }} />
          <div className="lp-heroOverlay" />
          <div className="lp-heroDiagonal" aria-hidden="true" />
          <div className="lp-heroBlobs" aria-hidden="true">
            <span className="blob a" />
            <span className="blob b" />
          </div>

          <div className="lp-container lp-heroGrid">
            <motion.div
              className="lp-heroLeft"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={reduce ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="lp-heroPill">Up to 25% off!</div>

              <h1 className="lp-h1 hero">
                Build proof <span className="lp-h1Dot">.</span> <br />
                <span className="lp-accentText">Launch a real career</span>.
              </h1>

              <p className="lp-heroLead">
                Real projects, mentor feedback, and portfolio-ready outcomes — built for students who want results.
              </p>

              <div className="lp-heroForm">
                <div className="lp-heroLabel">Select your track</div>

                <div className="lp-heroControls">
                  <div className="lp-select">
                    <span className="lp-selectIcon">🎯</span>
                    <select defaultValue="software" aria-label="Select track">
                      <option value="software">Software Engineering</option>
                      <option value="data">Data & AI</option>
                      <option value="cyber">Cybersecurity</option>
                      <option value="product">Product</option>
                    </select>
                    <span className="lp-selectChevron">▾</span>
                  </div>

                  <a
                    className="lp-btn primary"
                    href="#solutions"
                    onClick={(e) => (e.preventDefault(), smoothScrollTo("solutions"))}
                  >
                    Get started
                  </a>
                </div>
              </div>

              <div className="lp-heroMiniRow">
                <span className="lp-mini">✅ Verified outcomes</span>
                <span className="lp-mini">🧩 Real projects</span>
                <span className="lp-mini">🤝 Mentor feedback</span>
              </div>

              <div className="lp-heroCtas">
                <a className="lp-btn ghost" href="#contact" onClick={(e) => (e.preventDefault(), smoothScrollTo("contact"))}>
                  Become a Partner <ArrowRight size={16} />
                </a>
              </div>

              <div className="lp-metrics">
                <MetricCounter value={500} label="Active Projects" />
                <MetricCounter value={50} label="Partner Companies" />
                <MetricCounter value={2000} label="Successful Placements" />
              </div>
            </motion.div>

            <motion.div
              className="lp-heroRight"
              style={{ y: heroArtY }}
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={reduce ? {} : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.05 }}
            >
              <div className="lp-heroArt">
                <div className="lp-heroRing" aria-hidden="true" />
                <div className="lp-heroCircle">
                  <img src={IMAGES.heroPortrait} alt="Student" />
                </div>

                <motion.div
                  className="lp-floatCard top"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={reduce ? {} : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="lp-floatTitle">Your goal</div>
                  <div className="lp-floatValue">
                    <span className="lp-okDot" /> 9 activities/week
                  </div>
                </motion.div>

                <motion.div
                  className="lp-floatCard bottom"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={reduce ? {} : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="lp-floatTitle">Industry-ready</div>
                  <div className="lp-floatValue">
                    <span className="lp-acDot" /> Portfolio outputs
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SOLUTIONS */}
        <section ref={solutionRef} data-theme="primary" className="lp-section" id="solutions">
          <div className="lp-container">
            <SectionHeading
              eyebrow="Our Solution"
              title="One ecosystem. Multiple career pathways."
              subtitle="Real projects, expert guidance, and global exposure — built into one experience."
              center
            />

            <motion.div
              className="lp-grid cards"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {SOLUTIONS.map((c) => (
                <motion.div
                  key={c.title}
                  variants={{
                    hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)" },
                  }}
                  transition={{ duration: 0.62 }}
                >
                  <Tilt>
                    <GlowCard className="lp-solutionCard">
                      <div className="lp-cardMedia">
                        <img src={c.img} alt={c.title} loading="lazy" />
                      </div>
                      <div className="lp-cardBody">
                        <h3 className="lp-h3">{c.title}</h3>
                        <p className="lp-p">{c.desc}</p>
                        <div className="lp-cardFoot">
                          <span className="lp-chip">{c.tag1}</span>
                          <span className="lp-chip ghost">{c.tag2}</span>
                        </div>
                      </div>
                    </GlowCard>
                  </Tilt>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* HOW */}
        <section ref={howRef} data-theme="sand" className="lp-section alt" id="how">
          <div className="lp-container">
            <SectionHeading
              eyebrow="How It Works"
              title="A simple process to launch your career"
              subtitle="Four steps — designed for clarity, speed, and real outcomes."
              center
            />

            <div className="lp-stepsWrap">
              <div className="lp-stepsLine" aria-hidden="true" />
              <div className="lp-grid steps">
                {HOW_IT_WORKS.map((s, idx) => (
                  <motion.div
                    key={s.title}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.62, delay: idx * 0.06 }}
                  >
                    <GlowCard className="lp-stepCard" as={motion.div} whileHover={reduce ? {} : { y: -8 }}>
                      <div className="lp-stepIcon">{s.icon}</div>
                      <h3 className="lp-h3">{s.title}</h3>
                      <p className="lp-p">{s.desc}</p>
                      <div className="lp-stepHint">
                        Learn more <ArrowRight size={14} />
                      </div>
                    </GlowCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TRUSTED */}
        <section ref={logosRef} data-theme="primary" className="lp-section tight" id="trusted">
          <div className="lp-container">
            <SectionHeading
              eyebrow="Trusted"
              title="Trusted by forward-thinking institutions"
              subtitle="Built with outcomes in mind — designed to meet real market needs."
              center
            />
            <LogoWall />
          </div>
        </section>

        {/* EXPERTS */}
        <section ref={expertsRef} data-theme="sand" className="lp-section" id="experts">
          <div className="lp-container">
            <SectionHeading
              eyebrow="Our Experts"
              title="Meet the leaders guiding your journey"
              subtitle="Mentors who know what hiring teams actually want."
              center
            />

            <div className="lp-expertsGrid">
              <div className="lp-expertCards">
                {EXPERTS.map((e, idx) => {
                  const active = selectedExpert?.id === e.id;
                  return (
                    <motion.button
                      key={e.id}
                      className={`lp-expertCard ${active ? "active" : ""}`}
                      onClick={() => setSelectedExpert(e)}
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.55, delay: idx * 0.05 }}
                      whileHover={reduce ? {} : { y: -6 }}
                      whileTap={{ scale: 0.99 }}
                      type="button"
                    >
                      <img src={e.img} alt={e.name} loading="lazy" />
                      <div className="lp-expertOverlay" />
                      <div className="lp-expertText">
                        <div className="lp-expertName">{e.name}</div>
                        <div className="lp-expertRole">{e.role}</div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedExpert?.id}
                  className="lp-expertDetail"
                  initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 12, filter: "blur(10px)" }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                >
                  <GlowCard className="lp-expertPanel">
                    <div className="lp-expertPanelTop">
                      <div className="lp-expertAvatar">
                        <img src={selectedExpert.img} alt={selectedExpert.name} loading="lazy" />
                      </div>
                      <div>
                        <div className="lp-expertPanelName">{selectedExpert.name}</div>
                        <div className="lp-expertPanelRole">{selectedExpert.role}</div>
                      </div>
                    </div>

                    <div className="lp-expertFacts">
                      <div className="lp-fact">
                        <div className="lp-factLabel">Organization</div>
                        <div className="lp-factValue">{selectedExpert.detail.org}</div>
                      </div>
                      <div className="lp-fact">
                        <div className="lp-factLabel">Focus</div>
                        <div className="lp-factValue">{selectedExpert.detail.focus}</div>
                      </div>
                      <div className="lp-fact">
                        <div className="lp-factLabel">Experience</div>
                        <div className="lp-factValue">{selectedExpert.detail.exp}</div>
                      </div>
                    </div>

                    <a className="lp-link" href={selectedExpert.detail.linkedin} target="_blank" rel="noreferrer">
                      LinkedIn <span aria-hidden="true">↗</span>
                    </a>
                  </GlowCard>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section ref={benefitsRef} data-theme="primary" className="lp-section alt">
          <div className="lp-container">
            <SectionHeading
              eyebrow="Community Benefits"
              title="Opportunities and support for every step"
              subtitle="Everything you need to grow — skills, network, mentorship, and recognition."
              center
            />

            <div className="lp-grid benefits">
              {BENEFITS.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.title}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                  >
                    <GlowCard className="lp-benefitCard" as={motion.div} whileHover={reduce ? {} : { y: -10 }}>
                      <div className="lp-benefitIcon" aria-hidden="true">
                        <Icon size={28} />
                      </div>
                      <h3 className="lp-h3">{b.title}</h3>
                      <p className="lp-p">{b.desc}</p>
                    </GlowCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* STORIES */}
        <section ref={storiesRef} data-theme="sand" className="lp-section" id="stories">
          <div className="lp-container">
            <SectionHeading
              eyebrow="Success Stories"
              title="Real stories from our interns and partners"
              subtitle="Outcomes that hiring teams can validate."
              center
            />
            <Testimonials />
          </div>
        </section>

        {/* ABOUT */}
        <section ref={aboutRef} data-theme="primary" className="lp-section alt">
          <div className="lp-container lp-aboutGrid">
            <motion.div
              className="lp-aboutLeft"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="lp-h2 big">About PraktikaX</h2>
              <p className="lp-p">
                PraktikaX connects ambitious students and graduates with industry-leading companies across Europe and
                the GCC — through real work, not simulated exercises.
              </p>

              <div className="lp-aboutList">
                <div className="lp-aboutItem">✅ Portfolio-first learning</div>
                <div className="lp-aboutItem">🧑‍🏫 Mentor reviews</div>
                <div className="lp-aboutItem">🌍 Global opportunities</div>
              </div>

              <div className="lp-aboutValueGrid">
                <GlowCard className="lp-valueCard">
                  <div className="lp-valueIcon">
                    <FolderKanban size={20} />
                  </div>
                  <div>
                    <div className="lp-valueTitle">Real delivery</div>
                    <div className="lp-valueText">Projects with real constraints and expectations.</div>
                  </div>
                </GlowCard>

                <GlowCard className="lp-valueCard">
                  <div className="lp-valueIcon">
                    <BadgeCheck size={20} />
                  </div>
                  <div>
                    <div className="lp-valueTitle">Proof of work</div>
                    <div className="lp-valueText">Artifacts and outcomes hiring teams can verify.</div>
                  </div>
                </GlowCard>

                <GlowCard className="lp-valueCard">
                  <div className="lp-valueIcon">
                    <Users size={20} />
                  </div>
                  <div>
                    <div className="lp-valueTitle">Mentor network</div>
                    <div className="lp-valueText">Guidance from people who’ve shipped and hired.</div>
                  </div>
                </GlowCard>
              </div>
            </motion.div>

            <motion.div
              className="lp-aboutRight"
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              whileInView={reduce ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7 }}
            >
              <div className="lp-aboutImg">
                <img src={IMAGES.about} alt="Team collaboration" loading="lazy" />
                <div className="lp-aboutImgOverlay" />
                <div className="lp-aboutBadge">
                  <Sparkles size={16} />
                  Built for outcomes
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT */}
        <section ref={contactRef} data-theme="sand" className="lp-section tight" id="contact">
          <div className="lp-container">
            <GlowCard
              className="lp-contactCard"
              as={motion.div}
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              whileHover={reduce ? {} : { y: -10, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <div className="lp-contactBg" aria-hidden="true" />
              <motion.div
                className="lp-contactOrb one"
                aria-hidden="true"
                animate={reduce ? {} : { x: [0, 18, 0], y: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="lp-contactOrb two"
                aria-hidden="true"
                animate={reduce ? {} : { x: [0, -14, 0], y: [0, 12, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="lp-contactIcon"
                aria-hidden="true"
                animate={reduce ? {} : { scale: [1, 1.08, 1], rotate: [0, -4, 0, 4, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                ✉️
              </motion.div>

              <motion.div
                className="lp-contactTitle"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.45, delay: 0.05 }}
              >
                Ready to Get Started?
              </motion.div>
              <motion.div
                className="lp-contactText"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Let’s talk partnerships, programs, and how PraktikaX can help your students or hiring pipeline.
              </motion.div>

              <motion.div
                className="lp-contactActions"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.55, delay: 0.15 }}
              >
                <motion.a className="lp-btn primary" href="/contact" whileHover={reduce ? {} : { y: -2, scale: 1.02 }}>
                  Contact Us <ArrowRight size={16} />
                </motion.a>

                <button className="lp-btn ghost lp-copyBtn" type="button" onClick={onCopyEmail}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  info@praktix.eu
                </button>
              </motion.div>

              <motion.div
                className="lp-socials"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.55, delay: 0.22 }}
              >
                <motion.a className="lp-social" href="#" aria-label="LinkedIn" whileHover={reduce ? {} : { y: -4, scale: 1.04 }}>
                  <Linkedin size={18} />
                </motion.a>
                <motion.a className="lp-social" href="#" aria-label="Instagram" whileHover={reduce ? {} : { y: -4, scale: 1.04 }}>
                  <Instagram size={18} />
                </motion.a>
              </motion.div>
            </GlowCard>
          </div>
        </section>

        <ScrollTopButton />
      </div>
    </div>
  );
}
