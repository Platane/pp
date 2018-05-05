import { createSelector } from 'reselect'
import { selectCache } from './resource'

export const selectFetchingPending = createSelector(
  x => x.resource.toFetch,
  toFetch => false
)
