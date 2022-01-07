const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  userName: {
    type: String,
    required: true,
  },
  review: { type: String, required: true },
  note: {
    type: String,
    required: true,
  },
  userAvatar: {
    type: String,
    required: true,
  },
  gameId: { type: String, required: true },

  likes: { type: Number, min: 0 },
  disLikes: { type: Number, min: 0 },
});

module.exports = Review;
