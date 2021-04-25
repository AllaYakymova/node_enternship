
exports.productsModel = function (req) {
  if (req.params.productId) {
    return `SELECT products.id, product_name, manufactures.manufacture, categories.category, ingridients, units.unit, price, img_link FROM products, categories, manufactures, units WHERE products.id = $1 AND products.id_manufacture = manufactures.id AND products.id_category = categories.id AND products.id_units = units.id;`;
  }

  if (req.query) {
    const {manufactures, categories, products} = req.query;
    const reg = /^([1-9,]*)$/;
    let arg = [];
    const scheme = {
      'manufactures.manufacture': !!manufactures && manufactures,
      'categories.id': !!categories && reg.test(categories) ? categories.split(',')
        .filter(el => el) : false,
      'product_name': !!products && products,
    };

    if (Object.values(scheme)
      .filter(el => el).length !== 0) {
      for (let query in scheme) {
        if (scheme[query]) {
          if (query === 'categories.id') {
            arg.push(`${query} IN (${scheme[query]})`);
          } else {
            arg.push(`${query} ILIKE '${scheme[query]}%'`);
          }
        }
      }
    }
    const condition = arg.length !== 0 ? `AND ${arg.join(' AND ')}` : '';
    return `SELECT products.id, product_name, manufactures.manufacture, categories.category, units.unit, price, img_link FROM products, categories, manufactures, units WHERE products.id_manufacture = manufactures.id AND products.id_category = categories.id AND products.id_units = units.id ${condition};`;
  }
  if(req.baseUrl==='/products') {
    return `SELECT products.id, product_name, manufactures.manufacture, categories.category FROM products, categories, manufactures WHERE products.id_manufacture = manufactures.id AND products.id_category = categories.id ORDER BY product_name ASC;`;
  }
};

