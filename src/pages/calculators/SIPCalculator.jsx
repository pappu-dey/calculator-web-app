import { useState } from "react";
import BackButton from "../../components/BackButton";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";

export default function SIPCalculator() {
    const [monthly, setMonthly] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState(null);

    const calculate = () => {
        const p = parseFloat(monthly);
        const r = parseFloat(rate) / 12 / 100;
        const n = parseFloat(years) * 12;
        if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r <= 0 || n <= 0) return;
        const futureValue = p * (((Math.pow(1 + r, n)) - 1) / r) * (1 + r);
        const invested = p * n;
        const returns = futureValue - invested;
        setResult({ invested: Math.round(invested), returns: Math.round(returns), total: Math.round(futureValue) });
    };

    const fmt = (n) => n.toLocaleString("en-IN");

    return (
        <div className="main-content">
            <div className="container">
                <BackButton />
                <div className="page-with-sidebar">
                    <MoreTools />
                    <div className="page-main">
                        <div className="calc-wrapper">
                            <h2 className="calc-title">SIP Calculator</h2>
                            <div className="calc-form">
                                <div className="form-group"><label>Monthly Investment (₹)</label><input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} placeholder="e.g. 5000" /></div>
                                <div className="form-row">
                                    <div className="form-group"><label>Expected Return (% p.a.)</label><input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g. 12" /></div>
                                    <div className="form-group"><label>Time Period (Years)</label><input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g. 10" /></div>
                                </div>
                                <button className="calc-submit" onClick={calculate}>Calculate</button>
                            </div>
                            {result && (
                                <div className="result-card">
                                    <h3>Results</h3>
                                    <div className="result-row"><span className="label">Invested Amount</span><span className="value">₹{fmt(result.invested)}</span></div>
                                    <div className="result-row"><span className="label">Estimated Returns</span><span className="value">₹{fmt(result.returns)}</span></div>
                                    <div className="result-row"><span className="label">Total Value</span><span className="value">₹{fmt(result.total)}</span></div>
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
