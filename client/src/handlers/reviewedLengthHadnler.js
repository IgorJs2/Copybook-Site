export const reviewedLengthHadnler = (objects) => {
  let reviewed = 0
  objects.map((elem) => {
    if (elem.status.includes('REVIEWED')) {
      reviewed += 1
    }
  })
  return reviewed
}
