import { useContext } from "react";
import { ChallengeContext } from "../ChallengeWordle";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

interface Props {
  resetGame: () => void;
  toggleModal: () => void;
  isOpen: boolean;
}

function ChallengeCompleteModal(props: Props) {
  const { challengeData, challengeProgression } = useContext(ChallengeContext);
  const navigate = useNavigate();

  return (
    <>
      <Modal show={props.isOpen} onHide={props.toggleModal}>
        <Modal.Header>
          <Modal.Title className="w-100 text-center fs-2">
            Challenge Compelete!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <h1 className="text-center fs-3 underline">
              <u>{challengeData.name}</u>
            </h1>
            <p className="text-center fs-5 my-3 mx-1">
              You have compelted the challenge! You're the best. Was that
              challenge tough? You can play the challenge again or feel free to
              check out other challanges.
            </p>
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
              props.resetGame();
            }}
          >
            Play Again
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChallengeCompleteModal;
