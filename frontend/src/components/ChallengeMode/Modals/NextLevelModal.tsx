import { ArrowRightIcon } from "@primer/octicons-react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
  challengeProgress: number;
  challengeLength: number;
  challengeName: string;
  completeLevel: () => void;
}

function NextLevelModal(props: Props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Level Complete!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <h1 className="text-center fs-3 underline">
              <u>{props.challengeName}</u>
            </h1>
            <p className="text-center fs-5 my-3 mx-1">
              Congratulations on completing {props.challengeName} level . You
              are well on your way to completing this challenge... Just{" "}
              {props.challengeLength - props.challengeProgress - 1} more levels
              to go!
            </p>
            <h2 className="text-center fs-4 underline">
              {props.challengeProgress + 1} {" => "}
              {props.challengeProgress + 2}
            </h2>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              props.completeLevel();
            }}
          >
            Proceed to Next Level
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NextLevelModal;
