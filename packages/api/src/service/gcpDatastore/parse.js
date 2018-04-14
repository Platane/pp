export const parseKey = key => key.path[key.path.length - 1]

export const parse = db => (x: Object) => ({
  ...x,
  id: parseKey(x[db.KEY]),
})
