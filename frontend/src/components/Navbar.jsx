import React, { useEffect, useRef, useState } from "react";
import {
  Backpack,
  BadgeCheck,
  BarChart3,
  Bot,
  Briefcase,
  Building2,
  CalendarDays,
  ChevronRight as ChevronRightIcon,
  Cpu,
  FlaskConical,
  Factory,
  Globe,
  GraduationCap,
  Handshake,
  Landmark,
  Map,
  MessageSquareQuote,
  Network,
  Route,
  School,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  UserPlus,
  UserRound,
  Users,
  UsersRound,
  Workflow,
  Wrench,
} from "lucide-react";
import { useLocalTheme } from "../hooks/use-local-theme";
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
            children: [
              { label: "University Partnerships", href: "/for-organizations/partnerships/university" },
              { label: "Industry Partners", href: "/for-organizations/partnerships/industry" },
              { label: "Affiliate Network", href: "/for-organizations/partnerships/affiliate-network" },
              { label: "Become a Co-Host", href: "/for-organizations/partnerships/co-host" },
              { label: "Strategic Alliances", href: "/for-organizations/partnerships/strategic-alliances" },
            ],
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
            children: [
              { label: "Volunteer as an Expert", href: "/about/ecosystem/volunteer-as-expert" },
              { label: "Hiring Initiatives", href: "/about/ecosystem/hiring-initiatives" },
              { label: "Educational & Career Events", href: "/about/ecosystem/events" },
              { label: "Global Expert Network", href: "/about/ecosystem/global-expert-network" },
              { label: "Industry Engagements", href: "/about/ecosystem/industry-engagements" },
            ],
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

const ICONS_BY_TITLE = {
  "Students & Graduates": GraduationCap,
  "Women in Tech": Users,
  "AI for Real-World Careers": Cpu,
  "Career Tracks & Bootcamps": Route,
  "1-to-1 Career Mentorship": UserRound,
  "Trend Lab": TrendingUp,
  "Universities & Educators": School,
  "Companies & Corporations": Building2,
  "Governments & Public Sector": Landmark,
  "Schools & Early Talent Programs": Backpack,
  "AI for Organizations": Bot,
  Partnerships: Handshake,
  "Innovation & Workforce Tools": Wrench,
  Value: BadgeCheck,
  "Real Projects": Briefcase,
  "Global Exposure": Globe,
  "Career Outcomes": BarChart3,
  "Success Stories": Trophy,
  "Feedback & Testimonials": MessageSquareQuote,
  "Our Mission & Vision": Target,
  "Our Model (How We Work)": Workflow,
  "Our European Network": Map,
  Ecosystem: Network,
  "Global Expert Network": UsersRound,
  "Industry Engagements": Factory,
  "Educational & Career Events": CalendarDays,
  "Hiring Initiatives": UserPlus,
  "Become an Expert": Sparkles,
  "University Partnerships": School,
  "Industry Partners": Building2,
  "Affiliate Network": UsersRound,
  "Become a Co-Host": Handshake,
  "Strategic Alliances": Network,
  "Volunteer as an Expert": UserPlus,
};

function ItemIcon({ title, active = false, className = "" }) {
  const Icon = ICONS_BY_TITLE[title];
  return (
    <span className={`px-itemIcon ${active ? "active" : ""} ${className}`}>
      {Icon ? <Icon size={18} strokeWidth={1.8} /> : <span className="px-itemIconFallback" />}
    </span>
  );
}

