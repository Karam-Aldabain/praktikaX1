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
            href: "/students-graduates",
            desc: "Industry-integrated internships, career tracks, and portfolio-based learning experiences",
          },
          {
            label: "AI for Real-World Careers",
            href: "/for-individuals/ai-for-real-world-careers",
            desc: "Practical AI applications across business, healthcare, engineering, data, marketing, and beyond",
          },
        ],
      },
      {
        title: "Growth Paths",
        items: [
          {
            label: "1-to-1 Career Mentorship",
            href: "/for-individuals/mentorship",
            desc: "Direct access to industry experts and university professors",
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
            label: "Universities & Companies",
            href: "/for-organizations/universities-companies",
            desc: "Co-hosted industry programs integrated into academic structures",
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
        title: "Impact",
        items: [
          {
            label: "Impact & Outcomes",
            href: "/insights/impact-outcomes",
            desc: "Data-driven results, measurable growth, and professional progress",
          },
          {
            label: "Real Experience",
            href: "/insights/real-experience",
            desc: "Case-based learning examples and practical project execution",
          },
        ],
      },
      {
        title: "Proof",
        items: [
          {
            label: "Success & Testimonials",
            href: "/insights/success-testimonials",
            desc: "Graduate journeys, outcomes, and feedback from learners and partners",
          },
          {
            label: "Our Value Model",
            href: "/insights/our-value-model",
            desc: "How our system creates practical capability and long-term value",
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
            label: "How We Work",
            href: "/about/how-we-work",
            desc: "A system-based approach combining projects, mentorship, and measurable outcomes",
          },
          {
            label: "Ecosystem",
            href: "/about/ecosystem",
            desc: "A connected environment integrating experts, institutions, and industry",
          },
          {
            label: "Partnerships",
            href: "/about/partnerships",
            desc: "Institutional collaborations, co-hosting models, and European network partnerships",
          },
        ],
      },
    ],
    promo: {
      eyebrow: "About",
      title: "Understand the model",
      text: "See the system and network behind measurable outcomes.",
      href: "/about/mission-vision",
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
  "Life Training": FlaskConical,
  "1-to-1 Career Mentorship": UserRound,
  "Trend Lab": TrendingUp,
  "Universities & Companies": School,
  "Schools & Early Talent Programs": Backpack,
  "AI for Organizations": Bot,
  Partnerships: Handshake,
  "Innovation & Workforce Tools": Wrench,
  Value: BadgeCheck,
  "Our Value Model": BadgeCheck,
  "Real Projects": Briefcase,
  "Real Experience": Briefcase,
  "Global Exposure": Globe,
  "Career Outcomes": BarChart3,
  "Impact & Outcomes": BarChart3,
  "Success Stories": Trophy,
  "Success & Testimonials": MessageSquareQuote,
  "Feedback & Testimonials": MessageSquareQuote,
  "Our Mission & Vision": Target,
  "How We Work": Workflow,
  PARTNERSHIPS: Handshake,
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
  const brandLogoSrc = theme === "dark" ? "/navbar-logo-dark.png" : "/navbar-logo.png";
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
      className={`px-header ${theme === "dark" ? "dark" : "light"}`}
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
          <a className="px-brand" href="/" onClick={onNavLink} aria-label="Praktix Home">
            <img
              className={`px-brandLogo ${theme === "dark" ? "darkAsset" : ""}`}
              src={brandLogoSrc}
              alt="Praktix logo"
            />
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
                                <div className="px-promoCta">Learn More -&gt;</div>
                              </>
                            ) : (
                              <>
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
              </button>

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
              </button>

              <a className="px-cta mobile" href="/portal" onClick={onNavLink}>
                Login / Portal
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
                                Learn More -&gt;
                              </a>
                            </div>
                          ) : null}
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
                <a className="px-mutedLink" href="/about/mission-vision" onClick={onNavLink}>
                  About Praktix
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}





