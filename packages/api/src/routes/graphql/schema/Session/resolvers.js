import { parse } from '~/service/gcpDatastore/parse'
import { findById } from '~/service/gcpDatastore/query'

export const lines = async ({ lines }, _, { datastore }) => {
  const questions = await findById(datastore, ['question'])(
    lines.map(x => x.questionId)
  )

  return lines
    .map(x => ({
      ...x,
      question: questions.find(u => u.id == x.questionId),
    }))
    .filter(x => x.question)
}

export const user = async ({ userId }) => ({ id: userId })
