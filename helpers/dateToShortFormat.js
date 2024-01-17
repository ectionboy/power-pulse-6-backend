const dateToShortFormat = (date) => {
  const incomingDate = new Date(date);
  const year = incomingDate.getFullYear();
  const month = String(incomingDate.getMonth() + 1).padStart(2, '0');
  const day = String(incomingDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
module.exports = dateToShortFormat;
