const assert = require('assert');
const expect = require('chai').expect;

//routes
//test if server is up using '/benchmarkping'
//test getting a user endpoint using '/api/getUser'
//test getting a product endpoint using '/api/getProduct'
//test getting a collaborative recommended list using '/api/getCollaborativeRecommendedList'
//test getting a content recommended list using '/api/getContentRecommendedList'
//test updating redis using '/api/redisUpdateCollaborativeRecommendedList'
//test updating redis using '/api/redisUpdateContentRecommendedList'
//add queue tests here
//add fetching from user analytics service and inventory service for correct items and updating database properly.

describe('Routes Tests', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
/*

const assert = require('assert');
const expect = require('chai').expect;
const db = require('../database/redis');

describe('Redis Tests', () => {
  describe('redis content list hash', () => {
    it('should add to content list hash in redis without error', async () => {
      await db.addToContentList([10, ['product1 test', 'product2 test']]);
    });
    it('should get from content list hash in redis', async () => {
      let contentList = await db.getContentRecommendedList(10);
      contentList = JSON.parse(contentList);
      expect(contentList).to.include.members([
        'product1 test',
        'product2 test',
      ]);
    });
  });

  describe('redis collaborative list hash', () => {
    it('should add to collaborative list hash in redis without error', async () => {
      await db.addToCollaborativeList([11, ['product1 test', 'product2 test']]);
    });
    it('should get from collaborative list hash in redis', async () => {
      let collaborativeList = await db.getCollaborativeRecommendedList(11);
      collaborativeList = JSON.parse(collaborativeList);
      expect(collaborativeList).to.include.members([
        'product1 test',
        'product2 test',
      ]);
    });
  });
  */

