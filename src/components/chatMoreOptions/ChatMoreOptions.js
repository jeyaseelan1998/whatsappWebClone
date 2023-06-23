import React from 'react'

import "./ChatMoreOptions.css";
import { deleteRoom } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../context/StateProvider';

import { actionTypes } from "../../context/reducer";

function ChatMoreOptions({ onCloseMoreOptions, roomId }) {
  const navigation = useNavigate();
  const [, dispatch] = useStateValue();

  const onDeleteChatRoom = async () => {
    dispatch({ type: actionTypes.SET_LOADING_STATE, isLoading: true });
    await deleteRoom(roomId);
    navigation('/');
    setTimeout(
      () => dispatch({ type: actionTypes.SET_LOADING_STATE, isLoading: false })
    )
  }
  
  return (
    <div className='chat-more-options-container'>
      <p className='option delete' onClick={onDeleteChatRoom}>Delete group</p>
      <p className='option close' onClick={() => onCloseMoreOptions()}>Close</p>
    </div>
  )
}

export default ChatMoreOptions;