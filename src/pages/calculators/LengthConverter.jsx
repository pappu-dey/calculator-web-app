import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";
import CommonConversions from "../../components/CommonConversions";

const units = {
    Meter: 1, Kilometer: 1000, Centimeter: 0.01, Millimeter: 0.001,
    Mile: 1609.344, Yard: 0.9144, Foot: 0.3048, Inch: 0.0254,
};

export default function LengthConverter() {
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState("");
    const [from, setFrom] = useState(searchParams.get("from") || "Meter");
    const [to, setTo] = useState(searchParams.get("to") || "Kilometer");
    const [result, setResult] = useState(null);

    const convert = useCallback((v, f, t) => {
        const num = parseFloat(v);
        if (isNaN(num)) return;
        setResult(parseFloat((num * units[f] / units[t]).toFixed(8)));
    }, []);

    // Auto-convert if value+params present on load
    useEffect(() => {
        const v = searchParams.get("value");
        const f = searchParams.get("from");
        const t = searchParams.get("to");
        if (v && f && t && units[f] && units[t]) {
            setValue(v);
            setFrom(f);
            setTo(t);
            convert(v, f, t);
        }
    }, [searchParams, convert]);

    const handleConvert = () => convert(value, from, to);

    const handleChipSelect = (f, t) => {
        setFrom(f); setTo(t); convert(value, f, t);
    };

    return (
        <div className="main-content">
            <div className="container">
                <BackButton />
                <div className="page-with-sidebar">
                    <MoreTools />
                    <div className="page-main">
                        <div className="calc-wrapper">
                            <h2 className="calc-title">Length Converter</h2>
                            <div className="calc-form">
                                <div className="form-group">
                                    <label>Value</label>
                                    <input type="number" value={value} onChange={(e) => { setValue(e.target.value); setResult(null); }} placeholder="Enter value" />
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
                            <CommonConversions type="length" onSelect={handleChipSelect} />
                        </div>
                    </div>
                    <RelatedTools />
                </div>
            </div>
        </div>
    );
}
