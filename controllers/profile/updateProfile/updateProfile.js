const { Profile } = require("../../../models/profile");
const {
  ctrlWrapper,
  dateToShortFormat,
  calculateBmr,
} = require("../../../helpers");

const updateProfile = async (req, res, next) => {
  const { _id: id } = req.user;
  req.body.birhday = dateToShortFormat(req.body.birhday);
  let profile = await Profile.findOne({ owner: id });
  if (!profile) {
    next();
    return;
  }
  const { height, currentWeight, sex, levelActivity, birthday } = req.body;
  profile = await Profile.findByIdAndUpdate(
    profile._id,
    {
      ...req.body,
      bmr: calculateBmr(height, currentWeight, sex, levelActivity, birthday),
    },
    {
      new: true,
    }
  ).populate("owner", "name, email avatarUrl");
  res.json({
    profile,
  });
};

module.exports = ctrlWrapper(updateProfile);
