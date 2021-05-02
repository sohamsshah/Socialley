import React from "react";
import styles from "./RoomCard.module.css";
import { ParticipantsSvg, PhChatCenteredDots } from "./../../assets/Svg";

function RoomCard({ page, topic, moderators, participants }) {
  return (
    <div className={styles["room-card"]}>
      <div className={styles["room-title"]}>{topic}</div>

      <div className={styles["moderator"]}>
        <div className="flex flex-wrap -space-x-1 overflow-hidden">
          <div className={styles["moderator-avatar-stack"]}>
            <img
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            ></img>
            <img
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            ></img>
            <img
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            ></img>
          </div>
        </div>
        <div className={styles["moderator-names"]}>
          {moderators.map((user) => (
            <span>{user}, </span>
          ))}
        </div>
      </div>
      <div className={styles["room-stats"]}>
        <div className={styles["room-participants"]}>
          <ParticipantsSvg /> <div>{participants.length}</div>
        </div>

        {page === "home" ? (
          <div className={styles["room-chatters"]}>
            <PhChatCenteredDots /> <div>{participants.length}</div>
          </div>
        ) : (
          ""
        )}
      </div>
      {page === "profile" ? (
        <div className={styles["room-saved"]}>Saved on 2 May 2021</div>
      ) : (
        ""
      )}
    </div>
  );
}

export default RoomCard;
