import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  onSnapshot,
  doc,
  collection,
  orderBy,
  query,
} from "firebase/firestore";

import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";

import { useStateValue } from "../../context/StateProvider";
import db, { createMessage } from "../../firebaseConfig";

import ChatMoreOptions from "../chatMoreOptions/ChatMoreOptions";
import Loading from "../loading/Loading";

import {groupByDate} from "../../utils/groupByDate";

import "./Chat.css";

function Chat() {
  const [input, setInput] = useState("");
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  let { roomId } = useParams();
  const [{ user, isLoading }] = useStateValue();

  const [isMoreOptionsShown, setIsMoreOptionsShown] = useState(false);

  useEffect(() => {
    let unsubscribe = false;
    if (roomId) {
      let collectionRef = collection(db, "rooms");
      let docRef = doc(collectionRef, roomId);

      onSnapshot(docRef, (snapshot) => {
        setRoom(() => snapshot.data());
      });
      
      const subCollectionRef = collection(docRef, "messages");
      const q = query(subCollectionRef, orderBy("timeStamp", "asc"));
      
      unsubscribe = onSnapshot(q, (snapshot) => {
        let messages = snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }));
        
        // groupByDate(messages)

        setMessages(() => groupByDate(messages));
      });
    }

    return () => unsubscribe;
  }, [roomId]);

  const sendMessage = (event) => {
    event.preventDefault();
    //db stuff
    createMessage(roomId, input, user.displayName);
    setInput(() => "");
  };

  const scrollToLastMessage = () => {
    const element = document.getElementById("LastMessage");
    element.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    });
  }
  const toggleMoreOptions = () => {
    setIsMoreOptionsShown(state => !state);
  }

  let lastSeen = messages[messages.length - 1]?.message?.timeStamp?.toDate();
  lastSeen = lastSeen ? new Date(lastSeen).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : "";

  if(isLoading) {
    return <div className="loading-container">
      <Loading/>
    </div>
  }

  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar src="https://api.dicebear.com/6.x/adventurer/svg?seed=Midni{Math.random()}&backgroundColor=d1d4f9,c0aede,b6e3f4,ffd5dc,ffdfbf" />
        <div className="chat-header-info">
          <h3>{room && room.name}</h3>
          <p>Last seen at{" "} {lastSeen}</p>
        </div>
        <div className="chat-header-right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton onClick={toggleMoreOptions}>
            <MoreVert />
          </IconButton>
        </div>
        {
          isMoreOptionsShown && <ChatMoreOptions roomId={roomId} onCloseMoreOptions={toggleMoreOptions} />
        }

      </div>
      <div className="chat-body">
        {
          Object.keys(messages).map((date, index) => {
            return (
              <>
                <p className="chat-date">{date}</p>
                {messages[date].map(({ id, message }, index) => {
        
                  let isLastIndex = index === Object.keys(messages).length - 1;
                  if (isLastIndex) setTimeout(scrollToLastMessage);

                  let time = "Loading...";
                  if (message.timeStamp) {
                    time = new Date(message.timeStamp?.toDate()).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                  }
        
                  return (
                    <p
                      key={id}
                      className={`chat-message ${user.displayName === message.name && "chat-receiver"
                        }`}
                    >
                      <span className="chat-name">{message.name}</span>
                      {message.message}
                      <span className="time-stamp">{time}</span>
                    </p>
                  );
                })}
              </>
            )
          })
        }
        <div id="LastMessage"></div>
      </div>
      <div className="chat-footer">
        <InsertEmoticon />
        <form onSubmit={sendMessage}>
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button type="submit">Send</button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
