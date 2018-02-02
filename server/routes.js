const express = require('express');
const session = require('express-session');
const redis = require('../database/redis');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(session);
const neo4j = require('../database/neo4j');
const aws = require('aws-sdk');
const queueUrl = require('../config/configQueueUrl.js');

aws.config.loadFromPath(`${__dirname}/../config/config.json`);

const receipt = '';

const sqs = new aws.SQS();

const router = express.Router();
router.use(cookieParser());

// what does this session do?
router.use(passport.initialize());
router.use(passport.session());

router.use(
  session({
    store: new RedisStore({
      host: 'localhost',
      port: 6379,
      client: redis.client,
      ttl: 260,
    }),
    secret: 'backazon',
    resave: false,
    saveUninitialized: false,
  }),
);

router.get('/', async (req, res) => {
  res.sendStatus(201);
});

// getting a user in the db
router.get('/api/getUser', async (req, res) => {
  try {
    //make sure it is in string format
    let user = await neo4j.getUser('1');
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

// getting a product in the db
router.get('/api/getProduct', async (req, res) => {
  try {
    //make sure it is in string format
    let product = await neo4j.getProduct('15');
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

// answers client's get request
router.get('/api/getCollaborativeRecommendedList', async (req, res) => {
  // query redis
  //   yes results.
  //     return
  //   no results
  //     query neo4j
  //       yes results.
  //       return
  //    no results
  //       return 'no recommended list for said user'
  try {
    let collabList = await neo4j.getCollaborativeRecommendedList('6');
    return res.status(200).json(collabList);
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

// answers client's get request
router.get('/api/getContentRecommendedList', async (req, res) => {
  // query redis
  //   yes results.
  //     return
  //   no results
  //     query neo4j
  //       yes results.
  //       return
  //    no results
  //       return 'no recommended list for said user'
  try {
    let contentList = await neo4j.getContentRecommendedList('5');
    return res.status(200).json(contentList);
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

//setInterval or chronjob this function
const someFunctionEveryOneDay = () => {
  // fetch('/getTopTrendingItems')
  // fetch('/getUserAnalytics')
  // on success
  //   query neo4j relevant info.
  // if there is a new user...
  //   create a new user
  // if there is a new product...
  //   create a new product
  // if there are new relationships
  //   create those relationships.
}

// inserting users into to redis db
router.get('/api/redisUpdateUsers', (req, res) => {
  redis.updateUsers();
  return res.status(201);
});

// inserting inventory items into redis db
router.get('/api/redisUpdateInventory', (req, res) => {
  try {
    // if (!req.session.passport) {
    //   console.log('here');
    //   return res.sendStatus(401);
    // }
    // query to redis by req.session.userId
    redis.updateInventory();
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.get('/api/neoLoadUsers', (req, res) => {
  neo4j.loadUsers();
  return res.status(201);
});

router.get('/api/neoLoadItems', (req, res) => {
  neo4j.loadItems();
  return res.status(201);
});

router.get('/api/neoCreateRelationships', (req, res) => {
  neo4j.createRelationships();
  return res.status(201);
});

// AMAZON SQS related stuff
router.get('/create', (req, res) => {
  const params = {
    QueueName: 'MyFirstQueue',
  };

  sqs.createQueue(params, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
router.get('/list', (req, res) => {
  sqs.listQueues((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.get('/send', (req, res) => {
  const params = {
    MessageBody: JSON.stringify({"hello": 'world'}),
    QueueUrl: queueUrl,
    DelaySeconds: 0,
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.get('/receive', (req, res) => {
  const params = {
    QueueUrl: queueUrl,
    VisibilityTimeout: 600, // 10 min wait time for anyone else to process.
  };

  sqs.receiveMessage(params, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
      console.log(data.Messages[0].Body);
    }
  });
});

router.get('doAll', (req, res) => {});

module.exports = router;
