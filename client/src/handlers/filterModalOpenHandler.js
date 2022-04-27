export const filterModalOpenHandler = () => {
  const modal = document.querySelector('.progress-block-modal')

  if (modal.style.display === 'none') {
    modal.style.display = 'flex'
  } else {
    modal.style.display = 'none'
  }
}
