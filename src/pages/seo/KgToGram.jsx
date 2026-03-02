import { Link } from "react-router-dom";
import FAQSchema from "../../components/FAQSchema";
import { MoreTools, RelatedTools } from "../../components/RelatedTools";
import WeightConverter from "../calculators/WeightConverter";

export default function KgToGram() {
    return (
        <div className="main-content">
            <div className="container">
                {/* Custom Breadcrumbs for Micro Page */}
                <nav aria-label="breadcrumb" className="breadcrumbs-container">
                    <ol className="breadcrumbs-list">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/converter">Converter</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/converter/weight">Weight Converter</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <span>Kg to Gram Converter</span>
                        </li>
                    </ol>
                </nav>

                <div className="page-with-sidebar">
                    <MoreTools />
                    <div className="page-main">

                        <div className="seo-content mb-8">
                            <h1>Kilogram to Gram Converter</h1>
                            <p>
                                Welcome to our dedicated Kilogram to Gram Converter. Converting between these two essential metric units of weight is crucial for cooking, science experiments, shipping freight, and everyday grocery shopping. Our calculator provides instant, highly precise translations without you having to do any mental math or division. You can simply input your kilos below, and get immediate results in grams.
                            </p>
                        </div>

                        {/* Embed the Main Calculator Component without its native SEO */}
                        <div className="mb-8">
                            <WeightConverter defaultFrom="Kilogram" defaultTo="Gram" hideSeo={true} />
                        </div>

                        {/* Micro Page Specific SEO Content */}
                        <div className="seo-content mt-8">
                            <h2>Conversion Formula</h2>
                            <p>The conversion between kilograms (kg) and grams (g) is based on the metric system, where the prefix "kilo" stands for 1,000. Therefore, the formula is highly straightforward:</p>
                            <p><strong>Grams = Kilograms × 1,000</strong></p>

                            <h2>Quick Conversion Table</h2>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', marginBottom: '20px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: '1px solid var(--border)', padding: '8px', textAlign: 'left', background: 'var(--bg-secondary)' }}>Kilogram (kg)</th>
                                        <th style={{ border: '1px solid var(--border)', padding: '8px', textAlign: 'left', background: 'var(--bg-secondary)' }}>Gram (g)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td style={{ border: '1px solid var(--border)', padding: '8px' }}>1 kg</td><td style={{ border: '1px solid var(--border)', padding: '8px' }}>1,000 g</td></tr>
                                    <tr><td style={{ border: '1px solid var(--border)', padding: '8px' }}>2.5 kg</td><td style={{ border: '1px solid var(--border)', padding: '8px' }}>2,500 g</td></tr>
                                    <tr><td style={{ border: '1px solid var(--border)', padding: '8px' }}>5 kg</td><td style={{ border: '1px solid var(--border)', padding: '8px' }}>5,000 g</td></tr>
                                    <tr><td style={{ border: '1px solid var(--border)', padding: '8px' }}>10 kg</td><td style={{ border: '1px solid var(--border)', padding: '8px' }}>10,000 g</td></tr>
                                </tbody>
                            </table>

                            <h2>Frequently Asked Questions</h2>
                            <h3>What is heavier, a gram or a kilogram?</h3>
                            <p>A kilogram is significantly heavier. It takes exactly 1,000 individual grams to equal one single kilogram.</p>

                            <h3>Why do recipes use grams instead of kilograms?</h3>
                            <p>Baking is a science that requires extreme precision. Using grams allows bakers to measure ingredients down to minute amounts, whereas measuring a pinch of salt or yeast in kilograms would result in cumbersome decimals like 0.005 kg.</p>

                            <FAQSchema faqs={[
                                {
                                    question: "What is heavier, a gram or a kilogram?", answer: "A kilogram is significantly heavier. It takes exactly 1,000 individual grams to equal one single kilogram."
                                },
                                {
                                    question: "Why do recipes use grams instead of kilograms?", answer: "Baking is a science that requires extreme precision. Using grams allows bakers to measure ingredients down to minute amounts, whereas measuring a pinch of salt or yeast in kilograms would result in cumbersome decimals like 0.005 kg."
                                }
                            ]} />

                            <p className="mt-8 text-center" style={{ marginTop: '30px' }}>
                                <Link to="/converter/weight" className="convert-btn" style={{ display: 'inline-block', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none' }}>
                                    ← Back to Main Weight Converter
                                </Link>
                            </p>
                        </div>
                    </div>
                    <RelatedTools />
                </div>
            </div>
        </div>
    );
}
