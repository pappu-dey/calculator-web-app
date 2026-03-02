import { useState, useCallback, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
import { useSearchParams } from "react-router-dom";
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
        <div className="main-content"><div className="container">
            <Breadcrumbs />
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
                    {/* SEO Content */}
                    <div className="seo-content mt-8">
                        <h1>Volume Converter</h1>
                        <p>
                            The Volume Converter is an invaluable tool for cooking, baking, engineering, and fluid dynamics.
                            It easily translates liquid and solid volume capacities between liters, milliliters, gallons, quarts, pints, cups, fluid ounces, and cubic meters.
                            If you are struggling to follow a recipe from another country or trying to calculate the water capacity of a swimming pool, this calculator has you covered.
                        </p>
                        <h2>How it Works</h2>
                        <p>Select your starting volume unit and the desired output unit from the dropdown lists. Type in the volume, and watch the exact conversion appear on the screen in real-time.</p>

                        <h2>Benefits of the Volume Converter</h2>
                        <p>It solves the frustration of translating between US Customary fluid measurements and the logical Metric system. It's completely free and available 24/7 without downloading an app.</p>

                        <h2>When to Use</h2>
                        <p>Use it in the kitchen for international recipes, in the garage when mixing engine fluids, or in science classes for chemistry experiments.</p>

                        <h2>Frequently Asked Questions</h2>
                        <h3>What is the difference between US fluid ounces and UK fluid ounces?</h3>
                        <p>Our tool focuses on the standard US Customary fluid conversions to metric, which is the most commonly required translation online.</p>

                        <h3>How many cups are in a liter?</h3>
                        <p>There are roughly 4.22 US cups in a single liter. Our calculator can show you the exact decimal breakdown.</p>

                        <h3>Is a liquid ounce the same as a weight ounce?</h3>
                        <p>No, a fluid ounce is a measure of volume (space), while a weight ounce is a measure of mass. They are not interchangeable unless specifically measuring water.</p>
                    </div>
                <FAQSchema faqs={[
    {
        question: "What is the difference between US fluid ounces and UK fluid ounces?", answer: "Our tool focuses on the standard US Customary fluid conversions to metric, which is the most commonly required translation online."
    },
    {
        question: "How many cups are in a liter?", answer: "There are roughly 4.22 US cups in a single liter. Our calculator can show you the exact decimal breakdown."
    },
    {
        question: "Is a liquid ounce the same as a weight ounce?", answer: "No, a fluid ounce is a measure of volume (space), while a weight ounce is a measure of mass. They are not interchangeable unless specifically measuring water."
    }
]} />
                        </div></div><RelatedTools />
            </div>
        </div></div>
    );
}
