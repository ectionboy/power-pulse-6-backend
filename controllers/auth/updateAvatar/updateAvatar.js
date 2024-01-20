const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");

const { ctrlWrapper, normalizeAvatar } = require("../../../helpers");

const { User } = require("../../../models/user");

const avatarStoragePath = path.join(__dirname, "../../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempAvatar, filename } = req.file;
  await normalizeAvatar(tempAvatar, 100);
  const { _id, email } = req.user;
  const avatarURL = await new Promise((resolve) => {
    gravatar.url(email, { s: "50", protocol: "http" }, (err, url) => {
      if (err) throw err;
      resolve(url);
    }); 
  });
  const avatarLargeURL = await new Promise((resolve) => {
    gravatar.url(email, { s: "2000", protocol: "http" }, (err, url) => {
      if (err) throw err;
      resolve(url);
    });
  });
  await normalizeAvatar(tempAvatar, 100);

  const avatarPath = path.join(avatarStoragePath, filename);
  await fs.rename(tempAvatar, avatarPath);
  await User.findByIdAndUpdate(_id, { avatarURL, avatarLargeURL });
  res.status(200).json({
    avatarURL,
    avatarLargeURL,
  });
};

module.exports = ctrlWrapper(updateAvatar);