import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Auth0ProviderWithHistory from "./auth/auth0Provider";
import { BrowserRouter as Router } from "react-router-dom";
import { ChatProvider, RoomProvider, UserProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithHistory>
        <UserProvider>
          <RoomProvider>
            <ChatProvider>
              <App />
            </ChatProvider>
          </RoomProvider>
        </UserProvider>
      </Auth0ProviderWithHistory>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
