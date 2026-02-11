import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";

const COLORS = {
  accent: "#C51F5D",
  primary: "#243447",
  deep: "#141D26",
  sand: "#E2E2D2",
};

const NAV = [
  {
    id: "programs",
    label: "Programs",
    description: "Pick the best path for your goals",
    align: "start",
    columns: [
      {
        title: "For Individuals",
        items: [
          { label: "Industry Internships", href: "/programs/internships", desc: "Real projects inside companies" },
          { label: "Bootcamps & Career Tracks", href: "/programs/bootcamps", desc: "Intensive job-ready training" },
          { label: "Courses & Workshops", href: "/programs/courses-workshops", desc: "Practical skills with experts" },
        ],
      },
      {
        title: "For Teams",
        items: [
          { label: "Custom Training", href: "/programs/custom-training", desc: "Tailored programs for organizations" },
          { label: "Co-Hosted Programs", href: "/programs/co-hosted", desc: "Build a program with partners" },
          { label: "1:1 Career Mentorship", href: "/programs/mentorship", desc: "Guided sessions for your next step" },
        ],
      },
    ],
    promo: {
      eyebrow: "Start fast",
      title: "Find your best-fit program",
      text: "Explore what works for you in minutes.",
      href: "/programs",
      cta: "Explore Programs",
    },
  },
  {
    id: "for-you",
    label: "For You",
    description: "Built for different audiences and needs",
    align: "start",
    columns: [
      {
        title: "People",
        items: [
          { label: "Students & Graduates", href: "/for-you/students", desc: "Get experience and confidence" },
          { label: "Universities & Educators", href: "/for-you/universities", desc: "Bridge education with industry" },
        ],
      },
      {
        title: "Organizations",
        items: [
          { label: "Companies & Organizations", href: "/for-you/companies", desc: "Engage talent and hiring outcomes" },
          { label: "Public Sector & NGOs", href: "/for-you/public-ngo", desc: "Impact programs with measurable results" },
        ],
      },
    ],
    promo: {
      eyebrow: "Made for you",
      title: "Choose your audience",
      text: "Clear pages per audience—no clutter.",
      href: "/for-you",
      cta: "View Audiences",
    },
  },
  {
    id: "outcomes",
    label: "Outcomes",
    description: "What you get after the experience",
    align: "start",
    columns: [
      {
        title: "The Experience",
        items: [
          { label: "Real Projects", href: "/outcomes/real-projects", desc: "Work on real-world challenges" },
          { label: "Global Exposure", href: "/outcomes/global-exposure", desc: "Cross-border collaboration & networks" },
        ],
      },
      {
        title: "Proof & Results",
        items: [
          { label: "Career Outcomes", href: "/outcomes/career-outcomes", desc: "Outcomes aligned to hiring needs" },
          { label: "Success Stories & Testimonials", href: "/outcomes/stories", desc: "Stories and feedback from the community" },
        ],
      },
    ],
    promo: {
      eyebrow: "See the impact",
      title: "Stories that prove it",
      text: "Real examples of growth and results.",
      href: "/outcomes/stories",
      cta: "Read Stories",
    },
  },
  {
    id: "community",
    label: "Community & Partnerships",
    description: "Join as an expert, partner, or collaborator",
    align: "end",
    columns: [
      {
        title: "Community",
        items: [
          { label: "Expert Network (Volunteer)", href: "/community/experts", desc: "Volunteer or join the expert network" },
          { label: "Educational & Career Events", href: "/community/events", desc: "Events, meetups, and opportunities" },
        ],
      },
      {
        title: "Partnerships",
        items: [
          { label: "Hiring Initiatives", href: "/community/hiring", desc: "Connect companies with talent" },
          { label: "Partnership Hub", href: "/partnerships", desc: "Universities, Industry, Alliances, Affiliate, Co-Host" },
        ],
      },
    ],
    promo: {
      eyebrow: "Partner smart",
      title: "Become a partner",
      text: "University, industry, alliances, or co-hosted programs.",
      href: "/partnerships",
      cta: "Explore Partnerships",
    },
  },
  {
    id: "about",
    label: "About",
    description: "Learn more about PraktikaX",
    align: "end",
    columns: [
      {
        title: "PraktikaX",
        items: [
          { label: "Mission & Vision", href: "/about/mission", desc: "Why we exist and what we build" },
          { label: "Our Model (How We Work)", href: "/about/model", desc: "From design to real outcomes" },
          { label: "Team & Experts", href: "/about/team", desc: "The people behind the experience" },
        ],
      },
      {
        title: "Connect",
        items: [
          { label: "European Network", href: "/about/european-network", desc: "Our footprint across Europe" },
          { label: "Contact", href: "/contact", desc: "Reach out and we’ll respond quickly" },
        ],
      },
    ],
    promo: {
      eyebrow: "Less noise",
      title: "Fewer pages, more clarity",
      text: "A structure that gets users where they need—fast.",
      href: "/about",
      cta: "Learn More",
    },
  },
];

