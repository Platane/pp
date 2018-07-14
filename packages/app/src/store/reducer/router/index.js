import { createRouteResolver } from 'declarative-router'
import { routes } from './routes'
import { getSession } from '~/service/normalize'
import { selectCurrentSession } from '~/store/selector/currentSession'
import {
  selectCurrentLineId,
  selectCurrentLineIndex,
} from '~/store/selector/currentLine'
import { reduce as reduce_ } from 'declarative-router'
import { merge, set, chainReducer } from '~/util/reduxHelper'

const resolveRoute = createRouteResolver(routes)

export const defaultState = {
  query: {},
  hash: '',
  ...resolveRoute(''),
}

export const reduce = chainReducer(reduce_(routes), (state, action) => {
  switch (action.type) {
    case 'router:query:set':
      return { ...state, query: action.query }
    default:
      return state
  }
})

//
// business logic

export const enhance = reduce => (state, action) => {
  const previousState = state

  state = reduce(state, action)

  // change route on session creation
  if (
    action.type === 'mutation:success' &&
    action.action.type === 'mutation:session:create'
  ) {
    const session = getSession(state.resource.cache)(action.action.sessionId)

    state = set(state, ['router'], {
      ...resolveRoute(
        `/session/${session.id}/step/${session.lines[0] &&
          session.lines[0].question.id}`
      ),
      hash: '',
      query: {},
    })
  }

  // change route on email submission
  if (
    action.type === 'mutation:success' &&
    action.action.type === 'mutation:user:subscribeToNewsletter'
  ) {
    const session = selectCurrentSession(state)

    if (state.router.query.result)
      state = set(state, ['router'], {
        ...resolveRoute(`/session/${session.id}/result`),
        hash: '',
        query: { subscribeok: 1 },
      })
    else state = set(state, ['router', 'query'], { subscribeok: 1 })
  }

  // change route on question submission
  if (
    action.type === 'mutation:success' &&
    action.action.type === 'mutation:user:submitQuestion'
  ) {
    state = set(state, ['router', 'query'], { questionok: 1 })
  }

  // point the current line to the next not answered question
  {
    const session = selectCurrentSession(state)
    const previousSession = selectCurrentSession(previousState)
    const isResultPage = state.router.key === 'sessionResult'

    if (session && !isResultPage) {
      const firstEmptyLine = session.lines.find(
        x => typeof x.answer != 'boolean'
      )

      const currentLineId = selectCurrentLineId(state)
      const previousLineId = selectCurrentLineId(state)
      const lastLineId =
        session.lines.length &&
        session.lines[session.lines.length - 1].question.id

      if (firstEmptyLine) {
        if (firstEmptyLine.question.id != currentLineId)
          state = merge(
            state,
            ['router'],
            resolveRoute(
              `/session/${session.id}/step/${firstEmptyLine.question.id}`
            )
          )
      } else {
        if (!state.router.query.result && (previousLineId || !previousSession))
          state = set(state, ['router'], {
            ...resolveRoute(`/session/${session.id}/step/${lastLineId}`),
            query: { result: 1 },
            hash: '',
          })
      }
    }
  }

  // display break page every X line
  {
    const previousSession = selectCurrentSession(previousState)

    const lineId = selectCurrentLineId(state)
    const previousLineId = selectCurrentLineId(previousState)

    if (previousLineId !== lineId && lineId && previousSession) {
      const lineIndex = selectCurrentLineIndex(state)

      if (lineIndex && lineIndex % 10 === 0 && !state.router.query.result)
        state = set(state, ['router', 'query'], { break: 1 })
    }
  }

  return state
}
