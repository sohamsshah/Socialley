import { LandingPage, HomePage } from "./pages";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import io from "socket.io-client";

function App() {
  const socket = io.connect("http://localhost:8080", {
    transports: ["websocket"],
  });

  return (
    <div className="App">
      <Routes>
        <PrivateRoute path="/home" element={<HomePage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
