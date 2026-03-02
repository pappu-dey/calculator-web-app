import { useState } from "react";
import BackButton from "../../components/BackButton";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";

export default function EMICalculator() {
    const [principal, setPrincipal] = useState("");
    const [rate, setRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [result, setResult] = useState(null);

    const calculate = () => {
        const p = parseFloat(principal);
        const r = parseFloat(rate) / 12 / 100;
        const n = parseFloat(tenure) * 12;
        if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r <= 0 || n <= 0) return;
        const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalAmount = emi * n;
        const totalInterest = totalAmount - p;
        setResult({ emi: Math.round(emi), totalInterest: Math.round(totalInterest), totalAmount: Math.round(totalAmount) });
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
                            <h2 className="calc-title">EMI Calculator</h2>
                            <div className="calc-form">
                                <div className="form-group"><label>Loan Amount (₹)</label><input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g. 500000" /></div>
                                <div className="form-row">
                                    <div className="form-group"><label>Interest Rate (% p.a.)</label><input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g. 8.5" /></div>
                                    <div className="form-group"><label>Tenure (Years)</label><input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} placeholder="e.g. 5" /></div>
                                </div>
                                <button className="calc-submit" onClick={calculate}>Calculate EMI</button>
                            </div>
                            {result && (
                                <div className="result-card">
                                    <h3>Results</h3>
                                    <div className="result-row"><span className="label">Monthly EMI</span><span className="value">₹{fmt(result.emi)}</span></div>
                                    <div className="result-row"><span className="label">Total Interest</span><span className="value">₹{fmt(result.totalInterest)}</span></div>
                                    <div className="result-row"><span className="label">Total Amount</span><span className="value">₹{fmt(result.totalAmount)}</span></div>
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
