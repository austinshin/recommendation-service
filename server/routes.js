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
