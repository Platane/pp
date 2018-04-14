import health from './health'
import graphql from './graphql'

export default router =>
  [
    //
    health,
    graphql,
  ].forEach(f => f(router))
