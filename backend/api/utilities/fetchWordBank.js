const fs = require("fs");
const path = require("path");

// const wordSet = fs
//   .readFileSync(path.join(process.cwd(), "valid-wordle-words.txt"))
//   .toString("utf-8")
//   .split("\n")
//   .map((word) => {
//     return word.trim();
//   });

module.exports = wordSet;
