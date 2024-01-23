const { Profile } = require("../../../models/profile");
const { User } = require("../../../models/user");
const { ctrlWrapper, calculateBmr } = require("../../../helpers");


const creareProfile = async (req, res) => {
  const { _id: id, name } = req.user;
  const { height, currentWeight, sex, levelActivity, birthday } = req.body;

  let profile = await Profile.findOne({ owner: id });

  if (!profile) {
    profile = await Profile.create({
      owner: id,
      bmr: calculateBmr(height, currentWeight, sex, levelActivity, birthday),
      ...req.body,
    });
  } else {
    profile = await Profile.findOneAndUpdate(
      { owner: id },
      {
        $set: {
          bmr: calculateBmr(
            height,
            currentWeight,
            sex,
            levelActivity,
            birthday
          ),
          ...req.body,
        },
      },
      { new: true }
    );
  }

  if (name) {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name: name },
      { new: true, projection: "_id name email avatarURL avatarLargeURL" }
    );

    if (updatedUser) {
      profile.owner = updatedUser;
    }
  }

  const response = {
    owner: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatarURL: req.user.avatarURL,
      avatarLargeURL: req.user.avatarLargeURL,
    },
    height: profile.height,
    currentWeight: profile.currentWeight,
    desiredWeight: profile.desiredWeight,
    sex: profile.sex,
    blood: profile.blood,
    levelActivity: profile.levelActivity,
    birthday: profile.birthday,
    bmr: profile.bmr,
    sportTime: profile.sportTime,
  };

  res.json(response);
};

module.exports = ctrlWrapper(creareProfile);
