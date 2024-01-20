const fs = require("fs/promises");

const { ctrlWrapper } = require("../../../helpers");
const cloudinary = require("../../../helpers/cloudinary");
const { User } = require("../../../models/user");

const updateAvatarCloudinary = async (req, res) => {
  const { _id, email } = req.user;

  const { secure_url: avatarURL } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: "avatars",
      width: 50,
    }
  );

  const { secure_url: avatarLargeURL } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: "avatars",
      width: 200,
    }
  );

  await fs.unlink(req.file.path);
  await User.findByIdAndUpdate(_id, { avatarURL, avatarLargeURL });

  res.json({
    avatarURL,
    avatarLargeURL,
  });
};

module.exports = ctrlWrapper(updateAvatarCloudinary);