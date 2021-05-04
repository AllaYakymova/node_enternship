"use strict";
const {mailSender} = require('./mailer');

module.exports = class ViewsClass {
  constructor(res) {
    this.res = res;
  }

  reqNoBodyView = () => this.res.status(400).json({status: 'error', message: 'No body'});

  errorView = (err) => this.res.status(400).json({status: 'error', message: err.stack});

  validErrorView = (message) => this.res.status(400).json({status: 'error', data: [], message: message});

  errorProd = (data, message) => this.res.status(400).json({status: 'error', data: data, message: message});

  okView = (data, message) => this.res.status(200).json({status: 'ok', data: data, message: message});

  async sendOrder(data) {
    const products = data.products;
    const prodInfo = products.map(product =>`<tr><td>${product.product_name}</td><td>${product.quantity}</td><td>${product.price}</td><td>${product.unit}</td><td>${product.sum}</td></tr>`).join('');

    const letterBody = `<div><h2><ins>New order #${data.id}</ins></h2><hr><p>Time: ${data.time}</p><h3>Customer details</h3><p><strong>name:</strong> ${data.name}</p><p><strong>phone:</strong> ${data.phone}</p><p><strong>email:</strong> ${data.email}</p><h3>Order details</h3><table border="1" width="60%" cellpadding="5"><tr><th>Product name</th><th>Quantity</th><th>Price</th><th>Unites</th><th>Sum</th></tr>${prodInfo}</table><h3><ins>Total: ${products.map(el => +el.sum).reduce((a, b) => a + b)}</ins></h3></div>`;

    mailSender(letterBody, data.id).then().catch(err => console.log(err));
  };
};

