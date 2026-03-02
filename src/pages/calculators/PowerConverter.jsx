import { useState, useCallback, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
import { useSearchParams } from "react-router-dom";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";
import CommonConversions from "../../components/CommonConversions";

const units = { Watt: 1, Kilowatt: 1000, Megawatt: 1e6, Horsepower: 745.7, "BTU/h": 0.29307, "ft-lb/s": 1.35582, Calorie_s: 4.1868 };

export default function PowerConverter() {
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState("");
    const [from, setFrom] = useState(searchParams.get("from") || "Kilowatt");
    const [to, setTo] = useState(searchParams.get("to") || "Horsepower");
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
                    <h2 className="calc-title">Power Converter</h2>
                    <div className="calc-form">
                        <div className="form-group"><label>Value</label><input type="number" value={value} onChange={(e) => { setValue(e.target.value); setResult(null); }} placeholder="Enter power" /></div>
                        <div className="form-row">
                            <div className="form-group"><label>From</label><select value={from} onChange={(e) => { setFrom(e.target.value); setResult(null); }}>{Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}</select></div>
                            <div className="form-group"><label>To</label><select value={to} onChange={(e) => { setTo(e.target.value); setResult(null); }}>{Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}</select></div>
                        </div>
                        <button className="convert-btn" onClick={handleConvert}>Convert</button>
                    </div>
                    {result !== null && (<div className="result-card"><div className="result-highlight"><div className="big-value">{result}</div><div className="big-label">{to}</div></div></div>)}
                    <CommonConversions type="power" onSelect={handleChipSelect} />
                    {/* SEO Content */}
                    <div className="seo-content mt-8">
                        <h1>Power Converter</h1>
                        <p>
                            The Power Converter is an essential tool for engineers, electricians, and physics students who need to measure and translate power output between different units.
                            It allows you to instantly convert between watts, kilowatts, megawatts, horsepower, and other standard power measurements accurately and reliably.
                            Whether you are sizing an electrical motor, calculating energy consumption for a new appliance, or completing a physics assignment, this tool provides instant answers.
                        </p>
                        <h2>How it Works</h2>
                        <p>Select your starting unit of power and the unit you want to convert to from the dropdown menus. Enter your numerical value, and the calculator instantly outputs the converted equivalent.</p>

                        <h2>Benefits of the Power Converter</h2>
                        <p>It eliminates the need to remember complex conversion factors (like 1 Horsepower = 745.7 Watts). You get immediate, error-free results that save time in critical calculations.</p>

                        <h2>When to Use</h2>
                        <p>Use it when comparing the power rating of car engines (horsepower) to electric vehicle motors (kilowatts), or when determining the kilowatt-hour usage of standard household appliances.</p>

                        <h2>Frequently Asked Questions</h2>
                        <h3>How many watts are in a horsepower?</h3>
                        <p>One mechanical horsepower (Imperial) is equal to approximately 745.7 watts. Our calculator uses this exact precise measurement.</p>

                        <h3>What is the difference between a kilowatt and a megawatt?</h3>
                        <p>A kilowatt is 1,000 watts, while a megawatt is 1,000,000 watts. Megawatts are typically used to measure the output of power plants.</p>

                        <h3>Is this tool free for commercial use?</h3>
                        <p>Yes, all of our calculators and converters are completely free to use for both personal and professional applications.</p>
                    </div>
                <FAQSchema faqs={[
    {
        question: "How many watts are in a horsepower?", answer: "One mechanical horsepower (Imperial) is equal to approximately 745.7 watts. Our calculator uses this exact precise measurement."
    },
    {
        question: "What is the difference between a kilowatt and a megawatt?", answer: "A kilowatt is 1,000 watts, while a megawatt is 1,000,000 watts. Megawatts are typically used to measure the output of power plants."
    },
    {
        question: "Is this tool free for commercial use?", answer: "Yes, all of our calculators and converters are completely free to use for both personal and professional applications."
    }
]} />
                        </div></div><RelatedTools />
            </div>
        </div></div>
    );
}
