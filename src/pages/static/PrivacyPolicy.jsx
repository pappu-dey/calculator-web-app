import React from "react";
import BackButton from "../components/BackButton";

export default function PrivacyPolicy() {
    return (
        <div className="main-content">
            <div className="container">
                <BackButton />
                <div className="static-page-card">
                    <h1>Privacy Policy</h1>
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <p>
                        At Calculator Hub (calculatorhub.online), the privacy of our visitors is of extreme importance to us.
                        This privacy policy document outlines the types of personal information is received and collected by
                        Calculator Hub and how it is used.
                    </p>

                    <h2>Log Files</h2>
                    <p>
                        Like many other Web sites, Calculator Hub makes use of log files. The information inside the log files
                        includes internet protocol (IP) addresses, type of browser, Internet Service Provider (ISP), date/time
                        stamp, referring/exit pages, and number of clicks to analyze trends, administer the site, track user's
                        movement around the site, and gather demographic information. IP addresses, and other such information
                        are not linked to any information that is personally identifiable.
                    </p>

                    <h2>Cookies and Web Beacons</h2>
                    <p>
                        Calculator Hub does use cookies to store information about visitors' preferences, record user-specific
                        information on which pages the user access or visit, customize Web page content based on visitors
                        browser type or other information that the visitor sends via their browser.
                    </p>

                    <h2>DoubleClick DART Cookie</h2>
                    <ul>
                        <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
                        <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
                        <li>Users may opt out of personalized advertising by visiting Ads Settings.</li>
                    </ul>

                    <p>
                        If you require any more information or have any questions about our privacy policy, please feel free
                        to contact us by email at support@calculatorhub.online.
                    </p>
                </div>
            </div>
        </div>
    );
}
