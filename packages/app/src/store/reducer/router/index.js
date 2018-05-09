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

    state = merge(
      state,
      ['router'],
      resolveRoute(
        `/session/${session.id}/step/${session.lines[0] &&
          session.lines[0].question.id}`
      )
    )
  }

  // change route on email submission
  if (
    action.type === 'mutation:success' &&
    action.action.type === 'mutation:user:subscribeToNewsletter' &&
    state.router.query.result
  ) {
    const session = selectCurrentSession(state)

    state = set(state, ['router'], {
      ...resolveRoute(`/session/${session.id}/result`),
      hash: '',
      query: {},
    })
  }

  const lineChanged =
    selectCurrentLineId(state) !== selectCurrentLineId(previousState)

  const sessionChanged =
    selectCurrentSession(state) !== selectCurrentSession(previousState)

  if (lineChanged || sessionChanged) {
    // goes to next empty line
    if (state.router.key == 'sessionLine') {
      const session = selectCurrentSession(state)

      if (session) {
        const firstEmptyLine = session.lines.find(
          x => typeof x.answer != 'boolean'
        )

        if (firstEmptyLine)
          state = merge(
            state,
            ['router'],
            resolveRoute(
              `/session/${session.id}/step/${firstEmptyLine.question.id}`
            )
          )
        else state = set(state, ['router', 'query'], { result: 1 })
      }
    }

    // display break page every X line
    {
      const lineIndex = selectCurrentLineIndex(state)

      if (lineIndex && lineIndex % 10 === 0 && !state.router.query.result)
        state = set(state, ['router', 'query'], { break: 1 })
    }
  }

  return state
}
//
// export const reduceGlobal = (state, action) => {
//   // change route on session creation
//   if (
//     action.type === 'mutation:success' &&
//     action.action.type === 'mutation:session:create'
//   ) {
//     const session = getSession(state.resource.cache)(action.action.sessionId)
//
//     state = {
//       ...state,
//       router: {
//         ...state.router,
//         ...resolveRoute(
//           `/session/${session.id}/step/${session.lines[0] &&
//             session.lines[0].question.id}`
//         ),
//       },
//     }
//   }
//
//   // display break page
//   const lineIndex = selectCurrentLineIndex(state)
//   if (lineIndex && lineIndex % 10 === 0) {
//   }
//
//   if (
//     state.router.key == 'sessionLine' ||
//     state.router.key == 'sessionResult'
//   ) {
//     const session = selectCurrentSession(state)
//
//     if (session) {
//       const firstEmptyLine = session.lines.find(
//         x => typeof x.answer != 'boolean'
//       )
//
//       state = {
//         ...state,
//         router: {
//           ...state.router,
//           ...resolveRoute(
//             firstEmptyLine
//               ? `/session/${session.id}/step/${firstEmptyLine.question.id}`
//               : `/session/${session.id}/result`
//           ),
//         },
//       }
//     }
//   }
//
//   return state
// }
