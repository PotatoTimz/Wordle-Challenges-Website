import axios from "axios";
import { ChallengeData } from "../Interfaces/ChallengeDataInterface";
import { useEffect, useState } from "react";
import SearchCard from "./SearchCard";
import { Link } from "react-router-dom";
import PageBar from "./PageBar";

function SearchScreen() {
  const [challengeList, setChallengeList] = useState<Array<ChallengeData>>([]);
  const [totalChallenges, setTotalChallenges] = useState<number>(0);
  const [searchKeyword, setKeyword] = useState<string>("");

  // Pagiation
  const [pageNumber, setPageNumber] = useState<number>(1);
  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };
  const previousPage = () => {
    if (pageNumber != 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const pageLimit: number = 12;

  const generateChallenge = () => {
    axios
      .get(
        `https://wordle-challenges-website.vercel.app/api/challenge?keyword=${searchKeyword}&page=${pageNumber}&limit=${pageLimit}`
      )
      .then((data) => {
        console.log(data);
        setChallengeList(data.data.challenges);
        setTotalChallenges(data.data.total);
      });
  };

  const clickEnter = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      generateChallenge();
      setPageNumber(1);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", clickEnter);
    return () => {
      document.removeEventListener("keydown", clickEnter);
    };
  }, [clickEnter]);

  useEffect(() => {
    generateChallenge();
  }, [pageNumber]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
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
              onClick={() => {
                generateChallenge();
                setPageNumber(1);
              }}
            >
              Search
            </button>
          </div>

          <div className="row m-auto justify-content-center">
            <div
              id="challengeQuery"
              className="col-12 justify-content-center row"
            >
              {challengeList.map((challenge: ChallengeData, index) => {
                return <SearchCard key={index} challenge={challenge} />;
              })}
            </div>

            <PageBar
              pageNumber={pageNumber}
              totalChallenges={totalChallenges}
              pageLimit={pageLimit}
              nextPage={nextPage}
              previousPage={previousPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchScreen;
