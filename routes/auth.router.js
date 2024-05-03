const express = require('express');
const passport = require('passport');
const AuthService = require('../services/auth.service');

const service = new AuthService();

const router = express.Router();

require('../utils/auth/')

router.get('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user
      const token = service.signToken(user)
      res.json(token)
    } catch (error) {
      next(error);
    }
  });

router.get('/recovery',
  // passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const {email} = req.body
      const response = await service.sendRecovery(email)
      res.json(response)
    } catch (error) {
      next(error);
    }
  });

router.get('/change-password',
  // passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const {token, newPassword} = req.body
      const response = await service.changePassword(token, newPassword)
      res.json(response)
    } catch (error) {
      next(error);
    }
});

module.exports = router


