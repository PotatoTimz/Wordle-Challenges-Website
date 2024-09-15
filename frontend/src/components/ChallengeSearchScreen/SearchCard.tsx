import { useEffect } from "react";
import { ChallengeData } from "../Interfaces/ChallengeDataInterface";
import { convertTimeStamp } from "../ChallengeMode/Utility/ConvertTimeStamp";
import { Link } from "react-router-dom";

interface Props {
  challenge: ChallengeData;
}

function SearchCard(props: Props) {
  return (
    <div className="bg-light shadow col-lg-3 col-xs-12 col-sm-12 col-md-5 mx-3 my-2 p-4 rounded border border-secondary">
      <h2 className="text-center fs-3 fw-bolder text-wrap">
        {props.challenge.name}
      </h2>
      <h3 className="text-center fs-6 fw-bold text-wrap">
        Creator: {props.challenge.creator}
      </h3>
      <h3 className="text-center fs-6 fst-normal text-wrap">
        {convertTimeStamp(props.challenge.createdAt!)}
      </h3>
      <p className="text-center text-wrap fs-6">
        {props.challenge.description}
      </p>
      <Link
        className="row justify-content-center"
        to={`${props.challenge._id}`}
        style={{ textDecoration: "none" }}
      >
        <button className="btn btn-outline-dark text-center fs-6 fw-bold col-10">
          Play Now!
        </button>
      </Link>
    </div>
  );
}

export default SearchCard;
