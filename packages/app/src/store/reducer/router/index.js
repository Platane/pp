import { createRouteResolver } from 'declarative-router'
import { routes } from './routes'
import { getSession } from '~/service/normalize'
import { selectCurrentSession } from '~/store/selector/currentSession'
import { reduce as reduce_ } from 'declarative-router'

const resolveRoute = createRouteResolver(routes)

export const defaultState = resolveRoute('')

export const reduce = reduce_(routes)

export const reduceGlobal = (state, action) => {
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

  if (
    state.router.key == 'sessionLine' ||
    state.router.key == 'sessionResult'
  ) {
    const session = selectCurrentSession(state)

    if (session) {
      const firstEmptyLine = session.lines.find(
        x => typeof x.answer != 'boolean'
      )

      state = {
        ...state,
        router: {
          ...state.router,
          ...resolveRoute(
            firstEmptyLine
              ? `/session/${session.id}/step/${firstEmptyLine.question.id}`
              : `/session/${session.id}/result`
          ),
        },
      }
    }
  }

  return state
}
