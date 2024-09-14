import Container from "react-bootstrap/esm/Container";
import { ChallengeData } from "../../Interfaces/ChallengeDataInterface";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ChallengeContext } from "../ChallengeWordle";

function ChallengeInfo() {
  const navigate = useNavigate();
  const { challengeData, challengeProgression } = useContext(ChallengeContext);

  return (
    <>
      <div className="row m-auto justify-content-center ">
        <Col
          lg={4}
          md={6}
          sm={7}
          xs={10}
          className="mt-2 bg-light rounded border border-secondary"
        >
          <h1 className="fs-3 underlined text-center">
            <u>{challengeData.name}</u>
          </h1>
          <h1 className="fs-6 text-center">
            Created by: {challengeData.creator}
          </h1>
          <div className="mt-4 mb-1 fs-6 text-center">
            {challengeData.description}
          </div>
        </Col>
      </div>
      <div className="row m-auto justify-content-center ">
        <Col lg={4} md={6} sm={7} xs={10} className="">
          <div className="row justify-content-between">
            <div className="col-1 fs-6 mt-1 text-center">
              {challengeProgression + 1}/{challengeData.words.length}
            </div>
            <div
              onClick={() => navigate(0)}
              className="col-1 fs-6 mt-1 text-center"
            >
              <u>
                <i className="bi bi-arrow-clockwise"></i>
              </u>
            </div>
          </div>
        </Col>
      </div>
    </>
  );
}

export default ChallengeInfo;
