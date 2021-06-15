const expresss = require("express"); 
const productController = require("../controllers/productController"); 
const authController = require("../controllers/authController")
const router = expresss.Router(); 


router.route('/').get(authController.isAuthorized,productController.getAllProducts)

router.route("/:slug").get(productController.getProduct); 
module.exports = router; 