const express = require("express");
const userRoutes = require("../controllers/authController");
const router = express.Router();


router.route("/").post(userRoutes.createUser);
router.route("/login").post(userRoutes.userLogin);

module.exports = router;
