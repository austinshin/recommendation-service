const faker = require('faker');
const fs = require('fs');
const _progress = require('cli-progress');
const util = require('util');

const inventory = [];

const generateRandomBool = () => Math.floor(Math.random() * 2) === 1;

// uncomment necessary sections

// create a new progress bar instance and use shades_classic theme

/*
const bar1 = new _progress.Bar(
  { format: '[{bar}] {percentage}% | {value}/{total} | Duration: {duration}' },
  _progress.Presets.shades_classic,
);
bar1.start(2000000, 0);

const writeFile = util.promisify(fs.writeFile);
// update the current value in your application..

// stop the progress bar
// user creator
async function doStuff(n) {
  let count = n;
  for (let j = 0; j <= 5; j++) {
    const users = [];
    count += 1;
    for (let i = 0; i <= 2000000; i += 1) {
      // adjust number to 10 million later
      const user = {};
      const userCard = {};
      userCard.name = faker.name.findName();
      userCard.id = i;
      user[userCard.name] = userCard;
      users.push(user);
      bar1.increment(1);
    }
    const stringifiedUsers = JSON.stringify(users);
    console.log(users);
    const file = `users${count}.json`;
    await writeFile(file, stringifiedUsers);
  }
}

try {
  doStuff(1).then(() => {
    console.log('done');
  });
} catch (err) {
  console.error(err);
}

bar1.stop();
*/


/*
const bar2 = new _progress.Bar({}, _progress.Presets.shades_classic);
bar2.start(3000, 0);

// item creator
for (let j = 0; j <= 3000; j += 1) {
  const item = {};
  const itemName = faker.commerce.productName();
  item[itemName] = {
    product_id: j,
    name: itemName,
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
  inventory.push(item);
  bar2.update(j);
}

const stringifiedInventory = JSON.stringify(inventory);
fs.writeFile('inventory.json', stringifiedInventory, err => {
  if (err) throw err;
  console.log('inventory complete');
});
bar2.stop();
*/

/*
const event_array = ['wishlist', 'cart', 'purchase', 'view', 'click'];
const bar1 = new _progress.Bar({}, _progress.Presets.shades_classic);
const writeFile = util.promisify(fs.writeFile);

async function processArray(n, j) {
	bar1.start(n-1, 0);
	let event = []
	for (let i=0;i<n;i++) {
		event.push({
	    	'user_id': Math.floor(Math.random() * 10000000),
	    	'product_id': Math.floor(Math.random() * 3000),
	    	'event_type': event_array[Math.floor(Math.random() * event_array.length)],
	    })
	    bar1.update(i);
	}
	bar1.stop();
	return await writeFile(`events${j}.json`, JSON.stringify(event));
}

async function loopAll(fileNum, n) {
	for (var j=0;j<fileNum;j++) {
		await processArray(n, j)
	}
}

loopAll(5, 4000000)
*/
