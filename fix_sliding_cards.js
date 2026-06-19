const fs = require('fs');
const path = require('path');
const workspace = "C:\\Users\\irieb\\Documents\\William's Projects\\workspace";

const files = [
  "esl-materials/Sliding In 3/index.html",
  "esl-materials/Sliding In 4/index.html",
];

const oldCode = `  var mappingLookup = {};
  try { mappingData.forEach(function(item){ mappingLookup[item.id] = item.url; }); } catch(e) {}`;

const newCode = `  var mappingLookup = {};
  // Use local cover images first (reliable, no network needed)
  try {
    if(typeof coverImageMap !== 'undefined'){
      Object.keys(coverImageMap).forEach(function(slug){
        mappingLookup[slug] = coverImageMap[slug];
      });
    }
  } catch(e) {}
  // Then overlay online images if available (higher quality but needs network)
  try {
    if(mappingData && mappingData.length > 0){
      mappingData.forEach(function(item){
        if(item.id && item.url) mappingLookup[item.id] = item.url;
      });
    }
  } catch(e) {}
  // Also overlay localImageMap from sliding-in-image-map.js
  try {
    if(typeof localImageMap !== 'undefined'){
      Object.keys(localImageMap).forEach(function(slug){
        if(localImageMap[slug] && localImageMap[slug]['0']){
          mappingLookup[slug] = localImageMap[slug]['0'];
        }
      });
    }
  } catch(e) {}`;

let done = 0;
for (const f of files) {
  const full = path.join(workspace, f);
  if (!fs.existsSync(full)) { console.log("NOT FOUND: " + f); continue; }
  const content = fs.readFileSync(full, "utf8");
  if (!content.includes(oldCode)) { console.log("ALREADY FIXED: " + f); continue; }
  const updated = content.replace(oldCode, newCode);
  fs.writeFileSync(full, updated);
  done++;
  console.log("FIXED: " + f);
}
console.log("\nDone: " + done);
