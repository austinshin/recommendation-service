// const neo4j = require('neo4j');
const neo4j = require('neo4j-driver').v1;
// const inventory = require('./../../data/inventory');
// const users = require('./../../data/users2');
const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', '123'),
);
const session = driver.session();

const names = [];

// session.run(`CREATE (user:USER {id: 12490182040, name: 'fasdghjasiojf'})`);
const count2j = 0;

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

const generateFakeRelationships = (
  numOfRelationships,
  numOfUsers,
  numOfProducts,
) => {
  const events = ['view', 'click', 'purchased', 'reviewed'];
  const completeRelationshipList = [];
  for (let i = 0; i < numOfRelationships; i++) {
    const relationship = {
      userId: Math.floor(Math.random() * numOfUsers + 1),
      productId: Math.floor(Math.random() * numOfProducts + 1),
      event: events[Math.floor(Math.random() * events.length)],
    };
    completeRelationshipList.push(relationship);
  }
  return completeRelationshipList;
};

// console.log(generateFakeRelationships(5000, 1000, 5000));

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
  //  loadItems,
  // loadUsers,
  // createRelationships,
};
