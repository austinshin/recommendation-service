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
      db.flushDatabase();
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
      db.flushDatabase();
      expect(collaborativeList).to.include.members([
        'product1 test',
        'product2 test',
      ]);
    });
  });
});
