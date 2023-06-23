import React from "react";
import { Button } from "@mui/material";

import Loading from "../loading/Loading";

import { signInithGooglePopup } from "../../firebaseConfig";

import { useStateValue } from "../../context/StateProvider";
import { actionTypes } from "../../context/reducer";

import "./Login.css";

const Login = () => {
  const [{ isLoading }, dispatch] = useStateValue();

  const loginEvent = async () => {
    dispatch({ type: actionTypes.SET_LOADING_STATE, isLoading: true });
    const user = await signInithGooglePopup();
    dispatch({ type: actionTypes.SET_USER, user });
    dispatch({ type: actionTypes.SET_LOADING_STATE, isLoading: false });
  };

  const loginWithMobile = event => {
    event.preventDefault();
  }

  return (
    <div className="login">
      <div className="login-container">
        {
          isLoading ? <Loading /> : <>
            <img
              src="https://res.cloudinary.com/dktwlx0dz/image/upload/v1686468269/whatsapp_clone_bi8s1l.png"
              alt="whatsapp logo"
            />
            <form className="mobile-login-form" onSubmit={loginWithMobile}>
              <input placeholder="Mobile number" />
              <Button type="submit" className="phone-login-button" >Mobile Login</Button>
              <Button className="google-sign-in-button" onClick={loginEvent}>Sign In With Google</Button>
            </form>
          </>
        }

      </div>
    </div>
  );
};

export default Login;
