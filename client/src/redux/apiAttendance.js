import { operationStart, setCounter, getCounter } from './attendanceRedux'

export const getAttendanceData = async (dispatch, data, action) => {
  if (action === 'GET_ATTENDANCE') {
    dispatch(operationStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/count/get_count', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataAnswers = await response.json()
      dispatch(getCounter(dataAnswers))
    } catch (err) {
      console.log(err)
    }
  }
  if (action === 'SET_ATTENDANCE') {
    dispatch(operationStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/count/set_count', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      dispatch(setCounter())
    } catch (err) {
      console.log(err)
    }
  }
}
