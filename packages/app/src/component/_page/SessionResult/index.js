import { connect } from 'preact-redux'
import { SessionResult as Dumb } from './Dumb'
import { selectCurrentSession } from '~/store/selector/currentSession'
import { createSession } from '~/store/action/mutation'

const injectState = connect(
  state => ({
    session: selectCurrentSession(state),
  }),
  { startNewSession: createSession }
)

export const SessionResult = injectState(Dumb)
