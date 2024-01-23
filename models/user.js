const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError, patterns } = require("../helpers");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: patterns.email,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    avatarLargeURL: {
      type: String,
      required: true,
    },
    isParams: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(patterns.email).required(),
  password: Joi.string().min(6).max(15).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(patterns.email).required(),
  password: Joi.string().min(6).max(15).required(),
});

const emailRequest = Joi.object({
  email: Joi.string().pattern(patterns.email).required(),
});

// const updatePassword = Joi.object({
//   token: Joi.string().required(),
//   password: Joi.string().min(6).max(24).required(),
// });

const updateUser = Joi.object({
  name: Joi.string(),
  // email: Joi.string().pattern(patterns.email),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailRequest,
  // updatePassword,
  updateUser,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
