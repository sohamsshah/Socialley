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
  ExitFromStage,
} from "../../assets/Svg";
import { Participants } from "../../components/Participants/Participants";
import { RaisedHands } from "../../components/RaisedHands/RaisedHands";

const socket = io.connect("https://socialley.sohamsshah.repl.co/", {
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
  const [showRaisedHand, setShowRaisedHand] = useState(false);
  const scroll = useRef();

  console.log(roomState);

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
          `https://socialley.sohamsshah.repl.co/room/${roomId}`,
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
        } = await axios.get(
          `https://socialley.sohamsshah.repl.co/room/${roomId}`
        );
        roomDispatch({ type: "ADD_ROOM", payload: room });
      } catch (error) {
        console.log({ error });
      }
    })();
    socket.on("message", ({ message }) => {
      console.log(message);
      if(message){
      roomDispatch({ type: "ADD_MESSAGE", payload: message });
      }
    });
  }, []);

  async function sendMessage() {
    const message = {
      userId: userState._id,
      message: text,
      time: Date.now(),
    };
    try {
      const res = await axios.post(
        `https://socialley.sohamsshah.repl.co/room/${roomId}`,
        {
          roomUpdates: { chat: [...roomState.chat, message] },
        }
      );
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

  const mod = roomState.moderators.some((item) => item._id === userState._id);
  console.log(mod);

  const participant = roomState.participants.some(
    (item) => item._id === userState._id
  );
  console.log(participant);

  const userInStage = roomState.stage.some(
    (item) => item._id === userState._id
  );
  console.log(userInStage);

  return (
    <div>
      {showParticipants && (
        <Participants setShowParticipants={setShowParticipants} />
      )}
      {showRaisedHand && <RaisedHands setShowRaisedHand={setShowRaisedHand} />}
      <div className={styles.header}>
        <div className={styles["header-lhs"]}>
          <div className={styles["back-btn"]} onClick={goToPreviousPath}>
            <BackArrowSvg />
          </div>
          <span className={styles["room-title"]}>{roomState.topic}</span>
        </div>
        <div className={styles["header-rhs"]}>
          {userInStage ? (
            // if the user is in stage
            <button onClick={() => {}}>
              <ExitFromStage />
            </button>
          ) : (
            <button
              className={styles["btn-raise-hand"]}
              onClick={() => setShowRaisedHand(!showRaisedHand)}
              // if user is participant
              // onClick={participant ? () => addUserToRaisedHand() : () => {}}
              // if user is a moderator (to see raised hands)
              // onClick={mod && roomState.raisedHand ? () => setShowRaisedHand(!showRaisedHand) : () => {}}
            >
              <RaiseHandSvg />
              {mod ? (
                <span className={styles["badge-raise-hand"]}>
                  {roomState.raisedHand.length}
                </span>
              ) : (
                <div></div>
              )}
              {/* {mod && roomState.raisedHand ? (
              <span className={styles["badge-raise-hand"]}>6</span>
            ) : (
              <div></div>
            )} */}
            </button>
          )}
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
