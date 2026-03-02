import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
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
        <div className="main-content"><div className="container">
            <Breadcrumbs />
                
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

                        {/* SEO Content */}
                        <div className="seo-content mt-8">
                            <h1>SIP Calculator</h1>
                            <p>
                                The SIP (Systematic Investment Plan) Calculator is a powerful free tool designed to help you estimate the wealth you can build through mutual fund investments over time.
                                By investing a fixed amount every month, you can harness the power of compounding to reach your long-term financial goals, such as retirement, buying a house, or funding education.
                                This calculator shows you the future value of your investments by taking your monthly contribution, expected return rate, and investment duration into account.
                            </p>
                            <h2>How it Works</h2>
                            <p>Enter your monthly investment amount, the expected annual return rate (in percentage), and the time period in years. The calculator instantly computes your total invested amount and the estimated wealth gained over that period.</p>

                            <h2>Benefits of the SIP Calculator</h2>
                            <p>It visually demonstrates the magic of compounding interest. By experimenting with different monthly amounts and durations, you can set realistic financial goals and plan your investment journey with confidence.</p>

                            <h2>When to Use</h2>
                            <p>Use it whenever you are planning to start a new mutual fund SIP, adjusting your current investments, or mapping out a long-term wealth creation strategy.</p>

                            <h2>Frequently Asked Questions</h2>
                            <h3>What is a good expected return rate for SIP?</h3>
                            <p>Historically, equity mutual funds have offered around 10% to 12% long-term annual returns, though this varies based on market conditions and the specific fund.</p>

                            <h3>Is the final amount guaranteed?</h3>
                            <p>No, mutual fund investments are subject to market risks. The calculator provides an estimate based on the expected return rate you provide, not a guarantee.</p>

                            <h3>Can I calculate lump sum investments here?</h3>
                            <p>This specific calculator is built for regular monthly SIP contributions. A lump sum calculator uses a different compounding frequency.</p>
                        <FAQSchema faqs={[
    {
        question: "Results\r\n                                    Invested Amount₹{fmt(result.invested)}\r\n                                    Estimated Returns₹{fmt(result.returns)}\r\n                                    Total Value₹{fmt(result.total)}\r\n                                \r\n                            )}\r\n                        \r\n\r\n                        {/* SEO Content */}\r\n                        \r\n                            SIP Calculator\r\n                            \r\n                                The SIP (Systematic Investment Plan) Calculator is a powerful free tool designed to help you estimate the wealth you can build through mutual fund investments over time.\r\n                                By investing a fixed amount every month, you can harness the power of compounding to reach your long-term financial goals, such as retirement, buying a house, or funding education.\r\n                                This calculator shows you the future value of your investments by taking your monthly contribution, expected return rate, and investment duration into account.\r\n                            \r\n                            How it Works\r\n                            Enter your monthly investment amount, the expected annual return rate (in percentage), and the time period in years. The calculator instantly computes your total invested amount and the estimated wealth gained over that period.\r\n\r\n                            Benefits of the SIP Calculator\r\n                            It visually demonstrates the magic of compounding interest. By experimenting with different monthly amounts and durations, you can set realistic financial goals and plan your investment journey with confidence.\r\n\r\n                            When to Use\r\n                            Use it whenever you are planning to start a new mutual fund SIP, adjusting your current investments, or mapping out a long-term wealth creation strategy.\r\n\r\n                            Frequently Asked Questions\r\n                            What is a good expected return rate for SIP?", answer: "Historically, equity mutual funds have offered around 10% to 12% long-term annual returns, though this varies based on market conditions and the specific fund."
    },
    {
        question: "Is the final amount guaranteed?", answer: "No, mutual fund investments are subject to market risks. The calculator provides an estimate based on the expected return rate you provide, not a guarantee."
    },
    {
        question: "Can I calculate lump sum investments here?", answer: "This specific calculator is built for regular monthly SIP contributions. A lump sum calculator uses a different compounding frequency."
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
