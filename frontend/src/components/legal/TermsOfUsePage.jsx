import React, { useEffect, useMemo, useState } from "react";
import { useLocalTheme } from "../../hooks/use-local-theme";

/**
 * Terms of Use Ã¢â‚¬â€ screenshot-inspired layout (based on your Impressum code)
 *
 * ? Balanced dark + cream (NOT too dark, NOT too light)
 * ? Scrollable structured layout
 * ? Section anchor navigation (two cards: dark + light like screenshot)
 * ? Acceptance implied by use (highlighted callout)
 * ? CMS editable hooks (data-cms-*)
 * ? Icons + subtle motion (CSS keyframes + hover + accordion)
 *
 * Palette (yours):
 *  - Pink:  #C51F5D
 *  - Slate: #243447
 *  - Navy:  #141D26
 *  - Cream: #E2E2D2
 */

export default function TermsOfUsePage({
  brandName = "Praktix",
  effectiveDate = "[Insert Date]",
  legalEmail = "[Insert Official Legal Email]",
}) {
  const { theme } = useLocalTheme();
  const sections = useMemo(
    () => [
      { id: "intro", label: "Terms of Use Overview" },
      { id: "scope", label: "1. Scope" },
      { id: "eligibility", label: "2. Eligibility" },
      { id: "services", label: "3. Services Description" },
      { id: "responsibilities", label: "4. User Responsibilities" },
      { id: "ip", label: "5. Intellectual Property" },
      { id: "liability", label: "6. Limitation of Liability" },
      { id: "participation", label: "7. Program Participation" },
      { id: "modifications", label: "8. Modifications" },
      { id: "law", label: "9. Governing Law" },
      { id: "contact", label: "10. Contact" },
      { id: "highlights", label: "Quick Highlights" },
    ],
    []
  );

  const [activeId, setActiveId] = useState(sections[0].id);

  // Scroll-spy (matches your Impressum code behavior + scroll-margin)
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        root: null,
        rootMargin: "-90px 0px -55% 0px",
        threshold: [0.05, 0.2, 0.4, 0.6],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="tuRoot" data-theme-mode={theme}>
      <style>{styles}</style>
      <style>{theme === "light" ? TU_LIGHT_OVERRIDES : ""}</style>

      {/* BACKDROP (balanced) */}
      <div className="tuBg" aria-hidden="true">
        <div className="tuBgNoise" />
        <div className="tuShape tuShapeA" />
        <div className="tuShape tuShapeB" />
      </div>

      {/* HERO */}
      <header className="tuHero" id="top">
        <div className="tuHeroInner">
          <h1 className="tuH1">Terms of Use</h1>
          <div className="tuUnderline" />

          <div className="tuMetaRow">
            <span className="tuMetaPill">
              <span className="tuMetaDot" aria-hidden="true" />
              <span className="tuMetaText">
                <b>Effective Date:</b> <span data-cms-field="terms.effectiveDate">{effectiveDate}</span>
              </span>
            </span>

            <span className="tuMetaBrand">
              <span className="tuBrandMark" aria-hidden="true" />
              <span className="tuMetaText">
                <b>Platform:</b> <span data-cms-field="terms.brand">{brandName}</span>
              </span>
            </span>
          </div>
        </div>
      </header>

      {/* MAIN GRID */}
      <main className="tuGrid" data-cms-editable="terms-of-use">
        {/* SIDEBAR */}
        <aside className="tuSidebar">
          <SideNavCard
            title="ON THIS PAGE"
            sections={sections}
            activeId={activeId}
            onClick={scrollTo}
            variant="dark"
          />

          {/* second nav card (light/cream) like your screenshot */}
          <SideNavCard
            title="QUICK LINKS"
            sections={sections}
            activeId={activeId}
            onClick={scrollTo}
            variant="light"
          />
        </aside>

        {/* CONTENT */}
        <section className="tuContent">
          {/* Intro / Acceptance */}
          <CreamPanel id="intro" title={`${brandName} Terms of Use`} cmsKey="terms.intro">
            <div className="tuIntro">
              <div className="tuIntroLeft">
                <div className="tuIntroLead" data-cms-field="terms.intro.lead">
                  Welcome to {brandName}. By accessing or using this website and our services, you agree to the
                  following terms.
                </div>

                <div className="tuAccept" role="note">
                  <span className="tuAcceptBadge" aria-hidden="true">
                    <IconSpark />
                  </span>
                  <div className="tuAcceptText" data-cms-field="terms.acceptance">
                    <b>Acceptance implied by use:</b> continued access or use of {brandName} constitutes your
                    agreement to these Terms.
                  </div>
                </div>
              </div>

              <div className="tuIntroRight">
                <div className="tuMiniCard">
                  <div className="tuMiniHead">
                    <span className="tuMiniIcon" aria-hidden="true">
                      <IconList />
                    </span>
                    <div className="tuMiniTitle">What this page includes</div>
                  </div>
                  <ul className="tuMiniList">
                    <li>Scope & eligibility</li>
                    <li>Services & responsibilities</li>
                    <li>Intellectual property</li>
                    <li>Liability & governing law</li>
                  </ul>
                </div>
              </div>
            </div>
          </CreamPanel>

          {/* 1. Scope */}
          <CreamPanel id="scope" title="1. Scope" cmsKey="terms.scope">
            <div className="tuText" data-cms-field="terms.scope.content">
              These Terms of Use govern access to and use of the {brandName} platform, including internships,
              programs, mentorship services, and institutional collaborations.
            </div>
          </CreamPanel>

          {/* 2. Eligibility */}
          <CreamPanel id="eligibility" title="2. Eligibility" cmsKey="terms.eligibility">
            <div className="tuText" data-cms-field="terms.eligibility.content">
              Users must be at least <b>12 years old</b> to access services independently. Users under 18 may
              require parental or institutional consent.
            </div>
          </CreamPanel>

          {/* 3. Services (nested dark board like your provider board) */}
          <CreamPanel id="services" title="3. Services Description" cmsKey="terms.services">
            <DarkBoard
              heading="Services Overview"
              pinkTitle={brandName}
              pinkSub="Programs, internships, mentorship & institutional partnerships"
              cmsKey="terms.services.board"
            >
              <div className="tuBoardGrid">
                <BoardRow
                  icon={<IconBriefcase />}
                  label="We provide:"
                  tone="pink"
                  value={
                    <ul className="tuBullet">
                      <li>Industry-integrated internships</li>
                      <li>Mentorship programs</li>
                      <li>Career tracks and bootcamps</li>
                      <li>Institutional partnerships</li>
                      <li>Professional development services</li>
                    </ul>
                  }
                />
                <BoardRow
                  icon={<IconRefresh />}
                  label="Service changes:"
                  tone="slate"
                  value="We reserve the right to modify or discontinue services at any time."
                  last
                />
              </div>
            </DarkBoard>
          </CreamPanel>

          <div className="tuAfterThirdGrid">
            {/* 4. User responsibilities */}
            <CreamPanel id="responsibilities" title="4. User Responsibilities" cmsKey="terms.responsibilities">
              <div className="tuText" data-cms-field="terms.responsibilities.content">
                Users agree to:
              </div>
              <ul className="tuBullet" data-cms-field="terms.responsibilities.list">
                <li>Provide accurate information</li>
                <li>Use services lawfully</li>
                <li>Respect intellectual property rights</li>
                <li>Maintain confidentiality where required</li>
              </ul>
              <div className="tuText" data-cms-field="terms.responsibilities.note">
                Misuse of the platform may result in suspension.
              </div>
            </CreamPanel>

            {/* 5. IP */}
            <CreamPanel id="ip" title="5. Intellectual Property" cmsKey="terms.ip">
              <div className="tuText" data-cms-field="terms.ip.content">
                All content, branding, materials, frameworks, and digital assets on this website remain the
                intellectual property of {brandName} unless otherwise stated. Unauthorized use is strictly prohibited.
              </div>
            </CreamPanel>

            {/* 6. Liability */}
            <CreamPanel id="liability" title="6. Limitation of Liability" cmsKey="terms.liability">
              <div className="tuText" data-cms-field="terms.liability.lead">
                {brandName} shall not be liable for:
              </div>
              <ul className="tuBullet" data-cms-field="terms.liability.list">
                <li>Indirect damages</li>
                <li>Loss of opportunity</li>
                <li>External partner performance</li>
                <li>Technical disruptions beyond reasonable control</li>
              </ul>
            </CreamPanel>

            {/* 7. Participation */}
            <CreamPanel id="participation" title="7. Program Participation" cmsKey="terms.participation">
              <div className="tuText" data-cms-field="terms.participation.content">
                Participation in internships or programs does not guarantee employment, certification, or financial
                compensation unless explicitly stated.
              </div>
            </CreamPanel>

            {/* 8. Modifications */}
            <CreamPanel id="modifications" title="8. Modifications" cmsKey="terms.modifications">
              <div className="tuText" data-cms-field="terms.modifications.content">
                We reserve the right to update these Terms at any time. Continued use constitutes acceptance.
              </div>
            </CreamPanel>

            {/* 9. Governing law */}
            <CreamPanel id="law" title="9. Governing Law" cmsKey="terms.law">
              <div className="tuText" data-cms-field="terms.law.content">
                These Terms are governed by the laws of the Federal Republic of Germany.
              </div>
            </CreamPanel>
          </div>

          {/* 10. Contact */}
          <CreamPanel id="contact" title="10. Contact" cmsKey="terms.contact">
            <div className="tuContactRow">
              <span className="tuContactIcon" aria-hidden="true">
                <IconMail />
              </span>
              <div className="tuText" data-cms-field="terms.contact.content">
                For questions regarding these Terms: <br />
                <b>Email:</b>{" "}
                <a
                  className="tuLink"
                  href={String(legalEmail || "").includes("@") ? `mailto:${legalEmail}` : "#"}
                >
                  {legalEmail}
                </a>
              </div>
            </div>
          </CreamPanel>

          {/* Highlights section (like your Disclaimer grid) */}
          <section id="highlights" className="tuHighlightsGrid" data-cms-section="terms.highlights">
            <div className="tuDarkShell">
              <div className="tuDarkShellTitle">Quick Highlights</div>

              <div className="tuCreamInset">
                <div className="tuCreamInsetHead">
                  <span className="tuInsetPinkBadge" aria-hidden="true">
                    <IconShield />
                  </span>
                  <div className="tuCreamInsetHeadText">Key points at a glance</div>
                </div>

                <ul className="tuBullet tuBulletTight" data-cms-field="terms.highlights.list">
                  <li>Acceptance is implied by use</li>
                  <li>Programs do not guarantee employment</li>
                  <li>IP is protected</li>
                  <li>German law governs these Terms</li>
                </ul>
              </div>
            </div>

            <div className="tuAccStack">
              <DarkAccordion
                items={[
                  {
                    title: "Acceptance implied by use",
                    icon: <IconSpark />,
                    content:
                      `By continuing to access or use ${brandName}, you confirm youÃ¢â‚¬â„¢ve read and accepted these Terms.`,
                  },
                  {
                    title: "No guarantee of outcomes",
                    icon: <IconFlag />,
                    content:
                      "Participation in internships/programs does not guarantee employment, certification, or compensation unless explicitly stated.",
                  },
                  {
                    title: "Updates to Terms",
                    icon: <IconRefresh />,
                    content:
                      "We may update these Terms. Continued use after changes indicates acceptance of the updated Terms.",
                  },
                ]}
              />
            </div>
          </section>

          {/* Footer */}
          <div className="tuFooter">
            <div className="tuFooterLeft">Ã‚Â© {new Date().getFullYear()} {brandName} Ã¢â‚¬Â¢ Legal</div>
            <button className="tuBackTop" onClick={() => scrollTo("top")} type="button">
              <span className="tuBackTopIcon" aria-hidden="true">
                <IconUp />
              </span>
              Back to top
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------------- Sidebar Nav ---------------- */

function SideNavCard({ title, sections, activeId, onClick, variant }) {
  return (
    <div className={`tuNavCard ${variant}`}>
      <div className="tuNavTitle">{title}</div>

      <div className="tuNavLinks">
        {sections.map((s) => {
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              className={`tuNavLink ${isActive ? "active" : ""}`}
              onClick={() => onClick(s.id)}
              type="button"
            >
              <span className="tuDot" aria-hidden="true" />
              <span className="tuNavText">{s.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Cream Panel ---------------- */

function CreamPanel({ id, title, children, cmsKey }) {
  return (
    <section id={id} className="tuCreamPanel" data-cms-section={cmsKey}>
      <h2 className="tuCreamTitle">{title}</h2>
      <div className="tuCreamBody">{children}</div>
    </section>
  );
}

/* ---------------- Dark board (nested) ---------------- */

function DarkBoard({ heading, pinkTitle, pinkSub, children, cmsKey }) {
  return (
    <section className="tuBoardWrap" data-cms-section={cmsKey}>
      <div className="tuBoard">
        <div className="tuBoardTop">
          <div className="tuBoardTopTitle">{heading}</div>
        </div>

        <div className="tuBoardPinkBar">
          <div className="tuBoardName">{pinkTitle}</div>
          <div className="tuBoardSub">{pinkSub}</div>
        </div>

        <div className="tuBoardTable">{children}</div>
      </div>
    </section>
  );
}

function BoardRow({ icon, label, value, tone = "slate", last = false }) {
  return (
    <div className={`tuRow ${last ? "last" : ""}`}>
      <div className={`tuRowIcon ${tone}`}>{icon}</div>
      <div className="tuRowLabel">{label}</div>
      <div className="tuRowValue">{value}</div>
    </div>
  );
}

/* ---------------- Dark Accordion ---------------- */

function DarkAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="tuDarkAccordion">
      {items.map((it, idx) => {
        const open = idx === openIndex;
        const panelId = `tu-acc-panel-${idx}`;
        const btnId = `tu-acc-btn-${idx}`;
        return (
          <div key={it.title} className={`tuDarkAccItem ${open ? "open" : ""}`}>
            <button
              id={btnId}
              className="tuDarkAccBtn"
              onClick={() => setOpenIndex(open ? -1 : idx)}
              aria-expanded={open}
              aria-controls={panelId}
              type="button"
            >
              <div className="tuDarkAccLeft">
                <span className="tuDarkAccIcon">{it.icon}</span>
                <span className="tuDarkAccTitle">{it.title}</span>
              </div>

              <span className="tuDarkAccChevron" aria-hidden="true">
                <IconChevron />
              </span>
            </button>

            <div id={panelId} role="region" aria-labelledby={btnId} className="tuDarkAccPanel">
              <div className="tuDarkAccPanelInner">{it.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Icons (tiny SVG set) ---------------- */

function Svg({ children, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

function IconChevron() {
  return (
    <Svg>
      <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function IconUp() {
  return (
    <Svg>
      <path d="M12 19V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 11l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function IconMail() {
  return (
    <Svg>
      <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="2" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </Svg>
  );
}

function IconShield() {
  return (
    <Svg>
      <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function IconSpark() {
  return (
    <Svg>
      <path d="M12 2l1.2 4.3L17 8l-3.8 1.7L12 14l-1.2-4.3L7 8l3.8-1.7L12 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M5 14l.6 2.2L8 17l-2.4.8L5 20l-.6-2.2L2 17l2.4-.8L5 14z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </Svg>
  );
}

function IconList() {
  return (
    <Svg>
      <path d="M8 6h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 12h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 18h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 6h.01" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M3 12h.01" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M3 18h.01" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </Svg>
  );
}

function IconBriefcase() {
  return (
    <Svg>
      <path d="M10 6V5a2 2 0 012-2h0a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 8h16v12H4z" stroke="currentColor" strokeWidth="2" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function IconRefresh() {
  return (
    <Svg>
      <path d="M20 12a8 8 0 10-2.3 5.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 8v4h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function IconFlag() {
  return (
    <Svg>
      <path d="M5 21V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 4h12l-2 4 2 4H5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </Svg>
  );
}

/* ---------------- CSS (inspired by your screenshot CSS) ---------------- */

const styles = `
:root{
  --pink:#C51F5D;
  --slate:#243447;
  --navy:#141D26;
  --cream:#E2E2D2;

  /* balanced whites */
  --white: rgba(255,255,255,.92);
  --white2: rgba(255,255,255,.72);
  --line: rgba(255,255,255,.10);

  --shadow: 0 22px 70px rgba(0,0,0,.34);
  --shadow2: 0 14px 36px rgba(0,0,0,.24);

  --sideW: 320px;
  --rXL: 28px;
  --rLG: 22px;
  --rMD: 18px;
}

*{ box-sizing:border-box; }
html,body{ height:100%; }
body{
  margin:0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
}

/* Root */
.tuRoot{
  min-height: 100vh;
  position: relative;
  padding: 18px 0 64px;
  color: var(--white);
}

/* Background (balanced: not too dark, not too light) */
.tuBg{
  position: fixed;
  inset: 0;
  z-index: -5;
  background:
    radial-gradient(1400px 900px at 18% 8%, rgba(36,52,71,.78), transparent 58%),
    radial-gradient(1200px 800px at 84% 18%, rgba(20,29,38,.86), transparent 58%),
    linear-gradient(180deg, #0b1526 0%, #0c172b 55%, #0b1526 100%);
}
.tuBgNoise{
  position:absolute; inset:0;
  opacity:.075;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.28'/%3E%3C/svg%3E");
  background-size: 240px 240px;
}

.tuShape{
  --r: 0deg;
  position:absolute;
  border: 1px solid rgba(255,255,255,.06);
  background: linear-gradient(135deg, rgba(255,255,255,.085), rgba(255,255,255,0));
  border-radius: 70px;
  opacity: .40;
  animation: tuFloat 12s ease-in-out infinite;
}
.tuShapeA{
  --r: 10deg;
  width: 620px; height: 360px;
  right: -140px; top: 120px;
}
.tuShapeB{
  --r: -8deg;
  width: 700px; height: 520px;
  right: -220px; top: 420px;
  opacity: .22;
  animation-duration: 14s;
}

@keyframes tuFloat{
  0%,100%{ transform: translateY(0) rotate(var(--r)); }
  50%{ transform: translateY(-10px) rotate(var(--r)); }
}

/* Hero */
.tuHero{
  max-width: 1160px;
  margin: 0 auto;
  padding: 12px 18px 10px;
}
.tuHeroInner{
  display:flex;
  flex-direction:column;
  gap: 12px;
}
.tuH1{
  margin:0;
  color: var(--white);
  font-size: 54px;
  letter-spacing: .2px;
  line-height: 1;
  text-shadow: 0 16px 36px rgba(0,0,0,.42);
}
.tuUnderline{
  width: 360px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--pink), rgba(197,31,93,0));
}
.tuMetaRow{
  display:flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items:center;
}
.tuMetaPill, .tuMetaBrand{
  display:flex;
  align-items:center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(20,29,38,.28);
  box-shadow: 0 10px 24px rgba(0,0,0,.20);
}
.tuMetaDot{
  width: 10px; height: 10px;
  border-radius: 999px;
  background: var(--pink);
  box-shadow: 0 0 0 6px rgba(197,31,93,.12);
}
.tuBrandMark{
  width: 10px; height: 10px;
  border-radius: 6px;
  background: linear-gradient(135deg, rgba(226,226,210,.55), rgba(226,226,210,.08));
  border: 1px solid rgba(255,255,255,.12);
}
.tuMetaText{
  color: rgba(255,255,255,.78);
  font-size: 13px;
  font-weight: 650;
}
.tuMetaText b{ color: rgba(255,255,255,.92); }

/* Layout grid */
.tuGrid{
  max-width: 1160px;
  margin: 0 auto;
  padding: 14px 18px 0;
  display:grid;
  grid-template-columns: var(--sideW) 1fr;
  gap: 22px;
  align-items:start;
}

/* Sidebar */
.tuSidebar{
  display:flex;
  flex-direction:column;
  gap: 18px;
  position: sticky;
  top: 16px;
  align-self: start;
}

/* Nav cards */
.tuNavCard{
  border-radius: var(--rXL);
  padding: 16px;
  box-shadow: var(--shadow2);
}
.tuNavCard.dark{
  background: linear-gradient(180deg, rgba(36,52,71,.70), rgba(20,29,38,.70));
  border: 1px solid rgba(255,255,255,.12);
}
.tuNavCard.light{
  display: none;
  background: linear-gradient(180deg, rgba(226,226,210,.90), rgba(226,226,210,.78));
  border: 1px solid rgba(255,255,255,.32);
}

.tuNavTitle{
  font-size: 12px;
  letter-spacing: .18em;
  font-weight: 900;
  margin-bottom: 12px;
  color: rgba(255,255,255,.72);
}
.tuNavCard.light .tuNavTitle{
  color: rgba(20,29,38,.62);
}

.tuNavLinks{
  display:flex;
  flex-direction:column;
  gap: 10px;
}

.tuNavLink{
  width:100%;
  border: 0;
  text-align:left;
  display:flex;
  align-items:center;
  gap: 10px;
  padding: 12px 12px;
  border-radius: 16px;
  cursor:pointer;
  background: rgba(255,255,255,.06);
  color: rgba(255,255,255,.86);
  border: 1px solid rgba(255,255,255,.06);
  transition: transform .15s ease, background .15s ease, border-color .15s ease;
}
.tuNavCard.light .tuNavLink{
  background: rgba(20,29,38,.06);
  color: rgba(20,29,38,.84);
  border-color: rgba(20,29,38,.06);
}
.tuNavLink:hover{ transform: translateY(-1px); }
.tuNavLink.active{
  background: linear-gradient(135deg, rgba(197,31,93,.95), rgba(197,31,93,.62));
  border-color: rgba(255,255,255,.16);
  color: #fff;
}
.tuDot{
  width: 8px; height: 8px;
  border-radius: 999px;
  background: rgba(255,255,255,.62);
  margin-top: 0;
  flex: 0 0 auto;
}
.tuNavCard.light .tuDot{ background: rgba(20,29,38,.35); }
.tuNavLink.active .tuDot{ background: rgba(255,255,255,.92); }
.tuNavText{
  font-size: 14px;
  line-height: 1.25;
  font-weight: 800;
}

/* Content stack */
.tuContent{
  display:flex;
  flex-direction:column;
  gap: 22px;
}
.tuAfterThirdGrid{
  display:grid;
  grid-template-columns: 1fr;
  gap: 22px;
  align-items:start;
}

/* Cream panel (big) */
.tuCreamPanel{
  border-radius: var(--rXL);
  padding: 18px 18px 16px;
  background:
    radial-gradient(900px 420px at 15% 0%, rgba(255,255,255,.40), transparent 62%),
    linear-gradient(180deg, rgba(226,226,210,.90) 0%, rgba(226,226,210,.82) 100%);
  border: 1px solid rgba(255,255,255,.30);
  box-shadow: var(--shadow);
  overflow:hidden;
  scroll-margin-top: 90px;
}
.tuCreamTitle{
  color: rgba(20,29,38,.88);
  font-weight: 950;
  font-size: 24px;
  letter-spacing: .1px;
  margin-bottom: 14px;
}
.tuCreamBody{
  padding: 6px 0 2px;
  max-width: 78ch;
}

/* Text inside cream panels */
.tuText{
  color: rgba(20,29,38,.78);
  font-weight: 700;
  line-height: 1.7;
}
.tuText b{ color: rgba(20,29,38,.88); }

/* Intro */
.tuIntro{
  display:grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 16px;
  align-items: start;
  max-width: none;
}
.tuIntroLead{
  color: rgba(20,29,38,.82);
  font-weight: 800;
  line-height: 1.7;
}
.tuAccept{
  margin-top: 14px;
  display:flex;
  gap: 12px;
  align-items:flex-start;
  padding: 14px;
  border-radius: var(--rLG);
  border: 1px solid rgba(197,31,93,.22);
  background: linear-gradient(135deg, rgba(197,31,93,.14), rgba(197,31,93,.06));
}
.tuAcceptBadge{
  width: 44px; height: 44px;
  border-radius: 14px;
  display:grid;
  place-items:center;
  background: linear-gradient(135deg, rgba(197,31,93,.95), rgba(197,31,93,.70));
  color:#fff;
  flex: 0 0 auto;
  box-shadow: 0 14px 30px rgba(197,31,93,.18);
}
.tuAcceptText{
  color: rgba(20,29,38,.78);
  font-weight: 750;
  line-height: 1.65;
}
.tuMiniCard{
  border-radius: var(--rLG);
  background: rgba(20,29,38,.06);
  border: 1px solid rgba(20,29,38,.08);
  padding: 14px;
}
.tuMiniHead{
  display:flex;
  align-items:center;
  gap: 10px;
  margin-bottom: 10px;
}
.tuMiniIcon{
  width: 40px; height: 40px;
  border-radius: 14px;
  display:grid;
  place-items:center;
  background: rgba(197,31,93,.14);
  border: 1px solid rgba(20,29,38,.08);
  color: rgba(20,29,38,.85);
}
.tuMiniTitle{
  font-weight: 950;
  color: rgba(20,29,38,.88);
}
.tuMiniList{
  margin: 0;
  padding-left: 18px;
  color: rgba(20,29,38,.72);
  font-weight: 700;
  display:flex;
  flex-direction:column;
  gap: 8px;
}

/* Nested dark board (services) */
.tuBoard{
  border-radius: var(--rXL);
  overflow:hidden;
  background: linear-gradient(180deg, rgba(20,29,38,.92), rgba(20,29,38,.86));
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: 0 18px 44px rgba(0,0,0,.28);
}
.tuBoardTop{
  padding: 14px 16px;
  background: linear-gradient(180deg, rgba(36,52,71,.62), rgba(36,52,71,.32));
  border-bottom: 1px solid rgba(255,255,255,.08);
}
.tuBoardTopTitle{
  color: rgba(255,255,255,.92);
  font-weight: 950;
  font-size: 20px;
}
.tuBoardPinkBar{
  padding: 18px 16px;
  background: linear-gradient(135deg, rgba(197,31,93,.98), rgba(197,31,93,.70));
  border-bottom: 1px solid rgba(255,255,255,.10);
}
.tuBoardName{
  color:#fff;
  font-weight: 950;
  font-size: 24px;
  line-height: 1.05;
}
.tuBoardSub{
  margin-top: 6px;
  color: rgba(255,255,255,.92);
  font-weight: 700;
  opacity: .95;
}

/* board "table" area */
.tuBoardTable{
  margin: 14px;
  border-radius: var(--rLG);
  background: linear-gradient(180deg, rgba(226,226,210,.92), rgba(226,226,210,.86));
  border: 1px solid rgba(255,255,255,.22);
  overflow:hidden;
}
.tuRow{
  display:grid;
  grid-template-columns: 46px 220px 1fr;
  align-items:start;
  gap: 12px;
  padding: 14px 14px;
  border-bottom: 1px solid rgba(20,29,38,.10);
}
.tuRow.last{ border-bottom: 0; }
.tuRowIcon{
  width: 38px; height: 38px;
  border-radius: 12px;
  display:grid;
  place-items:center;
  border: 1px solid rgba(20,29,38,.10);
  color: #fff;
}
.tuRowIcon.pink{
  background: linear-gradient(135deg, rgba(197,31,93,.95), rgba(197,31,93,.72));
}
.tuRowIcon.slate{
  background: linear-gradient(135deg, rgba(36,52,71,.95), rgba(36,52,71,.72));
}
.tuRowLabel{
  font-weight: 950;
  color: rgba(20,29,38,.86);
}
.tuRowValue{
  color: rgba(20,29,38,.74);
  font-weight: 700;
  line-height: 1.7;
}

/* Bullets */
.tuBullet{
  margin: 10px 0 0;
  padding-left: 18px;
  color: rgba(20,29,38,.74);
  font-weight: 700;
  display:flex;
  flex-direction:column;
  gap: 10px;
}
.tuBulletTight{ gap: 8px; }

/* Contact */
.tuContactRow{
  display:flex;
  gap: 12px;
  align-items:flex-start;
}
.tuContactIcon{
  width: 44px; height: 44px;
  border-radius: 14px;
  display:grid;
  place-items:center;
  background: rgba(197,31,93,.14);
  border: 1px solid rgba(20,29,38,.08);
  color: rgba(20,29,38,.85);
  flex: 0 0 auto;
}
.tuLink{
  color: rgba(20,29,38,.84);
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-color: rgba(197,31,93,.55);
  font-weight: 900;
}
.tuLink:hover{ text-decoration-color: rgba(197,31,93,1); }

/* Highlights grid (like disclaimer) */
.tuHighlightsGrid{
  display:grid;
  grid-template-columns: var(--sideW) 1fr;
  gap: 18px;
  scroll-margin-top: 90px;
}

/* Left dark shell */
.tuDarkShell{
  border-radius: var(--rXL);
  background: linear-gradient(180deg, rgba(36,52,71,.72), rgba(20,29,38,.76));
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: var(--shadow2);
  padding: 16px;
}
.tuDarkShellTitle{
  color: rgba(255,255,255,.92);
  font-weight: 950;
  font-size: 22px;
  margin-bottom: 14px;
}

.tuCreamInset{
  border-radius: var(--rLG);
  background: linear-gradient(180deg, rgba(226,226,210,.92), rgba(226,226,210,.84));
  border: 1px solid rgba(255,255,255,.22);
  padding: 14px;
}
.tuCreamInsetHead{
  display:flex;
  align-items:center;
  gap: 10px;
  margin-bottom: 10px;
}
.tuInsetPinkBadge{
  width: 38px; height: 38px;
  border-radius: 12px;
  display:grid;
  place-items:center;
  background: linear-gradient(135deg, rgba(197,31,93,.95), rgba(197,31,93,.70));
  color:#fff;
}
.tuCreamInsetHeadText{
  font-weight: 950;
  color: rgba(20,29,38,.86);
}

/* Right accordion stack */
.tuAccStack{
  display:flex;
  flex-direction:column;
  gap: 14px;
}

/* Dark accordion items */
.tuDarkAccordion{
  display:flex;
  flex-direction:column;
  gap: 14px;
}
.tuDarkAccItem{
  border-radius: var(--rXL);
  overflow:hidden;
  background: linear-gradient(180deg, rgba(36,52,71,.60), rgba(20,29,38,.72));
  border: 1px solid rgba(255,255,255,.10);
  box-shadow: var(--shadow2);
}
.tuDarkAccBtn{
  width:100%;
  border:0;
  background: transparent;
  padding: 16px 16px;
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap: 14px;
  cursor:pointer;
}
.tuDarkAccLeft{
  display:flex;
  gap: 12px;
  align-items:center;
}
.tuDarkAccIcon{
  width: 40px; height: 40px;
  border-radius: 14px;
  display:grid;
  place-items:center;
  background: linear-gradient(135deg, rgba(197,31,93,.95), rgba(197,31,93,.70));
  border: 1px solid rgba(255,255,255,.10);
  color:#fff;
  flex: 0 0 auto;
}
.tuDarkAccTitle{
  color: rgba(255,255,255,.92);
  font-weight: 950;
  font-size: 18px;
}
.tuDarkAccChevron{
  width: 40px; height: 40px;
  border-radius: 14px;
  display:grid;
  place-items:center;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.10);
  color: rgba(255,255,255,.82);
  transition: transform .2s ease;
  flex: 0 0 auto;
}
.tuDarkAccItem.open .tuDarkAccChevron{
  transform: rotate(180deg);
}

/* panel animation */
.tuDarkAccPanel{
  display:grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows .25s ease;
}
.tuDarkAccItem.open .tuDarkAccPanel{
  grid-template-rows: 1fr;
}
.tuDarkAccPanelInner{
  min-height: 0;
  overflow:hidden;
  padding: 0 16px 0;
  opacity: 0;
  transform: translateY(-4px);
  transition: padding .25s ease, opacity .2s ease, transform .2s ease;
  color: rgba(255,255,255,.70);
  line-height: 1.65;
  font-weight: 650;
}
.tuDarkAccItem.open .tuDarkAccPanelInner{
  padding: 0 16px 16px;
  opacity: 1;
  transform: translateY(0);
}

/* Footer */
.tuFooter{
  margin-top: 6px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;
  padding: 10px 2px 0;
}
.tuFooterLeft{
  color: rgba(255,255,255,.70);
  font-weight: 650;
}
.tuBackTop{
  display:inline-flex;
  align-items:center;
  gap: 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(20,29,38,.26);
  color: rgba(255,255,255,.86);
  padding: 10px 12px;
  cursor:pointer;
  transition: transform .15s ease, background .15s ease, border-color .15s ease;
}
.tuBackTop:hover{
  transform: translateY(-1px);
  border-color: rgba(255,255,255,.18);
  background: rgba(20,29,38,.34);
}
.tuBackTopIcon{
  width: 36px; height: 36px;
  border-radius: 14px;
  display:grid;
  place-items:center;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.10);
  color: rgba(255,255,255,.86);
}

.tuNavLink:focus-visible,
.tuBackTop:focus-visible,
.tuDarkAccBtn:focus-visible{
  outline: 3px solid rgba(197,31,93,.55);
  outline-offset: 3px;
}

/* Responsive */
@media (max-width: 980px){
  .tuGrid{ grid-template-columns: 1fr; }
  .tuSidebar{ position: relative; top: 0; }
  .tuNavCard.dark{ display: none; }
  .tuNavCard.light{ display: block; }
  .tuH1{ font-size: 44px; }
  .tuHighlightsGrid{ grid-template-columns: 1fr; }
  .tuIntro{ grid-template-columns: 1fr; }
  .tuRow{ grid-template-columns: 46px 1fr; }
  .tuRowValue{ grid-column: 2 / -1; }
}

@media (max-width: 768px){
  .tuRoot{
    padding: 10px 0 32px;
  }

  .tuHero{
    padding: 10px 12px 8px;
  }

  .tuGrid{
    padding: 10px 12px 0;
    gap: 14px;
  }

  .tuSidebar{
    gap: 12px;
  }

  .tuNavCard{
    border-radius: 20px;
    padding: 12px;
  }

  .tuNavCard.dark{
    display: block;
  }

  .tuNavCard.light{
    display: none;
  }

  .tuNavLinks{
    gap: 8px;
    max-height: 42vh;
    overflow: auto;
    padding-right: 2px;
  }

  .tuNavLink{
    padding: 9px 10px;
    border-radius: 12px;
  }

  .tuCreamPanel{
    border-radius: 20px;
    padding: 14px 12px 12px;
  }

  .tuCreamTitle{
    font-size: 21px;
    margin-bottom: 10px;
  }

  .tuDarkShell{
    border-radius: 20px;
    padding: 12px;
  }

  .tuDarkShellTitle{
    font-size: 19px;
  }

  .tuDarkAccItem{
    border-radius: 18px;
  }

  .tuDarkAccBtn{
    padding: 12px;
  }

  .tuDarkAccTitle{
    font-size: 16px;
  }
}

@media (max-width: 520px){
  .tuH1{ font-size: 34px; line-height: 1.08; }
  .tuUnderline{ width: 100%; max-width: 240px; }
  .tuMetaText, .tuText, .tuBullet, .tuRowValue, .tuDarkAccPanelInner{ font-size: 14px; }
  .tuCreamTitle{ font-size: 19px; }
}
@media (prefers-reduced-motion: reduce){
  .tuShape{ animation: none; }
  .tuNavLink,
  .tuBackTop,
  .tuDarkAccChevron,
  .tuDarkAccPanel,
  .tuDarkAccPanelInner{
    transition: none !important;
  }
}
`;



const TU_LIGHT_OVERRIDES = `
.tuRoot[data-theme-mode="light"] .tuBg{
  background: linear-gradient(180deg, #f4f7fb 0%, #edf2f8 55%, #f5f8fc 100%);
}
.tuRoot[data-theme-mode="light"] .tuH1,
.tuRoot[data-theme-mode="light"] .tuDarkShellTitle,
.tuRoot[data-theme-mode="light"] .tuBoardTopTitle,
.tuRoot[data-theme-mode="light"] .tuDarkAccTitle,
.tuRoot[data-theme-mode="light"] .tuDarkAccPanelInner,
.tuRoot[data-theme-mode="light"] .tuFooterLeft{
  color: rgba(20,29,38,.9);
}
.tuRoot[data-theme-mode="light"] .tuNavCard.dark,
.tuRoot[data-theme-mode="light"] .tuDarkShell,
.tuRoot[data-theme-mode="light"] .tuDarkAccItem,
.tuRoot[data-theme-mode="light"] .tuBoard{
  background: linear-gradient(180deg, rgba(233,239,247,.96), rgba(218,227,238,.96));
  border-color: rgba(36,52,71,.14);
}
`;
