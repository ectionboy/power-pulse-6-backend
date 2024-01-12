const { HttpError } = require("../../helpers");
const { Exercise } = require("../../models/training");

const getAllExercises = async (req, res) => {
  const data = await Exercise.find();

  if (!data) {
    throw HttpError(404, "Exersises not found");
  }
  res.json(data);
};
const getExerciseById = async (req, res) => {
  const { exerciseId } = req.params;
  const exercise = await Exercise.findById(exerciseId);
  if (!exercise) {
    throw HttpError(404, "Exercise not found");
  }
  res.json(exercise);
};
module.exports = { getAllExercises, getExerciseById };
