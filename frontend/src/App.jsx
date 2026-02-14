import Navbar from "./components/Navbar";
import LandingPage from "./components/Landing";
import IndustryInternshipsPage from "./components/industry-internships";
import CustomTrainingPage from "./components/custom-training";
import BootcampPage from "./components/bootcamp";
import CoursesWorkshopsPage from "./components/courses-workshops.jsx";
import { Route, Routes } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/industry-internships" element={<IndustryInternshipsPage />} />
        <Route path="/custom-training" element={<CustomTrainingPage />} />
        <Route path="/programs/bootcamps" element={<BootcampPage />} />
        <Route path="/bootcamp" element={<BootcampPage />} />
        <Route path="/programs/courses-workshops" element={<CoursesWorkshopsPage />} />
        <Route path="/courses-workshops" element={<CoursesWorkshopsPage />} />
      </Routes>
    </>
  );
}
