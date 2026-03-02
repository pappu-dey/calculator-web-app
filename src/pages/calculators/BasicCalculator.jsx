import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";

export default function BasicCalculator() {
    const [display, setDisplay] = useState("0");
    const [expression, setExpression] = useState("");
    const [reset, setReset] = useState(false);

    const handleNumber = (num) => {
        if (reset) {
            setDisplay(num);
            setReset(false);
            return;
        }
        setDisplay(display === "0" ? num : display + num);
    };

    const handleOperator = (op) => {
        setExpression(display + " " + op + " ");
        setReset(true);
    };

    const handleEquals = () => {
        try {
            const fullExpr = expression + display;
            const sanitized = fullExpr.replace(/×/g, "*").replace(/÷/g, "/");
            // eslint-disable-next-line no-eval
            const result = eval(sanitized);
            const formatted = parseFloat(result.toFixed(10)).toString();
            setDisplay(formatted);
            setExpression("");
            setReset(true);
        } catch {
            setDisplay("Error");
            setExpression("");
            setReset(true);
        }
    };

    const handleClear = () => {
        setDisplay("0");
        setExpression("");
        setReset(false);
    };

    const handleSign = () => {
        if (display !== "0") {
            setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
        }
    };

    const handlePercent = () => {
        setDisplay((parseFloat(display) / 100).toString());
    };

    const handleDecimal = () => {
        if (!display.includes(".")) {
            setDisplay(display + ".");
        }
    };

    const handleBackspace = () => {
        if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
            setDisplay("0");
        } else {
            setDisplay(display.slice(0, -1));
        }
    };

    const buttons = [
        { label: "C", action: handleClear, className: "clear" },
        { label: "±", action: handleSign, className: "func" },
        { label: "%", action: handlePercent, className: "func" },
        { label: "÷", action: () => handleOperator("÷"), className: "operator" },
        { label: "7", action: () => handleNumber("7") },
        { label: "8", action: () => handleNumber("8") },
        { label: "9", action: () => handleNumber("9") },
        { label: "×", action: () => handleOperator("×"), className: "operator" },
        { label: "4", action: () => handleNumber("4") },
        { label: "5", action: () => handleNumber("5") },
        { label: "6", action: () => handleNumber("6") },
        { label: "−", action: () => handleOperator("-"), className: "operator" },
        { label: "1", action: () => handleNumber("1") },
        { label: "2", action: () => handleNumber("2") },
        { label: "3", action: () => handleNumber("3") },
        { label: "+", action: () => handleOperator("+"), className: "operator" },
        { label: "⌫", action: handleBackspace, className: "func" },
        { label: "0", action: () => handleNumber("0") },
        { label: ".", action: handleDecimal },
        { label: "=", action: handleEquals, className: "equals" },
    ];

    return (
        <div className="main-content"><div className="container">
            <Breadcrumbs />
                
                <div className="page-with-sidebar">
                    <MoreTools />
                    <div className="page-main">
                        <div className="calc-wrapper">
                            <h2 className="calc-title">Basic Calculator</h2>
                            <div className="calc-display">
                                <div className="expression">{expression}</div>
                                <div className="result">{display}</div>
                            </div>
                            <div className="calc-grid">
                                {buttons.map((btn, i) => (
                                    <button key={i} className={`calc-btn ${btn.className || ""}`} onClick={btn.action}>{btn.label}</button>
                                ))}
                            </div>
                        </div>

                        {/* SEO Content */}
                        <div className="seo-content mt-8">
                            <h1>Basic Calculator</h1>
                            <p>
                                The Basic Calculator is a free, simple, and fast online tool for all your everyday mathematical needs.
                                Whether you are balancing your checkbook, doing homework, or calculating a quick sum, this tool helps you perform arithmetic easily.
                                With a clear user interface featuring a standard layout—addition, subtraction, multiplication, and division—it provides instant, accurate results without any complex features or confusing buttons getting in the way.
                            </p>
                            <h2>How it Works</h2>
                            <p>Simply click or tap the numbers on the keypad, choose your mathematical operator (+, -, ×, ÷), and hit the equals button to instantly see your answer. You can also use the clear button to start fresh or backspace to correct mistakes.</p>

                            <h2>Benefits of the Basic Calculator</h2>
                            <p>This tool requires no downloads or installations. It works perfectly on desktop and mobile devices, loading instantly so you can do quick math on the go with zero hassle.</p>

                            <h2>When to Use</h2>
                            <p>Use it for daily tasks like splitting a restaurant bill, calculating a shopping budget, or helping out with basic homework problems.</p>

                            <h2>Frequently Asked Questions</h2>
                            <h3>Is the basic calculator free to use?</h3>
                            <p>Yes, our basic calculator is 100% free and requires no sign-up or registration.</p>

                            <h3>Can I use this calculator on my mobile phone?</h3>
                            <p>Absolutely! The calculator is designed to be mobile-friendly and responsive.</p>

                            <h3>Does this tool save my calculation history?</h3>
                            <p>No, for your privacy and simplicity, it does not store history after you refresh or close the page.</p>
                        <FAQSchema faqs={[
    {
        question: "Is the basic calculator free to use?", answer: "Yes, our basic calculator is 100% free and requires no sign-up or registration."
    },
    {
        question: "Can I use this calculator on my mobile phone?", answer: "Absolutely! The calculator is designed to be mobile-friendly and responsive."
    },
    {
        question: "Does this tool save my calculation history?", answer: "No, for your privacy and simplicity, it does not store history after you refresh or close the page."
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
