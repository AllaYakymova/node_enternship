const getCategoriesSeed = (arr) => arr.map((el, i) => {
    return {
      id: i + 1,
      category: el
    }
  });

const data = ['Beverages','Bread & Bakery','Dairy, Eggs & Cheese','Fruits & Vegetables','Grains, Pasta & Sides','Meat & Seafood', 'Tea & Coffee','Sauces','Snacks','Sweets'];

module.exports = getCategoriesSeed(data);

