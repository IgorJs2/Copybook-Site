export const logoutHandler = (authApi, dispatch) => {
  authApi(dispatch, '', 'LOGOUT')
  return 0
}
