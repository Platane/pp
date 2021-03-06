import preact, { h, render } from 'preact'
import { Provider } from 'preact-redux'

import { App } from '~/component/App'

export const init = store => {
  const update = () => {
    unsubscribe()

    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    )

    render(app, document.body, document.getElementById('app'))
  }

  const unsubscribe = store.subscribe(update)

  update()
}
