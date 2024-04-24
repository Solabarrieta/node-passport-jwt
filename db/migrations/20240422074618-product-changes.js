'use strict';

const { PRODUCT_TABLE, ProductSchema } = require('../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.renameColumn(PRODUCT_TABLE, 'product_name', 'name')
    await queryInterface.renameColumn(PRODUCT_TABLE, 'image_url', 'image')
    await queryInterface.removeColumn(PRODUCT_TABLE, 'manufacturer')
    await queryInterface.addColumn(PRODUCT_TABLE, 'description', ProductSchema.description)
    await queryInterface.addColumn(PRODUCT_TABLE, 'category_id', ProductSchema.categoryId)
  },

  // async down (queryInterface, Sequelize) {
  //   await queryInterface.renameColumn(PRODUCT_TABLE, 'name', 'product_name')
  //   await queryInterface.renameColumn(PRODUCT_TABLE, 'image', 'image_url')
  //   await queryInterface.addColumn(PRODUCT_TABLE, 'description', ProductSchema.description)
  //   await queryInterface.addColumn(PRODUCT_TABLE, 'category_id', ProductSchema.categoryId)
  // }
};

// manufacturer: {
//   allowNull: false,
//     type: DataTypes.STRING
// }
