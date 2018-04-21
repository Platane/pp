global.fetch = require('node-fetch')
global.btoa = x => new Buffer(x).toString('base64')
global.atob = x => new Buffer(x, 'base64').toString('ascii')

import './session'
import './subscription'

import test from 'tape'

import { create } from '~/store/index'
import { init as initResourceFetcher } from '~/sideEffect/resourceFetcher'

test('create store', async t => {
  const store = create([initResourceFetcher])

  t.pass('should create store without crashing')
  t.end()
})
