
module.exports = class ViewsClass {
  constructor(res) {
    this.res = res;
  }

  reqNoBodyView = () => this.res.status(400)
    .json({status: 'not ok', message: 'No body'});

  errorView = (err) => this.res.status(400)
    .json({status: 'not ok', message: err.stack});

  okView = (res, data, message) => res.status(200)
    .json({status: 'ok', data: data, message: message});



  displayOrder(data) {
    const products = data.products;
      const prodInfo = products.map(product => `<li>name: ${product.product_name}, count: ${product.quantity}, price: ${product.price}</li>`).join();

      const orderTemplate = `<h3>Order #${data.id}</h3><p>customer: ${data.name}</p><p>phone: ${data.phone}</p><p>email: ${data.email}</p><ol>${prodInfo}</ol><h6>Total: ${products.map(el => +el.sum).reduce((a, b) => a + b)}</h6>`;

      console.log(orderTemplate);
      this.okView (this.res, orderTemplate, 'Detail info')
  };

  mailerView(res, customer) {
    res.status(200)
      .json({status: 'ok', data: {user: customer}, message: 'Order is created'});
  }
};

