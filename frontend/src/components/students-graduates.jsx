// PraktixStudentsGraduates.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function PraktixStudentsGraduates() {
  // ---------- Program data (UNCHANGED) ----------
  const programData = useMemo(
    () => ({
      eng: [
        {
          title: "Software Engineering",
          img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
          rating: "4.9 Industry Mentor Rating",
          level: "Advanced",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Real Client Project · Portfolio Deployment · Expert Evaluation",
          outcomes: "Typical roles: Frontend / Backend / Full-Stack Developer",
        },
        {
          title: "Cloud & DevOps Engineering",
          img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
          rating: "4.8 Industry Mentor Rating",
          level: "Advanced",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Deployed Cloud System · DevOps Workflow Portfolio",
          outcomes: "Typical roles: Cloud Engineer · DevOps Engineer · SRE",
        },
        {
          title: "Data Analysis & BI",
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
          rating: "4.9 Mentor Evaluation Score",
          level: "Professional",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Interactive Dashboard · Insight Report",
          outcomes: "Typical roles: Data Analyst · BI Analyst · Insights Associate",
        },
        {
          title: "Cybersecurity",
          img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
          rating: "4.9 Industry Mentor Rating",
          level: "Advanced",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Security Audit · Hardened System Framework",
          outcomes: "Typical roles: Security Analyst · AppSec Associate · SOC",
        },
        {
          title: "Mobile App Development",
          img: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80",
          rating: "4.8 Mentor Rating",
          level: "Advanced",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Functional Mobile Application · Deployment Demo",
          outcomes: "Typical roles: Mobile Developer · App Engineer",
        },
        {
          title: "Web Development",
          img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80",
          rating: "4.7 Professional Rating",
          level: "Professional",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Live Website · CMS Deployment",
          outcomes: "Typical roles: Web Developer · Frontend Engineer",
        },
        {
          title: "AI & Machine Learning",
          img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80",
          rating: "4.9 AI Expert Rating",
          level: "Advanced",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "AI-Powered Application · Model Performance Report",
          outcomes: "Typical roles: ML Engineer · Applied AI Associate",
        },
        {
          title: "Game Development",
          img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
          rating: "4.7 Industry Rating",
          level: "Professional",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Playable Demo · Game Prototype",
          outcomes: "Typical roles: Game Developer · Gameplay Engineer",
        },
      ],
      digital: [
        {
          title: "UI/UX Product Design",
          img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
          rating: "4.8 Expert Rating",
          level: "Professional",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "High-Fidelity Prototype · Design Case Study",
          outcomes: "Typical roles: Product Designer · UX Designer · UI Designer",
        },
        {
          title: "Digital Transformation",
          img: "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1200&q=80",
          rating: "4.8 Mentor Evaluation Score",
          level: "Professional",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Transformation Roadmap · Executive Presentation",
          outcomes: "Typical roles: Digital Transformation Analyst · Ops Excellence",
        },
        {
          title: "Digital Marketing",
          img: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=80",
          rating: "4.8 Mentor Rating",
          level: "Professional",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Performance Campaign Report",
          outcomes: "Typical roles: Performance Marketer · Growth Associate",
        },
        {
          title: "Content Writing",
          img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=80",
          rating: "4.7 Editorial Rating",
          level: "Professional",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Published Portfolio Collection",
          outcomes: "Typical roles: Content Writer · Copywriter · SEO Specialist",
        },
      ],
      biz: [
        {
          title: "Business Development",
          img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
          rating: "4.8 Industry Rating",
          level: "Professional",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Expansion Strategy Report",
          outcomes: "Typical roles: Business Development Associate",
        },
        {
          title: "Business Consulting",
          img: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1200&q=80",
          rating: "4.8 Consulting Rating",
          level: "Advanced",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Consulting Report + Executive Presentation",
          outcomes: "Typical roles: Consulting Analyst · Strategy Associate",
        },
        {
          title: "Project Management",
          img: "https://images.unsplash.com/photo-1522071901873-411886a10004?auto=format&fit=crop&w=1200&q=80",
          rating: "4.8 Professional Rating",
          level: "Professional",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Execution Plan · Project Documentation",
          outcomes: "Typical roles: Project Coordinator · PM Associate",
        },
        {
          title: "Entrepreneurship & Startup Building",
          img: "https://images.unsplash.com/photo-1559136656-3dbf0fe8f6c3?auto=format&fit=crop&w=1200&q=80",
          rating: "4.9 Innovation Mentor Rating",
          level: "Advanced",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Startup Prototype · Investor Pitch Deck",
          outcomes: "Typical roles: Startup Operator · Founder Associate",
        },
        {
          title: "Sales & Marketing",
          img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&q=80",
          rating: "4.7 Industry Rating",
          level: "Professional",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Sales Strategy Model",
          outcomes: "Typical roles: Sales Associate · Revenue Ops",
        },
      ],
      fin: [
        {
          title: "FinTech Engineering",
          img: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1200&q=80",
          rating: "4.8 Financial Tech Rating",
          level: "Professional",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "FinTech Prototype · Financial Dashboard",
          outcomes: "Typical roles: FinTech Analyst · Product Ops",
        },
        {
          title: "Supply Chain Management",
          img: "https://images.unsplash.com/photo-1586528116493-da8ae0b34f5b?auto=format&fit=crop&w=1200&q=80",
          rating: "4.7 Industry Rating",
          level: "Professional",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Operational Efficiency Report",
          outcomes: "Typical roles: Supply Chain Analyst · Operations Associate",
        },
        {
          title: "Digital Economics",
          img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
          rating: "4.7 Research Rating",
          level: "Professional",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Market Research Study",
          outcomes: "Typical roles: Research Analyst · Market Analyst",
        },
        {
          title: "Finance & Financial Modeling",
          img: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=1200&q=80",
          rating: "4.8 Financial Expert Rating",
          level: "Professional",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Financial Model + Analytical Report",
          outcomes: "Typical roles: Financial Analyst · FP&A Associate",
        },
        {
          title: "Digital Health Management",
          img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
          rating: "4.8 Expert Rating",
          level: "Professional",
          meta: ["Verified Certificate", "3–4 Months", "4 Intakes / Year"],
          deliverable: "Health Management Dashboard",
          outcomes: "Typical roles: Health Ops Analyst · Digital Health Associate",
        },
      ],
    }),
    []
  );

  // ---------- Refs ----------
  const sliderRef = useRef(null);
  const heroVisualRef = useRef(null);
  const impactCountersRef = useRef(null);
  const floatApplyRef = useRef(null);

  const applySectionRef = useRef(null);
  const statusRef = useRef(null);
  const yearWrapRef = useRef(null);
  const catSelectRef = useRef(null);
  const goalRef = useRef(null);
  const formRef = useRef(null);

  // ---------- State ----------
  const [activeCat, setActiveCat] = useState("eng");
  const [fabVisible, setFabVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  // ---------- Helpers ----------
  const scrollToApply = (programTitle) => {
    // Prefill category based on current tab
    const map = {
      eng: "Engineering & Technology",
      digital: "Digital & Innovation",
      biz: "Business & Strategy",
      fin: "Finance & Economics",
    };

    if (catSelectRef.current) {
      catSelectRef.current.value = map[activeCat] || catSelectRef.current.value;
    }

    // Prefill career goal with program name (soft, editable)
    if (goalRef.current && !goalRef.current.value.trim()) {
      goalRef.current.value = `I want to build a portfolio and verified deliverables through the ${programTitle} track.`;
    }

    if (applySectionRef.current) {
      applySectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const syncYear = () => {
    const statusEl = statusRef.current;
    const yearWrapEl = yearWrapRef.current;
    if (!statusEl || !yearWrapEl) return;
    yearWrapEl.style.display = statusEl.value === "student" ? "block" : "none";
  };

  // ---------- Effects (reveal, counters, scroll FAB, parallax) ----------
  useEffect(() => {
    // Reveal on scroll
    const revealEls = Array.from(document.querySelectorAll(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // Animated counters
    const countersRoot = impactCountersRef.current;
    if (!countersRoot) return;

    const counterEls = Array.from(countersRoot.querySelectorAll(".num"));
    let countersDone = false;

    const animateCounter = (el) => {
      const target = Number(el.dataset.count || 0);
      const suffix = el.dataset.suffix || "";
      const duration = 1100;
      const start = performance.now();

      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        const val = Math.floor(eased * target);
        el.textContent = val.toLocaleString() + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const countersIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !countersDone) {
            countersDone = true;
            counterEls.forEach(animateCounter);
          }
        });
      },
      { threshold: 0.25 }
    );

    countersIO.observe(countersRoot);

    return () => countersIO.disconnect();
  }, []);

  useEffect(() => {
    // Floating Apply button show/hide on scroll
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setFabVisible(y > 520);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Subtle parallax for hero visual
    const hv = heroVisualRef.current;
    if (!hv) return;

    const onMove = (e) => {
      const r = hv.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      hv.style.transform = `translateY(${y * -2}px) translateX(${x * -2}px)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    // Initial form behavior
    syncYear();
  }, []);

  // ---------- UI ----------
  const activePrograms = programData[activeCat] || [];

  return (
    <>
      <style>{`
        /* Fonts (keeps UI identical without needing <link> tags in <head>) */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sora:wght@400;600;700&display=swap');

        :root{
          --navy-1:#0B1E2D;
          --navy-2:#0F2C45;
          --ink:#06121B;
          --white:#ffffff;
          --muted:#A9C0D1;
          --line: rgba(255,255,255,.12);
          --mag-1:#ff2fb3;
          --mag-2:#a855f7;
          --mag-3:#22d3ee;
          --card: rgba(255,255,255,.06);
          --card2: rgba(255,255,255,.08);
          --shadow: 0 20px 60px rgba(0,0,0,.35);
          --shadow2: 0 18px 40px rgba(0,0,0,.28);
          --radius: 18px;
          --radius2: 26px;
          --max: 1140px;
        }
        *{box-sizing:border-box}
        html,body{height:100%}
        body{
          margin:0;
          font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          color: var(--white);
          background:
            radial-gradient(1200px 600px at 20% 10%, rgba(255,47,179,.16), transparent 55%),
            radial-gradient(900px 600px at 90% 25%, rgba(34,211,238,.12), transparent 60%),
            linear-gradient(135deg, var(--navy-1), var(--navy-2));
          overflow-x:hidden;
        }
        /* --------- Layout helpers --------- */
        .container{max-width:var(--max); margin:0 auto; padding:0 22px;}
        .section{padding:88px 0;}
        .row{display:flex; gap:34px;}
        .col{flex:1; min-width:0;}
        .center{display:flex; align-items:center; justify-content:center;}
        .muted{color:var(--muted)}
        .small{font-size:13px; letter-spacing:.2px;}
        .eyebrow{display:inline-flex; align-items:center; gap:10px; padding:8px 12px; border:1px solid var(--line); border-radius:999px; background:rgba(255,255,255,.03); backdrop-filter: blur(10px);}
        .dot{width:8px; height:8px; border-radius:999px; background:linear-gradient(90deg,var(--mag-1),var(--mag-2),var(--mag-3)); box-shadow:0 0 0 4px rgba(255,47,179,.12)}
        h1,h2,h3{font-family:Sora, Inter, sans-serif; margin:0}
        h1{font-size: clamp(34px, 4.2vw, 56px); line-height:1.05; letter-spacing:-.6px;}
        h2{font-size: clamp(26px, 3.0vw, 38px); line-height:1.15; letter-spacing:-.4px;}
        h3{font-size: 18px; letter-spacing:-.2px;}
        p{margin:0}
        a{color:inherit; text-decoration:none}

        /* --------- Top nav --------- */
        .nav{
          position:sticky; top:0; z-index:50;
          background:linear-gradient(180deg, rgba(11,30,45,.78), rgba(11,30,45,.45));
          backdrop-filter: blur(14px);
          border-bottom:1px solid rgba(255,255,255,.08);
        }
        .nav-inner{ height:74px; display:flex; align-items:center; justify-content:space-between; }
        .brand{display:flex; align-items:center; gap:10px; font-weight:700; letter-spacing:.2px;}
        .logo{
          width:34px; height:34px; border-radius:12px;
          background: conic-gradient(from 225deg, var(--mag-1), var(--mag-2), var(--mag-3), var(--mag-1));
          box-shadow: 0 10px 30px rgba(255,47,179,.18);
          position:relative; overflow:hidden;
        }
        .logo:after{
          content:""; position:absolute; inset:-40%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.55), transparent 42%);
          transform: rotate(12deg);
          animation: shimmer 6.5s linear infinite;
          opacity:.65;
        }
        @keyframes shimmer{
          0%{transform: translateX(-22%) rotate(12deg)}
          50%{transform: translateX(22%) rotate(12deg)}
          100%{transform: translateX(-22%) rotate(12deg)}
        }
        .nav-links{display:flex; align-items:center; gap:18px; color:rgba(255,255,255,.86); font-weight:500}
        .nav-links a{padding:10px 12px; border-radius:12px}
        .nav-links a:hover{background:rgba(255,255,255,.05)}
        .nav-cta{display:flex; align-items:center; gap:12px;}

        /* --------- Buttons --------- */
        .btn{
          border:1px solid rgba(255,255,255,.18);
          padding:12px 16px;
          border-radius:14px;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          gap:10px;
          cursor:pointer;
          font-weight:600;
          transition: transform .18s ease, background .18s ease, border-color .18s ease, box-shadow .18s ease;
          user-select:none;
        }
        .btn:focus{outline:none; box-shadow: 0 0 0 4px rgba(255,47,179,.22)}
        .btn:hover{transform: translateY(-1px)}
        .btn-primary{
          border:none;
          background: linear-gradient(90deg, var(--mag-1), var(--mag-2));
          box-shadow: 0 16px 44px rgba(255,47,179,.24);
        }
        .btn-primary:hover{box-shadow: 0 18px 52px rgba(255,47,179,.30)}
        .btn-ghost{
          background: rgba(255,255,255,.03);
          border-color: rgba(255,255,255,.22);
        }
        .btn-ghost:hover{background: rgba(255,255,255,.06)}
        .btn-light{
          background:#fff;
          color: #0b1e2d;
          border:none;
          box-shadow: 0 16px 42px rgba(0,0,0,.26);
        }
        .icon{
          width:18px; height:18px;
          display:inline-block;
          background: currentColor;
          mask-size:contain;
          mask-repeat:no-repeat;
          mask-position:center;
          opacity:.95;
        }
        .i-arrow{mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h12"/><path d="m13 5 7 7-7 7"/></svg>');}
        .i-spark{mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M12 2l1.6 6.1L20 10l-6.4 1.9L12 18l-1.6-6.1L4 10l6.4-1.9L12 2z"/></svg>');}
        .i-check{mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>');}
        .i-bolt{mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>');}
        .i-globe{mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>');}
        .i-brief{mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 13h20"/></svg>');}
        .i-hat{mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 4 2 10l10 6 10-6z"/><path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5"/></svg>');}
        .i-file{mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>');}

        /* --------- Hero background animations (grid + light streak) --------- */
        .hero{ position:relative; padding: 84px 0 58px; overflow:hidden; }
        .grid-overlay{
          position:absolute; inset:-1px;
          background-image:
            linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px);
          background-size: 56px 56px;
          opacity:.16;
          mask-image: radial-gradient(circle at 35% 35%, rgba(0,0,0,1), rgba(0,0,0,.15) 55%, rgba(0,0,0,0) 78%);
          animation: gridPan 14s linear infinite;
          pointer-events:none;
        }
        @keyframes gridPan{
          0%{background-position: 0 0, 0 0}
          100%{background-position: 120px 60px, 120px 60px}
        }
        .streak{
          position:absolute; inset:-60px -120px auto -120px; height:240px;
          background: radial-gradient(closest-side, rgba(255,47,179,.22), transparent 70%);
          filter: blur(8px);
          transform: rotate(-10deg);
          animation: streak 7.2s ease-in-out infinite;
          opacity:.9;
          pointer-events:none;
        }
        @keyframes streak{
          0%{transform: translateX(-18%) rotate(-10deg); opacity:.55}
          45%{transform: translateX(18%) rotate(-10deg); opacity:.95}
          100%{transform: translateX(-18%) rotate(-10deg); opacity:.55}
        }

        /* --------- Hero layout --------- */
        .hero-grid{ display:grid; grid-template-columns: 1.1fr .9fr; gap: 40px; align-items:center; }
        .hero p{font-size:16px; line-height:1.7; color: rgba(255,255,255,.78)}
        .cta-row{display:flex; gap:14px; flex-wrap:wrap; margin-top:18px;}
        .badges{display:flex; flex-wrap:wrap; gap:10px; margin-top:16px;}
        .pill{
          padding:8px 12px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.16);
          background: rgba(255,255,255,.04);
          backdrop-filter: blur(10px);
          font-weight:600;
          font-size:13px;
          display:inline-flex;
          align-items:center;
          gap:8px;
          position:relative;
          overflow:hidden;
        }
        .pill:before{
          content:"";
          position:absolute; inset:-40%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.22), transparent 44%);
          transform: translateX(-30%);
          animation: pillShine 4.8s ease-in-out infinite;
          opacity:.8;
          pointer-events:none;
        }
        @keyframes pillShine{
          0%,100%{transform: translateX(-30%)}
          50%{transform: translateX(30%)}
        }
        .hero-visual{
          position:relative;
          border-radius: var(--radius2);
          overflow:hidden;
          box-shadow: var(--shadow);
          border:1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.04);
          min-height: 420px;
        }
        .hero-visual img{
          width:100%; height:100%;
          object-fit:cover;
          transform: scale(1.03);
          filter: saturate(1.08) contrast(1.02);
        }
        .hero-visual:after{
          content:"";
          position:absolute; inset:0;
          background: linear-gradient(180deg, rgba(11,30,45,.12), rgba(11,30,45,.72));
          pointer-events:none;
        }

        /* Floating UI elements */
        .float-ui{ position:absolute; inset:0; pointer-events:none; }
        .chip{
          position:absolute;
          background: rgba(255,255,255,.08);
          border:1px solid rgba(255,255,255,.18);
          border-radius: 16px;
          padding:10px 12px;
          backdrop-filter: blur(12px);
          box-shadow: var(--shadow2);
          display:flex;
          align-items:center;
          gap:10px;
          font-weight:600;
          color: rgba(255,255,255,.9);
          transform: translateZ(0);
          animation: float 6s ease-in-out infinite;
        }
        .chip .mini{font-size:12px; font-weight:600; color: rgba(255,255,255,.70)}
        .chip .bar{
          width:66px; height:8px;
          border-radius:999px;
          background: rgba(255,255,255,.12);
          overflow:hidden;
          position:relative;
        }
        .chip .bar:after{
          content:""; position:absolute; inset:0;
          background: linear-gradient(90deg, var(--mag-1), var(--mag-2), var(--mag-3));
          transform: translateX(-35%);
          animation: barMove 3.8s ease-in-out infinite;
          opacity:.9;
        }
        @keyframes barMove{
          0%,100%{transform: translateX(-35%)}
          50%{transform: translateX(35%)}
        }
        @keyframes float{
          0%,100%{transform: translateY(0)}
          50%{transform: translateY(-10px)}
        }
        .chip.one{left:22px; top:26px; animation-delay:0s}
        .chip.two{right:20px; top:80px; animation-delay:.4s}
        .chip.three{left:30px; bottom:30px; animation-delay:.8s}

        /* --------- Reveal animations --------- */
        .reveal{opacity:0; transform: translateY(16px); transition: opacity .7s ease, transform .7s ease;}
        .reveal.in{opacity:1; transform: translateY(0);}

        /* --------- Cards & surfaces --------- */
        .surface{
          border:1px solid rgba(255,255,255,.12);
          background: var(--card);
          border-radius: var(--radius2);
          backdrop-filter: blur(14px);
          box-shadow: var(--shadow2);
        }
        .surface.light{
          background: rgba(255,255,255,.92);
          color: #0b1e2d;
          border-color: rgba(11,30,45,.10);
          box-shadow: 0 20px 50px rgba(0,0,0,.10);
        }
        .surface.white{
          background: #ffffff;
          color: #0b1e2d;
          border-color: rgba(11,30,45,.10);
          box-shadow: 0 20px 50px rgba(0,0,0,.10);
        }

        /* --------- Problem section --------- */
        .problem{
          background: #ffffff;
          color: var(--ink);
          padding: 86px 0;
          position:relative;
        }
        .split-illus{
          border-radius: var(--radius2);
          overflow:hidden;
          border:1px solid rgba(11,30,45,.10);
          background: linear-gradient(90deg, #f4f7fb, #ffffff);
          height: 300px;
          position:relative;
          box-shadow: 0 18px 40px rgba(0,0,0,.10);
        }
        .split-illus .half{
          position:absolute; top:0; bottom:0; width:50%;
          display:flex; align-items:center; justify-content:center;
          padding:26px;
        }
        .split-illus .left{left:0; background: radial-gradient(500px 250px at 30% 40%, rgba(255,47,179,.18), transparent 60%)}
        .split-illus .right{right:0; background: radial-gradient(600px 280px at 70% 40%, rgba(34,211,238,.18), transparent 60%)}
        .scene{
          width: 92%;
          border-radius: 18px;
          border:1px dashed rgba(11,30,45,.20);
          background: rgba(255,255,255,.72);
          padding:16px;
          display:flex;
          flex-direction:column;
          gap:10px;
        }
        .scene-title{display:flex; gap:10px; align-items:center; font-weight:700}
        .scene-title span{opacity:.75; font-weight:600}
        .scene .line{height:10px; border-radius:999px; background: rgba(11,30,45,.10)}
        .scene .line.w1{width:86%}
        .scene .line.w2{width:72%}
        .scene .line.w3{width:64%}
        .divider{
          width:2px;
          position:absolute;
          top:14px; bottom:14px;
          left:50%;
          background: linear-gradient(180deg, rgba(255,47,179,.8), rgba(34,211,238,.8));
          box-shadow: 0 0 0 6px rgba(11,30,45,.05);
          border-radius:999px;
          transform: translateX(-50%);
          animation: pulse 3.6s ease-in-out infinite;
          opacity:.9;
        }
        @keyframes pulse{
          0%,100%{opacity:.65}
          50%{opacity:1}
        }

        /* --------- Impact section --------- */
        .impact{padding: 86px 0; position:relative;}
        .impact-grid{display:grid; grid-template-columns: repeat(4, 1fr); gap:14px; margin-top:26px;}
        .stat{
          padding:18px 18px 16px;
          border-radius: 18px;
          border:1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.04);
          backdrop-filter: blur(12px);
          transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
          position:relative;
          overflow:hidden;
        }
        .stat:hover{
          transform: translateY(-2px);
          border-color: rgba(255,47,179,.35);
          box-shadow: 0 18px 50px rgba(255,47,179,.10);
        }
        .stat:before{
          content:"";
          position:absolute; inset:-40%;
          background: radial-gradient(circle at 30% 30%, rgba(255,47,179,.18), transparent 44%);
          transform: translateX(-20%);
          animation: statGlow 6s ease-in-out infinite;
          pointer-events:none;
        }
        @keyframes statGlow{
          0%,100%{transform: translateX(-20%)}
          50%{transform: translateX(20%)}
        }
        .stat .num{font-family:Sora, Inter, sans-serif; font-size: 30px; letter-spacing:-.4px; font-weight:700;}
        .stat .lbl{color: rgba(255,255,255,.72); font-weight:600; margin-top:6px; line-height:1.35;}

        /* --------- Timeline --------- */
        .timeline{
          padding: 24px 0 0;
          display:grid;
          grid-template-columns: repeat(4,1fr);
          gap:16px;
          margin-top:22px;
        }
        .step{
          border:1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.04);
          border-radius: 18px;
          padding:18px;
          position:relative;
          overflow:hidden;
          transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
          min-height: 138px;
        }
        .step:hover{
          transform: translateY(-2px);
          border-color: rgba(34,211,238,.35);
          box-shadow: 0 18px 50px rgba(34,211,238,.08);
        }
        .step .badge{
          width:40px; height:40px;
          border-radius:14px;
          display:flex; align-items:center; justify-content:center;
          background: linear-gradient(135deg, rgba(255,47,179,.22), rgba(34,211,238,.16));
          border:1px solid rgba(255,255,255,.16);
          margin-bottom:12px;
        }
        .step .badge .icon{opacity:1}
        .step .title{font-weight:700; margin-bottom:6px;}
        .step .desc{color: rgba(255,255,255,.74); line-height:1.5; font-size:14px;}
        .connector{
          position:absolute;
          left: calc(100% - 8px);
          top: 50%;
          width: 16px;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,47,179,.8), rgba(34,211,238,.8));
          opacity:.9;
        }
        .step:last-child .connector{display:none;}

        /* --------- Programs section --------- */
        .programs{
          background:
            radial-gradient(900px 420px at 20% 30%, rgba(255,47,179,.10), transparent 60%),
            radial-gradient(900px 420px at 80% 30%, rgba(34,211,238,.10), transparent 60%);
          padding: 86px 0;
        }
        .tabs{ display:flex; flex-wrap:wrap; gap:10px; margin-top:18px; }
        .tab{
          padding:10px 12px;
          border-radius: 14px;
          border:1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.04);
          font-weight:700;
          cursor:pointer;
          transition: transform .18s ease, border-color .18s ease, background .18s ease;
          user-select:none;
        }
        .tab:hover{transform: translateY(-1px); background: rgba(255,255,255,.06)}
        .tab.active{
          border-color: rgba(255,47,179,.40);
          background: linear-gradient(90deg, rgba(255,47,179,.18), rgba(34,211,238,.10));
          box-shadow: 0 18px 45px rgba(255,47,179,.10);
        }
        .slider-shell{
          margin-top:20px;
          border-radius: var(--radius2);
          border:1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.03);
          overflow:hidden;
          position:relative;
        }
        .slider-controls{
          position:absolute;
          inset: 14px 14px auto auto;
          display:flex;
          gap:10px;
          z-index:2;
        }
        .iconbtn{
          width:40px; height:40px;
          border-radius:14px;
          border:1px solid rgba(255,255,255,.16);
          background: rgba(255,255,255,.05);
          backdrop-filter: blur(12px);
          cursor:pointer;
          transition: transform .18s ease, background .18s ease, border-color .18s ease;
          display:flex; align-items:center; justify-content:center;
        }
        .iconbtn:hover{transform: translateY(-1px); background: rgba(255,255,255,.08); border-color: rgba(255,47,179,.30)}
        .iconbtn:focus{outline:none; box-shadow: 0 0 0 4px rgba(255,47,179,.22)}
        .slider{
          display:flex;
          gap:14px;
          padding: 70px 14px 18px;
          overflow-x:auto;
          scroll-snap-type: x mandatory;
          scroll-behavior:smooth;
        }
        .slider::-webkit-scrollbar{height:10px}
        .slider::-webkit-scrollbar-thumb{background: rgba(255,255,255,.10); border-radius:999px}

        .program-card{
          scroll-snap-align:start;
          flex: 0 0 340px;
          border-radius: 22px;
          border:1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.04);
          backdrop-filter: blur(12px);
          overflow:hidden;
          transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
          position:relative;
        }
        .program-card:hover{
          transform: translateY(-3px);
          border-color: rgba(255,47,179,.45);
          box-shadow: 0 0 0 1px rgba(255,47,179,.18), 0 20px 60px rgba(255,47,179,.12);
        }
        .pc-img{ height: 170px; position:relative; overflow:hidden; }
        .pc-img img{width:100%; height:100%; object-fit:cover; filter:saturate(1.08) contrast(1.02)}
        .pc-img:after{ content:""; position:absolute; inset:0; background: linear-gradient(180deg, rgba(11,30,45,.05), rgba(11,30,45,.72)); pointer-events:none; }
        .pc-body{padding:16px 16px 14px;}
        .pc-title{font-family:Sora, Inter, sans-serif; font-size:18px; font-weight:700; letter-spacing:-.2px;}
        .pc-sub{margin-top:6px; font-size:14px; color: rgba(255,255,255,.74); line-height:1.55}
        .pc-meta{display:flex; flex-wrap:wrap; gap:8px; margin-top:12px;}
        .tag{
          font-size:12px;
          padding:6px 10px;
          border-radius:999px;
          background: rgba(255,255,255,.06);
          border:1px solid rgba(255,255,255,.12);
          color: rgba(255,255,255,.82);
          font-weight:700;
        }
        .pc-line{margin-top:12px; border-top:1px solid rgba(255,255,255,.10); padding-top:12px;}
        .kv{display:flex; gap:10px; align-items:flex-start;}
        .kv .k{min-width:88px; font-size:12px; color: rgba(255,255,255,.60); font-weight:700; text-transform:uppercase; letter-spacing:.3px;}
        .kv .v{font-size:13px; color: rgba(255,255,255,.78); line-height:1.45; font-weight:600;}
        .pc-actions{padding: 0 16px 16px;}
        .btn-sm{padding:10px 12px; border-radius: 14px; width:100%;}
        .glow-edge{
          position:absolute; inset:-40%;
          background:
            radial-gradient(circle at 25% 30%, rgba(255,47,179,.28), transparent 52%),
            radial-gradient(circle at 80% 20%, rgba(34,211,238,.18), transparent 56%);
          filter: blur(18px);
          opacity:.5;
          pointer-events:none;
          transition: opacity .18s ease;
        }
        .program-card:hover .glow-edge{opacity:.85}
        .fadeSwap{ animation: fadeSwap .30s ease both; }
        @keyframes fadeSwap{
          from{opacity:0; transform: translateY(8px)}
          to{opacity:1; transform: translateY(0)}
        }

        /* --------- Germany section --------- */
        .germany{
          background: #ffffff;
          color: var(--ink);
          padding: 86px 0;
          position:relative;
          overflow:hidden;
        }
        .skyline{
          position:absolute; inset:auto 0 0 0;
          height: 220px;
          opacity:.14;
          background:
            linear-gradient(0deg, rgba(11,30,45,.9), rgba(11,30,45,0)),
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="220" viewBox="0 0 1400 220"><g fill="none" stroke="%230b1e2d" stroke-opacity=".9" stroke-width="2"><path d="M0 200h1400"/><path d="M60 200V130h34v70M98 200V98h44v102M160 200V140h36v60M220 200V80h54v120M300 200V120h44v80M370 200V60h70v140M480 200V110h40v90M540 200V95h52v105M610 200V70h62v130M700 200V120h46v80M770 200V90h56v110M860 200V130h42v70M920 200V55h80v145M1030 200V110h42v90M1090 200V95h52v105M1160 200V75h68v125M1260 200V120h48v80M1330 200V98h52v102"/></g></svg>');
          background-repeat:no-repeat;
          background-position: center bottom;
          background-size: cover;
          pointer-events:none;
        }
        .itinerary{ display:grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top:18px; }
        .day{
          border:1px solid rgba(11,30,45,.10);
          background: #f7f9fb;
          border-radius: 18px;
          padding:14px;
          box-shadow: 0 10px 24px rgba(0,0,0,.06);
        }
        .day .d{font-family:Sora, Inter, sans-serif; font-weight:800; letter-spacing:-.2px}
        .day .t{margin-top:6px; color: rgba(11,30,45,.74); font-weight:600; line-height:1.45}

        /* --------- Why section --------- */
        .why{ padding: 86px 0; }
        .why-grid{ margin-top:22px; display:grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .why-card{
          border:1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.04);
          border-radius: 20px;
          padding:16px;
          backdrop-filter: blur(12px);
          transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
          position:relative;
          overflow:hidden;
          min-height: 150px;
        }
        .why-card:hover{
          transform: translateY(-2px);
          border-color: rgba(255,47,179,.35);
          box-shadow: 0 20px 50px rgba(0,0,0,.18);
        }
        .why-card .ico{
          width:42px; height:42px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255,47,179,.20), rgba(34,211,238,.12));
          border:1px solid rgba(255,255,255,.14);
          display:flex; align-items:center; justify-content:center;
          margin-bottom:12px;
        }
        .why-card p{color: rgba(255,255,255,.76); line-height:1.5; margin-top:6px;}

        /* --------- Form section --------- */
        .formwrap{ background: #f7f9fb; color: var(--ink); padding: 86px 0; }
        .formcard{
          border-radius: 26px;
          background:#fff;
          border:1px solid rgba(11,30,45,.10);
          box-shadow: 0 24px 60px rgba(0,0,0,.12);
          overflow:hidden;
        }
        .formhead{
          padding: 22px 22px 18px;
          border-bottom:1px solid rgba(11,30,45,.08);
          background: linear-gradient(90deg, rgba(255,47,179,.08), rgba(34,211,238,.06));
        }
        .formbody{padding:22px;}
        .grid2{display:grid; grid-template-columns: 1fr 1fr; gap:12px;}
        label{display:block; font-weight:700; font-size:13px; margin: 0 0 6px;}
        input,select,textarea{
          width:100%;
          padding:12px 12px;
          border-radius: 14px;
          border:1px solid rgba(11,30,45,.18);
          background: #fff;
          font: inherit;
          outline:none;
          transition: box-shadow .18s ease, border-color .18s ease;
        }
        textarea{min-height: 110px; resize: vertical}
        input:focus,select:focus,textarea:focus{
          border-color: rgba(255,47,179,.55);
          box-shadow: 0 0 0 4px rgba(255,47,179,.14);
        }
        .help{font-size:12px; color: rgba(11,30,45,.66); margin-top:6px}
        .form-actions{display:flex; gap:12px; align-items:center; margin-top:14px; flex-wrap:wrap;}
        .success{
          margin-top:14px;
          padding:12px 14px;
          border-radius: 16px;
          border:1px solid rgba(34,211,238,.34);
          background: rgba(34,211,238,.10);
          color: rgba(11,30,45,.86);
          font-weight:700;
          display:none;
        }
        .success.show{display:block}

        /* --------- Footer CTA --------- */
        footer{
          padding: 72px 0 36px;
          background: linear-gradient(135deg, rgba(11,30,45,.65), rgba(15,44,69,.92));
          border-top:1px solid rgba(255,255,255,.10);
          position:relative;
          overflow:hidden;
        }
        footer:before{
          content:"";
          position:absolute; inset:-40%;
          background:
            radial-gradient(circle at 25% 30%, rgba(255,47,179,.18), transparent 52%),
            radial-gradient(circle at 75% 20%, rgba(34,211,238,.12), transparent 56%);
          filter: blur(20px);
          opacity:.75;
          pointer-events:none;
        }
        .foot-row{display:flex; align-items:center; justify-content:space-between; gap:18px; flex-wrap:wrap;}
        .fine{margin-top:18px; color: rgba(255,255,255,.62); font-size:12px}

        /* --------- Floating Apply button --------- */
        .float-apply{
          position:fixed;
          right: 18px;
          bottom: 18px;
          z-index: 80;
          opacity:0;
          transform: translateY(10px);
          pointer-events:none;
          transition: opacity .25s ease, transform .25s ease;
        }
        .float-apply.show{
          opacity:1;
          transform: translateY(0);
          pointer-events:auto;
        }
        .float-apply .fab{
          border:none;
          padding: 12px 14px;
          border-radius: 16px;
          background: linear-gradient(90deg, var(--mag-1), var(--mag-2));
          color:#fff;
          font-weight:800;
          box-shadow: 0 18px 54px rgba(255,47,179,.30);
          cursor:pointer;
          display:flex;
          align-items:center;
          gap:10px;
        }
        .float-apply .fab:hover{transform: translateY(-1px)}
        .float-apply .fab:focus{outline:none; box-shadow: 0 0 0 4px rgba(255,47,179,.22), 0 18px 54px rgba(255,47,179,.30)}

        /* --------- Responsive --------- */
        @media (max-width: 1000px){
          .hero-grid{grid-template-columns: 1fr; gap:18px}
          .hero-visual{min-height: 360px}
          .impact-grid{grid-template-columns: repeat(2,1fr)}
          .timeline{grid-template-columns: repeat(2,1fr)}
          .itinerary{grid-template-columns: repeat(2,1fr)}
          .why-grid{grid-template-columns: repeat(2,1fr)}
        }
        @media (max-width: 620px){
          .nav-links{display:none}
          .section{padding:72px 0}
          .grid2{grid-template-columns: 1fr}
          .impact-grid{grid-template-columns: 1fr}
          .timeline{grid-template-columns: 1fr}
          .itinerary{grid-template-columns: 1fr}
          .why-grid{grid-template-columns: 1fr}
          .program-card{flex-basis: 82vw}
        }
      `}</style>

      {/* Top nav */}
      <div className="nav">
        <div className="container">
          <div className="nav-inner">
            <div className="brand">
              <div className="logo" aria-hidden="true" />
              <div>Praktix</div>
            </div>

            <div className="nav-links" aria-label="Primary navigation">
              <a href="#programs">Programs</a>
              <a href="#how">How it works</a>
              <a href="#apply">Apply</a>
            </div>

            <div className="nav-cta">
              <a className="btn btn-ghost" href="#programs">
                Explore Programs
              </a>
              <a className="btn btn-primary" href="#apply">
                Apply Now <span className="icon i-arrow" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <header className="hero" id="top">
        <div className="grid-overlay" aria-hidden="true" />
        <div className="streak" aria-hidden="true" />

        <div className="container">
          <div className="hero-grid">
            <div className="col">
              <div className="eyebrow reveal">
                <span className="dot" aria-hidden="true" />
                <span className="small">Students &amp; Graduates • Industry Internship Programs</span>
              </div>

              <div style={{ height: 14 }} />

              <h1 className="reveal">
                Build Experience.
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, var(--mag-1), var(--mag-2), var(--mag-3))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Launch Your Career With Proof.
                </span>
              </h1>

              <div style={{ height: 12 }} />

              <p className="reveal" style={{ fontSize: 17 }}>
                Real industry internships supervised by European experts and university professors.
              </p>

              <div style={{ height: 10 }} />

              <p className="reveal">
                We bridge the gap between academic theory and real market execution through structured, project-based
                internships.
              </p>

              <div className="cta-row reveal">
                <a className="btn btn-primary" href="#apply">
                  Apply Now <span className="icon i-arrow" aria-hidden="true" />
                </a>
                <a className="btn btn-ghost" href="#programs">
                  Explore Programs
                </a>
              </div>

              <div className="badges reveal" aria-label="Key benefits">
                <span className="pill">
                  <span className="icon i-check" aria-hidden="true" />
                  Real Projects
                </span>
                <span className="pill">
                  <span className="icon i-check" aria-hidden="true" />
                  Industry Mentorship
                </span>
                <span className="pill">
                  <span className="icon i-check" aria-hidden="true" />
                  Portfolio-Ready Outcomes
                </span>
                <span className="pill">
                  <span className="icon i-check" aria-hidden="true" />
                  3–4 Month Programs
                </span>
              </div>

              <div style={{ height: 18 }} />

              <div className="reveal surface" style={{ padding: "16px 16px", borderRadius: 20 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 14,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 16,
                        border: "1px solid rgba(255,255,255,.14)",
                        background: "linear-gradient(135deg, rgba(255,47,179,.20), rgba(34,211,238,.12))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span className="icon i-spark" aria-hidden="true" />
                    </div>

                    <div>
                      <div style={{ fontWeight: 800, letterSpacing: "-.2px" }}>Outcome-driven, verified.</div>
                      <div className="small muted">
                        Structured supervision • measurable deliverables • documented evaluation
                      </div>
                    </div>
                  </div>

                  <a className="btn btn-ghost" href="#how" style={{ padding: "10px 12px", borderRadius: 14 }}>
                    See the process
                  </a>
                </div>
              </div>
            </div>

            <div className="col">
              <div
                className="hero-visual reveal"
                id="heroVisual"
                ref={heroVisualRef}
                aria-label="Concept image: professionals collaborating"
              >
                <img
                  alt="Young professionals collaborating in a modern workspace"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                />
                <div className="float-ui" aria-hidden="true">
                  <div className="chip one">
                    <span className="icon i-file" />
                    <div>
                      <div>Portfolio Output</div>
                      <div className="mini">Verified deliverables</div>
                    </div>
                    <div className="bar" />
                  </div>
                  <div className="chip two">
                    <span className="icon i-brief" />
                    <div>
                      <div>Mentor Reviews</div>
                      <div className="mini">European experts</div>
                    </div>
                    <div className="bar" />
                  </div>
                  <div className="chip three">
                    <span className="icon i-globe" />
                    <div>
                      <div>Global Positioning</div>
                      <div className="mini">Career-ready proof</div>
                    </div>
                    <div className="bar" />
                  </div>
                </div>
              </div>

              <div style={{ height: 12 }} />

              <div className="reveal" style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
                <span className="pill" style={{ opacity: 0.9 }}>
                  <span className="icon i-check" aria-hidden="true" />
                  4 intakes / year
                </span>
                <span className="pill" style={{ opacity: 0.9 }}>
                  <span className="icon i-check" aria-hidden="true" />
                  Production-level work
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PROBLEM */}
      <section className="problem" id="problem">
        <div className="container">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col reveal">
              <h2>The Gap Between Study and Employment</h2>
              <div style={{ height: 12 }} />
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(6,18,27,.78)" }}>
                <strong>Universities teach knowledge.</strong>
                <br />
                <strong>The market demands capability.</strong>
                <br />
                Our internships convert academic knowledge into measurable professional execution.
              </p>

              <div style={{ height: 18 }} />

              <div className="surface white" style={{ padding: 16, borderRadius: 22 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 16,
                      background: "rgba(255,47,179,.10)",
                      border: "1px solid rgba(255,47,179,.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="icon i-bolt" style={{ color: "#0b1e2d" }} aria-hidden="true" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, letterSpacing: "-.2px" }}>The conversion is the product.</div>
                    <div style={{ marginTop: 6, color: "rgba(6,18,27,.70)", lineHeight: 1.6 }}>
                      You don’t just “learn”—you produce. You finish with deliverables, evaluation reports, and portfolio
                      evidence.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col reveal">
              <div className="split-illus" aria-label="Illustration: classroom to office">
                <div className="half left">
                  <div className="scene">
                    <div className="scene-title">
                      <span className="icon i-hat" style={{ color: "#0b1e2d" }} aria-hidden="true" />
                      University <span>(theory)</span>
                    </div>
                    <div className="line w1" />
                    <div className="line w2" />
                    <div className="line w3" />
                  </div>
                </div>
                <div className="half right">
                  <div className="scene">
                    <div className="scene-title">
                      <span className="icon i-brief" style={{ color: "#0b1e2d" }} aria-hidden="true" />
                      Company <span>(execution)</span>
                    </div>
                    <div className="line w1" />
                    <div className="line w2" />
                    <div className="line w3" />
                  </div>
                </div>
                <div className="divider" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="impact" id="impact">
        <div className="container">
          <div className="row" style={{ alignItems: "flex-end", gap: 24 }}>
            <div className="col reveal">
              <h2>Real performance. Real outcomes.</h2>
              <div style={{ height: 10 }} />
              <p className="muted" style={{ maxWidth: 560, lineHeight: 1.7 }}>
                Verified impact metrics designed to reflect real market readiness — not just course completion.
              </p>
            </div>

            <div className="col reveal" style={{ display: "flex", justifyContent: "flex-end" }}>
              <div className="eyebrow">
                <span className="dot" aria-hidden="true" />
                <span className="small">Scroll to animate counters</span>
              </div>
            </div>
          </div>

          <div className="impact-grid reveal" id="impactCounters" ref={impactCountersRef}>
            <div className="stat">
              <div className="num" data-count="1200" data-suffix="+">
                0
              </div>
              <div className="lbl">Interns Trained</div>
            </div>
            <div className="stat">
              <div className="num" data-count="87" data-suffix="%">
                0
              </div>
              <div className="lbl">Built Job-Ready Portfolios</div>
            </div>
            <div className="stat">
              <div className="num" data-count="72" data-suffix="%">
                0
              </div>
              <div className="lbl">Secured Opportunities in 6 Months</div>
            </div>
            <div className="stat">
              <div className="num" data-count="40" data-suffix="+">
                0
              </div>
              <div className="lbl">European Mentors &amp; Professors</div>
            </div>
          </div>

          <div className="reveal" style={{ marginTop: 14, color: "rgba(255,255,255,.68)", fontWeight: 600 }}>
            Real performance. Real outcomes. Verified impact.
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="container">
          <div className="row" style={{ alignItems: "flex-end", gap: 24 }}>
            <div className="col reveal">
              <h2>How our internships work</h2>
              <div style={{ height: 10 }} />
              <p className="muted" style={{ maxWidth: 620, lineHeight: 1.7 }}>
                A structured process that turns your effort into measurable output and a portfolio-ready finish.
              </p>
            </div>

            <div className="col reveal" style={{ display: "flex", justifyContent: "flex-end" }}>
              <a className="btn btn-ghost" href="#programs">
                Browse programs
              </a>
            </div>
          </div>

          <div className="timeline reveal">
            <div className="step">
              <div className="badge">
                <span className="icon i-spark" aria-hidden="true" />
              </div>
              <div className="title">1) Apply &amp; Assessment</div>
              <div className="desc">We evaluate your goals and fit you to the right track.</div>
              <div className="connector" aria-hidden="true" />
            </div>

            <div className="step">
              <div className="badge">
                <span className="icon i-brief" aria-hidden="true" />
              </div>
              <div className="title">2) Track Placement</div>
              <div className="desc">You’re placed into a structured cohort with supervision.</div>
              <div className="connector" aria-hidden="true" />
            </div>

            <div className="step">
              <div className="badge">
                <span className="icon i-bolt" aria-hidden="true" />
              </div>
              <div className="title">3) Real Project Execution</div>
              <div className="desc">Production-level work with milestones and feedback loops.</div>
              <div className="connector" aria-hidden="true" />
            </div>

            <div className="step">
              <div className="badge">
                <span className="icon i-file" aria-hidden="true" />
              </div>
              <div className="title">4) Final Evaluation &amp; Portfolio</div>
              <div className="desc">You finish with deliverables, reports, and portfolio delivery.</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="programs" id="programs">
        <div className="container">
          <div className="reveal">
            <h2>Choose a track. Build proof.</h2>
            <div style={{ height: 10 }} />
            <p className="muted" style={{ maxWidth: 680, lineHeight: 1.7 }}>
              Select a category to explore swipeable program cards with deliverables and typical career outcomes.
            </p>
          </div>

          <div className="tabs reveal" role="tablist" aria-label="Program categories">
            <div
              className={`tab ${activeCat === "eng" ? "active" : ""}`}
              role="tab"
              aria-selected={activeCat === "eng" ? "true" : "false"}
              onClick={() => setActiveCat("eng")}
            >
              Engineering &amp; Technology
            </div>
            <div
              className={`tab ${activeCat === "digital" ? "active" : ""}`}
              role="tab"
              aria-selected={activeCat === "digital" ? "true" : "false"}
              onClick={() => setActiveCat("digital")}
            >
              Digital &amp; Innovation
            </div>
            <div
              className={`tab ${activeCat === "biz" ? "active" : ""}`}
              role="tab"
              aria-selected={activeCat === "biz" ? "true" : "false"}
              onClick={() => setActiveCat("biz")}
            >
              Business &amp; Strategy
            </div>
            <div
              className={`tab ${activeCat === "fin" ? "active" : ""}`}
              role="tab"
              aria-selected={activeCat === "fin" ? "true" : "false"}
              onClick={() => setActiveCat("fin")}
            >
              Finance &amp; Economics
            </div>
          </div>

          <div className="slider-shell reveal" aria-label="Program slider">
            <div className="slider-controls" aria-hidden="false">
              <button
                className="iconbtn"
                type="button"
                aria-label="Scroll programs left"
                onClick={() => sliderRef.current?.scrollBy({ left: -380, behavior: "smooth" })}
              >
                <span className="icon i-arrow" style={{ transform: "rotate(180deg)" }} />
              </button>
              <button
                className="iconbtn"
                type="button"
                aria-label="Scroll programs right"
                onClick={() => sliderRef.current?.scrollBy({ left: 380, behavior: "smooth" })}
              >
                <span className="icon i-arrow" />
              </button>
            </div>

            <div className={`slider ${"fadeSwap"}`} id="programSlider" ref={sliderRef}>
              {activePrograms.map((p) => {
                const tags = [p.level, ...p.meta.slice(0, 2)];
                return (
                  <article className="program-card" key={p.title}>
                    <div className="glow-edge" aria-hidden="true" />
                    <div className="pc-img">
                      <img alt={`${p.title} program cover`} src={p.img} />
                    </div>

                    <div className="pc-body">
                      <div className="pc-title">{p.title}</div>
                      <div className="pc-sub">
                        {p.rating} • {p.meta.join(" · ")}
                      </div>

                      <div className="pc-meta">
                        {tags.map((t) => (
                          <span className="tag" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="pc-line">
                        <div className="kv">
                          <div className="k">Deliverable</div>
                          <div className="v">{p.deliverable}</div>
                        </div>
                        <div style={{ height: 10 }} />
                        <div className="kv">
                          <div className="k">Outcomes</div>
                          <div className="v">{p.outcomes}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pc-actions">
                      <button className="btn btn-ghost btn-sm" type="button" onClick={() => scrollToApply(p.title)}>
                        View Details
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* GERMANY */}
      <section className="germany" id="germany">
        <div className="skyline" aria-hidden="true" />
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: 28 }}>
            <div className="col reveal">
              <h2>Outstanding teams get invited to Germany</h2>
              <div style={{ height: 10 }} />
              <p style={{ color: "rgba(6,18,27,.74)", lineHeight: 1.7, fontSize: 16, maxWidth: 620 }}>
                Top-performing teams receive an exclusive 4-day professional visit: presentations, workshops, partner
                tours, and Munich cultural experience.
              </p>
              <div style={{ height: 10 }} />
              <div style={{ fontWeight: 800, color: "rgba(6,18,27,.80)" }}>Exposure. Network. Global positioning.</div>
              <div style={{ height: 16 }} />
              <a className="btn btn-light" href="#apply">
                Learn About International Opportunities <span className="icon i-arrow" aria-hidden="true" />
              </a>
            </div>

            <div className="col reveal">
              <div className="itinerary">
                <div className="day">
                  <div className="d">Day 1</div>
                  <div className="t">Final Project Presentation</div>
                </div>
                <div className="day">
                  <div className="d">Day 2</div>
                  <div className="t">Advanced Industry Workshop</div>
                </div>
                <div className="day">
                  <div className="d">Day 3</div>
                  <div className="t">Partner Company Tours</div>
                </div>
                <div className="day">
                  <div className="d">Day 4</div>
                  <div className="t">Munich Cultural Experience</div>
                </div>
              </div>

              <div style={{ height: 12 }} />

              <div className="surface light" style={{ padding: 16, borderRadius: 22 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 16,
                      background: "rgba(34,211,238,.14)",
                      border: "1px solid rgba(34,211,238,.22)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="icon i-globe" style={{ color: "#0b1e2d" }} aria-hidden="true" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, letterSpacing: "-.2px" }}>International credibility boost</div>
                    <div style={{ marginTop: 6, color: "rgba(6,18,27,.70)", lineHeight: 1.6 }}>
                      A premium experience designed to expand your network and position you globally.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="why" id="why">
        <div className="container">
          <div className="reveal">
            <h2>Why Praktix is different</h2>
            <div style={{ height: 10 }} />
            <p className="muted" style={{ maxWidth: 700, lineHeight: 1.7 }}>
              Built for outcomes: supervision, real projects, measurable output, and professional evaluation.
            </p>
          </div>

          <div className="why-grid reveal">
            <div className="why-card">
              <div className="ico">
                <span className="icon i-hat" aria-hidden="true" />
              </div>
              <h3>Structured Supervision</h3>
              <p>Industry experts + European professors guide progress and standards.</p>
            </div>
            <div className="why-card">
              <div className="ico">
                <span className="icon i-brief" aria-hidden="true" />
              </div>
              <h3>Real Production-Level Projects</h3>
              <p>No simulations. No fake assignments — real execution and deliverables.</p>
            </div>
            <div className="why-card">
              <div className="ico">
                <span className="icon i-file" aria-hidden="true" />
              </div>
              <h3>Measurable Output</h3>
              <p>Portfolio-ready outcomes that demonstrate capability.</p>
            </div>
            <div className="why-card">
              <div className="ico">
                <span className="icon i-check" aria-hidden="true" />
              </div>
              <h3>Professional Evaluation</h3>
              <p>Documented performance reports that prove results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* APPLY FORM */}
      <section className="formwrap" id="apply" ref={applySectionRef}>
        <div className="container">
          <div className="row" style={{ gap: 24, alignItems: "flex-start" }}>
            <div className="col reveal">
              <h2>Apply for an Industry Internship</h2>
              <div style={{ height: 10 }} />
              <p style={{ color: "rgba(6,18,27,.74)", lineHeight: 1.7, fontSize: 16, maxWidth: 560 }}>
                Start building real experience today. Submit your details and we’ll send an automatic confirmation email.
              </p>

              <div style={{ height: 18 }} />

              <div className="surface white" style={{ padding: 16, borderRadius: 22 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 16,
                      background: "rgba(255,47,179,.10)",
                      border: "1px solid rgba(255,47,179,.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="icon i-spark" style={{ color: "#0b1e2d" }} aria-hidden="true" />
                  </div>

                  <div>
                    <div style={{ fontWeight: 900, letterSpacing: "-.2px" }}>What happens next?</div>
                    <div style={{ marginTop: 6, color: "rgba(6,18,27,.70)", lineHeight: 1.6 }}>
                      We review your profile, confirm track availability, then share intake timelines and next steps.
                    </div>
                    <div className="help">Tip: add a LinkedIn profile for faster review.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col reveal">
              <div className="formcard">
                <div className="formhead">
                  <div
                    style={{
                      fontFamily: "Sora, Inter, sans-serif",
                      fontWeight: 900,
                      letterSpacing: "-.2px",
                      fontSize: 18,
                    }}
                  >
                    Internship Application
                  </div>
                  <div className="help">Fields marked * are required.</div>
                </div>

                <div className="formbody">
                  <form
                    id="appForm"
                    ref={formRef}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSuccessVisible(true);

                      // Reset (match original behavior)
                      if (formRef.current) formRef.current.reset();
                      if (statusRef.current) statusRef.current.value = "student";
                      syncYear();

                      window.setTimeout(() => setSuccessVisible(false), 5200);
                    }}
                  >
                    <div className="grid2">
                      <div>
                        <label htmlFor="fullName">Full Name *</label>
                        <input id="fullName" name="fullName" required placeholder="Your full name" />
                      </div>
                      <div>
                        <label htmlFor="email">Email Address *</label>
                        <input id="email" name="email" type="email" required placeholder="name@email.com" />
                      </div>
                    </div>

                    <div style={{ height: 12 }} />

                    <div className="grid2">
                      <div>
                        <label htmlFor="phone">Phone Number</label>
                        <input id="phone" name="phone" placeholder="+962 …" />
                      </div>
                      <div>
                        <label htmlFor="country">Country</label>
                        <input id="country" name="country" placeholder="Jordan" />
                      </div>
                    </div>

                    <div style={{ height: 12 }} />

                    <div className="grid2">
                      <div>
                        <label htmlFor="status">Are You?</label>
                        <select
                          id="status"
                          name="status"
                          ref={statusRef}
                          onChange={() => syncYear()}
                          defaultValue="student"
                        >
                          <option value="student">University Student</option>
                          <option value="graduate">Graduate</option>
                        </select>
                      </div>

                      <div id="yearWrap" ref={yearWrapRef}>
                        <label htmlFor="year">Current Academic Year</label>
                        <select id="year" name="year" defaultValue="1st">
                          <option>1st</option>
                          <option>2nd</option>
                          <option>3rd</option>
                          <option>Final Year</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ height: 12 }} />

                    <div>
                      <label htmlFor="study">Field of Study / Specialization</label>
                      <input id="study" name="study" placeholder="Computer Science, Business, …" />
                    </div>

                    <div style={{ height: 12 }} />

                    <div className="grid2">
                      <div>
                        <label htmlFor="cat">Preferred Internship Category</label>
                        <select id="cat" name="cat" ref={catSelectRef} defaultValue="Engineering & Technology">
                          <option>Engineering & Technology</option>
                          <option>Digital & Innovation</option>
                          <option>Business & Strategy</option>
                          <option>Finance & Economics</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="timeline">Preferred Start Timeline</label>
                        <select id="timeline" name="timeline" defaultValue="Immediately">
                          <option>Immediately</option>
                          <option>Within 1 Month</option>
                          <option>Within 2–3 Months</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ height: 12 }} />

                    <div className="grid2">
                      <div>
                        <label htmlFor="cohort">Preferred Cohort Intake</label>
                        <select id="cohort" name="cohort" defaultValue="Q1">
                          <option>Q1</option>
                          <option>Q2</option>
                          <option>Q3</option>
                          <option>Q4</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="linkedin">LinkedIn Profile (Optional)</label>
                        <input id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/…" />
                      </div>
                    </div>

                    <div style={{ height: 12 }} />

                    <div>
                      <label htmlFor="goal">Your Career Goal</label>
                      <textarea
                        id="goal"
                        name="goal"
                        ref={goalRef}
                        placeholder="Tell us what role you want to grow into, and what you want to prove."
                      />
                    </div>

                    <div style={{ height: 12 }} />

                    <div>
                      <label htmlFor="cv">Upload CV (Optional)</label>
                      <input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" />
                      <div className="help">PDF preferred.</div>
                    </div>

                    <div className="form-actions">
                      <button className="btn btn-primary" type="submit" style={{ minWidth: 220 }}>
                        Submit Application <span className="icon i-arrow" aria-hidden="true" />
                      </button>
                      <div className="help">You’ll see a success message and receive a confirmation email.</div>
                    </div>

                    <div className={`success ${successVisible ? "show" : ""}`} id="successMsg">
                      ✅ Application submitted successfully. Check your inbox for the confirmation email.
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer id="final">
        <div className="container">
          <div className="foot-row">
            <div className="reveal">
              <div className="eyebrow">
                <span className="dot" aria-hidden="true" />
                <span className="small">Ready when you are</span>
              </div>

              <div style={{ height: 12 }} />

              <h2 style={{ margin: 0 }}>Ready to Build Real Capability?</h2>

              <div style={{ height: 10 }} />

              <div className="muted" style={{ maxWidth: 640, lineHeight: 1.7 }}>
                Start your internship journey with real projects, mentorship, and portfolio-ready outcomes.
              </div>
            </div>

            <div className="reveal" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn btn-ghost" href="#programs">
                Explore Programs
              </a>
              <a className="btn btn-primary" href="#apply">
                Start Your Internship Journey
              </a>
            </div>
          </div>

          <div className="fine">© Praktix • Premium European positioning • Outcome-driven internships</div>
        </div>
      </footer>

      {/* Floating Apply button */}
      <div className={`float-apply ${fabVisible ? "show" : ""}`} id="floatApply" ref={floatApplyRef}>
        <button
          className="fab"
          type="button"
          id="fabBtn"
          aria-label="Apply now (jump to application form)"
          onClick={() => applySectionRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          Apply Now <span className="icon i-arrow" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
