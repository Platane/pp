export const genUid = () => {
  let uid = ''

  while (uid.length < 8)
    uid += Math.random()
      .toString(36)
      .slice(2)

  return uid.slice(0.8)
}
