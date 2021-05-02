const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomsSchema = new Schema(
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
    moderators: Array,
    participants: Array,
    stage: Array,
    raisedHand: Array,
    chat: Array,
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

const Room = mongoose.model("Room", RoomsSchema);

module.exports = { Room };
