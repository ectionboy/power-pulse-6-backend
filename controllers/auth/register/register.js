const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { User } = require("../../../models/user");
const { HttpError, ctrlWrapper } = require("../../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const avatarURL = gravatar.url(email, { s: "150", protocol: "http" });
  const avatarLargeURL = gravatar.url(email, { s: "250", protocol: "http" });
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    avatarLargeURL,
  });
  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      avatarURL: newUser.avatarURL,
      avatarLargeURL: newUser.avatarLargeURL,
    },
  });
};

module.exports = ctrlWrapper(register);
