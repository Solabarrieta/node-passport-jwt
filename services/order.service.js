// const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize')
class OrderService {

  constructor(){
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    const response = await models.Order.findAll({
      include: ['customer']
    })
    return response;
  }

  async findOne(id) {
    const response = await models.Order.findByPk(id, {
      include: [{
        association: 'customer',
        include: ['user']
      }]
    })
    return response;
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

module.exports = OrderService;
