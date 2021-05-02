import { LandingPage, HomePage } from "./pages";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { PrivateRoute } from "./PrivateRoute";
import { RoomPage } from "./pages/RoomPage/RoomPage";
import { useUser } from "./context/UserProvider";

function App() {
  const { userDispatch } = useUser();
  const { isLoading } = useAuth0();

  useEffect(() => {
    (async function () {
      try {
        const userId = await JSON.parse(localStorage.getItem("userId"));
        const {
          data: { user },
        } = await axios.get(`http://localhost:8080/user/${userId}`);
        userDispatch({ type: "ADD_USER", payload: user });
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
