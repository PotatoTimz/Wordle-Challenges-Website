import Instructions from "../../assets/InstructionsModal.module.scss";

interface Props {
  toggle: () => void;
}

function InstructionsModal(props: Props) {
  return (
    <>
      <div className={Instructions["modal-background"]}>
        <div className={Instructions["modal-overlay"]}>
          <div className={Instructions["modal-header"]}>
            <button id={Instructions["close-modal"]} onClick={props.toggle}>
              x
            </button>
          </div>
          <div className={Instructions["modal-body"]}>
            <h1>How To Play</h1>
            <h2>Guess the Wordle in 6 Tries.</h2>
            <ul>
              <li>Each guess must be a valid 5-letter word.</li>
              <li>
                The color of the tiles will change to show close your guess was
                to the word.
              </li>
            </ul>
            <h3>Examples</h3>
            <div className={Instructions["example-row"]}>
              {"WEARY".split("").map((char: string, i: number) => (
                <p
                  key={`${char}-${i}`}
                  className={Instructions["letter"]}
                  id={Instructions[`example-${char}`]}
                >
                  {char}
                </p>
              ))}
            </div>
            <p>
              <strong>W</strong> is in the word and in the correct spot.
            </p>
            <div className={Instructions["example-row"]}>
              {"PILLS".split("").map((char: string, i: number) => (
                <p
                  key={`${char}-${i}`}
                  className={Instructions["letter"]}
                  id={Instructions[`example-${char}`]}
                >
                  {char}
                </p>
              ))}
            </div>
            <p>
              <strong>I</strong> is in the word but in the wrong spot.
            </p>
            <div className={Instructions["example-row"]}>
              {"VAGUE".split("").map((char: string, i: number) => (
                <p
                  key={`${char}-${i}`}
                  className={Instructions["letter"]}
                  id={Instructions[`example-${char}`]}
                >
                  {char}
                </p>
              ))}
            </div>
            <p>
              <strong>U</strong> is not in the word in any spot.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default InstructionsModal;
