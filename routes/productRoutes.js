const express = require("express");
const { getAllProduct, getAllProducttesting } = require("../controllers/product");
const router = express.Router();


router.route("/").get(getAllProduct);
router.route("/getAllProducttesting").get(getAllProducttesting);

module.exports = router;

