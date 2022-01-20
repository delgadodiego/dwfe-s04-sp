import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Disconnected } from "./components/Disconnected";
import { Feed } from "./components/Feed";
import { Profile } from "./components/Profile";
import { Unlogged } from "./components/Unlogged";
import { Welcome } from "./components/Welcome";
import { userContext } from "./context/UserContext";
import "./css/app.css";
import { useUserSetup } from "./hooks/userHooks";

function App() {
  const navigate = useNavigate();

  const { user } = useContext(userContext);

  useEffect(() => {
    if (user === null || user === undefined) {
      navigate("/");
    }
  }, [user, navigate]);

  useUserSetup();

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Unlogged />} />
        <Route exact path="/welcome" element={<Welcome />} />
        <Route exact path="/feed" element={<Feed />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/logout" element={<Disconnected />} />
      </Routes>
    </div>
  );
}

export default App;
