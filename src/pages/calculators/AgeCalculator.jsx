import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";

export default function AgeCalculator() {
    const [dob, setDob] = useState("");
    const [result, setResult] = useState(null);

    const calculate = () => {
        if (!dob) return;
        const birth = new Date(dob);
        const today = new Date();
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();
        if (days < 0) { months--; const pm = new Date(today.getFullYear(), today.getMonth(), 0); days += pm.getDate(); }
        if (months < 0) { years--; months += 12; }
        const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = years * 12 + months;
        setResult({ years, months, days, totalDays, totalWeeks, totalMonths });
    };

    return (
        <div className="main-content"><div className="container">
            <Breadcrumbs />
                
                <div className="page-with-sidebar">
                    <MoreTools />
                    <div className="page-main">
                        <div className="calc-wrapper">
                            <h2 className="calc-title">Age Calculator</h2>
                            <div className="calc-form">
                                <div className="form-group"><label>Date of Birth</label><input type="date" value={dob} onChange={(e) => setDob(e.target.value)} /></div>
                                <button className="calc-submit" onClick={calculate}>Calculate Age</button>
                            </div>
                            {result && (
                                <div className="result-card">
                                    <div className="result-highlight"><div className="big-value">{result.years}</div><div className="big-label">Years Old</div></div>
                                    <div className="result-row"><span className="label">Exact Age</span><span className="value">{result.years}y {result.months}m {result.days}d</span></div>
                                    <div className="result-row"><span className="label">Total Months</span><span className="value">{result.totalMonths.toLocaleString()}</span></div>
                                    <div className="result-row"><span className="label">Total Weeks</span><span className="value">{result.totalWeeks.toLocaleString()}</span></div>
                                    <div className="result-row"><span className="label">Total Days</span><span className="value">{result.totalDays.toLocaleString()}</span></div>
                                </div>
                            )}
                        </div>

                        {/* SEO Content */}
                        <div className="seo-content mt-8">
                            <h1>Age Calculator</h1>
                            <p>
                                The Age Calculator is a fast and precise tool designed to calculate your exact age down to the years, months, and days.
                                Whether you need to quickly check exactly how old you are today, calculate someone's age on a specific future date, or find out the age difference between two dates, this tool provides instant results.
                                It is perfect for filling out official forms, planning birthday events, or simply satisfying your curiosity.
                            </p>
                            <h2>How it Works</h2>
                            <p>Simply select your date of birth, and optionally select a specific comparison date (it defaults to today's date). The calculator will process the dates and show you the exact time elapsed between them.</p>

                            <h2>Benefits of the Age Calculator</h2>
                            <p>It saves you the mental gymnastics of counting leap years or different month lengths. You get a perfect, error-free result instantly.</p>

                            <h2>When to Use</h2>
                            <p>Use it when applying for passports or visas, calculating age eligibility for sports or schools, or preparing a countdown for an upcoming milestone birthday.</p>

                            <h2>Frequently Asked Questions</h2>
                            <h3>Does this calculator account for leap years?</h3>
                            <p>Yes! Our age calculator automatically accounts for the extra days in leap years to ensure your age is calculated flawlessly.</p>

                            <h3>Can I calculate age for a past date?</h3>
                            <p>Absolutely. You can change "Today's Date" to a past date to find out exactly how old you or someone else was on that specific day in history.</p>

                            <h3>Is this tool only for human ages?</h3>
                            <p>Not at all! You can use it to find the exact age of your pets, buildings, historical events, or even your business.</p>
                        <FAQSchema faqs={[
    {
        question: "Does this calculator account for leap years?", answer: "Yes! Our age calculator automatically accounts for the extra days in leap years to ensure your age is calculated flawlessly."
    },
    {
        question: "Can I calculate age for a past date?", answer: "Absolutely. You can change \"Today's Date\" to a past date to find out exactly how old you or someone else was on that specific day in history."
    },
    {
        question: "Is this tool only for human ages?", answer: "Not at all! You can use it to find the exact age of your pets, buildings, historical events, or even your business."
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
