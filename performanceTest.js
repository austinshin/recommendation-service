const siege = require('siege');

siege()
  .on(3000)
  .for(1000000)
  .times
  .get('/api/getContentRecommendedList', { user_id: 5 })
  .attack();
