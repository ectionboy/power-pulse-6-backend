const { ctrlWrapper } = require("../../helpers");

const { getAllFoods } = require("./getAllFoods/getAllFoods");

module.exports = {
	getAllFoods: ctrlWrapper(getAllFoods),
};
