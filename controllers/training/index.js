const { ctrlWrapper } = require("../../helpers");
const { getAllExercises, getExerciseById } = require("./exercises/exercises");
const getAllFilters = require("./filters/filters");

module.exports = {
  getAllExercises: ctrlWrapper(getAllExercises),
  getExerciseById: ctrlWrapper(getExerciseById),
  getAllFilters: ctrlWrapper(getAllFilters),
};
