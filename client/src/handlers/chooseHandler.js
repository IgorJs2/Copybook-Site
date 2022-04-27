export const chooseHandler = (setFile, file, event) => {
  setFile({ ...file, file: event.target.files[0] })
  return 0
}
