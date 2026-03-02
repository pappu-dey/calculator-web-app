import { useState, useCallback, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
import { useSearchParams } from "react-router-dom";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";
import CommonConversions from "../../components/CommonConversions";

const units = { "sq m": 1, "sq km": 1e6, "sq cm": 1e-4, "sq mm": 1e-6, Hectare: 1e4, Acre: 4046.8564, "sq ft": 0.092903, "sq in": 6.4516e-4, "sq yd": 0.836127, "sq mile": 2.59e6 };

export default function AreaConverter() {
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState("");
    const [from, setFrom] = useState(searchParams.get("from") || "sq m");
    const [to, setTo] = useState(searchParams.get("to") || "sq ft");
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
                    <h2 className="calc-title">Area Converter</h2>
                    <div className="calc-form">
                        <div className="form-group"><label>Value</label><input type="number" value={value} onChange={(e) => { setValue(e.target.value); setResult(null); }} placeholder="Enter area" /></div>
                        <div className="form-row">
                            <div className="form-group"><label>From</label><select value={from} onChange={(e) => { setFrom(e.target.value); setResult(null); }}>{Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}</select></div>
                            <div className="form-group"><label>To</label><select value={to} onChange={(e) => { setTo(e.target.value); setResult(null); }}>{Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}</select></div>
                        </div>
                        <button className="convert-btn" onClick={handleConvert}>Convert</button>
                    </div>
                    {result !== null && (<div className="result-card"><div className="result-highlight"><div className="big-value">{result}</div><div className="big-label">{to}</div></div></div>)}
                    <CommonConversions type="area" onSelect={handleChipSelect} />
                </div>
                    {/* SEO Content */}
                    <div className="seo-content mt-8">
                        <h1>Area Converter</h1>
                        <p>
                            The Area Converter is an essential tool for real estate professionals, farmers, construction workers, and home DIYers.
                            It allows you to instantly convert between square meters, square feet, acres, hectares, square kilometers, and square miles.
                            Whether you are measuring a small room for new carpet or calculating the size of a large agricultural plot, this tool gives you accurate measurements instantly.
                        </p>
                        <h2>How it Works</h2>
                        <p>Just select your current unit of area, pick the new unit you want, and enter your number. The tool automatically references the correct conversion ratio and outputs the result.</p>

                        <h2>Benefits of the Area Converter</h2>
                        <p>Area conversions are notoriously difficult to calculate in your head because they involve squared distances. This tool removes all that friction, providing error-free results in less than a second.</p>

                        <h2>When to Use</h2>
                        <p>Use it when buying property, purchasing flooring, painting a house, or converting land sizes from metric to imperial measurements.</p>

                        <h2>Frequently Asked Questions</h2>
                        <h3>How many square feet are in an acre?</h3>
                        <p>One acre is exactly equal to 43,560 square feet. You can easily test this in our calculator.</p>

                        <h3>Can I use this on my phone while at a hardware store?</h3>
                        <p>Yes, our website is fully responsive, meaning the calculator will load perfectly on your smartphone screen while you shop.</p>

                        <h3>Are hectares and acres the same?</h3>
                        <p>No, they are different scales. One hectare is roughly equal to 2.47 acres.</p>
                    <FAQSchema faqs={[
    {
        question: "How many square feet are in an acre?", answer: "One acre is exactly equal to 43,560 square feet. You can easily test this in our calculator."
    },
    {
        question: "Can I use this on my phone while at a hardware store?", answer: "Yes, our website is fully responsive, meaning the calculator will load perfectly on your smartphone screen while you shop."
    },
    {
        question: "Are hectares and acres the same?", answer: "No, they are different scales. One hectare is roughly equal to 2.47 acres."
    }
]} />
                        </div>
                </div><RelatedTools />
            </div>
        </div></div>
    );
}
