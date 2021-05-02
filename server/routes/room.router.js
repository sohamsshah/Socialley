// post new room
// get all rooms
// get single room with id
// delete single room with id
// post update room with id
const express = require("express");
const router = express.Router();
const { Room } = require("../models/room.model");
const { extend } = require("lodash");

const normalizeData = (array) => {
  return array.map((item) => {
    const { _id, userId, isPresent } = item;
    return {
      _id,
      userId: { ...userId._doc, isPresent },
    };
  });
};

router
  .route("/")
  .get(async (req, res) => {
    try {
      const rooms = await Room.find({});
      res
        .status(200)
        .json({ rooms: rooms, success: true, message: "Successful" });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: "Error while retrieving rooms",
        errorMessage: error.message,
      });
    }
  })
  .post(async (req, res) => {
    const { topic, description, visibility, user } = req.body;
    // const {
    //   newRoom: { topic, description, visibility, user },
    // } = req.body;
    try {
      const newRoomFromDB = new Room({
        topic,
        description,
        visibility,
        isSaved: false,
        canRaiseHand: true,
        moderators: [user],
      });
      await newRoomFromDB.save();
      res
        .status(200)
        .json({ room: newRoomFromDB, success: true, message: "Successful" });
    } catch (error) {
      res.status(400).json({ message: "Unable to create a room" });
    }
  });

router.param("roomId", async (req, res, next, roomId) => {
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(400).json({ message: "Room not found" });
    }
    req.room = room;
    next();
  } catch (error) {
    res.status(400).json({ message: "Couldn't reterive your data" });
  }
});

router
  .route("/:roomId")
  .get(async (req, res) => {
    const room = req.room;
    res.status(200).json({
      room,
      success: true,
      message: "Successful",
    });
  })
  .post(async (req, res) => {
    const roomUpdates = req.body;
    let room = req.room;
    room = extend(room, roomUpdates);
    room = await room.save();
    res.status(200).json({
      room,
      success: true,
      message: "Successful",
    });
  })
  .delete(async (req, res) => {
    let room = req;
    room = await room.remove();
    res.json({ room, success: true, message: "Successful" });
  });

module.exports = router;
