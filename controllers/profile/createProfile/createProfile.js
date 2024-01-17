const { Profile } = require("../../../models/profile");
const { ctrlWrapper, calculateBmr } = require("../../../helpers");

const creareProfile = async (req, res) => {
  const { _id: id } = req.user;
  const { height, currentWeight, sex, levelActivity, birthday } = req.body;

  let profile = await Profile.create({
    owner: id,
    bmr: calculateBmr(height, currentWeight, sex, levelActivity, birthday),
    ...req.body,
  });

  profile = await profile.populate("owner", "name email avatarURL");

  res.json(profile);
};

module.exports = ctrlWrapper(creareProfile);