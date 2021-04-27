const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'pug');
const port = process.env.PORT || 8080;

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

