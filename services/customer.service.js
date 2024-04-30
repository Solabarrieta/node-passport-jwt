const boom = require('@hapi/boom');
const bcrypt = require('bcrypt')

// const pool = require('../libs/postgres.pool')

const { models } = require('../libs/sequelize')

class CustomerService {
  constructor() {
  }

  async create(data) {
    data.user.password = await bcrypt.hash(data.user.password, 10)
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    delete newCustomer.user.dataValues.password
    return newCustomer;
  }

  // async find() {
  //   const query = 'SELECT * FROM tasks';
  //   const response = await this.pool.query(query)
  //   return response.rows;
  // }

  async find() {
    const response = await models.Customer.findAll({
      include: ['user']
    });
    return response;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const response = await customer.update(changes)
    return response;
  }

  async delete(id) {
    const customer = await this.findOne(id)
    await customer.destroy()
    return { id };
  }
}

module.exports = CustomerService;
