const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.API_KEY;

//route Jeux avec requête axios vers api (page d'accueil du front)

router.get("/games", async (req, res) => {
  const platforms = req.query.platforms;
  if (platforms) {
    try {
      await axios
        .get(
          `https://api.rawg.io/api/games?key=${apiKey}&platforms=${platforms}`
        )
        .then((response) => {
          res.send(response.data);
        });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    try {
      await axios
        .get(
          `https://api.rawg.io/api/games?key=${apiKey}&page=${req.query.page}&search=${req.query.search}&dates=${req.query.dates}&page_size=${req.query.page_size}&ordering=${req.query.ordering}`
        )
        .then((response) => {
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
        res.send(response.data);
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
