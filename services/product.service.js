const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize')

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
    // this.pool = pool;
    // this.pool.on('error', (error) => console.error(error));
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = await models.Product.create(data)
    return newProduct;
  }

  // async find() {
  //   const query = 'SELECT * FROM tasks';
  //   const response = await this.pool.query(query)
  //   return response.rows;
  // }
  async find() {
    const response = await models.Product.findAll({
      include: ['category']
    })
    return response;
  }

  async findOne(id) {
    const product = models.Product.findByPk(id)
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id)
    const response = product.update(changes)
    return response
  }

  async delete(id) {
    const product = this.findOne(id)
    await product.destroy()
    return { id };
  }

}

module.exports = ProductsService;
