const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({path:__dirname+'./.env'});
const errorHandler = require('./exceptions/error_middleware');
const app = express();
const port = process.env.NODE_PORT || 8080;

const productRouter = require('./products/router');
const orderRouter = require('./orders/router');
const userRouter = require('./users/router');

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// use routes
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.use(morgan('dev'));
app.use(errorHandler);

// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
