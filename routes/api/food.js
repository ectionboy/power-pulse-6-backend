const express = require("express");
const authenticate = require("../../middlewares/authenticate.js");
const ctrl = require("../../controllers/food/index");
const router = express.Router();

router.get("/", authenticate, ctrl.getAllFoods);
router.get("/categories", authenticate, ctrl.getAllFoodsCategories);


module.exports = router;
