const Diary = require('../../../models/diary');

async function getDiaryByDate(req, res, next) {
    const { userId, date } = req.params;

    const diary = await Diary.findOne({ user: userId, date })
        .populate({
            path: 'products.productId',
            model: 'product',
            select: 'title category calories weight'
        })
        .populate({
            path: 'exercises.exerciseId',
            model: 'exercise',
            select: 'bodyPart equipment name target burnedCalories time'
        });

    if (!diary) {
        throw new Error('Diary entry not found');
    }

    res.status(200).json({ diary });
}

module.exports = getDiaryByDate;