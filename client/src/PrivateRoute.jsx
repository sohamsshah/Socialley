import { Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export function PrivateRoute({ path, ...state }) {
  const { isAuthenticated, user } = useAuth0();

  return isAuthenticated ? (
    <Route {...state} path={path} />
  ) : (
    <Navigate replace to="/login" state={{ previousPath: `${path}` }} />
  );
}
