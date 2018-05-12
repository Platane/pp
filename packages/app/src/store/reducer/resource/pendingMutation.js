import { set } from '~/util/reduxHelper'

export const reduce = (state, action) => {
  switch (action.type) {
    case 'mutation:start':
      return set(
        state,
        ['pendingMutations'],
        [{ key: action.key, ...action.action }, ...state.pendingMutations]
      )

    case 'mutation:success':
    case 'mutation:error':
      return set(
        state,
        ['pendingMutations'],
        state.pendingMutations.filter(x => x.key !== action.key)
      )
  }

  return state
}
