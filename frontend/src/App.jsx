import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import LandingPage from "./components/Landing";
import IndustryInternshipsPage from "./components/industry-internships";
import CustomTrainingPage from "./components/custom-training";
import BootcampPage from "./components/bootcamp";
import CoursesWorkshopsPage from "./components/courses-workshops.jsx";
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
