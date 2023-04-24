const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlayListSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  songId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "songs",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("playlist", PlayListSchema);
