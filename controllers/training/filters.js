const { HttpError } = require("../../helpers");
const { Filter } = require("../../models/training");

const getAllFilters = async (req, res) => {
  const filters = await Filter.find();
  if (!filters) {
    throw HttpError(404, "Filters not found");
  }
  res.json(filters);
};

module.exports = getAllFilters;
