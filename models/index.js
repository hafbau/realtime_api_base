const decorate = require('../utils/model_decorator');

module.exports = {
  User: decorate(require('./user')),
}
