var express = require("express");
var router = express.Router();
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const { checkBody } = require("../modules/checkBody");
const User = require("../models/users");

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["name", "username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ username: req.body.username }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 12);

      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: hash,
        token: uid2(32),
        image: `https://robohash.org/${req.body.username}.png`,
      });

      newUser.save().then((data) => {
        res.json({ result: true, data: data });
      });
    } else {
      res.json({ result: false, error: "User already exists" });
    }
  });
});

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ username: req.body.username }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, data: data });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

router.post("/findtoken", (req, res) => {
  User.findOne({ token: req.body.token }).then((data) => {
    res.json({ result: true, data: data });
  });
});

module.exports = router;
