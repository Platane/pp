import { createSelector } from 'reselect'
import { selectCurrentSession } from './currentSession'
import { selectCurrentLineId } from './currentLine'

export const selectPreviousLine = createSelector(
  selectCurrentSession,
  selectCurrentLineId,
  (session, currentLineId) => {
    const i =
      session &&
      session.lines.findIndex(x => x.question.id === currentLineId) - 1

    return (session && session.lines[i]) || null
  }
)
