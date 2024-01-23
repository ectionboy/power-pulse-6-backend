const { Diary } = require('../../../models/diary');
const HttpError = require('../../../helpers/HttpError');
const dateToShortFormat = require('../../../helpers/dateToShortFormat');

async function getDiaryByDate(req, res, next) {
    const { date } = req.params;
    const userId = req.user.id;
    try {
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
            throw HttpError(404, 'Diary entry not found');
        }

        const diaryObject = diary.toObject();

        diaryObject.date = dateToShortFormat(diaryObject.date);

        res.status(200).json({ diary: diaryObject });
    } catch (error) {
        next(error);
    }
}

module.exports = getDiaryByDate;
