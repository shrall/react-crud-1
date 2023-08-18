import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TestValidation from "./pages/TestValidation";
import { Toaster } from "sonner";
function App() {
  return (
    <Router>
      <div className="App min-h-screen min-w-screen font-josefin-sans">
        <Toaster richColors position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/validation" element={<TestValidation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
