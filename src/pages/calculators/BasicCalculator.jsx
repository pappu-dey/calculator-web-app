import { useState } from "react";
import BackButton from "../../components/BackButton";
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
        <div className="main-content">
            <div className="container">
                <BackButton />
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
                    </div>
                    <RelatedTools />
                </div>
            </div>
        </div>
    );
}
