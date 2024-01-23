const { Diary } = require('../../../models/diary');
const { Food } = require('../../../models/food');
const { Exercise } = require('../../../models/training');
const HttpError = require('../../../helpers/HttpError');

async function addEntry(req, res, next) {
    const { date, productData, exerciseData } = req.body;
    const userId = req.user.id;
    try {
        const diary = await Diary.findOneAndUpdate(
            { user: userId, date },
            { $setOnInsert: { user: userId, date } },
            { new: true, upsert: true }
        );

        if (productData) {
            const product = await Food.findById(productData.productId);

            if (!product) {
                throw HttpError(404, 'Product not found');
            }

            const calories = (productData.amount / product.weight) * product.calories;
            const updatedProductData = { ...productData, calories };

            await Diary.updateOne(
                { _id: diary._id },
                { $push: { products: updatedProductData } }
            );
        }

        if (exerciseData) {
            const exercise = await Exercise.findById(exerciseData.exerciseId);

            if (!exercise) {
                throw HttpError(404, 'Exercise not found');
            }

            const burnedCalories = parseFloat((exerciseData.time / exercise.time * exercise.burnedCalories).toFixed(2));
            const updatedExerciseData = { ...exerciseData, burnedCalories };

            await Diary.updateOne(
                { _id: diary._id },
                { $push: { exercises: updatedExerciseData } }
            );
        }

        res.status(201).json({ message: 'Entry added successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = addEntry;