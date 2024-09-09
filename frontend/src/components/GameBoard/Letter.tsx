import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";

interface Props {
  letterPos: number;
  attemptVal: number;
}

function Letter(props: Props) {
  const { board, answer, attemptInfo } = useContext(AppContext);
  const letter = board[props.attemptVal][props.letterPos];
  const letterId =
    attemptInfo.attemptNumber > props.attemptVal
      ? answer[props.letterPos] === letter
        ? "correct-letter"
        : answer.includes(letter) && letter != ""
        ? "partlyCorrect-letter"
        : "incorrect-letter"
      : "no-attempt-letter";

  // When the letter in the board is inputed than give the board position a shake animation
  useEffect(() => {
    const currentLetter = document.getElementById(
      `board-${props.attemptVal}-${props.letterPos}`
    );

    // Do not make the bounce animation on backspaces
    if (board[props.attemptVal][props.letterPos] === "") {
      currentLetter?.classList.remove("current-attempt");
      return;
    }

    currentLetter?.classList.add("bounce");
    currentLetter?.addEventListener("animationend", () => {
      currentLetter?.classList.remove("bounce");
    });
    currentLetter?.classList.add("current-attempt");
  }, [board[props.attemptVal][props.letterPos]]);

  return (
    <div
      className={`
        ${letterId}
        boardcol-${props.letterPos} 
      `}
      id={`board-${props.attemptVal}-${props.letterPos}`}
      style={{ animationDelay: `(0.2s * ${props.letterPos})` }}
    >
      {letter}
    </div>
  );
}

export default Letter;
