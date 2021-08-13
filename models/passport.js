const mongoose = require('mongoose');
const Joi = require('joi');

const passportSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    passId: {
      type: String,
      maxlength: 13,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'passports',
  }
);

const Passport = mongoose.model('Passort', passportSchema);

function validatePassport(pass) {
  const schema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    birthDate: Joi.date().required(),
    passId: Joi.string().max(13).required(),
    address: Joi.string().required(),
  });

  return schema.validate(pass);
}

module.exports.Passport = Passport;
module.exports.passportSchema = passportSchema;
module.exports.validate = validatePassport;
