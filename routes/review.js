const Favorite = require("../models/modelFavorite");
const express = require("express");

const router = express.Router();
const formidableMiddleware = require("express-formidable");
const Review = require("../models/modelReview");
const User = require("../models/modelUser");

router.use(formidableMiddleware());

const isAuthenticated = async (req, res, next) => {
  if (req.fields.headers.Authorization) {
    const user = await User.findOne({
      token: req.fields.headers.Authorization.replace("Bearer ", ""),
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    } else {
      req.user = user;
      // On crée une clé "user" dans req. La route dans laquelle le middleware est appelé     pourra avoir accès à req.user
      return next();
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

//create

router.post("/review/create", isAuthenticated, async (req, res) => {
  const reviewExists = await Review.findOne({
    userName: req.user.account.username,
    gameId: req.fields.gameId,
  });

  if (reviewExists === null) {
    try {
      const newReview = new Review({
        userName: req.user.account.username,
        review: req.fields.review,
        note: req.fields.note,
        userAvatar: req.user.account.avatar.secure_url,
        gameId: req.fields.gameId,
      });

      await newReview.save();
      res.json({ message: "review created" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.send({ message: "You've already wrote a review about this game" });
  }
});

//read;

router.get("/review/:id", async (req, res) => {
  try {
    const reviews = await Review.find({ gameId: req.params.id });
    reviews && res.send(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// **Update**
router.post("/review/update", async (req, res) => {
  console.log("route : review /update");
  try {
    if (req.fields._id) {
      const review = await Review.findById(req.fields._id);

      review.review = req.fields.review;

      await review.save();

      res.json(review);
    } else {
      res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// **Delete**
router.post("/review/delete", async (req, res) => {
  console.log("delete review");
  try {
    await Review.findByIdAndDelete(req.fields._id);

    res.json({ message: "review removed" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
