const express = require("express");
const { UserModel } = require("../model/users.model");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

UserRouter.use(express.json());

UserRouter.get("/users", async (req, res) => {
  try {
    const todos = await UserModel.find();
    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send({ msg: "Error", Error: error.message });
  }
});

UserRouter.post("/register", async (req, res) => {
  try {
    const payload = req.body;
    const alreadyPresent = await UserModel.find({email: payload.email});
    if (alreadyPresent.length > 0) {
      return res.send({ msg: "User Already Exists, Please Login" });
    } else {
      const newUser = await UserModel(payload).save();
      res.status(201).send({ msg: "User registered", newUser });
    }
  } catch (error) {
    res.status(500).send({ msg: "Error", Error: error.message });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      user.comparePasswordhash(pass, (err, isMatch) => {
        if (err) {
          res.status(500).send({ msg: "Server Error", Error: err.message });
        } else if (isMatch) {
          const token = jwt.sign(
            { email: email, id: user._id },
            process.env.secretKey
          );
          res.status(200).send({ user: user.email, token });
        } else {
          res.status(401).send({ msg: "Invalid Password" });
        }
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "Error", Error: error.message });
  }
});

module.exports = { UserRouter };
