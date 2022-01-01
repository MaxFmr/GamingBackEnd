const Favorite = require("../models/modelFavorite");
const express = require("express");

const router = express.Router();
const formidableMiddleware = require("express-formidable");
const Review = require("../models/modelReview");

router.use(formidableMiddleware());

//create

router.post("/review/create", async (req, res) => {
  console.log("create review");

  const reviewExists = await Review.findOne({
    userName: req.fields.userName,
    gameId: req.fields.gameId,
  });

  if (reviewExists === null) {
    try {
      const newReview = new Review({
        userName: req.fields.userName,
        review: req.fields.review,
        userAvatar: req.fields.userAvatar,
        note: req.fields.note,
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
  console.log("reviews");
  console.log(req.params.id);

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
