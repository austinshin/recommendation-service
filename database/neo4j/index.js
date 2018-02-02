// const neo4j = require('neo4j');
const neo4j = require('neo4j-driver').v1;
// const inventory = require('./../../data/inventory');
// const users = require('./../../data/users2');
const util = require('./helpers.js');
const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', '123'),
);
const session = driver.session();

const names = [];

// session.run(`CREATE (user:USER {id: 12490182040, name: 'fasdghjasiojf'})`);

// create a user of userid
const createUser = (user_id, name) => {
  session
    .run(`CREATE (user: USER {user_id: {user_id}, name: {name}})`, {
      user_id,
      name,
    })
    .then(() => session.close())
    .catch(err => console.error(err));
};

// performs a query to grab user based on id
const getUser = user_id => {
 return session
    .run(`MATCH (user: USER {user_id: {user_id}}) RETURN user`, {
      user_id,
    })
    .then(results => {
      session.close();
      return results.records[0];
    })
    .catch(err => console.error(err));
};

const getProduct = product_id => {
  return session.run(`MATCH (product: PRODUCT {product_id: {product_id}}) RETURN product`, {
    product_id,
  })
  .then(results => {
    session.close();
    return results.records[0];
  })
  .catch(err => console.error(err));
};

const getCollaborativeRecommendedList = user_id => {
  return session.run(`MATCH (a:USER {user_id: {user_id}})-[:RELATION]->(similarProduct)<-[:RELATION]-(product),(product)-[:RELATION]->(recommendedProduct) RETURN recommendedProduct.name AS Recommended, count(*) AS Strength ORDER BY Strength DESC LIMIT 3`, {
  user_id,
  })
  .then(results => {
    const collabRecList = util.parseRecordsToArray(results.records);
    session.close();
    return collabRecList;
  })
  .catch(err => console.error(err));
};

const getContentRecommendedList = user_id => {
  return session.run(`MATCH (a:USER {user_id: {user_id}})-[:RELATION]->(similarProduct)<-[:RELATION]-(product),(product)-[:RELATION]->(recommendedProduct) RETURN recommendedProduct.name AS Recommended, count(*) AS Strength ORDER BY Strength DESC LIMIT 2`, {
  user_id,
  })
  .then(results => {
    const contentRecList = util.parseRecordsToArray(results.records);
    session.close();
    return contentRecList;
  })
  .catch(err => console.error(err));
};

/*
for (const key in users) {
  for (const k in users[key]) {
    session.run(`CREATE (user: USER {id: {id}, name: {name}})`,{id: users[key][k].id,name: users[key][k].name,})
    .then(() => {
      console.log(' ');
      console.log('asd');
      session.close();
    })
    .catch(err => console.error(err));
  }
  count2j += 1;
    if (count2j === 50000) {
      console.log('done');
      break;
    }
}
console.log('done!');
// console.log('user count: ', count2j);

// make a user node with some sort of random actions that I use to store into my database
// afterwards I create
// load all the users.
// load all the items.
// FOR EACH USER
//   FOR EACH EVENT
//     CREATE RELATIONSHIP WITH ITEMS
// RELATIONSHIPS CREATED.
//

const loadUsers = () => {
  for (const key in users) {
    for (const k in users[key]) {
      session.run(
        `CREATE (user: USER {id: {id}, name:{name}})`,
        {
          id: users[key][k].id,
          name: users[key][k].name,
        },
      );
    }
  }
};

const loadItems = () => {
  for (const key in inventory) {
    for (const k in inventory[key]) {
      session.run(`CREATE (product:PRODUCT {product_id: {product_id}, name:{name}, description:{description}, price:{price}, color:{color}, size:{size}, inventory:{inventory}, avg_rating:{avg_rating}, review_count:{review_count}, category:{category}, subcategory:{subcategory}, department:{department}})`, {
        product_id: inventory[key][k].product_id,
        name: inventory[key][k].name,
        description: inventory[key][k].description,
        price: inventory[key][k].price,
        color: inventory[key][k].color,
        size: inventory[key][k].size,
        inventory: inventory[key][k].inventory,
        avg_rating: inventory[key][k].avg_rating,
        review_count: inventory[key][k].review_count,
        category: inventory[key][k].category,
        subcategory: inventory[key][k].subcategory,
        department: inventory[key][k].department,
      });
    }
  }
};

const createRelationships = () => {
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
*/

module.exports = {
  getUser,
  getProduct,
  getCollaborativeRecommendedList,
  getContentRecommendedList,
  //  loadItems,
  // loadUsers,
  // createRelationships,
};
