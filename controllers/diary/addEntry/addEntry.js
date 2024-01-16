const Diary = require('../../../models/diary');
const { Food } = require('../../../models/food');
const { Exercise } = require('../../../models/training');

async function addEntry(req, res, next) {
    const { userId, date, productData, exerciseData } = req.body;

    const diary = await Diary.findOneAndUpdate(
        { user: userId, date },
        { $setOnInsert: { user: userId, date } },
        { new: true, upsert: true }
    );

    if (productData) {
        const product = await Food.findById(productData.productId);

        if (!product) {
            throw new Error('Product not found');
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
            throw new Error('Exercise not found');
        }

        const burnedCalories = parseFloat((exerciseData.time / exercise.time * exercise.burnedCalories).toFixed(2));
        const updatedExerciseData = { ...exerciseData, burnedCalories };

        await Diary.updateOne(
            { _id: diary._id },
            { $push: { exercises: updatedExerciseData } }
        );
    }

    res.status(201).json({ message: 'Entry added successfully' });
}

module.exports = addEntry;