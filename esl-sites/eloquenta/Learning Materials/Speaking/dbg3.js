const fs = require('fs');
const html = fs.readFileSync('fibromyalgia.html', 'utf8');
const js = html.match(/<script>([\s\S]+?)<\/script>/)[1];

// Write to temp and use node --check
fs.writeFileSync('/tmp/fibro_check.js', js);
const {execSync} = require('child_process');
try {
  execSync('node --check /tmp/fibro_check.js', {encoding:'utf8'});
  console.log('PASS');
} catch(e) {
  console.log(e.stdout);
  console.log(e.stderr);
}
