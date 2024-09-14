var fs = require("fs");

const wordSet = fs
  .readFileSync("${__dirname}/assets/valid-wordle-words.txt")
  .toString("utf-8")
  .split("\n")
  .map((word) => {
    return word.trim();
  });

module.exports = wordSet;
