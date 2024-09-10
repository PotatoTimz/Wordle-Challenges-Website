import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChallengeData,
  defaultChallengeData,
} from "../Interfaces/ChallengeDataInterface";
import ChallengeInfo from "./ChallengeInfo/ChallengeInfo";
import Game from "./Game/Game";

function ChallengeWordle() {
  const { id } = useParams();

  const [challengeData, setChallengeData] =
    useState<ChallengeData>(defaultChallengeData);
  const [challengeProgression, setChallengeProgression] = useState<number>(0);

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
      <ChallengeInfo
        challengeProgression={challengeProgression}
        challengeLength={challengeData.words.length}
        creator={challengeData.creator}
        description={challengeData.description}
      ></ChallengeInfo>
      <Game
        progression={challengeProgression}
        answerList={challengeData.words}
        completeLevel={completeLevel}
        failChallenge={failChallenge}
      ></Game>
    </>
  );
}

export default ChallengeWordle;
