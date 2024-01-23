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

  profile = await Profile.findById(profile._id)
    .populate("owner", "name email avatarURL");
    // .select("-id");

  const response = {
    owner: {
      _id: profile.owner._id,
      name: profile.owner.name,
      email: profile.owner.email,
      avatarURL: profile.owner.avatarURL,
    },
    height: profile.height,
    currentWeight: profile.currentWeight,
    desiredWeight: profile.desiredWeight,
    sex: profile.sex,
    blood: profile.blood,
    levelActivity: profile.levelActivity,
    birthday: profile.birthday,
    bmr: profile.bmr,
    // _id: profile._id,
  };

  res.json(response);
};

module.exports = ctrlWrapper(creareProfile);
