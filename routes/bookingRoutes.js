const expresss = require("express");
const bookingController = require("../controllers/bookingController");

const router = expresss.Router();

router.post("/checkout-session", bookingController.getCheckoutSession);

module.exports = router;
