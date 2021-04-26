const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {client} = require('./config');
const app = express();
const port = process.env.PORT || 8080;

const productRouter = require('./products/router');
const orderRouter = require('./orders/router');

// connect to postgrsql
client
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack));


// body parser middleware
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// создаем парсер для данных application/x-www-form-urlencoded
// const urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(cors());


// use routes
app.use('/products', productRouter);
app.use('/order', orderRouter);

// app.get('/products', async (req, res) => {
//     try {
//       const query = `SELECT products.id, product_name, manufactures.manufacture, categories.category FROM products, categories, manufactures WHERE products.id_manufacture = manufactures.id AND products.id_category = categories.id ORDER BY product_name ASC;`;
//       const result = await client.query(query);
//       await console.log(res.rows);
//       await res.send(JSON.stringify({status: 'ok', data: result.rows, message: 'Here is your products'}));
//     } catch (err) {
//       res.send(JSON.stringify({status: 'Not ok', message: err.stack}));
//     }
// });


app.use("/", (req, res) => {
  res.send("<h2>DEMO #2</h2>");
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
