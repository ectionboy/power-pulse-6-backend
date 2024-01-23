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
  profileCtrl.updateProfile,
  profileCtrl.createProfile
);

module.exports = router;
