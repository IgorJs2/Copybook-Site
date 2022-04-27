export const loginHandler = async (authApi, dispatch, form) => {
  try {
    if (form) {
      await authApi(dispatch, { ...form }, 'LOGIN')
    }
  } catch (e) {
    throw new Error(e)
  }
}
