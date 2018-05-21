require('./polyfill')

const getStateAt = require('./getStateAt').getStateAt
const renderState = require('./renderState').renderState

export const render = (...args) => getStateAt(...args).then(renderState)
