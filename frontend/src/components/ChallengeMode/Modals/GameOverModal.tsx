import { useContext } from "react";
import { ChallengeContext } from "../ChallengeWordle";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

interface Props {
  gameOver: () => void;
  toggleModal: () => void;
  isOpen: boolean;
}

function GameOverModal(props: Props) {
  const { challengeData, challengeProgression } = useContext(ChallengeContext);
  const navigate = useNavigate();

  return (
    <>
      <Modal show={props.isOpen} onHide={props.toggleModal}>
        <Modal.Header>
          <Modal.Title className="w-100 text-center fs-2">
            Challenge Failed!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <h1 className="text-center fs-3 underline">
              <u>{challengeData.name}</u>
            </h1>
            <p className="text-center fs-5 my-3 mx-1">
              You have failed to complete the challenge! Don't let that bring
              you down. You can try again or you can browse through some other
              challenges to attempt.
            </p>
            <h2 className="text-center fs-4 underline">
              {challengeProgression + 1} {" => "}
              {1}
            </h2>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/challenge", {});
            }}
          >
            View Other Challenges
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.toggleModal();
              props.gameOver();
            }}
          >
            Start Over
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GameOverModal;
