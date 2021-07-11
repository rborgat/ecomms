const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.get("/delete-cart-item/:id", cartController.deleteCartItem);
router.post("/add-to-cart", cartController.addToCart);
router.post("/update-item", cartController.updateCartItem);
router.get("/delete-cart-items", cartController.deleteCart);

module.exports = router;
