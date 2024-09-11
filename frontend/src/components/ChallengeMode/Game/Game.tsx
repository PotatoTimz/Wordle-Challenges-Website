import { createContext, useContext, useEffect, useState } from "react";
import {
  defaultWordleBoard,
  WordleBoardContext,
} from "../../WordleGame/Interfaces/ProviderInfo";
import fetchValidWords from "../../WordleGame/Hooks/FetchWordBank";
import createWordle from "../../WordleGame/Hooks/CreateWordle";
import Board from "../../WordleGame/GameBoard/Board";
import Keyboard from "../../WordleGame/KeyBoard/Keyboard";
import { AppContext } from "../../EndlessMode/EndlessWordle";
import { ChallengeContext } from "../ChallengeWordle";

interface Props {
  toggleLevelCompleteModal: () => void;
  failChallenge: () => void;
}

function Game(props: Props) {
  const { challengeData, challengeProgression } = useContext(ChallengeContext);

  // Word Bank and Answer
  const [wordSet, setWordSet] = useState<Set<string>>(
    defaultWordleBoard.wordSet
  );
  const [answer, setAnswer] = useState<string>("BOARD");

  // Session Info
  const [resetGameTrigger, setResetGameTrigger] = useState<boolean>(false);

  // Enable/Disable functions toggle
  const [disableInput, setDisableInput] = useState<boolean>(false);

  // On Mount
  useEffect(() => {
    fetchValidWords().then((wordList: any) => {
      setWordSet((wordSet) => wordList);
    });
    console.log(challengeData.words[challengeProgression].toUpperCase());
    setAnswer(challengeData.words[challengeProgression].toUpperCase());
  }, [props]);

  const onWin = () => {
    console.log("win");
    setTimeout(() => {
      props.toggleLevelCompleteModal();
      resetWordle();
    }, 2000);
  };

  const onLose = () => {
    console.log("lose");
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
        <Board />
        <Keyboard />
        {/* <div className="d-flex justify-content-center">
          {gameComplete && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetGame}
            >
              Play Again!
            </button>
          )}
        </div> */}
      </AppContext.Provider>
    </>
  );
}

export default Game;
