import { connect } from 'preact-redux'
import { SubscriptionFooter as Dumb } from './Dumb'

const injectState = connect(state => ({
  path: state.router.path,
  email_sent: state.identity.user && state.identity.user.email_sent,
}))

export const SubscriptionFooter = injectState(Dumb)
