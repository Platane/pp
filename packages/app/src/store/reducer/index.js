import { combineReducers } from 'redux'
import { chainReducer } from '~/util/reduxHelper'
import { compose } from '~/util/compose'
import {
  reduce as resource,
  reduceGlobal as resourceGlobal,
  defaultState as resourceDefaultState,
} from './resource'
import {
  reduce as identity,
  defaultState as identityDefaultState,
} from './identity'
import {
  reduce as router,
  defaultState as routerDefaultState,
  reduceGlobal as routerGlobal,
  enhance as routerEnhance,
} from './router'
import {
  reduce as timeout,
  defaultState as timeoutDefaultState,
  enhance as timeoutEnhance,
} from './timeout'

export const reduce = compose(timeoutEnhance, routerEnhance)(
  chainReducer(
    combineReducers({
      resource,
      identity,
      timeout,
      router,
    }),
    resourceGlobal
  )
)

export const defaultState = {
  resource: resourceDefaultState,
  identity: identityDefaultState,
  timeout: timeoutDefaultState,
  router: routerDefaultState,
}
