import { waitFor } from '~/util/waitFor'

import { create as createStore } from 'app/store'
import { init as initResourceFetcher } from 'app/sideEffect/resourceFetcher'
import { goTo as goToAction } from 'app/store/action/router'
import { selectFetchingPending } from 'app/store/selector/pending'

export const getStateAt = async (pathname: string, query: Object) => {
  // bootstrap the store
  const store = createStore([initResourceFetcher])

  // set the router
  store.dispatch(goToAction(pathname, query))

  // await for resource fetching to end
  await waitFor(store, s => !selectFetchingPending(s))

  // remove user
  const state = { ...store.getState(), identity: { user: null } }

  return state
}
