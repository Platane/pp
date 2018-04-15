const dr = require('../../../../../../../declarative-router/src/redux')
const {
  createRouteResolver,
} = require('../../../../../../../declarative-router/src/routeResolver')

import { routes } from './routes'
import { getSession } from '~/service/normalize'

const resolveRoute = createRouteResolver(routes)

export const reduce = dr.reduce(routes)

export const defaultState = { key: null, param: {}, path: null }

export const reduceGlobal = (state, action) => {
  // if (!state.router.key)
  //   return {
  //     ...state,
  //     router: {
  //       ...state.router,
  //       ...resolveRoute(`/${state.auth.id}`),
  //     },
  //   }

  if (
    action.type === 'mutation:success' &&
    action.action.type === 'mutation:session:create'
  ) {
    const session = getSession(state.resource.cache)(action.action.sessionId)

    state = {
      ...state,
      router: {
        ...state.router,
        ...resolveRoute(
          `/session/${session.id}/step/${session.lines[0] &&
            session.lines[0].question.id}`
        ),
      },
    }
  }
  return state
}
