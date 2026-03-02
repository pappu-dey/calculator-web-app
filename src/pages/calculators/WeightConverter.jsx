import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";
import CommonConversions from "../../components/CommonConversions";

const units = {
    Kilogram: 1, Gram: 0.001, Milligram: 1e-6, "Metric Ton": 1000,
    Pound: 0.453592, Ounce: 0.0283495, "US Ton": 907.185, "UK Ton": 1016.05,
};

export default function WeightConverter() {
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState("");
    const [from, setFrom] = useState(searchParams.get("from") || "Kilogram");
    const [to, setTo] = useState(searchParams.get("to") || "Pound");
    const [result, setResult] = useState(null);

    const convert = useCallback((v, f, t) => {
        const num = parseFloat(v);
        if (isNaN(num)) return;
        const kg = num * units[f];
        setResult(parseFloat((kg / units[t]).toFixed(8)));
    }, []);

    useEffect(() => {
        const v = searchParams.get("value");
        const f = searchParams.get("from");
        const t = searchParams.get("to");
        if (v && f && t && units[f] && units[t]) {
            setValue(v); setFrom(f); setTo(t); convert(v, f, t);
        }
    }, [searchParams, convert]);

    const handleConvert = () => convert(value, from, to);
    const handleChipSelect = (f, t) => { setFrom(f); setTo(t); convert(value, f, t); };

    return (
        <div className="main-content">
            <div className="container">
                <BackButton />
                <div className="page-with-sidebar">
                    <MoreTools />
                    <div className="page-main">
                        <div className="calc-wrapper">
                            <h2 className="calc-title">Weight Converter</h2>
                            <div className="calc-form">
                                <div className="form-group">
                                    <label>Value</label>
                                    <input type="number" value={value} onChange={(e) => { setValue(e.target.value); setResult(null); }} placeholder="Enter weight" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>From</label>
                                        <select value={from} onChange={(e) => { setFrom(e.target.value); setResult(null); }}>
                                            {Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>To</label>
                                        <select value={to} onChange={(e) => { setTo(e.target.value); setResult(null); }}>
                                            {Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}
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
                            <CommonConversions type="weight" onSelect={handleChipSelect} />
                        </div>
                    </div>
                    <RelatedTools />
                </div>
            </div>
        </div>
    );
}
