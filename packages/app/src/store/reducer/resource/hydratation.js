import { normalize } from '~/service/normalize'
import { combineReducers } from '~/util/reduxHelper'

export const reduce = combineReducers({
  cache: (state, action) => {
    switch (action.type) {
      case 'resource:fetch:success': {
        return {
          ...state,
          ...normalize(action.data),
        }
      }
    }

    return state
  },
})
