import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";
import CommonConversions from "../../components/CommonConversions";

const units = { Liter: 1, Milliliter: 0.001, "Cubic Meter": 1000, "Cubic cm": 0.001, Gallon: 3.78541, Quart: 0.946353, Pint: 0.473176, Cup: 0.24, "Fluid Oz": 0.0295735, Tablespoon: 0.0147868, Teaspoon: 0.00492892 };

export default function VolumeConverter() {
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState("");
    const [from, setFrom] = useState(searchParams.get("from") || "Liter");
    const [to, setTo] = useState(searchParams.get("to") || "Gallon");
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
        <div className="main-content"><div className="container"><BackButton />
            <div className="page-with-sidebar"><MoreTools />
                <div className="page-main"><div className="calc-wrapper">
                    <h2 className="calc-title">Volume Converter</h2>
                    <div className="calc-form">
                        <div className="form-group"><label>Value</label><input type="number" value={value} onChange={(e) => { setValue(e.target.value); setResult(null); }} placeholder="Enter volume" /></div>
                        <div className="form-row">
                            <div className="form-group"><label>From</label><select value={from} onChange={(e) => { setFrom(e.target.value); setResult(null); }}>{Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}</select></div>
                            <div className="form-group"><label>To</label><select value={to} onChange={(e) => { setTo(e.target.value); setResult(null); }}>{Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}</select></div>
                        </div>
                        <button className="convert-btn" onClick={handleConvert}>Convert</button>
                    </div>
                    {result !== null && (<div className="result-card"><div className="result-highlight"><div className="big-value">{result}</div><div className="big-label">{to}</div></div></div>)}
                    <CommonConversions type="volume" onSelect={handleChipSelect} />
                </div></div><RelatedTools />
            </div>
        </div></div>
    );
}
