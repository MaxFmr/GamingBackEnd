const mongoose = require("mongoose");

const Favorite = mongoose.model("favorite", {
  userId: {
    type: String,
    required: true,
  },
  game_id: { type: String, required: true },
  img: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = Favorite;
