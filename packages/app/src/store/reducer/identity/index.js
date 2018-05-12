import { genUid } from '~/util/uid'
import { set } from '~/util/reduxHelper'

export const defaultState = {
  user: { id: genUid() + genUid() + genUid(), email_sent: false },
}

export const reduce = (state, action) => {
  state = state || defaultState

  switch (action.type) {
    case 'localStorage:read':
      if (action.user) return { user: action.user }
      break

    case 'mutation:success':
      if (action.action.type === 'mutation:user:subscribeToNewsletter')
        return set(state, ['user', 'email_sent'], true)
  }

  return state
}
