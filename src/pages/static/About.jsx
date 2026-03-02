import React from "react";
import BackButton from "../components/BackButton";

export default function About() {
    return (
        <div className="main-content">
            <div className="container">
                <BackButton />
                <div className="static-page-card">
                    <h1>About Calculator Hub</h1>
                    <p>
                        Welcome to Calculator Hub! Our mission is to provide free, fast, and easy-to-use
                        online calculators for your daily life, financial planning, health tracking, and
                        academic needs.
                    </p>
                    <p>
                        Whether you are calculating an EMI for a new home, checking your BMI for fitness goals,
                        or finding out your college CGPA, we are here to make the math simple.
                    </p>
                    <h2>Our Core Values</h2>
                    <ul>
                        <li><strong>Accuracy:</strong> All our tools are rigorously tested.</li>
                        <li><strong>Speed:</strong> Find answers instantly without complex sign-ups.</li>
                        <li><strong>Simplicity:</strong> Clean and intuitive designs for all devices.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
