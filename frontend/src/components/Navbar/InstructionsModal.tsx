// @ts-ignore
import Instructions from "../../assets/scss/InstructionsModal.module.scss";
import Modal from "react-bootstrap/esm/Modal";

interface Props {
  toggleModal: () => void;
  isOpen: boolean;
}

function InstructionsModal(props: Props) {
  return (
    <>
      <Modal show={props.isOpen} onHide={props.toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title className="fs-1">How to Play</Modal.Title>
        </Modal.Header>

        <Modal.Body className={`px-4 ${Instructions["modal-body"]}`}>
          <h2 className="fs-4">Guess the Wordle in 6 Tries.</h2>
          <ul>
            <li>Each guess must be a valid 5-letter word.</li>
            <li>
              The color of the tiles will change to show close your guess was to
              the word.
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
        </Modal.Body>
      </Modal>
    </>
  );
}

export default InstructionsModal;
