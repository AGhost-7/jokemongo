const config = require('../config')

switch (config.get('db.type')) {
  case 'mongo':
    module.exports = require('./mongo')
    break
  case 'redis':
    module.exports = require('./redis')
    break
  default:
    console.error('invalid db type %s', config.get('db.type'))
    break
}
