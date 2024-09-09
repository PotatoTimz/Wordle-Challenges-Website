import { useEffect, useState } from "react";
import { defaultWordleBoard } from "../../WordleGame/Interfaces/ProviderInfo";
import fetchValidWords from "../../WordleGame/Hooks/FetchWordBank";
import createWordle from "../../WordleGame/Hooks/CreateWordle";
import { AppContext } from "../../EndlessMode/EndlessWordle";
import Board from "../../WordleGame/GameBoard/Board";
import Keyboard from "../../WordleGame/KeyBoard/Keyboard";

interface Props {
  progression: number;
  answerList: Array<string>;
  completeLevel: () => void;
  failChallenge: () => void;
}

function Game(props: Props) {
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
    console.log(props.answerList[props.progression].toUpperCase());
    setAnswer(props.answerList[props.progression].toUpperCase());
  }, [props]);

  const onWin = () => {
    console.log("win");
    props.completeLevel();
    resetWordle();
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
