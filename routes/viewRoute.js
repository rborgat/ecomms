const express = require("express");
const viewController = require("../controllers/viewController");

const router = express.Router();

router.get("/", viewController.homePage);
router.get("/detail/:slug", viewController.overviewPage);

router.get(
  "/product/:title",
  viewController.convertToUpperCase,
  viewController.productPage
);

router.get("/signup", viewController.signup);
router.get("/login", viewController.login);
router.post("/add-to-cart", viewController.addToCart);
router.post("/update-item", viewController.updateCartItem);
router.get("/delete-cart-items", viewController.deleteCart);
router.get("/shop/bag", viewController.cart);
router.get("/shop/checkout", viewController.checkoutPage);
router.get("/delete-cart-item/:id", viewController.deleteCartItem);

module.exports = router;
