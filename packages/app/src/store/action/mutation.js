import { genIUid, genUid } from '~/util/uid'

export const createSession = () => ({
  type: 'mutation:session:create',
  sessionId: genUid(),
})
