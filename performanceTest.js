const siege = require('siege');

siege()
  .on(3000)
  .for(2000)
  .times.get('/benchmarkping')
  .get('/api/getUser', { user_id: 5 })
  .get('/api/getProduct', { product_id: 5 })
  .get('/api/getContentRecommendedList', { user_id: 5 })
  .get('/api/getCollaborativeRecommendedList', { user_id: 5 })
  .attack();
