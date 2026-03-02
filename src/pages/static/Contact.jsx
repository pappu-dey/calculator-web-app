import React from "react";

import Breadcrumbs from "../../components/Breadcrumbs";
export default function Contact() {
    return (
        <div className="main-content"><div className="container">
            <Breadcrumbs />
                
                <div className="static-page-card">
                    <h1>Contact Us</h1>
                    <p>
                        We would love to hear from you! If you have any questions, feedback,
                        or suggestions for new calculators, please reach out to us.
                    </p>
                    <p>
                        <strong>Email:</strong> xtpdev@gmail.com
                    </p>
                    <p>
                        We aim to respond to all inquiries within 24-48 hours. Thank you for using Calculator Hub!
                    </p>
                </div>
            </div>
        </div>
    );
}
