import { useState } from "react";
import BackButton from "../../components/BackButton";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";

export default function DiscountCalculator() {
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [result, setResult] = useState(null);

    const calculate = () => {
        const p = parseFloat(price), d = parseFloat(discount);
        if (isNaN(p) || isNaN(d) || p <= 0 || d < 0) return;
        const discountAmount = (p * d) / 100;
        const finalPrice = p - discountAmount;
        setResult({ original: p, discountAmount: parseFloat(discountAmount.toFixed(2)), finalPrice: parseFloat(finalPrice.toFixed(2)), savings: parseFloat(discountAmount.toFixed(2)) });
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
                            <h2 className="calc-title">Discount Calculator</h2>
                            <div className="calc-form">
                                <div className="form-row">
                                    <div className="form-group"><label>Original Price (₹)</label><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 1000" /></div>
                                    <div className="form-group"><label>Discount (%)</label><input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="e.g. 20" /></div>
                                </div>
                                <button className="calc-submit" onClick={calculate}>Calculate</button>
                            </div>
                            {result && (
                                <div className="result-card">
                                    <div className="result-highlight"><div className="big-value">₹{fmt(result.finalPrice)}</div><div className="big-label">Final Price</div></div>
                                    <div className="result-row"><span className="label">Original Price</span><span className="value">₹{fmt(result.original)}</span></div>
                                    <div className="result-row"><span className="label">You Save</span><span className="value">₹{fmt(result.savings)}</span></div>
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
