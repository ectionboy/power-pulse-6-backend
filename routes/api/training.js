const express = require("express");
const ctrl = require("../../controllers/training/index.js");
const authenticate = require("../../middlewares/authenticate.js");
const router = express.Router();

router.get("/", authenticate, ctrl.getAllExercises);
router.get("/:exerciseId", authenticate, ctrl.getExerciseById);
router.get("/filters", authenticate, ctrl.getAllFilters);

module.exports = router;
