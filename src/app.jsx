import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Feed } from "./components/Feed";
import { Unlogged } from "./components/Unlogged";
import { Welcome } from "./components/Welcome";
import "./css/app.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/feed" element={<Feed />} />
          <Route exact path="/" element={<Unlogged />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
