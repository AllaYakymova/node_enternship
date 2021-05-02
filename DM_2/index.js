const express = require('express');
const morgan = require('morgan');
const Joi = require('joi');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/error_middleware');
const app = express();
const port = process.env.PORT || 3000;
// const port = 3000;

const productRouter = require('./products/router');
const orderRouter = require('./orders/router');

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use(morgan('dev'));

// use routes
app.use('/products', productRouter);
app.use('/order', orderRouter);

app.use(errorHandler); //////////////

// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
