import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <div className="App min-h-screen min-w-screen font-josefin-sans">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
