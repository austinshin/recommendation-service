const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient(6379, 'localhost' || 'redis');

const hset = promisify(client.hset).bind(client);
const hget = promisify(client.hget).bind(client);

client.on('error', err => {
  console.log('Something went wrong ', err);
});

const addToContentList = recommendedList =>
  hset('contentlist', recommendedList[0], JSON.stringify(recommendedList[1]));

const doSomething = () => hset('test', 'hello', '123');

const getSomething = () => hget('test', 'hello');

const addToCollaborativeList = recommendedList =>
  hset('collablist', recommendedList[0], JSON.stringify(recommendedList[1]));

const getCollaborativeRecommendedList = user_id => hget('collablist', user_id);

const getContentRecommendedList = user_id => hget('contentlist', user_id);

const flushDatabase = () => client.flushdb();

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
  flushDatabase,
  doSomething,
  getSomething,
};
