import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconSearch } from "../components/Icons";

// ─── Unit alias → { canonical, converterPath } ───────────────────────────────
const UNIT_ALIASES = {
  // Weight
  kg: { canonical: "Kilogram", p: "/converter/weight" }, kilogram: { canonical: "Kilogram", p: "/converter/weight" }, kilograms: { canonical: "Kilogram", p: "/converter/weight" }, kilo: { canonical: "Kilogram", p: "/converter/weight" },
  g: { canonical: "Gram", p: "/converter/weight" }, gm: { canonical: "Gram", p: "/converter/weight" }, gram: { canonical: "Gram", p: "/converter/weight" }, grams: { canonical: "Gram", p: "/converter/weight" },
  mg: { canonical: "Milligram", p: "/converter/weight" }, milligram: { canonical: "Milligram", p: "/converter/weight" },
  lb: { canonical: "Pound", p: "/converter/weight" }, lbs: { canonical: "Pound", p: "/converter/weight" }, pound: { canonical: "Pound", p: "/converter/weight" }, pounds: { canonical: "Pound", p: "/converter/weight" },
  oz: { canonical: "Ounce", p: "/converter/weight" }, ounce: { canonical: "Ounce", p: "/converter/weight" }, ounces: { canonical: "Ounce", p: "/converter/weight" },
  tonne: { canonical: "Metric Ton", p: "/converter/weight" }, tonnes: { canonical: "Metric Ton", p: "/converter/weight" }, t: { canonical: "Metric Ton", p: "/converter/weight" },
  // Length
  m: { canonical: "Meter", p: "/converter/length" }, meter: { canonical: "Meter", p: "/converter/length" }, meters: { canonical: "Meter", p: "/converter/length" }, metre: { canonical: "Meter", p: "/converter/length" },
  km: { canonical: "Kilometer", p: "/converter/length" }, kilometer: { canonical: "Kilometer", p: "/converter/length" }, kilometers: { canonical: "Kilometer", p: "/converter/length" },
  cm: { canonical: "Centimeter", p: "/converter/length" }, centimeter: { canonical: "Centimeter", p: "/converter/length" }, centimeters: { canonical: "Centimeter", p: "/converter/length" },
  mm: { canonical: "Millimeter", p: "/converter/length" }, millimeter: { canonical: "Millimeter", p: "/converter/length" }, millimeters: { canonical: "Millimeter", p: "/converter/length" },
  mi: { canonical: "Mile", p: "/converter/length" }, mile: { canonical: "Mile", p: "/converter/length" }, miles: { canonical: "Mile", p: "/converter/length" },
  ft: { canonical: "Foot", p: "/converter/length" }, foot: { canonical: "Foot", p: "/converter/length" }, feet: { canonical: "Foot", p: "/converter/length" },
  yd: { canonical: "Yard", p: "/converter/length" }, yard: { canonical: "Yard", p: "/converter/length" }, yards: { canonical: "Yard", p: "/converter/length" },
  "in": { canonical: "Inch", p: "/converter/length" }, inch: { canonical: "Inch", p: "/converter/length" }, inches: { canonical: "Inch", p: "/converter/length" },
  // Temperature
  c: { canonical: "Celsius", p: "/converter/temperature" }, celsius: { canonical: "Celsius", p: "/converter/temperature" }, centigrade: { canonical: "Celsius", p: "/converter/temperature" },
  f: { canonical: "Fahrenheit", p: "/converter/temperature" }, fahrenheit: { canonical: "Fahrenheit", p: "/converter/temperature" },
  k: { canonical: "Kelvin", p: "/converter/temperature" }, kelvin: { canonical: "Kelvin", p: "/converter/temperature" },
  // Speed
  mph: { canonical: "mph", p: "/converter/speed" }, kph: { canonical: "km/h", p: "/converter/speed" }, kmph: { canonical: "km/h", p: "/converter/speed" }, "km/h": { canonical: "km/h", p: "/converter/speed" },
  knot: { canonical: "knot", p: "/converter/speed" }, knots: { canonical: "knot", p: "/converter/speed" }, mps: { canonical: "m/s", p: "/converter/speed" }, fps: { canonical: "ft/s", p: "/converter/speed" },
  // Volume
  l: { canonical: "Liter", p: "/converter/volume" }, liter: { canonical: "Liter", p: "/converter/volume" }, liters: { canonical: "Liter", p: "/converter/volume" }, litre: { canonical: "Liter", p: "/converter/volume" },
  ml: { canonical: "Milliliter", p: "/converter/volume" }, milliliter: { canonical: "Milliliter", p: "/converter/volume" }, milliliters: { canonical: "Milliliter", p: "/converter/volume" },
  gal: { canonical: "Gallon", p: "/converter/volume" }, gallon: { canonical: "Gallon", p: "/converter/volume" }, gallons: { canonical: "Gallon", p: "/converter/volume" },
  cup: { canonical: "Cup", p: "/converter/volume" }, cups: { canonical: "Cup", p: "/converter/volume" },
  qt: { canonical: "Quart", p: "/converter/volume" }, quart: { canonical: "Quart", p: "/converter/volume" }, pt: { canonical: "Pint", p: "/converter/volume" }, pint: { canonical: "Pint", p: "/converter/volume" },
  tsp: { canonical: "Teaspoon", p: "/converter/volume" }, tbsp: { canonical: "Tablespoon", p: "/converter/volume" },
  // Area
  acre: { canonical: "Acre", p: "/converter/area" }, acres: { canonical: "Acre", p: "/converter/area" },
  ha: { canonical: "Hectare", p: "/converter/area" }, hectare: { canonical: "Hectare", p: "/converter/area" },
  // Power
  hp: { canonical: "Horsepower", p: "/converter/power" }, horsepower: { canonical: "Horsepower", p: "/converter/power" },
  kw: { canonical: "Kilowatt", p: "/converter/power" }, kilowatt: { canonical: "Kilowatt", p: "/converter/power" },
  w: { canonical: "Watt", p: "/converter/power" }, watt: { canonical: "Watt", p: "/converter/power" },
  mw: { canonical: "Megawatt", p: "/converter/power" },
  // Pressure
  psi: { canonical: "PSI", p: "/converter/pressure" }, bar: { canonical: "Bar", p: "/converter/pressure" },
  pa: { canonical: "Pascal", p: "/converter/pressure" }, pascal: { canonical: "Pascal", p: "/converter/pressure" },
  kpa: { canonical: "Kilopascal", p: "/converter/pressure" }, atm: { canonical: "Atmosphere", p: "/converter/pressure" },
  // Time
  sec: { canonical: "Second", p: "/converter/time" }, second: { canonical: "Second", p: "/converter/time" }, seconds: { canonical: "Second", p: "/converter/time" },
  min: { canonical: "Minute", p: "/converter/time" }, mins: { canonical: "Minute", p: "/converter/time" }, minute: { canonical: "Minute", p: "/converter/time" }, minutes: { canonical: "Minute", p: "/converter/time" },
  hr: { canonical: "Hour", p: "/converter/time" }, hrs: { canonical: "Hour", p: "/converter/time" }, hour: { canonical: "Hour", p: "/converter/time" }, hours: { canonical: "Hour", p: "/converter/time" },
  day: { canonical: "Day", p: "/converter/time" }, days: { canonical: "Day", p: "/converter/time" },
  week: { canonical: "Week", p: "/converter/time" }, weeks: { canonical: "Week", p: "/converter/time" },
  month: { canonical: "Month", p: "/converter/time" }, months: { canonical: "Month", p: "/converter/time" },
  year: { canonical: "Year", p: "/converter/time" }, years: { canonical: "Year", p: "/converter/time" }, yr: { canonical: "Year", p: "/converter/time" }, yrs: { canonical: "Year", p: "/converter/time" },
  // Data
  kb: { canonical: "Kilobyte", p: "/converter/data" }, kilobyte: { canonical: "Kilobyte", p: "/converter/data" },
  mb: { canonical: "Megabyte", p: "/converter/data" }, megabyte: { canonical: "Megabyte", p: "/converter/data" },
  gb: { canonical: "Gigabyte", p: "/converter/data" }, gigabyte: { canonical: "Gigabyte", p: "/converter/data" },
  tb: { canonical: "Terabyte", p: "/converter/data" }, terabyte: { canonical: "Terabyte", p: "/converter/data" },
  bit: { canonical: "Bit", p: "/converter/data" }, bits: { canonical: "Bit", p: "/converter/data" },
  byte: { canonical: "Byte", p: "/converter/data" }, bytes: { canonical: "Byte", p: "/converter/data" },
};

