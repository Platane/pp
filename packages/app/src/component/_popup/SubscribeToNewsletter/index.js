import { connect } from 'preact-redux'
import { SubscribeToNewsletter as Dumb } from './Dumb'
import { subscribeToNewsletter } from '~/store/action/mutation'
import { setQuery } from '~/store/action/router'

const injectState = connect(state => ({ path: state.router.path }), {
  subscribeToNewsletter,
  close: () => setQuery({}),
})

export const SubscribeToNewsletter = injectState(Dumb)
