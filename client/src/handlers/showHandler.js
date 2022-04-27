export const showHandler = (type) => {
  if (type === 'HOMEWORK') {
    let element_first = document.querySelectorAll('.homework-block-main')
    let elemenet_second = document.querySelectorAll('.homework-block-list')
    console.log(elemenet_second)
    let element_btn = document.querySelector('.btn')
    if (element_btn.classList.contains('not_show')) {
      element_first[0].style.overflow = 'visible'
      element_first[1].style.overflow = 'visible'
      element_first[2].style.overflow = 'visible'
      for (let i = 0; i < elemenet_second.length; i++) {
        elemenet_second[i].style.height = 'fit-content'
      }
      element_btn.classList.add('show')
      element_btn.classList.remove('not_show')
      element_btn.classList.add('bx-flip-vertical')
    } else {
      element_first[0].style.overflow = 'hidden'
      element_first[1].style.overflow = 'hidden'
      element_first[2].style.overflow = 'hidden'
      for (let i = 0; i < elemenet_second.length; i++) {
        elemenet_second[i].style.height = '40%'
      }
      element_btn.classList.remove('show')
      element_btn.classList.add('not_show')
      element_btn.classList.remove('bx-flip-vertical')
    }
  } else if (type === 'MATERIAL') {
    let element_second = document.querySelectorAll('.materials-block-main')
    let element_btn = document.querySelector('.btn')
    if (element_btn.classList.contains('not_show')) {
      element_second[0].style.height = 'fit-content'
      element_second[1].style.height = 'fit-content'
      element_btn.classList.add('show')
      element_btn.classList.remove('not_show')
      element_btn.classList.add('bx-flip-vertical')
    } else {
      element_second[0].style.height = '32vh'
      element_second[1].style.height = '32vh'
      element_btn.classList.remove('show')
      element_btn.classList.add('not_show')
      element_btn.classList.remove('bx-flip-vertical')
    }
  } else if (type === 'PROGRESS') {
    const elemenet_second = document.querySelector('.progress-block-second')
    const elemenet_third = document.querySelector('.student_grades-block')
    const element_btn = document.querySelector('.btn')
    if (elemenet_second && element_btn) {
      if (element_btn.classList.contains('not_show')) {
        elemenet_second.style.height = 'auto'
        element_btn.classList.add('show')
        element_btn.classList.remove('not_show')
        element_btn.classList.add('bx-flip-vertical')
      } else {
        elemenet_second.style.height = '37vh'
        element_btn.classList.remove('show')
        element_btn.classList.add('not_show')
        element_btn.classList.remove('bx-flip-vertical')
      }
    }
  }
}
