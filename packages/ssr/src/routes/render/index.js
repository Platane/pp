import { render } from '~/service/render'

export default router =>
  router.get(
    '/',
    async ctx => (ctx.body = await render(ctx.path, ctx.query))
  )
