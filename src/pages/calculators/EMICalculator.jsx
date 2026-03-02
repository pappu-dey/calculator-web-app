import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
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
        <div className="main-content"><div className="container">
            <Breadcrumbs />
                
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

                        {/* SEO Content */}
                        <div className="seo-content mt-8">
                            <h1>EMI Calculator</h1>
                            <p>
                                The EMI Calculator is an essential financial tool that helps you calculate your Equated Monthly Installment for home loans, car loans, personal loans, and more.
                                By inputting your total loan amount, interest rate, and loan tenure, you can instantly see exactly how much you need to pay each month.
                                This empowers you to make smarter financial decisions, plan your monthly budget accurately, and understand the total interest you will pay over the lifetime of the loan.
                            </p>
                            <h2>How it Works</h2>
                            <p>Enter the principal loan amount, the annual interest rate, and the duration of the loan in months or years. The calculator uses the standard EMI formula to instantly display your monthly payment, total interest, and total payable amount.</p>

                            <h2>Benefits of the EMI Calculator</h2>
                            <p>It eliminates complex manual math and provides instant estimates. You can easily adjust the loan duration or amount to see which EMI fits comfortably into your monthly budget before committing to a bank.</p>

                            <h2>When to Use</h2>
                            <p>Use this tool before applying for any type of loan (home, auto, personal, or education) to ensure you can afford the monthly repayments without financial stress.</p>

                            <h2>Frequently Asked Questions</h2>
                            <h3>Is the EMI calculator accurate?</h3>
                            <p>Yes, it uses the exact mathematical formula used by banks. However, your actual bank EMI might vary slightly due to processing fees or changing interest rates.</p>

                            <h3>Can I use this for a car loan?</h3>
                            <p>Absolutely! The EMI calculator works perfectly for car loans, home loans, bike loans, and personal loans.</p>

                            <h3>How do I lower my EMI?</h3>
                            <p>You can lower your EMI by either increasing the loan tenure (duration), securing a lower interest rate, or making a larger initial down payment.</p>
                        <FAQSchema faqs={[
    {
        question: "Results\r\n                                    Monthly EMI₹{fmt(result.emi)}\r\n                                    Total Interest₹{fmt(result.totalInterest)}\r\n                                    Total Amount₹{fmt(result.totalAmount)}\r\n                                \r\n                            )}\r\n                        \r\n\r\n                        {/* SEO Content */}\r\n                        \r\n                            EMI Calculator\r\n                            \r\n                                The EMI Calculator is an essential financial tool that helps you calculate your Equated Monthly Installment for home loans, car loans, personal loans, and more.\r\n                                By inputting your total loan amount, interest rate, and loan tenure, you can instantly see exactly how much you need to pay each month.\r\n                                This empowers you to make smarter financial decisions, plan your monthly budget accurately, and understand the total interest you will pay over the lifetime of the loan.\r\n                            \r\n                            How it Works\r\n                            Enter the principal loan amount, the annual interest rate, and the duration of the loan in months or years. The calculator uses the standard EMI formula to instantly display your monthly payment, total interest, and total payable amount.\r\n\r\n                            Benefits of the EMI Calculator\r\n                            It eliminates complex manual math and provides instant estimates. You can easily adjust the loan duration or amount to see which EMI fits comfortably into your monthly budget before committing to a bank.\r\n\r\n                            When to Use\r\n                            Use this tool before applying for any type of loan (home, auto, personal, or education) to ensure you can afford the monthly repayments without financial stress.\r\n\r\n                            Frequently Asked Questions\r\n                            Is the EMI calculator accurate?", answer: "Yes, it uses the exact mathematical formula used by banks. However, your actual bank EMI might vary slightly due to processing fees or changing interest rates."
    },
    {
        question: "Can I use this for a car loan?", answer: "Absolutely! The EMI calculator works perfectly for car loans, home loans, bike loans, and personal loans."
    },
    {
        question: "How do I lower my EMI?", answer: "You can lower your EMI by either increasing the loan tenure (duration), securing a lower interest rate, or making a larger initial down payment."
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
