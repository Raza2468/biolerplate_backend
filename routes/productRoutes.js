const express = require("express");
const product = require("../controllers/product");
const router = express.Router();


router.route("/").get(product.getAllProduct);
router.route("/getAllProducttesting").get(product.getAllProducttesting);

module.exports = router;

