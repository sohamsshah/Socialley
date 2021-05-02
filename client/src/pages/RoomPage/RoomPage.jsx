import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const goToPreviousPath = () => {
    navigate("/home");
  };
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
      if (scroll?.current) {
        scroll.current.scrollIntoView({ behavior: "smooth" });
      }
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
          <div className={styles["back-btn"]} onClick={goToPreviousPath}>
            <BackArrowSvg />
          </div>
          <span className={styles["room-title"]}>{roomState.topic}</span>
        </div>
        <div className={styles["header-rhs"]}>
          <button className={styles["btn-raise-hand"]}>
            <RaiseHandSvg />
            {/* {roomState.moderators.find((item) =>
              item._id === userState._id ? (
                <span className={styles["badge-raise-hand"]}></span>
              ) : (
                <div></div>
              )
            )} */}
          </button>
          <button onClick={() => setShowParticipants(!showParticipants)}>
            <ParticipantsSvg />
          </button>
        </div>
      </div>
      <div className={styles["chat-container"]}>
        {roomState.chat &&
          roomState.chat.map((message) => (
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
