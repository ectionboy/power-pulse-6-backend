const { HttpError } = require("../../../helpers");
const { Filter } = require("../../../models/training");

const getAllFilters = async (req, res) => {
  const filters = await Filter.find();
  if (!filters) {
    throw HttpError(404, "Filters not found");
  }
  res.json(filters);
};
const getFilterCategory = async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  if (!category) {
    throw HttpError(404, "Category not found");
  }
  const data = await Filter.find({ filter: category }).skip(skip).limit(limit);
  const total = await Filter.countDocuments({ filter: category });
  res.status(200).json({ total, limit, page, data });
};

module.exports = { getAllFilters, getFilterCategory };
