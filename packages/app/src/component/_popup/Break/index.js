import { connect } from 'preact-redux'
import { Break as Dumb } from './Dumb'
import { selectCurrentSessionId } from '~/store/selector/currentSession'
import { setQuery } from '~/store/action/router'

const injectState = connect(
  state => ({
    path: state.router.path,
    sessionId: selectCurrentSessionId(state),
  }),
  {
    close: () => setQuery({}),
  }
)

export const Break = injectState(Dumb)
