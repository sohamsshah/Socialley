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

const socket = io.connect("http://localhost:8080", {
  transports: ["websocket"],
});

export function RoomPage() {
  let textAreaRef = useRef(null);
  const [text, setText] = useState("");
  const { roomId } = useParams();

  const {
    roomState: { chat, topic },
    roomDispatch,
  } = useRoom();

  const {
    userState: { _id },
  } = useUser();

  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "35px";
      textAreaRef.style.height = textAreaRef.scrollHeight + "px";
    }
  }, [text]);

  useEffect(() => {
    (async function () {
      try {
        const { status, room } = await axios.get(
          `http://localhost:8080/room/${roomId}`
        );
        console.log(room);
        if (status === 2000) {
          roomDispatch({ type: "ADD_ROOM", payload: room });
        }
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
      userId: _id,
      message: text,
      time: Date.now(),
    };
    try {
      const res = await axios.post(`http://localhost:8080/room/${roomId}`, {
        roomUpdates: { chat: [...chat, message] },
      });
      if (res.status === 200) {
        socket.emit("message", { roomId, message });
      }
      setText("");
    } catch (error) {
      console.log({ error });
    }
  }

  function sendMessageOnEnter(e) {
    if (e.code === "Enter" && text !== "") {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={styles["header-lhs"]}>
          <BackArrowSvg />
          <span className={styles["room-title"]}>{topic}</span>
        </div>
        <div className={styles["header-rhs"]}>
          <RaiseHandSvg />
          <ParticipantsSvg />
        </div>
      </div>
      <div className={styles["chat-container"]}>
        {chat.map((message) => (
          <div
            className={
              message.userId === _id
                ? styles["chat-user"]
                : styles["chat-others"]
            }
          >
            <div className={styles["chat-name"]}>Jonh Doe</div>
            <div className={styles["chat-message"]}>{message.message}</div>
            <div className={styles["chat-time"]}>12:34pm</div>
          </div>
        ))}
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
