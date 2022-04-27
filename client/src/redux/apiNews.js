import {
  getDataNews,
  operationNewsStart,
  operationNewsFailure,
  deleteNews,
  createNews,
  deleteMessages,
} from './newsRedux'

export const getNewsData = async (dispatch, data, action) => {
  if (action === 'GET_NEWS') {
    dispatch(operationNewsStart())
    try {
      const body = JSON.stringify({ id: data })
      const response = await fetch('/api/class/get_news', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataNews = await response.json()
      dispatch(getDataNews(dataNews))
    } catch (err) {
      dispatch(operationNewsFailure())
    }
  }
  if (action === 'CREATE_NEWS') {
    dispatch(operationNewsStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/create_news', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataNews = await response.json()
      dispatch(createNews(dataNews))
    } catch (err) {
      dispatch(operationNewsFailure())
    }
  }
  if (action === 'DELETE_NEWS') {
    dispatch(operationNewsStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/delete_news', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataNews = await response.json()
      dispatch(deleteNews(dataNews))
    } catch (err) {
      dispatch(operationNewsFailure())
    }
  }
  if (action === 'CLEAR_MESSAGE') {
    dispatch(deleteMessages())
  }
}
