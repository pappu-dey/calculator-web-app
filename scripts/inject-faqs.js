const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../src/pages/calculators');

function stripTags(html) {
    return html.replace(/<[^>]*>?/gm, '');
}

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(function (file) {
        if (!file.endsWith('.jsx')) return;

        const filePath = path.join(directoryPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Skip if already has FAQSchema
        if (content.includes('FAQSchema')) {
            console.log(`Skipping ${file}, already has FAQSchema`);
            return;
        }

        // Add import
        content = content.replace(/(import .*?;[\r\n]+)(?=(import |const |export ))/, `$1import FAQSchema from "../../components/FAQSchema";\n`);

        // Extract FAQs
        const faqs = [];
        const faqRegex = /<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/gs;
        let match;
        while ((match = faqRegex.exec(content)) !== null) {
            faqs.push({
                question: stripTags(match[1].trim()),
                answer: stripTags(match[2].trim())
            });
        }

        if (faqs.length > 0) {
            // Find the index of `<RelatedTools />` to safely inject right before its enclosing div
            const relatedToolsIndex = content.lastIndexOf('<RelatedTools />');
            if (relatedToolsIndex === -1) {
                console.log(`Could not find <RelatedTools /> in ${file}`);
                return;
            }

            // Find the sequence of closing divs right before `<RelatedTools />`
            // Usually it's `</div>\n                    </div>\n                    <RelatedTools />`
            // Let's use a regex to find the closing div of the `.seo-content` container
            const matchBeforeRelated = content.match(/<\/div>\s*<\/div>\s*<RelatedTools \/>/);
            const matchBeforeRelated2 = content.match(/<\/div><\/div><RelatedTools \/>/);
            const matchBeforeRelated3 = content.match(/<\/div>\s*<RelatedTools \/>/);

            const faqComponentStr = `<FAQSchema faqs={${JSON.stringify(faqs, null, 4)}} />\n                        `;

            if (matchBeforeRelated) {
                content = content.replace(matchBeforeRelated[0], `${faqComponentStr}${matchBeforeRelated[0]}`);
            } else if (matchBeforeRelated2) {
                content = content.replace(matchBeforeRelated2[0], `${faqComponentStr}${matchBeforeRelated2[0]}`);
            } else if (matchBeforeRelated3) {
                content = content.replace(matchBeforeRelated3[0], `${faqComponentStr}${matchBeforeRelated3[0]}`);
            } else {
                console.log(`Could not pattern match end of seo-content in ${file}`);
                return;
            }

            // Also clean up formatting slightly
            content = content.replace(/"question": "(.*?)",\n\s+"answer": "(.*?)"/g, `question: "$1", answer: "$2"`);

            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Injected FAQ Schema into ${file} with ${faqs.length} FAQs`);
        } else {
            console.log(`No FAQs found in ${file}`);
        }
    });
});
