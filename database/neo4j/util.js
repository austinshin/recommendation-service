
const parseRecordsToArray = (records) => {
  let recList = [];
records.forEach(item => {
  recList.push(item._fields[0]);
});
};
