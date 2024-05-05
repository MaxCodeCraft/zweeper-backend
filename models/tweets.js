const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  name: String,
  username: String,
  date: Date,
  content: String,
  likes: { type: [String], default: null },
  hashtags: [String],
  token: String,
  image: String,
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
