const express = require('express');
const router = express.Router();
const diaryController = require('../../controllers/diary');
const authenticate = require('../../middlewares/authenticate');

router.post('/add-entry', authenticate, diaryController.addEntry);

router.delete('/delete-entry', authenticate, diaryController.deleteEntry);

router.get('/:userId/:date', authenticate, diaryController.getDiaryByDate);

module.exports = router;
