import { useState, useCallback, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
import { useSearchParams } from "react-router-dom";
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
        <div className="main-content"><div className="container">
            <Breadcrumbs />
                
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

                        {/* SEO Content */}
                        <div className="seo-content mt-8">
                            <h1>Length Converter</h1>
                            <p>
                                The Length Converter is a fast, free, and accurate online tool for translating measurements between various units of distance.
                                Whether you are working on a construction project, measuring fabric, planning a road trip, or completing a math assignment, this tool makes unit conversion effortless.
                                It supports all standard imperial and metric units including meters, kilometers, centimeters, millimeters, miles, yards, feet, and inches, ensuring you always have the right measurement ready.
                            </p>
                            <h2>How it Works</h2>
                            <p>Select your starting unit from the first dropdown, choose the unit you want to convert to in the second dropdown, and type in your value. The converted result will appear instantly as you type.</p>

                            <h2>Benefits of the Length Converter</h2>
                            <p>It eliminates the need to look up confusing conversion formulas or do manual math that could lead to costly errors. It is incredibly fast, mobile-friendly, and perfect for quick checks on the go.</p>

                            <h2>When to Use</h2>
                            <p>Use it when buying furniture online, converting miles to kilometers during international travel, or handling DIY projects around your home.</p>

                            <h2>Frequently Asked Questions</h2>
                            <h3>What is the difference between metric and imperial units?</h3>
                            <p>Metric units (meters, kilometers) use a base-10 system standard in most countries. Imperial units (miles, feet, inches) are primarily used in the United States and the UK.</p>

                            <h3>How accurate are the conversions?</h3>
                            <p>Our tool uses standard precision math to provide highly accurate conversion results up to several decimal places.</p>

                            <h3>Can I reverse the conversion automatically?</h3>
                            <p>Yes, simply click the swap icon button between the two dropdowns to instantly invert your conversion (e.g., from Meters to Feet, into Feet to Meters).</p>
                        <FAQSchema faqs={[
    {
        question: "What is the difference between metric and imperial units?", answer: "Metric units (meters, kilometers) use a base-10 system standard in most countries. Imperial units (miles, feet, inches) are primarily used in the United States and the UK."
    },
    {
        question: "How accurate are the conversions?", answer: "Our tool uses standard precision math to provide highly accurate conversion results up to several decimal places."
    },
    {
        question: "Can I reverse the conversion automatically?", answer: "Yes, simply click the swap icon button between the two dropdowns to instantly invert your conversion (e.g., from Meters to Feet, into Feet to Meters)."
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
