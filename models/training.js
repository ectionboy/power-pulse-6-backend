const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema(
  {
    bodyPart: String,
    equipment: String,
    gifUrl: String,
    name: String,
    target: String,
    burnedCalories: Number,
    time: Number,
  },
  { timestamps: true, versionKey: false }
);

const filterSchema = new Schema(
  {
    filter: String,
    name: String,
    imgURL: String,
  },
  { timestamps: true, versionKey: false }
);

const Exercise = model("exercise", exerciseSchema);
const Filter = model("filter", filterSchema);

module.exports = {
  Exercise,
  Filter,
};
