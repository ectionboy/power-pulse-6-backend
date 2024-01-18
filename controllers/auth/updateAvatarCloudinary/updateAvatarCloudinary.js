const fs = require("fs/promises");

const { ctrlWrapper } = require("../../../helpers");
const cloudinary = require("../../../helpers/cloudinary");
const { User } = require("../../../models/user");

const updateAvatarCloudinary = async (req, res) => {
  const { _id } = req.user;
  const { secure_url: avatarURL, avatarLargeURL } =
    await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
    });

  await fs.unlink(req.file.path);

  await User.findByIdAndUpdate(_id, { avatarURL, avatarLargeURL });
  res.json({
    avatarURL,
    avatarLargeURL,
  });
};

module.exports = ctrlWrapper(updateAvatarCloudinary);
