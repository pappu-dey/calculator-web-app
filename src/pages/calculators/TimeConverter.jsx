import { useState, useCallback, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
import { useSearchParams } from "react-router-dom";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";
import CommonConversions from "../../components/CommonConversions";

const units = { Second: 1, Millisecond: 0.001, Microsecond: 1e-6, Minute: 60, Hour: 3600, Day: 86400, Week: 604800, Month: 2629746, Year: 31556952 };

export default function TimeConverter() {
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState("");
    const [from, setFrom] = useState(searchParams.get("from") || "Hour");
    const [to, setTo] = useState(searchParams.get("to") || "Minute");
    const [result, setResult] = useState(null);

    const convert = useCallback((v, f, t) => {
        const num = parseFloat(v);
        if (isNaN(num)) return;
        setResult(parseFloat((num * units[f] / units[t]).toFixed(8)));
    }, []);

    useEffect(() => {
        const v = searchParams.get("value"); const f = searchParams.get("from"); const t = searchParams.get("to");
        if (v && f && t && units[f] && units[t]) { setValue(v); setFrom(f); setTo(t); convert(v, f, t); }
    }, [searchParams, convert]);

    const handleConvert = () => convert(value, from, to);
    const handleChipSelect = (f, t) => { setFrom(f); setTo(t); convert(value, f, t); };

    return (
        <div className="main-content"><div className="container">
            <Breadcrumbs />
            <div className="page-with-sidebar"><MoreTools />
                <div className="page-main"><div className="calc-wrapper">
                    <h2 className="calc-title">Time Converter</h2>
                    <div className="calc-form">
                        <div className="form-group"><label>Value</label><input type="number" value={value} onChange={(e) => { setValue(e.target.value); setResult(null); }} placeholder="Enter time" /></div>
                        <div className="form-row">
                            <div className="form-group"><label>From</label><select value={from} onChange={(e) => { setFrom(e.target.value); setResult(null); }}>{Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}</select></div>
                            <div className="form-group"><label>To</label><select value={to} onChange={(e) => { setTo(e.target.value); setResult(null); }}>{Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}</select></div>
                        </div>
                        <button className="convert-btn" onClick={handleConvert}>Convert</button>
                    </div>
                    {result !== null && (<div className="result-card"><div className="result-highlight"><div className="big-value">{result}</div><div className="big-label">{to}</div></div></div>)}
                    <CommonConversions type="time" onSelect={handleChipSelect} />
                    {/* SEO Content */}
                    <div className="seo-content mt-8">
                        <h1>Time Converter</h1>
                        <p>
                            The Time Converter is an essential utility for calculating durations across different units of time.
                            It accurately translates between Seconds, Minutes, Hours, Days, Weeks, Months, and Years.
                            Whether you are billing a client for freelance work, calculating exactly how many days are in a specific number of weeks, or just curious about how many seconds you have been alive, this tool gives you instant answers.
                        </p>
                        <h2>How it Works</h2>
                        <p>Select the unit of time you have and the unit you need. Enter your number, and our tool processes the math instantly without you having to repeatedly divide or multiply by 60 or 24.</p>

                        <h2>Benefits of the Time Converter</h2>
                        <p>Time mathematics can be tricky because it doesn't follow a pure base-10 system (60 seconds, 24 hours, 7 days). This converter removes the mental friction and provides error-free calculations in a fraction of a second.</p>

                        <h2>When to Use</h2>
                        <p>Use it when logging hours for payroll, planning long-term project schedules across weeks and months, or calculating flight durations in minutes instead of hours.</p>

                        <h2>Frequently Asked Questions</h2>
                        <h3>How does it calculate months and years?</h3>
                        <p>For standard conversions, it uses average values (e.g., a month is roughly 30.44 days and a year is 365.25 days to account for leap years) to provide the most accurate general conversion.</p>

                        <h3>How many seconds are in a day?</h3>
                        <p>There are exactly 86,400 seconds in a standard 24-hour day (60 seconds × 60 minutes × 24 hours).</p>

                        <h3>Is this calculator free?</h3>
                        <p>Yes! Every tool on Calculator Hub is completely free to use directly in your web browser.</p>
                    </div>
                <FAQSchema faqs={[
    {
        question: "How does it calculate months and years?", answer: "For standard conversions, it uses average values (e.g., a month is roughly 30.44 days and a year is 365.25 days to account for leap years) to provide the most accurate general conversion."
    },
    {
        question: "How many seconds are in a day?", answer: "There are exactly 86,400 seconds in a standard 24-hour day (60 seconds × 60 minutes × 24 hours)."
    },
    {
        question: "Is this calculator free?", answer: "Yes! Every tool on Calculator Hub is completely free to use directly in your web browser."
    }
]} />
                        </div></div><RelatedTools />
            </div>
        </div></div>
    );
}
