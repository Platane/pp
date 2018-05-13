import { h } from 'preact'
import { connect } from 'preact-redux'
import { PopupZone as Dumb } from './Dumb'
import { selectSessionCreationPending } from '~/store/selector/pending'

const injectState = connect(state => {
  const q = state.router.query

  if (selectSessionCreationPending(state)) return { active: null }

  return {
    active:
      (q.submitquestion && 'submitquestion') ||
      (q.subscribeok && 'subscribeok') ||
      (q.subscribe && 'subscribe') ||
      (q.result && 'result') ||
      (q.break && 'break') ||
      null,
  }
})

export const PopupZone = injectState(Dumb)
