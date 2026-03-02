import { useState } from "react";
import BackButton from "../../components/BackButton";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";

export default function GSTCalculator() {
    const [amount, setAmount] = useState("");
    const [gstRate, setGstRate] = useState("18");
    const [isInclusive, setIsInclusive] = useState(false);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const amt = parseFloat(amount);
        const rate = parseFloat(gstRate);
        if (isNaN(amt) || amt <= 0) return;
        let gstAmount, basePrice, totalPrice;
        if (isInclusive) { basePrice = amt / (1 + rate / 100); gstAmount = amt - basePrice; totalPrice = amt; }
        else { basePrice = amt; gstAmount = amt * (rate / 100); totalPrice = amt + gstAmount; }
        setResult({ basePrice: parseFloat(basePrice.toFixed(2)), cgst: parseFloat((gstAmount / 2).toFixed(2)), sgst: parseFloat((gstAmount / 2).toFixed(2)), totalGST: parseFloat(gstAmount.toFixed(2)), totalPrice: parseFloat(totalPrice.toFixed(2)) });
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
                            <h2 className="calc-title">GST Calculator</h2>
                            <div className="calc-form">
                                <div className="form-group"><label>Amount (₹)</label><input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" /></div>
                                <div className="form-group">
                                    <label>GST Rate</label>
                                    <select value={gstRate} onChange={(e) => setGstRate(e.target.value)}><option value="5">5%</option><option value="12">12%</option><option value="18">18%</option><option value="28">28%</option></select>
                                </div>
                                <div className="form-group">
                                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", textTransform: "none", letterSpacing: "0" }}>
                                        <input type="checkbox" checked={isInclusive} onChange={(e) => setIsInclusive(e.target.checked)} /> Amount includes GST
                                    </label>
                                </div>
                                <button className="calc-submit" onClick={calculate}>Calculate GST</button>
                            </div>
                            {result && (
                                <div className="result-card">
                                    <h3>Results</h3>
                                    <div className="result-row"><span className="label">Base Price</span><span className="value">₹{fmt(result.basePrice)}</span></div>
                                    <div className="result-row"><span className="label">CGST ({parseFloat(gstRate) / 2}%)</span><span className="value">₹{fmt(result.cgst)}</span></div>
                                    <div className="result-row"><span className="label">SGST ({parseFloat(gstRate) / 2}%)</span><span className="value">₹{fmt(result.sgst)}</span></div>
                                    <div className="result-row"><span className="label">Total GST</span><span className="value">₹{fmt(result.totalGST)}</span></div>
                                    <div className="result-row"><span className="label">Total Price</span><span className="value">₹{fmt(result.totalPrice)}</span></div>
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
