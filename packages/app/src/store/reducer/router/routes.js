export const routes = [
  { path: '/', key: 'home' },
  { path: '/instruction', key: 'instruction' },
  { path: '/about', key: 'about' },
  { path: '/instruction', key: 'instruction' },
  { path: '/session/:sessionId', key: 'sessionLine' },
  { path: '/session/:sessionId/result', key: 'sessionResult' },
  {
    path: '/session/:sessionId/step/:lineId',
    key: 'sessionLine',
  },
]
