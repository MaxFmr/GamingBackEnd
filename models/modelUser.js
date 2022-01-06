const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },

  account: {
    username: {
      required: true,
      type: String,
    },
    avatar: Object,
  },
  reviews: {
    type: Array,
  },
  favorites: [],
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
