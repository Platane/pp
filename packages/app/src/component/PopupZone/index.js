import { h } from 'preact'
import { connect } from 'preact-redux'
import { PopupZone as Dumb } from './Dumb'

const injectState = connect(({ router }) => ({
  active:
    (router.query.submitquestion && 'submitquestion') ||
    (router.query.subscribeok && 'subscribeok') ||
    (router.query.subscribe && 'subscribe') ||
    (router.query.result && 'result') ||
    (router.query.break && 'break') ||
    null,
}))

export const PopupZone = injectState(Dumb)
