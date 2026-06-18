const fs = require('fs');
const html = fs.readFileSync('fibromyalgia.html', 'utf8');
const js = html.match(/<script>([\s\S]+?)<\/script>/)[1];
try {
  new Function(js);
  console.log('PASS: JS valid');
} catch(e) {
  console.log('FAIL:', e.message);
}
