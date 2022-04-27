import {
  getDataStudent,
  setChoosenStudent,
  getDataList,
  getDataChartStudent,
  getDataChartAllStudent,
} from './studentsRedux'

export const getStudentData = async (dispatch, data, action) => {
  if (action === 'GET_STUDENT') {
    try {
      const body = JSON.stringify({ id: data })
      const response = await fetch('/api/class/get_student', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataStudent = await response.json()
      dispatch(getDataList(dataStudent))
    } catch (err) {
      console.log(err)
    }
  }
  if (action === 'GET_CHART_STUDENT') {
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/get_chart_grade', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataStudent = await response.json()
      dispatch(getDataChartStudent(dataStudent))
    } catch (err) {
      console.log(err)
    }
  }
  if (action === 'GET_STUDENT_DATA') {
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/get_student_data', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataStudent = await response.json()
      dispatch(getDataStudent(dataStudent))
    } catch (err) {
      console.log(err)
    }
  }
  if (action === 'GET_PRG_CHART_STUDENT') {
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/get_chart_type_grades', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataStudent = await response.json()
      dispatch(getDataChartAllStudent(dataStudent))
    } catch (err) {
      console.log(err)
    }
  }
  if (action === 'SET_STUDENT') {
    try {
      dispatch(setChoosenStudent(data))
    } catch (err) {
      console.log(err)
    }
  }
}
