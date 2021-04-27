'use strict';
module.exports = class ViewsClass {
  constructor(res) {
    this.res = res;
  }

  reqNoBodyView = () => this.res.status(400).json({status: 'not ok', message: "No body"});

  errorView = (err) => this.res.status(400).json({status: 'not ok', message: err.stack});


  okView = (res, data, message) => res.status(200).json({status: 'ok', data: data, message: message});

  mailerView (res, customer) {
    res.status(200)
      .json({status: 'ok', data: {user: customer}, message: 'Order is created'});
  }
};
