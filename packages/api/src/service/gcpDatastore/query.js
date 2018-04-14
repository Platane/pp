import { parse } from './parse'

const toNumber = x => (isFinite(x) ? +x : x)

export const findById = (db, keyPrefix = []) => async ids => {
  if (ids.length === 0) return []

  const keys = ids.map(id => db.key([...keyPrefix, id].map(toNumber)))

  const [x] = await db.get(keys)

  return x.map(parse(db))
}
