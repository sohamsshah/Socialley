import { LandingPage, HomePage } from "./pages";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <PrivateRoute path="/" element={<HomePage />} />
        <Route path="/login" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
