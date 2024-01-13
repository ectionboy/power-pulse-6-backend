const { ctrlWrapper } = require("../../../helpers");

const getCurrent = async (req, res) => {
  const { email, name, avatarURL, createdAt } = req.user;
  res.status(200).json({
    name,
    email,
    avatarURL,
    createdAt,
  });
};

module.exports = ctrlWrapper(getCurrent);