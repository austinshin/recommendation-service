const parseRecordsToArray = (records) => {
  let recList = [];
  records.forEach(item => {
    recList.push(item._fields[0]);
  });
  return recList;
};

module.exports = {
  parseRecordsToArray,
}
