const { HttpError } = require("../../../helpers");
const { Exercise } = require("../../../models/training");

const getAllExercises = async (req, res) => {
  const { page = 1, limit = 16 } = req.query;
  const skip = (page - 1) * limit;

  const filters = {};
  if (req.query.bodyPart) {
    filters.bodyPart = { $regex: req.query.bodyPart, $options: "i" };
  }
  if (req.query.equipment) {
    filters.equipment = { $regex: req.query.equipment, $options: "i" };
  }
  if (req.query.target) {
    filters.target = { $regex: req.query.target, $options: "i" };
  }
  const data = await Exercise.find(filters).skip(skip).limit(limit);
  const total = await Exercise.countDocuments(filters);
  if (!data) {
    throw HttpError(404, "Exersises not found");
  }
  res.status(200).json({ total, page: +page, limit: +limit, data });
};
const getExerciseById = async (req, res) => {
  const { exerciseId } = req.params;
  const exercise = await Exercise.findById(exerciseId);
  if (!exercise) {
    throw HttpError(404, "Exercise not found");
  }
  res.status(200).json(exercise);
};
module.exports = { getAllExercises, getExerciseById };
