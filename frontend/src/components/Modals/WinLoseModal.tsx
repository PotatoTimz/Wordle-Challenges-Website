import App, { AppContext } from "../../App";
import { useContext } from "react";
import { SessionInfo } from "../Interfaces/ProviderInfo";
import WLModal from "../../assets/WinLoseModal.module.scss";

//import WLModal from "../assets/WinLoseModal.module.scss";

interface Props {
  toggle: () => void;
  outcome: string;
  sessionInfo: SessionInfo;
  resetGame: () => void;
}

function WinLoseModal(props: Props) {
  const { answer, board, attemptInfo } = useContext(AppContext);

  const getGuesses = () => {
    let guessedWords = [];
    for (let i = 0; i < attemptInfo.attemptNumber; i++) {
      guessedWords.push(board[i].join(""));
    }

    return (
      <div className={WLModal["guessed-words"]}>
        {guessedWords.map((word, index) => {
          return (
            <div key={`${word}-${index}`} className={WLModal["gussed-word"]}>
              {word}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className={WLModal["modal-background"]}>
        <div className={WLModal["modal-overlay"]}>
          <div className={WLModal["modal-header"]}>
            <button id={WLModal["close-modal"]} onClick={props.toggle}>
              x
            </button>
          </div>
          <div className={WLModal["modal-body"]}>
            <h1>You {props.outcome}!</h1>
            <h2>
              The correct word was: <strong>{answer}</strong>
            </h2>
            <div id={WLModal["word-attempts"]}>
              <h3>Words You Attempted:</h3>
              {getGuesses()}
              <p id={WLModal["show-attempts"]}>
                <strong>Attempts Made: {attemptInfo.attemptNumber}</strong>
              </p>
            </div>

            <fieldset id={WLModal["session-table"]}>
              <legend>Session Stats:</legend>
              <table>
                <tbody>
                  <tr>
                    <th className={WLModal["stat-name"]}>Games Played:</th>
                    <th className={WLModal["stat-name"]}>
                      Current Win Streak:
                    </th>
                    <th className={WLModal["stat-name"]}>Total Games Won:</th>
                  </tr>
                  <tr>
                    <td className={WLModal["stat-value"]}>
                      {props.sessionInfo.gamesPlayed}
                    </td>
                    <td className={WLModal["stat-value"]}>
                      {props.sessionInfo.winStreak}
                    </td>
                    <td className={WLModal["stat-value"]}>
                      {props.sessionInfo.totalGamesWon}
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>

            <div id={WLModal["modal-bottom"]}>
              <button
                id={WLModal["play-again-button"]}
                type="button"
                className={WLModal["btn btn-secondary"]}
                onClick={props.resetGame}
              >
                Play Again!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WinLoseModal;
