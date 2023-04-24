const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const PlayList = require("../models/PlayList");
var fetchuser = require("../middleware/fetchuser");
const Song = require("../models/Song");

//Route 1 - Get all playlist
router.get("/fetchallplaylist", fetchuser, async (req, res) => {
  try {
    let playlists = await PlayList.find({ user: req.user.id });
    let song = [];
    playlists.map(async (play) => {
      play.songId.map(async (sId) => {
        const sample = await Song.find({ _id: sId });
        song.push(play.title);
        song.push(sample);
      });
    });
    setTimeout(() => {
      res.json({ playlists, song });
    }, 100);
  } catch (error) {
    res.status(500).send("Some error occured");
  }
});

//Route 2 - Make a playlist
router.post(
  "/makeplaylist",
  fetchuser,
  [
    body("title", "Enter a title").isLength({ min: 1 }),
    body("songId", "Enter songId").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { title, songId } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const playlists = new PlayList({
        user: req.user.id,
        title,
        songId,
      });
      const savePlayList = await playlists.save();
      res.json(savePlayList);
    } catch (error) {
      res.status(500).send("Some error occured");
    }
  }
);

//Route 3 - Add a song to playlist
router.put("/addasong/:id", fetchuser, async (req, res) => {
  const { newSongId } = req.body;
  try {
    const newPlaylist = {};

    let playlist = await PlayList.findById(req.params.id);

    playlist.songId.push(newSongId);

    if (newSongId) {
      newPlaylist.songId = playlist.songId;
    }
    if (!playlist) {
      return res.status(404).send("Not Found");
    }
    if (playlist.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }
    playlist = await PlayList.findByIdAndUpdate(
      req.params.id,
      { $set: newPlaylist },
      { new: true }
    );
    res.json({ playlist });
  } catch (error) {
    res.status(500).send("Some error occured");
  }
});

//Route 4 - Delete a Playlist
router.delete("/deleteplaylist/:id", fetchuser, async (req, res) => {
  try {
    let playlist = await PlayList.findById(req.params.id);
    if (!playlist) {
      return res.status(404).send("Not Found");
    }

    if (playlist.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }

    playlist = await PlayList.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", playlist: playlist });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

//Route 4 - Delete a song Playlist
router.put("/deleteasong/:id", fetchuser, async (req, res) => {
  const { newSongId } = req.body;
  try {
    const newPlaylist = {};

    let playlist = await PlayList.findById(req.params.id);

    if (newSongId) {
      newPlaylist.songId = playlist.songId.filter((play) => play != newSongId);
    }

    if (!playlist) {
      return res.status(404).send("Not Found");
    }
    if (playlist.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }
    playlist = await PlayList.findByIdAndUpdate(
      req.params.id,
      { $set: newPlaylist },
      { new: true }
    );
    res.json({ playlist });
  } catch (error) {
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
