import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Chat from "./components/chat/Chat";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./components/login/Login";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import { useStateValue } from "./context/StateProvider";
import { actionTypes } from "./context/reducer";
import "./App.css";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: actionTypes.SET_USER, user });
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
            <Route path="/" element={<div className="empty-container"><p>Start messaging!!!</p></div>} />
            <Route path="/rooms/:roomId" element={<Chat />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
