import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
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
        <div className="main-content"><div className="container">
            <Breadcrumbs />
                
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

                        {/* SEO Content */}
                        <div className="seo-content mt-8">
                            <h1>Discount Calculator</h1>
                            <p>
                                The Discount Calculator is the ultimate shopping companion that helps you quickly figure out exactly how much money you will save during a sale.
                                No more guessing if a "25% off" sale is actually a good deal. Simply enter the original price of the item and the discount percentage, and our tool instantly calculates the amount saved and the final price you need to pay at checkout.
                            </p>
                            <h2>How it Works</h2>
                            <p>You supply the original price of the product and the discount rate (in percentage). The calculator works out the math instantly, revealing the discounted price and your total savings.</p>

                            <h2>Benefits of the Discount Calculator</h2>
                            <p>It helps you budget your shopping trips accurately, preventing surprises at the checkout counter. It works flawlessly on mobile, making it the perfect in-store companion.</p>

                            <h2>When to Use</h2>
                            <p>Use it during Black Friday, holiday sales, clearance events, or anytime you have a promotional coupon that offers a percentage off your total purchase.</p>

                            <h2>Frequently Asked Questions</h2>
                            <h3>Can this tool calculate tax as well?</h3>
                            <p>Currently, this tool focuses purely on the discount. However, you can use our Percentage Calculator or GST Calculator for tax-specific math.</p>

                            <h3>How do I calculate multiple discounts?</h3>
                            <p>If an item has an additional "10% off the reduced price", simply calculate the first discount, take the new final price, and enter it as the original price for the second calculation.</p>

                            <h3>Is it free to use on my phone while shopping?</h3>
                            <p>Yes, it is 100% free, requires no app downloads, and loads ultra-fast on mobile browsers instantly in the store.</p>
                        <FAQSchema faqs={[
    {
        question: "Can this tool calculate tax as well?", answer: "Currently, this tool focuses purely on the discount. However, you can use our Percentage Calculator or GST Calculator for tax-specific math."
    },
    {
        question: "How do I calculate multiple discounts?", answer: "If an item has an additional \"10% off the reduced price\", simply calculate the first discount, take the new final price, and enter it as the original price for the second calculation."
    },
    {
        question: "Is it free to use on my phone while shopping?", answer: "Yes, it is 100% free, requires no app downloads, and loads ultra-fast on mobile browsers instantly in the store."
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
