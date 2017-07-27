const controllers = require('../controllers');
const router = require('koa-router')();
const { getExports } = require('../utils')

module.exports = getExports({
  dir: __dirname,
  currentFile: __filename
}, controllers, router)
