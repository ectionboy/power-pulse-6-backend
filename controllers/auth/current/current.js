const { Profile } = require("../../../models/profile");
const { ctrlWrapper, HttpError } = require("../../../helpers");

const getCurrent = async (req, res) => {
  try {
    const {
      _id: id,
      email,
      name,
      avatarURL,
      avatarLargeURL,
      createdAt,
    } = req.user;
    const result = await Profile.findOne({ owner: id });
    const isParams = result ? true : false;
    let targetBmr = 0;
    const targetTime = 110;

    if (result) {
      targetBmr = result.bmr;
    }

    res.status(200).json({
      name,
      email,
      avatarURL,
      avatarLargeURL,
      createdAt,
      targetBmr,
      targetTime,
      isParams,
    });
  } catch (error) {
    console.error(error);
    throw HttpError(500, "Internal Server Error");
  }
};

module.exports = ctrlWrapper(getCurrent);
