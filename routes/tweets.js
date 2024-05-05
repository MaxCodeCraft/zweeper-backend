var express = require("express");
var router = express.Router();
const Tweet = require("../models/tweets");

router.get("/", (req, res) => {
  Tweet.find().then((data) => {
    res.json({ result: true, data: data });
  });
});

router.get("/:id", (req, res) => {
  Tweet.findById(req.params.id).then((data) => {
    res.json({ result: true, data: data });
  });
});

router.post("/new", (req, res) => {
  const newTweet = new Tweet({
    name: req.body.name,
    username: req.body.username,
    date: new Date(),
    content: req.body.content,
    hashtags: req.body.hashtags,
    token: req.body.token,
    image: req.body.image,
  });
  newTweet.save().then((data) => {
    res.json({ result: true, message: "tweet created", data: data });
  });
});

router.delete("/delete/:id", (req, res) => {
  Tweet.findByIdAndDelete(req.params.id).then(() => {
    res.json({ result: true });
  });
});

router.put("/addlike/:id", (req, res) => {
  Tweet.updateOne(
    { _id: req.params.id },
    { $push: { likes: req.body.token } }
  ).then((data) => {
    res.json({ result: true, likes: data.likes });
  });
});

router.put("/removelike/:id", (req, res) => {
  Tweet.updateOne(
    { _id: req.params.id },
    { $pull: { likes: req.body.token } }
  ).then((data) => {
    res.json({ result: true, likes: data.likes });
  });
});

router.get("/hashtags/:hashtag", (req, res) => {
  Tweet.find({ hashtags: { $regex: req.params.hashtag } }).then((data) =>
    res.json({ result: true, data: data })
  );
});

module.exports = router;
