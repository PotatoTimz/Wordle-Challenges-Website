import { ChallengeData } from "../../Interfaces/ChallengeDataInterface";

interface Props {
  challengeData: ChallengeData;
  challengeProgression: number;
  challengeLength: number;
}

function ChallengeInfo(props: Props) {
  return (
    <div>
      <h1>{props.challengeData.name}</h1>
      <h1>Created by: {props.challengeData.creator}</h1>
      <div>
        {props.challengeProgression + 1}/{props.challengeLength}
      </div>
      <div>Description: {props.challengeData.description}</div>
    </div>
  );
}

export default ChallengeInfo;
