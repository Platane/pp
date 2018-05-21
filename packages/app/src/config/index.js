const SENTRY_DSN = process.env.SENTRY_DSN || null

const PATHPREFIX = '/'

const APP_ORIGIN = process.env.APP_ORIGIN || 'http://localhost:8082'

const STATIC_ORIGIN = process.env.BUCKET
  ? `https://storage.googleapis.com/${process.env.BUCKET || 'bucket'}/`
  : '/'

const API_ORIGIN =
  process.env.API_ORIGIN ||
  'https://pitchperfect-api.now.sh' ||
  'http://localhost:8084'

module.exports = {
  SENTRY_DSN,
  PATHPREFIX,
  APP_ORIGIN,
  API_ORIGIN,
  STATIC_ORIGIN,
}
