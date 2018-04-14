const dr = require('../../../../../../../declarative-router/src/redux')
const {
  createRouteResolver,
} = require('../../../../../../../declarative-router/src/routeResolver')

import { routes } from './routes'

const resolveRoute = createRouteResolver(routes)

export const reduce = dr.reduce(routes)

export const defaultState = { key: null, param: {}, path: null }

export const reduceGlobal = (state, action) => {
  if (!state.router.key)
    return {
      ...state,
      router: {
        ...state.router,
        ...resolveRoute(`/${state.auth.id}`),
      },
    }

  return state
}
