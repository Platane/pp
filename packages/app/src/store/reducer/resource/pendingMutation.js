import { set } from '~/util/reduxHelper'

export const reduce = (state, action) => {
  switch (action.type) {
    case 'mutation:start':
      return set(
        state,
        ['pendingMutations'],
        [action.key, ...state.pendingMutations]
      )

    case 'mutation:success':
    case 'mutation:error':
      return set(
        state,
        ['pendingMutations'],
        state.pendingMutations.filter(x => x !== action.key)
      )
  }

  return state
}
