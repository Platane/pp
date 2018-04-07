import { encodeBase64, decodeBase64 } from '~/util/base64'

const isNumber = (x: any): boolean => x == +x

export const parseKey = key => encodeBase64(key.path.join(':'))

export const formatKey = db => (id: String) =>
  db.key(
    decodeBase64(id)
      .split(':')
      .map(x => (isNumber(x) ? +x : x))
  )

export const isKey = (id: String) => decodeBase64(id).match(/\w+\:\d+/)

export const parse = db => (x: Object) => ({
  ...x,
  id: parseKey(x[db.KEY]),
})
