const fs = require('fs');
const html = fs.readFileSync('fibromyalgia.html', 'utf8');
const js = html.match(/<script>([\s\S]+?)<\/script>/)[1];
const lines = js.split('\n');
try { new Function(js); } catch(e) {
  console.log(e.message);
  const m = e.message.match(/line (\d+)/);
  if (m) {
    const n = parseInt(m[1]);
    for (let i = Math.max(0,n-5); i < Math.min(lines.length,n+5); i++) {
      console.log(`${i+1}: ${lines[i]}`);
    }
  }
}
