import Key from "./Key";
import { useCallback, useContext, useEffect } from "react";
import { AppContext } from "../../App";

function Keyboard() {
  const { addLetterToBoard, eraseLetter, attemptGuess, disableInput } =
    useContext(AppContext);

  const keysRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keysRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keysRow3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const keyboardClick = useCallback(
    (event: KeyboardEvent) => {
      if (disableInput === false) {
        if (event.key === "Enter") {
          attemptGuess();
        } else if (event.key === "Backspace") {
          eraseLetter();
        } else {
          const acceptableCharacter = /^[a-zA-Z]$/;
          if (acceptableCharacter.test(event.key)) {
            addLetterToBoard(event.key.toUpperCase());
          }
        }
      }
    },
    [attemptGuess, eraseLetter, addLetterToBoard]
  );
  useEffect(() => {
    document.addEventListener("keydown", keyboardClick);

    return () => {
      document.removeEventListener("keydown", keyboardClick);
    };
  }, [keyboardClick]);

  return (
    <>
      <div id="keyboard">
        <div className="keyboard-row">
          {keysRow1.map((char, index) => {
            return <Key key={char} isBig={false} keyValue={char} />;
          })}
        </div>

        <div className="keyboard-row">
          {keysRow2.map((char, index) => {
            return <Key key={char} isBig={false} keyValue={char} />;
          })}
        </div>

        <div className="keyboard-row">
          <Key key={"ENTER"} isBig={true} keyValue={"ENTER"} />
          {keysRow3.map((char, index) => {
            return <Key key={char} isBig={false} keyValue={char} />;
          })}
          <Key key={"DELETE"} isBig={true} keyValue={"DELETE"} />
        </div>
      </div>
    </>
  );
}

export default Keyboard;
