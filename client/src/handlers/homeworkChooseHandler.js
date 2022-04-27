export const homeworkChooseHandler = (setChoosedHomework, event) => {
  let name = event.target.getAttribute('data-name')
  if (name) {
    setChoosedHomework(name)
  }
}
