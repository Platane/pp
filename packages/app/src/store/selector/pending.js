import { createSelector } from 'reselect'
import { selectCache } from './resource'
import { selectCurrentSession, selectCurrentSessionId } from './currentSession'

export const selectFetchingPending = createSelector(
  x => x.resource.toFetch,
  selectCache,
  (toFetch, cache) => !toFetch.every(x => cache[x.key])
)
