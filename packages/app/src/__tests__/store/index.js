import test from 'tape'
import { create } from '~/store/index'
import { init as initResourceFetcher } from '~/sideEffect/resourceFetcher'

test('create store', async t => {
  const store = create([initResourceFetcher])

  t.pass('should create store without crashing')
  t.end()
})
