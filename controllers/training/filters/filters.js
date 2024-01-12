const { HttpError } = require("../../../helpers");
const { Filter } = require("../../../models/training");

const getAllFilters = async (req, res) => {
  //   let categories = {};

  const filter = await Filter.find();
  if (!filter) {
    throw HttpError(404, "Filters not found");
  }
  res.json(filter);
};

module.exports = getAllFilters;
