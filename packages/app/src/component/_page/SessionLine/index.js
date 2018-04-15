import { connect } from 'preact-redux'
import { SessionLine as Dumb } from './Dumb'
import { setAnswer } from '~/store/action/mutation'
import { selectCurrentLine } from '~/store/selector/currentLine'
import { selectCurrentSessionId } from '~/store/selector/currentSession'

const injectState = connect(
  state => {
    const line = selectCurrentLine(state)

    return line
      ? {
          sessionId: selectCurrentSessionId(state),
          lineId: line.question.id,
          question: line.question,
        }
      : {}
  },
  { setAnswer }
)

export const SessionLine = injectState(Dumb)
