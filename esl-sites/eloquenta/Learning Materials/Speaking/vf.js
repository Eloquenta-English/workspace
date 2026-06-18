const fs = require('fs');
const html = fs.readFileSync('fibromyalgia.html', 'utf8');
const js = html.match(/<script>([\s\S]+?)<\/script>/)[1];
fs.writeFileSync('/tmp/fibro_v.js', js);
try { new Function(js); console.log('PASS: JS valid'); } catch(e) { console.log('FAIL:', e.message); }
console.log('Slides:', (html.match(/id="slide-/g)||[]).length);
console.log('Size:', html.length);
