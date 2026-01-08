const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
    res.json({message: "Login successful", user: req.user});
  }
);

router.get(
  "/profile",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    res.json({
      message: "Access granted",
      user: req.user
    });
  }
);


module.exports = router;
