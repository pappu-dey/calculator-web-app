import React from "react";

import Breadcrumbs from "../../components/Breadcrumbs";
export default function PrivacyPolicy() {
    return (
        <div className="main-content"><div className="container">
            <Breadcrumbs />
                
                <div className="static-page-card">
                    <h1>Privacy Policy & Disclaimer</h1>
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <p>
                        Welcome to Calculator Hub (calculatorhub.online).
                        By using this website, you agree to this Privacy Policy and Disclaimer.
                    </p>

                    <h2>Information Collection</h2>
                    <p>
                        Calculator Hub does not collect any personal information from users.
                        All calculators are free tools meant for general informational purposes only.
                    </p>

                    <h2>Use At Your Own Risk</h2>
                    <p>
                        All tools and calculators on this website are provided for convenience only.
                        We do not guarantee accuracy of results.
                        Users are solely responsible for how they use any results generated.
                    </p>
                    <p>
                        Calculator Hub will not be responsible for any financial loss, health decision,
                        academic result, or any other outcome based on the use of our tools.
                    </p>

                    <h2>Third-Party Advertisements</h2>
                    <p>
                        This website may display advertisements provided by third-party ad networks such as Google.
                        These ads are not controlled by Calculator Hub.
                    </p>
                    <p>
                        If you click on any advertisement, visit external links, or purchase any product or service,
                        Calculator Hub is not responsible for any damage, loss, or issue arising from such interaction.
                    </p>

                    <h2>Cookies</h2>
                    <p>
                        Third-party vendors may use cookies to serve ads based on your previous visits
                        to this or other websites. Calculator Hub has no control over these cookies.
                    </p>

                    <h2>External Links</h2>
                    <p>
                        Our website may contain links to other websites.
                        We are not responsible for the content, policies, or actions of any third-party websites.
                    </p>

                    <h2>Consent</h2>
                    <p>
                        By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                    </p>

                    <h2>Contact</h2>
                    <p>
                        If you have any questions, contact us at: xtpdev@gmail.com
                    </p>
                </div>
            </div>
        </div>
    );
}