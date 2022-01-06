const mongoose = require("mongoose");

const Favorite = mongoose.model("favorite", {
  username: {
    type: String,
    required: true,
  },
  game: { type: Object, required: true },
  img: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = Favorite;
