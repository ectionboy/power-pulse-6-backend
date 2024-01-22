const { User } = require("../../../models/user");
const { Profile } = require("../../../models/profile");
const bcrypt = require("bcrypt");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const { HttpError, ctrlWrapper } = require("../../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
    createdAt: user.createdAt,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  const profile = await Profile.findOne({ owner: user._id });
  const isParams = profile ? true : false;

  res.status(200).json({
    token,
    user: {
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
      createdAt: user.createdAt,
      avatarLargeURL: user.avatarLargeURL,
      isParams: isParams,
    },
  });
};
module.exports = ctrlWrapper(login);
