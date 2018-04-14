import { combineReducers } from 'redux'
import { chainReducer } from '~/util/reduxHelper'
import {
  reduce as resource,
  defaultState as resourceDefaultState,
} from './resource'
import {
  reduce as router,
  defaultState as routerDefaultState,
  reduceGlobal as routerGlobal,
} from './router'

export const reduce = combineReducers({
  resource,
  router,
})

export const defaultState = {
  resource: resourceDefaultState,
  router: routerDefaultState,
}