/**
 * Parse a unit query like "kg to gm", "100 cm to inches", "celsius fahrenheit"
 * Returns { fromInfo, toInfo, numValue } or null
 */
function parseUnitQuery(raw) {
  const q = raw.trim().toLowerCase();
  // Strip leading number
  const numMatch = q.match(/^(\d+\.?\d*)\s*/);
  const numValue = numMatch ? parseFloat(numMatch[1]) : null;
  const rest = numMatch ? q.slice(numMatch[0].length) : q;

  let fromRaw, toRaw;
  if (rest.includes(" to ")) {
    [fromRaw, toRaw] = rest.split(" to ").map(s => s.trim());
  } else {
    const parts = rest.split(/\s+/);
    if (parts.length >= 2) { fromRaw = parts.slice(0, -1).join(" "); toRaw = parts[parts.length - 1]; }
    else return null;
  }

  const fromInfo = UNIT_ALIASES[fromRaw];
  const toInfo = UNIT_ALIASES[toRaw];
  if (!fromInfo || !toInfo) return null;
  return { fromInfo, toInfo, numValue };
}

const ALL_TOOLS = [
  { name: "Basic Calculator", path: "/math/basic", category: "Math" },
  { name: "Scientific Calculator", path: "/math/scientific", category: "Math" },
  { name: "Percentage Calculator", path: "/math/percentage", category: "Math" },
  { name: "EMI Calculator", path: "/finance/emi", category: "Finance" },
  { name: "SIP Calculator", path: "/finance/sip", category: "Finance" },
  { name: "GST Calculator", path: "/finance/gst", category: "Finance" },
  { name: "BMI Calculator", path: "/health/bmi", category: "Health" },
  { name: "Calorie Calculator", path: "/health/calorie", category: "Health" },
  { name: "Age Calculator", path: "/daily/age", category: "Daily" },
  { name: "Discount Calculator", path: "/daily/discount", category: "Daily" },
  { name: "GPA Calculator", path: "/college/gpa", category: "College" },
  { name: "CGPA Calculator", path: "/college/cgpa", category: "College" },
  { name: "Length Converter", path: "/converter/length", category: "Converter" },
  { name: "Weight Converter", path: "/converter/weight", category: "Converter" },
  { name: "Temperature Converter", path: "/converter/temperature", category: "Converter" },
  { name: "Speed Converter", path: "/converter/speed", category: "Converter" },
  { name: "Data Converter", path: "/converter/data", category: "Converter" },
  { name: "Number System Converter", path: "/converter/number-system", category: "Converter", keywords: "binary decimal hexadecimal octal base" },
  { name: "SGPA to Percentage", path: "/converter/sgpa", category: "Academic", keywords: "sgpa grade point semester" },
  { name: "CGPA to Percentage", path: "/converter/cgpa-percentage", category: "Academic", keywords: "cgpa grade point cumulative cbse" },
  { name: "Area Converter", path: "/converter/area", category: "Converter", keywords: "sq meter feet acre hectare" },
  { name: "Volume Converter", path: "/converter/volume", category: "Converter", keywords: "liter gallon cup ml" },
  { name: "Time Converter", path: "/converter/time", category: "Converter", keywords: "hour minute second day" },
  { name: "Power Converter", path: "/converter/power", category: "Converter", keywords: "watt kilowatt horsepower" },
  { name: "Pressure Converter", path: "/converter/pressure", category: "Converter", keywords: "bar psi pascal atmosphere" },
];

