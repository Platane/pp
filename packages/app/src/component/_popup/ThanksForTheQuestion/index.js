import { connect } from 'preact-redux'
import { ThanksForTheQuestion as Dumb } from './Dumb'
import { setQuery } from '~/store/action/router'
import { selectCurrentSessionStats } from '~/store/selector/currentSession'

const injectState = connect(() => ({}), {
  close: () => setQuery({}),
})

export const ThanksForTheQuestion = injectState(Dumb)
