const { Diary } = require('../../../models/diary');
const HttpError = require('../../../helpers/HttpError');
const dateToShortFormat = require('../../../helpers/dateToShortFormat');
const { Profile } = require('../../../models/profile');

async function getDiaryByDate(req, res, next) {
    const { date } = req.params;
    const userId = req.user.id;
    try {
        const profile = await Profile.findOne({ owner: userId });
        if (!profile) {
            throw HttpError(404, 'User profile not found');
        }
        const userBloodGroup = profile.blood;

        const diary = await Diary.findOne({ user: userId, date })
            .populate({
                path: 'products.productId',
                model: 'product',
                select: 'title category calories weight groupBloodNotAllowed'
            })
            .populate({
                path: 'exercises.exerciseId',
                model: 'exercise',
                select: 'bodyPart equipment name target burnedCalories time'
            });

        if (!diary) {
            const emptyDiary = {
                date: date,
                products: [],
                exercises: []
            };
            return res.status(200).json({ diary: emptyDiary });
        }

        const diaryObject = diary.toObject();
        diaryObject.date = dateToShortFormat(diaryObject.date);

        diaryObject.products.forEach(product => {
            product.recommend = !product.productId.groupBloodNotAllowed[userBloodGroup];

        });

        res.status(200).json({ diary: diaryObject });
    } catch (error) {
        next(error);
    }
}

module.exports = getDiaryByDate;
