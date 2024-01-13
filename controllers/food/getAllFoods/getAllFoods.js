const { HttpError } = require("../../../helpers");
const { Food } = require("../../../models/food");

const getAllFoods = async (req, res) => {
	const { page = 1, limit = 16 } = req.query;
	const skip = (page - 1) * limit;

	const category = {};
	if (req.query.bodyPart) {
		category.bodyPart = req.query.bodyPart;
	}
	if (req.query.equipment) {
		category.equipment = req.query.equipment;
	}
	if (req.query.target) {
		category.target = req.query.target;
	}
	const data = await Food.find(category).skip(skip).limit(limit);
	const total = await Food.countDocuments(category);
	if (!data) {
		throw HttpError(404, "Foods not found");
	}
	res.status(200).json({ total, page, limit, data });
};

module.exports = {
	getAllFoods,
};
