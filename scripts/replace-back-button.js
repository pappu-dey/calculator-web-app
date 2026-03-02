const fs = require('fs');
const path = require('path');

const calculatorsDir = path.join(__dirname, '../src/pages/calculators');
const mathDir = path.join(__dirname, '../src/pages/calculators/math');
const healthDir = path.join(__dirname, '../src/pages/calculators/health');
const financeDir = path.join(__dirname, '../src/pages/calculators/finance');
const dailyDir = path.join(__dirname, '../src/pages/calculators/daily');
const collegeDir = path.join(__dirname, '../src/pages/calculators/college');
const converterDir = path.join(__dirname, '../src/pages/calculators/converters');

// Directories to process
const directories = [
    calculatorsDir,
    path.join(__dirname, '../src/pages/static') // Also do About, Contact etc
];

function processDirectory(directoryPath) {
    if (!fs.existsSync(directoryPath)) return;

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach(function (file) {
            const filePath = path.join(directoryPath, file);

            // recurse if directory
            if (fs.statSync(filePath).isDirectory()) {
                processDirectory(filePath);
                return;
            }

            if (!file.endsWith('.jsx')) return;

            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;

            // Remove BackButton import
            if (content.includes('import BackButton')) {
                content = content.replace(/import BackButton from ".*?BackButton";\r?\n/, '');
                modified = true;
            }

            // Remove <BackButton />
            if (content.includes('<BackButton />')) {
                content = content.replace(/<BackButton \/>/g, '');
                modified = true;
            }

            // Add Breadcrumbs import if not there
            if (!content.includes('import Breadcrumbs')) {
                // Determine relative path depth
                // If in src/pages/static -> ../../components/Breadcrumbs
                // If in src/pages/calculators -> ../../components/Breadcrumbs
                const depth = filePath.split('src')[1].split(path.sep).length - 2;
                let relPath = '';
                for (let i = 0; i < depth; i++) relPath += '../';
                relPath += 'components/Breadcrumbs';

                content = content.replace(/(import .*?;[\r\n]+)(?=(import |const |export ))/, `$1import Breadcrumbs from "${relPath}";\n`);
                modified = true;
            }

            // Insert <Breadcrumbs /> at the top of main-content container
            if (modified && !content.includes('<Breadcrumbs />')) {
                // Find <div className="main-content"><div className="container">
                const insertionPoint = /<div className="main-content">\s*<div className="container">/g;
                content = content.replace(insertionPoint, `<div className="main-content"><div className="container">\n            <Breadcrumbs />`);

                // Fallbacks if formatting is different
                const insertionPoint2 = /<div className="main-content">\n\s*<div className="container">/g;
                content = content.replace(insertionPoint2, `<div className="main-content">\n        <div className="container">\n            <Breadcrumbs />`);
            }

            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Replaced BackButton with Breadcrumbs in ${file}`);
            }
        });
    });
}

directories.forEach(processDirectory);
