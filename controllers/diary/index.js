const Diary = require('../../models/diary');
const Food = require('../../models/food');
const Training = require('../../models/training');
const ctrlWrapper = require('../../helpers/ctrlWrapper');

const addEntry = ctrlWrapper(async (req, res, next) => {
	const { userId, date, productData, exerciseData } = req.body;

	const diary = await Diary.findOneAndUpdate(
		{ user: userId, date },
		{ $setOnInsert: { user: userId, date } },
		{ new: true, upsert: true }
	);

	if (productData) {
		const product = await Food.findById(productData.productId);

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		const calories = (productData.amount / product.weight) * product.calories;
		const updatedProductData = { ...productData, calories };

		await Diary.updateOne(
			{ _id: diary._id },
			{ $push: { products: updatedProductData } }
		);
	}
	if (exerciseData) {
		const exercise = await Training.findById(exerciseData.exerciseId);

		if (!exercise) {
			return res.status(404).json({ message: 'Exercise not found' });
		}

		const burnedCalories = parseFloat((exerciseData.time / exercise.time * exercise.burnedCalories).toFixed(2));
		const updatedExerciseData = { ...exerciseData, burnedCalories };

		await Diary.updateOne(
			{ _id: diary._id },
			{ $push: { exercises: updatedExerciseData } }
		);
	}

	res.status(201).json({ message: 'Entry added successfully' });
});


const deleteEntry = ctrlWrapper(async (req, res, next) => {
	const { userId, date, productId, exerciseId } = req.body;

	const diary = await Diary.findOne({ user: userId, date });

	if (!diary) {
		return res.status(404).json({ message: 'Diary entry not found' });
	}

	if (productId) {
		await Diary.updateOne(
			{ _id: diary._id },
			{ $pull: { products: { productId } } }
		);
	}

	if (exerciseId) {
		await Diary.updateOne(
			{ _id: diary._id },
			{ $pull: { exercises: { exerciseId } } }
		);
	}

	res.status(204).send();
});

const getDiaryByDate = ctrlWrapper(async (req, res, next) => {
	const { userId, date } = req.params;

	const diary = await Diary.findOne({ user: userId, date })
		.populate({
			path: 'products.productId',
			model: 'Food',
			select: 'title category calories wight recomended',
		})
		.populate({
			path: 'exercises.exerciseId',
			model: 'Exercise',
			select: 'bodyPart equipment name target',
		});

	if (!diary) {
		return res.status(404).json({ message: 'Diary entry not found' });
	}

	res.status(200).json({ diary });
});


module.exports = {
	addEntry,
	deleteEntry,
	getDiaryByDate
};
