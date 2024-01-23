const { Profile } = require("../../../models/profile");
const { ctrlWrapper } = require("../../../helpers");

const getProfile = async (req, res) => {
  const { _id: id } = req.user;

  const result = await Profile.findOne({ owner: id }).populate(
    "owner",
    "name email avatarUrl"
  );
  const response = {
    owner: {
      _id: result.owner._id,
      name: result.owner.name,
      email: result.owner.email,
      avatarURL: result.owner.avatarURL,
    },
    height: result.height,
    currentWeight: result.currentWeight,
    desiredWeight: result.desiredWeight,
    sex: result.sex,
    blood: result.blood,
    levelActivity: result.levelActivity,
    birthday: result.birthday,
    bmr: result.bmr,
  };

  res.json(response);
};

module.exports = ctrlWrapper(getProfile);
