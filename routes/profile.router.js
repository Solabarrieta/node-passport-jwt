const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');
const CustomerService = require('../services/customer.service');

const router = express.Router();
const orderService = new OrderService()
const customerService = new CustomerService()

router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user
      // const customer = await customerService.findByUser(sub)
      const orders = await orderService.findByUser(sub)
      res.json({orders})
    } catch (error) {
      next(error);
    }
  }
)

router.get('/customer',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub } = req.user
      const customer = await customerService.findByUser(sub)
      res.json(customer)
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router
