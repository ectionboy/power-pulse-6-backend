const { HttpError } = require("../../../helpers");
const { Food, Categories } = require("../../../models/food");

const getAllFoods = async (req, res) => {
	const { page = 1, limit = 16 } = req.query;
	const skip = (page - 1) * limit;

	const filters = {};
	if (req.query.category) {
		const data = await Categories.findOne({value:req.query.category});
		if (!data) {
			throw HttpError(400, "Unacceptable category");
		}
		console.log(data.label)
		filters.category = data.label;
	  }
console.log(filters)
	const data = await Food.find(filters).skip(skip).limit(limit);
	const total = await Food.countDocuments(filters);
	if (!data) {
		throw HttpError(404, "Foods not found");
	}
	res.status(200).json({ total, page, limit, data });
};

module.exports = {
	getAllFoods,
};
