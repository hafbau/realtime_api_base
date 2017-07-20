const controllers = require('../controllers');
const router = require('koa-router')();

module.exports = {
  auth: require('./auth')(controllers, router),
}
