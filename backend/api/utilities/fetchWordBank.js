var fs = require("fs");
var path = require("path");

//console.log();

const wordSet = fs
  .readFileSync(path.join(process.cwd(), "assets", "valid-wordle-words.txt"))
  .toString("utf-8")
  .split("\n")
  .map((word) => {
    return word.trim();
  });

module.exports = wordSet;
