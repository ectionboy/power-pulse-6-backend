const express = require('express');
const router = express.Router();
const diaryController = require('../../controllers/diary');
const authenticate = require('../../middlewares/authenticate');
const validateBody = require('../../middlewares/validateBody');

const { diaryEntrySchema } = require('../../models/diary');

router.post('/add-entry', authenticate, validateBody(diaryEntrySchema), diaryController.addEntry);

router.delete('/delete-entry/:date/:entryId', authenticate, diaryController.deleteEntry);

router.get('/:date', authenticate, diaryController.getDiaryByDate);

module.exports = router;