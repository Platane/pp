import koa from 'koa'
import koaRouter from 'koa-router'
import koaCors from 'koa2-cors'
import corsError from 'koa2-cors-error'
import initRoutes from './routes'
import { PORT } from '~/config'

const logError = err => {
  process.env.NODE_ENV === 'test'
    ? console.error('got error:', err.message)
    : console.error(err)

  return err
}

export const create_ = async () => {
  const app = new koa()

  app.context.logError = logError

  const router = new koaRouter()

  initRoutes(router)

  app.use(
    koaCors({
      origin: '*',
      headers: ['Authorization', 'Content-Type'],
      methods: ['GET', 'POST', 'OPTIONS'],
    })
  )
  app.use(corsError())
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.on('error', logError)

  const server = app.listen(PORT)

  console.log(`ready on ${PORT}`)

  // kill server
  return () => server.close()
}

export const create = () =>
  create_().catch(err => {
    logError(err)
    throw err
  })
