import { useState } from "react";
import BackButton from "../../components/BackButton";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";

export default function BMICalculator() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [result, setResult] = useState(null);

    const calculate = () => {
        const w = parseFloat(weight);
        const h = parseFloat(height) / 100;
        if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;
        const bmi = w / (h * h);
        let category, badge;
        if (bmi < 18.5) { category = "Underweight"; badge = "warning"; }
        else if (bmi < 25) { category = "Normal"; badge = "normal"; }
        else if (bmi < 30) { category = "Overweight"; badge = "warning"; }
        else { category = "Obese"; badge = "danger"; }
        setResult({ bmi: parseFloat(bmi.toFixed(1)), category, badge });
    };

    return (
        <div className="main-content">
            <div className="container">
                <BackButton />
                <div className="page-with-sidebar">
                    <MoreTools />
                    <div className="page-main">
                        <div className="calc-wrapper">
                            <h2 className="calc-title">BMI Calculator</h2>
                            <div className="calc-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Weight (kg)</label>
                                        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70" />
                                    </div>
                                    <div className="form-group">
                                        <label>Height (cm)</label>
                                        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 175" />
                                    </div>
                                </div>
                                <button className="calc-submit" onClick={calculate}>Calculate BMI</button>
                            </div>
                            {result && (
                                <div className="result-card">
                                    <div className="result-highlight">
                                        <div className="big-value">{result.bmi}</div>
                                        <div className="big-label">BMI Score</div>
                                        <span className={`result-badge ${result.badge}`}>{result.category}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <RelatedTools />
                </div>
            </div>
        </div>
    );
}
