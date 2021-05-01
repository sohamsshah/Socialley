const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const { extend } = require("lodash");

router.route("/").post((req, res) => {
    try {
        const user = req.body;
        const newUser = new User(user);
        const savedUser = await newUser.save();
        res.status(200).json({ user: savedUser });
    } catch (error) {
        res.status(400).json({message: "Unable to register the user"})
    }
})

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
    .post((req, res) => {
        const profileUpdates = req.body;
        let { user } = req;

        user = extend(user, profileUpdates);
        user = await user.save();

        res.status(200).json({ user: user });
    });
