export const expiredLengthHandler = (objects) => {
  let expired = 0
  objects.map((elem) => {
    if (elem.status === 'EXPIRED') {
      expired += 1
    }
  })
  return expired
}
