import React from "react";
import { Button } from "@mui/material";

import { signInithGooglePopup } from "../../firebaseConfig";

import { useStateValue } from "../../context/StateProvider";
import { actionTypes } from "../../context/reducer";
import { Player } from "@lottiefiles/react-lottie-player";
import loading_lottie_file from '../../lottie_files/loading_gray.json';

import "./Login.css";

const Login = () => {
  const [{ isLoading }, dispatch] = useStateValue();

  const loginEvent = async () => {
    const user = await signInithGooglePopup();
    dispatch({ type: actionTypes.SET_USER, user });
  };

  return (
    <div className="login">
      {isLoading ? (
        <Player
        autoplay
        loop
        src={loading_lottie_file}
      >
      </Player>
      ) : (
        <div className="login-container">
          <img
            src="https://res.cloudinary.com/dktwlx0dz/image/upload/v1686468269/whatsapp_clone_bi8s1l.png"
            alt="whatsapp logo"
          />

          <div className="login-text">
            <h2>Sign in to WhatsApp</h2>
          </div>

          <Button onClick={loginEvent}>Sign In With Google</Button>
        </div>
      )}
    </div>
  );
};

export default Login;
