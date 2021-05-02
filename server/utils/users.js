const users = []; // db // 1 2 3
const mongoose = require("mongoose");
const { Room } = require("../models/room.model");
const { User } = require("../models/user.model");
// Join User to chat

const userJoin = async (userId, roomId) => {
  //   const user = { userId, roomId };

  console.log(Room);
  console.log(User);

  // User.findOne({ _id: "55822f34a8394683dd015888" });

  //   const room = await Room.findOne({ _id: roomId });
  //   const user = await User.findOne({ _id: userId });

  const room = await Room.findById(roomId);
  const user = await User.findById(userId);

  console.log(room);
  console.log(user);

  if (room && user) {
    room.participants.push(user);
    const savedRoom = await room.save();
    return { savedRoom, user };
  }
};

// Get the current user

function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// User leaves chat
function userLeave(userId) {
  users = users.filter((user) => user.userId !== userId);
  return userId;
}

// Get room users

function getRoomUsers(roomId) {
  return users.filter((user) => user.roomId == roomId);
}

module.exports = {
  userJoin,
  getCurrentUser,
  getRoomUsers,
  userLeave,
};
