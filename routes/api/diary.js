const express = require('express');
const router = express.Router();
const diaryController = require('../../controllers/diary');
const authenticate = require('../../middlewares/authenticate');
const validateBody = require('../../middlewares/validateBody');

const { diaryEntrySchema, deleteEntrySchema } = require('../../models/diary');

router.post('/add-entry', authenticate, validateBody(diaryEntrySchema), diaryController.addEntry);

router.delete('/delete-entry', authenticate, validateBody(deleteEntrySchema), diaryController.deleteEntry);

router.get('/:userId/:date', authenticate, diaryController.getDiaryByDate);

module.exports = router;