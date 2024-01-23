const { Profile } = require("../../../models/profile");
const { User } = require("../../../models/user");
const {
  ctrlWrapper,
  dateToShortFormat,
  calculateBmr,
} = require("../../../helpers");

const updateProfile = async (req, res, next) => {
  const { _id: id } = req.user;
  if (!req.body.birthday) {
    req.body.birthday = new Date();
  } else {
    req.body.birthday = dateToShortFormat(req.body.birthday);
  }
  let profile = await Profile.findOne({ owner: id });
  if (!profile) {
    next();
    return;
  }
  const { height, currentWeight, sex, levelActivity, birthday, name } =
    req.body;
  profile = await Profile.findByIdAndUpdate(
    profile._id,
    {
      ...req.body,
      bmr: calculateBmr(height, currentWeight, sex, levelActivity, birthday),
    },
    {
      new: true,
    }
  ).populate("owner", "_id name email avatarUrl");
  if (name) {
    const user = await User.findByIdAndUpdate(
      id,
      { name: name },
      { new: true, projection: "_id name email avatarURL" }
    );
    profile.owner = user;
  }

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

module.exports = ctrlWrapper(updateProfile);
