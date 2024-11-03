// google-auth.route.js

const express = require("express");
const Router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

Router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

Router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000",
  }),
  function (req, res) {
    const token = jwt.sign({userId:req.user._id},process.env.JWT_SECRET_KEY,{ expiresIn: '30d' });
    res.cookie("jwt", token, {httpOnly: true });
    res.redirect(
      `http://localhost:3000`
    );
  }
);

module.exports = Router;