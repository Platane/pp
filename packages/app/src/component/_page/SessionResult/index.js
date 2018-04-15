import { connect } from 'preact-redux'
import { SessionResult as Dumb } from './Dumb'
import { selectCurrentSession } from '~/store/selector/currentSession'

const injectState = connect(state => ({
  session: selectCurrentSession(state),
}))

export const SessionResult = injectState(Dumb)
