const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const { body, validationResult } = require("express-validator");

//Route 1 - allSongs
router.get("/fetchallsongs", async (req, res) => {
  try {
    const songs = await Song.find({});
    res.json(songs);
  } catch (error) {
    res.status(500).send("Some error occured");
  }
});

//Route 2 - Add Song
router.post(
  "/addsong",
  [
    body("name", "Enter a valid title").isLength({ min: 3 }),
    body("artist", "Description must be atleast 5 characters").isLength({
      min: 3,
    }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("link", "Enter link for song").isLength({ min: 5 }),
    body("img", "Enter url for Image").isLength({ min: 10 }),
    body("comment", "Enter comment"),
  ],
  async (req, res) => {
    try {
      const { name, artist, description, link, img, comment } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const song = new Song({
        name,
        artist,
        description,
        link,
        img,
        comment,
      });
      const saveSong = await song.save();
      res.json(saveSong);
    } catch (error) {
      res.status(500).send("Some error occured");
    }
  }
);

//Route 3 - update song
router.put("/updatesong/:id", async (req, res) => {
  const { newcomment } = req.body;
  try {
    const newSong = {};

    let song = await Song.findById(req.params.id);

    song.comment.push(newcomment);

    if (newcomment) {
      newSong.comment = song.comment;
    }
    if (!song) {
      return res.status(404).send("Not Found");
    }
    song = await Song.findByIdAndUpdate(
      req.params.id,
      { $set: newSong },
      { new: true }
    );
    res.json({ song });
  } catch (error) {
    res.status(500).send("Some error occured");
  }
});

//Route 4 - Get a song
router.get("/fetchasong/:id", async (req, res) => {
  try {
    const song = await Song.find({ _id: req.params.id });
    res.json({ song });
  } catch (error) {
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
