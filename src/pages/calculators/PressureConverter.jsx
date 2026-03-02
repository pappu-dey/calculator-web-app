import { useState, useCallback, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
import { useSearchParams } from "react-router-dom";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";
import CommonConversions from "../../components/CommonConversions";

const units = { Pascal: 1, Kilopascal: 1000, Bar: 100000, PSI: 6894.76, Atmosphere: 101325, Torr: 133.322, mmHg: 133.322 };

export default function PressureConverter() {
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState("");
    const [from, setFrom] = useState(searchParams.get("from") || "Bar");
    const [to, setTo] = useState(searchParams.get("to") || "PSI");
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
                    <h2 className="calc-title">Pressure Converter</h2>
                    <div className="calc-form">
                        <div className="form-group"><label>Value</label><input type="number" value={value} onChange={(e) => { setValue(e.target.value); setResult(null); }} placeholder="Enter pressure" /></div>
                        <div className="form-row">
                            <div className="form-group"><label>From</label><select value={from} onChange={(e) => { setFrom(e.target.value); setResult(null); }}>{Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}</select></div>
                            <div className="form-group"><label>To</label><select value={to} onChange={(e) => { setTo(e.target.value); setResult(null); }}>{Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}</select></div>
                        </div>
                        <button className="convert-btn" onClick={handleConvert}>Convert</button>
                    </div>
                    {result !== null && (<div className="result-card"><div className="result-highlight"><div className="big-value">{result}</div><div className="big-label">{to}</div></div></div>)}
                    <CommonConversions type="pressure" onSelect={handleChipSelect} />
                    {/* SEO Content */}
                    <div className="seo-content mt-8">
                        <h1>Pressure Converter</h1>
                        <p>
                            The Pressure Converter is a precise tool designed for engineers, mechanics, meteorologists, and scuba divers who regularly work with different units of pressure.
                            It effortlessly translates measurements between Pascal, Bar, PSI (Pounds per Square Inch), Atmospheres, Torr, and more.
                            Whether you are checking car tire pressure, calculating water depth pressure, or monitoring weather systems, this tool ensures accurate translations across global standards.
                        </p>
                        <h2>How it Works</h2>
                        <p>Choose your current pressure unit from the first list and select the unit you want to convert into. Enter your number, and the exact conversion will calculate instantly in your browser.</p>

                        <h2>Benefits of the Pressure Converter</h2>
                        <p>It allows for seamless communication between American systems (which often use PSI) and the Metric system (which relies on Pascal and Bar), eliminating translation errors.</p>

                        <h2>When to Use</h2>
                        <p>Use it when inflating vehicle tires that list pressure ratings in Bar but your pump uses PSI, or when reading European engineering schematics in the United States.</p>

                        <h2>Frequently Asked Questions</h2>
                        <h3>How many PSI are in 1 Bar?</h3>
                        <p>One Bar of pressure is approximately equal to 14.5038 PSI. You can test this exact conversion in the calculator.</p>

                        <h3>What is an Atmosphere (atm)?</h3>
                        <p>One atmosphere is the standard pressure of the Earth's atmosphere at sea level. It is equal to exactly 1.01325 Bar or approximately 14.7 PSI.</p>

                        <h3>Does this calculator work on smartphones?</h3>
                        <p>Yes, it is fully responsive and loads instantly on mobile devices, making it perfect for use in the garage or field.</p>
                    </div>
                <FAQSchema faqs={[
    {
        question: "How many PSI are in 1 Bar?", answer: "One Bar of pressure is approximately equal to 14.5038 PSI. You can test this exact conversion in the calculator."
    },
    {
        question: "What is an Atmosphere (atm)?", answer: "One atmosphere is the standard pressure of the Earth's atmosphere at sea level. It is equal to exactly 1.01325 Bar or approximately 14.7 PSI."
    },
    {
        question: "Does this calculator work on smartphones?", answer: "Yes, it is fully responsive and loads instantly on mobile devices, making it perfect for use in the garage or field."
    }
]} />
                        </div></div><RelatedTools />
            </div>
        </div></div>
    );
}
