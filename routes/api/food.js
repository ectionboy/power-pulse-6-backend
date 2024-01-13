const express = require("express");
const authenticate = require("../../middlewares/authenticate.js");
const ctrl = require("../../controllers/food/index");
const router = express.Router();

router.get("/", authenticate, ctrl.getAllFoods);

module.exports = router;
