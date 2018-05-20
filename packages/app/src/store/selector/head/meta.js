import { createSelector } from 'reselect'
import { APP_ORIGIN } from '~/config'
import {
  selectCurrentSessionStats,
  selectCurrentSession,
} from '../currentSession'

const selectRouter = x => x.router
const selectRouterKey = createSelector(selectRouter, x => x.key)

const formatImage = key => APP_ORIGIN + '/' + btoa(key) + '.jpg'

export const selectMeta = createSelector(
  selectRouter,
  selectCurrentSession,
  selectCurrentSessionStats,
  (router, session, sessionStats) => {
    const url = APP_ORIGIN + router.path

    if (session && sessionStats.answered > 0) {
      const score = Math.floor(sessionStats.known / sessionStats.answered * 100)

      return {
        title: 'Pitch Perfect',
        description: `You are ${score}% pitch perfect!`,
        image: formatImage(`score/${score}`),
        url,
      }
    }

    return {
      title: 'Pitch Perfect',
      description: "Know what you don't. Boost your pitch skills.",
      image: formatImage('home'),
      url,
    }
  }
)
