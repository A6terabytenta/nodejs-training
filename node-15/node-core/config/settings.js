const { Store } = require('@hapipal/confidence');
const { env } = process;

const settings = {
  'port': {
    $filter: 'env',
    $default: 4000,
    local: 4000,
    production: 4001,
  },
  'host': {
    $filter: 'env',
    $default: 'localhost',
    local: 'localhost',
    production: '127.0.0.1',
  },
  'mongoDBUrl': {
    $filter: 'env',
    $default: 'mongodb://localhost:30001/core',
    local: 'mongodb://localhost:30001/core',
    production: 'mongodb://127.0.0.1:30001/core',
  },
  'logLevel': {
    $filter: 'env',
    $default: 'error',
    local: 'info',
    production: 'error',
  },
  'authAPI': {
    $filter: 'env',
    $default: 'http://localhost:3000',
    local: 'http://localhost:3000',
    production: 'http://localhost:3001',
  }
}
const store = new Store(settings);

module.exports = {
  settings: store.get('/', {env: env.NODE_ENV})
}