interface Props {
  challengeProgression: number;
  challengeLength: number;
  creator: string;
  description: string;
}

function ChallengeInfo(props: Props) {
  return (
    <div>
      <h1>Created by: {props.creator}</h1>
      <div>
        {props.challengeProgression + 1}/{props.challengeLength}
      </div>
      <div>Description: {props.description}</div>
    </div>
  );
}

export default ChallengeInfo;
