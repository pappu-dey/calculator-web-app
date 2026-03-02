import { useState, useCallback, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
import { useSearchParams } from "react-router-dom";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";
import CommonConversions from "../../components/CommonConversions";

const units = {
    Kilogram: 1, Gram: 0.001, Milligram: 1e-6, "Metric Ton": 1000,
    Pound: 0.453592, Ounce: 0.0283495, "US Ton": 907.185, "UK Ton": 1016.05,
};

export default function WeightConverter({ defaultFrom, defaultTo, hideSeo }) {
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState("");
    const [from, setFrom] = useState(defaultFrom || searchParams.get("from") || "Kilogram");
    const [to, setTo] = useState(defaultTo || searchParams.get("to") || "Pound");
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
        <div className={hideSeo ? "" : "main-content"}>
            <div className={hideSeo ? "" : "container"}>
                {!hideSeo && <Breadcrumbs />}

                <div className={hideSeo ? "" : "page-with-sidebar"}>
                    {!hideSeo && <MoreTools />}

                    <div className={hideSeo ? "" : "page-main"}>
                        <div className="calc-wrapper">
                            <h2 className={hideSeo ? "d-none" : "calc-title"}>{hideSeo ? "" : "Weight Converter"}</h2>
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

                        {/* SEO Content */}
                        {!hideSeo && (
                            <div className="seo-content mt-8">
                                <h1>Weight Converter</h1>
                                <p>
                                    The Weight Converter is a free and reliable tool to instantly translate mass and weight measurements between different global standards.
                                    Whether you are tracking fitness progress, calculating shipping costs, baking a recipe from an international cookbook, or managing heavy cargo, this tool makes conversion seamless.
                                    It supports widely used units such as kilograms, grams, milligrams, pounds, ounces, and metric tonnes, ensuring accuracy in all your daily tasks.
                                </p>
                                <h2>How it Works</h2>
                                <p>Choose the unit you are converting from and the unit you want to convert into. Enter the numerical value, and our tool instantly calculates the exact equivalent in real-time.</p>

                                <h2>Benefits of the Weight Converter</h2>
                                <p>It prevents confusing calculation mistakes, which is especially vital in cooking, fitness, and logistics. You don't need to memorize any conversion ratios to get the right answer immediately.</p>

                                <h2>When to Use</h2>
                                <p>Use it when you are reading foreign recipes that use grams instead of ounces, checking luggage weight limits before a flight, or tracking your body weight in both kilograms and pounds.</p>

                                <h2>Frequently Asked Questions</h2>
                                <h3>How many pounds are in a kilogram?</h3>
                                <p>There are approximately 2.20462 pounds in one kilogram. Our calculator handles this exact multiplier for you instantly.</p>

                                <h3>Can I use this for cooking and baking?</h3>
                                <p>Absolutely! Converting between grams, ounces, and pounds is one of the most common and helpful uses for this tool in the kitchen.</p>

                                <h3>Is the calculator available offline?</h3>
                                <p>Currently, the tool requires an internet connection to load in your browser, but it relies on lightweight scripts and works instantly once the page is opened.</p>

                                <FAQSchema faqs={[
                                    {
                                        question: "How many pounds are in a kilogram?", answer: "There are approximately 2.20462 pounds in one kilogram. Our calculator handles this exact multiplier for you instantly."
                                    },
                                    {
                                        question: "Can I use this for cooking and baking?", answer: "Absolutely! Converting between grams, ounces, and pounds is one of the most common and helpful uses for this tool in the kitchen."
                                    },
                                    {
                                        question: "Is the calculator available offline?", answer: "Currently, the tool requires an internet connection to load in your browser, but it relies on lightweight scripts and works instantly once the page is opened."
                                    }
                                ]} />
                            </div>
                        )}
                    </div>

                    {!hideSeo && <RelatedTools />}
                </div>
            </div>
        </div>
    );
}
