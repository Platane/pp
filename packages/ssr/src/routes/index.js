import health from './health'
import render from './render'

export default router =>
  [
    //
    health,
    render,
  ].forEach(f => f(router))
