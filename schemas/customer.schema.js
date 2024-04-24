const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30)
const lastName = Joi.string()
const phoneNumber = Joi.string()
const userId = Joi.number().integer();
const userEmail = Joi.string().email()
const userPassword = Joi.string()

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phoneNumber: phoneNumber.required(),
  user: Joi.object({
    email: userEmail.required(),
    password: userPassword.required()
  })
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phoneNumber,
  userId
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
