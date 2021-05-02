import { LandingPage, HomePage } from "./pages";
import { Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import { PrivateRoute } from "./PrivateRoute";
import { RoomPage } from "./pages/RoomPage/RoomPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <PrivateRoute path="/home" element={<HomePage />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
