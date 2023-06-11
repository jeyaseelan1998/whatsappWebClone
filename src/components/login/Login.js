import React from "react";
import { Button } from "@mui/material";

import { signInithGooglePopup } from "../../firebaseConfig";

import { useStateValue } from "../../context/StateProvider";
import { actionTypes } from "../../context/reducer";
import "./Login.css";

const Login = () => {
  const [state, dispatch] = useStateValue();

  const loginEvent = async () => {
    const user = await signInithGooglePopup();
    dispatch({ type: actionTypes.SET_USER, user });
  };

  return (
    <div className="login">
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
    </div>
  );
};

export default Login;