export default function Home() {
  const navigate = useNavigate();
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [reset, setReset] = useState(false);
  const [isDeg, setIsDeg] = useState(true);
  const [search, setSearch] = useState("");

  const handleNumber = (num) => {
    if (reset) { setDisplay(num); setReset(false); return; }
    setDisplay(display === "0" ? num : display + num);
  };

  const handleOperator = (op) => {
    setExpression(display + " " + op + " ");
    setReset(true);
  };

  const handleEquals = () => {
    try {
      const fullExpr = expression + display;
      const sanitized = fullExpr.replace(/\u00D7/g, "*").replace(/\u00F7/g, "/");
      // eslint-disable-next-line no-eval
      const result = eval(sanitized);
      setDisplay(parseFloat(result.toFixed(10)).toString());
      setExpression("");
      setReset(true);
    } catch {
      setDisplay("Error");
      setExpression("");
      setReset(true);
    }
  };

  const handleClear = () => { setDisplay("0"); setExpression(""); setReset(false); };

  const handleDecimal = () => {
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const handleBackspace = () => {
    if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const toRad = (deg) => (deg * Math.PI) / 180;

  const applyFunc = (fn) => {
    const val = parseFloat(display);
    if (isNaN(val)) { setDisplay("Error"); return; }
    let result;
    switch (fn) {
      case "sin": result = isDeg ? Math.sin(toRad(val)) : Math.sin(val); break;
      case "cos": result = isDeg ? Math.cos(toRad(val)) : Math.cos(val); break;
      case "tan": result = isDeg ? Math.tan(toRad(val)) : Math.tan(val); break;
      case "log": result = Math.log10(val); break;
      case "ln": result = Math.log(val); break;
      case "sqrt": result = Math.sqrt(val); break;
      case "sq": result = val * val; break;
      case "inv": result = 1 / val; break;
      case "fact":
        if (val < 0 || val > 170 || val !== Math.floor(val)) { setDisplay("Error"); return; }
        let f = 1; for (let i = 2; i <= val; i++) f *= i;
        result = f; break;
      default: return;
    }
    if (isNaN(result) || !isFinite(result)) setDisplay("Error");
    else setDisplay(parseFloat(result.toFixed(10)).toString());
    setReset(true);
  };

  const query = search.trim().toLowerCase();
  // Try to parse as a unit query first (e.g. "kg to gm", "100 cm to inches")
  const unitMatch = query ? parseUnitQuery(query) : null;
  const filteredTools = query && !unitMatch
    ? ALL_TOOLS.filter((t) => t.name.toLowerCase().includes(query) || (t.keywords && t.keywords.toLowerCase().includes(query)))
    : null;

  const handleUnitMatchNavigate = () => {
    if (!unitMatch) return;
    const { fromInfo, toInfo, numValue } = unitMatch;
    let url = `${fromInfo.p}?from=${encodeURIComponent(fromInfo.canonical)}&to=${encodeURIComponent(toInfo.canonical)}`;
    if (numValue != null) url += `&value=${numValue}`;
    navigate(url);
    setSearch("");
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      if (unitMatch) { handleUnitMatchNavigate(); return; }
      if (filteredTools && filteredTools.length === 1) { navigate(filteredTools[0].path); setSearch(""); }
    }
  };

  const sciRow1 = [
    { label: "sin", action: () => applyFunc("sin") },
    { label: "cos", action: () => applyFunc("cos") },
    { label: "tan", action: () => applyFunc("tan") },
    { label: isDeg ? "DEG" : "RAD", action: () => setIsDeg(!isDeg) },
  ];

  const sciRow2 = [
    { label: "x\u00B2", action: () => applyFunc("sq") },
    { label: "\u221A", action: () => applyFunc("sqrt") },
    { label: "log", action: () => applyFunc("log") },
    { label: "ln", action: () => applyFunc("ln") },
  ];

  const sciRow3 = [
    { label: "\u03C0", action: () => { setDisplay(Math.PI.toString()); setReset(true); } },
    { label: "e", action: () => { setDisplay(Math.E.toString()); setReset(true); } },
    { label: "n!", action: () => applyFunc("fact") },
    { label: "1/x", action: () => applyFunc("inv") },
  ];

  return (
    <div className="main-content">
      <div className="container">
        <div className="home-hero">
          <div className="home-calc">
            <div className="home-calc-display">
              <div className="expression">{expression}</div>
              <div className="result">{display}</div>
            </div>

            {[sciRow1, sciRow2, sciRow3].map((row, ri) => (
              <div className="home-calc-sci-row" key={ri}>
                {row.map((b, i) => (
                  <button key={i} className="hcb sci" onClick={b.action}>{b.label}</button>
                ))}
              </div>
            ))}

            <div className="home-calc-grid">
              <button className="hcb clear" onClick={handleClear}>C</button>
              <button className="hcb func" onClick={handleBackspace}>&#x232B;</button>
              <button className="hcb func" onClick={() => setDisplay((parseFloat(display) / 100).toString())}>%</button>
              <button className="hcb op" onClick={() => handleOperator("\u00F7")}>&divide;</button>
              <button className="hcb" onClick={() => handleNumber("7")}>7</button>
              <button className="hcb" onClick={() => handleNumber("8")}>8</button>
              <button className="hcb" onClick={() => handleNumber("9")}>9</button>
              <button className="hcb op" onClick={() => handleOperator("\u00D7")}>&times;</button>
              <button className="hcb" onClick={() => handleNumber("4")}>4</button>
              <button className="hcb" onClick={() => handleNumber("5")}>5</button>
              <button className="hcb" onClick={() => handleNumber("6")}>6</button>
              <button className="hcb op" onClick={() => handleOperator("-")}>&minus;</button>
              <button className="hcb" onClick={() => handleNumber("1")}>1</button>
              <button className="hcb" onClick={() => handleNumber("2")}>2</button>
              <button className="hcb" onClick={() => handleNumber("3")}>3</button>
              <button className="hcb op" onClick={() => handleOperator("+")}>+</button>
              <button className="hcb func" onClick={() => setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display)}>&plusmn;</button>
              <button className="hcb" onClick={() => handleNumber("0")}>0</button>
              <button className="hcb" onClick={handleDecimal}>.</button>
              <button className="hcb eq" onClick={handleEquals}>=</button>
            </div>
          </div>

          <div className="home-hero-text">
            <h1>Free Online Calculators</h1>
            <p>Your all-in-one calculator hub — math, finance, health, converters, and more.</p>

            <div className="search-box">
              <IconSearch size={18} />
              <input
                type="text"
                placeholder='Search tools or try "kg to gm", "cm to inches"...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                autoComplete="off"
              />
            </div>

            {/* Unit conversion match — e.g. "kg to gm" → Weight Converter */}
            {unitMatch && (
              <div className="search-results">
                <button className="search-result-item search-unit-match" onClick={handleUnitMatchNavigate}>
                  <span className="sr-name">
                    {unitMatch.fromInfo.canonical} → {unitMatch.toInfo.canonical}
                    {unitMatch.numValue != null && <span className="sr-num"> ({unitMatch.numValue})</span>}
                  </span>
                  <span className="sr-cat">Open Converter ↗</span>
                </button>
              </div>
            )}

            {/* Regular tool name search */}
            {filteredTools && (
              <div className="search-results">
                {filteredTools.length === 0 ? (
                  <div className="search-empty">No calculators found</div>
                ) : (
                  filteredTools.map((tool, i) => (
                    <Link key={i} to={tool.path} className="search-result-item">
                      <span className="sr-name">{tool.name}</span>
                      <span className="sr-cat">{tool.category}</span>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* --- SEO CONTENT SECTION --- */}
        <div className="home-seo-content">
          <h1>Free Online Calculator Tools</h1>
          <p>
            Calculator Hub offers a wide range of free online calculators for finance, health, education and daily needs.
            Our tools are designed to be simple, fast and accurate so that anyone can use them easily.
            Whether you need an EMI calculator, BMI calculator, percentage calculator or age calculator,
            Calculator Hub makes calculations quick and hassle-free.
          </p>

          <h2>Popular Calculator Categories</h2>
          <p>
            We provide multiple categories of calculators including finance calculators for loan and EMI planning,
            health calculators for BMI and calorie tracking, daily life calculators for age and percentage calculations,
            and student calculators for academic use.
          </p>

          <h2>Why Use Calculator Hub?</h2>
          <p>
            Our platform is free to use, mobile-friendly and requires no sign-up.
            All tools are optimized for accuracy and speed to give you instant results anytime.
          </p>
        </div>

      </div>
    </div>
  );
}