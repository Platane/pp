import test from 'tape'

import { waitFor } from '~/__tests__/util/waitFor'

import { create } from '~/store/index'
import { init as initResourceFetcher } from '~/sideEffect/resourceFetcher'

import { selectCurrentSession } from '~/store/selector/currentSession'

test('init store', async t => {
  const store = create([initResourceFetcher])

  const session = await waitFor(store, selectCurrentSession)

  t.assert(session, 'session fetched')

  console.log(session)

  t.end()
})
