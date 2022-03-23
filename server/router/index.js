const { static } = require('express');
const data = require('./data');
const agent = require('./agent');
const customer = require('./customer');
const log = require('./log');
const login = require('./login');
const register = require('./register');

module.exports = (app) => {
  require('./file')(app);
  app.use('/', static(__dirname + '/../public/'));

  app.use('/data', data);
  app.use('/agent', agent);
  app.use('/customer', customer);
  app.use('/log', log);
  app.use('/login', login);
  app.use('/register', register);
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 400).send({
      message: err.message,
    });
  });
};
