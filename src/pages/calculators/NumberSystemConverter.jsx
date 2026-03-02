import { useState } from "react";
import BackButton from "../../components/BackButton";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";

export default function NumberSystemConverter() {
    const [input, setInput] = useState("");
    const [base, setBase] = useState("decimal");
    const [result, setResult] = useState(null);

    const handleConvert = () => {
        if (!input.trim()) return;
        try {
            let dec;
            switch (base) {
                case "binary": dec = parseInt(input, 2); break;
                case "octal": dec = parseInt(input, 8); break;
                case "decimal": dec = parseInt(input, 10); break;
                case "hexadecimal": dec = parseInt(input, 16); break;
                default: return;
            }
            if (isNaN(dec)) return;
            setResult({
                binary: dec.toString(2),
                octal: dec.toString(8),
                decimal: dec.toString(10),
                hexadecimal: dec.toString(16).toUpperCase(),
            });
        } catch {
            setResult(null);
        }
    };

    return (
        <div className="main-content">
            <div className="container">
                <BackButton />
                <div className="page-with-sidebar">
                    <MoreTools />
                    <div className="page-main">
                        <div className="calc-wrapper">
                            <h2 className="calc-title">Number System Converter</h2>
                            <div className="calc-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Input Base</label>
                                        <select value={base} onChange={(e) => { setBase(e.target.value); setInput(""); setResult(null); }}>
                                            <option value="binary">Binary (Base 2)</option>
                                            <option value="octal">Octal (Base 8)</option>
                                            <option value="decimal">Decimal (Base 10)</option>
                                            <option value="hexadecimal">Hexadecimal (Base 16)</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Value</label>
                                        <input type="text" value={input} onChange={(e) => { setInput(e.target.value); setResult(null); }} placeholder={base === "binary" ? "e.g. 1010" : base === "hexadecimal" ? "e.g. FF" : "Enter value"} />
                                    </div>
                                </div>
                                <button className="convert-btn" onClick={handleConvert}>Convert</button>
                            </div>
                            {result && (
                                <div className="result-card">
                                    <div className="result-row"><span className="label">Binary</span><span className="value">{result.binary}</span></div>
                                    <div className="result-row"><span className="label">Octal</span><span className="value">{result.octal}</span></div>
                                    <div className="result-row"><span className="label">Decimal</span><span className="value">{result.decimal}</span></div>
                                    <div className="result-row"><span className="label">Hexadecimal</span><span className="value">{result.hexadecimal}</span></div>
                                </div>
                            )}
                        </div>
                    </div>
                    <RelatedTools />
                </div>
            </div>
        </div>
    );
}
