import { connect } from 'preact-redux'
import { SubscribeToNewsletter as Dumb } from './Dumb'
import { subscribeToNewsletter } from '~/store/action/mutation'

const injectState = connect(state => ({ path: state.router.path }), {
  subscribeToNewsletter,
})

export const SubscribeToNewsletter = injectState(Dumb)
