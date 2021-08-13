const mongoose = require('mongoose');
const Joi = require('joi');
const { passportSchema } = require('./passport');

const custmoerSchema = new mongoose.Schema(
  {
    passportCard: {
      type: passportSchema,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      maxlength: 10,
    },
  },
  {
    collection: 'peoples',
  }
);

const Customer = mongoose.model('Customer', custmoerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    passId: Joi.string().required(),
    phone: Joi.string().max(10).required(),
  });

  return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.customerSchema = customerSchema;
module.exports.validate = validateCustomer;
