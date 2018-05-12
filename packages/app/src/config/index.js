export const SENTRY_DSN = process.env.SENTRY_DSN || null

export const APP_ORIGIN =
  process.env.APP_ORIGIN ||
  'https://storage.googleapis.com/pitchperfect' ||
  'http://localhost:8082'

export const PATHPREFIX = process.env.BUCKET ? '/' + process.env.BUCKET : ''

export const API_ORIGIN =
  process.env.API_ORIGIN ||
  'https://pitchperfect-api.now.sh' ||
  'http://localhost:8084'
