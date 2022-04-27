import {
  getDataGrades,
  operationGradesStart,
  operationGradesFailure,
  createGrades,
  homeworkGrades,
  deleteMessages,
} from '../redux/gradesRedux'

export const getGradesData = async (dispatch, data, action) => {
  if (action === 'GET_GRADES') {
    dispatch(operationGradesStart())
    try {
      const body = JSON.stringify(data)

      const response = await fetch('/api/class/get_grades', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataGrades = await response.json()
      dispatch(getDataGrades(dataGrades))
    } catch (err) {
      dispatch(operationGradesFailure())
    }
  }
  if (action === 'CREATE_GRADE') {
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/grade_create', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataGrades = await response.json()
      dispatch(createGrades(dataGrades))
    } catch (err) {
      console.log(err)
    }
  }
  if (action === 'CLEAR_MESSAGE') {
    dispatch(deleteMessages())
  }
  if (action === 'ESTIMATE_HOMEWORK') {
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/estimate_homework', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataGrades = await response.json()
      dispatch(homeworkGrades(dataGrades))
    } catch (err) {
      console.log(err)
    }
  }
  if (action === 'HOMEWORK_T0_RATE') {
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/homework_to_estimate', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataGrades = await response.json()
      dispatch(homeworkGrades(dataGrades))
    } catch (err) {
      console.log(err)
    }
  }
  if (action === 'CLEAR_MESSAGE') {
    dispatch(deleteMessages())
  }
}
