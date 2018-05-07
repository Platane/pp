import { genIUid, genUid } from '~/util/uid'

export const createSession = () => ({
  type: 'mutation:session:create',
  sessionId: genUid(),
})

export const subscribeToNewsletter = email => ({
  type: 'mutation:user:subscribeToNewsletter',
  email,
})

export const submitQuestion = question => ({
  type: 'mutation:user:submitQuestion',
  question,
})

export const setAnswer = (sessionId, lineId, answer) => ({
  type: 'mutation:answer:set',
  sessionId,
  lineId,
  answer,
})
