export { goTo } from 'declarative-router/lib/redux/action'

export const setQuery = query => ({
  type: 'router:query:set',
  query,
})
