import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChallengeForm() {
  const [creatorName, setCreatorName] = useState<string>("");
  const [challengeName, setChallengeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [challengeWords, setChallengeWords] = useState<Array<string>>(["", ""]);

  const [errors, setErrors] = useState<object>({});
  const navigate = useNavigate();

  const createChallenge = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post("https://wordle-challenges-website.vercel.app/api/challenge", {
        creator: creatorName,
        name: challengeName,
        description: description,
        words: challengeWords,
      })
      .then((response) => {
        navigate("/challenge", {});
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data);
        setErrors(err.response?.data!);
      });
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
    <div className="container">
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
                className={`form-control ${
                  "creator" in errors ? "is-invalid" : ""
                }`}
                placeholder="Enter your name"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
              ></input>
              <div className="invalid-feedback">
                {"creator" in errors ? (errors.creator as string) : ""}
              </div>
            </div>

            <div className="form-group m-3">
              <label className="mb-2">Challenge Name</label>
              <input
                type="text"
                className={`form-control ${
                  "name" in errors ? "is-invalid" : ""
                }`}
                placeholder="Enter your name"
                value={challengeName}
                onChange={(e) => setChallengeName(e.target.value)}
              ></input>
              <div className="invalid-feedback">
                {"name" in errors ? (errors.name as string) : ""}
              </div>
            </div>

            <div className="form-group m-3">
              <label className="mb-2">Enter a Description</label>
              <textarea
                className={`form-control ${
                  "description" in errors ? "is-invalid" : ""
                }`}
                rows={3}
                placeholder="Enter a description for your challenge"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <div className="invalid-feedback">
                {"description" in errors ? (errors.description as string) : ""}
              </div>
            </div>

            <div className="form-group m-3">
              <label className="mb-2">Challenge Levels</label>
              {challengeWords.map((word, index) => {
                const errorName = `words.${index}` as keyof typeof errors;

                return (
                  <>
                    <input
                      key={index}
                      type="text"
                      className={`form-control mb-1 ${
                        errorName in errors ? "is-invalid" : ""
                      }`}
                      placeholder={`Level ${index + 1}`}
                      value={challengeWords[index]}
                      onChange={(e) => updateLevel(index, e)}
                    ></input>
                    <div className="invalid-feedback">
                      {errorName in errors ? errors[errorName] : ""}
                    </div>
                  </>
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
    </div>
  );
}

export default ChallengeForm;
