import { connect } from 'preact-redux'
import { Result as Dumb } from './Dumb'
import { createSession } from '~/store/action/mutation'
import { selectCurrentSessionStats } from '~/store/selector/currentSession'
import { setQuery } from '~/store/action/router'
import { subscribeToNewsletter } from '~/store/action/mutation'

const injectState = connect(
  state => {
    const stats = selectCurrentSessionStats(state)

    if (!stats) return { score: 0, isEnd: false }

    return {
      score: stats.answered
        ? Math.round(stats.known / stats.answered * 100)
        : 0,
      isEnd: stats.total === stats.answered,
    }
  },
  {
    subscribeToNewsletter,
    startOver: createSession,
    close: () => setQuery({}),
  }
)

export const Result = injectState(Dumb)
