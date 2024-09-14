const fs = require("fs");
const path = require("path");

const wordSet = fs
  .readFileSync(path.resolve("/assets/valid-wordle-words.txt"), "utf8")
  .toString("utf-8")
  .split("\n")
  .map((word) => {
    return word.trim();
  });

module.exports = wordSet;
