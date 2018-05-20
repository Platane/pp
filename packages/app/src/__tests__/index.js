global.fetch = global.fetch || require('node-fetch')
global.btoa = x => new Buffer(x).toString('base64')
global.atob = x => new Buffer(x, 'base64').toString('ascii')

require('./store')
require('./session')
require('./subscription')
