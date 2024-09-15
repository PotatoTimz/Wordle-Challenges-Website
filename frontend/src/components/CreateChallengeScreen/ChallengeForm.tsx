import axios from "axios";
import { useEffect, useState } from "react";
import fetchValidWords from "../WordleGame/Hooks/FetchWordBank";
import { useNavigate } from "react-router-dom";

function ChallengeForm() {
  const [creatorName, setCreatorName] = useState<string>("");
  const [challengeName, setChallengeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [challengeWords, setChallengeWords] = useState<Array<string>>(["", ""]);

  const [formInfo, setformInfo] = useState({
    creatorName: "",
    challengeName: "",
    description: "",
    challengeWords: ["", ""],
  });

  const [formErrorMessages, setErrorMessages] = useState({
    creatorName: "",
    challengeName: "",
    description: "",
    challengeWords: ["", ""],
  });

  const [wordSet, setWordSet] = useState<Set<string>>(new Set());

  const navigate = useNavigate();

  useEffect(() => {
    fetchValidWords().then((wordList: any) => {
      setWordSet(wordList);
    });
  });

  const createChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    let errorFlag = true;
    console.log("validating...");

    // validate creator name

    // validate challenge name
    if (challengeName === "") {
      setErrorMessages({
        ...formErrorMessages,
        challengeName: "You must enter a name for your challenge.",
      });
      errorFlag = false;
    } else if (challengeName.length <= 5 || challengeName.length > 25) {
      setErrorMessages({
        ...formErrorMessages,
        challengeName: "Your challenge's name must be between 5 and 26",
      });
      errorFlag = false;
    } else {
      // Valid challenge name
      setErrorMessages({ ...formErrorMessages, challengeName: "" });
    }

    // validate description

    // validate levels
    challengeWords.forEach((word) => {
      if (wordSet.has(word.toLocaleUpperCase()) || word === "") {
        console.log("level: " + word + " is invalid");
        errorFlag = false;
      }
    });

    if (errorFlag) {
      console.log("valid input! Submitting...");

      axios.post("https://wordle-challenges-website.vercel.app/api/challenge", {
        creator: creatorName,
        name: challengeName,
        description: description,
        words: challengeWords,
      });

      setTimeout(() => {
        navigate("/challenge", {});
      }, 500);
    } else {
      console.log("invalid input! Exiting...");
    }
  };

  const updateLevel = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedLevels = challengeWords.map((level, i) => {
      if (i === index) {
        return e.target.value;
      } else {
        return level;
      }
    });

    setChallengeWords(updatedLevels);
    console.log(challengeWords);
  };

  return (
    <div className="row justify-content-center my-5">
      <div className="col-lg-6">
        <div className="text-end">
          <i
            onClick={() => {
              navigate("/challenge", {});
            }}
            className="bi bi-x fs-4"
          ></i>
        </div>
        <form onSubmit={createChallenge}>
          <div className="form-group m-3">
            <label className="mb-2">Creator Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
            ></input>
          </div>

          <div className="form-group m-3">
            <label className="mb-2">Challenge Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={challengeName}
              onChange={(e) => setChallengeName(e.target.value)}
            ></input>
          </div>

          <div className="form-group m-3">
            <label className="mb-2">Enter a Description</label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Enter a description for your challenge"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group m-3">
            <label className="mb-2">Challenge Levels</label>
            {challengeWords.map((word, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  className="form-control mb-1"
                  placeholder={`Level ${index + 1}`}
                  value={challengeWords[index]}
                  onChange={(e) => updateLevel(index, e)}
                ></input>
              );
            })}
          </div>

          <div className="m-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (challengeWords.length < 10) {
                  setChallengeWords([...challengeWords, ""]);
                }
              }}
            >
              Add Level
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                if (challengeWords.length > 1) {
                  setChallengeWords([
                    ...challengeWords.splice(0, challengeWords.length - 1),
                  ]);
                }
              }}
            >
              Remove Level
            </button>

            <button type="submit">Create Challenge</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChallengeForm;
