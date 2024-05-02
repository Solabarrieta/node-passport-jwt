const express = require('express');

const router = express.Router();

const validatorHandler = require('./../middlewares/validator.handler');
const { createOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/order.schema');
const OrderService = require('../services/order.service');
const passport = require('passport');
const { checkRole } = require('../middlewares/auth.handler');
const CustomerService = require('../services/customer.service');

const service = new OrderService();
const customerService = new CustomerService()

router.get('/', async (req, res, next) => {
  try {
    const response = await service.find();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await service.findOne(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRole('customer'),
  // validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { id } = await customerService.findByUser(user.sub)
      const response = await service.create({ customerId: id });
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const response = await service.addItem(body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
