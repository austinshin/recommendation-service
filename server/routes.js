const express = require('express');
const session = require('express-session');
const redis = require('../database/redis');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(session);
const neo4j = require('../database/neo4j');

const router = express.Router();
router.use(cookieParser());

// what does this session do?
router.use(passport.initialize());
router.use(passport.session());

router.use(
  session({
    store: new RedisStore({ host: 'localhost', port: 6379, client: redis.client, ttl: 260 }),
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

router.get('doAll', (req, res) => {
});

module.exports = router;
