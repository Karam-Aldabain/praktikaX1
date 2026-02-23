import React from "react";

const TERMS_SECTIONS = [
  { id: "scope-acceptance", title: "1. Scope and Acceptance" },
  { id: "event-overview", title: "2. Event Overview" },
  { id: "registration", title: "3. Registration and Participation" },
  { id: "tickets", title: "4. Tickets, Fees, and Payments" },
  { id: "exhibitors", title: "5. Exhibitors, Sponsors, and Partners" },
  { id: "speakers", title: "6. Speakers and Content Contributions" },
  { id: "volunteers", title: "7. Volunteers" },
  { id: "conduct", title: "8. Code of Conduct" },
  { id: "ip", title: "9. Intellectual Property" },
  { id: "media", title: "10. Photography, Video, and Media" },
  { id: "data-protection", title: "11. Data Protection" },
  { id: "liability", title: "12. Liability" },
  { id: "force-majeure", title: "13. Force Majeure" },
  { id: "changes", title: "14. Changes to the Terms" },
  { id: "law", title: "15. Governing Law and Jurisdiction" },
  { id: "contact", title: "16. Contact" },
];

export default function TermsOfUsePage() {
  return (
    <div className="terms-page">
      <style>{styles}</style>

      <header className="terms-hero">
        <p className="terms-kicker">Legal Information</p>
        <h1>Terms &amp; Conditions</h1>
     
      </header>

      <main className="terms-layout">
        <aside className="terms-sidebar">
          <div className="terms-nav-card">
            <p className="terms-nav-title">On this page</p>
            {TERMS_SECTIONS.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </div>
        </aside>

        <section className="terms-content">
          <TermsCard id="scope-acceptance" title="1. Scope and Acceptance">
            <p>
              These Terms and Conditions apply to all users of the praktix website, as well as all participants, exhibitors, sponsors,
              speakers, partners, volunteers, media representatives, and
              visitors of praktix.
            </p>
            <p>
              By accessing the website, registering for the event, submitting
              an application, or participating in praktix, you
              agree to be bound by these Terms and Conditions.
            </p>
          </TermsCard>

          <TermsCard id="event-overview" title="2. Event Overview">
            <p>
              praktix is an innovation and technology event taking
              place on 20-21 September 2026 in Munich, Germany.
            </p>
            <p>The event includes, but is not limited to:</p>
            <ul>
              <li>Conference sessions, panels, and keynotes</li>
              <li>Exhibitions and showcases</li>
              <li>
                Startup, research, talent, and innovation programmes
              </li>
              <li>Networking and partner activities</li>
              <li>Satellite and side events</li>
            </ul>
            <p>
              The organiser reserves the right to modify the event format,
              schedule, speakers, venue, or content if required.
            </p>
          </TermsCard>

          <TermsCard id="registration" title="3. Registration and Participation">
            <h3>3.1 Registration</h3>
            <p>
              All participants must register via the official praktix
              website. Registration may be subject to approval, particularly
              for:
            </p>
            <ul>
              <li>Exhibitors</li>
              <li>Sponsors</li>
              <li>Speakers</li>
              <li>Partners</li>
              <li>Volunteers</li>
              <li>Media representatives</li>
            </ul>
            <p>
              The organiser reserves the right to accept or reject
              registrations at its sole discretion.
            </p>
            <h3>3.2 Accuracy of Information</h3>
            <p>
              Participants must ensure that all information provided during
              registration or application is accurate and up to date.
            </p>
          </TermsCard>

          <TermsCard id="tickets" title="4. Tickets, Fees, and Payments">
            <p>
              Ticket prices, exhibitor fees, sponsorship packages, and other
              participation fees are published on the website or provided
              individually.
            </p>
            <p>All payments are due according to the agreed terms.</p>
            <p>Unless otherwise stated, fees are non-refundable.</p>
            <p>
              The organiser reserves the right to change pricing and
              availability at any time.
            </p>
          </TermsCard>

          <TermsCard id="exhibitors" title="5. Exhibitors, Sponsors, and Partners">
            <p>
              Exhibitors and sponsors must comply with all guidelines provided
              by the organiser.
            </p>
            <p>
              Allocation of exhibition space and programme participation is at
              the organiser&apos;s discretion.
            </p>
            <p>
              Subleasing or sharing of exhibition space without written consent
              is prohibited.
            </p>
            <p>
              The organiser may remove any exhibitor or sponsor that violates
              these Terms or applicable laws.
            </p>
          </TermsCard>

          <TermsCard id="speakers" title="6. Speakers and Content Contributions">
            <p>
              Speakers agree that their name, title, image, and session
              information may be used for promotional purposes.
            </p>
            <p>
              The organiser may record sessions (audio, video, photography).
            </p>
            <p>
              Speakers grant the organiser a non-exclusive right to use
              recordings for documentation, marketing, and post-event content.
            </p>
          </TermsCard>

          <TermsCard id="volunteers" title="7. Volunteers">
            <p>
              Volunteers participate on a voluntary basis and do not enter into
              an employment relationship.
            </p>
            <p>
              Benefits such as catering, access passes, or certificates are
              discretionary and may vary.
            </p>
            <p>
              Volunteers must follow all instructions provided by the organiser
              and event staff.
            </p>
          </TermsCard>

          <TermsCard id="conduct" title="8. Code of Conduct">
            <p>All participants must behave respectfully and professionally.</p>
            <p>The following are not tolerated:</p>
            <ul>
              <li>Harassment or discrimination of any kind</li>
              <li>Disruptive or unsafe behaviour</li>
              <li>Illegal activities</li>
              <li>Unauthorised sales, promotion, or solicitation</li>
            </ul>
            <p>
              The organiser reserves the right to remove any individual who
              violates the Code of Conduct without refund.
            </p>
          </TermsCard>

          <TermsCard id="ip" title="9. Intellectual Property">
            <p>
              All content on the praktix website is protected by
              intellectual property laws.
            </p>
            <p>Participants retain ownership of their own content.</p>
            <p>
              By participating, you grant the organiser the right to use logos,
              names, and descriptions for event-related promotion.
            </p>
          </TermsCard>

          <TermsCard id="media" title="10. Photography, Video, and Media">
            <p>The event will be photographed and recorded.</p>
            <p>By attending, participants consent to being photographed or recorded.</p>
            <p>
              Media may be used for marketing, press, and documentation
              purposes without additional compensation.
            </p>
          </TermsCard>

          <TermsCard id="data-protection" title="11. Data Protection">
            <p>
              Personal data is processed in accordance with applicable data
              protection laws, including the GDPR.
            </p>
            <p>For details, please refer to the Privacy Policy.</p>
          </TermsCard>

          <TermsCard id="liability" title="12. Liability">
            <p>Participation is at your own risk.</p>
            <p>
              The organiser is not liable for loss, damage, or injury, except
              in cases of gross negligence or intent.
            </p>
            <p>The organiser is not responsible for lost or stolen property.</p>
          </TermsCard>

          <TermsCard id="force-majeure" title="13. Force Majeure">
            <p>
              The organiser is not liable for failure to perform due to events
              beyond reasonable control, including but not limited to natural
              disasters, pandemics, government restrictions, strikes, or
              technical failures.
            </p>
          </TermsCard>

          <TermsCard id="changes" title="14. Changes to the Terms">
            <p>
              The organiser reserves the right to modify these Terms and
              Conditions at any time. Updates will be published on this page.
            </p>
          </TermsCard>

          <TermsCard id="law" title="15. Governing Law and Jurisdiction">
            <p>
              These Terms and Conditions are governed by the laws of the
              Federal Republic of Germany.
            </p>
            <p>Jurisdiction is Munich, Germany.</p>
          </TermsCard>

          <TermsCard id="contact" title="16. Contact">
            <div className="terms-info-grid">
              <InfoRow label="Organization" value="praktix" />
              <InfoRow
                label="Email"
                value={
                  <a href="mailto:info@praktix.hopn.eu">
                    info@praktix.hopn.eu
                  </a>
                }
              />
              <InfoRow
                label="Website"
                value={
                  <a
                    href="https://praktix.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://praktix.com
                  </a>
                }
              />
            </div>
          </TermsCard>
        </section>
      </main>
    </div>
  );
}

function TermsCard({ id, title, children }) {
  return (
    <section className="terms-card" id={id}>
      <h2>{title}</h2>
      <div className="terms-card-body">{children}</div>
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="terms-info-row">
      <p className="terms-label">{label}</p>
      <div className="terms-value">{value}</div>
    </div>
  );
}

const styles = `
.terms-page {
  min-height: 100vh;
  background: linear-gradient(90deg, #06153d 0%, #03113a 35%, #010a2a 65%, #00061f 100%);
  padding: 36px 20px 64px;
}

.terms-hero,
.terms-layout {
  max-width: 1180px;
  margin: 0 auto;
}

.terms-hero {
  margin-bottom: 22px;
}

.terms-kicker {
  margin: 0 0 10px;
  font-size: 0.82rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 800;
  color: #c51f5d;
}

.terms-hero h1 {
  margin: 0;
  font-size: clamp(2.1rem, 4vw, 3.3rem);
  line-height: 1.05;
  color: #ffffff;
}

.terms-subtitle {
  margin: 12px 0 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.76);
  font-weight: 600;
}

.terms-layout {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}

.terms-sidebar {
  position: sticky;
  top: 92px;
}

.terms-nav-card {
  border-radius: 22px;
  background: linear-gradient(160deg, #102449, #0f1c32 56%, #162c4f);
  box-shadow: 0 18px 40px rgba(15, 25, 44, 0.24);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.terms-nav-title {
  margin: 0 0 6px;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.74);
  font-weight: 700;
}

.terms-nav-card a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.93);
  font-weight: 600;
  font-size: 0.9rem;
  line-height: 1.3;
  border-radius: 12px;
  padding: 9px 10px;
  transition: background 0.2s ease, transform 0.2s ease;
}

.terms-nav-card a:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-1px);
}

.terms-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.terms-card {
  border-radius: 26px;
  border: 1px solid rgba(17, 29, 48, 0.08);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(248, 248, 245, 0.96));
  box-shadow: 0 16px 36px rgba(25, 37, 56, 0.1);
  padding: 20px;
}

.terms-card h2 {
  margin: 0 0 14px;
  color: #14243e;
  font-size: clamp(1.08rem, 1.8vw, 1.45rem);
}

.terms-card-body {
  color: #2c3747;
  line-height: 1.65;
  font-size: 0.98rem;
}

.terms-card-body p {
  margin: 0 0 10px;
}

.terms-card-body ul {
  margin: 0 0 10px;
  padding-left: 18px;
}

.terms-card-body h3 {
  margin: 8px 0 8px;
  color: #1c2b43;
  font-size: 1rem;
}

.terms-info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.terms-info-row {
  border-radius: 16px;
  border: 1px solid rgba(17, 29, 48, 0.08);
  background: rgba(255, 255, 255, 0.76);
  padding: 12px 14px;
}

.terms-label {
  margin: 0;
  color: #5e6774;
  font-size: 0.84rem;
  font-weight: 700;
}

.terms-value {
  margin-top: 5px;
  color: #1c2635;
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.5;
}

.terms-value a {
  color: #c51f5d;
  text-decoration: none;
  font-weight: 700;
}

.terms-value a:hover {
  text-decoration: underline;
}

@media (max-width: 980px) {
  .terms-layout {
    grid-template-columns: 1fr;
  }

  .terms-sidebar {
    position: static;
  }

  .terms-nav-card {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .terms-nav-title {
    width: 100%;
  }
}

@media (max-width: 720px) {
  .terms-page {
    padding: 20px 12px 40px;
  }

  .terms-card {
    border-radius: 18px;
    padding: 14px;
  }

  .terms-info-grid {
    grid-template-columns: 1fr;
  }
}
`;


