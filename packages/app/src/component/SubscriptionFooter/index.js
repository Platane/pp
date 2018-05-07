import { connect } from 'preact-redux'
import { SubscriptionFooter as Dumb } from './Dumb'

const injectState = connect(state => ({ path: state.router.path }))

export const SubscriptionFooter = injectState(Dumb)
