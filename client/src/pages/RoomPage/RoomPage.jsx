import React from "react";
import io from "socket.io-client";
import {useEffect} from "react"
import {useUser} from "./../../context/UserProvider"

export function RoomPage() {
  const socket = io.connect("https://socialley.herokuapp.com/", {
    transports: ["websocket"],
  });
  const {userState} = useUser();
  console.log(userState);
  const userId = userState.data
  console.log(userId);
  const roomId = 1;
  useEffect(() => { 
    // socket.emit('joinRoom', { userId, roomId });
    //     socket.on('roomUsers', ({ room, users }) => {
    //     console.log(room, users);
    //     });
    //     socket.on('message', (message) => {
    //         console.log(message);
    //     })
      })
  return <div>Hello</div>;
}
