import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";

const GRADES = [
    { label: "O (10)", value: 10 }, { label: "A+ (9)", value: 9 }, { label: "A (8)", value: 8 },
    { label: "B+ (7)", value: 7 }, { label: "B (6)", value: 6 }, { label: "C (5)", value: 5 },
    { label: "D (4)", value: 4 }, { label: "F (0)", value: 0 },
];

const emptyRow = () => ({ subject: "", grade: "10", credits: "" });

export default function GPACalculator() {
    const [rows, setRows] = useState([emptyRow(), emptyRow(), emptyRow(), emptyRow()]);
    const [result, setResult] = useState(null);

    const updateRow = (i, field, value) => { const updated = [...rows]; updated[i] = { ...updated[i], [field]: value }; setRows(updated); };
    const addRow = () => setRows([...rows, emptyRow()]);
    const removeRow = (i) => { if (rows.length > 1) setRows(rows.filter((_, idx) => idx !== i)); };

    const calculate = () => {
        let totalPoints = 0, totalCredits = 0;
        rows.forEach((row) => { const c = parseFloat(row.credits), g = parseFloat(row.grade); if (!isNaN(c) && c > 0) { totalPoints += g * c; totalCredits += c; } });
        if (totalCredits === 0) return;
        setResult({ gpa: parseFloat((totalPoints / totalCredits).toFixed(2)), totalCredits });
    };

    return (
        <div className="main-content"><div className="container">
            <Breadcrumbs />
                
                <div className="page-with-sidebar">
                    <MoreTools />
                    <div className="page-main">
                        <div className="calc-wrapper">
                            <h2 className="calc-title">GPA Calculator</h2>
                            <div className="dynamic-rows">
                                {rows.map((row, i) => (
                                    <div className="dynamic-row" key={i}>
                                        <input type="text" placeholder={`Subject ${i + 1}`} value={row.subject} onChange={(e) => updateRow(i, "subject", e.target.value)} />
                                        <select value={row.grade} onChange={(e) => updateRow(i, "grade", e.target.value)}>{GRADES.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}</select>
                                        <input type="number" placeholder="Credits" value={row.credits} onChange={(e) => updateRow(i, "credits", e.target.value)} />
                                        <button className="remove-row-btn" onClick={() => removeRow(i)}>×</button>
                                    </div>
                                ))}
                            </div>
                            <button className="add-row-btn" onClick={addRow} style={{ marginTop: "10px" }}>+ Add Subject</button>
                            <button className="calc-submit" onClick={calculate} style={{ marginTop: "12px" }}>Calculate GPA</button>
                            {result && (
                                <div className="result-card">
                                    <div className="result-highlight"><div className="big-value">{result.gpa}</div><div className="big-label">GPA (out of 10)</div></div>
                                    <div className="result-row"><span className="label">Total Credits</span><span className="value">{result.totalCredits}</span></div>
                                </div>
                            )}
                        </div>

                        {/* SEO Content */}
                        <div className="seo-content mt-8">
                            <h1>GPA Calculator</h1>
                            <p>
                                The GPA (Grade Point Average) Calculator is an essential academic tool designed specifically for high school and college students to easily track their academic performance.
                                Instead of manually calculating course credits and grade points, you can input your current semesters' grades and credit hours, and our tool does the heavy lifting instantly.
                                Whether your goal is to maintain a scholarship, graduate with honors, or successfully apply to grad school, this calculator gives you a clear picture of where you stand.
                            </p>
                            <h2>How it Works</h2>
                            <p>Enter the grade you received and the total credit hours for each course you are taking. The calculator multiplies the grade value by the credits, sums them up, and divides by your total attempted credits to instantly find your semester GPA.</p>

                            <h2>Benefits of the GPA Calculator</h2>
                            <p>It eliminates manual calculation errors and saves you immense time during busy finals weeks. The dynamic row addition lets you calculate as many courses as you need without limits.</p>

                            <h2>When to Use</h2>
                            <p>Use it at the beginning of a semester to set target grades, at midterms to predict your final standing, or at the end of the semester to calculate your official GPA.</p>

                            <h2>Frequently Asked Questions</h2>
                            <h3>Does this calculator use a 4.0 scale?</h3>
                            <p>Yes, our tool follows the standard 4.0 GPA grading scale widely used across US high schools and universities.</p>

                            <h3>Can I calculate a weighted GPA?</h3>
                            <p>Currently, this tool calculates an unweighted GPA based on standard letter grades. You can adjust the "Grade" input manually if you want to factor in AP/Honors scaling.</p>

                            <h3>Is my grade data saved?</h3>
                            <p>No, your privacy is our priority. Your calculation happens directly in your browser and is not saved to any database once you close the page.</p>
                        <FAQSchema faqs={[
    {
        question: "Does this calculator use a 4.0 scale?", answer: "Yes, our tool follows the standard 4.0 GPA grading scale widely used across US high schools and universities."
    },
    {
        question: "Can I calculate a weighted GPA?", answer: "Currently, this tool calculates an unweighted GPA based on standard letter grades. You can adjust the \"Grade\" input manually if you want to factor in AP/Honors scaling."
    },
    {
        question: "Is my grade data saved?", answer: "No, your privacy is our priority. Your calculation happens directly in your browser and is not saved to any database once you close the page."
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
