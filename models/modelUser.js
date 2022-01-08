const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },

  username: {
    required: true,
    type: String,

    avatar: Object,
  },
  reviews: {
    type: Array,
  },
  favorites: { type: Array },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
