export const chainReducer = <State, Action>(
  ...reducers: Array<(state: State, action: Action, state0: State) => State>
) => (state0: State, action: Action): State =>
  reducers.reduce((state, reducer) => reducer(state, action, state0), state0)

// different from the one in redux,
//   is doesn't remove the substate K if the subreduce K does not exists
export const combineReducers = o => (state, action) => {
  let nextState = null

  for (let key in o) {
    const s = state[key]
    const ns = o[key](s, action)

    if (s != ns) (nextState = nextState || {})[key] = ns
  }

  return nextState ? { ...state, ...nextState } : state
}

const isObject = (a: any): boolean =>
  !!(a && typeof a === 'object' && !Array.isArray(a))

/**
 * set a property in a nested structure, return a cloned structure
 * create the property parent if it does not exist
 *
 * @param source : a object / array structure to clone
 * @param path : array of property name ( or index for array )
 * @param value : new value
 *
 *
 * example:  set( object, ['path', 'to', 'array', 1 ], 18 )
 *
 */
export const set = (
  source: any,
  [key, ...rest]: (string | number)[],
  value: any
): any => {
  if (!key && key !== 0) return value

  if (typeof key === 'number') {
    // array
    const copy = Array.isArray(source) ? source.slice() : []

    copy[key] = set(copy[key], rest, value)

    return copy
  } else {
    // object

    source = isObject(source) ? source : {}

    return {
      ...source,
      [key]: set(source[key], rest, value),
    }
  }
}

const get = (source: any, [key, ...rest]: (string | number)[]) =>
  !key && key !== 0 ? source : get((source || {})[key], rest)

/**
 * same as set, but the value to set is an object, which will be merge
 *
 */
export const merge = (
  source: any,
  path: (string | number)[],
  value: any
): any => set(source, path, { ...(get(source, path) || {}), ...value })
