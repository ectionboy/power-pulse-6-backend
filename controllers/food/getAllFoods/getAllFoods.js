const { HttpError } = require("../../../helpers");
const { Food, Categories } = require("../../../models/food");
const { Profile } = require("../../../models/profile");

const getAllFoods = async (req, res) => {
	const { page = 1, limit = 16 } = req.query;
	const skip = (page - 1) * limit;

	let filters = {};
	if (req.query.category) {
		const data = await Categories.findOne({ value: req.query.category });
		if (!data) {
			throw HttpError(400, "Unacceptable category");
		};
		filters.category = data.label;
	};

	if (req.query.groupBloodNotAllowed) {
		const { _id: id } = req.user;

		const result = await Profile.findOne({ owner: id });
		const groupBlood = result.blood;

		const query = {};

		switch (req.query.groupBloodNotAllowed) {
			case "recommended":
				query[`groupBloodNotAllowed.${groupBlood}`] = true;
				break;

			case "not-recommended":
				query[`groupBloodNotAllowed.${groupBlood}`] = false;
				break;

			case "all":
				break;

			default:
				throw HttpError(400, "Unacceptable groupBloodNotAllowed");
		};
		filters = { ...filters, ...query };
	};

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
