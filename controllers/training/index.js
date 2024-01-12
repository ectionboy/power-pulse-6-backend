const { ctrlWrapper } = require("../../helpers");
const { getAllExercises, getExerciseById } = require("./exercises");
const getAllFilters = require("./filters");

module.exports = {
  getAllExercises: ctrlWrapper(getAllExercises),
  getExerciseById: ctrlWrapper(getExerciseById),
  getAllFilters: ctrlWrapper(getAllFilters),
};
