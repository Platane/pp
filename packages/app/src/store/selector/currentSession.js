import { createSelector } from 'reselect'
import { getSession } from '~/service/normalize'
import { selectCache } from './resource'

export const selectCurrentSessionId = state => state.router.param.sessionId

export const selectCurrentSession = createSelector(
  selectCache,
  selectCurrentSessionId,
  (cache, sessionId) => getSession(cache)(sessionId)
)

export const selectCurrentSessionFinished = createSelector(
  selectCurrentSession,
  session => session && session.lines.every(x => typeof x.answer === 'boolean')
)

export const selectCurrentSessionStats = createSelector(
  selectCurrentSession,
  session =>
    session && {
      answered: session.lines.filter(x => typeof x.answer === 'boolean').length,
      known: session.lines.filter(x => x.answer).length,
      total: session.lines.length,
    }
)
