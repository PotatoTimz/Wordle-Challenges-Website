import axios from "axios";
import { ChallengeData } from "../Interfaces/ChallengeDataInterface";
import { useEffect, useState } from "react";
import SearchCard from "./SearchCard";
import { Link } from "react-router-dom";

function SearchScreen() {
  const [challengeList, setChallengeList] = useState<Array<ChallengeData>>([]);
  const [searchKeyword, setKeyword] = useState<string>("");

  const searchChallenge = () => {
    axios
      .get(
        "https://wordle-challenges-website.vercel.app/api/challenge?keyword=" +
          searchKeyword
      )
      .then((data) => {
        console.log(data);
        setChallengeList(data.data);
      });
  };

  const clickEnter = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      searchChallenge();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", clickEnter);
    return () => {
      document.removeEventListener("keydown", clickEnter);
    };
  }, [clickEnter]);

  useEffect(() => {
    axios
      .get("https://wordle-challenges-website.vercel.app/api/challenge")
      .then((data) => {
        setChallengeList(data.data);
      });
  }, []);

  return (
    <>
      <h1 className="text-center fs-1 m-2 mb-4">Select a Challenge</h1>

      <Link
        style={{ textDecoration: "none" }}
        to={`create`}
        className="row justify-content-center m-4"
      >
        <button
          className="btn btn-secondary text-wrap"
          style={{ width: "fit-content", paddingInline: "20px" }}
        >
          Create A Challenge
        </button>
      </Link>

      <div className="d-flex justify-content-center m-4">
        <input
          type="text"
          className="w-50"
          placeholder="Search for a challenge"
          value={searchKeyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        ></input>
        <button
          className="btn btn-outline-secondary w-10"
          onClick={searchChallenge}
        >
          Search
        </button>
      </div>

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
