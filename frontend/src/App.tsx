import createWordle from "./components/Hooks/CreateWordle";
import Board from "./components/GameBoard/Board";
import Keyboard from "./components/KeyBoard/Keyboard";
import Title from "./components/TitleHud/Title";
import WinLoseModal from "./components/Modals/WinLoseModal";
import { useState, createContext, useEffect } from "react";
import fetchValidWords from "./components/Hooks/FetchWordBank";
import {
  SessionInfo,
  WordleBoardContext,
  defaultWordleBoard,
} from "./components/Interfaces/ProviderInfo";

export const AppContext = createContext<WordleBoardContext>(defaultWordleBoard);

function App() {
  // Word Bank and Answer
  const [wordSet, setWordSet] = useState<Set<string>>(
    defaultWordleBoard.wordSet
  );
  const [answer, setAnswer] = useState<string>("BOARD");

  // Enable/Disable functions toggle
  const [disableInput, setDisableInput] = useState<boolean>(false);

  // Session Info
  const [gameOutcome, setGameOutcome] = useState<string>("Incomplete");
  const [sessionStats, setSessionStats] = useState<SessionInfo>({
    gamesPlayed: 0,
    winStreak: 0,
    totalGamesWon: 0,
  });
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  const [resetGameTrigger, setResetGameTrigger] = useState<boolean>(false);

  // Game Outcome Modal
  const [winLoseModal, setWinLoseModal] = useState<boolean>(false);
  const toggleWinLoseModal = () => {
    setWinLoseModal(!winLoseModal);
  };

  // On Mount
  useEffect(() => {
    fetchValidWords().then((wordList: any) => {
      setWordSet((wordSet) => wordList);
      setAnswer(generateAnswer(wordList));
    });
  }, []);

  // Generates new Answer
  const generateAnswer = (wordList: Set<string>): string => {
    const wordBank = [...wordList];
    const randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    console.log(randomWord);
    return randomWord.toUpperCase();
  };

  const onWin = () => {
    console.log("win");
    setDisableInput(true);
    setGameComplete(true);
    setSessionStats({
      gamesPlayed: sessionStats.gamesPlayed + 1,
      winStreak: sessionStats.winStreak + 1,
      totalGamesWon: sessionStats.totalGamesWon + 1,
    });
    setGameOutcome("Win");
    setTimeout(() => {
      toggleWinLoseModal();
    }, 1500);
  };

  const onLose = () => {
    console.log("lose");
    setDisableInput(true);
    setSessionStats({
      gamesPlayed: sessionStats.gamesPlayed + 1,
      winStreak: 0,
      totalGamesWon: sessionStats.totalGamesWon,
    });
    setGameComplete(true);
    setGameOutcome("Lose");
    setTimeout(() => {
      toggleWinLoseModal();
    }, 1500);
  };

  // Creates Game State
  let {
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
  } = createWordle(answer, wordSet, onWin, onLose);

  const resetGame = () => {
    resetWordle();
    setAnswer(generateAnswer(wordSet));
    setResetGameTrigger(!resetGameTrigger);
    setDisableInput(false);
    setGameComplete(false);
    if (winLoseModal) {
      toggleWinLoseModal();
    }
  };

  return (
    <>
      <AppContext.Provider
        value={{
          board,
          attemptInfo,
          addLetterToBoard,
          eraseLetter,
          attemptGuess,
          wordSet,
          correctGuessedLetters,
          partlyCorrectGuessedLetters,
          incorrectGuessedLetters,
          answer,
          disableInput,
          setDisableInput,
          resetGameTrigger,
          validAttempt,
          setValidAttempt,
        }}
      >
        {winLoseModal && (
          <WinLoseModal
            toggle={toggleWinLoseModal}
            outcome={gameOutcome}
            sessionInfo={sessionStats}
            resetGame={resetGame}
          ></WinLoseModal>
        )}

        <Title></Title>
        <Board />
        <Keyboard />
        <div className="d-flex justify-content-center">
          {gameComplete && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetGame}
            >
              Play Again!
            </button>
          )}
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
