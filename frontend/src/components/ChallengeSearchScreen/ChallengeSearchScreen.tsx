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
  const goToPage = (page: number) => {
    setPageNumber(page);
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
    <div className="container-fluid">
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

      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-9 col-sm-10 col-xs-11">
          <div className="input-group mb-5">
            <input
              type="text"
              placeholder="Search for a challenge"
              value={searchKeyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              className="form-control"
            ></input>
            <button
              onClick={() => {
                generateChallenge();
                setPageNumber(1);
              }}
              className="btn btn-outline-secondary w-10"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="row m-auto justify-content-center">
        <div id="challengeQuery" className="col-10 justify-content-center row">
          {challengeList.map((challenge: ChallengeData, index) => {
            return <SearchCard key={index} challenge={challenge} />;
          })}
        </div>

        <PageBar
          pageNumber={pageNumber}
          totalChallenges={totalChallenges}
          pageLimit={pageLimit}
          goToPage={goToPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </div>
    </div>
  );
}

export default SearchScreen;
