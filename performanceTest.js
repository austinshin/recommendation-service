const siege = require('siege');

siege()
  .on(3000)
  .for(2000)
  .times.get('/')
  .get('/api/getUser')
  .get('/api/getProduct')
  .get('/api/getContentRecommendedList')
  .get('/api/getCollaborativeRecommendedList')
  .attack();
