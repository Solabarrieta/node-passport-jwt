const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    //campo único
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    //Es para especificar el nombre que se va a poner dentro de la tabla, en JS CamelCase y en SQL con _
    field: 'create_at',
    //Recoge el valor de la fecha en el momento que se crea este campo
    defaultValue: Sequelize.NOW,
  }
}

class User extends Model {
  static associate() {
    //Esto es para crear las relaciones -> one-to-many, one-to-one, many-to-many
    //associate
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = {
  USER_TABLE,
  UserSchema,
  User
}
