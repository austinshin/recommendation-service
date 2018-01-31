const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const faker = require('faker');

// uncomment necessary sections

/*
// for creating users csv file
const csvWriter = createCsvWriter({
  path: __dirname + '/file4.csv',
  header: [{ id: 'user_id', title: 'user_id' }, { id: 'name', title: 'name' }],
});

const records = [];

// adjust from 0-2.5 2.5-5.0 5.0-7.5 7.5-10
for (let i = 0; i < 10000000; i++) {
  let obj = {};
  obj['user_id']= i;
  let name = faker.name.findName();
  obj['name'] = name;
  records.push(obj);
}
*/

/*
// for creating inventory csv file
const csvWriter = createCsvWriter({
  path: __dirname + '/inventory.csv',
  header: [{ id: 'product_id', title: 'product_id'}, { id: 'name' , title: 'name' }  , { id: 'description' , title: 'description' }  , { id: 'price' , title: 'price' }  , { id: 'color' , title: 'color' }  , { id: 'size' , title: 'size' }  , { id: 'inventory' , title: 'inventory' } , { id: 'avg_rating' , title: 'avg_rating' }  , { id: 'review_count' , title: 'review_count' }  , { id: 'category' , title: 'category' }, { id: 'subcategory' , title: 'subcategory' }, { id: 'department' , title: 'department' }],
});

const records = [];

for (let i = 0; i < 3000; i++) {
  let obj = {
    product_id: i,
    name: faker.commerce.productName(),
    description: faker.commerce.productAdjective(),
    price: faker.commerce.price(),
    color: faker.commerce.color(),
    size: 'medium',
    inventory: Math.floor(Math.random() * 100),
    avg_rating: Math.floor(Math.random() * 6),
    review_count: Math.floor(Math.random() * 501),
    category: faker.commerce.department(),
    subcategory: faker.commerce.productMaterial(),
    department: faker.commerce.department(),
  };
  records.push(obj);
} */

/*
// for creating event csv file
const csvWriter = createCsvWriter({
  path: __dirname + '/events10.csv',
  header: [{ id: 'event_type', title: 'event_type' }, { id: 'product_id', title: 'product_id' }, { id: 'user_id', title: 'user_id' }],
});

const records = [];
const event_array = ['wishlist', 'cart', 'order', 'view', 'click'];
// adjust from 0-2.5 2.5-5.0 5.0-7.5 7.5-10
for (let i = 45000000; i < 50000000; i++) {
  let obj = {
  	event_type: event_array[Math.floor(Math.random() * 5)],
  	product_id: Math.floor(Math.random() * 3000),
  	user_id: Math.floor(Math.random() * 10000000),
  }
  records.push(obj);
}
*/

csvWriter
  .writeRecords(records) // returns a promise
  .then(() => {
    console.log('...Done');
  });
