const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Manufacture extends Model {
  }

  Manufacture.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    manufacture: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'Manufacture',
  });

  return Manufacture;
};

