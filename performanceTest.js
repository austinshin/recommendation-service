const siege = require('siege');

siege()
  .on(3000)
  .for(10000)
  .times.get('/api/getContentRecommendedList').for(100).seconds
  .get('/').for(100).seconds
  .attack();
