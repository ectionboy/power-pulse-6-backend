const { User } = require("../../../models/user");
const { ctrlWrapper } = require("../../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(200).json({
    message: "No Content",
  });;
};
// if tou want to receive the res 204 please change
module.exports = ctrlWrapper(logout);
