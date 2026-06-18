const fs = require('fs');
const html = fs.readFileSync('fibromyalgia.html', 'utf8');
const js = html.match(/<script>([\s\S]+?)<\/script>/)[1];

// Try to find the issue by checking each slide object
const slideStart = js.indexOf('var SLIDES=[');
const slideEnd = js.lastIndexOf('];', slideStart) + 2;
const slideStr = js.substring(slideStart, slideEnd);

// Try evaluating just the SLIDES array
try {
  eval(slideStr);
  console.log('SLIDES array valid');
} catch(e) {
  console.log('SLIDES error:', e.message);
  // Try each slide individually
  const slides = slideStr.match(/\{[^}]+\}/g);
  if (slides) {
    slides.forEach((s,i) => {
      try { eval('({' + s + '})'); } catch(e2) {
        console.log(`Slide ${i}: ${e2.message}`);
        console.log('  Content:', s.substring(0,100));
      }
    });
  }
}
