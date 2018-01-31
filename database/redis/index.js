const redis = require('redis');
const inventory = require('./../../data/inventory');
const users = require('./../../data/users2');

const client = redis.createClient();

client.on('error', err => {
  console.log('Something went wrong ', err);
});

// use hmset
//
//  users: { asdklfjaslkfjlksaf: lkajsdflkajsf }
const updateUsers = () => {
  console.log('updating users...');
  for (const key in users) {
    for (const k in users[key]) {
      client.hset('hashkey', k, JSON.stringify(users[key][k]));
    }
  }
};

const updateInventory = () => {
  console.log('updating inventory...');
  for (const key in inventory) {
    for (const k in inventory[key]) {
      client.hset('hashkey', k, JSON.stringify(inventory[key][k]));
    }
  }
};

/*
client.hgetall('hashkey', function(err, result) {
  console.log(JSON.stringify(result)); // {"key":"value","second key":"second value"}
});
*/

module.exports = {
  client,
  updateUsers,
  updateInventory,
};
