const { ctrlWrapper } = require("../../helpers");
const { getAllExercises, getExerciseById } = require("./exercises/exercises");
const { getAllFilters, getFilterCategory } = require("./filters/filters");

module.exports = {
  getAllExercises: ctrlWrapper(getAllExercises),
  getExerciseById: ctrlWrapper(getExerciseById),
  getAllFilters: ctrlWrapper(getAllFilters),
  getFilterCategory: ctrlWrapper(getFilterCategory),
};
