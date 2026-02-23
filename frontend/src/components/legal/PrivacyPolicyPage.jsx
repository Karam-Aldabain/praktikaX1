import React from "react";

const PRIVACY_SECTIONS = [
  { id: "introduction", title: "1. Introduction" },
  { id: "controller", title: "2. Data Controller" },
  { id: "collected-data", title: "3. Personal Data We Collect" },
  { id: "purposes", title: "4. Purpose of Data Processing" },
  { id: "legal-basis", title: "5. Legal Basis for Processing" },
  { id: "cookies", title: "6. Cookies and Tracking Technologies" },
  { id: "sharing", title: "7. Data Sharing and Third Parties" },
  { id: "transfers", title: "8. International Data Transfers" },
  { id: "retention", title: "9. Data Retention" },
  { id: "media", title: "10. Photography, Video, and Media" },
  { id: "rights", title: "11. Your Rights Under GDPR" },
  { id: "security", title: "12. Data Security" },
  { id: "changes", title: "13. Changes to This Privacy Policy" },
  { id: "authority", title: "14. Supervisory Authority" },
  { id: "contact", title: "15. Contact" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-page">
      <style>{styles}</style>

      <header className="privacy-hero">
        <p className="privacy-kicker">Legal Information</p>
        <h1>Privacy Policy</h1>
        <p className="privacy-subtitle">
          praktix â€¢ Last updated: 20 December 2025
        </p>
      </header>

      <main className="privacy-layout">
        <aside className="privacy-sidebar">
          <div className="privacy-nav-card">
            <p className="privacy-nav-title">On this page</p>
            {PRIVACY_SECTIONS.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </div>
        </aside>

        <section className="privacy-content">
          <PolicyCard id="introduction" title="1. Introduction">
            <p>
              praktix ("we", "us", "our") takes the protection of
              your personal data very seriously. This Privacy Policy explains
              how we collect, use, process, and protect personal data when you
              visit our website, register for the event, or interact with us in
              any other way.
            </p>
            <p>
              We process personal data in accordance with the General Data
              Protection Regulation (GDPR) and applicable German and EU data
              protection laws.
            </p>
          </PolicyCard>

          <PolicyCard id="controller" title="2. Data Controller">
            <div className="privacy-info-grid">
              <InfoRow label="Organization" value="praktix" />
              <InfoRow
                label="Email"
                value={
                  <a href="mailto:info@praktix.hopn.eu">info@praktix.hopn.eu</a>
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
          </PolicyCard>

          <PolicyCard id="collected-data" title="3. Personal Data We Collect">
            <h3>a) Website Usage Data</h3>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited</li>
              <li>Date and time of access</li>
            </ul>

            <h3>b) Registration and Application Data</h3>
            <p>
              When you register or apply as a participant, exhibitor, sponsor,
              speaker, partner, volunteer, or media representative:
            </p>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Organization and role</li>
              <li>Country and city</li>
              <li>LinkedIn profile (optional)</li>
              <li>Submitted descriptions, topics, or motivations</li>
            </ul>

            <h3>c) Communication Data</h3>
            <ul>
              <li>Emails and messages sent to us</li>
              <li>Responses to surveys or forms</li>
              <li>Scheduling information</li>
            </ul>
          </PolicyCard>

          <PolicyCard id="purposes" title="4. Purpose of Data Processing">
            <ul>
              <li>Operating and maintaining the website</li>
              <li>Processing event registrations and applications</li>
              <li>Organizing and managing praktix</li>
              <li>
                Communicating with participants, speakers, sponsors, partners,
                and volunteers
              </li>
              <li>Sending event-related information and updates</li>
              <li>
                Managing exhibitor, sponsor, and partner relationships
              </li>
              <li>Improving our services and event experience</li>
              <li>Ensuring security and preventing misuse</li>
            </ul>
          </PolicyCard>

          <PolicyCard id="legal-basis" title="5. Legal Basis for Processing">
            <ul>
              <li>Article 6(1)(a) GDPR - Consent</li>
              <li>
                Article 6(1)(b) GDPR - Performance of a contract or
                pre-contractual measures
              </li>
              <li>Article 6(1)(c) GDPR - Legal obligations</li>
              <li>
                Article 6(1)(f) GDPR - Legitimate interests (e.g. event
                organization, security, communication)
              </li>
            </ul>
          </PolicyCard>

          <PolicyCard
            id="cookies"
            title="6. Cookies and Tracking Technologies"
          >
            <p>
              Our website may use cookies and similar technologies to improve
              user experience and analyze website traffic.
            </p>
            <p>
              You can manage or disable cookies via your browser settings. For
              more details, please refer to our cookie settings (if applicable).
            </p>
          </PolicyCard>

          <PolicyCard id="sharing" title="7. Data Sharing and Third Parties">
            <p>
              We may share personal data with trusted third parties only when
              necessary, including:
            </p>
            <ul>
              <li>Event service providers and technical partners</li>
              <li>Registration and ticketing systems</li>
              <li>Communication and email service providers</li>
              <li>Analytics and hosting providers</li>
            </ul>
            <p>
              All third parties are contractually bound to comply with GDPR and
              process data only on our instructions.
            </p>
            <p>We do not sell personal data.</p>
          </PolicyCard>

          <PolicyCard
            id="transfers"
            title="8. International Data Transfers"
          >
            <p>
              If personal data is transferred outside the European Union,
              appropriate safeguards such as Standard Contractual Clauses (SCCs)
              are applied to ensure an adequate level of data protection.
            </p>
          </PolicyCard>

          <PolicyCard id="retention" title="9. Data Retention">
            <p>
              We retain personal data only for as long as necessary to fulfill
              the purposes outlined in this Privacy Policy or as required by
              law.
            </p>
            <p>
              Event-related data may be retained for a reasonable period after
              the event for documentation, reporting, and legal purposes.
            </p>
          </PolicyCard>

          <PolicyCard id="media" title="10. Photography, Video, and Media">
            <p>
              praktix is a public event. Photography, video, and
              audio recordings may take place during the event.
            </p>
            <p>By attending, you acknowledge that images and recordings may be used for:</p>
            <ul>
              <li>Event documentation</li>
              <li>Marketing and promotional materials</li>
              <li>Press and media coverage</li>
            </ul>
            <p>
              If you have objections, please contact us in advance or inform
              event staff on-site.
            </p>
          </PolicyCard>

          <PolicyCard id="rights" title="11. Your Rights Under GDPR">
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Rectify inaccurate data</li>
              <li>Erase your data ("right to be forgotten")</li>
              <li>Restrict processing</li>
              <li>Object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p>To exercise your rights, please contact:</p>
            <p>
              <a href="mailto:info@praktix.hopn.eu">info@praktix.hopn.eu</a>
            </p>
          </PolicyCard>

          <PolicyCard id="security" title="12. Data Security">
            <p>
              We implement appropriate technical and organizational measures to
              protect personal data against unauthorized access, loss, or
              misuse.
            </p>
          </PolicyCard>

          <PolicyCard id="changes" title="13. Changes to This Privacy Policy">
            <p>
              We reserve the right to update this Privacy Policy at any time.
              Changes will be published on this page.
            </p>
          </PolicyCard>

          <PolicyCard id="authority" title="14. Supervisory Authority">
            <p>
              You have the right to lodge a complaint with a data protection
              supervisory authority in the EU if you believe your data is being
              processed unlawfully.
            </p>
          </PolicyCard>

          <PolicyCard id="contact" title="15. Contact">
            <div className="privacy-info-grid">
              <InfoRow label="Organization" value="praktix" />
              <InfoRow
                label="Email"
                value={
                  <a href="mailto:info@praktix.hopn.eu">info@praktix.hopn.eu</a>
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
          </PolicyCard>
        </section>
      </main>
    </div>
  );
}

