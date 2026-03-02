import { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
import { useSearchParams } from "react-router-dom";
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
        <div className="main-content"><div className="container">
            <Breadcrumbs />
                
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

                        {/* SEO Content */}
                        <div className="seo-content mt-8">
                            <h1>Temperature Converter</h1>
                            <p>
                                The Temperature Converter is a simple and fast tool to translate temperature degrees between Celsius, Fahrenheit, and Kelvin.
                                Whether you are checking the weather for an upcoming international trip, cooking a foreign recipe, or conducting scientific research, this tool ensures you always have the correct temperature scale.
                            </p>
                            <h2>How it Works</h2>
                            <p>Select your starting temperature scale and the scale you wish to convert to. Enter your value, and the calculator applies the precise mathematical formula to provide the converted temperature instantly.</p>

                            <h2>Benefits of the Temperature Converter</h2>
                            <p>It eliminates the need to remember complex conversion formulas like multiplying by 9/5 and adding 32. It works flawlessly on both mobile and desktop browsers.</p>

                            <h2>When to Use</h2>
                            <p>Use it when traveling between the US (which uses Fahrenheit) and the rest of the world (which uses Celsius), or when baking recipes from international chefs.</p>

                            <h2>Frequently Asked Questions</h2>
                            <h3>How do I convert Celsius to Fahrenheit?</h3>
                            <p>Our tool does this automatically! The manual formula is: (°C × 9/5) + 32 = °F.</p>

                            <h3>What is the Kelvin scale?</h3>
                            <p>Kelvin is the base unit of temperature in the International System of Units (SI), primarily used in scientific equations and astronomy.</p>

                            <h3>Is this tool free?</h3>
                            <p>Yes, our temperature conversion tool is 100% free with no registration required.</p>
                        <FAQSchema faqs={[
    {
        question: "How do I convert Celsius to Fahrenheit?", answer: "Our tool does this automatically! The manual formula is: (°C × 9/5) + 32 = °F."
    },
    {
        question: "What is the Kelvin scale?", answer: "Kelvin is the base unit of temperature in the International System of Units (SI), primarily used in scientific equations and astronomy."
    },
    {
        question: "Is this tool free?", answer: "Yes, our temperature conversion tool is 100% free with no registration required."
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
