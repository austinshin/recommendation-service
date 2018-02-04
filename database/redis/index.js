const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();

const lrangeAsync = promisify(client.lrange).bind(client);
const getAsync = promisify(client.get).bind(client);
const rpushAsync = promisify(client.rpush).bind(client);

client.on('error', err => {
  console.log('Something went wrong ', err);
});

const addToContentList = recommendedList =>
  rpushAsync('contentlist', JSON.stringify(recommendedList));

const addToCollaborativeList = recommendedList =>
  rpushAsync('collablist', JSON.stringify(recommendedList));

const getCollaborativeRecommendedList = user_id =>
  lrangeAsync('collablist', user_id, user_id).then(res => res);

const getContentRecommendedList = user_id =>
  lrangeAsync('contentlist', user_id, user_id).then(res => res);

/*
client.hgetall('hashkey', function(err, result) {
  console.log(JSON.stringify(result)); // {"key":"value","second key":"second value"}
});
*/

module.exports = {
  client,
  addToContentList,
  addToCollaborativeList,
  getCollaborativeRecommendedList,
  getContentRecommendedList,
};
