import { parse } from '~/service/gcpDatastore/parse'

export default router =>
  router.get('/question', async ctx => {
    const query = ctx.datastore.createQuery('question')

    const [questions, _] = await ctx.datastore.runQuery(query)

    ctx.body = questions.map(parse(ctx.datastore))
  })
