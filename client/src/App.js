import { LandingPage, HomePage } from "./pages";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { RoomPage } from "./pages/RoomPage/RoomPage";

function App() {

  return (
    <div className="App">
      <Routes>
        <PrivateRoute path="/home" element={<HomePage />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
