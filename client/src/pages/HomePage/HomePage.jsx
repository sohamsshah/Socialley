import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRoom } from "../../context/RoomProvider";
import { useUser } from "../../context/UserProvider";
import {useAuth0} from "@auth0/auth0-react"
import styles from "./HomePage.module.css";
import {
  BackArrowSvg,
  ParticipantsSvg,
  PhChatCenteredDots,
  CloseButtonSvg,
} from "../../assets/Svg";

export function HomePage() {
  const { user } = useAuth0();
  const navigate = useNavigate();
    const goToPreviousPath = () => {
        navigate("/")
    }
  const [showModal, setShowModal] = useState(false);
  const { roomDispatch } = useRoom();
  const { userState } = useUser();
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const {
          data: { rooms },
        } = await axios.get("http://localhost:8080/room");
        setRooms(rooms);
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalHide = () => {
    setShowModal(false);
  };

  async function createRoom() {
    console.log(userState);
    try {
      const {
        data: { room },
      } = await axios.post("http://localhost:8080/room", {
        newRoom: {
          topic: topic,
          description: description,
          moderators: [{ ...userState, isPresent: true }],
          participants: [],
          stage: [],
          raisedHand: [],
          chat: [],
          isSaved: false,
          savedTime: null,
        },
      });
      roomDispatch({ type: "ADD_ROOM", payload: room });
      setTopic("");
      setDescription("");
      navigate(`/room/${room._id}`);
    } catch (error) {
      console.log({ error });
    }
  }

  function joinRoom(room) {
    roomDispatch({ type: "ADD_ROOM", payload: room });
    navigate(`/room/${room._id}`);
  }

  return (
    <div className={styles["home-wrapper"]}>
      <div className={styles["main-content"]}>
      <div className={styles["header"]}>
      <div className={styles["header-lhs"]}>
      <div className={styles["back-btn"]} onClick={goToPreviousPath} ><BackArrowSvg /></div>
          <span className={styles["home-title"]}>Socailley 💬</span>
          </div>
          <div className={styles["header-rhs"]}>
            <Link to={`/profile/${userState._id}`}> <img className={styles["profile-pic"]} src={`${userState.profilePic}`} alt="avatar profile"></img></Link>
          </div>
        </div>
        <div className={styles["feed"]}>
          <div className={styles["feed-title"]}>Join Rooms</div>
          <div className={styles["rooms"]}>
            {rooms.map((room) => (
              <Link to={`/room/${room._id}`}>
                <div
                  className={styles["room-card"]}
                  key={room._id}
                  onClick={() => joinRoom(room)}
                >
                  <div className={styles["room-title"]}>{room.topic}</div>

                  <div className={styles["moderator"]}>
                    <div className="flex flex-wrap -space-x-1 overflow-hidden">
                      <div className={styles["moderator-avatar-stack"]}>
                        <img
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          // src={room.moderators[0]?.profilePic}
                          alt=""
                        ></img>
                        <img
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          // src={room.moderators[1]?.profilePic}
                          alt=""
                        ></img>
                        <img
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          // src={room.moderators[2]?.profilePic}
                          alt=""
                        ></img>
                      </div>
                    </div>
                    <div className={styles["moderator-names"]}>
                      {/* {`by ${room.moderators[0].username}`} */}
                    </div>
                  </div>
                  <div className={styles["room-stats"]}>
                    <div className={styles["room-participants"]}>
                      <ParticipantsSvg /> <div>{room.participants.length}</div>
                    </div>
                    <div className={styles["room-chatters"]}>
                      <PhChatCenteredDots /> <div>{room.stage.length}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={styles["create-room"]}>
        <button onClick={handleModalShow}>Create Room</button>
      </div>
      <div
        className={
          showModal
            ? styles["create-room-modal"]
            : styles["create-room-modal-hidden"]
        }
      >
        <div className={styles["modal-container"]}>
          <button
            onClick={handleModalHide}
            className={styles["modal-close-button"]}
          >
            <CloseButtonSvg />
          </button>
          <input
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Room Name"
            className={styles["modal-title"]}
            value={topic}
          />
          <textarea
            placeholder="Room Description"
            className={styles["modal-description"]}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <button
            className={styles["modal-create-button"]}
            onClick={() => {
              createRoom();
              handleModalHide();
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
