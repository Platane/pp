import { createSelector } from 'reselect'
import { selectCache } from './resource'
import { selectCurrentSession, selectCurrentSessionId } from './currentSession'

export const selectFetchingPending = createSelector(
  x => x.resource.toFetch,
  selectCache,
  (toFetch, cache) => !toFetch.every(x => cache[x.key])
)

export const selectSessionCreationPending = createSelector(
  x => x.resource.pendingMutations,
  pendingMutations =>
    pendingMutations.some(x => x.type === 'mutation:session:create')
)
