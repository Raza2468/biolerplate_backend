const express = require("express");
const userRoutes = require("../controllers/authController");
const router = express.Router();


// router.route("/").get(product.getAllProduct);
router.route("/createUser").post(userRoutes.createUser);

module.exports = router;
