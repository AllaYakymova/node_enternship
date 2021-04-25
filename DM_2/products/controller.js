const { client } = require('../config');
const { productsModel } = require('./products_model');
const {pool} = require('../config');
const { app } = require('../index');


exports.getProducts = async function (req, res) {
  try {
    const result = await client.query(productsModel(req));
    await res.status(200).json({status: 'ok', data: result.rows, message: 'Here is all products'});
  } catch (err) {
    res.status(400).json({status: 'not ok', message: err.stack});
  }
};

exports.searchProducts = async function (req, res) {
  try {
    if(!Object.values(req.query).filter(el => el).length) res.redirect("/products"); // if req.queries are empty - redirect to /products
    const result = await client.query(productsModel(req));
    const data = result.rows;
    if (data.length !== 0) {
      await res.status(200).json({ status: 'ok', data: result.rows, message: `Products satisfying the query request. Amount: ${result.rows.length}`});
    } else {
      await res.status(200).json({ status: 'ok', data: result.rows, message: `There is no products satisfying the query request`,
      });
    }
  } catch (err) {
    res.status(400).json({status: 'not ok', message: err.stack});
  }
};

exports.getProductById = async function (req, res) {
  try {
    const {productId} = req.params;
    const result = await client.query(productsModel(req), [productId]);
    const data = result.rows;
    if (data.length !== 0) {
    await res.status(200).json({ status: 'ok', data: result.rows,  message: `Here is product with id ${productId}`,
    });
      } else {
      await res.status(200).json({ status: 'ok', data: result.rows, message: `No product with id ${productId}`,
      });
    }
  } catch (err) {
    res.status(400).json({ status: 'not ok', message: err.stack});
  }
};




