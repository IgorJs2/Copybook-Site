export const redirectHandler = (history, id, page) => {
  if (id) {
    let path = `/class/${id}/${page}`
    history.push(path)
  } else {
    let path = `/${page}`
    history.push(path)
  }
  return 0
}
