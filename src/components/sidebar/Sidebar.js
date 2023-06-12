import React, { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MessageIcon from "@mui/icons-material/Message";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import SidebarChat from "../sidecarChat/SidebarChat";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import db, {signOutAccount} from "../../firebaseConfig";

import "./Sidebar.css";
import { useStateValue } from "../../context/StateProvider";
import { LogoutTwoTone } from "@mui/icons-material";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{user}] = useStateValue();

  useEffect(() => {
    let q = query(collection(db, "rooms"), orderBy("name", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let rooms = querySnapshot.docs.map((doc) => ({id:doc.id, data:doc.data()}));
      setRooms(()=>rooms);
    });
    return () => unsubscribe;
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar src={user.photoURL} title={user.displayName} onClick={() => console.log(user.photoURL)}/>
        <div className="sidebar-header-right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <MessageIcon />
          </IconButton>
          <IconButton onClick={signOutAccount}>
            <LogoutTwoTone/>
          </IconButton>
        </div>
      </div>

      <div className="sidebar-search">
        <div className="sidebar-search-container">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>

      <div className="sidebar-chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
