const render = require('../index')
const test = require('tape')

const encodeBase64 = x => new Buffer(x).toString('base64')

test('should render image', async t => {
  const buffer = render(encodeBase64('score/4'))

  t.assert('image is not empty', buffer.toString().length > 0)

  t.end()
})
