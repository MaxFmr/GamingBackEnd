const Favorite = require("../models/modelFavorite");
const express = require("express");

const router = express.Router();
const formidableMiddleware = require("express-formidable");

router.use(formidableMiddleware());

//create

router.post("/favorites/create", async (req, res) => {
  console.log("create favorite");
  const favoriteExists = await Favorite.findOne({
    name: req.fields.name,
    userId: req.fields.userId,
  });
  console.log(favoriteExists);
  if (favoriteExists === null) {
    try {
      const newFavorite = new Favorite({
        userId: req.fields.userId,
        game_id: req.fields.game_id,
        img: req.fields.img,
        name: req.fields.name,
      });

      await newFavorite.save();
      res.json({ message: "Favorite created" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res
      .status(208)
      .json({ message: "This game is already in your collection !" });
  }
});

//read;

router.get("/favorites", async (req, res) => {
  console.log("SignUp road");
  try {
    const students = await Favorite.find({ userId: req.query.userId });
    res.send(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// **Delete**
router.post("/favorites/delete", async (req, res) => {
  console.log("delete");
  try {
    console.log(req.fields.game_id);
    if (req.fields.game_id) {
      // si l'id a bien été transmis
      // On recherche le "student" à modifier à partir de son id et on le supprime :
      const favoritesDeleted = await Favorite.deleteMany({
        game_id: req.fields.game_id,
      });
      // On répond au client :
      res.json({ message: "Favorite removed" });
    } else {
      // si aucun id n'a été transmis :
      res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
