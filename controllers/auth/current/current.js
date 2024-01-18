const { ctrlWrapper } = require("../../../helpers");

const getCurrent = async (req, res) => {
  const { email, name, avatarURL, avatarLargeURL, createdAt } = req.user;
  res.status(200).json({
    name,
    email,
    avatarURL,
    avatarLargeURL,
    createdAt,
  });
};

module.exports = ctrlWrapper(getCurrent);
