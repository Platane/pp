import { connect } from 'preact-redux'
import { SubmitQuestion as Dumb } from './Dumb'
import { submitQuestion } from '~/store/action/mutation'

const injectState = connect(state => ({ path: state.router.path }), {
  submitQuestion,
})

export const SubmitQuestion = injectState(Dumb)
