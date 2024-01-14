const { HttpError } = require("../../../helpers");
const { Categories } = require("../../../models/food");

const getAllFoodsCategories = async (req, res) => {
	const data = await Categories.find().sort({label:1});
	if (!data) {
		throw HttpError(404, "Categories not found");
	}
	res.status(200).json(data);
};

module.exports = {
	getAllFoodsCategories,
};
