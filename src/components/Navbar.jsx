import { Link, useLocation } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { IconZap, IconSun, IconMoon } from "./Icons";

const MenuIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronDown = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CALC_MENU = [
  { label: "Math Calculators", path: "/math" },
  { label: "Financial Calculators", path: "/finance" },
  { label: "Health Calculators", path: "/health" },
  { label: "Daily Calculators", path: "/daily" },
  { label: "College Calculators", path: "/college" },
];

const CALC_DIRECT = [
  { label: "Basic Calculator", path: "/math/basic" },
  { label: "Scientific Calculator", path: "/math/scientific" },
  { label: "EMI Calculator", path: "/finance/emi" },
  { label: "BMI Calculator", path: "/health/bmi" },
  { label: "GPA Calculator", path: "/college/gpa" },
  { label: "Age Calculator", path: "/daily/age" },
];

const CONV_MENU = [
  { label: "Length Converter", path: "/converter/length" },
  { label: "Weight Converter", path: "/converter/weight" },
  { label: "Temperature Converter", path: "/converter/temperature" },
  { label: "Area Converter", path: "/converter/area" },
  { label: "Volume Converter", path: "/converter/volume" },
  { label: "Number System", path: "/converter/number-system" },
  { label: "SGPA to %", path: "/converter/sgpa" },
  { label: "CGPA to %", path: "/converter/cgpa-percentage" },
  { label: "Speed Converter", path: "/converter/speed" },
  { label: "Power Converter", path: "/converter/power" },
  { label: "Pressure Converter", path: "/converter/pressure" },
  { label: "Time Converter", path: "/converter/time" },
  { label: "Data Converter", path: "/converter/data" },
];

function Dropdown({ label, items, directItems, active }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="nav-dropdown" ref={ref}>
      <button className={`nav-link ${active ? "active" : ""}`} onClick={() => setOpen(!open)}>
        {label} <ChevronDown size={12} />
      </button>
      {open && (
        <div className="dropdown-menu">
          {directItems && directItems.length > 0 && (
            <>
              <div className="dropdown-section-label">Popular</div>
              {directItems.map((item, i) => (
                <Link key={`d${i}`} to={item.path} className="dropdown-item" onClick={() => setOpen(false)}>{item.label}</Link>
              ))}
              <div className="dropdown-divider" />
              <div className="dropdown-section-label">Categories</div>
            </>
          )}
          {items.map((item, i) => (
            <Link key={i} to={item.path} className="dropdown-item" onClick={() => setOpen(false)}>{item.label}</Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const calcActive = ["/math", "/finance", "/health", "/daily", "/college"].some((p) => location.pathname.startsWith(p));
  const convActive = location.pathname.startsWith("/converter");

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">
            <IconZap size={18} /> CalculatorHub
          </Link>

          <div className="nav-links desktop-only">
            <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>Home</Link>
            <Dropdown label="Calculators" items={CALC_MENU} directItems={CALC_DIRECT} active={calcActive} />
            <Dropdown label="Converters" items={CONV_MENU} active={convActive} />
          </div>
        </div>

        <div className="nav-right">
          <button className="theme-btn" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme">
            {darkMode ? <IconSun size={16} /> : <IconMoon size={16} />}
          </button>
          <button className="menu-btn mobile-only" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <Link to="/" className="mobile-link">Home</Link>
            <div className="mobile-section-label">Calculators</div>
            {CALC_MENU.map((item, i) => (
              <Link key={i} to={item.path} className="mobile-link sub">{item.label}</Link>
            ))}
            <div className="mobile-section-label">Popular Calculators</div>
            {CALC_DIRECT.map((item, i) => (
              <Link key={`d${i}`} to={item.path} className="mobile-link sub">{item.label}</Link>
            ))}
            <div className="mobile-section-label">Converters</div>
            {CONV_MENU.slice(0, 8).map((item, i) => (
              <Link key={`c${i}`} to={item.path} className="mobile-link sub">{item.label}</Link>
            ))}
            <Link to="/converter" className="mobile-link sub accent">View all converters →</Link>
          </div>
        </div>
      )}
    </>
  );
}