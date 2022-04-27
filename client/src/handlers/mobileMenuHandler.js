export const mobileMenuHandler = (e) => {
  const sidebar = document.querySelector('.sidebar')
  const arror = document.querySelector('.logo-details')
  const sidebarElements1 = document.querySelectorAll('.tooltip')
  const sidebarElements2 = document.querySelectorAll('.links_name')
  const sidebarElements3 = document.querySelectorAll('.sidebar i')

  if (sidebar.style.visibility === 'initial') {
    sidebar.style.width = 'clamp(3rem, 10vw, 10rem)'
    sidebar.style.visibility = 'hidden'
    return 0
  }

  sidebar.style.visibility = 'initial'
  sidebar.style.width = '100vw'
  arror.style.visibility = 'hidden'

  for (let i in sidebarElements1) {
    if (sidebarElements1[i].style) {
      sidebarElements1[i].style.opacity = '1'
      sidebarElements1[i].style.pointerEvents = 'auto'
      sidebarElements1[i].style.transition = 'all 0.4s ease'
      sidebarElements1[i].style.top = '50%'
      sidebarElements1[i].style.transform = 'translateY(-50%)'
      sidebarElements1[i].style.display = 'none'
    }
  }
  for (let i in sidebarElements2) {
    if (sidebarElements2[i].style) {
      sidebarElements2[i].style.opacity = '1'
      sidebarElements2[i].style.pointerEvents = 'auto'
    }
  }
  for (let i in sidebarElements3) {
    if (sidebarElements3[i].style) {
      sidebarElements3[i].style.padding = '0'
    }
  }
}
