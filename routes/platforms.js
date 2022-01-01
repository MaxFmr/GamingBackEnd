const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.API_KEY;

router.get("/platforms", async (req, res) => {
  try {
    await axios
      .get(`https://api.rawg.io/api/platforms?key=${apiKey}`)
      .then((response) => {
        console.log("route platforms");
        res.send(response.data);
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
