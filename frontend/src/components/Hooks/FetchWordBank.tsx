import wordBank from "../../assets/valid-wordle-words.txt";

const fetchValidWords = async () => {
  let wordSet;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((wordBank) => {
      let words = wordBank.split("\n");
      words = words.map((word) => {
        return word.trim();
      });
      wordSet = new Set(words);
    });

  return wordSet;
};

export default fetchValidWords;
