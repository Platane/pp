export const SENTRY_DSN = process.env.SENTRY_DSN || null

export const APP_ORIGIN = process.env.APP_ORIGIN || 'http://localhost:8082'

export const PATHPREFIX = '/'

export const API_ORIGIN =
  process.env.API_ORIGIN ||
  'https://pitchperfect-api.now.sh' ||
  'http://localhost:8084'
