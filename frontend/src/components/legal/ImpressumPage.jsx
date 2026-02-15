import React, { useEffect, useMemo, useState } from "react";

/**
 * Screenshot-match layout:
 * - Dark navy background with soft shapes + pink corner accent
 * - Left sidebar: dark nav card + light nav card (as in screenshot)
 * - Right: big cream panel (TMG) with nested dark provider board and row-table
 * - Disclaimer: left dark shell with cream inset + right dark accordion items
 *
 * Palette:
 *  - Pink:  #C51F5D
 *  - Slate: #243447
 *  - Navy:  #141D26
 *  - Cream: #E2E2D2
 */

export default function ImpressumPage() {
  const sections = useMemo(
    () => [
      {
        id: "tmg",
        label:
          "Information in accordance with § 5 TMG (German Telemedia Act)",
      },
      { id: "service-provider", label: "Service Provider" },
      {
        id: "rstv",
        label: "Responsible for Content according to § 55 Abs. 2 RStV",
      },
      { id: "disclaimer", label: "Disclaimer" },
    ],
    []
  );

  const [activeId, setActiveId] = useState(sections[0].id);

  // Scroll-spy that respects sticky top spacing
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
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
    <div className="ixRoot">
      <style>{styles}</style>

      {/* BACKDROP (screenshot-like) */}
      <div className="ixBg" aria-hidden="true">
        <div className="ixBgNoise" />
        <div className="ixShape ixShapeA" />
        <div className="ixShape ixShapeB" />
      </div>

      {/* HERO (no topbar, screenshot style) */}
      <header className="ixHero">
        <div className="ixHeroInner">
          <h1 className="ixH1">Impressum</h1>
          <div className="ixUnderline" />
        </div>
      </header>

      {/* MAIN GRID */}
      <main className="ixGrid">
        {/* SIDEBAR */}
        <aside className="ixSidebar">
          <SideNavCard
            title="ON THIS PAGE"
            sections={sections}
            activeId={activeId}
            onClick={scrollTo}
            variant="dark"
          />

          {/* second nav card like the screenshot (light/cream) */}
          <SideNavCard
            title="ON THIS PAGE"
            sections={sections}
            activeId={activeId}
            onClick={scrollTo}
            variant="light"
          />
        </aside>

        {/* CONTENT */}
        <section className="ixContent">
          {/* TMG panel with nested provider board (matches screenshot structure) */}
          <CreamPanel
            id="tmg"
            title="Information in accordance with § 5 TMG (German Telemedia Act)"
          >
            <ProviderBoard
              id="service-provider"
              name="PraktikaX"
              sub="Operated by HOPn UG (haftungsbeschränkt)"
            />
          </CreamPanel>

          {/* Responsible person (kept, styled to match) */}
          <CreamPanel
            id="rstv"
            title="Responsible for Content according to § 55 Abs. 2 RStV"
          >
            <div className="ixInsetNote">
              <div className="ixInsetIcon">
                <IconUser />
              </div>
              <div>
                <div className="ixInsetMuted">[Insert Full Name]</div>
                <div className="ixInsetMuted">[Insert Address]</div>
              </div>
            </div>
          </CreamPanel>

          {/* DISCLAIMER section: left dark shell + right dark accordion list */}
          <section id="disclaimer" className="ixDisclaimerGrid">
            <div className="ixDarkShell">
              <div className="ixDarkShellTitle">Disclaimer</div>

              <div className="ixCreamInset">
                <div className="ixCreamInsetHead">
                  <span className="ixInsetPinkBadge">
                    <IconShield />
                  </span>
                  <div className="ixCreamInsetHeadText">Liability for Content</div>
                </div>

                <ul className="ixBullet">
                  <li>Liability for Content</li>
                  <li>Liability for Links</li>
                  <li>Copyright</li>
                </ul>
              </div>
            </div>

            <div className="ixAccStack">
              <DarkAccordion
                items={[
                  {
                    title: "Liability for Content",
                    icon: <IconShield />,
                    content:
                      "As a service provider, we are responsible for our own content on these pages according to general laws. However, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances indicating illegal activity.",
                  },
                  {
                    title: "Liability for Links",
                    icon: <IconLink />,
                    content:
                      "Our website may contain links to external websites of third parties. We have no influence on the contents of those websites. Therefore, we cannot assume any liability for external content.",
                  },
                  {
                    title: "Copyright",
                    icon: <IconCopyright />,
                    content:
                      "The content and works created by the site operators on these pages are subject to copyright law. Reproduction, editing, distribution, or any form of commercialization beyond the scope of copyright law requires written consent.",
                  },
                ]}
              />
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

/* ---------------- Sidebar Nav ---------------- */

function SideNavCard({ title, sections, activeId, onClick, variant }) {
  return (
    <div className={`ixNavCard ${variant}`}>
      <div className="ixNavTitle">{title}</div>

      <div className="ixNavLinks">
        {sections.map((s) => {
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              className={`ixNavLink ${isActive ? "active" : ""}`}
              onClick={() => onClick(s.id)}
            >
              <span className="ixDot" aria-hidden="true" />
              <span className="ixNavText">{s.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Cream Panel (big card) ---------------- */

function CreamPanel({ id, title, children }) {
  return (
    <section id={id} className="ixCreamPanel">
      <div className="ixCreamTitle">{title}</div>
      <div className="ixCreamBody">{children}</div>
    </section>
  );
}

/* ---------------- Provider board (nested dark card) ---------------- */

function ProviderBoard({ id, name, sub }) {
  return (
    <section id={id} className="ixProviderWrap">
      <div className="ixProviderBoard">
        <div className="ixProviderTop">
          <div className="ixProviderTopTitle">Service Provider</div>
        </div>

        <div className="ixProviderPinkBar">
          <div className="ixProviderName">{name}</div>
          <div className="ixProviderSub">{sub}</div>
        </div>

        <div className="ixProviderTable">
          <ProviderRow
            icon={<IconPin />}
            label="Registered Office:"
            value="[Insert Full Legal Address Here]"
            tone="pink"
          />

          <ProviderRow
            icon={<IconBuilding />}
            label="Commercial Register:"
            value={
              <>
                <div>Registered at: [Insert Register Court]</div>
                <div>Registration Number: [Insert HRB Number]</div>
              </>
            }
            tone="slate"
          />

          <ProviderRow
            icon={<IconUser />}
            label="Managing Director:"
            value="[Insert Full Legal Name]"
            tone="slate"
          />

          <ProviderRow
            icon={<IconTag />}
            label="VAT Identification Number:"
            value="[Insert VAT ID if applicable]"
            tone="pink"
          />

          <ProviderRow
            icon={<IconPhone />}
            label="Contact:"
            value={
              <>
                <div>Phone: [Insert Phone Number]</div>
                <div>Email: [Insert Official Email Address]</div>
              </>
            }
            tone="pink"
          />

          <ProviderRow
            icon={<IconGlobe />}
            label="Website:"
            value="www.praktikax.com"
            tone="slate"
            last
          />
        </div>
      </div>
    </section>
  );
}

function ProviderRow({ icon, label, value, tone = "slate", last = false }) {
  return (
    <div className={`ixRow ${last ? "last" : ""}`}>
      <div className={`ixRowIcon ${tone}`}>{icon}</div>
      <div className="ixRowLabel">{label}</div>
      <div className="ixRowValue">{value}</div>
    </div>
  );
}

/* ---------------- Dark Accordion (screenshot-like) ---------------- */

function DarkAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="ixDarkAccordion">
      {items.map((it, idx) => {
        const open = idx === openIndex;
        return (
          <div key={it.title} className={`ixDarkAccItem ${open ? "open" : ""}`}>
            <button
              className="ixDarkAccBtn"
              onClick={() => setOpenIndex(open ? -1 : idx)}
              aria-expanded={open}
            >
              <div className="ixDarkAccLeft">
                <span className="ixDarkAccIcon">{it.icon}</span>
                <span className="ixDarkAccTitle">{it.title}</span>
              </div>

              <span className="ixDarkAccChevron" aria-hidden="true">
                <IconChevron />
              </span>
            </button>

            <div className="ixDarkAccPanel">
              <div className="ixDarkAccPanelInner">{it.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Icons ---------------- */

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
      <path
        d="M7 10l5 5 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconShield() {
  return (
    <Svg>
      <path
        d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconPin() {
  return (
    <Svg>
      <path
        d="M12 22s7-4.5 7-12a7 7 0 10-14 0c0 7.5 7 12 7 12z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 10.5a2.2 2.2 0 110-4.4 2.2 2.2 0 010 4.4z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </Svg>
  );
}

function IconBuilding() {
  return (
    <Svg>
      <path
        d="M4 21V5a2 2 0 012-2h8a2 2 0 012 2v16"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M18 21V9h2a2 2 0 012 2v10"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 7h4M8 11h4M8 15h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function IconUser() {
  return (
    <Svg>
      <path
        d="M12 12a4 4 0 100-8 4 4 0 000 8z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 21a8 8 0 0116 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function IconTag() {
  return (
    <Svg>
      <path
        d="M3 12l9 9 9-9-9-9H7L3 7v5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 7.5h.01"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function IconPhone() {
  return (
    <Svg>
      <path
        d="M22 16.9v3a2 2 0 01-2.2 2A19.8 19.8 0 012 6.2 2 2 0 014 4h3a2 2 0 012 1.7c.1.8.3 1.6.6 2.3a2 2 0 01-.5 2.1L8 11a16 16 0 007 7l.9-1.1a2 2 0 012.1-.5c.7.3 1.5.5 2.3.6a2 2 0 011.7 1.9z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconGlobe() {
  return (
    <Svg>
      <path
        d="M12 22a10 10 0 100-20 10 10 0 000 20z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 2a15 15 0 010 20" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2a15 15 0 000 20" stroke="currentColor" strokeWidth="2" />
    </Svg>
  );
}

function IconLink() {
  return (
    <Svg>
      <path
        d="M10 13a5 5 0 007 0l2-2a5 5 0 00-7-7l-1 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 11a5 5 0 01-7 0l-2 2a5 5 0 007 7l1-1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function IconCopyright() {
  return (
    <Svg>
      <path
        d="M12 22a10 10 0 100-20 10 10 0 000 20z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M14.5 9.5a3 3 0 10.1 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

/* ---------------- CSS ---------------- */

const styles = `
:root{
  --pink:#C51F5D;
  --slate:#243447;
  --navy:#141D26;
  --cream:#E2E2D2;

  --white: rgba(255,255,255,.92);
  --white2: rgba(255,255,255,.72);
  --line: rgba(255,255,255,.10);

  --shadow: 0 22px 70px rgba(0,0,0,.38);
  --shadow2: 0 14px 36px rgba(0,0,0,.26);

  --rXL: 28px;
  --rLG: 22px;
  --rMD: 18px;
}

*{ box-sizing:border-box; }
html,body{ height:100%; }
body{
  margin:0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
  background: #0b1220;
}

/* Root */
.ixRoot{
  min-height: 100vh;
  position: relative;
  padding: 18px 0 60px;
}

/* Background (like screenshot) */
.ixBg{
  position: fixed;
  inset: 0;
  z-index: -5;
  background:
    radial-gradient(1400px 900px at 20% 10%, rgba(36,52,71,.85), transparent 55%),
    radial-gradient(1200px 800px at 80% 20%, rgba(20,29,38,.92), transparent 55%),
    linear-gradient(180deg, #0a1322 0%, #0b1526 55%, #0a1322 100%);
}
.ixBgNoise{
  position:absolute; inset:0;
  opacity:.08;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.28'/%3E%3C/svg%3E");
  background-size: 240px 240px;
}

.ixShape{
  position:absolute;
  inset:auto;
  filter: blur(0px);
  opacity: .45;
  background: linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,0));
  border: 1px solid rgba(255,255,255,.05);
}
.ixShapeA{
  width: 620px; height: 380px;
  right: -140px; top: 120px;
  border-radius: 60px;
  transform: rotate(10deg);
}
.ixShapeB{
  width: 700px; height: 520px;
  right: -220px; top: 420px;
  border-radius: 80px;
  transform: rotate(-8deg);
  opacity: .25;
}

.ixPinkCorner{
  position:absolute;
  width: 380px; height: 380px;
  left: -190px; top: 640px;
  background: radial-gradient(circle at 70% 30%, rgba(197,31,93,.95), rgba(197,31,93,0) 70%);
  opacity: .65;
}

/* Hero */
.ixHero{
  max-width: 1160px;
  margin: 0 auto;
  padding: 12px 18px 10px;
}
.ixHeroInner{
  display:flex;
  flex-direction:column;
  gap: 10px;
}
.ixH1{
  margin:0;
  color: var(--white);
  font-size: 54px;
  letter-spacing: .2px;
  line-height: 1;
  text-shadow: 0 16px 36px rgba(0,0,0,.45);
}
.ixUnderline{
  width: 340px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--pink), rgba(197,31,93,0));
}

/* Layout grid */
.ixGrid{
  max-width: 1160px;
  margin: 0 auto;
  padding: 14px 18px 0;
  display:grid;
  grid-template-columns: 300px 1fr;
  gap: 22px;
  align-items:start;
}

/* Sidebar */
.ixSidebar{
  display:flex;
  flex-direction:column;
  gap: 18px;
}

/* Nav cards */
.ixNavCard{
  border-radius: var(--rXL);
  padding: 16px;
  box-shadow: var(--shadow2);
}
.ixNavCard.dark{
  background: linear-gradient(180deg, rgba(36,52,71,.72), rgba(20,29,38,.72));
  border: 1px solid rgba(255,255,255,.12);
}
.ixNavCard.light{
  background: linear-gradient(180deg, rgba(226,226,210,.92), rgba(226,226,210,.78));
  border: 1px solid rgba(255,255,255,.35);
}

.ixNavTitle{
  font-size: 12px;
  letter-spacing: .18em;
  font-weight: 900;
  margin-bottom: 12px;
  color: rgba(255,255,255,.72);
}
.ixNavCard.light .ixNavTitle{
  color: rgba(20,29,38,.62);
}

.ixNavLinks{
  display:flex;
  flex-direction:column;
  gap: 10px;
}

.ixNavLink{
  width:100%;
  border: 0;
  text-align:left;
  display:flex;
  gap: 10px;
  padding: 12px 12px;
  border-radius: 16px;
  cursor:pointer;
  background: rgba(255,255,255,.06);
  color: rgba(255,255,255,.86);
  border: 1px solid rgba(255,255,255,.06);
  transition: transform .15s ease, background .15s ease, border-color .15s ease;
}
.ixNavCard.light .ixNavLink{
  background: rgba(20,29,38,.06);
  color: rgba(20,29,38,.84);
  border-color: rgba(20,29,38,.06);
}
.ixNavLink:hover{ transform: translateY(-1px); }
.ixNavLink.active{
  background: linear-gradient(135deg, rgba(197,31,93,.95), rgba(197,31,93,.62));
  border-color: rgba(255,255,255,.16);
  color: #fff;
}
.ixNavCard.light .ixNavLink.active{
  border-color: rgba(255,255,255,.30);
}
.ixDot{
  width: 8px; height: 8px;
  border-radius: 999px;
  background: rgba(255,255,255,.62);
  margin-top: 7px;
  flex: 0 0 auto;
}
.ixNavCard.light .ixDot{ background: rgba(20,29,38,.35); }
.ixNavLink.active .ixDot{ background: rgba(255,255,255,.92); }
.ixNavText{
  font-size: 14px;
  line-height: 1.25;
  font-weight: 700;
}

/* Content stack */
.ixContent{
  display:flex;
  flex-direction:column;
  gap: 22px;
}

/* Cream panel (big) */
.ixCreamPanel{
  border-radius: var(--rXL);
  padding: 18px 18px 16px;
  background:
    radial-gradient(900px 420px at 15% 0%, rgba(255,255,255,.45), transparent 60%),
    linear-gradient(180deg, rgba(226,226,210,.92) 0%, rgba(226,226,210,.82) 100%);
  border: 1px solid rgba(255,255,255,.35);
  box-shadow: var(--shadow);
  overflow:hidden;
  scroll-margin-top: 90px;
}
.ixCreamTitle{
  color: rgba(20,29,38,.88);
  font-weight: 900;
  font-size: 24px;
  letter-spacing: .1px;
  margin-bottom: 14px;
}
.ixCreamBody{
  padding: 8px 0 2px;
}

/* Provider board wrap */
.ixProviderWrap{
  border-radius: var(--rXL);
}
.ixProviderBoard{
  border-radius: var(--rXL);
  overflow:hidden;
  background: linear-gradient(180deg, rgba(20,29,38,.92), rgba(20,29,38,.86));
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: 0 18px 44px rgba(0,0,0,.30);
}
.ixProviderTop{
  padding: 14px 16px;
  background: linear-gradient(180deg, rgba(36,52,71,.65), rgba(36,52,71,.35));
  border-bottom: 1px solid rgba(255,255,255,.08);
}
.ixProviderTopTitle{
  color: rgba(255,255,255,.92);
  font-weight: 900;
  font-size: 20px;
}
.ixProviderPinkBar{
  padding: 18px 16px;
  background: linear-gradient(135deg, rgba(197,31,93,.98), rgba(197,31,93,.70));
  border-bottom: 1px solid rgba(255,255,255,.10);
}
.ixProviderName{
  color:#fff;
  font-weight: 950;
  font-size: 24px;
  line-height: 1.05;
}
.ixProviderSub{
  margin-top: 6px;
  color: rgba(255,255,255,.92);
  font-weight: 650;
  opacity: .95;
}

/* provider table */
.ixProviderTable{
  margin: 14px;
  border-radius: var(--rLG);
  background: linear-gradient(180deg, rgba(226,226,210,.92), rgba(226,226,210,.86));
  border: 1px solid rgba(255,255,255,.22);
  overflow:hidden;
}
.ixRow{
  display:grid;
  grid-template-columns: 46px 220px 1fr;
  align-items:center;
  gap: 12px;
  padding: 14px 14px;
  border-bottom: 1px solid rgba(20,29,38,.10);
}
.ixRow.last{ border-bottom: 0; }
.ixRowIcon{
  width: 38px; height: 38px;
  border-radius: 12px;
  display:grid;
  place-items:center;
  border: 1px solid rgba(20,29,38,.10);
  color: #fff;
}
.ixRowIcon.pink{
  background: linear-gradient(135deg, rgba(197,31,93,.95), rgba(197,31,93,.72));
}
.ixRowIcon.slate{
  background: linear-gradient(135deg, rgba(36,52,71,.95), rgba(36,52,71,.72));
}

.ixRowLabel{
  font-weight: 900;
  color: rgba(20,29,38,.86);
}
.ixRowValue{
  color: rgba(20,29,38,.76);
  font-weight: 650;
  display:flex;
  flex-direction:column;
  gap: 6px;
}

/* RStV inset */
.ixInsetNote{
  border-radius: var(--rLG);
  background: rgba(20,29,38,.06);
  border: 1px solid rgba(20,29,38,.08);
  padding: 14px;
  display:flex;
  gap: 12px;
  align-items:flex-start;
}
.ixInsetIcon{
  width: 44px; height: 44px;
  border-radius: 14px;
  display:grid;
  place-items:center;
  background: rgba(197,31,93,.14);
  border: 1px solid rgba(20,29,38,.08);
  color: rgba(20,29,38,.85);
}
.ixInsetTitle{
  font-weight: 950;
  color: rgba(20,29,38,.88);
}
.ixInsetMuted{
  color: rgba(20,29,38,.70);
  margin-top: 4px;
  font-weight: 650;
}

/* Disclaimer grid (like screenshot) */
.ixDisclaimerGrid{
  display:grid;
  grid-template-columns: 320px 1fr;
  gap: 18px;
  scroll-margin-top: 90px;
}

/* Left dark shell */
.ixDarkShell{
  border-radius: var(--rXL);
  background: linear-gradient(180deg, rgba(36,52,71,.74), rgba(20,29,38,.78));
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: var(--shadow2);
  padding: 16px;
}
.ixDarkShellTitle{
  color: rgba(255,255,255,.92);
  font-weight: 950;
  font-size: 22px;
  margin-bottom: 14px;
}

.ixCreamInset{
  border-radius: var(--rLG);
  background: linear-gradient(180deg, rgba(226,226,210,.92), rgba(226,226,210,.84));
  border: 1px solid rgba(255,255,255,.22);
  padding: 14px;
}
.ixCreamInsetHead{
  display:flex;
  align-items:center;
  gap: 10px;
  margin-bottom: 10px;
}
.ixInsetPinkBadge{
  width: 38px; height: 38px;
  border-radius: 12px;
  display:grid;
  place-items:center;
  background: linear-gradient(135deg, rgba(197,31,93,.95), rgba(197,31,93,.70));
  color:#fff;
}
.ixCreamInsetHeadText{
  font-weight: 950;
  color: rgba(20,29,38,.86);
}
.ixBullet{
  margin: 0;
  padding-left: 18px;
  color: rgba(20,29,38,.74);
  font-weight: 650;
  display:flex;
  flex-direction:column;
  gap: 10px;
}

/* Right accordion stack */
.ixAccStack{
  display:flex;
  flex-direction:column;
  gap: 14px;
}

/* Dark accordion items */
.ixDarkAccordion{
  display:flex;
  flex-direction:column;
  gap: 14px;
}
.ixDarkAccItem{
  border-radius: var(--rXL);
  overflow:hidden;
  background: linear-gradient(180deg, rgba(36,52,71,.60), rgba(20,29,38,.72));
  border: 1px solid rgba(255,255,255,.10);
  box-shadow: var(--shadow2);
}
.ixDarkAccBtn{
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
.ixDarkAccLeft{
  display:flex;
  gap: 12px;
  align-items:center;
}
.ixDarkAccIcon{
  width: 40px; height: 40px;
  border-radius: 14px;
  display:grid;
  place-items:center;
  background: linear-gradient(135deg, rgba(197,31,93,.95), rgba(197,31,93,.70));
  border: 1px solid rgba(255,255,255,.10);
  color:#fff;
  flex: 0 0 auto;
}
.ixDarkAccTitle{
  color: rgba(255,255,255,.92);
  font-weight: 950;
  font-size: 18px;
}
.ixDarkAccChevron{
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
.ixDarkAccItem.open .ixDarkAccChevron{
  transform: rotate(180deg);
}

/* panel animation without clipping */
.ixDarkAccPanel{
  display:grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows .25s ease;
}
.ixDarkAccItem.open .ixDarkAccPanel{
  grid-template-rows: 1fr;
}
.ixDarkAccPanelInner{
  min-height: 0;
  overflow:hidden;
  padding: 0 16px 0;
  opacity: 0;
  transform: translateY(-4px);
  transition: padding .25s ease, opacity .2s ease, transform .2s ease;
  color: rgba(255,255,255,.70);
  line-height: 1.65;
  font-weight: 600;
}
.ixDarkAccItem.open .ixDarkAccPanelInner{
  padding: 0 16px 16px;
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 980px){
  .ixGrid{ grid-template-columns: 1fr; }
  .ixH1{ font-size: 44px; }
  .ixDisclaimerGrid{ grid-template-columns: 1fr; }
  .ixRow{ grid-template-columns: 46px 1fr; }
  .ixRowValue{ grid-column: 2 / -1; }
}
@media (max-width: 520px){
  .ixH1{ font-size: 38px; }
}
`;

