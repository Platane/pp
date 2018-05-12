import { connect } from 'preact-redux'
import { ThanksForSubscribe as Dumb } from './Dumb'
import { setQuery } from '~/store/action/router'
import { selectCurrentSessionStats } from '~/store/selector/currentSession'

const injectState = connect(
  state => {
    const stats = selectCurrentSessionStats(state)

    return {
      path: state.router.path,
      isEnd: stats && stats.total === stats.answered,
    }
  },
  {
    close: () => setQuery({}),
  }
)

export const ThanksForSubscribe = injectState(Dumb)
