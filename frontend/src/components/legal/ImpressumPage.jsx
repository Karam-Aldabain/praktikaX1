import React, { useState } from "react";

const LEGAL_SECTIONS = [
  {
    id: "liability-content",
    title: "Liability for Content",
    text:
      "The contents of our pages have been created with the utmost care. However, we cannot guarantee the accuracy, completeness and timeliness of the content. As a service provider, we are responsible for our own content on these pages according to Â§ 7 para. 1 TMG under general law.",
  },
  {
    id: "liability-links",
    title: "Liability for Links",
    text:
      "Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the contents of the linked pages.",
  },
  {
    id: "copyright",
    title: "Copyright",
    text:
      "The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator.",
  },
];

export default function ImpressumPage() {
  const [openId, setOpenId] = useState(LEGAL_SECTIONS[0].id);

  return (
    <div className="impressum-page" id="top">
      <style>{styles}</style>

      <header className="impressum-hero">
        <p className="impressum-kicker">Legal Information</p>
        <h1>Impressum</h1>
        <p className="impressum-subtitle">Information according to Â§ 5 TMG</p>
      </header>

      <main className="impressum-layout">
        <aside className="impressum-sidebar">
          <div className="impressum-nav-card">
            <p className="impressum-nav-title">On this page</p>
            <a href="#company-info">Company Information</a>
            <a href="#contact-info">Contact Information</a>
            <a href="#register-info">Commercial Register</a>
            <a href="#tax-info">VAT and Tax</a>
            <a href="#responsible-content">Responsible for Content</a>
            <a href="#disclaimer">Disclaimer</a>
          </div>
        </aside>

        <section className="impressum-content">
          <section className="impressum-card" id="company-info">
            <h2>Company Information</h2>
            <div className="impressum-grid two-col">
              <InfoRow label="Company" value="HOPN UG (limited liability)" />
              <InfoRow
                label="Represented by"
                value="Managing Director: Prof. Dr.-Ing. Ahmed Ebada"
              />
              <InfoRow
                label="Address"
                value={
                  <>
                    Weichter Str. 1
                    <br />
                    86807 Buchloe
                    <br />
                    Germany
                  </>
                }
              />
            </div>
          </section>

          <section className="impressum-card" id="contact-info">
            <h2>Contact Information</h2>
            <div className="impressum-grid two-col">
              <InfoRow
                label="Email"
                value={
                  <a href="mailto:info@praktix.hopn.eu">
info@praktix.hopn.eu</a>
                }
              />
              <InfoRow
                label="Phone"
                value={<a href="tel:+491794170592">+49 179 4170592</a>}
              />
              <InfoRow
                label="Website"
                value={
                  <a
                    href="https://www.praktix.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.praktix.com
                  </a>
                }
              />
            </div>
          </section>

          <section className="impressum-card" id="register-info">
            <h2>Entry in the Commercial Register</h2>
            <div className="impressum-grid two-col">
              <InfoRow
                label="Register Court"
                value="Local Court Kempten (Allgäu)"
              />
              <InfoRow label="Registration Number" value="HRB 17191" />
            </div>
          </section>

          <section className="impressum-card" id="tax-info">
            <h2>VAT Number and Tax Number</h2>
            <div className="impressum-grid two-col">
              <InfoRow
                label="VAT identification number according to Â§ 27a UStG"
                value="DE365178670"
              />
              <InfoRow label="Tax Number" value="125/128/70641" />
            </div>
          </section>

          <section className="impressum-card" id="responsible-content">
            <h2>Responsible for Content</h2>
            <div className="impressum-grid one-col">
              <InfoRow
                label="Responsible for content according to Â§ 55 para. 2 RStV"
                value="Prof. Dr.-Ing. Ahmed Ebada"
              />
            </div>
          </section>

          <section className="impressum-card" id="disclaimer">
            <h2>Disclaimer</h2>
            <div className="impressum-accordion">
              {LEGAL_SECTIONS.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <article
                    key={item.id}
                    className={`impressum-acc-item ${isOpen ? "open" : ""}`}
                  >
                    <button
                      className="impressum-acc-trigger"
                      onClick={() => setOpenId(isOpen ? "" : item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`${item.id}-panel`}
                    >
                      <span>{item.title}</span>
                      <span className="impressum-acc-icon">
                        {isOpen ? "-" : "+"}
                      </span>
                    </button>
                    <div id={`${item.id}-panel`} className="impressum-acc-panel">
                      <p>{item.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="impressum-info-row">
      <p className="impressum-label">{label}</p>
      <div className="impressum-value">{value}</div>
    </div>
  );
}

const styles = `
.impressum-page {
  min-height: 100vh;
  background: linear-gradient(90deg, #06153d 0%, #03113a 35%, #010a2a 65%, #00061f 100%);
  color: #222b38;
  padding: 36px 20px 64px;
}

.impressum-hero,
.impressum-layout {
  max-width: 1180px;
  margin: 0 auto;
}

.impressum-hero {
  margin-bottom: 22px;
}

.impressum-kicker {
  margin: 0 0 10px;
  font-size: 0.82rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 800;
  color: #c51f5d;
}

.impressum-hero h1 {
  margin: 0;
  font-size: clamp(2.1rem, 4vw, 3.3rem);
  line-height: 1.05;
  color: #101b2f;
}

.impressum-subtitle {
  margin: 12px 0 0;
  font-size: 1.04rem;
  color: #5f6877;
  font-weight: 600;
}

.impressum-layout {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}

.impressum-sidebar {
  position: sticky;
  top: 92px;
}

.impressum-nav-card {
  border-radius: 22px;
  background: linear-gradient(160deg, #102449, #0f1c32 56%, #162c4f);
  box-shadow: 0 18px 40px rgba(15, 25, 44, 0.24);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.impressum-nav-title {
  margin: 0 0 6px;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.74);
  font-weight: 700;
}

.impressum-nav-card a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.93);
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.3;
  border-radius: 12px;
  padding: 9px 10px;
  transition: background 0.2s ease, transform 0.2s ease;
}

.impressum-nav-card a:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-1px);
}

.impressum-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.impressum-card {
  border-radius: 26px;
  border: 1px solid rgba(17, 29, 48, 0.08);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 248, 245, 0.93));
  box-shadow: 0 16px 36px rgba(25, 37, 56, 0.1);
  padding: 20px;
}

.impressum-card h2 {
  margin: 0 0 14px;
  color: #14243e;
  font-size: clamp(1.12rem, 1.9vw, 1.55rem);
}

.impressum-grid {
  display: grid;
  gap: 12px;
}

.impressum-grid.two-col {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.impressum-grid.one-col {
  grid-template-columns: minmax(0, 1fr);
}

.impressum-info-row {
  border-radius: 16px;
  border: 1px solid rgba(17, 29, 48, 0.08);
  background: rgba(255, 255, 255, 0.72);
  padding: 12px 14px;
}

.impressum-label {
  margin: 0;
  color: #5e6774;
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.impressum-value {
  margin-top: 5px;
  color: #1c2635;
  font-size: 1.02rem;
  font-weight: 600;
  line-height: 1.5;
}

.impressum-value a {
  color: #c51f5d;
  text-decoration: none;
  font-weight: 700;
}

.impressum-value a:hover {
  text-decoration: underline;
}

.impressum-accordion {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.impressum-acc-item {
  border-radius: 16px;
  border: 1px solid rgba(17, 29, 48, 0.1);
  background: #fff;
  overflow: hidden;
}

.impressum-acc-trigger {
  width: 100%;
  border: 0;
  background: transparent;
  padding: 14px 16px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1b2638;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
}

.impressum-acc-icon {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid rgba(17, 29, 48, 0.15);
  color: #c51f5d;
}

.impressum-acc-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.28s ease;
}

.impressum-acc-panel p {
  margin: 0;
  padding: 0 16px 16px;
  color: #4a5566;
  font-size: 0.98rem;
  line-height: 1.65;
}

.impressum-acc-item.open .impressum-acc-panel {
  max-height: 260px;
}

@media (max-width: 980px) {
  .impressum-layout {
    grid-template-columns: 1fr;
  }

  .impressum-sidebar {
    position: static;
  }

  .impressum-nav-card {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 6px;
  }

  .impressum-nav-title {
    width: 100%;
  }

  .impressum-nav-card a {
    background: rgba(255, 255, 255, 0.08);
    font-size: 0.9rem;
  }
}

@media (max-width: 720px) {
  .impressum-page {
    padding: 20px 12px 40px;
  }

  .impressum-card {
    border-radius: 18px;
    padding: 14px;
  }

  .impressum-grid.two-col {
    grid-template-columns: 1fr;
  }
}
`;

