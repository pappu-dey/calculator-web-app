import React from "react";

import Breadcrumbs from "../../components/Breadcrumbs";
export default function Terms() {
    return (
        <div className="main-content"><div className="container">
            <Breadcrumbs />
                
                <div className="static-page-card">
                    <h1>Terms & Conditions</h1>
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <h2>Acceptance of Terms</h2>
                    <p>
                        By accessing and using Calculator Hub (calculatorhub.online),
                        you accept and agree to be bound by these Terms & Conditions.
                        If you do not agree, please do not use this website.
                    </p>

                    <h2>Use of Tools</h2>
                    <p>
                        All calculators and tools on this website are provided for
                        informational and educational purposes only.
                    </p>
                    <p>
                        We do not guarantee the accuracy, completeness, or reliability
                        of any results generated.
                    </p>

                    <h2>No Professional Advice</h2>
                    <p>
                        The tools available on Calculator Hub do not constitute financial,
                        medical, legal, or academic advice.
                        Users should verify results before making decisions.
                    </p>

                    <h2>Limitation of Liability</h2>
                    <p>
                        Calculator Hub shall not be held responsible for any loss,
                        damage, or consequences resulting from the use of this website
                        or reliance on any calculation results.
                    </p>

                    <h2>Third-Party Ads & Links</h2>
                    <p>
                        This website may display advertisements or links to external websites.
                        We do not control these third-party services and are not responsible
                        for any content, products, or services they provide.
                    </p>

                    <h2>User Responsibility</h2>
                    <p>
                        You agree to use this website at your own risk.
                        Any action taken based on information from this site is solely
                        your responsibility.
                    </p>

                    <h2>Changes to Terms</h2>
                    <p>
                        We may update these Terms at any time without notice.
                        Continued use of the website means you accept the updated Terms.
                    </p>

                    <h2>Contact</h2>
                    <p>
                        If you have any questions about these Terms,
                        contact us at: xtpdev@gmail.com
                    </p>
                </div>
            </div>
        </div>
    );
}