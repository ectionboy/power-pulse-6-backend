const express = require("express");
const ctrl = require("../../controllers/training/index.js");
const authenticate = require("../../middlewares/authenticate.js");
const router = express.Router();

router.get("/", authenticate, ctrl.getAllExercises);
router.get("/current/:exerciseId", authenticate, ctrl.getExerciseById);
router.get("/filters", authenticate, ctrl.getAllFilters);
router.get("/categories", ctrl.getFilterCategory);

module.exports = router;
