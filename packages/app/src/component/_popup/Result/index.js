import { connect } from 'preact-redux'
import { Result as Dumb } from './Dumb'
import { submitQuestion } from '~/store/action/mutation'
import { createSession } from '~/store/action/mutation'

const injectState = connect(state => ({ path: state.router.path }), {
  submitQuestion,
  startOver: createSession,
})

export const Result = injectState(Dumb)