export default function Navbar({ dir = "ltr" }) {
  const [openId, setOpenId] = useState(null);
  const [previewByGroup, setPreviewByGroup] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, toggle: toggleTheme } = useLocalTheme();
  const navRef = useRef(null);
  const closeTimer = useRef(null);
  const previewTimer = useRef(null);

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

  function clearPreviewTimer() {
    if (previewTimer.current) {
      window.clearTimeout(previewTimer.current);
      previewTimer.current = null;
    }
  }

  function toggleMobile() {
    setMobileOpen((v) => !v);
    setOpenId(null);
  }

  function onNavLink() {
    setOpenId(null);
    setMobileOpen(false);
  }

  function setPreview(groupId, item, category) {
    setPreviewByGroup((prev) => ({
      ...prev,
      [groupId]: {
        title: item.label,
        text: item.desc,
        category,
        href: item.href,
        iconTitle: item.label,
        children: item.children || [],
      },
    }));
  }

  function setPreviewWithIntent(groupId, item, category) {
    clearPreviewTimer();
    previewTimer.current = window.setTimeout(() => {
      setPreview(groupId, item, category);
      previewTimer.current = null;
    }, 120);
  }

  function toPreview(item, category) {
    if (!item) return null;
    return {
      title: item.label,
      text: item.desc,
      category,
      href: item.href,
      iconTitle: item.label,
      children: item.children || [],
    };
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
            <img className="px-brandLogo" src="/logo-praktikax.jpg" alt="PraktikaX logo" />
          </a>

          {/* CENTER: Desktop nav (perfectly centered) */}
          <div className="px-center" onPointerLeave={() => !isMobile && scheduleClose()}>
            {NAV.map((group) => {
              const open = openId === group.id;
              const defaultItem = group.columns?.[0]?.items?.[0];
              const defaultCategory = group.columns?.[0]?.title || group.label;
              const activePreview = previewByGroup[group.id] || toPreview(defaultItem, defaultCategory);

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
                      onPointerLeave={() => {
                        if (!isMobile) scheduleClose();
                        clearPreviewTimer();
                      }}
                    >
                      <div className="px-megaTop">
                        <div className="px-megaTitle">{group.label}</div>
                      </div>

                      <div className="px-megaGrid">
                        <div className="px-cols">
                          {group.columns.map((col) => (
                            <div key={col.title} className="px-col">
                              <div className="px-colTitle">{col.title}</div>
                              <ul className="px-colList">
                                {col.items.map((it) => (
                                  <li key={it.href}>
                                    <a
                                      className={`px-linkCard ${activePreview?.href === it.href ? "active" : ""}`}
                                      href={it.href}
                                      onClick={onNavLink}
                                      onMouseEnter={() => setPreviewWithIntent(group.id, it, col.title)}
                                      onMouseLeave={clearPreviewTimer}
                                      onFocus={() => setPreview(group.id, it, col.title)}
                                    >
                                      <div className="px-linkHead">
                                        <ItemIcon title={it.label} active={activePreview?.href === it.href} />
                                        <div className="px-linkLabel">{it.label}</div>
                                        <ChevronRightIcon className="px-linkArrow" size={18} strokeWidth={2} />
                                      </div>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                                                <a
                          className="px-promo"
                          href={activePreview?.href || "#"}
                          onClick={(e) => {
                            if (!activePreview?.href) {
                              e.preventDefault();
                              return;
                            }
                            onNavLink();
                          }}
                        >
                          <div
                            className="px-promoBody"
                            key={`${group.id}-${activePreview?.href || "empty"}`}
                          >
                            {activePreview ? (
                              <>
                                <div className="px-promoEyebrow">{activePreview.category}</div>
                                <ItemIcon title={activePreview.iconTitle} active className="promo" />
                                <div className="px-promoTitle">{activePreview.title}</div>
                                <div className="px-promoText">{activePreview.text}</div>
                                {activePreview.children?.length ? (
                                  <div className="px-promoSubList">
                                    {activePreview.children.map((sub, subIdx) => (
                                      <a
                                        key={sub.href}
                                        className="px-promoSubLink"
                                        href={sub.href}
                                        onClick={onNavLink}
                                        style={{ animationDelay: `${subIdx * 0.04}s` }}
                                      >
                                        <ItemIcon title={sub.label} className="sub" />
                                        <span>{sub.label}</span>
                                        <span className="px-promoSubArrow">→</span>
                                      </a>
                                    ))}
                                  </div>
                                ) : null}
                                <div className="px-promoCta">Open this page -&gt;</div>
                              </>
                            ) : (
                              <>
                                <div className="px-promoEyebrow">{group.label}</div>
                                <div className="px-promoTitle">Hover an item</div>
                                <div className="px-promoText">
                                  Move over an item card to preview its details in this panel.
                                </div>
                                <div className="px-promoCta">Preview panel</div>
                              </>
                            )}
                          </div>
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
                  const defaultItem = group.columns?.[0]?.items?.[0];
                  const defaultCategory = group.columns?.[0]?.title || group.label;
                  const activePreview = previewByGroup[group.id] || toPreview(defaultItem, defaultCategory);
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
                                    <button
                                      type="button"
                                      className={`px-accLinkBtn ${activePreview?.href === it.href ? "active" : ""}`}
                                      onClick={() => setPreview(group.id, it, col.title)}
                                    >
                                      <ItemIcon title={it.label} className="mobile" />
                                      <span>{it.label}</span>
                                      <ChevronRightIcon className="px-linkArrow" size={16} strokeWidth={2} />
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          {activePreview ? (
                            <div className="px-accPreview">
                              <div className="px-promoEyebrow">{activePreview.category}</div>
                              <ItemIcon title={activePreview.iconTitle} active className="promo" />
                              <div className="px-promoTitle">{activePreview.title}</div>
                              <div className="px-promoText">{activePreview.text}</div>
                              {activePreview.children?.length ? (
                                <div className="px-promoSubList">
                                  {activePreview.children.map((sub) => (
                                    <a key={sub.href} className="px-promoSubLink" href={sub.href} onClick={onNavLink}>
                                      <ItemIcon title={sub.label} className="sub" />
                                      <span>{sub.label}</span>
                                      <span className="px-promoSubArrow">-&gt;</span>
                                    </a>
                                  ))}
                                </div>
                              ) : null}
                              <a className="px-promoCta" href={activePreview.href || group.promo.href} onClick={onNavLink}>
                                Open this page -&gt;
                              </a>
                            </div>
                          ) : null}

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



