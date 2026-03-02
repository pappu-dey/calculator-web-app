import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

import Math from "./pages/categories/Math";
import Finance from "./pages/categories/Finance";
import Health from "./pages/categories/Health";
import Daily from "./pages/categories/Daily";
import College from "./pages/categories/College";
import Converter from "./pages/categories/Converter";

import BasicCalculator from "./pages/calculators/BasicCalculator";
import ScientificCalculator from "./pages/calculators/ScientificCalculator";
import PercentageCalculator from "./pages/calculators/PercentageCalculator";
import EMICalculator from "./pages/calculators/EMICalculator";
import SIPCalculator from "./pages/calculators/SIPCalculator";
import GSTCalculator from "./pages/calculators/GSTCalculator";
import BMICalculator from "./pages/calculators/BMICalculator";
import CalorieCalculator from "./pages/calculators/CalorieCalculator";
import AgeCalculator from "./pages/calculators/AgeCalculator";
import DiscountCalculator from "./pages/calculators/DiscountCalculator";
import GPACalculator from "./pages/calculators/GPACalculator";
import CGPACalculator from "./pages/calculators/CGPACalculator";
import LengthConverter from "./pages/calculators/LengthConverter";
import WeightConverter from "./pages/calculators/WeightConverter";
import TemperatureConverter from "./pages/calculators/TemperatureConverter";
import SpeedConverter from "./pages/calculators/SpeedConverter";
import DataConverter from "./pages/calculators/DataConverter";
import NumberSystemConverter from "./pages/calculators/NumberSystemConverter";
import SGPAConverter from "./pages/calculators/SGPAConverter";
import CGPAPercentageConverter from "./pages/calculators/CGPAPercentageConverter";
import AreaConverter from "./pages/calculators/AreaConverter";
import VolumeConverter from "./pages/calculators/VolumeConverter";
import TimeConverter from "./pages/calculators/TimeConverter";
import PowerConverter from "./pages/calculators/PowerConverter";
import PressureConverter from "./pages/calculators/PressureConverter";

import KgToGram from "./pages/seo/KgToGram";

import About from "./pages/static/About";
import Contact from "./pages/static/Contact";
import PrivacyPolicy from "./pages/static/PrivacyPolicy";
import TermsAndConditions from "./pages/static/TermsAndConditions";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Categories */}
        <Route path="/math" element={<Math />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/health" element={<Health />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/college" element={<College />} />
        <Route path="/converter" element={<Converter />} />

        {/* Math */}
        <Route path="/math/basic" element={<BasicCalculator />} />
        <Route path="/math/scientific" element={<ScientificCalculator />} />
        <Route path="/math/percentage" element={<PercentageCalculator />} />

        {/* Finance */}
        <Route path="/finance/emi" element={<EMICalculator />} />
        <Route path="/finance/sip" element={<SIPCalculator />} />
        <Route path="/finance/gst" element={<GSTCalculator />} />

        {/* Health */}
        <Route path="/health/bmi" element={<BMICalculator />} />
        <Route path="/health/calorie" element={<CalorieCalculator />} />

        {/* Daily */}
        <Route path="/daily/age" element={<AgeCalculator />} />
        <Route path="/daily/discount" element={<DiscountCalculator />} />

        {/* College */}
        <Route path="/college/gpa" element={<GPACalculator />} />
        <Route path="/college/cgpa" element={<CGPACalculator />} />

        {/* Unit Converters */}
        <Route path="/converter/length" element={<LengthConverter />} />
        <Route path="/converter/weight" element={<WeightConverter />} />
        <Route path="/converter/temperature" element={<TemperatureConverter />} />
        <Route path="/converter/speed" element={<SpeedConverter />} />
        <Route path="/converter/data" element={<DataConverter />} />
        <Route path="/converter/number-system" element={<NumberSystemConverter />} />
        <Route path="/converter/sgpa" element={<SGPAConverter />} />
        <Route path="/converter/cgpa-percentage" element={<CGPAPercentageConverter />} />
        <Route path="/converter/area" element={<AreaConverter />} />
        <Route path="/converter/volume" element={<VolumeConverter />} />
        <Route path="/converter/time" element={<TimeConverter />} />
        <Route path="/converter/power" element={<PowerConverter />} />
        <Route path="/converter/pressure" element={<PressureConverter />} />

        {/* SEO Micro Pages */}
        <Route path="/converter/kg-to-gram" element={<KgToGram />} />

        {/* Static Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;