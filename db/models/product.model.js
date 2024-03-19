const { Model, DataTypes, Sequelize } = require('sequelize')

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  productName: {
    allowNull: false,
    field: 'product_name',

    type: DataTypes.STRING
  },
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL
  },
  imageUrl: {
    allowNull: true,
    field: 'image_url',
    type: DataTypes.STRING
  },
  manufacturer: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW

  }
}

class Product extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Products',
      timestamp: false
    }
  }
}

module.exports = {
  PRODUCT_TABLE,
  ProductSchema,
  Product
}
