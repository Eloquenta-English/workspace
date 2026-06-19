const fs = require('fs');
const dir = "C:\\Users\\irieb\\Documents\\William's Projects\\workspace\\esl-materials\\Sliding In Images";
const files = fs.readdirSync(dir);
console.log("Image files found:", files.length);
files.slice(0, 10).forEach(f => console.log(" ", f));
