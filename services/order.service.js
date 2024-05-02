// const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize')
class OrderService {

  constructor(){
  }

  async create(data) {
    console.log(data)
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data)
    return newItem
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
      },
        'items'
      ]
    })
    return response;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    })
    orders.forEach((order) => (
      delete order.dataValues.customer
    ))

    return orders
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
