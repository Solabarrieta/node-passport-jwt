const express = require('express');

const router = express.Router();

const validatorHandler = require('./../middlewares/validator.handler');
const { createOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/order.schema');
const OrderService = require('../services/order.service');

const service = new OrderService();

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
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const response = await service.create(body);
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
