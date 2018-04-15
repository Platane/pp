import { genIUid, genUid } from '~/util/uid'

export const createSession = () => ({
  type: 'mutation:session:create',
  sessionId: genUid(),
})

export const setAnswer = (sessionId, lineId, answer) => ({
  type: 'mutation:answer:set',
  sessionId,
  lineId,
  answer,
})
