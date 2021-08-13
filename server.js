const express = require('express');
const mongoose = require('mongoose');
const passport = require('./route/passports');
const app = express();

const url = 'mongodb://127.0.0.1:27017/vaccine-app';

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to Database...'))
  .catch((err) => console.error(err));

app.use(express.json());
app.use('/passport', passport);

const port = 3000;

app.listen(port, (err) => {
  console.log(`Listening to PORT: ${port}...`);
  if (err) console.log(err.message);
});
