import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
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
        <div className="main-content"><div className="container">
            <Breadcrumbs />
                
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

                        {/* SEO Content */}
                        <div className="seo-content mt-8">
                            <h1>GST Calculator</h1>
                            <p>
                                The GST Calculator is an essential tool for business owners, freelancers, and consumers to accurately calculate the Goods and Services Tax added to a product or service.
                                Whether you need to add GST to a base price to find the final selling price, or extract GST from a total price to find the original pre-tax amount, this tool handles it effortlessly.
                                It supports all standard GST tax slabs, helping you create accurate invoices and maintain proper accounting records without manual errors.
                            </p>
                            <h2>How it Works</h2>
                            <p>Enter the initial amount and select your desired GST percentage rate. Then, choose whether you want to "Add GST" (to calculate the final price including tax) or "Remove GST" (to separate the tax from a total inclusive price).</p>

                            <h2>Benefits of the GST Calculator</h2>
                            <p>It saves time during billing and invoicing, ensures tax compliance, and eliminates manual calculation mistakes. The clear breakdown of CGST/SGST or IGST helps simplify your accounting process.</p>

                            <h2>When to Use</h2>
                            <p>Use this calculator when generating invoices, calculating retail prices for your products, filing tax returns, or checking the tax amount on a purchase receipt.</p>

                            <h2>Frequently Asked Questions</h2>
                            <h3>What is the difference between adding and removing GST?</h3>
                            <p>Adding GST calculates the tax on top of your base price. Removing GST extracts the tax amount from a final price that already includes the tax.</p>

                            <h3>Is this tool free for commercial use?</h3>
                            <p>Yes, our GST calculator is completely free for everyone, including business owners, accountants, and freelancers.</p>

                            <h3>Does this calculator work for all tax slabs?</h3>
                            <p>Yes, you can manually enter any percentage rate to match the specific tax slab appropriate for your goods or services.</p>
                        <FAQSchema faqs={[
    {
        question: "Results\r\n                                    Base Price₹{fmt(result.basePrice)}\r\n                                    CGST ({parseFloat(gstRate) / 2}%)₹{fmt(result.cgst)}\r\n                                    SGST ({parseFloat(gstRate) / 2}%)₹{fmt(result.sgst)}\r\n                                    Total GST₹{fmt(result.totalGST)}\r\n                                    Total Price₹{fmt(result.totalPrice)}\r\n                                \r\n                            )}\r\n                        \r\n\r\n                        {/* SEO Content */}\r\n                        \r\n                            GST Calculator\r\n                            \r\n                                The GST Calculator is an essential tool for business owners, freelancers, and consumers to accurately calculate the Goods and Services Tax added to a product or service.\r\n                                Whether you need to add GST to a base price to find the final selling price, or extract GST from a total price to find the original pre-tax amount, this tool handles it effortlessly.\r\n                                It supports all standard GST tax slabs, helping you create accurate invoices and maintain proper accounting records without manual errors.\r\n                            \r\n                            How it Works\r\n                            Enter the initial amount and select your desired GST percentage rate. Then, choose whether you want to \"Add GST\" (to calculate the final price including tax) or \"Remove GST\" (to separate the tax from a total inclusive price).\r\n\r\n                            Benefits of the GST Calculator\r\n                            It saves time during billing and invoicing, ensures tax compliance, and eliminates manual calculation mistakes. The clear breakdown of CGST/SGST or IGST helps simplify your accounting process.\r\n\r\n                            When to Use\r\n                            Use this calculator when generating invoices, calculating retail prices for your products, filing tax returns, or checking the tax amount on a purchase receipt.\r\n\r\n                            Frequently Asked Questions\r\n                            What is the difference between adding and removing GST?", answer: "Adding GST calculates the tax on top of your base price. Removing GST extracts the tax amount from a final price that already includes the tax."
    },
    {
        question: "Is this tool free for commercial use?", answer: "Yes, our GST calculator is completely free for everyone, including business owners, accountants, and freelancers."
    },
    {
        question: "Does this calculator work for all tax slabs?", answer: "Yes, you can manually enter any percentage rate to match the specific tax slab appropriate for your goods or services."
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
