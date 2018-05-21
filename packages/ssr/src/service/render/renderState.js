import preactRender from 'preact-render-to-string'
import { h } from 'preact'
import { extractCritical } from 'emotion-server'
import { App } from 'app/component/App'
import { Provider } from 'preact-redux'
import { selectMeta } from 'app/store/selector/head/meta'
import { stringify as stringifyMeta } from 'app/service/head'

const assetManifest = require('app/../dist/assetManifest.json')
const { publicPath } = require('app/../dist/stats.json')

console.log('public path:', publicPath, assetManifest['index.js'])

const createFakeStore = state => ({
  getState: () => state,
  dispatch: () => 0,
})

export const renderState = state => {
  const app = (
    <Provider store={createFakeStore(state)}>
      <App />
    </Provider>
  )

  const { html, ids, css } = extractCritical(preactRender(app))

  const meta = stringifyMeta(selectMeta(state))

  const indexhtml = `
<!doctype html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1"></meta>
<link href="https://fonts.googleapis.com/css?family=Didact+Gothic" rel="stylesheet"></link>
<link rel="manifest" href="${publicPath + 'manifest.json'}"></link>
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
<script src="${publicPath + assetManifest['index.js']}"></script>
</html>`

  return indexhtml
}
