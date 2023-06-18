import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Chat from "./components/chat/Chat";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./components/login/Login";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import { useStateValue } from "./context/StateProvider";
import { actionTypes } from "./context/reducer";

import { Player } from "@lottiefiles/react-lottie-player";
import whatsapp_lottie_file from './lottie_files/whatsapp.json';

import "./App.css";

const EmptyPage = () => {
  return (
    <div className="empty-container">
      <Player
        autoplay
        loop
        src={whatsapp_lottie_file}
        className="lottie"
      >
      </Player>
      <p>Start messaging!!!</p>
    </div>
  );
};

function App() {
  const [{ user }, dispatch] = useStateValue();
// console.log(isLoading);
  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: actionTypes.SET_USER, user });
      dispatch({ type: actionTypes.SET_LOADING_STATE, isLoading:false });
    });

    return () => unsubscribe;
  }, []);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app-body">
          <Sidebar />
          <Routes>
            <Route path="/" element={<EmptyPage />} />
            <Route path="/rooms/:roomId" element={<Chat />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
