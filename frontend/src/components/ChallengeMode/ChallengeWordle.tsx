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

export const ChallengeContext = createContext<ChallengeDataContext>(
  defaultChallengeDataContext
);

function ChallengeWordle() {
  const { id } = useParams();

  const [challengeData, setChallengeData] =
    useState<ChallengeData>(defaultChallengeData);
  const [challengeProgression, setChallengeProgression] = useState<number>(0);

  //Modals
  const [levelCompleteModal, setLevelCompleteModal] = useState<boolean>(false);

  const toggleLevelCompleteModal = () =>
    setLevelCompleteModal(!levelCompleteModal);
  const completeLevel = () => {
    setChallengeProgression(challengeProgression + 1);
  };
  const failChallenge = () => {
    setChallengeProgression(0);
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
          toggleLevelCompleteModal={toggleLevelCompleteModal}
          failChallenge={failChallenge}
        />
        <NextLevelModal
          completeLevel={completeLevel}
          isOpen={levelCompleteModal}
          toggleModal={toggleLevelCompleteModal}
        ></NextLevelModal>
      </ChallengeContext.Provider>
    </>
  );
}

export default ChallengeWordle;
