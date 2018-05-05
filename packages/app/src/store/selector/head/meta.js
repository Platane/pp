import { createSelector } from 'reselect'
import { APP_ORIGIN } from '~/config'

const selectRouter = x => x.router
const selectRouterKey = createSelector(selectRouter, x => x.key)

export const selectMeta = createSelector(selectRouter, (router) => ({
  title: 'hello',
  description: 'xxx',
  image: 'xxx.jpg',
  url: APP_ORIGIN+router.path
}))
