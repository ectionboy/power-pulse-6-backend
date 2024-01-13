const { HttpError } = require("../../../helpers");
const { Food } = require("../../../models/food");

const getAllFoods = async (req, res) => {
	const { page = 1, limit = 16 } = req.query;
	const skip = (page - 1) * limit;

	const data = await Food.find().skip(skip).limit(limit);
	const total = await Food.countDocuments();
	if (!data) {
		throw HttpError(404, "Foods not found");
	}
	res.status(200).json({ total, page, limit, data });
};

module.exports = {
	getAllFoods,
};
