import { ArrowRightIcon } from "@primer/octicons-react";
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ChallengeContext } from "../ChallengeWordle";

interface Props {
  completeLevel: () => void;
  toggleModal: () => void;
  isOpen: boolean;
}

function NextLevelModal(props: Props) {
  const { challengeData, challengeProgression } = useContext(ChallengeContext);

  return (
    <>
      <Modal show={props.isOpen} onHide={props.toggleModal}>
        <Modal.Header>
          <Modal.Title className="w-100 text-center fs-2">
            Level Complete!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <h1 className="text-center fs-3 underline">
              <u>{challengeData.name}</u>
            </h1>
            <p className="text-center fs-5 my-3 mx-1">
              Congratulations on completing {challengeData.name} level{" "}
              {challengeProgression + 1}. You are well on your way to completing
              this challenge... Just{" "}
              {challengeData.words.length - challengeProgression - 1} more
              levels to go!
            </p>
            <h2 className="text-center fs-4 underline">
              {challengeProgression + 1} {" => "}
              {challengeProgression + 2}
            </h2>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              props.toggleModal();
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
