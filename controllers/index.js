const models = require('../models');
const send = require('koa-send');

module.exports = {
  auth: require('./auth')(models, send),
}
