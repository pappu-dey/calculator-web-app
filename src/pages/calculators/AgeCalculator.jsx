import { useState } from "react";
import BackButton from "../../components/BackButton";
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
        <div className="main-content">
            <div className="container">
                <BackButton />
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
                    </div>
                    <RelatedTools />
                </div>
            </div>
        </div>
    );
}
