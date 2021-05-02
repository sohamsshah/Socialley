import { LandingPage, HomePage, RoomPage, ProfilePage } from "./pages";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <PrivateRoute path="/home" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
