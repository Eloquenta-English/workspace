const DONATE_DARK = `<!-- Donate Section — inconspicuous, bottom of page -->
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

const fs = require("fs");
const path = require("path");
const workspace = "C:\\Users\\irieb\\Documents\\William's Projects\\workspace";

// Remaining non-backup files that need donate bar
const files = [
  "esl-materials/Sliding In.html",
  "esl-materials/forest-friends/Forest Friends/index.html",
  "esl-materials/forest-friends/Forest Friends/Irregular Verbs Lesson/index.html",
  "esl-materials/forest-friends/Forest Friends/lesson-daily-routine.html",
  "esl-materials/forest-friends/forest-home.html",
  "esl-materials/forest-friends/past-simple-quiz.html",
  "esl-materials/language-widget/index.html",
  "esl-materials/past-simple-masterclass/index.html",
  "esl-materials/wte-curriculum/placement-test.html",
  "esl-sites/eloquenta/Business & Pitch/esl-brand-strategy.html",
  "esl-sites/eloquenta/Business & Pitch/esl-business-gantt.html",
  "esl-sites/eloquenta/Business & Pitch/esl-business-phase1.html",
  "esl-sites/eloquenta/Business/esl-business-gantt.html",
  "esl-sites/eloquenta/Curriculum/eloquent-curriculum.html",
  "esl-sites/eloquenta/Curriculum/translation-workflow-design.html",
  "esl-sites/eloquenta/Extras/cal-com-bio.html",
  "esl-sites/eloquenta/Extras/dashboard.html",
  "esl-sites/eloquenta/Extras/login.html",
  "esl-sites/eloquenta/Extras/slide-maker.html",
  "esl-sites/eloquenta/Extras/teacher-studio.html",
  "esl-sites/eloquenta/Extras/video-lesson-builder.html",
  "esl-sites/eloquenta/Learning Materials/Accent/japanese-accent-reduction.html",
  "esl-sites/eloquenta/Learning Materials/Accent/student-accent-guide.html",
  "esl-sites/eloquenta/Learning Materials/Accent/understanding-accents.html",
  "esl-sites/eloquenta/Learning Materials/Speaking/FCEFS_B2_Exam_Simulator.html",
  "esl-sites/eloquenta/Learning Materials/Speaking/business-debate-phrases.html",
  "esl-sites/eloquenta/Learning Materials/Speaking/business-english-estonia.html",
  "esl-sites/eloquenta/Learning Materials/Speaking/conversation-questions-eloquenta.html",
  "esl-sites/eloquenta/Learning Materials/Speaking/fibromyalgia.html",
  "esl-sites/eloquenta/Learning Materials/Speaking/lifestyle-speaking-wte.html",
  "esl-sites/eloquenta/Learning Materials/business-english-debates.html",
  "esl-sites/eloquenta/Learning Materials/speaking-lessons.html",
  "esl-sites/eloquenta/Learning Materials/spell-boss.html",
  "esl-sites/eloquenta/Teacher Student Classroom/business-speaking-course.html",
  "esl-sites/eloquenta/Teacher Student Classroom/extra/Listening-Exercise/index.html",
  "esl-sites/eloquenta/Teacher Student Classroom/extra/Reading-Practice/index.html",
  "esl-sites/eloquenta/Teacher Student Classroom/extra/Video-Classroom/index.html",
  "esl-sites/eloquenta/Teacher Student Classroom/extra/Whiteboard/index.html",
  "esl-sites/eloquenta/Teacher Student Classroom/listening-exercise.html",
  "esl-sites/eloquenta/Teacher Student Classroom/progress-tracker.html",
  "esl-sites/eloquenta/Teacher Student Classroom/reading-practice.html",
  "esl-sites/eloquenta/Teacher Student Classroom/screen-share.html",
  "esl-sites/eloquenta/Teacher Student Classroom/speaking-practice.html",
  "esl-sites/eloquenta/Teacher Student Classroom/teacher-training.html",
  "esl-sites/eloquenta/Teacher Student Classroom/typing-race.html",
  "esl-sites/eloquenta/Teacher Student Classroom/vocab-quiz.html",
  "esl-sites/eloquenta/Teacher Student Classroom/whiteboard.html",
  "esl-sites/eloquenta/recruit/admin.html",
  "esl-sites/eloquenta/recruit/apply.html",
  "esl-sites/william-thomason-english/Sample Lessons/business-debate-phrases.html",
  "esl-sites/william-thomason-english/Speaking/b2-first-schools-speaking.html",
  "esl-sites/william-thomason-english/Speaking/ielts-speaking-practice.html",
  "esl-sites/william-thomason-english/Syllabus 2025.2026.html",
  "esl-sites/william-thomason-english/WTE/advice-speaking.html",
  "esl-sites/william-thomason-english/conversation-questions-wte.html",
  "esl-sites/william-thomason-english/image-manager.html",
  "esl-sites/william-thomason-english/speaking-lessons/business-debate-phrases-wte.html",
  "esl-sites/william-thomason-english/video-call/test.html",
  "esl-sites/william-thomason-english/wte-online/admin/coupons.html",
  "esl-sites/william-thomason-english/wte-online/public/join.html",
  "esl-sites/william-thomason-english/wte-online/public/thank-you.html",
  "life-apps/akasha-qi-gong/qi-gong-workout-test.html",
  "planning-productivity/agentic-os/design-mockups/dashboard.html",
  "planning-productivity/hermes-dashboard/test-suite.html",
  "audio-apps/resonance-daw/index.html",
  "planning-productivity/hermes-window-manager/electron-app/renderer/index.html",
];

let done = 0, skipped = 0;

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

  const donateHtml = isLight ? DONATE_LIGHT : DONATE_DARK;
  const updated = content.replace("</body>", donateHtml + "\n</body>");
  fs.writeFileSync(full, updated);
  done++;
  console.log("OK: " + f);
}

console.log("\nDone: " + done + " | Skipped: " + skipped);
