const fs = require('fs');
const { runValorantEsolang } = require('./valorant-esolang.js');

const filename = process.argv[2];
if (!filename) {
  console.error('Please provide a .val file to run');
  process.exit(1);
}

const code = fs.readFileSync(filename, 'utf8');
runValorantEsolang(code);