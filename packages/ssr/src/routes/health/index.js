export default router => router.get('/health', ctx => (ctx.body = 'ok'))
