import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
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
        <div className="main-content"><div className="container">
            <Breadcrumbs />
                
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
                        {/* SEO Content */}
                        <div className="seo-content mt-8">
                            <h1>Number System Converter</h1>
                            <p>
                                The Number System Converter is a vital tool for software developers, computer science students, and IT professionals.
                                It allows you to seamlessly translate numerical data between Binary (base-2), Octal (base-8), Decimal (base-10), and Hexadecimal (base-16) systems.
                                Whether you are writing low-level machine code, analyzing memory addresses, or completing a math exam, this calculator provides instant and accurate translation between numerical bases.
                            </p>
                            <h2>How it Works</h2>
                            <p>Select your starting number system and the system you wish to convert it into. Enter your numerical sequence (e.g., 10110 in Binary or F3A in Hex), and the tool instantly processes the base-conversion math.</p>

                            <h2>Benefits of the Number System Converter</h2>
                            <p>Manual base conversions are tedious and highly prone to calculation errors. This tool completely eliminates the friction, allowing you to focus on your code rather than doing manual long-division.</p>

                            <h2>When to Use</h2>
                            <p>Use it when debugging software memory dumps, creating subnet masks for networking, assigning RGB values for web design, or learning digital logic in computer science courses.</p>

                            <h2>Frequently Asked Questions</h2>
                            <h3>What is Hexadecimal used for?</h3>
                            <p>Hexadecimal (base-16) is extensively used by programmers because it is a highly compact way to represent large binary numbers. It's commonly seen in color codes (like #FFFFFF) and memory addresses.</p>

                            <h3>Can I convert from Decimal to Binary?</h3>
                            <p>Yes, absolutely. Our tool supports conversions in any direction between all four of the major computer science numerical systems.</p>

                            <h3>Is there a limit to how large the number can be?</h3>
                            <p>Our calculator can handle extremely large sequences, making it perfect for translating complex IP addresses and long registers of binary data instantly.</p>
                        <FAQSchema faqs={[
    {
        question: "What is Hexadecimal used for?", answer: "Hexadecimal (base-16) is extensively used by programmers because it is a highly compact way to represent large binary numbers. It's commonly seen in color codes (like #FFFFFF) and memory addresses."
    },
    {
        question: "Can I convert from Decimal to Binary?", answer: "Yes, absolutely. Our tool supports conversions in any direction between all four of the major computer science numerical systems."
    },
    {
        question: "Is there a limit to how large the number can be?", answer: "Our calculator can handle extremely large sequences, making it perfect for translating complex IP addresses and long registers of binary data instantly."
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
