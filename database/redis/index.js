const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();

const hset = promisify(client.hset).bind(client);
const hget = promisify(client.hget).bind(client);

client.on('error', err => {
  console.log('Something went wrong ', err);
});

const addToContentList = (recommendedList) =>
  hset('contentlist', recommendedList[0], JSON.stringify(recommendedList[1]));

const addToCollaborativeList = (recommendedList) =>
  hset('collablist', recommendedList[0], JSON.stringify(recommendedList[1]));

const getCollaborativeRecommendedList = user_id =>
  hget('collablist', user_id);

const getContentRecommendedList = user_id =>
  hget('contentlist', user_id);

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
