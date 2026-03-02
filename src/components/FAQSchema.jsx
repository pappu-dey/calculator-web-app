import { useEffect } from "react";

/**
 * Injects FAQ structured data (JSON-LD) into the page <head> for SEO.
 * Usage: <FAQSchema faqs={[{ question: "...", answer: "..." }, ...]} />
 */
export default function FAQSchema({ faqs }) {
    useEffect(() => {
        if (!faqs || faqs.length === 0) return;

        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                },
            })),
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(schema);
        script.id = "faq-schema";
        document.head.appendChild(script);

        return () => {
            const existing = document.getElementById("faq-schema");
            if (existing) existing.remove();
        };
    }, [faqs]);

    return null;
}
