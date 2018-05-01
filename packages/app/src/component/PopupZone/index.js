import { h } from 'preact'
import { connect } from 'preact-redux'
import { PopupZone as Dumb } from './Dumb'

const injectState = connect(({ router }) => ({
  active: (router.query.subscribe && 'subscribe') || null,
}))

export const PopupZone = injectState(Dumb)
