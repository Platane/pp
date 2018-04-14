import koaBody from 'koa-bodyparser'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
import { schema } from './schema'

export default router => {
  const graphqlMiddleware = graphqlKoa(ctx => ({
    schema,
    formatError: ctx.logError,
    context: ctx,
  }))

  router.post('/graphql', koaBody(), graphqlMiddleware)
  router.get('/graphql', graphqlMiddleware)

  router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))
}
