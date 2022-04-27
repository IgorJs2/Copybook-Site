import {
  getDataAnswers,
  operationAnswersStart,
  operationAnswersFailure,
  createAnswers,
  deleteMessages,
} from './answersRedux'

export const getAnswersData = async (dispatch, data, action) => {
  if (action === 'GET_ANSWERS') {
    dispatch(operationAnswersStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/get_answers', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataAnswers = await response.json()
      dispatch(getDataAnswers(dataAnswers))
    } catch (err) {
      dispatch(operationAnswersFailure())
    }
  }
  if (action === 'GET_ANSWER') {
    dispatch(operationAnswersStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/get_answer', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataAnswers = await response.json()
      dispatch(getDataAnswers(dataAnswers))
    } catch (err) {
      dispatch(operationAnswersFailure())
    }
  }
  if (action === 'CREATE_ANSWER') {
    dispatch(operationAnswersStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/create_answer', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataAnswers = await response.json()
      dispatch(createAnswers(dataAnswers))
    } catch (err) {
      dispatch(operationAnswersFailure())
    }
  }
  if (action === 'CLEAR_MESSAGE') {
    dispatch(deleteMessages())
  }
}
