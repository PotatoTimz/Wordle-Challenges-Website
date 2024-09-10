import axios from "axios";
import { ChallengeData } from "../Interfaces/ChallengeDataInterface";
import { useEffect, useState } from "react";

function SearchScreen() {
  const [challengeList, setChallengeList] = useState<Array<ChallengeData>>([]);

  useEffect(() => {
    axios
      .get("https://wordle-challenges-website.vercel.app/api/challenge")
      .then((data) => {
        setChallengeList(data.data);
      });
  }, []);

  return (
    <>
      <h1>Select a Challenge</h1>
      {challengeList.map((challenge: ChallengeData) => {
        return (
          <div>
            <h2>{challenge.name}</h2>
            <h3>Created By: {challenge.creator}</h3>
            <h3>{challenge.createdAt}</h3>
            <p>{challenge.description}</p>
          </div>
        );
      })}
    </>
  );
}

export default SearchScreen;
