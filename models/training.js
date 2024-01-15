const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    bodyPart: {
        type: String,
        required: true
    },
    equipment: {
        type: String,
        required: true
    },
    gifUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    burnedCalories: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
});

const Exercise = mongoose.model('Exercise', exerciseSchema, 'exercises');

module.exports = Exercise;
