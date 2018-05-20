import preactRender from 'preact-render-to-string'
import { h } from 'preact'
import { extractCritical } from 'emotion-server'
// import { init as initResourceFetcher } from 'app/sideEffect/resourceFetcher'
// import { App } from 'app/component/App'
import { Provider } from 'preact-redux'

import { waitFor } from '~/util/waitFor'
import fetch from 'node-fetch'

const assetManifest = require('app/../dist/assetManifest.json')
const { publicPath } = require('app/../dist/stats.json')

console.log('public path', publicPath, assetManifest['index.js'])

// monkey patch node env
global.fetch = fetch
global.btoa = x => new Buffer(x).toString('base64')

// alias react to preact
const moduleAlias = require('module-alias')
moduleAlias.addAlias('react', 'preact-compat')
moduleAlias.addAlias('react-redux', 'preact-redux')

const createStore = require('app/store').create
const initResourceFetcher = require('app/sideEffect/resourceFetcher').init
const App = require('app/component/App').App
const goToAction = require('app/store/action/router').goTo
const selectFetchingPending = require('app/store/selector/pending')
  .selectFetchingPending
const selectMeta = require('app/store/selector/head/meta').selectMeta
const stringifyMeta = require('app/service/head').stringify

export const render = async (pathname: string, query: Object) => {
  // bootstrap the store
  const store = createStore([initResourceFetcher])

  // set the router
  store.dispatch(goToAction(pathname, query))

  // await for resource fetching to end
  await waitFor(store, s => !selectFetchingPending(s))

  // render
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  )

  const { html, ids, css } = extractCritical(preactRender(app))

  const meta = stringifyMeta(selectMeta(store.getState()))

  const state = store.getState()

  // remove user
  state.identity.user = null

  const indexhtml = `
<!doctype html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1"></meta>
<link href="https://fonts.googleapis.com/css?family=Didact+Gothic" rel="stylesheet"></link>
<link rel="manifest" href="/manifest.json"></link>
<meta charset="UTF-8"></meta>
${meta}
<style>${css}</style>
</head>
<body>
<div id="app">${html}</div>
</body>
<script>
 window.__PRELOADED_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};
 window.__EMOTION_IDS__=${JSON.stringify(ids)};
</script>
<script async src="${publicPath + assetManifest['index.js']}"></script>
</html>`

  return indexhtml
}
