const assert = require('assert');
const expect = require('chai').expect;
const db = require('../database/neo4j');

// test getting a recommended list (collaborative)
// test getting a recommended list (content)
//

describe('Neo4J Tests', () => {
  describe('Neo4J create and get user', () => {
    it('should create and get user', async () => {
      await db.createUser('20211111');
      const user = await db.getUser('20211111');
      await db.deleteUser('20211111');
      expect(user.keys[0]).to.equal('user');
    });
  });
  describe('Neo4J create and get product', () => {
    it('should create and get product', async () => {
      await db.createProduct({
        product_id: '20211112',
        name: 'testProduct',
        description: 'testDescription',
        price: '20.05',
        color: 'blue',
        size: 'medium',
        inventory: 7,
        avg_rating: 3.5,
        review_count: 23,
        category: 'test',
        subcategory: 'test',
        department: 'testingDepartment',
      });
      const product = await db.getProduct('20211112');
      await db.deleteProduct('20211112');
      expect(product.keys[0]).to.equal('product');
    });
  });
  describe('Neo4J create a relationship', () => {
    it('should create a relationship between a user and product', async () => {
      await db.createUser('22222222');
      await db.createProduct({
        product_id: '20211112',
        name: 'testProduct',
        description: 'testDescription',
        price: '20.05',
        color: 'blue',
        size: 'medium',
        inventory: 7,
        avg_rating: 3.5,
        review_count: 23,
        category: 'test',
        subcategory: 'test',
        department: 'testingDepartment',
      });
      await db.createRelationship('22222222', '20211112', 'CLICK');
      const r = await db.getRelationship('22222222');
      await db.deleteUser('22222222');
      await db.deleteProduct('20211112');
      expect(r).to.not.equal(null);
    });
  });
  describe('Neo4J collaboration recommendation', () => {
    it('should return a collaboration recommended result', async () => {
      await db.createUser('11111111');
      await db.createUser('22222222');
      await db.createProduct({
        product_id: '33333333',
        name: 'testProduct',
        description: 'testDescription',
        price: '20.05',
        color: 'blue',
        size: 'medium',
        inventory: 7,
        avg_rating: 3.5,
        review_count: 23,
        category: 'test',
        subcategory: 'test',
        department: 'testingDepartment',
      });
      await db.createProduct({
        product_id: '44444444',
        name: 'testProduct',
        description: 'testDescription',
        price: '20.05',
        color: 'blue',
        size: 'medium',
        inventory: 7,
        avg_rating: 3.5,
        review_count: 23,
        category: 'test',
        subcategory: 'test',
        department: 'testingDepartment',
      });
      await db.createRelationship('22222222', '33333333', 'CLICK');
      await db.createRelationship('11111111', '33333333', 'CLICK');
      await db.createRelationship('11111111', '44444444', 'CLICK');
      const r = await db.getCollaborativeRecommendedList('22222222');
      await db.deleteUser('11111111');
      await db.deleteUser('22222222');
      await db.deleteProduct('33333333');
      await db.deleteProduct('44444444');
      expect(r).to.include.members(['testProduct']);
    });
  });
  describe('Neo4J content recommendation', () => {
    it('should return a content recommended result', async () => {
      await db.createUser('11111111');
      await db.createUser('22222222');
      await db.createProduct({
        product_id: '33333333',
        name: 'testProduct',
        description: 'testDescription',
        price: '20.05',
        color: 'blue',
        size: 'medium',
        inventory: 7,
        avg_rating: 3.5,
        review_count: 23,
        category: 'test',
        subcategory: 'test',
        department: 'testingDepartment',
      });
      await db.createProduct({
        product_id: '44444444',
        name: 'testProduct',
        description: 'testDescription',
        price: '20.05',
        color: 'blue',
        size: 'medium',
        inventory: 7,
        avg_rating: 3.5,
        review_count: 23,
        category: 'test',
        subcategory: 'test',
        department: 'testingDepartment',
      });
      await db.createRelationship('22222222', '33333333', 'CLICK');
      await db.createRelationship('11111111', '33333333', 'CLICK');
      await db.createRelationship('11111111', '44444444', 'CLICK');
      const r = await db.getContentRecommendedList('22222222');
      await db.deleteUser('11111111');
      await db.deleteUser('22222222');
      await db.deleteProduct('33333333');
      await db.deleteProduct('44444444');
      expect(r).to.include.members(['testProduct']);
    });
  });
});
