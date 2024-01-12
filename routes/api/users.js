const express = require("express");
const ctrl = require("../../controllers/auth/index");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatarCloudinary
);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateUser),
  ctrl.updateUser
);

module.exports = router;
