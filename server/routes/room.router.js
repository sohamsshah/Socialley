// post new room
// get all rooms
// get single room with id
// delete single room with id
// post update room with id
const express = require("express");
const router = express.Router();
const { Room } = require("../models/room.model");
const { extend, countBy } = require("lodash");

const normalizeData = (array) => {
  return array.map((item) => {
    const { _id, userId, isPresent } = item;
    return {
      _id,
      userId: { ...userId._doc, isPresent },
    };
  });
};

console.log("nyy");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const rooms = await Room.find({});
      // const wholeRooms = rooms.map(async (item) => {
      //     console.log(item);
      //     const moderators = await item
      //       .populate("moderators.userId")
      //       .execPopulate();
      //     console.log(moderators);
      //     // const participant = await item
      //     //   .populate("participants.userId")
      //     //   .execPopulate();
      //     // console.log(participant);
      //     // const moderatorsObject = normalizeData(moderators);
      //     // const participantsObject = normalizeData(participants);
      //     // delete item.moderators;
      //     // delete item.participants;
      //     // return {
      //     //   ...item,
      //     //   moderators: moderatorsObject,
      //     //   //   participants: participantsObject,
      //     // };
      //     return {
      //       ...item,
      //       moderators,
      //       //   participants: participantsObject,
      //     };
      //   });
      res
        .status(200)
        .json({ rooms: wholeObj, success: true, message: "Successful" });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: "Error while retrieving rooms",
        errorMessage: error.message,
      });
    }
  })
  .post(async (req, res) => {
    // const { topic, description, visibility, userId } = req.body;
    const {
      newRoom: { topic, description, visibility, userId },
    } = req.body;
    try {
      const newRoomFromDB = new Room({
        topic,
        description,
        visibility,
        isSaved: false,
        canRaiseHand: true,
        moderators: [{ userId, isPresent: true }],
      });
      const savedRoom = await newRoomFromDB.save();
      const wholeModeratorObj = await savedRoom
        .populate("moderators.userId")
        .execPopulate();
      const object = wholeModeratorObj.moderators.map((item) => {
        const { _id, userId, isPresent } = item;
        return {
          _id,
          userId: { ...userId._doc, isPresent },
        };
      });
      delete wholeModeratorObj._doc.moderators;
      res.status(200).json({
        room: {
          ...wholeModeratorObj._doc,
          moderators: object,
        },
      });
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
    try {
      const room = req.room;
      const { moderators } = await room
        .populate("moderators.userId")
        .execPopulate();
      const { participants } = await room
        .populate("participants.userId")
        .execPopulate();
      const moderatorsObject = normalizeData(moderators);
      const participantsObject = normalizeData(participants);
      delete room._doc.moderators;
      delete room._doc.participants;
      res.status(200).json({
        room: {
          ...room._doc,
          moderators: moderatorsObject,
          participants: participantsObject,
        },
        success: true,
        message: "Successful",
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: "Error while retrieving rooms",
        errorMessage: error.message,
      });
    }
  })
  .post(async (req, res) => {
    const roomUpdates = req.body;
    let room = req.room;
    room = extend(room, roomUpdates);
    room = await room.save();
    const { moderators } = await room
      .populate("moderators.userId")
      .execPopulate();
    const { participants } = await room
      .populate("participants.userId")
      .execPopulate();
    const moderatorsObject = normalizeData(moderators);
    const participantsObject = normalizeData(participants);
    delete room._doc.moderators;
    delete room._doc.participants;
    res.json({
      room: {
        ...room._doc,
        moderators: moderatorsObject,
        participants: participantsObject,
      },
      success: true,
    });
  })
  .delete(async (req, res) => {
    let room = req;
    room = await room.remove();
    res.json({ room, success: true });
  });

module.exports = router;

//   const moderatorsObject = moderators.map((item) => {
//     const { _id, userId, isPresent } = item;
//     return {
//       _id,
//       userId: { ...userId._doc, isPresent },
//     };
//   });
