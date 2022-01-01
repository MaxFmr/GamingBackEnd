require("dotenv").config();

const express = require("express");

const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const formidableMiddleware = require("express-formidable");
const router = express.Router();

mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(formidableMiddleware());

app.use(cors());

require("dotenv").config();

const gamesRoutes = require("./routes/games");
app.use(gamesRoutes);

const usersRoutes = require("./routes/users");
app.use(usersRoutes);

const favoritesRoutes = require("./routes/favorites");
app.use(favoritesRoutes);

const reviewRoutes = require("./routes/review");
app.use(reviewRoutes);

const platformsRoutes = require("./routes/platforms");
app.use(platformsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from GamePAD API backend by Max" });
});

//----------------------------

app.listen(process.env.PORT, () => {
  console.log("GamePAD server has started");
});
