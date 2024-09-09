export type AttemptInfo = {
  attemptNumber: number;
  currentLetter: number;
};

export type SessionInfo = {
  gamesPlayed: number;
  winStreak: number;
  totalGamesWon: number;
};

export interface WordleBoardContext {
  board: string[][];
  attemptInfo: AttemptInfo;
  validAttempt: boolean;
  setValidAttempt: (attempt: boolean) => void;
  addLetterToBoard: (keyValue: string) => void;
  eraseLetter: () => void;
  attemptGuess: () => void;
  wordSet: Set<string>;
  correctGuessedLetters: Set<string>;
  partlyCorrectGuessedLetters: Set<string>;
  incorrectGuessedLetters: Set<string>;
  answer: string;
  disableInput: boolean;
  setDisableInput: (toggle: boolean) => void;
  resetGameTrigger: boolean;
}

export const defaultWordleBoard = {
  board: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],
  setBoard: () => {},
  attemptInfo: {
    attemptNumber: 0,
    currentLetter: 0,
  },
  validAttempt: true,
  setValidAttempt: () => {},
  addLetterToBoard: () => {},
  eraseLetter: () => {},
  attemptGuess: () => {},
  wordSet: new Set([]),
  correctGuessedLetters: new Set([]),
  partlyCorrectGuessedLetters: new Set([]),
  incorrectGuessedLetters: new Set([]),
  answer: "BOARD",
  disableInput: false,
  setDisableInput: () => {},
  resetGameTrigger: false,
};
