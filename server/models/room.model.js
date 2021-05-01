const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema(
  {
    createdAt: Number,
    updatedAt: Number,
    topic: {
      type: String,
      required: [true, "Topic is required"],
      unique: true,
    },
    description: {
      type: String,
      max: 400,
    },
    visibility: {
      type: String,
      enum: {
        values: ["Public", "Private", "My Circle"],
        message: "{VALUE} is not supported",
      },
    },
    isSaved: Boolean,
    savedTime: Date,
    canRaiseHand: Boolean,
    moderators: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        isPresent: Boolean,
      },
    ],
    participants: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        isPresent: Boolean,
      },
    ],
    stage: [{ userId: { type: Schema.Types.ObjectId, ref: "User" } }],
    raisedHand: [{ userId: { type: Schema.Types.ObjectId, ref: "User" } }],
    chat: [{ chatId: { type: Schema.Types.ObjectId, ref: "Chat" } }],
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

const Room = mongoose.model("Room", RoomSchema);

module.exports = { Room };