function Chevron({ open }) {
  return (
    <svg className={`px-chev ${open ? "open" : ""}`} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm6.7-1.3L21 20.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuIcon({ open }) {
  return open ? (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar({ dir = "ltr" }) {
  const [openId, setOpenId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 920px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setOpenId(null);
        setMobileOpen(false);
      }
    }
    function onClick(e) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) {
        setOpenId(null);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  function openMenu(id) {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenId(id);
  }

  function scheduleClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenId(null), 140);
  }

  function toggleMobile() {
    setMobileOpen((v) => !v);
    setOpenId(null);
  }

  function onNavLink() {
    setOpenId(null);
    setMobileOpen(false);
  }

  return (
    <header
      className="px-header"
      style={{
        ["--px-accent"]: COLORS.accent,
        ["--px-primary"]: COLORS.primary,
        ["--px-deep"]: COLORS.deep,
        ["--px-sand"]: COLORS.sand,
      }}
      dir={dir}
    >
      <nav className="px-nav" ref={navRef} aria-label="Primary">
        <div className="px-container">
          {/* LEFT: Brand */}
          <a className="px-brand" href="/" onClick={onNavLink} aria-label="PraktikaX Home">
            <span className="px-brandMark">Praktika</span>
            <span className="px-brandX">X</span>
          </a>

          {/* CENTER: Desktop nav (perfectly centered) */}
          <div className="px-center" onPointerLeave={() => !isMobile && scheduleClose()}>
            {NAV.map((group) => {
              const open = openId === group.id;

              return (
                <div
                  key={group.id}
                  className="px-item"
                  data-align={group.align || "start"}
                  onPointerEnter={() => !isMobile && openMenu(group.id)}
                >
                  <button
                    className={`px-trigger ${open ? "active" : ""}`}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : group.id)}
                    type="button"
                  >
                    <span>{group.label}</span>
                    <Chevron open={open} />
                  </button>

                  {open && (
                    <div
                      className="px-mega"
                      role="menu"
                      aria-label={group.label}
                      onPointerEnter={() => !isMobile && openMenu(group.id)}
                      onPointerLeave={() => !isMobile && scheduleClose()}
                    >
                      <div className="px-megaTop">
                        <div className="px-megaTitle">{group.label}</div>
                        <div className="px-megaDesc">{group.description}</div>
                      </div>

                      <div className="px-megaGrid">
                        <div className="px-cols">
                          {group.columns.map((col) => (
                            <div key={col.title} className="px-col">
                              <div className="px-colTitle">{col.title}</div>
                              <ul className="px-colList">
                                {col.items.map((it) => (
                                  <li key={it.href}>
                                    <a className="px-linkCard" href={it.href} onClick={onNavLink}>
                                      <div className="px-linkLabel">{it.label}</div>
                                      <div className="px-linkDesc">{it.desc}</div>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        <a className="px-promo" href={group.promo.href} onClick={onNavLink}>
                          <div className="px-promoEyebrow">{group.promo.eyebrow}</div>
                          <div className="px-promoTitle">{group.promo.title}</div>
                          <div className="px-promoText">{group.promo.text}</div>
                          <div className="px-promoCta">{group.promo.cta} →</div>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT: Actions pinned to the far right */}
          <div className="px-right">
            <div className="px-actions">
              <a className="px-iconBtn" href="/search" aria-label="Search">
                <SearchIcon />
              </a>

              <a className="px-cta" href="/portal" onClick={onNavLink}>
                Login / Portal
              </a>
            </div>

            <button className="px-mobileBtn" type="button" aria-label="Toggle menu" onClick={toggleMobile}>
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {mobileOpen && (
          <div className="px-mobilePanel">
            <div className="px-mobileInner">
              <div className="px-mobileActions">
                <a className="px-cta mobile" href="/portal" onClick={onNavLink}>
                  Login / Portal
                </a>
                <a className="px-iconBtn mobile" href="/search" aria-label="Search">
                  <SearchIcon />
                </a>
              </div>

              <div className="px-accordion">
                {NAV.map((group) => {
                  const open = openId === group.id;
                  return (
                    <div key={group.id} className="px-accItem">
                      <button
                        className={`px-accTrigger ${open ? "active" : ""}`}
                        type="button"
                        onClick={() => setOpenId(open ? null : group.id)}
                      >
                        <span>{group.label}</span>
                        <Chevron open={open} />
                      </button>

                      {open && (
                        <div className="px-accBody">
                          {group.columns.map((col) => (
                            <div key={col.title} className="px-accCol">
                              <div className="px-colTitle">{col.title}</div>
                              <ul className="px-accList">
                                {col.items.map((it) => (
                                  <li key={it.href}>
                                    <a className="px-accLink" href={it.href} onClick={onNavLink}>
                                      {it.label}
                                      <span className="px-accHint">{it.desc}</span>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          <a className="px-accPromo" href={group.promo.href} onClick={onNavLink}>
                            <span className="px-accPromoTitle">{group.promo.title}</span>
                            <span className="px-accPromoCta">{group.promo.cta} →</span>
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="px-mobileFooter">
                <a className="px-mutedLink" href="/contact" onClick={onNavLink}>
                  Contact
                </a>
                <span className="px-dot">•</span>
                <a className="px-mutedLink" href="/about" onClick={onNavLink}>
                  About PraktikaX
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
