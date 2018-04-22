import { connect } from 'preact-redux'
import { SessionLine as Dumb } from './Dumb'
import { setAnswer } from '~/store/action/mutation'
import { selectCurrentLine } from '~/store/selector/currentLine'
import { selectPreviousLine } from '~/store/selector/previousLine'
import { selectCurrentSessionId } from '~/store/selector/currentSession'

const injectState = connect(
  state => {
    const line = selectCurrentLine(state)
    const previous = selectPreviousLine(state)

    return line
      ? {
          sessionId: selectCurrentSessionId(state),
          lineId: line.question.id,
          question: line.question,

          previousAnswer: previous && previous.answer,

          timeout: state.timeout,
        }
      : {}
  },
  { setAnswer }
)

export const SessionLine = injectState(Dumb)
