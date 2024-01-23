const { Diary } = require('../../../models/diary');
const HttpError = require('../../../helpers/HttpError');

async function deleteEntry(req, res, next) {
    const { date, entryId } = req.params;
    const userId = req.user.id;
    try {
        const diary = await Diary.findOne({ user: userId, date });

        if (!diary) {
            throw HttpError(404, 'Diary entry not found');
        }

        const update = {};
        let found = false;

        if (diary.products.some(product => product._id.toString() === entryId)) {
            update.$pull = { products: { _id: entryId } };
            found = true;
        } else if (diary.exercises.some(exercise => exercise._id.toString() === entryId)) {
            update.$pull = { exercises: { _id: entryId } };
            found = true;
        }

        if (!found) {
            throw HttpError(404, 'Entry not found');
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