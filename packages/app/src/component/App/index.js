import { connect } from 'preact-redux'
import { App as Dumb } from './Dumb'
import { withCssReset } from '~/component/_abstract/cssReset'
import { selectSessionCreationPending } from '~/store/selector/pending'
import { selectCurrentSession } from '~/store/selector/currentSession'

const injectState = connect(state => ({
  router: state.router,
  creatingSession: selectSessionCreationPending(state),
  session: selectCurrentSession(state),
}))

export const App = withCssReset(injectState(Dumb))
