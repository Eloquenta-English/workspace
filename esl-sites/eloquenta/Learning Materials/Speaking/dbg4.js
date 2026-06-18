const fs = require('fs');
const html = fs.readFileSync('fibromyalgia.html', 'utf8');
const js = html.match(/<script>([\s\S]+?)<\/script>/)[1];
const lines = js.split('\n');
// Show lines 50-60 with character codes
for (let i = 50; i < 60; i++) {
  const line = lines[i];
  console.log(`Line ${i+1}: ${line.substring(0, 80)}`);
  // Check for non-ASCII chars
  for (let j = 0; j < line.length; j++) {
    const code = line.charCodeAt(j);
    if (code > 127) {
      console.log(`  Non-ASCII at pos ${j}: U+${code.toString(16).padStart(4,'0')} (${line[j]})`);
    }
  }
}
