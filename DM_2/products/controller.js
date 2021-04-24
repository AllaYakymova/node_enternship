const { pool } = require('../config');
const {app} = require('../index');


// app.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' })
// });

const getProducts = async (client, req, res) => {
  try {
   const query = `SELECT product_name FROM products`;
   const resultProducts =  await client.query(query);
    console.log(resultProducts);
    await res.send(`<p>{status: 'ok', data: ${resultProducts.rows}}, , message: ''}</p>`);
  } catch (err) {
    throw err
  }

  const query = `SELECT products.id, product_name, manufactures.manufacture, categories.category FROM products, categories, manufactures WHERE products.id_manufacture = manufactures.id AND products.id_category = categories.id ORDER BY product_name ASC;`;

  // pool.query(query, (error, results) => {
  //   try {
  //     console.log(results.rows);
  //     response.status(200).json(results.rows);
  //     response.send(`<p>{ status: 'ok', data : [ {id:123123, name: '', manufacture: '', category: ''}, {}, {} ], message: 'Here is your data'}</p>`)
  //   } catch (err) {
  //     throw err
  //   }
  // })
};

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

module.exports = {
  getProducts,
  // searchProducts,
  // getProductById
};



