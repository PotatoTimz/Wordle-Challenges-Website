import { useEffect } from "react";
import { ChallengeData } from "../Interfaces/ChallengeDataInterface";
import { convertTimeStamp } from "../ChallengeMode/Utility/ConvertTimeStamp";
import { Link } from "react-router-dom";

interface Props {
  challenge: ChallengeData;
}

function SearchCard(props: Props) {
  return (
    <div className="bg-light col-lg-3 m-3 p-4 rounded border border-secondary">
      <h2 className="text-center fs-1 text-wrap">{props.challenge.name}</h2>
      <h3 className="text-center fs-4 fw-semibold text-wrap">
        Creator: {props.challenge.creator}
      </h3>
      <h3 className="text-center fs-6 fst-italic fw-light text-wrap">
        {convertTimeStamp(props.challenge.createdAt!)}
      </h3>
      <p className="text-center text-wrap">{props.challenge.description}</p>
      <Link
        className="row justify-content-center"
        to={`${props.challenge._id}`}
        style={{ textDecoration: "none" }}
      >
        <button className="btn btn-outline-dark text-center fw-bold col-10">
          Play Now!
        </button>
      </Link>
    </div>
  );
}

export default SearchCard;
