export const currentLengthHadnler = (homeworks, objects) => {
  let checking = 0
  let reviewed = 0
  let expired = 0

  objects.map((elem) => {
    if (elem.status === 'CHECKING') {
      checking += 1
    }
    if (elem.status.includes('REVIEWED')) {
      reviewed += 1
    }
    if (elem.status === 'EXPIRED') {
      expired += 1
    }
  })

  return homeworks - (checking + reviewed + expired)
}
