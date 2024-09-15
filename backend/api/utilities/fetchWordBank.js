var fs = require("fs");
var path = require("path");
var image = require("../../public/test.jfif");

const wordSet = fs
  .readFileSync(
    path.join(process.cwd(), "backend/public/valid-wordle-words.txt")
  )
  .toString("utf-8")
  .split("\n")
  .map((word) => {
    return word.trim();
  });

console.log(process.cwd());

module.exports = wordSet;
