const express = require("express");
const profileCtrl = require("../../controllers/profile/index");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/profile");
const router = express.Router();

router.get("/", authenticate, profileCtrl.getProfile);

router.put(
  "/",
  authenticate,
  validateBody(schemas.createProfile),
  profileCtrl.createProfile,
  profileCtrl.updateProfile,
  profileCtrl.createProfile
);

router.get("/targets", authenticate, profileCtrl.getBmr);

module.exports = router;
