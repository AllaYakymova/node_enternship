const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
// require('dotenv').load();
const app = express();
const port = 3000;

const productRouter = require('./products/router');
const orderRouter = require('./orders/router');

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


// use routes
app.use('/products', productRouter);
app.use('/order', orderRouter);

// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
