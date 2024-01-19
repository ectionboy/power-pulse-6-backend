const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { User } = require("../../../models/user");
const { HttpError, ctrlWrapper } = require("../../../helpers");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const avatarURL = gravatar.url(email, { s: "100", protocol: "http" });
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  const payload = {
    id: newUser._id,
    createdAt: newUser.createdAt,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = ctrlWrapper(register);

module.exports = ctrlWrapper(register);
