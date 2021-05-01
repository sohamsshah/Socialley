const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChatSchema = new Schema(
  {
    createdAt: Number,
    updatedAt: Number,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    reply: {
      chatId: { type: Schema.Types.ObjectId, ref: "Chat" },
      message: String,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    upvotes: Number,
    downvotes: Number,
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = { Chat };
