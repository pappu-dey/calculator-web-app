import { useState } from "react";
import BackButton from "../../components/BackButton";
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
        <div className="main-content">
            <div className="container">
                <BackButton />
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
                    </div>
                    <RelatedTools />
                </div>
            </div>
        </div>
    );
}
