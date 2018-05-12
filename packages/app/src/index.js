import 'unfetch/polyfill'

import Raven from 'raven-js'
import { SENTRY_DSN, PATHPREFIX } from '~/config'

import { create } from './store/index'

import { init as initUi } from '~/sideEffect/ui'
import { init as initResourceFetcher } from '~/sideEffect/resourceFetcher'
import { init as initServiceWorker } from '~/sideEffect/serviceWorker'
import { init as initLocalStorage } from '~/sideEffect/localStorage'
import { init as initTimeout } from '~/sideEffect/timeout'
import { init as initMetaHead } from '~/sideEffect/metaHead'
import {
  createDomNavigator,
  initSideEffect as initRouter,
} from 'declarative-router'
import * as u from 'declarative-router'

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
  initRouter({ navigator: createDomNavigator({ pathPrefix: PATHPREFIX }) }),
  initResourceFetcher,
  initServiceWorker,
  initLocalStorage,
  initMetaHead,
  initTimeout,
  initUi,
]
Raven.context(() => create(sideEffects))
