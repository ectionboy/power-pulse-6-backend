const { Diary } = require('../../../models/diary');
const HttpError = require('../../../helpers/HttpError');

async function deleteEntry(req, res, next) {
    const { userId, date, productEntryId, exerciseEntryId } = req.body;

    try {
        const diary = await Diary.findOne({ user: userId, date });

        if (!diary) {
            throw HttpError(404, 'Diary entry not found');
        }

        if (productEntryId && !diary.products.some(product => product._id.toString() === productEntryId)) {
            throw HttpError(404, 'Product entry not found');
        }

        if (exerciseEntryId && !diary.exercises.some(exercise => exercise._id.toString() === exerciseEntryId)) {
            throw HttpError(404, 'Exercise entry not found');
        }

        const update = {};
        if (productEntryId) {
            update.$pull = { products: { _id: productEntryId } };
        }

        if (exerciseEntryId) {
            update.$pull = update.$pull || {};
            update.$pull.exercises = { _id: exerciseEntryId };
        }

        if (update.$pull) {
            await Diary.updateOne({ _id: diary._id }, update);
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = deleteEntry;