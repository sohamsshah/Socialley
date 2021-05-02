import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export function HomePage() {
  const { user } = useAuth0();

  console.log(user);

  // async function createRoom() {
  //   const { } = await axios.post("", {newRoom:})
  // }

  return (
    <div>
      <h1>This is the home page</h1>
      <Link to={`/room/608e88588826f40f04b985bd`}>
        <div>Room</div>
      </Link>
    </div>
  );
}
