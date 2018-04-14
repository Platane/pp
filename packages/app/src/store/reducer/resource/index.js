import { reduce as hydratation } from './hydratation'
import { reduce as pendingMutation } from './pendingMutation'
import { reduce as mutation } from './mutation'

import { chainReducer } from '~/util/reduxHelper'

import type { State } from './type'

export const defaultState = {
  toFetch: [{ key: 'session.aaaa' }],
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
