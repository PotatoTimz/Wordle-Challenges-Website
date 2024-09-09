import Letter from "./Letter";
import { AppContext } from "../../App";
import { useContext, useEffect } from "react";

function Board() {
  const { attemptInfo, validAttempt, setValidAttempt } = useContext(AppContext);

  // Animation on invalid attempt
  useEffect(() => {
    if (validAttempt === false) {
      const currentRow = document.getElementById(
        `attempt-${attemptInfo.attemptNumber + 1}`
      );
      currentRow?.classList.add("shake");
      setValidAttempt(true);
      currentRow?.addEventListener("animationend", () => {
        currentRow?.classList.remove("shake");
      });
    }
  }, [validAttempt, attemptInfo]);

  return (
    <>
      <div id="board">
        <div className="guess" id="attempt-1">
          <Letter letterPos={0} attemptVal={0} />
          <Letter letterPos={1} attemptVal={0} />
          <Letter letterPos={2} attemptVal={0} />
          <Letter letterPos={3} attemptVal={0} />
          <Letter letterPos={4} attemptVal={0} />
        </div>
        <div className="guess" id="attempt-2">
          <Letter letterPos={0} attemptVal={1} />
          <Letter letterPos={1} attemptVal={1} />
          <Letter letterPos={2} attemptVal={1} />
          <Letter letterPos={3} attemptVal={1} />
          <Letter letterPos={4} attemptVal={1} />
        </div>
        <div className="guess" id="attempt-3">
          <Letter letterPos={0} attemptVal={2} />
          <Letter letterPos={1} attemptVal={2} />
          <Letter letterPos={2} attemptVal={2} />
          <Letter letterPos={3} attemptVal={2} />
          <Letter letterPos={4} attemptVal={2} />
        </div>
        <div className="guess" id="attempt-4">
          <Letter letterPos={0} attemptVal={3} />
          <Letter letterPos={1} attemptVal={3} />
          <Letter letterPos={2} attemptVal={3} />
          <Letter letterPos={3} attemptVal={3} />
          <Letter letterPos={4} attemptVal={3} />
        </div>
        <div className="guess" id="attempt-5">
          <Letter letterPos={0} attemptVal={4} />
          <Letter letterPos={1} attemptVal={4} />
          <Letter letterPos={2} attemptVal={4} />
          <Letter letterPos={3} attemptVal={4} />
          <Letter letterPos={4} attemptVal={4} />
        </div>
        <div className="guess" id="attempt-6">
          <Letter letterPos={0} attemptVal={5} />
          <Letter letterPos={1} attemptVal={5} />
          <Letter letterPos={2} attemptVal={5} />
          <Letter letterPos={3} attemptVal={5} />
          <Letter letterPos={4} attemptVal={5} />
        </div>
      </div>
    </>
  );
}

export default Board;
