'use strict';

const { PRODUCT_TABLE } = require('../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'updatedAt')
  },

  // async down (queryInterface, Sequelize) {
  //   await queryInterface.renameColumn(PRODUCT_TABLE, 'name', 'product_name')
  //   await queryInterface.renameColumn(PRODUCT_TABLE, 'image', 'image_url')
  //   await queryInterface.addColumn(PRODUCT_TABLE, 'description', ProductSchema.description)
  //   await queryInterface.addColumn(PRODUCT_TABLE, 'category_id', ProductSchema.categoryId)
  // }
};

