import {
  getDataSignals,
  operationSignalsStart,
  operationSignalsFailure,
  createSignals,
  deleteSignals,
  deleteMessages,
} from './signalsRedux'

export const getSignalsData = async (dispatch, data, action) => {
  if (action === 'GET_SIGNALS') {
    dispatch(operationSignalsStart())
    try {
      const body = JSON.stringify({ id: data })
      const response = await fetch('/api/class/get_signals', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataSignals = await response.json()
      dispatch(getDataSignals(dataSignals))
    } catch (err) {
      dispatch(operationSignalsFailure())
    }
  }
  if (action === 'CREATE_SIGNALS') {
    dispatch(operationSignalsStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/create_signal', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataSignals = await response.json()
      dispatch(createSignals(dataSignals))
    } catch (err) {
      dispatch(operationSignalsFailure())
    }
  }
  if (action === 'DELETE_SIGNALS') {
    dispatch(operationSignalsStart())
    try {
      const body = JSON.stringify(data)
      const response = await fetch('/api/class/delete_signal', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataSignals = await response.json()
      dispatch(deleteSignals(dataSignals))
    } catch (err) {
      dispatch(operationSignalsFailure())
    }
  }
  if (action === 'CLEAR_MESSAGE') {
    dispatch(deleteMessages())
  }
}
