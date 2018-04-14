export const routes = [
  { path: '/about', key: 'about' },
  { path: '/:userId', key: 'home' },
  { path: '/:userId/session/:sessionId/result', key: 'sessionResult' },
  {
    path: '/:userId/session/:sessionId/step/:questionId',
    key: 'sessionQuestion',
  },
]
