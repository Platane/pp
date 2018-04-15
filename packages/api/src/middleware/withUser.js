// import jwt from 'jsonwebtoken'
// import { JWT_PRIVATE_KEY } from '~/config'

import { decodeBase64 } from '~/util/base64'

export const withUser = handler => (o, args, ctx) => {
  const b =
    ctx.request.headers.authorization &&
    ctx.request.headers.authorization.replace('Basic ', '')

  const [userId] = ((b && decodeBase64(b)) || '').split(':')

  if (!userId) throw new Error('401')

  //
  // try {
  //   const data = jwt.verify(token, JWT_PRIVATE_KEY)
  //
  //   ctx.user = {
  //     role: data.role,
  //     id: data.id,
  //   }
  // } catch (err) {
  //   throw new Error('401')
  // }

  ctx.user = { userId }

  return handler(o, args, ctx)
}
