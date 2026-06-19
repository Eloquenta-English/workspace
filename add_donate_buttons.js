const DONATE_HTML = `<!-- Donate Section — inconspicuous, bottom of page -->
<div id="donate-bar" style="text-align:center;padding:12px 0 8px;font-size:11px;color:rgba(255,255,255,0.35);letter-spacing:0.5px;border-top:1px solid rgba(255,255,255,0.06);margin-top:auto">
  <span style="margin-right:10px">Support this project</span>
  <a href="https://paypal.me/williamgraythomason" target="_blank" rel="noopener" style="display:inline-block;background:#0070ba;color:#fff;padding:4px 12px;border-radius:4px;text-decoration:none;font-weight:600;font-size:11px;margin:0 4px">PayPal</a>
  <a href="https://wise.com/payme/williamgraythomason" target="_blank" rel="noopener" style="display:inline-block;background:#9fe870;color:#163300;padding:4px 12px;border-radius:4px;text-decoration:none;font-weight:600;font-size:11px;margin:0 4px">Wise</a>
</div>`;

const DONATE_LIGHT = `<!-- Donate Section — inconspicuous, bottom of page -->
<div id="donate-bar" style="text-align:center;padding:12px 0 8px;font-size:11px;color:rgba(0,0,0,0.35);letter-spacing:0.5px;border-top:1px solid rgba(0,0,0,0.08);margin-top:auto">
  <span style="margin-right:10px">Support this project</span>
  <a href="https://paypal.me/williamgraythomason" target="_blank" rel="noopener" style="display:inline-block;background:#0070ba;color:#fff;padding:4px 12px;border-radius:4px;text-decoration:none;font-weight:600;font-size:11px;margin:0 4px">PayPal</a>
  <a href="https://wise.com/payme/williamgraythomason" target="_blank" rel="noopener" style="display:inline-block;background:#9fe870;color:#163300;padding:4px 12px;border-radius:4px;text-decoration:none;font-weight:600;font-size:11px;margin:0 4px">Wise</a>
</div>`;

const fs = require('fs');
const path = require('path');

const workspace = "C:\\Users\\irieb\\Documents\\William's Projects\\workspace";

const files = [
  "esl-sites/eloquenta/landing.html",
  "esl-sites/eloquenta/Learning Materials/Speaking/food-drink-speaking.html",
  "esl-sites/eloquenta/Learning Materials/Speaking/education-speaking.html",
  "esl-sites/eloquenta/Learning Materials/Speaking/business-english-debates.html",
  "esl-sites/eloquenta/Learning Materials/Speaking/conversation-questions.html",
  "esl-sites/eloquenta/Learning Materials/Speaking/lifestyle-speaking.html",
  "esl-sites/eloquenta/Learning Materials/Speaking/travel-speaking.html",
  "esl-sites/eloquenta/Learning Materials/Speaking/business-finance-speaking.html",
  "esl-sites/eloquenta/Learning Materials/Speaking/natural-world-speaking.html",
  "esl-sites/eloquenta/Learning Materials/degrees-of-likelihood.html",
  "esl-sites/eloquenta/Learning Materials/speaking-practice-slideshows.html",
  "esl-sites/eloquenta/Curriculum/education-speaking.html",
  "esl-sites/eloquenta/Curriculum/ielts-writing-band-criteria.html",
  "esl-sites/eloquenta/Curriculum/ielts-speaking-band-criteria.html",
  "esl-sites/eloquenta/Curriculum/speaking-assessment.html",
  "esl-sites/eloquenta/Business & Pitch/pitch-deck.html",
  "esl-sites/eloquenta/Teacher Student Classroom/video-classroom.html",
  "esl-sites/eloquenta/Teacher Student Classroom/index.html",
  "esl-sites/eloquenta/Eloquenta Video Call/index.html",
  "esl-sites/eloquenta/recruit/index.html",
  "esl-sites/eloquenta/Linguatron/index.html",
  "esl-sites/eloquenta/Extras/landing.html",
  "esl-sites/william-thomason-english/video-call/index.html",
  "esl-sites/william-thomason-english/Speaking/speaking-practice-slideshows.html",
  "audio-apps/alien-metronome/signal-tester.html",
  "audio-apps/ocean-scales/ocean-scales.html",
  "life-apps/akasha-qi-gong/qi-gong-workout.html",
  "life-apps/akasha-qi-gong/test-qi-gong.html",
  "life-apps/akasha-qi-gong/tester.html",
  "life-apps/akasha-qi-gong/puter-tts-test.html",
  "games/oobzoo/logo.html",
  "planning-productivity/hermes-window-manager/index.html",
  "planning-productivity/agentic-os/travel-deck.html",
  "planning-productivity/agentic-os/skater-dino.html",
  "planning-productivity/agentic-os/test-bands.html",
  "planning-productivity/agentic-os/design-mockups/agent-config.html",
  "art/crop-circles/index.html",
  "art/chromaskin/widget.html",
  "art/music-by-humans/index.html",
  "growing/health-diabetes-anandamide/index.html",
  "esl-materials/Sliding In 1/index.html",
  "esl-materials/Sliding In 2/index.html",
  "esl-materials/Sliding In 3/index.html",
  "esl-materials/Sliding In 4/index.html",
];

let done = 0, skipped = 0, errors = 0;

for (const f of files) {
  const full = path.join(workspace, f);
  if (!fs.existsSync(full)) { skipped++; continue; }
  const content = fs.readFileSync(full, "utf8");
  if (content.includes('id="donate-bar"')) { skipped++; continue; }
  if (!content.includes("</body>")) { skipped++; continue; }

  const isLight = content.includes("background:#f7f8f8") ||
                  content.includes("background:#fff") ||
                  content.includes("--bg:#f7f8f8") ||
                  content.includes('data-theme="light"');

  const donateHtml = isLight ? DONATE_LIGHT : DONATE_HTML;
  const updated = content.replace("</body>", donateHtml + "\n</body>");
  fs.writeFileSync(full, updated);
  done++;
  console.log("OK: " + f);
}

console.log("\nDone: " + done + " | Skipped: " + skipped + " | Errors: " + errors);
