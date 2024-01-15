const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diarySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Food',
            required: true
        },
        date: {
            type: String,
            required: true,
            match: [/^([0-2][0-9]|(3)[0-1])\/(((0)[0-9])|((1)[0-2]))\/(\d{4})$/, 'Please fill a valid date format dd/mm/YYYY']
        },
        amount: {
            type: Number,
            required: true,
            min: 1
        },
        calories: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    exercises: [{
        exerciseId: {
            type: Schema.Types.ObjectId,
            ref: 'training',
            required: true
        },
        date: {
            type: String,
            required: true,
            match: [/^([0-2][0-9]|(3)[0-1])\/(((0)[0-9])|((1)[0-2]))\/(\d{4})$/, 'Please fill a valid date format dd/mm/YYYY']
        },
        time: {
            type: Number,
            required: true,
            min: 1
        },
        burnedCalories: {
            type: Number,
            required: true,
            min: 1
        }
    }]
});

const Diary = mongoose.model('Diary', diarySchema);

module.exports = Diary;