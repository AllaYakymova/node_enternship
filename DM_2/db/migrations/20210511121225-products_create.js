'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      product_name: {
        type: Sequelize.STRING(1000),
        allowNull: false
      },
      manufacture_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
        references: {
          model: {tableName: 'Manufactures'},
          key: 'id'
        }
      },
      ingredients: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      unit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: { tableName: 'Units' },
          key: 'id'
        }
      },
      price: {
        type: Sequelize.REAL,
        allowNull: false
      },
      img_link: {
        type: Sequelize.STRING(1000)
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: {tableName: 'Categories'},
          key: 'id'
        }
      },
      createdAt: {type:Sequelize.DATE, allowNull:false, defaultValue: new Date()},
      updatedAt: {type:Sequelize.DATE, allowNull:false, defaultValue: new Date()},
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};
