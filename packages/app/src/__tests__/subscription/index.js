import test from 'tape'

import { waitFor } from '~/__tests__/util/waitFor'

import { create } from '~/store/index'
import { init as initResourceFetcher } from '~/sideEffect/resourceFetcher'

import { subscribeToNewsletter } from '~/store/action/mutation'

test('subscribe to news letter', async t => {
  const store = create([initResourceFetcher])

  store.dispatch(subscribeToNewsletter('me@platane.me'))

  await waitFor(store, ({ resource }) => !resource.pendingMutations.length)

  t.pass('mutation should end')

  t.end()
})
