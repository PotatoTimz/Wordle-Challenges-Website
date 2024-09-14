var fs = require("fs");

const wordSet = fs
  .readFileSync("./utilities/valid-wordle-words.txt")
  .toString("utf-8")
  .split("\n")
  .map((word) => {
    return word.trim();
  });

module.exports = wordSet;
