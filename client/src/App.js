import { LandingPage, HomePage, RoomPage, ProfilePage } from "./pages";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { PrivateRoute } from "./PrivateRoute";
import { useUser } from "./context/UserProvider";
import { Loading } from "./assets/Svg";
import "./index.css";

function App() {
  const { userDispatch } = useUser();
  const { isLoading } = useAuth0();

  useEffect(() => {
    (async function () {
      try {
        const userId = await JSON.parse(localStorage.getItem("userId"));
        const {
          data: { user },
        } = await axios.get(
          `https://socialley.sohamsshah.repl.co/user/${userId}`
        );
        userDispatch({ type: "ADD_USER", payload: user });
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <PrivateRoute path="/home" element={<HomePage />} />
        <PrivateRoute path="/profile/:userId" element={<ProfilePage />} />
        <PrivateRoute path="/room/:roomId" element={<RoomPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
