const fs = require('fs');
const path = require('path');


// TODO => convert to CSV for data analysis
// url, 
// type (inapplicable, passes, violations, incomplete), 
//    rule-id
//       node[]
//          rule-node-html, 
//          rule-node-impact,
//          any[]
//            rule-node-any-check-id
//            rule-node-any-check-impact
//          all[]
//            rule-node-all-check-id
//            rule-node-all-check-impact
//          none[]
//            rule-node-none-check-id
//            rule-node-none-check-impact
// rule, nodes.length

// Create 4 files (one for each type)
// Each has CSV data with these 11 columns
//    url, timestamp, rule-id, node-html, node-impact, 
//    node-any-checkid, node-any-check-impact, 
//    node-all-checkid, node-all-check-impact, 
//    node-none-checkid, node-none-check-impact

// We can now visualize data along these questions
//   Which rule-id got most violations - passes - inapplicable - incomplete ACROSS ALL SITES/PAGE?
//   Which rule-id got most violations - passes - inapplicable - incomplete ACROSS A SINGLE SITE/PAGE? 
//   How many records per type had rule-impact that was serious? How many were minor? How many were moderate?
//   Which url got the most violations - passes - inapplicable - incomplete ACROSS ALL RULES?
//   Which url got the most violations - passes - inapplicable - incomplete ACROSS A SINGLE RULE?
//   Ditto for checks.

/*
// --------------------------------
Data contains
    - url
    - timestamp
    - toolOptions
    - inapplicable[]
    - passes[]
    - violations[]
    - incomplete[]
// --------------------------------
*/


const rules = [
    "accesskeys",
    "area-alt",
    "aria-allowed-attr",
    "aria-allowed-role",
    "aria-command-name",
    "aria-dialog-name",
    "aria-hidden-body",
    "aria-hidden-focus",
    "aria-input-field-name",
    "aria-meter-name",
    "aria-progressbar-name",
    "aria-required-attr",
    "aria-required-children",
    "aria-required-parent",
    "aria-roledescription",
    "aria-roles",
    "aria-text",
    "aria-toggle-field-name",
    "aria-tooltip-name",
    "aria-treeitem-name",
    "aria-valid-attr-value",
    "aria-valid-attr",
    "audio-caption",
    "autocomplete-valid",
    "avoid-inline-spacing",
    "blink",
    "button-name",
    "bypass",
    "color-contrast-enhanced",
    "color-contrast",
    "css-orientation-lock",
    "definition-list",
    "dlitem",
    "document-title",
    "duplicate-id-active",
    "duplicate-id-aria",
    "duplicate-id",
    "empty-heading",
    "empty-table-header",
    "focus-order-semantics",
    "form-field-multiple-labels",
    "frame-focusable-content",
    "frame-tested",
    "frame-title-unique",
    "frame-title",
    "heading-order",
    "hidden-content",
    "html-has-lang",
    "html-lang-valid",
    "html-xml-lang-mismatch",
    "identical-links-same-purpose",
    "image-alt",
    "image-redundant-alt",
    "input-button-name",
    "input-image-alt",
    "label-content-name-mismatch",
    "label-title-only",
    "label",
    "landmark-banner-is-top-level",
    "landmark-complementary-is-top-level",
    "landmark-contentinfo-is-top-level",
    "landmark-main-is-top-level",
    "landmark-no-duplicate-banner",
    "landmark-no-duplicate-contentinfo",
    "landmark-no-duplicate-main",
    "landmark-one-main",
    "landmark-unique",
    "link-in-text-block",
    "link-name",
    "list",
    "listitem",
    "marquee",
    "meta-refresh-no-exceptions",
    "meta-refresh",
    "meta-viewport-large",
    "meta-viewport",
    "nested-interactive",
    "no-autoplay-audio",
    "object-alt",
    "p-as-heading",
    "page-has-heading-one",
    "presentation-role-conflict",
    "region",
    "role-img-alt",
    "scope-attr-valid",
    "scrollable-region-focusable",
    "select-name",
    "server-side-image-map",
    "skip-link",
    "svg-img-alt",
    "tabindex",
    "table-duplicate-name",
    "table-fake-caption",
    "target-size",
    "td-has-header",
    "td-headers-attr",
    "th-has-data-cells",
    "valid-lang",
    "video-caption"
];

const checksMap = new Map(); // id -> {description, impact}
const rulesMap = new Map(); // id -> {description, impact, tags}


// Process accessibility JSON result file
function processJSON(data, filename) {
    let result = {
        url: null,
        timestamp: null,
        elements: 0,
        inapplicable: 0,
        passes: 0,
        violations: 0,
        incomplete: 0
    }

    result.url = data.url;
    result.timestamp = data.timestamp;
    for (const rule of data.inapplicable)
        result.inapplicable += rule.nodes.length;
    for (const rule of data.passes)
        result.passes += rule.nodes.length;
    for (const rule of data.violations)
        result.violations += rule.nodes.length;
    for (const rule of data.incomplete)
        result.incomplete += rule.nodes.length;
    result.elements = result.inapplicable + result.passes + result.violations + result.incomplete;

    return result;
}

// Get accessibility results folder path as argument
// If no argument, prompt user to try again with a folder name argumnent
if (process.argv.length < 3) {
    console.log("Please specify path to folder with accessibility results in JSON format.");
    console.log("Example: node visua11y.js ../data/playwright/");
    return;
}
const dirname = process.argv[2];


// Read directory, 
// iterate through .json files, 
// process each file, 
// and write results to console
fs.readdir(dirname, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }
    const jsonFiles = files.filter(file => path.extname(file) === '.json');

    console.log("\n---------------------------------------------");
    jsonFiles.forEach(file => {
        const filename = path.join(dirname, file);
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const json = JSON.parse(data);
            const result = processJSON(json, filename);

            console.log("PARSING FILE\t" + filename);
            console.log(" url\t\t", result.url);
            console.log(" timestamp\t", result.timestamp);
            console.log(" evaluated\t", result.elements);
            console.log(" inapplicable\t", result.inapplicable);
            console.log(" passes\t\t", result.passes);
            console.log(" violations\t", result.violations);
            console.log(" incomplete\t", result.incomplete);
            console.log("---------------------------------------------");
        });
    });

});