const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", authController.register);
//router.post("/login", passport.authenticate("local"), authController.response);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
router.get("/logout", function (req, res, next) {
  req.session.destroy();
  req.logOut();

  res.redirect("/");
});
router.use(authController.isAuthorized);

router.post("/update-my-password", authController.updatePassword);
router.post(
  "/update-me",
  userController.uploadUserPhoto,
  userController.rezizeUserPhoto,
  userController.updateUser
);

module.exports = router;
