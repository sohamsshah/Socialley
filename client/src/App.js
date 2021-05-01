import "./App.css";
import { LandingPage } from "./pages/LandingPage/";
import Auth0ProviderWithHistory from "./auth/auth0Provider";

function App() {
  return (
    <div className="App">
      {/* <h1 className="text-red-500">Hello World! I am Socialley.</h1> */}
      <Auth0ProviderWithHistory>
        <LandingPage />
      </Auth0ProviderWithHistory>
    </div>
  );
}

export default App;
