import Title from "./components/Navbar/Title";
import MainScreen from "./components/EndlessMode/EndlessWordle";
import { Routes, Route } from "react-router-dom";
import ChallengeWordle from "./components/ChallengeMode/ChallengeWordle";
import SearchScreen from "./components/ChallengeSearchScreen/ChallengeSearchScreen";
import ChallengeForm from "./components/CreateChallengeScreen/ChallengeForm";

function App() {
  return (
    <>
      <Title />
      <Routes>
        <Route path="/" element={<MainScreen />}></Route>
        <Route path="/challenge" element={<SearchScreen />}></Route>
        <Route path="challenge/create" element={<ChallengeForm />}></Route>
        <Route path="/challenge/:id" element={<ChallengeWordle />}></Route>
      </Routes>
    </>
  );
}

export default App;
