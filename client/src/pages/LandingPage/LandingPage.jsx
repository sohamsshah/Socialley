import React, { useEffect } from "react";
import LandingPageBanner from "./landing-page.jpg";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/UserProvider";

export const LandingPage = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const { userDispatch } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        try {
          const response = await axios.post(
            "https://socialley.sohamsshah.repl.co/user",
            {
              newUser: {
                email: user.email,
                username: user.nickname,
                profilePic: user.picture,
                bio: "Hello World! I love Socialley💻❤",
              },
            }
          );
          const userFromApi = response.data.user;
          userDispatch({ type: "ADD_USER", payload: userFromApi });
          localStorage.setItem("userId", JSON.stringify(userFromApi._id));
        } catch (error) {
          console.log(error);
        }
      })();
      navigate("/home");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-center text-5xl m-4">Socialley</h1>
      <div className="flex flex-col lg:flex-row flex-grow">
        <div className="my-9">
          <img
            className="w-full lg:w-7/12 lg:m-auto object-contain md:object-scale-down"
            src={LandingPageBanner}
            alt="banner"
          />
        </div>
        <div className="flex flex-col items-center lg:w-full justify-center lg:mb-48 lg:mr-40">
          <h2 className="text-center my-8 text-5xl font-bold md:font-bold">
            A Discussion Alley for smart socializing.
          </h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-2xl"
            onClick={() => loginWithRedirect()}
          >
            Sign In
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-2xl"
            onClick={() => logout()}
          >
            Sign In
          </button>
        </div>
      </div>
      <footer className="flex flex-col lg:flex-row justify-center lg:py-4 items-center  lg:gap-6 ">
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
