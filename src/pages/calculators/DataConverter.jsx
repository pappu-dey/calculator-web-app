import { useState, useCallback, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
import { useSearchParams } from "react-router-dom";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";
import CommonConversions from "../../components/CommonConversions";

const units = { Byte: 1, Kilobyte: 1024, Megabyte: 1048576, Gigabyte: 1073741824, Terabyte: 1099511627776, Bit: 0.125, Kilobit: 128, Megabit: 131072 };

export default function DataConverter() {
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState("");
    const [from, setFrom] = useState(searchParams.get("from") || "Megabyte");
    const [to, setTo] = useState(searchParams.get("to") || "Gigabyte");
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
                    <h2 className="calc-title">Data Converter</h2>
                    <div className="calc-form">
                        <div className="form-group"><label>Value</label><input type="number" value={value} onChange={(e) => { setValue(e.target.value); setResult(null); }} placeholder="Enter data size" /></div>
                        <div className="form-row">
                            <div className="form-group"><label>From</label><select value={from} onChange={(e) => { setFrom(e.target.value); setResult(null); }}>{Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}</select></div>
                            <div className="form-group"><label>To</label><select value={to} onChange={(e) => { setTo(e.target.value); setResult(null); }}>{Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}</select></div>
                        </div>
                        <button className="convert-btn" onClick={handleConvert}>Convert</button>
                    </div>
                    {result !== null && (<div className="result-card"><div className="result-highlight"><div className="big-value">{result}</div><div className="big-label">{to}</div></div></div>)}
                    <CommonConversions type="data" onSelect={handleChipSelect} />
                    {/* SEO Content */}
                    <div className="seo-content mt-8">
                        <h1>Data Storage Converter</h1>
                        <p>
                            The Data Storage Converter is a crucial tool for IT professionals, software developers, and everyday computer users trying to manage hard drive space or understand internet plans.
                            It easily translates digital storage units between Bytes, Kilobytes, Megabytes, Gigabytes, Terabytes, and Petabytes.
                            If you are downloading a large game or deciding which USB drive to purchase, this tool helps you visualize exact file sizes across different metrics.
                        </p>
                        <h2>How it Works</h2>
                        <p>Simply choose your starting data unit and the unit you want to convert to. Enter your file size, and the calculator instantly applies the base-1024 or base-1000 multiplier to give you the exact converted value.</p>

                        <h2>Benefits of the Data Converter</h2>
                        <p>Data conversion involves massive numbers and confusing prefixes. This tool prevents you from making expensive mistakes when purchasing cloud storage or external hard drives by giving you the precise size translation instantly.</p>

                        <h2>When to Use</h2>
                        <p>Use it when you are trying to calculate how many 5 Megabyte photos can fit onto a 64 Gigabyte flash drive, or when estimating how long a Terabyte download will take on your internet connection.</p>

                        <h2>Frequently Asked Questions</h2>
                        <h3>Is a Gigabyte 1,000 or 1,024 Megabytes?</h3>
                        <p>Technically, in binary computing, 1 GB is 1,024 MB (Gibibyte/Mebibyte). However, most hard drive manufacturers use 1 GB = 1,000 MB. Our tool helps you navigate these differences depending on the standard used.</p>

                        <h3>How many Bytes are in a Terabyte?</h3>
                        <p>There are one trillion bytes in a Terabyte (using the decimal system). That's a 1 followed by 12 zeros!</p>

                        <h3>Can I use this to calculate internet speed?</h3>
                        <p>This calculator measures data <i>storage</i> (Bytes). Internet speed is typically measured in bits per second (bps). Note the difference between Megabytes (MB) and Megabits (Mb).</p>
                    </div>
                <FAQSchema faqs={[
    {
        question: "Is a Gigabyte 1,000 or 1,024 Megabytes?", answer: "Technically, in binary computing, 1 GB is 1,024 MB (Gibibyte/Mebibyte). However, most hard drive manufacturers use 1 GB = 1,000 MB. Our tool helps you navigate these differences depending on the standard used."
    },
    {
        question: "How many Bytes are in a Terabyte?", answer: "There are one trillion bytes in a Terabyte (using the decimal system). That's a 1 followed by 12 zeros!"
    },
    {
        question: "Can I use this to calculate internet speed?", answer: "This calculator measures data storage (Bytes). Internet speed is typically measured in bits per second (bps). Note the difference between Megabytes (MB) and Megabits (Mb)."
    }
]} />
                        </div></div><RelatedTools />
            </div>
        </div></div>
    );
}
