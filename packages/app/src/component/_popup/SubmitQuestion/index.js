import { connect } from 'preact-redux'
import { SubmitQuestion as Dumb } from './Dumb'
import { submitQuestion } from '~/store/action/mutation'
import { setQuery } from '~/store/action/router'

const injectState = connect(state => ({ path: state.router.path }), {
  submitQuestion,
  close: () => setQuery({}),
})

export const SubmitQuestion = injectState(Dumb)
