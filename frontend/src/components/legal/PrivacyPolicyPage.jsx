import React, { useEffect, useMemo, useState } from "react";

export default function PrivacyPolicyPage() {
  const sections = useMemo(
    () => [
      { id: "overview", label: "Overview" },
      { id: "controller", label: "Data Controller" },
      { id: "collection", label: "Data We Collect" },
      { id: "purposes", label: "Purpose and Legal Basis" },
      { id: "sharing", label: "Data Sharing" },
      { id: "retention", label: "Retention" },
      { id: "rights", label: "Your GDPR Rights" },
      { id: "cookies", label: "Cookies and Tracking" },
      { id: "security", label: "Security" },
      { id: "changes", label: "Changes to Policy" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const elements = sections.map((s) => document.getElementById(s.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-90px 0px -55% 0px",
        threshold: [0.05, 0.2, 0.4, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="ppRoot">
      <style>{styles}</style>

      <div className="ppBg" aria-hidden="true">
        <div className="ppNoise" />
        <div className="ppShape ppShapeA" />
        <div className="ppShape ppShapeB" />
      </div>

      <header className="ppHero">
        <div className="ppHeroInner">
          <h1 className="ppTitle">Privacy Policy</h1>
          <p className="ppSubtitle">Effective Date: February 15, 2026</p>
          <div className="ppUnderline" />
        </div>
      </header>

      <main className="ppGrid">
        <aside className="ppSidebar">
          <SideNavCard
            title="ON THIS PAGE"
            sections={sections}
            activeId={activeId}
            onClick={scrollTo}
            variant="dark"
          />

          <SideNavCard
            title="QUICK NAV"
            sections={sections}
            activeId={activeId}
            onClick={scrollTo}
            variant="light"
          />
        </aside>

        <section className="ppContent">
          <CreamPanel id="overview" title="Overview">
            <p className="ppText">
              We process personal data in accordance with the General Data Protection Regulation (GDPR)
              and applicable data protection laws. This policy explains what data we collect, why we
              collect it, and the rights you have over your data.
            </p>
          </CreamPanel>

          <CreamPanel id="controller" title="Data Controller">
            <div className="ppInfoCard">
              <div className="ppInfoTitle">PraktikaX</div>
              <div className="ppInfoMuted">Operated by HOPn UG (haftungsbeschraenkt)</div>
              <div className="ppInfoMuted">[Insert Full Legal Address]</div>
              <div className="ppInfoMuted">Email: [Insert Legal Email]</div>
            </div>
          </CreamPanel>

          <CreamPanel id="collection" title="Data We Collect">
            <ul className="ppList">
              <li>Name and contact details (email, phone)</li>
              <li>Professional and educational background</li>
              <li>Application and mentorship-related information</li>
              <li>Technical information (IP address, browser, device data)</li>
              <li>Platform usage and analytics data</li>
            </ul>
          </CreamPanel>

          <CreamPanel id="purposes" title="Purpose and Legal Basis">
            <div className="ppTwoCol">
              <div className="ppDarkCard">
                <div className="ppDarkTitle">Purpose of Processing</div>
                <ul className="ppDarkList">
                  <li>Program applications and participant matching</li>
                  <li>Mentorship and institutional coordination</li>
                  <li>Service delivery and quality improvement</li>
                  <li>Security, fraud prevention, and compliance</li>
                </ul>
              </div>

              <div className="ppDarkCard">
                <div className="ppDarkTitle">Legal Basis</div>
                <ul className="ppDarkList">
                  <li>Consent (Art. 6(1)(a) GDPR)</li>
                  <li>Contract performance (Art. 6(1)(b) GDPR)</li>
                  <li>Legal obligation (Art. 6(1)(c) GDPR)</li>
                  <li>Legitimate interests (Art. 6(1)(f) GDPR)</li>
                </ul>
              </div>
            </div>
          </CreamPanel>

          <CreamPanel id="sharing" title="Data Sharing">
            <p className="ppText">
              We may share data with partner institutions, mentors, service providers, and competent
              authorities where legally required. Where processors are used, we ensure suitable contractual
              and technical safeguards.
            </p>
          </CreamPanel>

          <CreamPanel id="retention" title="Retention">
            <p className="ppText">
              Personal data is retained only as long as necessary for the purposes stated in this policy,
              contractual requirements, and legal retention obligations.
            </p>
          </CreamPanel>

          <section id="rights" className="ppRightsWrap">
            <div className="ppRightsIntro">
              <div className="ppRightsTitle">Your GDPR Rights</div>
              <ul className="ppList compact">
                <li>Access, correction, and deletion</li>
                <li>Restriction and objection to processing</li>
                <li>Data portability</li>
                <li>Withdrawal of consent at any time</li>
                <li>Complaint to a supervisory authority</li>
              </ul>
            </div>

            <RightsAccordion
              items={[
                {
                  title: "Access and Rectification",
                  content:
                    "You may request confirmation of whether we process your personal data and request correction of inaccurate or incomplete information.",
                },
                {
                  title: "Erasure and Restriction",
                  content:
                    "In specific situations, you may request deletion of personal data or restriction of processing, subject to legal and contractual requirements.",
                },
                {
                  title: "Portability and Objection",
                  content:
                    "Where legally applicable, you may receive your data in a structured format and object to certain processing based on legitimate interests.",
                },
              ]}
            />
          </section>

          <CreamPanel id="cookies" title="Cookies and Tracking">
            <p className="ppText">
              We use cookies and similar technologies to operate the platform, improve user experience,
              and analyze traffic. You can manage preferences through the cookie banner and browser settings.
            </p>
          </CreamPanel>

          <CreamPanel id="security" title="Security">
            <p className="ppText">
              We implement appropriate technical and organizational measures to protect personal data against
              unauthorized access, loss, alteration, and misuse.
            </p>
          </CreamPanel>

          <CreamPanel id="changes" title="Changes to This Policy">
            <p className="ppText">
              We may update this policy from time to time. Material changes will be communicated through
              the website or other suitable channels.
            </p>
          </CreamPanel>

          <CreamPanel id="contact" title="Contact">
            <div className="ppInfoCard">
              <div className="ppInfoTitle">Privacy Contact</div>
              <div className="ppInfoMuted">Email: [Insert Data Protection Email]</div>
              <div className="ppInfoMuted">Address: [Insert Legal Address]</div>
            </div>
          </CreamPanel>
        </section>
      </main>
    </div>
  );
}

function SideNavCard({ title, sections, activeId, onClick, variant }) {
  return (
    <div className={`ppNavCard ${variant}`}>
      <div className="ppNavTitle">{title}</div>

      <div className="ppNavLinks">
        {sections.map((s) => {
          const isActive = s.id === activeId;

          return (
            <button
              key={s.id}
              type="button"
              className={`ppNavLink ${isActive ? "active" : ""}`}
              onClick={() => onClick(s.id)}
            >
              <span className="ppDot" aria-hidden="true" />
              <span className="ppNavText">{s.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CreamPanel({ id, title, children }) {
  return (
    <section id={id} className="ppCreamPanel">
      <div className="ppCreamTitle">{title}</div>
      <div className="ppCreamBody">{children}</div>
    </section>
  );
}

function RightsAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="ppAccordion">
      {items.map((item, idx) => {
        const open = idx === openIndex;

        return (
          <div key={item.title} className={`ppAccItem ${open ? "open" : ""}`}>
            <button
              type="button"
              className="ppAccBtn"
              onClick={() => setOpenIndex(open ? -1 : idx)}
              aria-expanded={open}
            >
              <span className="ppAccBtnText">{item.title}</span>
              <span className="ppChevron" aria-hidden="true">?</span>
            </button>

            <div className="ppAccPanel">
              <div className="ppAccPanelInner">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = `
:root{
  --pp-pink:#C51F5D;
  --pp-slate:#243447;
  --pp-navy:#141D26;
  --pp-cream:#E2E2D2;
}

*{ box-sizing:border-box; }

.ppRoot{
  min-height: 100vh;
  position: relative;
  padding: 18px 0 60px;
  color: rgba(255,255,255,.92);
}

.ppBg{
  position: fixed;
  inset: 0;
  z-index: -5;
  background:
    radial-gradient(1400px 900px at 20% 10%, rgba(36,52,71,.85), transparent 55%),
    radial-gradient(1200px 800px at 80% 20%, rgba(20,29,38,.92), transparent 55%),
    linear-gradient(180deg, #0a1322 0%, #0b1526 55%, #0a1322 100%);
}

.ppNoise{
  position:absolute;
  inset:0;
  opacity:.08;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.28'/%3E%3C/svg%3E");
  background-size: 240px 240px;
}

.ppShape{
  position:absolute;
  border-radius: 80px;
  border: 1px solid rgba(255,255,255,.05);
  background: linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,0));
}

.ppShapeA{
  width: 620px;
  height: 380px;
  right: -140px;
  top: 120px;
  transform: rotate(10deg);
}

.ppShapeB{
  width: 700px;
  height: 520px;
  right: -220px;
  top: 420px;
  transform: rotate(-8deg);
  opacity: .25;
}

.ppHero{
  max-width: 1160px;
  margin: 0 auto;
  padding: 12px 18px 10px;
}

.ppHeroInner{
  display:flex;
  flex-direction:column;
  gap: 10px;
}

.ppTitle{
  margin:0;
  font-size: 54px;
  line-height: 1;
  text-shadow: 0 16px 36px rgba(0,0,0,.45);
}

.ppSubtitle{
  margin:0;
  color: rgba(255,255,255,.75);
  font-size: 15px;
  font-weight: 600;
}

.ppUnderline{
  width: 340px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--pp-pink), rgba(197,31,93,0));
}

.ppGrid{
  max-width: 1160px;
  margin: 0 auto;
  padding: 14px 18px 0;
  display:grid;
  grid-template-columns: 300px 1fr;
  gap: 22px;
  align-items:start;
}

.ppSidebar{
  display:flex;
  flex-direction:column;
  gap: 18px;
  position: sticky;
  top: 92px;
}

.ppNavCard{
  border-radius: 28px;
  padding: 16px;
  box-shadow: 0 14px 36px rgba(0,0,0,.26);
}

.ppNavCard.dark{
  background: linear-gradient(180deg, rgba(36,52,71,.72), rgba(20,29,38,.72));
  border: 1px solid rgba(255,255,255,.12);
}

.ppNavCard.light{
  background: linear-gradient(180deg, rgba(226,226,210,.92), rgba(226,226,210,.78));
  border: 1px solid rgba(255,255,255,.35);
}

.ppNavTitle{
  font-size: 12px;
  letter-spacing: .18em;
  font-weight: 900;
  margin-bottom: 12px;
  color: rgba(255,255,255,.72);
}

.ppNavCard.light .ppNavTitle{
  color: rgba(20,29,38,.62);
}

.ppNavLinks{
  display:flex;
  flex-direction:column;
  gap: 10px;
}

.ppNavLink{
  width:100%;
  border: 0;
  text-align:left;
  display:flex;
  gap: 10px;
  padding: 11px 12px;
  border-radius: 16px;
  cursor:pointer;
  background: rgba(255,255,255,.06);
  color: rgba(255,255,255,.88);
  border: 1px solid rgba(255,255,255,.06);
  transition: transform .15s ease, background .15s ease, border-color .15s ease;
}

.ppNavCard.light .ppNavLink{
  background: rgba(20,29,38,.06);
  color: rgba(20,29,38,.84);
  border-color: rgba(20,29,38,.06);
}

.ppNavLink:hover{
  transform: translateY(-1px);
}

.ppNavLink.active{
  background: linear-gradient(135deg, rgba(197,31,93,.95), rgba(197,31,93,.62));
  border-color: rgba(255,255,255,.16);
  color: #fff;
}

.ppDot{
  width: 8px;
  height: 8px;
  margin-top: 7px;
  border-radius: 999px;
  background: rgba(255,255,255,.62);
  flex: 0 0 auto;
}

.ppNavCard.light .ppDot{
  background: rgba(20,29,38,.35);
}

.ppNavLink.active .ppDot{
  background: rgba(255,255,255,.92);
}

.ppNavText{
  font-size: 13px;
  line-height: 1.25;
  font-weight: 700;
}

.ppContent{
  display:flex;
  flex-direction:column;
  gap: 22px;
}

.ppCreamPanel{
  border-radius: 28px;
  padding: 18px 18px 16px;
  background:
    radial-gradient(900px 420px at 15% 0%, rgba(255,255,255,.45), transparent 60%),
    linear-gradient(180deg, rgba(226,226,210,.92) 0%, rgba(226,226,210,.82) 100%);
  border: 1px solid rgba(255,255,255,.35);
  box-shadow: 0 22px 70px rgba(0,0,0,.38);
  overflow:hidden;
  scroll-margin-top: 90px;
}

.ppCreamTitle{
  color: rgba(20,29,38,.88);
  font-weight: 900;
  font-size: 24px;
  letter-spacing: .1px;
  margin-bottom: 14px;
}

.ppCreamBody{
  color: rgba(20,29,38,.78);
  font-weight: 650;
}

.ppText{
  margin:0;
  line-height: 1.65;
}

.ppInfoCard{
  border-radius: 22px;
  padding: 14px;
  background: rgba(20,29,38,.06);
  border: 1px solid rgba(20,29,38,.08);
  display:grid;
  gap: 6px;
}

.ppInfoTitle{
  color: rgba(20,29,38,.88);
  font-weight: 950;
  font-size: 19px;
}

.ppInfoMuted{
  color: rgba(20,29,38,.72);
}

.ppList{
  margin:0;
  padding-left: 20px;
  display:grid;
  gap: 9px;
  line-height: 1.55;
}

.ppList.compact{
  gap: 7px;
}

.ppTwoCol{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.ppDarkCard{
  border-radius: 22px;
  padding: 14px;
  background: linear-gradient(180deg, rgba(36,52,71,.84), rgba(20,29,38,.88));
  border: 1px solid rgba(255,255,255,.10);
  color: rgba(255,255,255,.88);
}

.ppDarkTitle{
  font-size: 17px;
  font-weight: 900;
  margin-bottom: 10px;
}

.ppDarkList{
  margin:0;
  padding-left: 18px;
  display:grid;
  gap: 8px;
  color: rgba(255,255,255,.78);
}

.ppRightsWrap{
  display:grid;
  grid-template-columns: 320px 1fr;
  gap: 18px;
  scroll-margin-top: 90px;
}

.ppRightsIntro{
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(36,52,71,.74), rgba(20,29,38,.78));
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: 0 14px 36px rgba(0,0,0,.26);
  padding: 16px;
  color: rgba(255,255,255,.9);
}

.ppRightsTitle{
  font-size: 22px;
  font-weight: 950;
  margin-bottom: 12px;
}

.ppAccordion{
  display:flex;
  flex-direction:column;
  gap: 14px;
}

.ppAccItem{
  border-radius: 28px;
  overflow:hidden;
  background: linear-gradient(180deg, rgba(36,52,71,.60), rgba(20,29,38,.72));
  border: 1px solid rgba(255,255,255,.10);
  box-shadow: 0 14px 36px rgba(0,0,0,.26);
}

.ppAccBtn{
  width:100%;
  border:0;
  background: transparent;
  padding: 16px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;
  color: rgba(255,255,255,.92);
  cursor:pointer;
}

.ppAccBtnText{
  font-weight: 900;
  font-size: 18px;
  text-align: left;
}

.ppChevron{
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display:grid;
  place-items:center;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.10);
  transition: transform .2s ease;
}

.ppAccItem.open .ppChevron{
  transform: rotate(180deg);
}

.ppAccPanel{
  display:grid;
  grid-template-rows: 0fr;
  overflow:hidden;
  transition: grid-template-rows .25s ease;
}

.ppAccItem.open .ppAccPanel{
  grid-template-rows: 1fr;
}

.ppAccPanelInner{
  min-height: 0;
  overflow:hidden;
  padding: 0 16px 0;
  opacity: 0;
  transform: translateY(-4px);
  transition: padding .25s ease, opacity .2s ease, transform .2s ease;
  color: rgba(255,255,255,.74);
  line-height: 1.6;
}

.ppAccItem.open .ppAccPanelInner{
  padding: 0 16px 16px;
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 980px){
  .ppGrid{ grid-template-columns: 1fr; }
  .ppSidebar{ position: static; }
  .ppTitle{ font-size: 44px; }
  .ppRightsWrap{ grid-template-columns: 1fr; }
  .ppTwoCol{ grid-template-columns: 1fr; }
}

@media (max-width: 520px){
  .ppTitle{ font-size: 38px; }
}
`;
