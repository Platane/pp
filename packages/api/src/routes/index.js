import health from './health'
import question from './question'

export default router => [health, question].forEach(f => f(router))
