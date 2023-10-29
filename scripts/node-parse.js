// Run: node node-parse.js <json-filename>

const fs = require('fs');

// Get the filename from the command line arguments
const filename = process.argv[2];

// Read the file contents
fs.readFile(filename, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Parse the JSON data
  const obj = JSON.parse(data);

  // Print the data
 let nodes = [0,0,0,0];
  console.log("----------------------------------")
  console.log("[testEngine]",obj.testEngine);
  console.log("[testRunner]",obj.testRunner);
  console.log("[testEnvironment]",obj.testEnvironment);
  console.log("----------------------------------")
  console.log("[toolOptions.reporter]",obj.toolOptions.reporter);
  console.log("[toolOptions.runOnly.type]",obj.toolOptions.runOnly.type);
  console.log("[toolOptions.runOnly.values.length]",obj.toolOptions.runOnly.values.length);

  nodes = [0,0,0,0];
  console.log("----------------------------------")
  console.log("[inapplicable]",obj.inapplicable.length,"rules don't apply");
  for (const rule of obj.inapplicable) {
    console.log(" ",rule.id,"=",rule.nodes.length);
    nodes[0]+=rule.nodes.length;
  }
  console.log("----------------------------------")
  console.log("[passes]",obj.passes.length,"rules");
  for (const rule of obj.passes) {
    console.log(" ",rule.id,"=",rule.nodes.length);
    nodes[1]+=rule.nodes.length;
  }
  console.log("----------------------------------")
  console.log("[violations]",obj.violations.length,"rules");
  for (const rule of obj.violations) {
    console.log(" ",rule.id,"=",rule.nodes.length);
    nodes[2]+=rule.nodes.length;
  }
  console.log("----------------------------------")
  console.log("[incomplete]",obj.incomplete.length,"rules");
  for (const rule of obj.incomplete) {
    console.log(" ",rule.id,"=",rule.nodes.length);
    nodes[3]+=rule.nodes.length;
  }
  console.log("----------------------------------")
  console.log("[url] ",obj.url);
  console.log("[timestamp]", obj.timestamp);
  console.log("[evaluated]", (nodes[0]+nodes[1]+nodes[2]+nodes[3])," elements");
  console.log(" ",nodes[0],"\tinapplicable");
  console.log(" ",nodes[1],"\tpasses");
  console.log(" ",nodes[2],"\tviolations");
  console.log(" ",nodes[3],"\tincomplete");
  console.log("----------------------------------")
});

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




// Run: node node-parse.js data.json
//  node node-parse.js ../data/playwright/a11y-yammer-pass.json