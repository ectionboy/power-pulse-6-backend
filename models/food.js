const { Schema, model } = require("mongoose");

const foodSchema = new Schema(
	{
		weight: Number,
		calories: Number,
		category: String,
		title: String,
		groupBloodNotAllowed: [
			{
				1: Boolean,
				2: Boolean,
				3: Boolean,
				4: Boolean,
			},
		],
	},
	{ timestamps: true, versionKey: false }
);
const categoriesSchema = new Schema(
	{
		label: String,
	},
	{ timestamps: true, versionKey: false }
);

const Food = model("product", foodSchema);
const Categories = model("products-categorie", categoriesSchema);


module.exports = {
	Food,
	Categories
};
