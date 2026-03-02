import { useState } from "react";
import BackButton from "../../components/BackButton";
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
        <div className="main-content">
            <div className="container">
                <BackButton />
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
                    </div>
                    <RelatedTools />
                </div>
            </div>
        </div>
    );
}