function PolicyCard({ id, title, children }) {
  return (
    <section className="privacy-card" id={id}>
      <h2>{title}</h2>
      <div className="privacy-card-body">{children}</div>
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="privacy-info-row">
      <p className="privacy-label">{label}</p>
      <div className="privacy-value">{value}</div>
    </div>
  );
}

const styles = `
.privacy-page {
  min-height: 100vh;
  background: linear-gradient(90deg, #06153d 0%, #03113a 35%, #010a2a 65%, #00061f 100%);
  padding: 36px 20px 64px;
}

.privacy-hero,
.privacy-layout {
  max-width: 1180px;
  margin: 0 auto;
}

.privacy-hero {
  margin-bottom: 22px;
}

.privacy-kicker {
  margin: 0 0 10px;
  font-size: 0.82rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 800;
  color: #c51f5d;
}

.privacy-hero h1 {
  margin: 0;
  font-size: clamp(2.1rem, 4vw, 3.3rem);
  line-height: 1.05;
  color: #ffffff;
}

.privacy-subtitle {
  margin: 12px 0 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.76);
  font-weight: 600;
}

.privacy-layout {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}

.privacy-sidebar {
  position: sticky;
  top: 92px;
}

.privacy-nav-card {
  border-radius: 22px;
  background: linear-gradient(160deg, #102449, #0f1c32 56%, #162c4f);
  box-shadow: 0 18px 40px rgba(15, 25, 44, 0.24);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.privacy-nav-title {
  margin: 0 0 6px;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.74);
  font-weight: 700;
}

.privacy-nav-card a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.93);
  font-weight: 600;
  font-size: 0.9rem;
  line-height: 1.3;
  border-radius: 12px;
  padding: 9px 10px;
  transition: background 0.2s ease, transform 0.2s ease;
}

.privacy-nav-card a:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-1px);
}

.privacy-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.privacy-card {
  border-radius: 26px;
  border: 1px solid rgba(17, 29, 48, 0.08);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(248, 248, 245, 0.96));
  box-shadow: 0 16px 36px rgba(25, 37, 56, 0.1);
  padding: 20px;
}

.privacy-card h2 {
  margin: 0 0 14px;
  color: #14243e;
  font-size: clamp(1.08rem, 1.8vw, 1.45rem);
}

.privacy-card-body {
  color: #2c3747;
  line-height: 1.65;
  font-size: 0.98rem;
}

.privacy-card-body p {
  margin: 0 0 10px;
}

.privacy-card-body ul {
  margin: 0 0 10px;
  padding-left: 18px;
}

.privacy-card-body h3 {
  margin: 8px 0 8px;
  color: #1c2b43;
  font-size: 1rem;
}

.privacy-info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.privacy-info-row {
  border-radius: 16px;
  border: 1px solid rgba(17, 29, 48, 0.08);
  background: rgba(255, 255, 255, 0.76);
  padding: 12px 14px;
}

.privacy-label {
  margin: 0;
  color: #5e6774;
  font-size: 0.84rem;
  font-weight: 700;
}

.privacy-value {
  margin-top: 5px;
  color: #1c2635;
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.5;
}

.privacy-value a {
  color: #c51f5d;
  text-decoration: none;
  font-weight: 700;
}

.privacy-value a:hover {
  text-decoration: underline;
}

@media (max-width: 980px) {
  .privacy-layout {
    grid-template-columns: 1fr;
  }

  .privacy-sidebar {
    position: static;
  }

  .privacy-nav-card {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .privacy-nav-title {
    width: 100%;
  }
}

@media (max-width: 720px) {
  .privacy-page {
    padding: 20px 12px 40px;
  }

  .privacy-card {
    border-radius: 18px;
    padding: 14px;
  }

  .privacy-info-grid {
    grid-template-columns: 1fr;
  }
}
`;

