import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChallengeData,
  defaultChallengeData,
} from "../Interfaces/ChallengeDataInterface";
import ChallengeInfo from "./ChallengeInfo/ChallengeInfo";
import Game from "./Game/Game";
import NextLevelModal from "./Modals/NextLevelModal";
import {
  ChallengeDataContext,
  defaultChallengeDataContext,
} from "../Interfaces/ChallangeContextInterface";
import GameOverModal from "./Modals/GameOverModal";
import ChallengeCompleteModal from "./Modals/ChallengeCompleteModal";

export const ChallengeContext = createContext<ChallengeDataContext>(
  defaultChallengeDataContext
);

function ChallengeWordle() {
  const { id } = useParams();

  const [challengeData, setChallengeData] =
    useState<ChallengeData>(defaultChallengeData);
  const [challengeProgression, setChallengeProgression] = useState<number>(0);
  const [toggleReset, setReset] = useState<boolean>(false);

  //Modals
  const [levelCompleteModal, setLevelCompleteModal] = useState<boolean>(false);
  const [gameOverModal, setGameOverModal] = useState<boolean>(false);
  const [completeModal, setCompelteModal] = useState<boolean>(false);

  const toggleLevelCompleteModal = () =>
    setLevelCompleteModal(!levelCompleteModal);
  const toggleGameOverModal = () => setGameOverModal(!gameOverModal);
  const toggleCompleteChallengeModal = () => setCompelteModal(!completeModal);

  const completeLevel = () => {
    setChallengeProgression(challengeProgression + 1);
    setReset(!toggleReset);
  };
  const resetChallenge = () => {
    setChallengeProgression(0);
    setReset(!toggleReset);
  };

  // On Mount
  useEffect(() => {
    axios
      .get(`https://wordle-challenges-website.vercel.app/api/challenge/${id}`)
      .then((data) => {
        console.log(data.data);
        setChallengeData(data.data);
      });
  }, [id]);

  return (
    <>
      <ChallengeContext.Provider
        value={{ challengeData, challengeProgression }}
      >
        <ChallengeInfo />
        <Game
          reset={toggleReset}
          toggleLevelCompleteModal={toggleLevelCompleteModal}
          toggleGameOverModal={toggleGameOverModal}
          toggleChallangeCompleteModal={toggleCompleteChallengeModal}
        />
        <NextLevelModal
          completeLevel={completeLevel}
          isOpen={levelCompleteModal}
          toggleModal={toggleLevelCompleteModal}
        />
        <GameOverModal
          gameOver={resetChallenge}
          toggleModal={toggleGameOverModal}
          isOpen={gameOverModal}
        />
        <ChallengeCompleteModal
          resetGame={resetChallenge}
          toggleModal={toggleCompleteChallengeModal}
          isOpen={completeModal}
        />
      </ChallengeContext.Provider>
    </>
  );
}

export default ChallengeWordle;
