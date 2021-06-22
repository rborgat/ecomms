const express = require("express");
const viewController = require("../controllers/viewController");

const router = express.Router();

router.get("/", viewController.homePage);
router.get("/detail/:slug", viewController.overviewPage);
router.get("/checkout", viewController.checkoutPage);
router.get(
  "/product/:title",
  viewController.convertToUpperCase,
  viewController.productPage
);

router.get("/signup", viewController.signup);
router.get("/login", viewController.login); 
module.exports = router;
