import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";

const emptyRow = () => ({ semester: "", gpa: "", credits: "" });

export default function CGPACalculator() {
    const [rows, setRows] = useState([emptyRow(), emptyRow(), emptyRow(), emptyRow()]);
    const [result, setResult] = useState(null);

    const updateRow = (i, field, value) => { const updated = [...rows]; updated[i] = { ...updated[i], [field]: value }; setRows(updated); };
    const addRow = () => setRows([...rows, emptyRow()]);
    const removeRow = (i) => { if (rows.length > 1) setRows(rows.filter((_, idx) => idx !== i)); };

    const calculate = () => {
        let totalPoints = 0, totalCredits = 0;
        rows.forEach((row) => { const g = parseFloat(row.gpa), c = parseFloat(row.credits); if (!isNaN(g) && !isNaN(c) && c > 0) { totalPoints += g * c; totalCredits += c; } });
        if (totalCredits === 0) return;
        const cgpa = totalPoints / totalCredits;
        setResult({ cgpa: parseFloat(cgpa.toFixed(2)), totalCredits, percentage: parseFloat((cgpa * 9.5).toFixed(2)) });
    };

    return (
        <div className="main-content"><div className="container">
            <Breadcrumbs />
                
                <div className="page-with-sidebar">
                    <MoreTools />
                    <div className="page-main">
                        <div className="calc-wrapper">
                            <h2 className="calc-title">CGPA Calculator</h2>
                            <div className="dynamic-rows">
                                {rows.map((row, i) => (
                                    <div className="dynamic-row" key={i}>
                                        <input type="text" placeholder={`Semester ${i + 1}`} value={row.semester} onChange={(e) => updateRow(i, "semester", e.target.value)} />
                                        <input type="number" placeholder="GPA" value={row.gpa} onChange={(e) => updateRow(i, "gpa", e.target.value)} step="0.01" min="0" max="10" />
                                        <input type="number" placeholder="Credits" value={row.credits} onChange={(e) => updateRow(i, "credits", e.target.value)} />
                                        <button className="remove-row-btn" onClick={() => removeRow(i)}>×</button>
                                    </div>
                                ))}
                            </div>
                            <button className="add-row-btn" onClick={addRow} style={{ marginTop: "10px" }}>+ Add Semester</button>
                            <button className="calc-submit" onClick={calculate} style={{ marginTop: "12px" }}>Calculate CGPA</button>
                            {result && (
                                <div className="result-card">
                                    <div className="result-highlight"><div className="big-value">{result.cgpa}</div><div className="big-label">CGPA (out of 10)</div></div>
                                    <div className="result-row"><span className="label">Total Credits</span><span className="value">{result.totalCredits}</span></div>
                                    <div className="result-row"><span className="label">Approx. Percentage</span><span className="value">{result.percentage}%</span></div>
                                </div>
                            )}
                        </div>

                        {/* SEO Content */}
                        <div className="seo-content mt-8">
                            <h1>CGPA Calculator</h1>
                            <p>
                                The CGPA (Cumulative Grade Point Average) Calculator is a vital tool for university and college students to measure their overall academic performance across their entire degree.
                                Unlike a standard GPA that measures a single semester, the CGPA takes into account all your completed semesters, giving you your final overarching score.
                                This is critical information when preparing your resume for job applications, internships, or applying for specialized post-graduate programs.
                            </p>
                            <h2>How it Works</h2>
                            <p>Simply enter your previous semester's GPA and the total credits you attempted that semester. Add a row for every semester you have completed. The tool instantly calculates your overarching, lifetime CGPA.</p>

                            <h2>Benefits of the CGPA Calculator</h2>
                            <p>It provides an instant, accurate picture of your entire academic career. You can easily play with "What-If" scenarios to see what grades you need in your final semesters to boost your overall CGPA to a target number.</p>

                            <h2>When to Use</h2>
                            <p>Use it when you are updating your resume at the end of every academic year, or when you are planning your course load to ensure you meet graduation requirements.</p>

                            <h2>Frequently Asked Questions</h2>
                            <h3>What is the difference between GPA and CGPA?</h3>
                            <p>Your GPA is your average score for one specific semester or term. Your CGPA is the cumulative average of all your semesters combined across your entire degree program.</p>

                            <h3>Can I figure out how to raise my CGPA?</h3>
                            <p>Yes! Just add a new row for your upcoming semester, input the total credits, and test different hypothetical GPAs to see how it moves your final CGPA.</p>

                            <h3>Is the CGPA calculator free?</h3>
                            <p>Yes, all of our academic tools, including the CGPA and SGPA calculators, are entirely free to use with no account required.</p>
                        <FAQSchema faqs={[
    {
        question: "What is the difference between GPA and CGPA?", answer: "Your GPA is your average score for one specific semester or term. Your CGPA is the cumulative average of all your semesters combined across your entire degree program."
    },
    {
        question: "Can I figure out how to raise my CGPA?", answer: "Yes! Just add a new row for your upcoming semester, input the total credits, and test different hypothetical GPAs to see how it moves your final CGPA."
    },
    {
        question: "Is the CGPA calculator free?", answer: "Yes, all of our academic tools, including the CGPA and SGPA calculators, are entirely free to use with no account required."
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
