import { createSelector } from 'reselect'
import { getSession } from '~/service/normalize'
import { selectCache } from './resource'

export const selectCurrentSessionId = state => state.router.param.sessionId

export const selectCurrentSession = createSelector(
  selectCache,
  selectCurrentSessionId,
  (cache, sessionId) => getSession(cache)(sessionId)
)
