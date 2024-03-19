// const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool')

const {models} = require('../libs/sequelize')

class UserService {
  constructor() {

  }

  async create(data) {
    return data;
  }

  // async find() {
  //   const query = 'SELECT * FROM tasks';
  //   const response = await this.pool.query(query)
  //   return response.rows;
  // }

  async find() {
    const response = await models.User.findAll();
    return response;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
