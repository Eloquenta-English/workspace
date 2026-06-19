// Render a screenshot of the first frame and save it as a data URL
const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 960, height: 540 });
  
  const filePath = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  
  // Wait for first frame
  await new Promise(r => setTimeout(r, 500));
  
  const screenshot = await page.screenshot({ type: 'png' });
  require('fs').writeFileSync(path.resolve(__dirname, 'splash.png'), screenshot);
  console.log('Screenshot saved: splash.png (' + screenshot.length + ' bytes)');
  
  await browser.close();
})();
