import React from "react";
import { BackArrowSvg } from "../../assets/Svg";
import { useRoom } from "../../context/RoomProvider";
import styles from "./RaisedHands.module.css";

export const RaisedHands = ({ setShowRaisedHand }) => {
  const { roomState } = useRoom();

  console.log(roomState);

  return (
    <div className={styles["participants"]}>
      <div className={styles["participants-heading"]}>
        <h2 className="text-4xl font-bold">In Room</h2>
        <button onClick={() => setShowRaisedHand(false)}>
          <BackArrowSvg />
        </button>
      </div>
      <h3 className="text-3xl font-medium py-4">Raised Hands</h3>
      <div>
        {roomState.raisedHand.map(({ _id, username }) => {
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
