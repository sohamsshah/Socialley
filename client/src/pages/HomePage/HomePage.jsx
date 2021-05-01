import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export function HomePage() {
  const { user } = useAuth0();

  console.log(user);

  return (
    <div>
      <h1>This is the home page</h1>
    </div>
  );
}
