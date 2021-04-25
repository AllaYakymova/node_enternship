const {client} = require('../config');
const {pool} = require('../config');
const {app} = require('../index');


// app.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' })
// });

exports.getProducts = async function (req, res) {
  try {
    console.log('getProducts');
    const query = `SELECT products.id, product_name, manufactures.manufacture, categories.category FROM products, categories, manufactures WHERE products.id_manufacture = manufactures.id AND products.id_category = categories.id ORDER BY product_name ASC;`;
    const result = await client.query(query);
    await res.send(JSON.stringify({status: 'ok', data: result.rows, message: 'Here is your products'}));
  } catch (err) {
    res.send(JSON.stringify({status: 'Not ok', message: err.stack}));
  }
};

exports.searchProducts = async function (req, res) {
  try {
    console.log('searchProducts');
    if(!Object.values(req.query).filter(el => el).length) res.redirect("/products"); // if req.queries are empty - redirect to
    const {manufactures, categories, products} = req.query;

    const reg = /^([1-9,]*)$/;

    const scheme = {
      'manufactures.manufacture': !!manufactures && manufactures,
      'categories.id': !!categories && reg.test(categories) ? categories.split(',').filter(el => el) : false,
      'product_name': !!products && products,
    };
    console.log(scheme, Object.values(scheme).filter(el => el).length);
    let arg = [];
    if (Object.values(scheme).filter(el => el).length !== 0) {
      for (let query in scheme) {
        if (scheme[query]) {
          if(query === 'categories.id') {
            arg.push(`${query} IN (${scheme[query]})`);
          } else {
            arg.push(`${query} ILIKE '${scheme[query]}%'`);
          }
        }
      }
    }
    const condition = arg.length !== 0 ? `AND ${arg.join(' AND ')}` : '';
    console.log(condition);
    const query = `SELECT products.id, product_name, manufactures.manufacture, categories.category, units.unit, price, img_link 
FROM products, categories, manufactures, units WHERE products.id_manufacture = manufactures.id AND products.id_category = categories.id AND products.id_units = units.id ${condition};`;
    console.log(query);
    const result = await client.query(query);
    const data = result.rows;
    if (data.length !== 0) {
      await res.send(JSON.stringify({
        status: 'ok',
        data: result.rows,
        message: `There are products satisfying the query request. Amount of products: ${result.rows.length}`}));
    } else {
      await res.send(JSON.stringify({
        status: 'ok',
        data: result.rows,
        message: `There is no products satisfying the query request`,
      }));
    }
  } catch (err) {
    res.send(JSON.stringify({status: 'Not ok', message: err.stack}));
  }
};

exports.getProductById = async function (req, res) {
  try {
    console.log('getProductById');
    const {productId} = req.params;
    const query = `SELECT products.id, product_name, manufactures.manufacture, categories.category, ingridients, units.unit, price, img_link 
FROM products, categories, manufactures, units WHERE products.id = $1 AND products.id_manufacture = manufactures.id AND products.id_category = categories.id AND products.id_units = units.id;`;
    const result = await client.query(query, [productId]);
    await res.send(JSON.stringify({
      status: 'ok',
      data: result.rows,
      message: `Here is your product with id ${productId}`,
    }));
  } catch (err) {
    res.send(JSON.stringify({status: 'Not ok', message: err.stack}));
  }
};

const query = `SELECT products.id, product_name, manufactures.manufacture, categories.category FROM products, categories, manufactures WHERE products.id_manufacture = manufactures.id AND products.id_category = categories.id ORDER BY product_name ASC;`;


// const searchProducts = async (request, response) => {
//   const query = `SELECT * FROM users`;
//   await pool.query(query, (error, results) => {
//     try {
//       console.log(results.rows[0]);
//       response.status(200).json(results.rows[0])
//     } catch (err) {
//       throw err
//     }
//   })
// };
//
// const getProductById = async (id, request, response) => {
//   const query = `SELECT * FROM products where id = ${id}`;
//   await pool.query(query, (error, results) => {
//     try {
//       console.log(results.rows[0]);
//       response.status(200).json(results.rows[0])
//     } catch (err) {
//       throw err
//     }
//   })
// };

// module.exports = {
//   getProducts,
// searchProducts,
// getProductById
// };



