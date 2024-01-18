const { Profile } = require("../../../models/profile");
const { ctrlWrapper, HttpError } = require("../../../helpers");

const getCurrent = async (req, res) => {
  try {
    const { _id: id, email, name, avatarURL, createdAt } = req.user;
    const result = await Profile.findOne({ owner: id });

    let targetBmr = 0;
    const targetTime = 110;

    if (result) {
      targetBmr = result.bmr;
    }

    res.status(200).json({
      name,
      email,
      avatarURL,
      createdAt,
      targetBmr,
      targetTime,
    });
  } catch (error) {
    console.error(error);
    throw HttpError(500, "Internal Server Error");
  }
};

module.exports = ctrlWrapper(getCurrent);
