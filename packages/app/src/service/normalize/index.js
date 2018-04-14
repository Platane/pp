// const formatSessionKey = session => `session.${session.id}`
// const formatLineKey = (sessionId, line) => `session.${sessionId}`

export const normalizeSession = session => {
  const c = {}

  c[`session.${session.id}`] = {
    ...session,

    lines: session.lines.map(
      l => `session.${session.id}.line.${l.question.id}`
    ),
  }

  session.lines.forEach(l => {
    c[`session.${session.id}.line.${l.question.id}`] = {
      ...l,
      question: `question.${l.question.id}`,
    }

    c[`question.${l.question.id}`] = l.question
  })

  return c
}

export const getSession = cache => sessionId => {
  const s = cache[`session.${sessionId}`]

  return s
    ? {
        ...s,

        lines: s.lines.map(k => {
          const l = cache[k]

          const question = l && cache[l.question]

          return (
            l &&
            question && {
              ...l,
              question,
            }
          )
        }),
      }
    : null
}

export const normalize = ({ session }) =>
  Object.assign(
    ...[
      //
      session && normalizeSession(session),
    ].filter(Boolean)
  )
