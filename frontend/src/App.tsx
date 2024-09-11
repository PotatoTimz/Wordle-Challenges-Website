import Title from "./components/Navbar/Title";
import { Routes, Route } from "react-router-dom";
import ChallengeWordle from "./components/ChallengeMode/ChallengeWordle";
import SearchScreen from "./components/ChallengeSearchScreen/ChallengeSearchScreen";
import ChallengeForm from "./components/CreateChallengeScreen/ChallengeForm";
import "bootstrap-icons/font/bootstrap-icons.css";
import EndlessWordle from "./components/EndlessMode/EndlessWordle";

function App() {
  return (
    <>
      <Title />
      <Routes>
        <Route path="/" element={<EndlessWordle />} />
        <Route path="/endless" element={<EndlessWordle />} />
        <Route path="/challenge" element={<SearchScreen />} />
        <Route path="challenge/create" element={<ChallengeForm />} />
        <Route path="/challenge/:id" element={<ChallengeWordle />} />
      </Routes>
    </>
  );
}

export default App;
