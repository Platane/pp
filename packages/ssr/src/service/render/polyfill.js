const qs = require('querystring')

// monkey patch node env
global.fetch = global.fetch || require('node-fetch')
global.btoa = x => new Buffer(x).toString('base64')
global.encodeURIComponent = x => qs.escape(x)

// alias react to preact
const moduleAlias = require('module-alias')
moduleAlias.addAlias('react', 'preact-compat')
moduleAlias.addAlias('react-redux', 'preact-redux')
