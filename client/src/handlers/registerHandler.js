export const registerHandler = async (authApi, dispatch, form) => {
  try {
    await authApi(dispatch, { ...form }, 'REGISTER')
  } catch (e) {
    throw new Error(e)
  }
}
