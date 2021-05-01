import React from "react";
import LandingPageBanner from "./landing-page.jpg";
// import { LandingPageBanner } from ".../images/landing-page.jpg";
import { useAuth0 } from "@auth0/auth0-react";

export const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-center text-5xl m-4">Socialley</h1>
      <div className="flex-grow">
        <div className="my-9">
          <img
            className="object-contain md:object-scale-down"
            src={LandingPageBanner}
            alt="banner"
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-center my-8 text-5xl font-bold md:font-bold">
            A Valley for Socials
          </h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-2xl"
            onClick={() => loginWithRedirect()}
          >
            SignIn
          </button>
        </div>
      </div>
      <footer className="flex flex-col items-center">
        <p className="text-xl">© | 2021 | socially </p>
        <p className="md:block cursor-pointer text-2xl hover:text-whit">
          Socialley by neogGrammers
        </p>
        <p className="flex gap-6 my-2">
          <i className="fab fa-2x fa-github"></i>
          <i className="fab fa-2x fa-twitter"></i>
        </p>
      </footer>
    </div>
  );
};
