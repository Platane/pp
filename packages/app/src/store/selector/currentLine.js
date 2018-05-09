import { createSelector } from 'reselect'
import { selectCurrentSession } from './currentSession'

export const selectCurrentLineId = state => state.router.param.lineId

export const selectCurrentLine = createSelector(
  selectCurrentSession,
  selectCurrentLineId,
  (session, currentLineId) =>
    session && session.lines.find(x => x.question.id === currentLineId)
)

export const selectCurrentLineIndex = createSelector(
  selectCurrentSession,
  selectCurrentLineId,
  (session, currentLineId) => {
    if (!session) return null

    const i = session.lines.findIndex(x => x.question.id === currentLineId)

    return i === -1 ? null : i
  }
)
