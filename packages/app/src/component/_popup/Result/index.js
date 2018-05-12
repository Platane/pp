import { connect } from 'preact-redux'
import { Result as Dumb } from './Dumb'
import { createSession } from '~/store/action/mutation'
import {
  selectCurrentSessionId,
  selectCurrentSessionStats,
} from '~/store/selector/currentSession'
import { setQuery } from '~/store/action/router'
import { subscribeToNewsletter } from '~/store/action/mutation'

const injectState = connect(
  state => {
    const stats = selectCurrentSessionStats(state)

    return {
      score:
        stats && stats.answered
          ? Math.round(stats.known / stats.answered * 100)
          : 0,
      isEnd: stats && stats.total === stats.answered,
      email_sent: state.identity.user && state.identity.user.email_sent,
      currentSessionId: selectCurrentSessionId(state),
    }
  },
  {
    subscribeToNewsletter,
    startOver: createSession,
    close: () => setQuery({}),
  }
)

export const Result = injectState(Dumb)
