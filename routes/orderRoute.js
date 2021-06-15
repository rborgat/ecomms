const express = require("express"); 
const orderController = require("../controllers/orderController"); 
const authController = require("../controllers/authController")

const router = express.Router(); 

router.route("/complete-order").post(authController.isAuthorized, orderController.findQuantityOrder, orderController.completeOrder); 

router.route("/:orderNumber").get(authController.isAuthorized, orderController.getOrder); 
module.exports = router; 