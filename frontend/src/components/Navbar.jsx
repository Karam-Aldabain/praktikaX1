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
    id: "individuals",
    label: "For Individuals",
    description: "Designed for learners, graduates, and professionals seeking structured career growth",
    align: "start",
    columns: [
      {
        title: "Learner Segments",
        items: [
          {
            label: "Students & Graduates",
            href: "/for-individuals/students-graduates",
            desc: "Industry-integrated internships, career tracks, and portfolio-based learning experiences",
          },
          {
            label: "Women in Tech",
            href: "/for-individuals/women-in-tech",
            desc: "Targeted programs supporting female talent in technology, AI, and innovation careers",
          },
          {
            label: "AI for Real-World Careers",
            href: "/for-individuals/ai-across-industries",
            desc: "Practical AI applications across business, healthcare, engineering, data, marketing, and beyond",
          },
        ],
      },
      {
        title: "Growth Paths",
        items: [
          {
            label: "Career Tracks & Bootcamps",
            href: "/for-individuals/career-tracks-bootcamps",
            desc: "Structured learning pathways aligned with market demand",
          },
          {
            label: "1-to-1 Career Mentorship",
            href: "/for-individuals/mentorship",
            desc: "Direct access to industry experts and university professors",
          },
          {
            label: "Trend Lab",
            href: "/for-individuals/trend-lab",
            desc: "Emerging tools, market shifts, and high-demand skill insights",
          },
        ],
      },
    ],
    promo: {
      eyebrow: "Individuals",
      title: "Build your career path",
      text: "Modern programs focused on practical growth and measurable outcomes.",
      href: "/for-individuals",
      cta: "Explore Individual Paths",
    },
  },
  {
    id: "organizations",
    label: "For Organizations",
    description: "Built for institutions shaping the workforce of tomorrow",
    align: "start",
    columns: [
      {
        title: "Institution Types",
        items: [
          {
            label: "Universities & Educators",
            href: "/for-organizations/universities-educators",
            desc: "Co-hosted industry programs integrated into academic structures",
          },
          {
            label: "Companies & Corporations",
            href: "/for-organizations/companies-corporations",
            desc: "Talent pipeline development, co-designed internships, workforce upskilling",
          },
          {
            label: "Governments & Public Sector",
            href: "/for-organizations/governments-public-sector",
            desc: "National workforce readiness initiatives aligned with economic strategy",
          },
          {
            label: "Schools & Early Talent Programs",
            href: "/for-organizations/schools-early-talent-programs",
            desc: "Career exposure programs for high school students and children of employees",
          },
        ],
      },
      {
        title: "Strategic Solutions",
        items: [
          {
            label: "AI for Organizations",
            href: "/for-organizations/ai",
            desc: "Applied AI frameworks tailored to industry sectors and institutional needs",
          },
          {
            label: "Partnerships",
            href: "/for-organizations/partnerships",
            desc: "Strategic alliances with universities, corporations, and innovation ecosystems",
          },
          {
            label: "Innovation & Workforce Tools",
            href: "/for-organizations/innovation-workforce-tools",
            desc: "Market-aligned frameworks and future-ready talent models",
          },
        ],
      },
    ],
    promo: {
      eyebrow: "Organizations",
      title: "Scale workforce impact",
      text: "Programs and frameworks built for institutional and talent growth.",
      href: "/for-organizations",
      cta: "Explore Organization Solutions",
    },
  },
  {
    id: "insights",
    label: "Insights",
    description: "Thought leadership, value-driven content, and industry intelligence",
    align: "end",
    columns: [
      {
        title: "Thought Leadership",
        items: [
          {
            label: "Value",
            href: "/insights/value",
            desc: "Real impact stories, measurable outcomes, and professional transformation journeys",
          },
          {
            label: "Real Projects",
            href: "/insights/real-projects",
            desc: "Case-based learning examples and industry collaborations",
          },
          {
            label: "Global Exposure",
            href: "/insights/global-exposure",
            desc: "International collaborations and cross-border project visibility",
          },
        ],
      },
      {
        title: "Results & Proof",
        items: [
          {
            label: "Career Outcomes",
            href: "/insights/career-outcomes",
            desc: "Data-driven results: placements, promotions, and professional growth",
          },
          {
            label: "Success Stories",
            href: "/insights/success-stories",
            desc: "Graduate journeys from learning to leadership",
          },
          {
            label: "Feedback & Testimonials",
            href: "/insights/feedback-testimonials",
            desc: "Voices from institutions, mentors, and professionals",
          },
        ],
      },
    ],
    promo: {
      eyebrow: "Insights",
      title: "Track real impact",
      text: "Leadership content, project signals, and measurable career results.",
      href: "/insights",
      cta: "Explore Insights",
    },
  },
  {
    id: "about",
    label: "About",
    description: "Who we are. How we work. Why it matters",
    align: "end",
    columns: [
      {
        title: "Core",
        items: [
          {
            label: "Our Mission & Vision",
            href: "/about/mission-vision",
            desc: "Building structured systems that close the education-to-industry gap",
          },
          {
            label: "Our Model (How We Work)",
            href: "/about/model",
            desc: "A system-based approach combining projects, mentorship, and measurable outcomes",
          },
          {
            label: "Our European Network",
            href: "/about/european-network",
            desc: "Academic and industry partnerships aligned with European education standards",
          },
          {
            label: "Ecosystem",
            href: "/about/ecosystem",
            desc: "A connected environment integrating experts, institutions, and industry",
          },
        ],
      },
      {
        title: "Under Ecosystem",
        items: [
          {
            label: "Global Expert Network",
            href: "/about/ecosystem/global-expert-network",
            desc: "Cross-sector mentors and specialists",
          },
          {
            label: "Industry Engagements",
            href: "/about/ecosystem/industry-engagements",
            desc: "Collaboration with companies and sector partners",
          },
          {
            label: "Educational & Career Events",
            href: "/about/ecosystem/events",
            desc: "Programs and events connecting learning to opportunity",
          },
          {
            label: "Hiring Initiatives",
            href: "/about/ecosystem/hiring-initiatives",
            desc: "Structured pathways from learning to employment",
          },
          {
            label: "Become an Expert",
            href: "/about/ecosystem/become-an-expert",
            desc: "Join the network as a mentor or contributor",
          },
        ],
      },
    ],
    promo: {
      eyebrow: "About",
      title: "Understand the model",
      text: "See the system and network behind measurable outcomes.",
      href: "/about",
      cta: "Explore About",
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

function ThemeIcon({ theme }) {
  return theme === "dark" ? (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4l1.4-1.4m10-10 1.4-1.4M12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
  const [theme, setTheme] = useState("light");
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
    if (typeof window === "undefined") return;
    const getTheme = () => {
      const saved = window.localStorage.getItem("px_theme");
      if (saved === "light" || saved === "dark") return saved;
      const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
      return mq?.matches ? "dark" : "light";
    };

    const syncTheme = () => setTheme(getTheme());
    syncTheme();

    window.addEventListener("storage", syncTheme);
    window.addEventListener("px-theme-change", syncTheme);
    return () => {
      window.removeEventListener("storage", syncTheme);
      window.removeEventListener("px-theme-change", syncTheme);
    };
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

  function toggleTheme() {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      window.localStorage.setItem("px_theme", next);
      window.dispatchEvent(new Event("px-theme-change"));
      return next;
    });
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
            <img className="px-brandLogo" src="/logo-praktikax.png" alt="PraktikaX logo" />
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
              <button
                className="px-themeBtn"
                type="button"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                aria-pressed={theme === "dark"}
              >
                <ThemeIcon theme={theme} />
                <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
              </button>

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
              <button
                className="px-themeBtn mobile"
                type="button"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                aria-pressed={theme === "dark"}
              >
                <ThemeIcon theme={theme} />
                <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
              </button>

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

