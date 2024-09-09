import TitleLetter from "./TitleLetter";
import InstructionsModal from "./InstructionsModal";
import { useState } from "react";

function Title() {
  const [showInstructionsModal, setshowInstructionsModal] = useState(false);

  const toggleModal = () => {
    setshowInstructionsModal(!showInstructionsModal);
  };

  return (
    <>
      {showInstructionsModal && (
        <InstructionsModal toggle={toggleModal}></InstructionsModal>
      )}
      <div className="hud">
        <h1 id="game-title">WORDLE</h1>
        <button id="help-button" onClick={toggleModal} className="btn-modal">
          ?
        </button>
      </div>
    </>
  );
}

export default Title;
