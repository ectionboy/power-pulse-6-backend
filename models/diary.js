const mongoose = require('mongoose');
const Joi = require('joi');
const handleMongooseError = require('../helpers/handleMongooseError');

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
            type: Date,
            required: true
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
            ref: 'Exercise',
            required: true
        },
        date: {
            type: Date,
            required: true
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

diarySchema.post('save', handleMongooseError);
diarySchema.post('update', handleMongooseError);
diarySchema.post('findOneAndUpdate', handleMongooseError);
diarySchema.post('insertMany', handleMongooseError);

const Diary = mongoose.model('Diary', diarySchema);

const diaryEntrySchema = Joi.object({
    userId: Joi.string().required(),
    date: Joi.string().required().pattern(/^\d{4}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2][0-9])|(3[0-1]))$/),
    productData: Joi.object({
        productId: Joi.string().required(),
        amount: Joi.number().min(1).required(),
        // calories: Joi.number().min(1).required()
    }).optional(),
    exerciseData: Joi.object({
        exerciseId: Joi.string().required(),
        time: Joi.number().min(1).required(),
        // burnedCalories: Joi.number().min(1).required()
    }).optional()
});

const deleteEntrySchema = Joi.object({
    userId: Joi.string().required(),
    date: Joi.string().required().pattern(/^\d{4}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2][0-9])|(3[0-1]))$/),
    entryId: Joi.string().required()
});

module.exports = diaryEntrySchema;

module.exports = {
    Diary,
    diaryEntrySchema,
    deleteEntrySchema
};