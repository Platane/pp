import test from 'tape'
import fetch from './util/fetch'

test('render homepage', async t => {
  const res = await fetch('/')

  t.pass('request ok')

  t.end()
})
