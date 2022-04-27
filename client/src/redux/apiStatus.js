import { setStudent, setObjects, clearStateST } from '../redux/statusRedux'

export const getStatusData = async (dispatch, data, action) => {
  dispatch(clearStateST())
  if (action === 'GET_STATUS') {
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/get_status', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const responseData = await response.json()
      dispatch(setObjects(responseData))
    } catch (err) {}
  }

  if (action === 'SET_STATUS') {
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/set_status', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      await getStatusData(
        dispatch,
        {
          student: data.student,
          object: data.type,
          class_: data.class_,
        },
        'GET_STATUS',
      )
    } catch (err) {}
  }
}
