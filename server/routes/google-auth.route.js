// google-auth.route.js

const express = require("express");
const Router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

Router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

Router.get("/auth/google/callback", passport.authenticate("google", {
      failureRedirect: `${process.env.FRONTEND_URL}/about-us`,
    }),
    function (req, res) {
      const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET_KEY, {expiresIn: "30d"});

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.redirect(process.env.FRONTEND_URL);
    }
);
module.exports = Router;
