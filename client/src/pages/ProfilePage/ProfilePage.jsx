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
    const [fetchedUser, setFetchedUser] = useState({});
    const [userData, setUserData] = useState({})
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

    const editData = async () => {
      setFetchedUser(userData);
      try {
        const {
          data: { room },
        } = await axios.post("https://socialley.sohamsshah.repl.co/user", {});
      } catch (error) {
        console.log({ error });
      }
    }
    
    
    useEffect(() => {
        (async () => {
            try {
              const {data: {user}} = await axios.get(`http://localhost:8080/user/${_id}`);
              user.bio = "Hello World! I love Socialley"
              setUserData({bio: user.bio, email:user.email, profilePic: user.profilePic, username:user.username})
              setFetchedUser(user);
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
            <img src={fetchedUser.profilePic} />
            <div className={styles["profile-details-username"]}>@{fetchedUser.username}</div>
            <div className={styles["profile-details-stats"]}>
            <div className={styles["profile-details-followers"]}>
                <span className={styles["followers-text"]}>Followers </span><span className={styles["stats-data"]}>{(fetchedUser.followers) ? fetchedUser.followers.length : ""}</span>
            </div>
            <div className={styles["profile-details-following"]}>
            <span className={styles["following-text"]}>Following </span> <span className={styles["stats-data"]}>{(fetchedUser.following) ? fetchedUser.following.length : ""}</span> 
            </div>
            </div>
            <div className={styles["CTA-btn"]}>
                {(isUserProfile) ? <button onClick={handleModalShow}>Edit</button> : <button>Follow</button>}
                
            </div>
            <div className={styles["profile-bio"]}>
                {fetchedUser.bio}
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
            onChange={(e) => setUserData({...userData, username:e.target.value})}
            placeholder="Username"
            className={styles["modal-title"]}
            value={userData.username}
          />
          <input
            onChange={(e) => setUserData({...userData, email:e.target.value})}
            placeholder="Email"
            className={styles["modal-title"]}
            value={userData.email}
          />
          <input
            onChange={(e) => setUserData({...userData, profilePic:e.target.value})}
            placeholder="Profile Pic"
            className={styles["modal-title"]}
            value={userData.profilePic}
          />
          <textarea
            placeholder="Bio"
            className={styles["modal-description"]}
            onChange={(e) => setUserData({...userData, bio:e.target.value})}
            value={userData.bio}
          />
          <button
            className={styles["modal-create-button"]}
            onClick={() => {
              editData();
              handleModalHide();
            }}
          >
            Update
          </button>
        </div>
      </div>
            
        </div>
    )
}


