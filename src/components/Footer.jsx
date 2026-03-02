import { Link } from "react-router-dom";

const CALC_CATEGORIES = [
    {
        title: "Math Calculators",
        links: [
            { name: "Basic Calculator", path: "/math/basic" },
            { name: "Scientific Calculator", path: "/math/scientific" },
            { name: "Percentage Calculator", path: "/math/percentage" },
        ],
    },
    {
        title: "Financial Calculators",
        links: [
            { name: "EMI Calculator", path: "/finance/emi" },
            { name: "SIP Calculator", path: "/finance/sip" },
            { name: "GST Calculator", path: "/finance/gst" },
        ],
    },
    {
        title: "Health Calculators",
        links: [
            { name: "BMI Calculator", path: "/health/bmi" },
            { name: "Calorie Calculator", path: "/health/calorie" },
        ],
    },
    {
        title: "Daily Calculators",
        links: [
            { name: "Age Calculator", path: "/daily/age" },
            { name: "Discount Calculator", path: "/daily/discount" },
        ],
    },
    {
        title: "College Calculators",
        links: [
            { name: "GPA Calculator", path: "/college/gpa" },
            { name: "CGPA Calculator", path: "/college/cgpa" },
        ],
    },
];

const CONVERTER_CATEGORIES = [
    {
        title: "Common Converters",
        links: [
            { name: "Length Converter", path: "/converter/length" },
            { name: "Weight Converter", path: "/converter/weight" },
            { name: "Temperature Converter", path: "/converter/temperature" },
            { name: "Speed Converter", path: "/converter/speed" },
            { name: "Area Converter", path: "/converter/area" },
            { name: "Volume Converter", path: "/converter/volume" },
        ],
    },
    {
        title: "Engineering",
        links: [
            { name: "Power Converter", path: "/converter/power" },
            { name: "Pressure Converter", path: "/converter/pressure" },
            { name: "Data Converter", path: "/converter/data" },
            { name: "Time Converter", path: "/converter/time" },
        ],
    },
    {
        title: "Academic",
        links: [
            { name: "SGPA to Percentage", path: "/converter/sgpa" },
            { name: "CGPA to Percentage", path: "/converter/cgpa-percentage" },
            { name: "Number System", path: "/converter/number-system" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">

                <div className="footer-section" id="calculators">
                    <h2 className="footer-section-title">Calculators</h2>
                    <div className="footer-columns">
                        {CALC_CATEGORIES.map((cat, i) => (
                            <div key={i} className="footer-col">
                                <h3 className="footer-col-title">{cat.title}</h3>
                                <ul className="footer-links">
                                    {cat.links.map((link, j) => (
                                        <li key={j}><Link to={link.path}>{link.name}</Link></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="footer-section" id="converters">
                    <h2 className="footer-section-title">Unit Converters</h2>
                    <div className="footer-columns">
                        {CONVERTER_CATEGORIES.map((cat, i) => (
                            <div key={i} className="footer-col">
                                <h3 className="footer-col-title">{cat.title}</h3>
                                <ul className="footer-links">
                                    {cat.links.map((link, j) => (
                                        <li key={j}><Link to={link.path}>{link.name}</Link></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="footer-section" id="legal">
                    <h2 className="footer-section-title">Calculator Hub</h2>
                    <div className="footer-columns">
                        <div className="footer-col">
                            <h3 className="footer-col-title">Company</h3>
                            <ul className="footer-links">
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>CalculatorHub &mdash; Free Online Calculators &amp; Converters</p>
                </div>

            </div>
        </footer>
    );
}
