const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Passport, validate } = require('../models/passport');

router.get('/', async (req, res) => {
  const passports = await Passport.find({}, { __v: false }).sort('firstName');
  res.send(passports);
});

router.get('/:id', async (req, res) => {
  const passport = await Passport.find({ passId: req.body.id });
  if (!passport) res.status(400).send('Your passport id is invalid...');

  res.send(
    `Name: ${passport.firstName} ${passport.lastName}
    Birth date: ${passport.birthDate}`
  );
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let passport = await Passport.findOne({ passId: req.body.passId });
  if (passport) return res.status(400).send('Passport id is duplicated...');

  passport = new Passport(
    _.pick(req.body, [
      'passId',
      'firstName',
      'lastName',
      'birthDate',
      'address',
    ])
  );

  await passport.save();
  res.send(
    _.pick(passport, [
      'passId',
      'firstName',
      'lastName',
      'birthDate',
      'address',
    ])
  );
});

router.delete('/:id', async (req, res) => {
  const passport = await Passport.findByIdAndRemove(req.params.id);
  if (!passport) res.status(400).send('Your passport id invalid...');

  res.send(passport);
});

module.exports = router;
