import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Auth0ProviderWithHistory from "./auth/auth0Provider";

ReactDOM.render(
  <React.StrictMode>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </React.StrictMode>,
  document.getElementById("root")
);
