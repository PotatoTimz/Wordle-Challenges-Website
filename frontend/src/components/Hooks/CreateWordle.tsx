import { useState } from "react";
import { AttemptInfo, defaultWordleBoard } from "../Interfaces/ProviderInfo";

const createWordle = (
  answer: string,
  wordSet: Set<string>,
  onWin: () => void,
  onLose: () => void
) => {
  // Board Management
  const [board, setBoard] = useState<string[][]>(defaultWordleBoard.board);
  const [attemptInfo, setAttemptInfo] = useState<AttemptInfo>(
    defaultWordleBoard.attemptInfo
  );

  // Letter Management
  const [correctGuessedLetters, setCorrectGuessedLetters] = useState<
    Set<string>
  >(defaultWordleBoard.correctGuessedLetters);
  const [partlyCorrectGuessedLetters, setPartlyGuessedLetters] = useState<
    Set<string>
  >(defaultWordleBoard.partlyCorrectGuessedLetters);
  const [incorrectGuessedLetters, setIncorrectionLetters] = useState<
    Set<string>
  >(defaultWordleBoard.incorrectGuessedLetters);

  // Game Status
  const [validAttempt, setValidAttempt] = useState<boolean>(true);

  // Player clicks on a letter
  const addLetterToBoard = (keyValue: string) => {
    if (attemptInfo.currentLetter > 4) return;

    let newBoard = [...board];
    newBoard[attemptInfo.attemptNumber][attemptInfo.currentLetter] = keyValue;
    setBoard(newBoard);
    setAttemptInfo({
      attemptNumber: attemptInfo.attemptNumber,
      currentLetter: attemptInfo.currentLetter + 1,
    });
  };

  // Player clicks on back space
  const eraseLetter = () => {
    if (attemptInfo.currentLetter === 0) return;

    let newBoard = [...board];
    newBoard[attemptInfo.attemptNumber][attemptInfo.currentLetter - 1] = "";
    setBoard(newBoard);
    setAttemptInfo({
      attemptNumber: attemptInfo.attemptNumber,
      currentLetter: attemptInfo.currentLetter - 1,
    });
  };

  // On Guess Attempt
  const attemptGuess = () => {
    // Checks if a valid amoutn of letters has been inputted
    if (attemptInfo.currentLetter !== 5) {
      setValidAttempt(false);
      return;
    }

    // Goes through each letter to check it's correctness and combines the letters to form the guessed word
    let currentAttempt = "";
    let corrAtt = new Set<string>([]);
    let partCorrAtt = new Set<string>([]);
    let incCorrAtt = new Set<string>([]);
    for (let i = 0; i < 5; i++) {
      const attemptedLetter = board[attemptInfo.attemptNumber][i];
      if (attemptedLetter === answer[i]) {
        corrAtt.add(attemptedLetter);
      } else if (answer.includes(attemptedLetter)) {
        partCorrAtt.add(attemptedLetter);
      } else {
        incCorrAtt.add(attemptedLetter);
      }

      currentAttempt += attemptedLetter;
    }

    // If the word is VALID but INCORRECT
    if (wordSet.has(currentAttempt.toLowerCase())) {
      // Update Correctness Sets
      setCorrectGuessedLetters(new Set([...corrAtt, ...correctGuessedLetters]));
      setPartlyGuessedLetters(
        new Set([...partCorrAtt, ...partlyCorrectGuessedLetters])
      );
      setIncorrectionLetters(
        new Set([...incCorrAtt, ...incorrectGuessedLetters])
      );

      // Update the current Attempt info
      setAttemptInfo({
        attemptNumber: attemptInfo.attemptNumber + 1,
        currentLetter: 0,
      });

      // Final Guess was wrong
      if (attemptInfo.attemptNumber === 5) {
        console.log("lose");
        onLose();
      }
    }

    // If word is INVALID
    else {
      setValidAttempt(false);
    }

    // If word is VALID and CORRECT
    if (currentAttempt === answer) {
      console.log("win");
      onWin();
    }
  };

  // resetGame
  const resetWordle = () => {
    setBoard([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setCorrectGuessedLetters(new Set([]));
    setPartlyGuessedLetters(new Set([]));
    setIncorrectionLetters(new Set([]));
    setAttemptInfo(defaultWordleBoard.attemptInfo);
  };

  return {
    board,
    attemptInfo,
    correctGuessedLetters,
    partlyCorrectGuessedLetters,
    incorrectGuessedLetters,
    validAttempt,
    setValidAttempt,
    addLetterToBoard,
    eraseLetter,
    attemptGuess,
    resetWordle,
  };
};

export default createWordle;
