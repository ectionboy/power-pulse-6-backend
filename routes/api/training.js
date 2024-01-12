const express = require("express");
const ctrl = require("../../controllers/training/index.js");
const router = express.Router();

router.get("/", ctrl.getAllExercises);
router.get("/:exerciseId", ctrl.getExerciseById);
router.get("/filters", ctrl.getAllFilters);

module.exports = router;
