import { connect } from 'preact-redux'
import { Break as Dumb } from './Dumb'
import { selectCurrentSessionId } from '~/store/selector/currentSession'

const injectState = connect(state => ({
  path: state.router.path,
  sessionId: selectCurrentSessionId(state),
}))

export const Break = injectState(Dumb)
