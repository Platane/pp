import { set } from '~/util/reduxHelper'
import { genUid } from '~/util/uid'
import { selectCurrentSessionId } from '~/store/selector/currentSession'

export const reduceGlobal = (state, action) => {
  // update required
  {
    const sessionId = selectCurrentSessionId(state)

    const key = `session.${sessionId}`

    if (sessionId && state.resource.required[0] != key)
      state = set(state, ['resource', 'required'], [key])
  }

  // update toFetch
  {
    state.resource.required
      .filter(key => !state.resource.toFetch.some(x => x.key == key))
      .forEach(
        key =>
          (state = set(
            state,
            ['resource', 'toFetch'],
            [...state.resource.toFetch, { key, requestKey: genUid() }]
          ))
      )
  }

  switch (action.type) {
    case 'resource:fetch:success':
    case 'resource:fetch:fail':
      break
  }

  return state
}
