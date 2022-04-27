export const filterGradeHandler = (setType, event) => {
  const modal = document.querySelector('.progress-block-modal')
  let type = event.target.getAttribute('data-type')
  setType(type)
  modal.style.display = 'none'
  return 0
}
