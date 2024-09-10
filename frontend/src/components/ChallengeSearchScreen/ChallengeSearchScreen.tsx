import axios from "axios";
import { ChallengeData } from "../Interfaces/ChallengeDataInterface";
import { useEffect, useState } from "react";
import SearchCard from "./SearchCard";
import { Link } from "react-router-dom";

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
      <h1 className="text-center fs-1 m-2">Select a Challenge</h1>

      <Link
        style={{ textDecoration: "none" }}
        to={`create`}
        className="row justify-content-center"
      >
        <button
          className="btn btn-secondary text-wrap"
          style={{ width: "fit-content", paddingInline: "20px" }}
        >
          Create A Challenge
        </button>
      </Link>

      <div className="row justify-content-center">
        <div id="challengeQuery" className="col-11 justify-content-center row">
          {challengeList.map((challenge: ChallengeData, index) => {
            return <SearchCard key={index} challenge={challenge} />;
          })}
        </div>
      </div>
    </>
  );
}

export default SearchScreen;
