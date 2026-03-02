import { useState } from "react";
import BackButton from "../../components/BackButton";
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
        <div className="main-content">
            <div className="container">
                <BackButton />
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
                    </div>
                    <RelatedTools />
                </div>
            </div>
        </div>
    );
}
