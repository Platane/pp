export const success = (res, resource) => ({
  type: 'resource:fetch:success',
  ...res,
  ...resource,
})

export const failure = (error, resource) => ({
  type: 'resource:fetch:failure',
  error,
  ...resource,
})
