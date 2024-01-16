const ctrlWrapper = require('../../helpers/ctrlWrapper');
const addEntry = require('./addEntry/addEntry');
const deleteEntry = require('./deleteEntry/deleteEntry');
const getDiaryByDate = require('./getDiaryByDate/getDiaryByDate');

module.exports = {
	addEntry: ctrlWrapper(addEntry),
	deleteEntry: ctrlWrapper(deleteEntry),
	getDiaryByDate: ctrlWrapper(getDiaryByDate)
};
