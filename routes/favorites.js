const Favorite = require("../models/modelFavorite");
const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();
const formidableMiddleware = require("express-formidable");
const User = require("../models/modelUser");

router.use(formidableMiddleware());

//create

router.post("/favorites/create", isAuthenticated, async (req, res) => {
  console.log("create favorite");
  console.log(req.user);
  console.log(req.fields.game.data.name);
  const favoriteExists = await Favorite.findOne({
    username: req.user.username,
    name: req.fields.name,
  });
  const user = await User.findById(req.user._id);

  //ajourd'hui définition de la date
  const date = new Date();
  const nowDate = date.toISOString().split("T")[0];

  //_______

  console.log(favoriteExists);
  if (favoriteExists === null) {
    try {
      const newFavorite = new Favorite({
        username: req.user.username,
        game: req.fields.game,
        img: req.fields.img,
        name: req.fields.name,
      });
      await user.favorites.push({ name: newFavorite.name, date: nowDate }); //construction d'un historique des favoris par user
      await user.save();
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

router.get("/favorites", isAuthenticated, async (req, res) => {
  console.log("read fav");
  try {
    const favorites = await Favorite.find({ username: req.user.username });
    res.send(favorites);
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
      const favoritesDeleted = await Favorite.deleteOne({
        _id: req.fields.game_id,
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
