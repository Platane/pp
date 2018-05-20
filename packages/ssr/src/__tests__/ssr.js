import test from 'tape'
import fetch from './util/fetch'

test('render homepage', async t => {
  const res = await fetch('/')

  t.pass('request ok')

  t.assert(res.includes('<body>'), 'result should contains body')

  t.end()
})

test('render session', async t => {
  const res = await fetch('/session/aaaa')

  t.pass('request ok')

  t.assert(res.includes('<body>'), 'result should contains body')

  console.log(res)

  t.assert(res.includes("I've got this"), 'result should contains session')

  t.end()
})
