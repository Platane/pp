export const selectCurrentUser = state => state.identity.user || null

export const selectCurrentUserId = state =>
  (state.identity.user && state.identity.user.id) || null
