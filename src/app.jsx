import "./css/app.css";
import { Welcome } from "./components/Welcome";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Feed } from "./components/Feed";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
