export const connectHandler = async (ClassAction, dispatch, form) => {
  try {
    await ClassAction(dispatch, form, 'CONNECT_CLASS')
    return 0
  } catch (error) {
    throw new Error(error)
    return 0
  }
}
