import React from "react";
import { CloseButtonSvg } from "../../assets/Svg";
import { useRoom } from "../../context/RoomProvider";
import styles from "./Participants.module.css";

export const Participants = ({ setShowParticipants }) => {
  const { roomState } = useRoom();

  return (
    <div className={styles["participants"]}>
      <div className={styles["participants-heading"]}>
        <h2 className="text-4xl font-bold">In Room</h2>
        <button onClick={() => setShowParticipants(false)}>
          <CloseButtonSvg />
        </button>
      </div>
      <h3 className="text-3xl font-medium py-4">Moderators</h3>
      <div>
        {roomState.moderators.map(({ _id, username }) => {
          return (
            <div key={_id}>
              <p className="text-2xl">{username}</p>
            </div>
          );
        })}
      </div>
      <h3 className="text-3xl font-medium py-4">Stage</h3>
      <div>
        {roomState.stage.map(({ _id, username }) => {
          return (
            <div key={_id}>
              <p className="text-2xl">{username}</p>
            </div>
          );
        })}
      </div>
      <h3 className="text-3xl font-medium py-4">Participants</h3>
      <div>
        {roomState.stage.map(({ _id, username }) => {
          return (
            <div key={_id}>
              <p className="text-2xl">{username}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
