"use strict";
const express = require("express");
const router = express.Router();
const Users = require("../Models/UserModel");

router.post("/", (req, res) => {
  console.log("Inside signup");

  let newUser = new Users({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  Users.findOne({ email: req.body.email }, (error, user) => {
    if (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end();
    }
    if (user) {
      res.writeHead(400, {
        "Content-Type": "text/plain",
      });
      res.end("Email ID already exists");
    } else {
      newUser.save((error, data) => {
        if (error) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end();
        } else {
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end();
        }
      });
    }
  });
});

module.exports = router;
