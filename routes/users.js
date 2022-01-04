const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const cloudinary = require("cloudinary").v2;
const formidableMiddleware = require("express-formidable");

router.use(formidableMiddleware());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY2,
  api_secret: process.env.API_KEY_SECRET,
});

//Route Sign UP

const User = require("../models/modelUser");

router.post("/signup", async (req, res) => {
  console.log("SignUp road");
  const userExists = await User.findOne({ email: req.fields.email });
  try {
    if (req.fields.username) {
      console.log("1");
      if (userExists === null) {
        const password = req.fields.password;
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64);
        const token = uid2(16);

        const newUser = new User({
          email: req.fields.email,
          account: {
            username: req.fields.username,
          },
          token: token,
          hash: hash,
          salt: salt,
        });

        const avatar = await cloudinary.uploader.upload(req.files.avatar.path);

        newUser.account.avatar = avatar;

        await newUser.save();
        console.log("saved");
        res.json({
          _id: newUser.id,
          token: newUser.token,
          account: newUser.account,
        });
      } else {
        res.json({ message: "This email allready has an account" });
      }
    } else {
      res.json({ message: "Missing parameter(s)" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//route login

router.post("/login", async (req, res) => {
  console.log("login road");
  try {
    const user = await User.findOne({ email: req.fields.email });
    if (user === null) {
      res.status(400).json({ message: "Unauthorized" });
    } else {
      console.log(user.hash, "Hash à comparer");
      const newHash = SHA256(req.fields.password + user.salt).toString(
        encBase64
      );
      console.log(newHash);
      if (user.hash === newHash) {
        res.json({
          _id: user._id,
          token: user.token,
          account: user.account,
        });
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/consult", async (req, res) => {
  console.log("consultroad");
  try {
    console.log(req.fields.id);
    const profil = await User.find({ _id: req.fields.id });
    res.send(profil);
    console.log(profil);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
