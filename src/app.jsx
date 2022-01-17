import { useEffect, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Feed } from "./components/Feed";
import { Unlogged } from "./components/Unlogged";
import { Welcome } from "./components/Welcome";
import { Profile } from "./components/Profile";
import { userContext } from "./context/UserContext";
import "./css/app.css";
import { useUserSetup } from "./hooks/userHooks";

function App() {
  //   useUserLoginRedirect();
  const navigate = useNavigate();

  const { user } = useContext(userContext);

  useEffect(() => {
    if (user === null || user === undefined) {
      navigate("/");
    } else {
      console.info("USER4", user);
    }
  }, [user, navigate]);

  useUserSetup();

  return (
    <div className="app">
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/feed" element={<Feed />} />
        <Route exact path="/" element={<Unlogged />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
