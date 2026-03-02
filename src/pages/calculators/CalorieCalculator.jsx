import { useState } from "react";
import BackButton from "../../components/BackButton";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";

export default function CalorieCalculator() {
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("male");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [activity, setActivity] = useState("1.55");
    const [result, setResult] = useState(null);

    const calculate = () => {
        const a = parseFloat(age), w = parseFloat(weight), h = parseFloat(height), act = parseFloat(activity);
        if (isNaN(a) || isNaN(w) || isNaN(h)) return;
        let bmr = gender === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
        const tdee = bmr * act;
        setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee), lose: Math.round(tdee - 500), gain: Math.round(tdee + 500) });
    };

    return (
        <div className="main-content">
            <div className="container">
                <BackButton />
                <div className="page-with-sidebar">
                    <MoreTools />
                    <div className="page-main">
                        <div className="calc-wrapper">
                            <h2 className="calc-title">Calorie Calculator</h2>
                            <div className="calc-form">
                                <div className="form-row">
                                    <div className="form-group"><label>Age</label><input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 25" /></div>
                                    <div className="form-group"><label>Gender</label><select value={gender} onChange={(e) => setGender(e.target.value)}><option value="male">Male</option><option value="female">Female</option></select></div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group"><label>Weight (kg)</label><input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70" /></div>
                                    <div className="form-group"><label>Height (cm)</label><input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 175" /></div>
                                </div>
                                <div className="form-group">
                                    <label>Activity Level</label>
                                    <select value={activity} onChange={(e) => setActivity(e.target.value)}>
                                        <option value="1.2">Sedentary (little or no exercise)</option>
                                        <option value="1.375">Lightly Active (1-3 days/week)</option>
                                        <option value="1.55">Moderately Active (3-5 days/week)</option>
                                        <option value="1.725">Very Active (6-7 days/week)</option>
                                        <option value="1.9">Extra Active (very hard exercise)</option>
                                    </select>
                                </div>
                                <button className="calc-submit" onClick={calculate}>Calculate</button>
                            </div>
                            {result && (
                                <div className="result-card">
                                    <h3>Daily Calorie Needs</h3>
                                    <div className="result-row"><span className="label">BMR (Base Metabolic Rate)</span><span className="value">{result.bmr} cal</span></div>
                                    <div className="result-row"><span className="label">Maintenance (TDEE)</span><span className="value">{result.tdee} cal</span></div>
                                    <div className="result-row"><span className="label">Weight Loss (-500)</span><span className="value">{result.lose} cal</span></div>
                                    <div className="result-row"><span className="label">Weight Gain (+500)</span><span className="value">{result.gain} cal</span></div>
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
