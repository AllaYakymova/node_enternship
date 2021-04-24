const express = require('express');
const bodyParser = require('body-parser');
const {client} = require('./config');
const app = express();
const port = process.env.PORT || 3000;
const {
  getProducts,
  getProductById,
  getProductsFilterParams,
  searchProducts
} = require("./products/controller"); //import controllers

client
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack));

// const products = require('./products/route');
// const orders = require('./orders/route');

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(cors());

// DB Config

// Connect to postgresql

// use routes
app.get('/products', (req, res) => {
  try {
    const query = `SELECT products.id, product_name, manufactures.manufacture, categories.category FROM products, categories, manufactures WHERE products.id_manufacture = manufactures.id AND products.id_category = categories.id ORDER BY product_name ASC;`;
    client.query(query, (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows);
      res.send(JSON.stringify({status: 'ok', data: results.rows, message: ''}));
    });
  } catch (err) {
    throw err
  }
});
// app.get("/products/search", searchProducts);
// app.get("/products/:productId", getProductById);
// app.use('/api/orders', orders);

app.get("/", function(req, res){
  // отправляем ответ
  res.send("<h2>Привет Express!</h2>");
});

// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});


// module.exports = app;



// insert into products (id, product_name, id_manufacture, id_category, ingridients, amount, id_units, price, img_link)
// select data.id, data.product_name, manufactures.id, categories.id, data.ingridients, data.amount, units.id, data.price, data.img_link
// from categories, manufactures, data, units
// where categories.category = data.category and manufactures.manufacture = data.manufacture and units.unit = data.units;


// -- insert into public.products (id_manufactures, id_units, id_category)
// -- values (27, 10, 10)
// -- where id=45001628;
