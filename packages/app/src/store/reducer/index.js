import { combineReducers } from 'redux'
import { chainReducer } from '~/util/reduxHelper'
import {
  reduce as resource,
  reduceGlobal as resourceGlobal,
  defaultState as resourceDefaultState,
} from './resource'
import {
  reduce as router,
  defaultState as routerDefaultState,
  reduceGlobal as routerGlobal,
} from './router'
import {
  reduce as timeout,
  defaultState as timeoutDefaultState,
  enhance as timeoutEnhance,
} from './timeout'

export const reduce = timeoutEnhance(
  chainReducer(
    combineReducers({
      resource,
      router,
      timeout,
    }),
    routerGlobal,
    resourceGlobal
  )
)

export const defaultState = {
  resource: resourceDefaultState,
  router: routerDefaultState,
  timeout: timeoutDefaultState,
}
