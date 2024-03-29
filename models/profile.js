const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const sexType = ["male", "female"];
const bloodType = [1, 2, 3, 4];
const levelActivityType = [1, 2, 3, 4, 5];
const minAge = 568025136000;

const profileSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
    },
    height: {
      type: Number,
      min: 150,
      max: 210,
      required: [true, "Define current user height"],
    },
    currentWeight: {
      type: Number,
      required: [true, "Define current user weight"],
      min: 35,
      max: 160,
    },
    desiredWeight: {
      type: Number,
      required: [true, "Define desired user weight"],
      min: 35,
      max: 160,
    },
    sex: {
      type: String,
      required: [true, "Define user sex"],
      enum: sexType,
    },
    blood: {
      type: Number,
      required: [true, "Define user blood group"],
      enum: bloodType,
    },
    levelActivity: {
      type: Number,
      required: [true, "Define user activity level"],
      enum: levelActivityType,
    },
    birthday: {
      type: Date,
      required: [true, "Define user birthday"],
    },
    bmr: {
      type: Number,
      default: 0,
    },
    sportTime: {
      type: Number,
      default: 110,
    },
  },
  { versionKey: false }
);

profileSchema.post("save", handleMongooseError);

const Profile = model("profile", profileSchema);

const createProfile = Joi.object({
  name: Joi.string().trim().allow(""),
  height: Joi.number().min(150).max(220).required(),
  currentWeight: Joi.number().min(35).max(160).required(),
  desiredWeight: Joi.number().min(35).max(160).required(),
  sex: Joi.string()
    .valid(...sexType)
    .required(),
  blood: Joi.number()
    .valid(...bloodType)
    .required(),
  levelActivity: Joi.number()
    .valid(...levelActivityType)
    .required(),
  birthday: Joi.date()
    .less(Date.now() - minAge)
    .required()
    .messages({
      "date.base":
        "Date must have any valid ISO date format, for example YYYY-MM-DD.",
      "date.less": "User must be over 18 y.o.",
      "any.required": "birthday field is required.",
    }),
});

const schemas = {
  createProfile,
};

module.exports = {
  schemas,
  Profile,
};
