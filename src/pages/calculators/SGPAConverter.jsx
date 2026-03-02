import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";

export default function SGPAConverter() {
    const [sgpa, setSgpa] = useState("");
    const [scheme, setScheme] = useState("vtu");
    const [result, setResult] = useState(null);

    const handleConvert = () => {
        const val = parseFloat(sgpa);
        if (isNaN(val) || val < 0 || val > 10) return;
        let pct;
        switch (scheme) {
            case "vtu": pct = (val - 0.75) * 10; break;
            case "mumbai": pct = (val * 10) - 7.5; break;
            case "ktu": pct = (val - 0.5) * 10; break;
            case "generic10": pct = val * 9.5; break;
            case "generic4": pct = (val / 4) * 100; break;
            default: pct = (val - 0.75) * 10;
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
                            <h2 className="calc-title">SGPA to Percentage</h2>
                            <div className="calc-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Grading Scheme</label>
                                        <select value={scheme} onChange={(e) => { setScheme(e.target.value); setResult(null); }}>
                                            <option value="vtu">VTU — (SGPA - 0.75) x 10</option>
                                            <option value="mumbai">Mumbai Uni — (SGPA x 10) - 7.5</option>
                                            <option value="ktu">KTU — (SGPA - 0.5) x 10</option>
                                            <option value="generic10">Generic 10-pt — SGPA x 9.5</option>
                                            <option value="generic4">Generic 4-pt — (GPA/4) x 100</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>SGPA</label>
                                        <input type="number" step="0.01" value={sgpa} onChange={(e) => { setSgpa(e.target.value); setResult(null); }} placeholder="e.g. 8.5" />
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
                            <h1>SGPA to Percentage Converter</h1>
                            <p>
                                The SGPA to Percentage Converter is a vital tool for university students trying to understand their semester grades in a familiar percentage format.
                                Many colleges issue report cards in SGPA (Semester Grade Point Average), but job applications, loan documents, and further education portals often require your grades listed as a standard percentage.
                                Our tool instantly and accurately translates your SGPA score into a widely accepted percentage metric.
                            </p>
                            <h2>How it Works</h2>
                            <p>Simply enter your SGPA score into the calculator and click convert. The tool immediately references standard university conversion formulas to output your exact percentage equivalent.</p>

                            <h2>Benefits of the SGPA Converter</h2>
                            <p>It saves you from hunting down your university's specific conversion manual and risking manual math errors on important applications. It provides instant, stress-free results.</p>

                            <h2>When to Use</h2>
                            <p>Use it at the end of every semester when updating your resume, applying for merit-based scholarships, or submitting academic transcripts to prospective employers who request a percentage format.</p>

                            <h2>Frequently Asked Questions</h2>
                            <h3>What formula is used for this conversion?</h3>
                            <p>Most Indian universities (like VTU, SPPU, Mumbai University) use the formula: `Percentage = (SGPA * 10) - 7.5`. However, some use a direct multiply by 10 approach depending on their specific grading curve.</p>

                            <h3>What is the difference between SGPA and CGPA?</h3>
                            <p>SGPA represents your academic performance for just one single semester. CGPA (Cumulative Grade Point Average) is the average of all your SGPAs combined across the entire degree program.</p>

                            <h3>Can I use this tool on my mobile phone?</h3>
                            <p>Yes, all of our calculators are heavily optimized for mobile browsers so you can check your grades instantly from anywhere.</p>
                        <FAQSchema faqs={[
    {
        question: "What formula is used for this conversion?", answer: "Most Indian universities (like VTU, SPPU, Mumbai University) use the formula: `Percentage = (SGPA * 10) - 7.5`. However, some use a direct multiply by 10 approach depending on their specific grading curve."
    },
    {
        question: "What is the difference between SGPA and CGPA?", answer: "SGPA represents your academic performance for just one single semester. CGPA (Cumulative Grade Point Average) is the average of all your SGPAs combined across the entire degree program."
    },
    {
        question: "Can I use this tool on my mobile phone?", answer: "Yes, all of our calculators are heavily optimized for mobile browsers so you can check your grades instantly from anywhere."
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
