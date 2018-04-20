import { genUid } from '~/util/uid'

export const defaultState = { user: { id: genUid() + genUid() + genUid() } }

export const reduce = (state, action) => {
  state = state || defaultState

  switch (action.type) {
    case 'localStorage:read':
      if (action.user) return { user: action.user }
      break
  }

  return state
}
