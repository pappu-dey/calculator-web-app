import { useState } from "react";
import BackButton from "../../components/BackButton";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";

export default function ScientificCalculator() {
    const [display, setDisplay] = useState("0");
    const [expression, setExpression] = useState("");
    const [reset, setReset] = useState(false);
    const [mode, setMode] = useState("scientific");
    const [isDeg, setIsDeg] = useState(true);

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

    const handleDecimal = () => {
        if (!display.includes(".")) setDisplay(display + ".");
    };

    const handleBackspace = () => {
        if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
            setDisplay("0");
        } else {
            setDisplay(display.slice(0, -1));
        }
    };

    const toRad = (deg) => (deg * Math.PI) / 180;
    const toDeg = (rad) => (rad * 180) / Math.PI;

    const applyFunc = (fn) => {
        const val = parseFloat(display);
        if (isNaN(val)) { setDisplay("Error"); return; }
        let result;
        switch (fn) {
            case "sin":
                result = isDeg ? Math.sin(toRad(val)) : Math.sin(val);
                break;
            case "cos":
                result = isDeg ? Math.cos(toRad(val)) : Math.cos(val);
                break;
            case "tan":
                result = isDeg ? Math.tan(toRad(val)) : Math.tan(val);
                break;
            case "asin":
                result = isDeg ? toDeg(Math.asin(val)) : Math.asin(val);
                break;
            case "acos":
                result = isDeg ? toDeg(Math.acos(val)) : Math.acos(val);
                break;
            case "atan":
                result = isDeg ? toDeg(Math.atan(val)) : Math.atan(val);
                break;
            case "log":
                result = Math.log10(val);
                break;
            case "ln":
                result = Math.log(val);
                break;
            case "sqrt":
                result = Math.sqrt(val);
                break;
            case "cbrt":
                result = Math.cbrt(val);
                break;
            case "sq":
                result = val * val;
                break;
            case "cube":
                result = val * val * val;
                break;
            case "inv":
                result = 1 / val;
                break;
            case "fact":
                if (val < 0 || val > 170 || val !== Math.floor(val)) { setDisplay("Error"); return; }
                result = factorial(val);
                break;
            case "abs":
                result = Math.abs(val);
                break;
            case "exp":
                result = Math.exp(val);
                break;
            case "10x":
                result = Math.pow(10, val);
                break;
            default:
                return;
        }
        if (isNaN(result) || !isFinite(result)) {
            setDisplay("Error");
        } else {
            setDisplay(parseFloat(result.toFixed(10)).toString());
        }
        setReset(true);
    };

    const factorial = (n) => {
        if (n === 0 || n === 1) return 1;
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    };

    const insertConst = (c) => {
        const val = c === "π" ? Math.PI.toString() : Math.E.toString();
        setDisplay(val);
        setReset(true);
    };

    const basicButtons = [
        { label: "C", action: handleClear, className: "clear" },
        { label: "⌫", action: handleBackspace, className: "func" },
        { label: "%", action: () => setDisplay((parseFloat(display) / 100).toString()), className: "func" },
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
        { label: "±", action: () => setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display), className: "func" },
        { label: "0", action: () => handleNumber("0") },
        { label: ".", action: handleDecimal },
        { label: "=", action: handleEquals, className: "equals" },
    ];

    const sciButtons = [
        { label: isDeg ? "DEG" : "RAD", action: () => setIsDeg(!isDeg), className: "func" },
        { label: "sin", action: () => applyFunc("sin"), className: "func" },
        { label: "cos", action: () => applyFunc("cos"), className: "func" },
        { label: "tan", action: () => applyFunc("tan"), className: "func" },
        { label: "π", action: () => insertConst("π"), className: "func" },

        { label: "asin", action: () => applyFunc("asin"), className: "func" },
        { label: "acos", action: () => applyFunc("acos"), className: "func" },
        { label: "atan", action: () => applyFunc("atan"), className: "func" },
        { label: "e", action: () => insertConst("e"), className: "func" },
        { label: "!", action: () => applyFunc("fact"), className: "func" },

        { label: "x²", action: () => applyFunc("sq"), className: "func" },
        { label: "x³", action: () => applyFunc("cube"), className: "func" },
        { label: "xʸ", action: () => handleOperator("**"), className: "func" },
        { label: "√", action: () => applyFunc("sqrt"), className: "func" },
        { label: "∛", action: () => applyFunc("cbrt"), className: "func" },

        { label: "log", action: () => applyFunc("log"), className: "func" },
        { label: "ln", action: () => applyFunc("ln"), className: "func" },
        { label: "eˣ", action: () => applyFunc("exp"), className: "func" },
        { label: "10ˣ", action: () => applyFunc("10x"), className: "func" },
        { label: "1/x", action: () => applyFunc("inv"), className: "func" },

        { label: "|x|", action: () => applyFunc("abs"), className: "func" },
        { label: "C", action: handleClear, className: "clear" },
        { label: "⌫", action: handleBackspace, className: "func" },
        { label: "%", action: () => setDisplay((parseFloat(display) / 100).toString()), className: "func" },
        { label: "÷", action: () => handleOperator("÷"), className: "operator" },

        { label: "7", action: () => handleNumber("7") },
        { label: "8", action: () => handleNumber("8") },
        { label: "9", action: () => handleNumber("9") },
        { label: "×", action: () => handleOperator("×"), className: "operator" },
        { label: "−", action: () => handleOperator("-"), className: "operator" },

        { label: "4", action: () => handleNumber("4") },
        { label: "5", action: () => handleNumber("5") },
        { label: "6", action: () => handleNumber("6") },
        { label: "+", action: () => handleOperator("+"), className: "operator" },
        { label: "±", action: () => setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display), className: "func" },

        { label: "1", action: () => handleNumber("1") },
        { label: "2", action: () => handleNumber("2") },
        { label: "3", action: () => handleNumber("3") },
        { label: ".", action: handleDecimal },
        { label: "=", action: handleEquals, className: "equals" },

        { label: "0", action: () => handleNumber("0") },
    ];

    const currentButtons = mode === "scientific" ? sciButtons : basicButtons;
    const gridClass = mode === "scientific" ? "calc-grid scientific" : "calc-grid";

    return (
        <div className="main-content">
            <div className="container">
                <BackButton />
                <div className="page-with-sidebar">
                    <MoreTools />
                    <div className="page-main">
                        <div className="calc-wrapper">
                            <h2 className="calc-title">Scientific Calculator</h2>
                            <div className="calc-mode-toggle">
                                <button className={mode === "basic" ? "active" : ""} onClick={() => setMode("basic")}>Basic</button>
                                <button className={mode === "scientific" ? "active" : ""} onClick={() => setMode("scientific")}>Scientific</button>
                            </div>
                            <div className="calc-display">
                                <div className="expression">{expression}</div>
                                <div className="result">{display}</div>
                            </div>
                            <div className={gridClass}>
                                {currentButtons.map((btn, i) => (
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
