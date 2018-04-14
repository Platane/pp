import { createSelector } from 'reselect'
import { selectCurrentSession } from './currentSession'

export const selectCurrentLineId = state => state.router.param.lineId

export const selectCurrentLine = createSelector(
  selectCurrentSession,
  selectCurrentLineId,
  (session, currentLineId) =>
    session && session.lines.find(x => x.question.id === currentLineId)
)
