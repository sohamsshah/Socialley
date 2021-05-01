const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    createdAt: Number,
    updatedAt: Number,
    profilePic: String,
    bio: {
      type: String,
      max: 400,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      // validate: {
      //   validator: function (email) {
      //     return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      //       String(email).toLowerCase()
      //     );

      // },
      // message: (props) => `${props.value} is not a valid email id!`,
      // },
      required: [true, "User Email Id required"],
      unique: true,
    },
    savedchats: [{ chatId: { type: Schema.Types.ObjectId, ref: "Room" } }],
    following: [{ userId: { type: Schema.Types.ObjectId, ref: "User" } }],
    followers: [{ userId: { type: Schema.Types.ObjectId, ref: "User" } }],
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
