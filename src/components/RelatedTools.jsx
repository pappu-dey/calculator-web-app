import { Link, useLocation } from "react-router-dom";

const ALL_TOOLS = [
    { name: "Basic Calculator", path: "/math/basic", cat: "Math" },
    { name: "Scientific Calculator", path: "/math/scientific", cat: "Math" },
    { name: "Percentage Calculator", path: "/math/percentage", cat: "Math" },
    { name: "EMI Calculator", path: "/finance/emi", cat: "Finance" },
    { name: "SIP Calculator", path: "/finance/sip", cat: "Finance" },
    { name: "GST Calculator", path: "/finance/gst", cat: "Finance" },
    { name: "BMI Calculator", path: "/health/bmi", cat: "Health" },
    { name: "Calorie Calculator", path: "/health/calorie", cat: "Health" },
    { name: "Age Calculator", path: "/daily/age", cat: "Daily" },
    { name: "Discount Calculator", path: "/daily/discount", cat: "Daily" },
    { name: "GPA Calculator", path: "/college/gpa", cat: "College" },
    { name: "CGPA Calculator", path: "/college/cgpa", cat: "College" },
    { name: "Length Converter", path: "/converter/length", cat: "Converter" },
    { name: "Weight Converter", path: "/converter/weight", cat: "Converter" },
    { name: "Temperature Converter", path: "/converter/temperature", cat: "Converter" },
    { name: "Speed Converter", path: "/converter/speed", cat: "Converter" },
    { name: "Data Converter", path: "/converter/data", cat: "Converter" },
    { name: "Number System", path: "/converter/number-system", cat: "Converter" },
    { name: "SGPA to %", path: "/converter/sgpa", cat: "Academic" },
    { name: "CGPA to %", path: "/converter/cgpa-percentage", cat: "Academic" },
    { name: "Area Converter", path: "/converter/area", cat: "Converter" },
    { name: "Volume Converter", path: "/converter/volume", cat: "Converter" },
    { name: "Time Converter", path: "/converter/time", cat: "Converter" },
    { name: "Power Converter", path: "/converter/power", cat: "Converter" },
    { name: "Pressure Converter", path: "/converter/pressure", cat: "Converter" },
];

function useToolData() {
    const { pathname } = useLocation();
    const current = ALL_TOOLS.find((t) => t.path === pathname);
    const currentCat = current ? current.cat : null;
    const sameCat = ALL_TOOLS.filter((t) => t.cat === currentCat && t.path !== pathname);
    const otherTools = ALL_TOOLS.filter((t) => t.cat !== currentCat).slice(0, 8);
    return { sameCat, otherTools };
}

// LEFT sidebar — More Tools (other categories)
export function MoreTools() {
    const { otherTools } = useToolData();

    return (
        <aside className="more-sidebar">
            <div className="related-group">
                <h4 className="related-title">More Tools</h4>
                <div className="mobile-links-row">
                    {otherTools.map((t, i) => (
                        <Link key={i} to={t.path} className="related-link">
                            <span>{t.name}</span>
                            <span className="related-cat">{t.cat}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
}

// RIGHT sidebar — Related Tools (same category)
export function RelatedTools() {
    const { sameCat } = useToolData();

    if (sameCat.length === 0) return null;

    return (
        <aside className="related-sidebar">
            <div className="related-group">
                <h4 className="related-title">Related Tools</h4>
                <div className="mobile-links-row">
                    {sameCat.map((t, i) => (
                        <Link key={i} to={t.path} className="related-link">{t.name}</Link>
                    ))}
                </div>
            </div>
        </aside>
    );
}
