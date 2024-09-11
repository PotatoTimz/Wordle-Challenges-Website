import InstructionsModal from "./InstructionsModal";
import { useState } from "react";
import Navbar from "react-bootstrap/esm/Navbar";
import Container from "react-bootstrap/esm/Container";
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import Nav from "react-bootstrap/esm/Nav";
import { Link } from "react-router-dom";

function Title() {
  const [showInstructionsModal, setshowInstructionsModal] = useState(false);

  const toggleModal = () => {
    setshowInstructionsModal(!showInstructionsModal);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className="fs-3">
            <Link style={{ textDecoration: "none", color: "black" }} to={`/`}>
              WORDLE
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link
                className="mx-2"
                style={{ textDecoration: "none", color: "black" }}
                to={`/endless`}
              >
                Endless Mode
              </Link>
              <Link
                className="mx-2"
                style={{ textDecoration: "none", color: "black" }}
                to={"/challenge"}
              >
                Challenge Mode
              </Link>
            </Nav>
            <Nav.Link>
              <i
                onClick={toggleModal}
                className="bi bi-question-circle fs-3"
              ></i>
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showInstructionsModal && (
        <InstructionsModal toggle={toggleModal}></InstructionsModal>
      )}
    </>
  );
}

export default Title;

// {showInstructionsModal && (
//   <InstructionsModal toggle={toggleModal}></InstructionsModal>
// )}
// <div className="hud">
//   <h1 id="game-title">WORDLE</h1>
//   <button id="help-button" onClick={toggleModal} className="btn-modal">
//     ?
//   </button>
// </div>
