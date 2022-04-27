export const changePasswordHandler = async (authApi, dispatch, form, link) => {
  try {
    await authApi(dispatch, { ...form, link }, 'CHANGE_PASSWORD')
    return 0
  } catch (e) {
    throw new Error(error)
    return 0
  }
}
