import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React from "react";
import {useUser} from "./../../context/UserProvider"
import styles from "./HomePage.module.css"
import { Link, useNavigate } from "react-router-dom";
import {useState} from "react"
import {
  BackArrowSvg,
  ParticipantsSvg,
  PhChatCenteredDots
} from "../../assets/Svg";

export function HomePage() {
  const { user } = useAuth0();
  const navigate = useNavigate();
    const goToPreviousPath = () => {
        navigate("/")
    }
  const [showModal, setShowModal] = useState(false);
  const {userState: {_id, profilePic}} = useUser();

  const handleModalShow = () => {
      setShowModal(true);
  }

  const handleModalHide = () => {
    setShowModal(false);
  }

  console.log(user);

  // async function createRoom() {
  //   const { } = await axios.post("", {newRoom:})
  // }

  return (
    <div className={styles["home-wrapper"]}>
      <div className={styles["main-content"]}>
      <div className={styles["header"]}>
      <div className={styles["header-lhs"]}>
      <div className={styles["back-btn"]} onClick={goToPreviousPath} ><BackArrowSvg /></div>
          <span className={styles["home-title"]}>Socailley 💬</span>
          </div>
          <div className={styles["header-rhs"]}>
            <Link to={`/profile/${_id}`}> <img className={styles["profile-pic"]} src={`${profilePic}`} alt="avatar profile"></img></Link>
          </div>
      </div>
      <div className={styles["feed"]}>
        <div className={styles["feed-title"]}>
          Join Rooms
        </div>
        <div className={styles["rooms"]}>
            <div className={styles["room-card"]}>
              <div className={styles["room-title"]}>
                React Developer Meetup
              </div>
              
              <div className={styles["moderator"]}>
              <div class="flex flex-wrap -space-x-1 overflow-hidden">
                <div className={styles["moderator-avatar-stack"]}>
                  <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""></img>
                  <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""></img>
                  <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""></img>
                </div>
                
              </div>
              <div className={styles["moderator-names"]}>
                Moderator1, Moderator 2
              </div>
              
              </div>
              <div className={styles["room-topic"]}>
              <button>
                JavaScript
              </button>
              </div>
              <div className={styles["room-stats"]}>
                <div className={styles["room-participants"]}>
                <ParticipantsSvg /> <div>50</div>
                </div>
                <div className={styles["room-chatters"]}>
                <PhChatCenteredDots /> <div>20</div>
                </div>
              </div>
            </div>
            <div className={styles["room-card"]}>
              <div className={styles["room-title"]}>
                React Developer Meetup
              </div>
              
              <div className={styles["moderator"]}>
              <div class="flex flex-wrap -space-x-1 overflow-hidden">
                <div className={styles["moderator-avatar-stack"]}>
                  <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""></img>
                  <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""></img>
                  <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""></img>
                </div>
                
              </div>
              <div className={styles["moderator-names"]}>
                Moderator1, Moderator 2
              </div>
              
              </div>
              <div className={styles["room-topic"]}>
              <button>
                JavaScript
              </button>
              </div>
              <div className={styles["room-stats"]}>
                <div className={styles["room-participants"]}>
                <ParticipantsSvg /> <div>50</div>
                </div>
                <div className={styles["room-chatters"]}>
                <PhChatCenteredDots /> <div>20</div>
                </div>
              </div>
            </div>
            <div className={styles["room-card"]}>
              <div className={styles["room-title"]}>
                React Developer Meetup
              </div>
              
              <div className={styles["moderator"]}>
              <div class="flex flex-wrap -space-x-1 overflow-hidden">
                <div className={styles["moderator-avatar-stack"]}>
                  <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""></img>
                  <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""></img>
                  <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""></img>
                </div>
                
              </div>
              <div className={styles["moderator-names"]}>
                Moderator1, Moderator 2
              </div>
              
              </div>
              <div className={styles["room-topic"]}>
              <button>
                JavaScript
              </button>
              </div>
              <div className={styles["room-stats"]}>
                <div className={styles["room-participants"]}>
                <ParticipantsSvg /> <div>50</div>
                </div>
                <div className={styles["room-chatters"]}>
                <PhChatCenteredDots /> <div>20</div>
                </div>
              </div>
            </div>
            <div className={styles["room-card"]}>
              <div className={styles["room-title"]}>
                React Developer Meetup
              </div>
              
              <div className={styles["moderator"]}>
              <div class="flex flex-wrap -space-x-1 overflow-hidden">
                <div className={styles["moderator-avatar-stack"]}>
                  <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""></img>
                  <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""></img>
                  <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""></img>
                </div>
                
              </div>
              <div className={styles["moderator-names"]}>
                Moderator1, Moderator 2
              </div>
              
              </div>
              <div className={styles["room-topic"]}>
              <button>
                JavaScript
              </button>
              </div>
              <div className={styles["room-stats"]}>
                <div className={styles["room-participants"]}>
                <ParticipantsSvg /> <div>50</div>
                </div>
                <div className={styles["room-chatters"]}>
                <PhChatCenteredDots /> <div>20</div>
                </div>
              </div>
            </div>
        </div>
      </div>
      </div>
      <div className={styles["create-room"]}>
        <button onClick={handleModalShow}>Create Room</button>
      </div>
      <div className={showModal ? styles["create-room-modal"]: styles["create-room-modal-hidden"] }>
        <button onClick={handleModalHide}>Close</button>
      <input />
      <textarea />
    </div>
    </div>
    
  );
}
