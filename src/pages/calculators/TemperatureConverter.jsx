import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";
import CommonConversions from "../../components/CommonConversions";

const opts = ["Celsius", "Fahrenheit", "Kelvin"];

function convertTemp(v, from, to) {
    const num = parseFloat(v);
    if (isNaN(num)) return null;
    let celsius;
    switch (from) {
        case "Celsius": celsius = num; break;
        case "Fahrenheit": celsius = (num - 32) * 5 / 9; break;
        case "Kelvin": celsius = num - 273.15; break;
        default: return null;
    }
    let out;
    switch (to) {
        case "Celsius": out = celsius; break;
        case "Fahrenheit": out = celsius * 9 / 5 + 32; break;
        case "Kelvin": out = celsius + 273.15; break;
        default: return null;
    }
    return parseFloat(out.toFixed(4));
}

export default function TemperatureConverter() {
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState("");
    const [from, setFrom] = useState(searchParams.get("from") || "Celsius");
    const [to, setTo] = useState(searchParams.get("to") || "Fahrenheit");
    const [result, setResult] = useState(null);

    useEffect(() => {
        const v = searchParams.get("value");
        const f = searchParams.get("from");
        const t = searchParams.get("to");
        if (v && f && t && opts.includes(f) && opts.includes(t)) {
            setValue(v); setFrom(f); setTo(t);
            const r = convertTemp(v, f, t);
            if (r !== null) setResult(r);
        }
    }, [searchParams]);

    const handleConvert = () => { const r = convertTemp(value, from, to); if (r !== null) setResult(r); };
    const handleChipSelect = (f, t) => { setFrom(f); setTo(t); const r = convertTemp(value, f, t); if (r !== null) setResult(r); };

    return (
        <div className="main-content">
            <div className="container">
                <BackButton />
                <div className="page-with-sidebar">
                    <MoreTools />
                    <div className="page-main">
                        <div className="calc-wrapper">
                            <h2 className="calc-title">Temperature Converter</h2>
                            <div className="calc-form">
                                <div className="form-group">
                                    <label>Value</label>
                                    <input type="number" value={value} onChange={(e) => { setValue(e.target.value); setResult(null); }} placeholder="Enter temperature" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>From</label>
                                        <select value={from} onChange={(e) => { setFrom(e.target.value); setResult(null); }}>
                                            {opts.map((u) => <option key={u} value={u}>{u}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>To</label>
                                        <select value={to} onChange={(e) => { setTo(e.target.value); setResult(null); }}>
                                            {opts.map((u) => <option key={u} value={u}>{u}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <button className="convert-btn" onClick={handleConvert}>Convert</button>
                            </div>
                            {result !== null && (
                                <div className="result-card">
                                    <div className="result-highlight">
                                        <div className="big-value">{result}</div>
                                        <div className="big-label">{to}</div>
                                    </div>
                                </div>
                            )}
                            <CommonConversions type="temperature" onSelect={handleChipSelect} />
                        </div>
                    </div>
                    <RelatedTools />
                </div>
            </div>
        </div>
    );
}
