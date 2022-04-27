export const checkingLengthHadnler = (objects) => {
  let checking = 0
  objects.map((elem) => {
    if (elem.status === 'CHECKING') {
      checking += 1
    }
  })
  return checking
}
