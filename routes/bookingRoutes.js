const expresss = require("express");
const bookingController = require("../controllers/bookingController");
const authController = require("../controllers/authController");
const router = expresss.Router();

router.post("/checkout-session", bookingController.getCheckoutSession);

module.exports = router;
