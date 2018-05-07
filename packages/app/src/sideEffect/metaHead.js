import { selectMeta } from '~/store/selector/head/meta'

export const init = store => {
  const update = () => {
    const meta = selectMeta(store.getState())

    if (document.title !== meta.title) document.title = meta.title
  }

  update()

  store.subscribe(update)
}
