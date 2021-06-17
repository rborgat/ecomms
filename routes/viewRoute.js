const express = require("express");
const viewController = require("../controllers/viewController");

const router = express.Router();

router.get("/", viewController.homePage);
router.get("/detail/:slug", viewController.productPage);

module.exports = router;
