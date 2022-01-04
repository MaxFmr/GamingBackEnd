const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.API_KEY;

//route Jeux avec requête axios vers api (page d'accueil du front)

router.get("/games", async (req, res) => {
  const platforms = req.query.platforms;
  if (platforms) {
    console.log("1");
    try {
      await axios
        .get(
          `https://api.rawg.io/api/games?key=${apiKey}&platforms=${platforms}`
        )
        .then((response) => {
          console.log("route games");
          res.send(response.data);
        });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    console.log("2");
    try {
      await axios
        .get(`https://api.rawg.io/api/games?key=${apiKey}`)
        .then((response) => {
          console.log("route games");
          res.send(response.data);
        });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
});

//route game/id

router.get("/game/:id", async (req, res) => {
  try {
    await axios
      .get(`https://api.rawg.io/api/games/${req.params.id}?key=${apiKey}`)
      .then((response) => {
        console.log("route game/id");
        res.send(response.data);
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

//route games from the same series

router.get("/games/:id/game-series", async (req, res) => {
  try {
    await axios
      .get(
        `https://api.rawg.io/api/games/${req.params.id}/game-series?key=${apiKey}`
      )
      .then((response) => {
        console.log("route game series");
        res.send(response.data);
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//route games video trailer

router.get("/games/:id/movies", async (req, res) => {
  try {
    await axios
      .get(
        `https://api.rawg.io/api/games/${req.params.id}/movies?key=${apiKey}`
      )
      .then((response) => {
        console.log("route game movies");
        res.send(response.data);
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
