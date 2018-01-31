const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

const PORT = 3000;

app
  .use(express.static(`${__dirname}/../client/dist`))
  .use(bodyParser.json())
  .use(routes)
  .listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
  });

module.exports = app;
