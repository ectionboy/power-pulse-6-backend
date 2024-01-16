const Diary = require('../../../models/diary');

async function deleteEntry(req, res, next) {
    const { userId, date, productId, exerciseId } = req.body;

    const diary = await Diary.findOne({ user: userId, date });

    if (!diary) {
        throw new Error('Diary entry not found');
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
}

module.exports = deleteEntry;