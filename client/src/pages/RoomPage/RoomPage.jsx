import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./RoomPage.module.css";
import { useRoom } from "../../context/RoomProvider";
import { useUser } from "../../context/UserProvider";
import {
  BackArrowSvg,
  RaiseHandSvg,
  ParticipantsSvg,
  SendSvg,
} from "../../assets/Svg";
import { Participants } from "../../components/Participants/Participants";

const socket = io.connect("http://localhost:8080", {
  transports: ["websocket"],
});

export function RoomPage() {
  let textAreaRef = useRef(null);
  const { roomId } = useParams();
  const { roomState, roomDispatch } = useRoom();
  const { userState } = useUser();
  const [text, setText] = useState("");
  const [showParticipants, setShowParticipants] = useState(false);
  const scroll = useRef();

  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "35px";
      textAreaRef.style.height = textAreaRef.scrollHeight + "px";
    }
  }, [text]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/room/${roomId}`,
          {
            roomUpdates: {
              participants: [
                ...roomState.participants,
                { ...userState, isPresent: true },
              ],
            },
          }
        );
        const savedRoom = response.data.room;
        socket.emit("joinRoom", { userId: userState._id, roomId });
        roomDispatch({ type: "ADD_ROOM", payload: savedRoom });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log({ roomState });

  useEffect(() => {
    (async function () {
      try {
        const {
          data: { room },
        } = await axios.get(`http://localhost:8080/room/${roomId}`);
        roomDispatch({ type: "ADD_ROOM", payload: room });
      } catch (error) {
        console.log({ error });
      }
    })();
    socket.on("message", ({ message }) => {
      console.log(message);
      roomDispatch({ type: "ADD_MESSAGE", payload: message });
    });
  }, []);

  async function sendMessage() {
    const message = {
      userId: userState._id,
      message: text,
      time: Date.now(),
    };
    try {
      const res = await axios.post(`http://localhost:8080/room/${roomId}`, {
        roomUpdates: { chat: [...roomState.chat, message] },
      });
      if (res.status === 200) {
        socket.emit("message", { roomId, message });
      }
      scroll.current.scrollIntoView({ behavior: "smooth" });
      setText("");
    } catch (error) {
      console.log({ error });
    }
  }

  function sendMessageOnEnter(e) {
    if (e.code === "Enter" && text !== "") {
      e.preventDefault();
      scroll.current.scrollIntoView({ behavior: "smooth" });
      sendMessage();
    }
  }

  return (
    <div>
      {showParticipants && (
        <Participants setShowParticipants={setShowParticipants} />
      )}
      <div className={styles.header}>
        <div className={styles["header-lhs"]}>
          <BackArrowSvg />
          <span className={styles["room-title"]}>{roomState.topic}</span>
        </div>
        <div className={styles["header-rhs"]}>
          <RaiseHandSvg />
          <button onClick={() => setShowParticipants(!showParticipants)}>
            <ParticipantsSvg />
          </button>
        </div>
      </div>
      <div className={styles["chat-container"]}>
        {roomState.chat.map((message) => (
          <div
            className={
              message.userId === userState._id
                ? styles["chat-user"]
                : styles["chat-others"]
            }
          >
            <div className={styles["chat-name"]}>Jonh Doe</div>
            <div className={styles["chat-message"]}>{message.message}</div>
            <div className={styles["chat-time"]}>12:34pm</div>
          </div>
        ))}
        <div ref={scroll}></div>
      </div>
      <div className={styles.footer}>
        <textarea
          placeholder="Type a message"
          className={styles["text-box"]}
          ref={(ref) => (textAreaRef = ref)}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={sendMessageOnEnter}
        ></textarea>
        <span className={styles["send-button"]} onClick={sendMessage}>
          <SendSvg />
        </span>
      </div>
    </div>
  );
}
