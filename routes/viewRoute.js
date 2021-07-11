const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", viewController.homePage);
router.get("/detail/:slug", viewController.overviewPage);

router.get(
  "/product/:title",
  viewController.convertToUpperCase,
  viewController.productPage
);

router.get(
  "/my-orders",
  authController.isAuthorized,
  viewController.purchasedProduct
);
router.get("/signup", viewController.signup);
router.get("/login", viewController.login);
router.get("/reset", viewController.forgotPassword);
router.get("/reset/:token", viewController.resetPassword);
router.get("/shop/bag", viewController.cart);
router.get("/shop/checkout", viewController.checkoutPage);


module.exports = router;
