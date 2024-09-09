import TitleLetter from "./TitleLetter";
import InstructionsModal from "./InstructionsModal";
import { AppContext } from "../../App";
import { useState, useContext } from "react";

function Title() {
  const { disableInput, setDisableInput } = useContext(AppContext);
  const [showInstructionsModal, setshowInstructionsModal] = useState(false);

  const toggleModal = () => {
    setDisableInput(!disableInput);
    setshowInstructionsModal(!showInstructionsModal);
  };

  return (
    <>
      {showInstructionsModal && (
        <InstructionsModal toggle={toggleModal}></InstructionsModal>
      )}
      <div className="hud">
        <h1 id="game-title">
          <TitleLetter letter="W" index={0}></TitleLetter>
          <TitleLetter letter="O" index={1}></TitleLetter>
          <TitleLetter letter="R" index={2}></TitleLetter>
          <TitleLetter letter="D" index={3}></TitleLetter>
          <TitleLetter letter="L" index={4}></TitleLetter>
          <TitleLetter letter="E" index={5}></TitleLetter>
        </h1>
        <button id="help-button" onClick={toggleModal} className="btn-modal">
          ?
        </button>
      </div>
    </>
  );
}

export default Title;
