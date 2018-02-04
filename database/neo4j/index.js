const neo4j = require('neo4j-driver').v1;
const util = require('./helpers.js');

const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', '123'),
);
const session = driver.session();

// create a user of userid
const createUser = user_id => {
  session
    .run(`CREATE (user: USER {user_id: {user_id}})`, {
      user_id,
    })
    .then(() => session.close())
    .catch(err => console.error(err));
};

const createProduct = product => {
  session
    .run(
      `CREATE (product:PRODUCT {product_id: {product_id}, name:{name}, description:{description}, price:{price}, color:{color}, size:{size}, inventory:{inventory}, avg_rating:{avg_rating}, review_count:{review_count}, category:{category}, subcategory:{subcategory}, department:{department}})`,
      {
        product_id: product.product_id,
        name: product.name,
        description: product.description,
        price: product.price,
        color: product.color,
        size: product.size,
        inventory: product.inventory,
        avg_rating: product.avg_rating,
        review_count: product.review_count,
        category: product.category,
        subcategory: product.subcategory,
        department: product.department,
      },
    )
    .then(() => session.close())
    .catch(err => console.error(err));
};
// performs a query to grab user based on id
const getUser = user_id =>
  session
    .run(`MATCH (user: USER {user_id: {user_id}}) RETURN user`, {
      user_id,
    })
    .then(results => {
      session.close();
      return results.records[0];
    })
    .catch(err => console.error(err));

const getProduct = product_id =>
  session
    .run(`MATCH (product: PRODUCT {product_id: {product_id}}) RETURN product`, {
      product_id,
    })
    .then(results => {
      session.close();
      return results.records[0];
    })
    .catch(err => console.error(err));

const getCollaborativeRecommendedList = user_id =>
  session
    .run(
      `MATCH (a:USER {user_id: {user_id}})-[:RELATION]->(similarProduct)<-[:RELATION]-(product),(product)-[:RELATION]->(recommendedProduct) RETURN recommendedProduct.name AS Recommended, count(*) AS Strength ORDER BY Strength DESC LIMIT 5`,
      {
        user_id,
      },
    )
    .then(results => {
      const collabRecList = util.parseRecordsToArray(results.records);
      session.close();
      return collabRecList;
    })
    .catch(err => console.error(err));

const getContentRecommendedList = user_id =>
  session
    .run(
      `MATCH (a:USER {user_id: {user_id}})-[:RELATION]->(similarProduct)<-[:RELATION]-(product),(product)-[:RELATION]->(recommendedProduct) RETURN recommendedProduct.name AS Recommended, count(*) AS Strength ORDER BY Strength DESC LIMIT 5`,
      {
        user_id,
      },
    )
    .then(results => {
      const contentRecList = util.parseRecordsToArray(results.records);
      session.close();
      return contentRecList;
    })
    .catch(err => console.error(err));

const createRelationship = () => {
  const relationshipList = generateFakeRelationships(10000, 1000, 5000);
  for (let i = 0; i < relationshipList.length; i++) {
    session.run(
      `MATCH(a: USER {id: {userId}}), (b:ITEM {id:{productId}}) CREATE (a)-[r:${
        relationshipList[i].event
      }]->(b) RETURN r`,
      {
        userId: relationshipList[i].userId,
        productId: relationshipList[i].productId,
        event: relationshipList[i].event,
      },
    );
  }
};

module.exports = {
  createUser,
  createProduct,
  createRelationship,
  getUser,
  getProduct,
  getCollaborativeRecommendedList,
  getContentRecommendedList,
};
