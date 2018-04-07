import test from 'tape'
import fetch from './util/fetch'

test('health check', async t => {
  const res = await fetch('/health')

  t.pass('request ok')

  t.end()
})
