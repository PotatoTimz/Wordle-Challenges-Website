var fs = require("fs");
var path = require("path");

const wordSet = fs
  .readFileSync(path.join(process.cwd(), "assets/valid-wordle-words.txt"))
  .toString("utf-8")
  .split("\n")
  .map((word) => {
    return word.trim();
  });

console.log(process.cwd());

module.exports = wordSet;
