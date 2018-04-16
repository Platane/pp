import { reduce as hydratation } from './hydratation'
import { reduce as pendingMutation } from './pendingMutation'
import { reduce as mutation } from './mutation'
import { reduceGlobal as toFetchGlobal } from './toFetch'

import { chainReducer } from '~/util/reduxHelper'

export const defaultState = {
  required: [],
  toFetch: [],
  pendingMutations: [],
  optimisticBackups: {},
  cache: {},
}

const reduceDefault = (state, action) => (state = state || defaultState)

export const reduce = chainReducer(
  reduceDefault,
  hydratation,
  mutation,
  pendingMutation
)

export const reduceGlobal = toFetchGlobal
