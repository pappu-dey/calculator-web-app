import { useState } from "react";
import BackButton from "../../components/BackButton";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";

export default function PercentageCalculator() {
    const [mode, setMode] = useState("of");
    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");
    const [result, setResult] = useState(null);

    const calculate = () => {
        const a = parseFloat(val1), b = parseFloat(val2);
        if (isNaN(a) || isNaN(b)) return;
        let res;
        switch (mode) {
            case "of": res = (a / 100) * b; break;
            case "whatPercent": res = (a / b) * 100; break;
            case "increase": res = ((b - a) / a) * 100; break;
            default: return;
        }
        setResult(parseFloat(res.toFixed(6)));
    };

    const getLabel = () => {
        switch (mode) {
            case "of": return { l1: "Percentage (%)", l2: "Of Value", rLabel: "Result" };
            case "whatPercent": return { l1: "Value", l2: "Total", rLabel: "Percentage (%)" };
            case "increase": return { l1: "Original Value", l2: "New Value", rLabel: "Change (%)" };
            default: return {};
        }
    };
    const labels = getLabel();

    return (
        <div className="main-content">
            <div className="container">
                <BackButton />
                <div className="page-with-sidebar">
                    <MoreTools />
                    <div className="page-main">
                        <div className="calc-wrapper">
                            <h2 className="calc-title">Percentage Calculator</h2>
                            <div className="mode-tabs">
                                <button className={mode === "of" ? "active" : ""} onClick={() => { setMode("of"); setResult(null); }}>X% of Y</button>
                                <button className={mode === "whatPercent" ? "active" : ""} onClick={() => { setMode("whatPercent"); setResult(null); }}>X is what % of Y</button>
                                <button className={mode === "increase" ? "active" : ""} onClick={() => { setMode("increase"); setResult(null); }}>% Change</button>
                            </div>
                            <div className="calc-form">
                                <div className="form-row">
                                    <div className="form-group"><label>{labels.l1}</label><input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} placeholder="Enter value" /></div>
                                    <div className="form-group"><label>{labels.l2}</label><input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} placeholder="Enter value" /></div>
                                </div>
                                <button className="calc-submit" onClick={calculate}>Calculate</button>
                            </div>
                            {result !== null && (
                                <div className="result-card"><div className="result-highlight"><div className="big-value">{result}</div><div className="big-label">{labels.rLabel}</div></div></div>
                            )}
                        </div>
                    </div>
                    <RelatedTools />
                </div>
            </div>
        </div>
    );
}
