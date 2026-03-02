import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQSchema from "../../components/FAQSchema";
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
        <div className="main-content"><div className="container">
            <Breadcrumbs />
                
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

                        {/* SEO Content */}
                        <div className="seo-content mt-8">
                            <h1>Calorie Calculator</h1>
                            <p>
                                The Calorie Calculator is an easy-to-use tool to determine how many calories your body needs every day to maintain, lose, or gain weight.
                                By inputting your age, gender, height, weight, and daily activity level, this calculator provides a highly personalized estimate of your daily caloric needs.
                                Whether you are a fitness enthusiast aiming to build muscle or someone trying to shed a few pounds, this tool is your first step toward achieving your goals.
                            </p>
                            <h2>How it Works</h2>
                            <p>It uses the globally recognized Mifflin-St Jeor equation to calculate your Basal Metabolic Rate (BMR) and then multiplies it by your selected activity level (from sedentary to very active) to calculate total daily energy expenditure (TDEE).</p>

                            <h2>Benefits of the Calorie Calculator</h2>
                            <p>It gives you a clear numerical target for your diet instead of guessing. You get precise caloric goals tailored to different objectives, such as a mild weight loss or an aggressive bulk.</p>

                            <h2>When to Use</h2>
                            <p>Use it when you are starting a new diet plan, hitting a weight-loss plateau, or planning your meals to build muscle through a caloric surplus.</p>

                            <h2>Frequently Asked Questions</h2>
                            <h3>How accurate is this calorie calculator?</h3>
                            <p>The Mifflin-St Jeor equation is highly regarded as one of the most accurate metabolic formulas, though individual metabolic rates can vary slightly.</p>

                            <h3>What does "Sedentary" activity level mean?</h3>
                            <p>It means you get little to no exercise during the week—typically someone who works a desk job and doesn't play sports or go to the gym.</p>

                            <h3>Should I recalculate my calories as I lose weight?</h3>
                            <p>Yes, as your body weight changes, your required daily calories will also change. We recommend recalculating every 5-10 pounds lost.</p>
                        <FAQSchema faqs={[
    {
        question: "Daily Calorie Needs\r\n                                    BMR (Base Metabolic Rate){result.bmr} cal\r\n                                    Maintenance (TDEE){result.tdee} cal\r\n                                    Weight Loss (-500){result.lose} cal\r\n                                    Weight Gain (+500){result.gain} cal\r\n                                \r\n                            )}\r\n                        \r\n\r\n                        {/* SEO Content */}\r\n                        \r\n                            Calorie Calculator\r\n                            \r\n                                The Calorie Calculator is an easy-to-use tool to determine how many calories your body needs every day to maintain, lose, or gain weight.\r\n                                By inputting your age, gender, height, weight, and daily activity level, this calculator provides a highly personalized estimate of your daily caloric needs.\r\n                                Whether you are a fitness enthusiast aiming to build muscle or someone trying to shed a few pounds, this tool is your first step toward achieving your goals.\r\n                            \r\n                            How it Works\r\n                            It uses the globally recognized Mifflin-St Jeor equation to calculate your Basal Metabolic Rate (BMR) and then multiplies it by your selected activity level (from sedentary to very active) to calculate total daily energy expenditure (TDEE).\r\n\r\n                            Benefits of the Calorie Calculator\r\n                            It gives you a clear numerical target for your diet instead of guessing. You get precise caloric goals tailored to different objectives, such as a mild weight loss or an aggressive bulk.\r\n\r\n                            When to Use\r\n                            Use it when you are starting a new diet plan, hitting a weight-loss plateau, or planning your meals to build muscle through a caloric surplus.\r\n\r\n                            Frequently Asked Questions\r\n                            How accurate is this calorie calculator?", answer: "The Mifflin-St Jeor equation is highly regarded as one of the most accurate metabolic formulas, though individual metabolic rates can vary slightly."
    },
    {
        question: "What does \"Sedentary\" activity level mean?", answer: "It means you get little to no exercise during the week—typically someone who works a desk job and doesn't play sports or go to the gym."
    },
    {
        question: "Should I recalculate my calories as I lose weight?", answer: "Yes, as your body weight changes, your required daily calories will also change. We recommend recalculating every 5-10 pounds lost."
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
