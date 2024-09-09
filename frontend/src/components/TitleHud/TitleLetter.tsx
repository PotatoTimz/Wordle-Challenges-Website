import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";

interface Props {
  letter: string;
  index: number;
}

function TitleLetter(props: Props) {
  const {
    correctGuessedLetters,
    partlyCorrectGuessedLetters,
    incorrectGuessedLetters,
    attemptInfo,
    resetGameTrigger,
  } = useContext(AppContext);

  const defaultStyle = {
    backgroundImage: "linear-gradient(black, black)",
    backgroundClip: "text",
    color: "transparent",
  };

  const [letterStyle, setLetterStyle] = useState<Object>(defaultStyle);

  useEffect(() => {
    setLetterStyle(defaultStyle);
  }, [resetGameTrigger]);

  useEffect(() => {
    if (attemptInfo.attemptNumber - 1 !== props.index) return;
    const totalGuessed =
      correctGuessedLetters.size +
      partlyCorrectGuessedLetters.size +
      incorrectGuessedLetters.size;
    const corrGuessPerc = (correctGuessedLetters.size / totalGuessed) * 100;
    const partlyGuessPerc =
      (partlyCorrectGuessedLetters.size / totalGuessed) * 100;
    const incGuessPerc = (incorrectGuessedLetters.size / totalGuessed) * 100;

    let colorSplit: string[] = [];
    if (corrGuessPerc > 0) colorSplit.push(`#6aaa64 ${corrGuessPerc}%`);
    if (partlyGuessPerc > 0) colorSplit.push(`#c9b458 ${partlyGuessPerc}%`);
    if (incGuessPerc > 0) colorSplit.push(`black ${incGuessPerc}%`);

    setLetterStyle(
      colorSplit.length !== 1
        ? {
            backgroundImage: `linear-gradient(90deg, ${colorSplit.join(", ")})`,
            backgroundClip: "text",
            color: "transparent",
          }
        : {
            backgroundImage: `linear-gradient(90deg, ${colorSplit.join(
              ", "
            )}, ${colorSplit.join(", ")})`,
            backgroundClip: "text",
            color: "transparent",
          }
    );

    const letterElement = document.getElementById(
      `title-${props.letter}-${props.index}`
    );
    letterElement?.classList.add("title-flip-letter");
    letterElement?.addEventListener("animationend", () => {
      letterElement?.classList.remove("title-flip-letter");
    });
  }, [attemptInfo.attemptNumber]);

  return (
    <div id={`title-${props.letter}-${props.index}`} style={letterStyle}>
      {props.letter}
    </div>
  );
}

export default TitleLetter;
