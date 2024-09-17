import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../EndlessMode/EndlessWordle";
import React from "react";

interface Props {
  keyValue: string;
  isBig: boolean;
}

function Key(props: Props) {
  const {
    addLetterToBoard,
    eraseLetter,
    attemptGuess,
    correctGuessedLetters,
    partlyCorrectGuessedLetters,
    incorrectGuessedLetters,
    disableInput,
  } = useContext(AppContext);

  const guessState = correctGuessedLetters.has(props.keyValue)
    ? "correct-key"
    : partlyCorrectGuessedLetters.has(props.keyValue)
    ? "partlyCorrect-key"
    : incorrectGuessedLetters.has(props.keyValue)
    ? "incorrect-key"
    : "Unattempted";

  const selectLetter = () => {
    if (disableInput === false) {
      if (props.keyValue === "ENTER") {
        attemptGuess();
      } else if (props.keyValue === "DELETE") {
        eraseLetter();
      } else {
        addLetterToBoard(props.keyValue);
      }

      const currentKey = document.getElementById(
        `keyboard-button-${props.keyValue}`
      );
      currentKey?.classList.add("bounce");
      currentKey?.addEventListener("animationend", () => {
        currentKey?.classList.remove("bounce");
      });
    }
  };

  return (
    <>
      {props.isBig ? (
        <div
          className="big-key"
          onClick={selectLetter}
          id={`keyboard-button-${props.keyValue}`}
        >
          {props.keyValue === "ENTER" ? (
            <i className="bi bi-arrow-return-right"></i>
          ) : (
            <i className="bi bi-backspace-fill"></i>
          )}
        </div>
      ) : (
        <div
          className={`key ${guessState}`}
          onClick={selectLetter}
          id={`keyboard-button-${props.keyValue}`}
        >
          {props.keyValue}
        </div>
      )}
    </>
  );
}

export default Key;
