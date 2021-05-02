const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const { extend } = require("lodash");

const findUserByEmail = (email) => {
  return User.findOne(
    { email: new RegExp("^" + email + "$", "i") },
    function (err, user) {
      if (err) return console.log(err);
    }
  );
};

router.route("/").post(async (req, res) => {
  try {
    const { newUser } = req.body;
    const user = await findUserByEmail(newUser.email);
    console.log(user);
    const populatedUser = await user
      .populate({
        path: "savedchats.chatId",
        select: "topic moderators participants savedTime chat",
      })
      .execPopulate();
    console.log(populatedUser);
    if (user) {
      res
        .status(200)
        .json({ user: { ...user._doc, savedchats: populatedUser._doc } });
    } else {
      const newUserFromDB = new User(newUser);
      const savedUser = await newUserFromDB.save();
      const populatedUser = await savedUser
        .populate({
          path: "savedchats.chatId",
          select: "topic moderators participants savedTime chat",
        })
        .execPopulate();
      console.log(populatedUser);
      res
        .status(200)
        .json({ user: { ...savedUser._doc, savedchats: populatedUser._doc } });
    }
  } catch (error) {
    res.status(400).json({ message: "Unable to register the user" });
  }
});

router.param("userId", async (req, res, next, userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Couldn't reterive your data" });
  }
});

router
  .route("/:userId")
  .get((req, res) => {
    const user = req.user;
    res.status(200).json({ user: user });
  })
  .post(async (req, res) => {
    const profileUpdates = req.body;
    let { user } = req;

    user = extend(user, profileUpdates);
    user = await user.save();

    res.status(200).json({ user: user });
  });

module.exports = router;
