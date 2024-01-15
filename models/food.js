const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    groupBloodNotAllowed: {
        type: Object
    }
});

const Food = mongoose.model('Food', foodSchema, 'products');

module.exports = Food;
