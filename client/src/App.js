import { LandingPage, HomePage } from "./pages";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import io from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const socket = io.connect("http://localhost:8080", {
    transports: ["websocket"],
  });
  const { isAuthenticated, user } = useAuth0();

  console.log(isAuthenticated);
  console.log(user);
  return (
    <div className="App">
      <Routes>
        <PrivateRoute path="/" element={<HomePage />} />
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
