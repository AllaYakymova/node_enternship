const getManufacturesSeed = (arr) => arr.map((el, i) => {
  return {
    id: i + 1,
    manufacture: el
  }
});

const data = ['Aldi-Benner Company','American Importing Co. Inc.','Aqualink Nevada, LLC','ARGO TEA','AVEYO','Big Y Foods, Inc.','BJ\'s Wholesale Club / Corporate Brands','Blazing Bagels and Bakery, Inc.','Blue Diamond Growers','BLUE STAR','Borden Dairy Company','Butterball, LLC','CABOT CREAMERY COOPERATIVE','CHAPALA','Completely Fresh Foods, Inc','Delhaize America, Inc.','DISNEY','DOGFISH HEAD RAISON D\'ETRE','DVC Industries, Inc','Emixshow Magazine, Inc.','FABI SAA','FAMILY FAVORITES','Ferrero U.S.A., Incorporated','Flora\'s Distributors, Inc.','FRESH & EASY','Georgia Peach Products, Inc.','Giant Eagle, Inc.','Godiva Chocolatier, Inc.','Goya Foods, Inc.','Green Mountain Coffee Roasters, Inc.','Harvest Sensations LLC','High Liner Foods USA Incorporated','Hormel Foods Corporation',
  'iBakeFoods','Interbake Foods Inc.','Jackie\'s Cookie Connection','KREHER','La Tortilleria','Lady Walton\'s Cookies, Inc.','Land O\'Frost, Inc.','LESSEREVIL','LGS Specialty Sales, Ltd','Lindt & Sprungli Schweiz AG','Lone Star Citrus Growers','Lowe\'s Food Stores, Inc.','Man Packing Co, LLC','Milton G. Waldbaum Company','NAPA VALLEY NATURALS','Naturipe Farms, LLC','Nestle USA Inc.','Newgem Foods, LLC','NEXT ORGANICS','Ocean Spray Cranberries, Inc.','Ole Mexican Foods, Inc.','PACIFIC SURF','PepsiCo','PERDUE BRAND','PEREG','Q GINGER','Quesos La Ricura','Quorn Foods Inc.','RANA','Redco Foods, Inc.','REGAL GOURMET SNACKS','ROUNDY\'S','Russell McCall\'s Inc.','Save Mart Supermarkets Inc.','SNAP INFUSION LLC','SPECTRUM CULINARY','Spring Valley Water Co.','Supervalu, Inc.','Talking Rain Beverage Co., Inc','The Coca-Cola Company','The Dannon Company, Inc.','Topco Associates, Inc.','Tropicana Products, Inc.','United States Bakery','UTZ Quality Foods, Inc.','Walgreens Co.','Wegmans Food Markets, Inc.','Weis Markets, Inc.','Western Family Foods, Inc.','Yoplait USA'];

module.exports = getManufacturesSeed(data);
