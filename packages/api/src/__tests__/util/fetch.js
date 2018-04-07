import fetch from 'node-fetch'
import { STORE_ORIGIN } from '~/config'

const safeJSONparse = s => {
  try {
    return JSON.parse(s)
  } catch (err) {
    return null
  }
}

export default (path, { body, headers = {}, token, ...params } = {}) =>
  fetch(`http://${STORE_ORIGIN}${path}`, {
    ...params,

    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },

    body: body && JSON.stringify(body),
  }).then(async res => {
    const text = await res.text()

    if (!res.ok) throw new Error(text)

    return safeJSONparse(text) || text
  })
