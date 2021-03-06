import { connect } from 'preact-redux'
import { Instruction as Dumb } from './Dumb'
import { createSession } from '~/store/action/mutation'

const injectState = connect(
  state => ({ creating: !!state.resource.pendingMutations.length }),
  { startNewSession: createSession }
)

export const Instruction = injectState(Dumb)
