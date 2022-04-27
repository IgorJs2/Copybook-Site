import {
  operationStart,
  createClass,
  deleteClass,
  connectClass,
  disconnectClass,
  getClass,
  deleteMessages,
  NotsuccesfullOperation,
} from './classRedux'

export const ClassAction = async (dispatch, data, action) => {
  if (action === 'GET_CLASS_DATA') {
    dispatch(operationStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/get_class', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataClass = await response.json()
      dispatch(getClass(dataClass))
    } catch (err) {
      dispatch(NotsuccesfullOperation())
    }
  }
  if (action === 'CREATE_CLASS') {
    dispatch(operationStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/create_class', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataClass = await response.json()
      dispatch(createClass(dataClass))
    } catch (err) {
      dispatch(NotsuccesfullOperation())
    }
  }
  if (action === 'DELETE_CLASS') {
    dispatch(operationStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/delete_class', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataClass = await response.json()
      dispatch(deleteClass(dataClass))
    } catch (err) {
      dispatch(NotsuccesfullOperation())
    }
  }
  if (action === 'CONNECT_CLASS') {
    dispatch(operationStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/connect_class', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataClass = await response.json()
      dispatch(connectClass(dataClass))
    } catch (err) {
      dispatch(NotsuccesfullOperation())
    }
  }
  if (action === 'DISCONNECT_CLASS') {
    dispatch(operationStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/disconnect_class', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataClass = await response.json()
      dispatch(disconnectClass(dataClass))
    } catch (err) {
      dispatch(NotsuccesfullOperation())
    }
  }
  if (action === 'CLEAR_MESSAGE') {
    dispatch(deleteMessages())
  }
}
