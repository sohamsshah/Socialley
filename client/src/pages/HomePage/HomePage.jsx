import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import {Link} from "react-router-dom"

export function HomePage() {
  const { user } = useAuth0();
  
  console.log(user);

  return (
    <div>
      <Link exact to="/room/1">Room 1</Link>
      <Link exact to="/room/2">Room 2</Link>
      <Link exact to="/room/3">Room 3</Link>
      <Link exact to="/room/4">Room 4</Link>
      <h1>This is the home page</h1>
    </div>
  );
}
