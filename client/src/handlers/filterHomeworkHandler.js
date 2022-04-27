const filterHomeworkHandlerStudent = (objects, status, elem) => {
  let check = false
  let grade = 0
  objects.map((stat) => {
    if (
      (stat.name === elem.name && status === stat.status) ||
      (status === 'CURRENT' && stat.name === elem.name)
    ) {
      check = true
    }
    if (stat.name === elem.name && stat.status.includes(status)) {
      check = true
      grade = stat.status.split(' ')[1]
    }
  })
  return { check, grade }
}

const filterHomeworkHandlerTeacher = (objects, status, elem) => {
  let check = false
  let copy = false
  let grade = 0

  if (Array.isArray(objects)) {
    objects.map((stat) => {
      if (stat.name === elem.name && status === stat.status && elem.student) {
        check = true
      }
      if (
        stat.name === elem.name &&
        stat.status.includes(status) &&
        stat.status.split(' ')[1] &&
        stat.student_login === elem.student
      ) {
        check = true
        grade = stat.status.split(' ')[1]
      }
      if (
        stat.name === elem.name &&
        stat.status.includes('REVIEWED') &&
        stat.student_login === elem.student
      ) {
        copy = true
      }
    })
  }
  return { check, grade, copy }
}

export { filterHomeworkHandlerStudent, filterHomeworkHandlerTeacher }
