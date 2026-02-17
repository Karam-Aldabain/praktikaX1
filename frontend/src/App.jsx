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
        </Routes>
      </main>
      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
