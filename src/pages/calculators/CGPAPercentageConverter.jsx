import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";

export default function CGPAPercentageConverter() {
    const [cgpa, setCgpa] = useState("");
    const [scheme, setScheme] = useState("cbse");
    const [result, setResult] = useState(null);

    const handleConvert = () => {
        const val = parseFloat(cgpa);
        if (isNaN(val) || val < 0) return;
        let pct;
        switch (scheme) {
            case "cbse": pct = val * 9.5; break;
            case "vtu": pct = (val - 0.75) * 10; break;
            case "mumbai": pct = (val * 10) - 7.5; break;
            case "anna": pct = (val - 0.75) * 10; break;
            case "generic10": pct = val * 9.5; break;
            case "generic4": pct = (val / 4) * 100; break;
            default: pct = val * 9.5;
        }
        setResult(pct);
    };

    return (
        <div className="main-content"><div className="container">
            <Breadcrumbs />
                
                <div className="page-with-sidebar">
                    <MoreTools />
                    <div className="page-main">
                        <div className="calc-wrapper">
                            <h2 className="calc-title">CGPA to Percentage</h2>
                            <div className="calc-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Grading Scheme</label>
                                        <select value={scheme} onChange={(e) => { setScheme(e.target.value); setResult(null); }}>
                                            <option value="cbse">CBSE — CGPA x 9.5</option>
                                            <option value="vtu">VTU — (CGPA - 0.75) x 10</option>
                                            <option value="mumbai">Mumbai Uni — (CGPA x 10) - 7.5</option>
                                            <option value="anna">Anna Uni — (CGPA - 0.75) x 10</option>
                                            <option value="generic10">Generic 10-pt — CGPA x 9.5</option>
                                            <option value="generic4">Generic 4-pt — (GPA / 4) x 100</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>CGPA</label>
                                        <input type="number" step="0.01" value={cgpa} onChange={(e) => { setCgpa(e.target.value); setResult(null); }} placeholder="e.g. 8.2" />
                                    </div>
                                </div>
                                <button className="convert-btn" onClick={handleConvert}>Convert</button>
                            </div>
                            {result !== null && (
                                <div className="result-card"><div className="result-highlight"><div className="big-value">{result.toFixed(2)}%</div><div className="big-label">Percentage</div></div></div>
                            )}
                        </div>
                        {/* SEO Content */}
                        <div className="seo-content mt-8">
                            <h1>CGPA to Percentage Converter</h1>
                            <p>
                                The CGPA to Percentage Converter is a necessary tool for graduating students transitioning into the professional world.
                                While your university awards degrees based on a Cumulative Grade Point Average (CGPA), most corporate HR departments and international graduate schools request your final score as a standard percentage.
                                This tool instantly calculates that required number so you can confidently fill out job and college applications.
                            </p>
                            <h2>How it Works</h2>
                            <p>Enter your final CGPA score into the tool. It instantly applies the officially recognized conversion formula to output your total academic percentage.</p>

                            <h2>Benefits of the CGPA Converter</h2>
                            <p>It prevents stressful delays when filling out important applications by giving you the exact, converted number instantly. No complex manual multiplication required.</p>

                            <h2>When to Use</h2>
                            <p>Use it when you are finalizing your resume upon graduation, applying for a Master's degree program, or registering for competitive exams that require percentage inputs.</p>

                            <h2>Frequently Asked Questions</h2>
                            <h3>How is CGPA converted to percentage?</h3>
                            <p>In many educational systems (like CBSE in India), the standard formula is to multiply your CGPA by 9.5 (i.e., Percentage = CGPA × 9.5). Always verify if your specific university has a custom overarching formula.</p>

                            <h3>Why do jobs ask for a percentage instead of a CGPA?</h3>
                            <p>Because different universities use different CGPA scales (e.g., out of 4.0, 7.0, or 10.0). A percentage normalizes all scores so employers can accurately compare candidates from different colleges.</p>

                            <h3>Is my CGPA data recorded here?</h3>
                            <p>No, your privacy is fully protected. All math is done locally inside your browser, and we do not store or track any of your personal academic data.</p>
                        <FAQSchema faqs={[
    {
        question: "How is CGPA converted to percentage?", answer: "In many educational systems (like CBSE in India), the standard formula is to multiply your CGPA by 9.5 (i.e., Percentage = CGPA × 9.5). Always verify if your specific university has a custom overarching formula."
    },
    {
        question: "Why do jobs ask for a percentage instead of a CGPA?", answer: "Because different universities use different CGPA scales (e.g., out of 4.0, 7.0, or 10.0). A percentage normalizes all scores so employers can accurately compare candidates from different colleges."
    },
    {
        question: "Is my CGPA data recorded here?", answer: "No, your privacy is fully protected. All math is done locally inside your browser, and we do not store or track any of your personal academic data."
    }
]} />
                        </div>
                    </div>
                    <RelatedTools />
                </div>
            </div>
        </div>
    );
}
