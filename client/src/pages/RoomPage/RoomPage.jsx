import React, { useEffect, useRef, useState } from "react";
import styles from "./RoomPage.module.css";
import { useUser } from "./../../context/UserProvider";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useRoom } from "../../context/RoomProvider";

import {
  BackArrowSvg,
  RaiseHandSvg,
  ParticipantsSvg,
  SendSvg,
} from "../../assets/Svg";

export function RoomPage() {
  let textAreaRef = useRef(null);
  const [text, setText] = useState("");
  const socket = io.connect("http://localhost:8080/", {
    transports: ["websocket"],
  });
  const { userState } = useUser();
  const userId = userState._id;
  const { roomId } = useParams();
  const { roomState, roomDispatch } = useRoom();

  console.log(roomState);

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
        console.log(response);
        if (response.status === 200) {
          const savedRoom = response.data.room;
          socket.emit("joinRoom", { userId, roomId });
          roomDispatch({ type: "ADD_ROOM", payload: savedRoom });
        }
      } catch (error) {
        console.log(error);
      }
    })();

    // socket.on("message", (message) => {
    //   console.log(message);
    // });
  }, []);

  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "35px";
      textAreaRef.style.height = textAreaRef.scrollHeight + "px";
    }
  }, [text]);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles["header-lhs"]}>
          <BackArrowSvg />
          <span className={styles["room-title"]}>Room Title</span>
        </div>
        <div className={styles["header-rhs"]}>
          <RaiseHandSvg />
          <ParticipantsSvg />
        </div>
      </div>
      <div className={styles["chat-container"]}>
        <div className={styles["chat-others"]}>
          <div className={styles["chat-name"]}>Jonh Doe</div>
          <div className={styles["chat-message"]}>
            Lorem ipsum dolor, sit amet consect etur adipisicing elit.
          </div>
          <div className={styles["chat-time"]}>12:34pm</div>
        </div>
        <div className={styles["chat-user"]}>
          <div className={styles["chat-name"]}>Jonh Doe</div>
          <div className={styles["chat-message"]}>
            Lorem ipsum dolor, sit amet consect etur adipisicing elit.
          </div>
          <div className={styles["chat-time"]}>12:34pm</div>
        </div>
        <div className={styles["chat-user"]}>
          <div className={styles["chat-name"]}>Jonh Doe</div>
          <div className={styles["chat-message"]}>
            Lorem ipsum dolor, sit amet consect etur adipisicing elit.
          </div>
          <div className={styles["chat-time"]}>12:34pm</div>
        </div>
        <div className={styles["chat-user"]}>
          <div className={styles["chat-name"]}>Jonh Doe</div>
          <div className={styles["chat-message"]}>
            Lorem ipsum dolor, sit amet consect etur adipisicing elit.
          </div>
          <div className={styles["chat-time"]}>12:34pm</div>
        </div>
        <div className={styles["chat-user"]}>
          <div className={styles["chat-name"]}>Jonh Doe</div>
          <div className={styles["chat-message"]}>
            Lorem ipsum dolor, sit amet consect etur adipisicing elit.
          </div>
          <div className={styles["chat-time"]}>12:34pm</div>
        </div>
        <div className={styles["chat-user"]}>
          <div className={styles["chat-name"]}>Jonh Doe</div>
          <div className={styles["chat-message"]}>
            Lorem ipsum dolor, sit amet consect etur adipisicing elit.
          </div>
          <div className={styles["chat-time"]}>12:34pm</div>
        </div>
        <div className={styles["chat-user"]}>
          <div className={styles["chat-name"]}>Jonh Doe</div>
          <div className={styles["chat-message"]}>
            Lorem ipsum dolor, sit amet consect etur adipisicing elit.
          </div>
          <div className={styles["chat-time"]}>12:34pm</div>
        </div>
        <div className={styles["chat-user"]}>
          <div className={styles["chat-name"]}>Jonh Doe</div>
          <div className={styles["chat-message"]}>
            Lorem ipsum dolor, sit amet consect etur adipisicing elit.
          </div>
          <div className={styles["chat-time"]}>12:34pm</div>
        </div>
      </div>
      <div className={styles.footer}>
        <textarea
          placeholder="Type a message"
          className={styles["text-box"]}
          ref={(ref) => (textAreaRef = ref)}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <span className={styles["send-button"]}>
          <SendSvg />
        </span>
      </div>
    </div>
  );
}
