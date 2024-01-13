const { ctrlWrapper } = require("../../helpers");

const { getAllFoods } = require("./getAllFoods/getAllFoods");
const { getAllFoodsCategories } = require("./getAllFoodsCategories/getAllFoodsCategories");

module.exports = {
	getAllFoods: ctrlWrapper(getAllFoods),
	getAllFoodsCategories: ctrlWrapper(getAllFoodsCategories),
};
