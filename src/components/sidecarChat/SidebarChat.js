import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Avatar } from "@mui/material";

import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import db, { createRoom } from "../../firebaseConfig";

import "./SidebarChat.css";

const SidebarChat = ({ addNewChat, room }) => {
  const [lastMessage, setLastMessage] = useState(null);
  const randomAvatarGeneratorApi = (id) => `https://api.dicebear.com/6.x/adventurer/svg?seed=Midni${id}&backgroundColor=d1d4f9,c0aede,b6e3f4,ffd5dc,ffdfbf`;

  useEffect(()=>{

  if(room) {
    let collectionRef = collection(db, "rooms");
    let docRef = doc(collectionRef, room.id);
    const subCollectionRef = collection(docRef, "messages");
    const q = query(subCollectionRef, orderBy("timeStamp", "desc"));
    
    let unsubscribe = onSnapshot(q, (snapshot) => {
      let messages = snapshot.docs.map((doc) => ({id:doc.id, message:doc.data()}));
      setLastMessage(() => messages[0]?.message);
      return unsubscribe;
    });
  }

  }, [])

  const createChat = () => {
    const roomName = prompt("Please enter a name for chat");

    if (roomName) {
      // database stuff
      createRoom(roomName);
    }
  };

  return !addNewChat ? (
    <Link to={`rooms/${room.id}`}>
      <div className="sidebar-chat">
        <Avatar src={randomAvatarGeneratorApi(room.id)} />
        <div className="sidebar-chat-info">
          <h1>{room.data.name}</h1>
          <p>{lastMessage?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebar-chat" onClick={createChat}>
      <h2>Add new chat</h2>
    </div>
  );
};

export default SidebarChat;
