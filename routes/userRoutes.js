const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.register);

//Login user using passport
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
router.post("/reset", authController.resetPassword);
router.post("/forgot-password", authController.forgotPassword);

router.use(authController.isAuthorized);
router.get("/logout", authController.logOut);

module.exports = router;
