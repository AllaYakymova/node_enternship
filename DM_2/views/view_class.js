'use strict';
const { mailSender } = require('./mailer');

module.exports = class ViewsClass {

  errorView = (err, res) => res.status(400).json({status: 'error', message: err.stack});

  errorData = (res, code, data, message) => res.status(code).json({status: 'error', data, message: message});

  okView = (res, data, message) => res.status(200).json({status: 'ok', data: data, message: message});

  async setResLocalsData(req, res, isAuth) {
    if(isAuth === true) {
      res.locals.user = {
        user: req.headers.userphone,
        isAuthenticated: true,
      };
      console.log('res.locals.user', res.locals.user);
    } else {
      res.locals.user = {
        isAuthenticated: false,
      };
    }
    return;
  };

  async sendOrder(data) {
    const products = data.products;
    const prodInfo = products.map(product => `<tr><td>${product.product_name}</td><td>${product.count}</td><td>${product.price}</td><td>${product.unit}</td><td>${product.price * product.count}</td></tr>`)
      .join('');

    const letterBody = `<div><h2><ins>New order #${data.id}</ins></h2><hr><p>Time: ${data.time}</p><h3>Customer details</h3><p><strong>name:</strong> ${data.name}</p><p><strong>phone:</strong> ${data.phone}</p><p><strong>email:</strong> ${data.email}</p><h3>Order details</h3><table border="1" width="60%" cellpadding="5"><tr><th>Product name</th><th>Quantity</th><th>Price</th><th>Unites</th><th>Sum</th></tr>${prodInfo}</table><h3><ins>Total: ${products.map(el => +el.price * +el.count)
      .reduce((a, b) => a + b)}</ins></h3></div>`;

    mailSender(letterBody, data.id)
      .then()
      .catch(err => console.log(err));
  };
};

