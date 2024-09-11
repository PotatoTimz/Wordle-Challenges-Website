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
  reset: boolean;
  toggleLevelCompleteModal: () => void;
  toggleGameOverModal: () => void;
  toggleChallangeCompleteModal: () => void;
}

function Game(props: Props) {
  const { challengeData, challengeProgression } = useContext(ChallengeContext);

  // Word Bank and Answer
  const [wordSet, setWordSet] = useState<Set<string>>(
    defaultWordleBoard.wordSet
  );
  const [answer, setAnswer] = useState<string>("BOARD");

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

  useEffect(() => {
    console.log("reset");
    resetWordle();
    setDisableInput(false);
  }, [props.reset]);

  const onWin = () => {
    console.log("win");
    setDisableInput(true);
    if (challengeProgression < challengeData.words.length - 1) {
      setTimeout(() => {
        props.toggleLevelCompleteModal();
      }, 1500);
    } else {
      setTimeout(() => {
        props.toggleChallangeCompleteModal();
      }, 1500);
      console.log("complete challenge");
    }
  };

  const onLose = () => {
    console.log("lose");
    setDisableInput(true);
    setTimeout(() => {
      props.toggleGameOverModal();
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
          validAttempt,
          setValidAttempt,
        }}
      >
        <Board />
        <Keyboard />
      </AppContext.Provider>
    </>
  );
}

export default Game;
