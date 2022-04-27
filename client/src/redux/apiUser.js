import {
  getDataUser,
  getDataUserFailure,
  getDataUserSuccess,
  updateUser,
} from './userRedux'

export const getUserData = async (dispatch, user, action) => {
  if (action === 'GET_USER_DATA') {
    await dispatch(getDataUser())
    try {
      const body = JSON.stringify({ id: user })
      const response = await fetch('/api/user/get_user', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataUser = await response.json()
      await dispatch(getDataUserSuccess(dataUser))
    } catch (err) {
      dispatch(getDataUserFailure())
    }
  }
  if (action === 'UPDATE_USER') {
    dispatch(updateUser())
    try {
      const body = JSON.stringify({ id: user })
      const response = await fetch('/api/user/update_user', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-type': 'application/json' },
        body,
      })
      const dataUser = await response.json()
      dispatch(getDataUserSuccess(dataUser))
    } catch (err) {
      dispatch(getDataUserFailure())
    }
  }
}
