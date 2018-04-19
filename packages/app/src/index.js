import 'unfetch/polyfill'

import Raven from 'raven-js'
import { SENTRY_DSN } from '~/config'

import { create } from './store/index'

import { init as initUi } from '~/sideEffect/ui'
import { init as initResourceFetcher } from '~/sideEffect/resourceFetcher'
import { init as initTimeout } from '~/sideEffect/timeout'
import {
  createDomNavigator,
  initSideEffect as initRouter,
} from 'declarative-router'
import * as u from 'declarative-router'

console.log(u)

// init raven
if (SENTRY_DSN) {
  Raven.config(SENTRY_DSN, { release: process.env.VERSION || 'dev' }).install()
  Raven.setTagsContext({
    host: window.location && window.location.hostname,
  })
  window.Raven = Raven
}

// init store
const sideEffects = [
  initRouter({ navigator: createDomNavigator() }),
  initResourceFetcher,
  initTimeout,
  initUi,
]
Raven.context(() => create(sideEffects))
