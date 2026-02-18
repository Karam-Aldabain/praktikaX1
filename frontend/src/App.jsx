import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import LandingPage from "./components/Landing";
import IndustryInternshipsPage from "./components/industry-internships";
import CustomTrainingPage from "./components/custom-training";
import BootcampPage from "./components/bootcamp";
import CoursesWorkshopsPage from "./components/courses-workshops.jsx";
import StudentsGraduatesPage from "./components/students-graduates";
import AiForRealWorldCareersPage from "./components/ai-for-real-world-careers";
import OneToOneCareerMentorshipPage from "./components/one-to-one-career-mentorship";
import UniversitiesCompaniesPage from "./components/universities-companies";
import SchoolsEarlyTalentProgramsPage from "./components/schools-early-talent-programs";
import AiForOrganizationsPage from "./components/ai-for-organizations";
import LoginPortalPage from "./components/login-portal";
import InsightsImpactOutcomesPage from "./components/insights-impact-outcomes";
import InsightsRealExperiencePage from "./components/insights-real-experience";
import InsightsSuccessTestimonialsPage from "./components/insights-success-testimonials";
import InsightsOurValueModelPage from "./components/insights-our-value-model";
import MissionVisionPage from "./components/mission-vision";
import HowWeWorkPage from "./components/how-we-work";
import PartnershipsPage from "./components/partnerships";
import EcosystemPage from "./components/ecosystem";
import SiteFooter from "./components/SiteFooter";
import ImpressumPage from "./components/legal/ImpressumPage";
import TermsOfUsePage from "./components/legal/TermsOfUsePage";
import PrivacyPolicyPage from "./components/legal/PrivacyPolicyPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/industry-internships" element={<IndustryInternshipsPage />} />
          <Route path="/custom-training" element={<CustomTrainingPage />} />
          <Route path="/programs/bootcamps" element={<BootcampPage />} />
          <Route path="/bootcamp" element={<BootcampPage />} />
          <Route path="/programs/courses-workshops" element={<CoursesWorkshopsPage />} />
          <Route path="/courses-workshops" element={<CoursesWorkshopsPage />} />
          <Route path="/students-graduates" element={<StudentsGraduatesPage />} />
          <Route path="/for-individuals/students-graduates" element={<StudentsGraduatesPage />} />
          <Route path="/for-individuals/ai-for-real-world-careers" element={<AiForRealWorldCareersPage />} />
          <Route path="/for-individuals/ai-across-industries" element={<AiForRealWorldCareersPage />} />
          <Route path="/for-individuals/mentorship" element={<OneToOneCareerMentorshipPage />} />
          <Route path="/mentorship" element={<OneToOneCareerMentorshipPage />} />
          <Route path="/for-organizations/universities-companies" element={<UniversitiesCompaniesPage />} />
          <Route path="/for-organizations/universities-educators" element={<UniversitiesCompaniesPage />} />
          <Route path="/for-organizations/schools-early-talent-programs" element={<SchoolsEarlyTalentProgramsPage />} />
          <Route path="/for-organizations/schools-early-talent" element={<SchoolsEarlyTalentProgramsPage />} />
          <Route path="/for-organizations/ai" element={<AiForOrganizationsPage />} />
          <Route path="/for-organizations/ai-for-organizations" element={<AiForOrganizationsPage />} />
          <Route path="/ai-for-organizations" element={<AiForOrganizationsPage />} />
          <Route path="/portal" element={<LoginPortalPage />} />
          <Route path="/login" element={<LoginPortalPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/insights/impact-outcomes" element={<InsightsImpactOutcomesPage />} />
          <Route path="/insights/career-outcomes" element={<InsightsImpactOutcomesPage />} />
          <Route path="/insights/real-experience" element={<InsightsRealExperiencePage />} />
          <Route path="/insights/real-projects" element={<InsightsRealExperiencePage />} />
          <Route path="/insights/success-testimonials" element={<InsightsSuccessTestimonialsPage />} />
          <Route path="/insights/success-stories" element={<InsightsSuccessTestimonialsPage />} />
          <Route path="/insights/our-value-model" element={<InsightsOurValueModelPage />} />
          <Route path="/insights/value" element={<InsightsOurValueModelPage />} />
          <Route path="/about/mission-vision" element={<MissionVisionPage />} />
          <Route path="/about/how-we-work" element={<HowWeWorkPage />} />
          <Route path="/about/model" element={<HowWeWorkPage />} />
          <Route path="/about/partnerships" element={<PartnershipsPage />} />
          <Route path="/about/european-network" element={<PartnershipsPage />} />
          <Route path="/about/ecosystem" element={<EcosystemPage />} />
          <Route path="/about/ecosystem/global-expert-network" element={<EcosystemPage />} />
          <Route path="/about/ecosystem/industry-engagements" element={<EcosystemPage />} />
          <Route path="/about/ecosystem/events" element={<EcosystemPage />} />
          <Route path="/about/ecosystem/hiring-initiatives" element={<EcosystemPage />} />
          <Route path="/about/ecosystem/become-an-expert" element={<EcosystemPage />} />
          <Route path="/about" element={<MissionVisionPage />} />
        </Routes>
      </main>
      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
