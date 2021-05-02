import React, {useEffect, useState} from 'react'
import styles from "./ProfilePage.module.css"
import axios from "axios";
import RoomCard from "./../../components/RoomCard/RoomCard"
import {useUser} from"./../../context/UserProvider"
import {useParams, useNavigate} from "react-router-dom"
import {
    BackArrowSvg, CloseButtonSvg
  } from "../../assets/Svg";
  

export function ProfilePage() {
    const [user, setUser] = useState({});
    const [userData, setUserData] = useState({bio: user.bio, email:user.email, profilePic: user.profilePic, username:user.username})
    const { userId } = useParams();
    const {userState:{_id, profilePic}} = useUser();
    const isUserProfile = _id === userId;
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const goToPreviousPath = () => {
        navigate("/home")
    }
    const handleModalShow = () => {
      setShowModal(true);
    };
  
    const handleModalHide = () => {
      setShowModal(false);
    };
    
    useEffect(() => {
        (async () => {
            try {
              const {data: {user}} = await axios.get(`http://localhost:8080/user/${_id}`);
              console.log(user)
              user.bio = "Hello World! I love Socialley"
              setUser(user);
            } catch (error) {
              console.log(error);
            }
          })();
        
    }, [])
    return (
        
        <div className={styles["profile-wrapper"]}>
            <div className={styles["header"]}>
      <div className={styles["header-lhs"]}>
          <div className={styles["back-btn"]} onClick={goToPreviousPath} ><BackArrowSvg /></div>
          <span className={styles["profile-title"]}>Socailley 💬</span>
          </div>
          <div className={styles["header-rhs"]}>
            <img className={styles["profile-pic"]} src={profilePic} alt="avatar profile"></img>
          </div>
      </div>
      <div className={styles["profile-details"]}>
          <div className={styles["profile-details-banner"]}>
            <img src={user.profilePic} />
            <div className={styles["profile-details-username"]}>@{user.username}</div>
            <div className={styles["profile-details-stats"]}>
            <div className={styles["profile-details-followers"]}>
                <span className={styles["followers-text"]}>Followers </span><span className={styles["stats-data"]}>{(user.followers) ? user.followers.length : ""}</span>
            </div>
            <div className={styles["profile-details-following"]}>
            <span className={styles["following-text"]}>Following </span> <span className={styles["stats-data"]}>{(user.following) ? user.following.length : ""}</span> 
            </div>
            </div>
            <div className={styles["CTA-btn"]}>
                {(isUserProfile) ? <button onClick={handleModalShow}>Edit</button> : <button>Follow</button>}
                
            </div>
            <div className={styles["profile-bio"]}>
                {user.bio}
            </div>
          </div>
          {
          (isUserProfile) ?
          <div className={styles["saved-chats"]}>
          <div className={styles["saved-chats-title"]}>
                Your Saved Chats
          </div>
                <RoomCard page="profile" topic="React JS" participants={["Soham", "Rohit", "Prerana"]} moderators={["Soham", "Rohit", "Prerana"]}/>
                <RoomCard page="profile" topic="React JS" participants={["Soham", "Rohit", "Prerana"]} moderators={["Soham", "Rohit", "Prerana"]}/>
                <RoomCard page="profile" topic="React JS" participants={["Soham", "Rohit", "Prerana"]} moderators={["Soham", "Rohit", "Prerana"]}/>
          </div> :""
          }
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
            // onChange={(e) => setTopic(e.target.value)}
            placeholder="Room Name"
            className={styles["modal-title"]}
            // value={topic}
          />
          <textarea
            placeholder="Room Description"
            className={styles["modal-description"]}
            // onChange={(e) => setDescription(e.target.value)}
            // value={description}
          />
          <button
            className={styles["modal-create-button"]}
            onClick={() => {
              // createRoom();
              handleModalHide();
            }}
          >
            Create
          </button>
        </div>
      </div>
            
        </div>
    )
}


