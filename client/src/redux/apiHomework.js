import {
  getDataHomeworks,
  operationHomeworksStart,
  operationHomeworksFailure,
  createHomeworks,
  deleteMessages,
} from './homeworksRedux'

export const getHomeworksData = async (dispatch, data, action) => {
  if (action === 'GET_HOMEWORKS') {
    dispatch(operationHomeworksStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/get_homeworks', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataHomeworks = await response.json()
      dispatch(getDataHomeworks(dataHomeworks))
    } catch (err) {
      dispatch(operationHomeworksFailure())
    }
  }
  if (action === 'CREATE_HOMEWORK') {
    dispatch(operationHomeworksStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/create_homework', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataHomeworks = await response.json()
      dispatch(createHomeworks(dataHomeworks))
    } catch (err) {
      dispatch(operationHomeworksFailure())
    }
  }
  if (action === 'DELETE_HOMEWORK') {
    dispatch(operationHomeworksStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/delete_homework', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataHomeworks = await response.json()
      dispatch()
    } catch (err) {
      dispatch(operationHomeworksFailure())
    }
  }
  if (action === 'CLEAR_MESSAGE') {
    dispatch(deleteMessages())
  }
}
