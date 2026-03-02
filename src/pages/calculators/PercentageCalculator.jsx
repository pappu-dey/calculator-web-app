import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
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
        <div className="main-content"><div className="container">
            <Breadcrumbs />
                
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

                        {/* SEO Content */}
                        <div className="seo-content mt-8">
                            <h1>Percentage Calculator</h1>
                            <p>
                                The Percentage Calculator is a simple, free online tool that makes finding percentages fast and effortless.
                                Whether you are trying to figure out a discount on a sale item, calculating tax, determining a tip at a restaurant, or finding the percentage difference between two numbers, this tool handles it all.
                                You no longer need to remember complicated formulas; simply plug in your numbers and let the calculator do the work for you instantly and accurately.
                            </p>
                            <h2>How it Works</h2>
                            <p>Our tool offers multiple inputs so you can calculate "What is X% of Y?" or "X is what percent of Y?". Just enter the values into the relevant fields, and the result updates immediately.</p>

                            <h2>Benefits of the Percentage Calculator</h2>
                            <p>It saves time and prevents mathematical errors. The straightforward design means anyone can use it, regardless of their math skills, making everyday financial decisions much easier.</p>

                            <h2>When to Use</h2>
                            <p>It is ideal for shopping discounts, calculating tips, analyzing business growth, determining grade percentages, or estimating tax amounts.</p>

                            <h2>Frequently Asked Questions</h2>
                            <h3>How do I calculate a discount using this tool?</h3>
                            <p>Use the "What is X% of Y" feature. If an item is $50 and 20% off, enter 20% of 50 to see the discount amount.</p>

                            <h3>Is this tool free?</h3>
                            <p>Yes, our percentage calculator is completely free, mobile-friendly, and requires no downloads.</p>

                            <h3>Can it calculate percentage increase and decrease?</h3>
                            <p>Absolutely! It is widely used for finding the exact percentage change between an old value and a new value.</p>
                        <FAQSchema faqs={[
    {
        question: "How do I calculate a discount using this tool?", answer: "Use the \"What is X% of Y\" feature. If an item is $50 and 20% off, enter 20% of 50 to see the discount amount."
    },
    {
        question: "Is this tool free?", answer: "Yes, our percentage calculator is completely free, mobile-friendly, and requires no downloads."
    },
    {
        question: "Can it calculate percentage increase and decrease?", answer: "Absolutely! It is widely used for finding the exact percentage change between an old value and a new value."
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
