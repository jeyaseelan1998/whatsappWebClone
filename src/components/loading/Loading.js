import React from 'react'
import { Player } from "@lottiefiles/react-lottie-player";
import loading_lottie_file from '../../lottie_files/loading_gray.json';


function Loading() {
  return (
    <Player
        autoplay
        loop
        src={loading_lottie_file}
      >
      </Player>
  )
}

export default Loading